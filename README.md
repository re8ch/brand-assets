# RE8CH Brand Assets

Reusable logo, transparent PNG, SVG, and web motion assets for RE8CH / 锐奇.

## Trademark Styles

Use the graphic logo mark with one of the following brand names:

- `[图形Logo®]  锐奇`
- `[图形Logo®]  锐奇软件开发工作室`
- `[图形Logo®]  RE8CH`
- `[图形Logo®]  Reachieve LLC`

© 2026 RE8CH / 锐奇. All rights reserved.

## Folders

- `SVG/` - transparent SVG logo variants.
- `SVG/ledger-ui/` - ledger-specific mini program UI icons for account books, entries, documents, reconciliation, reports, profile, and empty states.
- `PNG/` - transparent PNG logo variants.
- `ANIME/` - reusable web animation assets built around `<re8ch-logo-motion>`.
- `PRODUCTS/` - product-specific icons that extend the RE8CH visual language.
- `anycam/` - AnyCAM app icon source assets.
- `re8ch-registry/` - Re8ch Registry harbor tower mark and motion assets.

## Core Variants

- `logo` - color logo with black edge.
- `logo-gray` - luminance grayscale logo with black edge.
- `logo-invert` - inverted logo with white edge.
- `logo-no-edge` - color logo with transparent edge gaps.
- `logo-no-edge-gray` - grayscale no-edge logo.
- `logo-no-edge-invert` - inverted no-edge logo.

## Product Icons

- `PRODUCTS/lizhang-ledger/` - 理账 / Ledger product icon.
- `PRODUCTS/anysiteonearth/` - Any Site on Earth geospatial product icon.
- `PRODUCTS/anycam/` - Anycam / 任意相机 product icon for websites.
- `PRODUCTS/phonaid/` - Phonaid / 万能接线助手 product icon.
- `PRODUCTS/registry/` - RE8CH Registry signed image distribution icon.
- `PRODUCTS/cluster/` - RE8CH Cluster build and operations icon.
- `PRODUCTS/observable/` - RE8CH Observable observability icon.
- `anycam/` - AnyCAM product icon source assets.
- `re8ch-registry/` - Re8ch Registry product mark and motion assets.

Product icons are generated with:

```bash
npm run icons:products
```

The current product icon system borrows SF Symbols' discipline rather than its
artwork: clear vector silhouettes, text-friendly geometry, small-size
legibility, and layered shapes that can support palette, multicolor, grayscale,
inverted, and future motion variants. The artwork itself is original RE8CH
geometry using the red/yellow/green/blue brand palette and black/white
structure edges.

## Asset Source Of Truth

This repository is the source of truth for public RE8CH brand assets.

Current distribution targets:

- Global: `brand-assets` Cloudflare R2 bucket, intended custom domain `https://brand-assets.re8ch.com`
- China: `brandassets-1301339749` Tencent COS bucket in `ap-guangzhou`, intended custom domain `https://zh-brand-assets.re8ch.com`

Public asset endpoints:

- `https://brand-assets.re8ch.com`
- `https://brandassets-1301339749.cos.ap-guangzhou.myqcloud.com`

Cloudflare R2 S3 API endpoint:

- `https://6317b796fb47e67fadec3bc9a5ef0e8e.r2.cloudflarestorage.com/brand-assets`

### Sync Locally

Install once:

```bash
npm install
```

Dry run:

```bash
npm run sync:dry-run
```

Sync both targets:

```bash
npm run sync:all
```

Sync one target:

```bash
npm run sync:r2
npm run sync:cos
```

R2 notes:

- If `R2_ACCESS_KEY_ID` and `R2_SECRET_ACCESS_KEY` are set, the script uses the S3-compatible R2 API and deletes stale remote objects.
- If those keys are not set, local runs fall back to the current `wrangler` login and only overwrite/upload current objects. This is enough for immediate publishing, but not for stale deletion.

Tencent notes:

- The installed `tccli` on this machine does not expose the COS service, so upload is performed through the official Tencent COS Node SDK.
- The script creates the COS bucket if needed, sets public read, uploads changed objects, and deletes stale objects.

### Automatic Sync

`.github/workflows/sync-brand-assets.yml` runs on every push to `main` and on manual dispatch.

Add these GitHub Actions secrets to the `re8ch/brand-assets` repository:

```text
R2_ACCESS_KEY_ID
R2_SECRET_ACCESS_KEY
COS_SECRET_ID
COS_SECRET_KEY
```

Use a Cloudflare R2 S3 key pair scoped to the `brand-assets` bucket. Use Tencent credentials with permission for the `brandassets-1301339749` bucket.

### DNS / CDN Binding

Cloudflare:

1. Bind the R2 bucket `brand-assets` to `brand-assets.re8ch.com`.
2. Keep `manifest.json` uncached or short cached.
3. Cache immutable assets aggressively.

Tencent:

1. Bind `zh-brand-assets.re8ch.com` to the COS bucket/CDN origin `brandassets-1301339749.cos.ap-guangzhou.myqcloud.com`.
2. Enable HTTPS certificate for `zh-brand-assets.re8ch.com`.
3. Purge CDN after large asset replacements when needed.
