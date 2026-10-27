# ahsonengineers.com

Portfolio site for Ahson Momin. React + Vite.

- Source: `site/`. Pages: `site/index.html` (home), `site/projects/betterkey/` and `site/projects/ece118/`, each rendering from `site/src/main.jsx`. Links and media list in `site/src/content.js`; copy in `Home.jsx` and `ProjectPages.jsx`
- Hero: `media/portrait-cutout.webp` is used as supplied; `portrait-cleanup-mask.png` hides a few leftover background pixels from the cutout
- Built output: repo root (`index.html`, `projects/`, `assets/`, `media/`, `CNAME`, `favicon.svg`), served by GitHub Pages from `main`
- Photos and video: `site/public/media/` (two widths per photo); untouched originals in `media-originals/`

```bash
npm install
npm run dev     # local preview
npm run build   # writes the built site to the repo root; commit and push to deploy
```
