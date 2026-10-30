import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("published content is accessible, responsive, and excludes drafts", async ({
  page,
}, testInfo) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  const response = await page.goto("/");
  expect(response?.status()).toBe(200);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Useful software.Thoughtfully built.",
  );
  expect(
    await page.locator("#projects article").count(),
  ).toBeGreaterThanOrEqual(2);
  await expect(
    page.getByRole("heading", { name: "ITSO Equipment Management" }),
  ).toBeVisible();
  await expect(page.locator("#contributions")).toContainText(
    "Marlo522’s repository",
  );
  await expect(page.locator("#contributions")).toContainText("Merged PR #1");
  await expect(page.locator("#contributions")).toContainText(
    "domadla’s repository",
  );
  await expect(page.locator("#contributions")).toContainText(
    "Merged PRs #67 & #72",
  );
  await expect(page.locator("#certifications")).toHaveCount(0);
  const html = await response!.text();
  for (const privateText of [
    "IT Specialist",
    "PMI Project",
    "Frighton University Library Management System",
    "Awaiting owner-supplied",
    "verifiedOn",
    "credentialId",
  ])
    expect(html).not.toContain(privateText);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  for (const link of await page.locator('a[target="_blank"]').all())
    await expect(link).toHaveAttribute("rel", "noopener noreferrer");
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
        .analyze()
    ).violations,
  ).toEqual([]);
  await page.screenshot({
    path: `.verification/${testInfo.project.name}-light.png`,
    fullPage: true,
  });
  expect(errors).toEqual([]);
});

test("theme follows the system until an explicit preference is saved", async ({
  page,
}, testInfo) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/");
  await expect(page.locator("html")).not.toHaveAttribute("data-theme");
  expect(
    await page.evaluate(
      () => getComputedStyle(document.documentElement).colorScheme,
    ),
  ).toBe("dark");
  await page
    .getByRole("button", { name: "Toggle light and dark theme" })
    .click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page
    .getByRole("button", { name: "Toggle light and dark theme" })
    .click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.emulateMedia({ colorScheme: "light", reducedMotion: "reduce" });
  expect(
    await page.evaluate(
      () => getComputedStyle(document.documentElement).colorScheme,
    ),
  ).toBe("dark");
  expect(
    await page.evaluate(
      () => getComputedStyle(document.documentElement).scrollBehavior,
    ),
  ).toBe("auto");
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
        .analyze()
    ).violations,
  ).toEqual([]);
  await page.screenshot({
    path: `.verification/${testInfo.project.name}-dark.png`,
    fullPage: true,
  });
});

test("navigation supports keyboard, mobile dismissal, and case-study links", async ({
  page,
  isMobile,
}, testInfo) => {
  await page.goto("/");
  if (testInfo.project.name !== "desktop") {
    const toggle = page.getByRole("button", {
      name: /^(Open|Close) navigation$/,
    });
    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    await page.keyboard.press("Escape");
    await expect(
      page.getByRole("button", { name: "Open navigation" }),
    ).toBeFocused();
    await toggle.click();
    await page
      .getByRole("navigation", { name: "Mobile navigation" })
      .getByRole("link", { name: "Projects", exact: true })
      .click();
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
  }
  if (!isMobile) {
    await page.goto("/");
    await page.keyboard.press("Tab");
    await expect(
      page.getByRole("link", { name: "Skip to content" }),
    ).toBeFocused();
  }
  await page.getByRole("link", { name: "View case study" }).first().click();
  await expect(page).toHaveURL(/\/projects\/prism-guard$/);
  await expect(
    page.getByRole("heading", { name: "My contribution", exact: true }),
  ).toBeVisible();
});

test("case studies render and unpublished or unknown projects return 404", async ({
  page,
}, testInfo) => {
  await page.goto("/");
  const routes = await page
    .locator("#projects h3 a")
    .evaluateAll((links) =>
      links.map((link) => new URL((link as HTMLAnchorElement).href).pathname),
    );
  expect(routes.length).toBeGreaterThanOrEqual(2);
  for (const [index, route] of routes.entries()) {
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
    await expect(
      page.getByRole("heading", { name: "My contribution", exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Selected changes", exact: true }),
    ).toBeVisible();
    expect(await page.locator(".activity-item").count()).toBeGreaterThan(0);
    for (const date of await page.locator(".activity-item time").all())
      await expect(date).toHaveAttribute("datetime", /^\d{4}-\d{2}-\d{2}$/);
    await expect(page.locator(".next-project")).toHaveAttribute(
      "href",
      routes[(index + 1) % routes.length],
    );
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
    expect(
      (
        await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
          .analyze()
      ).violations,
    ).toEqual([]);
    await page.screenshot({
      path: `.verification/${testInfo.project.name}-${route.split("/").pop()}.png`,
      fullPage: true,
    });
  }
  for (const slug of ["frighton-university-lms", "unknown-project"]) {
    const response = await page.goto(`/projects/${slug}`);
    expect(response?.status()).toBe(404);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "This page isn’t",
    );
  }
});

test("local metadata does not invent a production origin", async ({
  request,
}) => {
  const response = await request.get("/");
  const html = await response.text();
  expect(html).toContain("Ronn Saimund Rosarito");
  if (!process.env.SITE_URL) {
    expect(html).not.toContain('rel="canonical"');
    expect(await (await request.get("/robots.txt")).text()).toContain(
      "Disallow: /",
    );
    expect(await (await request.get("/sitemap.xml")).text()).not.toContain(
      "<loc>",
    );
  }
  const image = await request.get("/opengraph-image");
  expect(image.ok()).toBe(true);
  expect(image.headers()["content-type"]).toContain("image/png");
});
