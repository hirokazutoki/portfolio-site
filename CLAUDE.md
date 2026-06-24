# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development commands

All commands run from the `astro/` directory using Yarn 4 (Berry).

```bash
cd astro
yarn dev       # Start dev server
yarn build     # Production build (outputs to astro/dist/)
yarn preview   # Preview production build locally
```

## Architecture

This is a static portfolio site built with **Astro 7** and **Tailwind CSS 4**, deployed to **AWS S3 + CloudFront** via GitHub Actions on push to `main`.

The site at `hirokazutoki.com` is a single-page portfolio. All source lives under `astro/src/`:

- `layouts/Layout.astro` — HTML shell with `<head>` (OG tags, meta, favicon), used by every page via `<slot />`
- `pages/index.astro` — Home page, composes `<Welcome />`
- `pages/404.astro` — Custom 404 page
- `components/Welcome.astro` — The entire home page content (header, profile section, footer)
- `styles/global.css` — Imports Tailwind and defines `--color-accent-color: #fbcf50`

Static assets (profile photo, logo) live in `src/assets/` and are processed by Astro's image pipeline. Public files (favicon, OG preview image) live in `astro/public/`.

## Deployment

GitHub Actions (`.github/workflows/deploy.yml`) triggers on push to `main`:
1. Builds with `yarn run build` in the `astro/` directory
2. Syncs `astro/dist/` to S3 (`aws s3 sync --delete`)
3. Invalidates the CloudFront distribution cache (`/*`)

Requires GitHub secrets: `AWS_ROLE_ARN`, `BUCKET_NAME`, `DISTRIBUTION_ID`.

## Key configuration

- `astro.config.mjs` — Sets `site: 'https://hirokazutoki.com'` (used for absolute URL generation in `Layout.astro`) and wires in Tailwind via the Vite plugin
- `tsconfig.json` — Extends `astro/tsconfigs/strict`
- Yarn Berry is pinned via `.yarnrc.yml` with `nodeLinker: node-modules`
