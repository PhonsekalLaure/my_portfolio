# Ronn Rosarito — Developer Portfolio

A responsive, content-driven portfolio built with Next.js 16 App Router, React, TypeScript, and Tailwind CSS. Includes light/dark themes, published project case studies, a separate contribution section, social previews, and draft-safe content handling.

## Local development

Use Node.js 24 LTS and npm. The project was initially scaffolded using `create-next-app`; the original `it_portfolio_content_brief.md` is preserved.

```powershell
npm ci
npm run dev
```

Open http://localhost:3000. No database, API keys, authentication, or environment configuration is required for local use.

Development output is stored in `.next-dev`, separately from production output in `.next`. Production builds can run while the dev server is open. Stop the relevant server before moving or clearing its generated output; removing files from a running server can cause missing-manifest and Turbopack cache errors.

## Updating content

Edit the appropriate file in **`src/content/`**:

| File                     | Content                                                                                 |
| ------------------------ | --------------------------------------------------------------------------------------- |
| `profile.ts`             | Personal details, social/contact links, resume, education, About copy, and principles   |
| `projects.ts`            | Project descriptions, individual contributions, technologies, evidence, and screenshots |
| `project-activity.ts`    | Curated authored commits and merged pull requests shown on project pages                |
| `project-screenshots.ts` | Selected PRISM-GUARD screenshot paths, dimensions, titles, and captions                 |
| `contributions.ts`       | Contributions to other developers' repositories                                         |
| `skills.ts`              | Skill groups and their supporting evidence                                              |
| `certifications.ts`      | Certification names, issuers, dates, and publication status                             |
| `verification.ts`        | Shared verification date and the default unverified evidence record                     |
| `types.ts`               | Shared TypeScript content types                                                         |

`portfolio.ts` assembles these sections and provides the existing publication, navigation, and social-link helpers. Page and component imports can continue using it. All modules containing content remain server-only; do not import them into client components or pass entire records into them.

- Set a record's `publication` to `published` only after reviewing its claims and evidence. Draft projects have no public route and are absent from HTML, navigation, metadata, and the sitemap.
- Profile email, secondary academic email, LinkedIn, education, location, and resume have been supplied by the owner. Email fields each contain one address; `linkedin` needs a full HTTPS URL. The resume is available at `/assets/resume.pdf`. `profile.ts` is checked against the shared `Profile` type so invalid publication states are caught by TypeScript.
- Education and location have their own publication controls. Location is hidden by default.
- Confirm certificate name, issuer, and year against the original record before publishing. `kind` distinguishes professional certifications from course completions; optional `expiresOn` uses `YYYY-MM-DD`. Public exam credential IDs are not needed. Use public verification links only.
- Put approved, redacted screenshots in `public/assets/` and populate the project's `screenshots` array with local path, alt text, width, and height. Images render through `next/image`. Everything under `public/` is publicly accessible.
- Put the final resume in `public/assets/` and set `profile.resume` to its path. There is no placeholder resume.
- Empty content sections and their navigation links are omitted automatically. There is no contact form.

The published content features PRISM-GUARD, Frighton University SIS, and ITSO Equipment Management, with a separate external contribution to Marlo522/solarsoil. Public repositories, authored changes, and selected merged PRs were reviewed through authenticated GitHub CLI on 2026-10-30. Each project has a curated Selected changes section with direct commit/PR links; activity dates come from GitHub author dates or PR merge dates. Shared PRs are described using the user's individual changes, rather than all team output. No production-readiness or quantified outcome claims are made. The Frighton Library Management System remains a draft.

Eight owner-supplied credentials were verified on 2026-10-30 against Credly's public pages, Open Badges assertions, and issuer badge classes. All eight public pages name Ronn Saimund Rosarito. The four professional certifications are IT Specialist - Python, IT Specialist - Databases, PMI Project Management Ready, and Cisco CCST Networking - Lifetime. DevNet Associate and the three CCNA-named badges are course completions. PMI expires on 2031-03-17; the linked CCST badge is the Lifetime version. Verification references are stored in the server-only credential records.

The PRISM-GUARD web and promotional links were taken from public repository homepage metadata and checked for successful redirects. These are public previews; a successful page response does not establish that every backend workflow is available. No GitHub API calls, credentials, or live contribution counters are needed at runtime. See `docs/project-evidence.md` for the content review record.

Project illustrations are simplified workflow diagrams, not screenshots or live dashboards.

PRISM-GUARD's case study embeds the public promotional site at `https://psiai.vercel.app/` in a responsive, lazy-loaded iframe with an Open website fallback link. Edit the optional `preview` object in `projects.ts` to change its title, URL, or description. Only add sites that permit embedding. The operations app requires an account and blocks framing; its security headers have not been changed.

The case study also includes four owner-supplied screenshots: web payroll and client management, mobile earnings, and mobile profile/documents. The owner confirmed the visible names, contact details, and amounts are demo data and safe to publish. Selected files are in `public/assets/projects/prism-guard/web/` and `mobile/`, with editable records in `src/content/project-screenshots.ts`. Original pixels and dimensions are preserved. Images are optimized through `next/image` and link to the full-size PNG. The other 26 screenshots are renamed and retained locally under `.asset-sources/prism-guard/web/` and `mobile/`, outside public assets and ignored by Git. Back up that local folder separately if needed; it will not be included in a clone. Other projects' empty galleries remain hidden.

## Project structure

```text
src/app/                  Homepage, project routes, metadata, 404, and global styles
src/components/           Reusable sections, cards, navigation, icons, diagrams
src/content/             Separate typed content files; portfolio.ts assembles them
src/lib/site.ts           Production URL and indexing configuration
public/assets/            Approved screenshots and final resume
tests/                    Browser, privacy, route, theme, and accessibility checks
```

Server Components render the portfolio; only navigation and theme controls require client JavaScript. Project pages are pre-rendered from published entries. Unknown/draft slugs return 404.

## Verification

```powershell
npm run lint
npm run typecheck
npm run format:check
npm run build
```

Run browser tests after `npm run build`. Playwright starts a fresh production server on port 3100, separate from the usual development/preview port 3000, and stops it after the suite. It deliberately does not reuse an existing server, so verification exercises the production build rather than a development session.

```powershell
npx playwright install chromium
npm run test:e2e
```

Alternatively, use an installed Google Chrome browser without downloading Chromium:

```powershell
$env:PLAYWRIGHT_CHANNEL='chrome'
npm run test:e2e
```

Checks cover desktop, tablet, and mobile widths; light/dark themes; system theme and persistence; reduced motion; keyboard navigation and mobile-menu dismissal; published/draft routes; server-rendered draft exclusions; link attributes; social preview generation; and axe WCAG A/AA accessibility checks. Screenshots are saved under the ignored `.verification/` directory.

Run the production preview on the dedicated verification port before auditing. Keep port 3100 free while the browser suite is running, since that suite manages its own server.

```powershell
npm run start -- --hostname 127.0.0.1 --port 3100
# In a second terminal:
npm run audit:lighthouse
```

Lighthouse writes local HTML and JSON reports under `.verification/`. If Chrome is not discovered, set `CHROME_PATH` to its executable. Local Lighthouse SEO scores reflect intentional `noindex` until a production origin is configured.

## Vercel deployment

1. Push this repository to your GitHub account. No remote is guessed or created automatically.
2. In Vercel, import that repository. Use the **Next.js** preset, repository root directory, `npm run build` build command, and default output directory. Use Node.js 24.x. The dependency lockfile is committed with the source.
3. Review the initial deployment. Until `SITE_URL` is set, robots and page metadata disable indexing; there is no invented canonical URL.
4. Copy the actual assigned HTTPS production origin into Vercel's **Production** environment as `SITE_URL`, without a path. Redeploy so static metadata and the sitemap are regenerated.
5. Verify the live homepage, both case studies, theme/menu behavior, social preview, canonical URLs, robots, and sitemap. Preview deployments remain `noindex`, even when a production origin is available.

Copy `.env.example` to `.env.local` only if you need to exercise production-origin metadata locally. `SITE_URL` must be an HTTPS origin with no credentials, path, query, or fragment. Local and preview builds never substitute a guessed Vercel address. Do not commit environment credentials.

Custom domains, analytics, a CMS, a blog, and message delivery are outside the initial version.
