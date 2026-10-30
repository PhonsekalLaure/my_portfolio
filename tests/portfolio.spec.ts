import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

// Keep portfolio checks independent of changes or outages on the external site.
// The live promotional embed is checked separately in a browser review.
test.beforeEach(async ({ page }) => {
  await page.route("https://psiai.vercel.app/**", (route) =>
    route.fulfill({
      contentType: "text/html",
      body: '<!doctype html><html lang="en"><head><title>Promotional preview</title></head><body><main><h1>Promotional website preview</h1></main></body></html>',
    }),
  );
});

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
  await expect(page.locator("#certifications")).toBeVisible();
  const html = await response!.text();
  for (const privateText of [
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

test("supplied profile links, credentials, and resume are usable", async ({
  page,
  request,
}) => {
  await page.goto("/");
  await expect(
    page.getByRole("link", { name: "LinkedIn", exact: true }),
  ).toHaveAttribute("href", /^https:\/\/www\.linkedin\.com\/in\//);
  const emails = await page
    .locator('a[href^="mailto:"]')
    .evaluateAll((links) => [
      ...new Set(links.map((link) => link.getAttribute("href")!.slice(7))),
    ]);
  expect(emails.length).toBeGreaterThanOrEqual(2);
  for (const email of emails)
    expect(email).toMatch(/^[^\s@|]+@[^\s@|]+\.[^\s@|]+$/);
  await expect(page.locator("#about")).toContainText(
    "FEU Institute of Technology",
  );
  await expect(page.locator("#about")).toContainText("Expected July 2027");
  await expect(
    page.getByRole("link", { name: "Resume", exact: true }),
  ).toHaveAttribute("href", "/assets/resume.pdf");
  const resume = await request.get("/assets/resume.pdf");
  expect(resume.ok()).toBe(true);
  expect(resume.headers()["content-type"]).toContain("application/pdf");
  expect((await resume.body()).subarray(0, 5).toString()).toBe("%PDF-");
  const certificates = page.locator("#certifications article");
  expect(await certificates.count()).toBeGreaterThanOrEqual(8);
  for (const card of await certificates.all()) {
    await expect(card.locator(".credential-kind")).toHaveText(
      /^(Certification|Course completion)$/,
    );
    await expect(
      card.getByRole("link", { name: "Verify credential" }),
    ).toHaveAttribute("href", /^https:\/\/www\.credly\.com\/badges\//);
  }
  const devnet = certificates.filter({
    has: page.getByRole("heading", { name: "DevNet Associate", exact: true }),
  });
  await expect(devnet.locator(".credential-kind")).toHaveText(
    "Course completion",
  );
  const ccst = certificates.filter({
    has: page.getByRole("heading", {
      name: /Cisco Certified Support Technician/,
    }),
  });
  await expect(ccst.locator(".credential-kind")).toHaveText("Certification");
  await expect(
    certificates.filter({ hasText: "PMI Project Management Ready" }),
  ).toContainText("Valid until Mar 17, 2031");
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
    if (route === "/projects/prism-guard") {
      const preview = page.locator(".project-preview");
      await preview.scrollIntoViewIfNeeded();
      await expect(
        preview.getByRole("link", { name: "Open website" }),
      ).toHaveAttribute("href", "https://psiai.vercel.app/");
      await expect(
        page
          .frameLocator(
            'iframe[title="Promotional website — interactive preview"]',
          )
          .getByRole("heading", { name: "Promotional website preview" }),
      ).toBeVisible();
      await expect(
        page.locator('iframe[src*="prism-guard.vercel.app"]'),
      ).toHaveCount(0);
      const gallery = page.locator(".project-gallery");
      await expect(gallery.locator("figure")).toHaveCount(4);
      for (const image of await gallery.locator("img").all()) {
        await image.scrollIntoViewIfNeeded();
        await expect(image).toBeVisible();
        await expect
          .poll(() =>
            image.evaluate(
              (node) =>
                node instanceof HTMLImageElement &&
                node.complete &&
                node.naturalWidth > 0,
            ),
          )
          .toBe(true);
      }
      const fullSize = gallery
        .getByRole("link", { name: "View full-size image", exact: true })
        .first();
      const [imageTab] = await Promise.all([
        page.waitForEvent("popup"),
        fullSize.click(),
      ]);
      await imageTab.waitForLoadState();
      await expect(imageTab).toHaveURL(
        /\/assets\/projects\/prism-guard\/web\/payroll-management\.png$/,
      );
      await imageTab.close();
    } else {
      await expect(page.locator(".project-preview")).toHaveCount(0);
      await expect(page.locator(".project-gallery")).toHaveCount(0);
    }
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
