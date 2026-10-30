# Portfolio assets

Place approved project screenshots here, using descriptive filenames and no personal or client data. Add their local path, meaningful alt text, and original width/height to the appropriate project's `screenshots` array in `src/content/projects.ts`.

Place a final, owner-provided resume PDF here and set `profile.resume` in `src/content/profile.ts` to its public path, such as `/assets/resume.pdf`. Do not create a placeholder PDF. Everything in this directory is publicly downloadable.

The first screenshot in a project's `screenshots` array is its cover on both the project card and case study. Projects without screenshots use the CSS/SVG workflow diagram as a fallback. PRISM-GUARD currently uses the payroll management screenshot as its cover.

The owner-provided `Picture.png` is the topbar portrait, configured through `profile.photo` in `src/content/profile.ts`. Omit that field to use the initials fallback.

PRISM-GUARD's promotional site is embedded directly from `https://psiai.vercel.app/`; it does not need a screenshot file.

## Selected PRISM-GUARD screenshots

The owner confirmed these screenshots contain demo data and are safe to publish. Their original pixels and dimensions are preserved. Edit their order, titles, alt text, and captions in `src/content/project-screenshots.ts`; `projects.ts` uses that array automatically.

| File under `projects/prism-guard/`     | Original filename                  |
| -------------------------------------- | ---------------------------------- |
| `web/payroll-management.png`           | `Screenshot 2026-06-16 152238.png` |
| `web/client-management.png`            | `Screenshot 2026-06-16 143729.png` |
| `mobile/earnings-and-cash-advance.png` | `37.png`                           |
| `mobile/profile-and-documents.png`     | `38.png`                           |

The other 26 images are renamed and retained in `.asset-sources/prism-guard/`, with separate `web/` and `mobile/` folders. That local folder is outside `public/` and ignored by Git, so it is neither deployed nor included in clones. To publish another screenshot, copy it into the appropriate public project folder and add a record to the content array with its true dimensions. Review future screenshots for private data before publishing.
