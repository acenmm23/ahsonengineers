# ahsonengineers.com

Portfolio site for Ahson Momin. React + Vite.

- Source: `site/`. Pages: `site/index.html` (home) and one folder per project under `site/projects/`, all rendering from `site/src/main.jsx`. The project list, links and media are in `site/src/content.js`; page copy is in `Home.jsx` and `ProjectPages.jsx`
- Adding a project: an entry in `projects` (content.js), a page component in `ProjectPages.jsx`, an HTML entry under `site/projects/<slug>/`, and an input in `vite.config.js`
- Hero: `media/portrait-cutout.webp` is used as supplied; `portrait-cleanup-mask.png` hides a few leftover background pixels from the cutout
- Built output: repo root (`index.html`, `projects/`, `assets/`, `media/`, `CNAME`, `favicon.svg`), served by GitHub Pages from `main`
- Photos and video: `site/public/media/` (two widths per photo); untouched originals in `media-originals/`

```bash
npm install
npm run dev     # local preview
npm run build   # writes the built site to the repo root; commit and push to deploy
```
