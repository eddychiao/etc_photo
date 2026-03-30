# Eddy Chiao — Photography Portfolio

Personal photography portfolio site built with Node.js, Express, and EJS.

## Stack

- **Runtime:** Node.js + Express
- **Templates:** EJS
- **Language:** TypeScript
- **Deployment:** GitHub Pages (via static export)

## Local Development

```bash
npm install
npm run dev        # starts dev server at http://localhost:3000
```

## Adding Photos

- **Hero image:** `public/photos/hero/hero.jpg`
- **Portrait:** `public/photos/about/portrait.jpg`
- **Collection photos:** `public/photos/collections/<slug>/`

To add photos to a collection, update the `photos` array for the relevant collection in `src/server.ts`.

## Deployment

The site is deployed to GitHub Pages automatically on every push to `main` via the workflow in `.github/workflows/deploy.yml`.

The workflow runs `npm run export` to pre-render all EJS templates to static HTML, then deploys the `dist/` folder.
