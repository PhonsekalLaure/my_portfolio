# Project content review — 2026-10-30

Reviewed public source, repository manifests, authored commit history, selected PR diffs, and PR merge metadata with authenticated GitHub CLI. Only public repositories were considered for inclusion. GitHub authentication is used during review; the portfolio never receives the CLI token or calls the GitHub API at runtime.

## Featured projects

| Project                   | Evidence supporting the published contribution                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| PRISM-GUARD               | [Payroll PR #76](https://github.com/PhonsekalLaure/prism-guard-web/pull/76), [mobile earnings PR #27](https://github.com/PhonsekalLaure/prism-guard-mobile/pull/27), [deployment permissions commit](https://github.com/PhonsekalLaure/prism-guard-web/commit/52b89aa374d64a316e8c6cfcc0d9950270cda6a7), and [attendance contest selfie commit](https://github.com/PhonsekalLaure/prism-guard-mobile/commit/305c07ed8f6c5fe5885eb958aa65acfd75220c1c). Keep the team-capstone context explicit.                                                                                                              |
| Frighton University SIS   | [Admin account workflows](https://github.com/PhonsekalLaure/frighton-university-sis/commit/de8618c7c285db72db7c934c91c725c0f5469fce), [student portal and holds](https://github.com/PhonsekalLaure/frighton-university-sis/commit/46cfaa88d762cd71d61c41c110abf7ad63687f61), and [typed seed data](https://github.com/PhonsekalLaure/frighton-university-sis/commit/e69c955b8963fb22109dc0ff7742f9edc2d41b11). Preserve the distinction between admin account operations and read-only student billing.                                                                                                      |
| ITSO Equipment Management | [Reservation status and filtering](https://github.com/PhonsekalLaure/itso/commit/abc6582cfd65ca78b833ec7ce5082186b48b9177), [reservation soft deletion](https://github.com/PhonsekalLaure/itso/commit/1e50d9681b8887aba69c7021ffb735a1dc393923), [inventory and borrow tracking](https://github.com/PhonsekalLaure/itso/commit/be8b29bbf13b5c03fa01c37327db0634d39cc520), and [interface PR #7](https://github.com/PhonsekalLaure/itso/pull/7). Read the live reservation controller and routes as well as the diffs. Describe it as a source-available repository project; no live deployment was verified. |

## External contributions

- **Marlo522/solarsoil:** [PR #1](https://github.com/Marlo522/solarsoil/pull/1) is merged and authored by PhonsekalLaure. It supports authentication/guest filters, role-aware redirects, and unauthorized-access handling. Do not imply ownership of the application.

## Public previews

- The web repository homepage redirects from `https://prism-guard-web.vercel.app` to `https://prism-guard.vercel.app/` with an HTTP 200 response.
- The promotional repository homepage redirects from `https://prism-guard-promo.vercel.app` to `https://psiai.vercel.app/` with an HTTP 200 response.

These checks establish URL availability, not end-to-end backend behavior. No accounts were used to submit forms, log in, or mutate project data. The public promotional site is embedded in the case study; workflow diagrams remain labeled as diagrams.

## Owner-supplied screenshots

On 2026-10-30, the owner confirmed that PRISM-GUARD is completed and that they served as project manager, database administrator, and lead developer / backend developer. The published status and role reflect that confirmation while preserving the collaborative capstone context and the source-backed contribution list.

On 2026-10-30, the owner supplied 30 PRISM-GUARD screenshots and explicitly confirmed that the visible names, contact details, and payroll amounts are demo data and safe to publish. Selected four images aligned with the existing contribution evidence: web payroll review, web client management, mobile earnings, and mobile profile/documents. The earnings composite also contains a cash advance screen; its caption keeps the individual contribution limited to earnings and supporting services.

Selected PNGs retain their original pixels and dimensions in `public/assets/projects/prism-guard/`. Their typed content records are in `src/content/project-screenshots.ts`, including descriptive alt text and captions. Other screenshots are renamed and retained in the Git-ignored local `.asset-sources/prism-guard/` folder outside `public/`. Screenshots illustrate the supplied interface state; they do not establish current production behavior or sole ownership of every displayed feature.

## Candidates kept out of the featured selection

- **Frighton University LMS:** the README identifies this as a **Library Management System**, correcting the earlier learning-management description. The authored initial commit supports the scaffold, migrations, and SIS bridge. The current source contains library routes, but its integration contract and operational behavior have not been jointly validated, so it remains a draft.
- **AD Meeting Calendar:** the reviewed branch prominently contains login/setup, database utilities, and development scaffolding. Prefer the stronger workflow evidence in the selected projects.
- **J-Cash:** a small Java project with upload-style history provides less focused evidence for the current software/web developer positioning.

Email, education, resume, certificates, and LinkedIn remain owner-supplied fields. GitHub account access is not permission to infer or expose private profile details.
