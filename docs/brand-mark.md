# Brand mark and portrait

The Door pathway symbol from Lord of the Mysteries is used for the favicon. The header displays the owner's name as a text wordmark, and their existing photo is in the hero.

`src/app/icon.png` uses the Door pathway image supplied by the owner on 2026-10-31. The original 2000×2000 PNG was resized to 256×256 for browser-tab use, preserving its colors, composition, and alpha transparency. It replaces the earlier custom SVG interpretation.

Next.js discovers `src/app/icon.png` as the favicon and generates its versioned metadata link. Replace that PNG to change the browser-tab mark. The full-resolution original is retained locally in `.asset-sources/brand/door-supplied.png`; this ignored source folder should be backed up separately. The header wordmark is styled through `.brand-name` in `src/app/globals.css`.

The original `public/assets/Picture.png` is unchanged. The hero reads `profile.photo` and displays the square portrait without cropping or filters, using responsive image optimization and a light frame. Without a configured photo, the existing workflow illustration is displayed instead.
