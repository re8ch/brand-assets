# brand.re8ch.com

Static showcase of the RE8CH / 锐奇 brand: logo variants, color, type, product
marks, GitHub organization avatars, icon sets, UI elements, the shared
navigator/footer components, logo motion and shipped product UI.

## Files

- `index.html`, `brand.css`, `brand.js` - the page. No build step, no framework.
- `inventory.json` - generated list of logos, product marks, org avatars and
  icon sets. Regenerate after adding or removing assets:
  `npm run brand-site:inventory`.
- `showcase/` - WebP screenshots of shipped product pages.

## Asset base

`brand.js` loads every logo, icon and component from
`https://brand-assets.re8ch.com`. On `localhost` it uses the repository
checkout instead (`..`), so local changes show up before they are synced.
Set `data-asset-base` on `<html>` to override either.

## Preview

```bash
npm run brand-site:dev
# open http://localhost:4190/brand-site/
```

Serve the repository root, not this folder, so the `..` asset paths resolve.

## Deploy

Not wired yet. The folder is self-contained apart from the CDN, so it can be
published as its own static site (for example a Cloudflare Pages project with
`brand-site` as the output directory) and bound to `brand.re8ch.com`.
