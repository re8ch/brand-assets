# RE8CH Cluster Icon

Product logo assets for **RE8CH Cluster**.

## Design Direction

This mark directly reuses the original RE8CH flagship SVG path geometry for the yellow and green regions, representing execution, delivery, and cluster operations.

## Files

- `SVG/icon.svg` - primary transparent product logo.
- `SVG/icon-no-edge.svg` - color-accent product logo without black keyline.
- `SVG/icon-gray.svg` - grayscale product logo.
- `SVG/icon-invert.svg` - dark-surface product logo.
- `PNG/icon.png` - 512 px PNG render of `SVG/icon.svg`.
- `PNG/icon-no-edge.png` - 512 px PNG render of `SVG/icon-no-edge.svg`.
- `PNG/icon-gray.png` - 512 px PNG render of `SVG/icon-gray.svg`.
- `PNG/icon-invert.png` - 512 px PNG render of `SVG/icon-invert.svg`.
- `../../ANIME/re8ch-cluster-motion.js` - zero-dependency animated Web Component using this icon's exact geometry.
- `../../ANIME/re8ch-cluster-motion.css` - cluster motion, themes, sizing, and reduced-motion behavior.

## Animated Component

```html
<script src="../../ANIME/re8ch-cluster-motion.js"></script>
<re8ch-cluster-motion motion="enter" size="lg" label="RE8CH Cluster"></re8ch-cluster-motion>
```

Available motions are `idle`, `enter`, `pulse`, `success`, `error`, and `reveal`. Only `idle` and `pulse` loop. Available themes are `color`, `gray`, `invert`, and `no-edge`; every theme keeps a transparent background. The component exposes `play()`, `pause()`, `resume()`, and `restart()` and respects `prefers-reduced-motion`.

## Public URLs

```text
https://brand-assets.re8ch.com/PRODUCTS/cluster/SVG/icon.svg
https://brand-assets.re8ch.com/PRODUCTS/cluster/PNG/icon.png
https://zh-brand-assets.re8ch.com/PRODUCTS/cluster/SVG/icon.svg
https://zh-brand-assets.re8ch.com/PRODUCTS/cluster/PNG/icon.png
```

© 2026 RE8CH / 锐奇. All rights reserved.
