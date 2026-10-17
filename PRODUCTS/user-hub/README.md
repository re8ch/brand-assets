# RE8CH User Hub Icon

Product logo assets for **RE8CH User Hub**.

## Design Direction

This mark pairs the hexagonal honeycomb cell from the User Hub sign-in and directory screens with a person glyph, drawn in the RE8CH system-symbol language: rounded 7 px strokes, flagship blue for the person and flagship green for the shoulders. App icon files place the primary mark on the RE8CH light surface for home screens, browser tabs, and installed web apps.

## Files

- `SVG/icon.svg` - primary transparent product logo.
- `SVG/icon-no-edge.svg` - color-accent product logo without black keyline.
- `SVG/icon-gray.svg` - grayscale product logo.
- `SVG/icon-invert.svg` - dark-surface product logo.
- `PNG/icon.png` - 512 px PNG render of `SVG/icon.svg`.
- `PNG/icon-no-edge.png` - 512 px PNG render of `SVG/icon-no-edge.svg`.
- `PNG/icon-gray.png` - 512 px PNG render of `SVG/icon-gray.svg`.
- `PNG/icon-invert.png` - 512 px PNG render of `SVG/icon-invert.svg`.
## App Icons

- `SVG/icon-app.svg` - rounded light tile with the primary mark, the source for installed web app icons.
- `PNG/icon-app-192.png`, `PNG/icon-app-512.png` - web app manifest icons (purpose `any`).
- `PNG/icon-maskable-512.png` - full-bleed tile with the mark inside the 80% safe zone (purpose `maskable`).
- `PNG/icon-apple-touch-180.png` - opaque iOS home-screen icon; iOS applies its own corner mask.
- `PNG/icon-32.png`, `PNG/icon-48.png` - PNG favicons for browsers without SVG favicon support.
- `manifest.webmanifest` - web app manifest for https://auth.re8ch.com/. It is served from brand-assets with open CORS, so the page links it cross-origin.

```html
<link rel="icon" href="https://brand-assets.re8ch.com/PRODUCTS/user-hub/SVG/icon.svg" type="image/svg+xml">
<link rel="icon" href="https://brand-assets.re8ch.com/PRODUCTS/user-hub/PNG/icon-32.png" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="https://brand-assets.re8ch.com/PRODUCTS/user-hub/PNG/icon-apple-touch-180.png">
<link rel="manifest" href="https://brand-assets.re8ch.com/PRODUCTS/user-hub/manifest.webmanifest">
```


## Public URLs

```text
https://brand-assets.re8ch.com/PRODUCTS/user-hub/SVG/icon.svg
https://brand-assets.re8ch.com/PRODUCTS/user-hub/PNG/icon.png
https://zh-brand-assets.re8ch.com/PRODUCTS/user-hub/SVG/icon.svg
https://zh-brand-assets.re8ch.com/PRODUCTS/user-hub/PNG/icon.png
```

© 2026 RE8CH / 锐奇. All rights reserved.
