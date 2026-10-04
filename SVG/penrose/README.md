# RE8CH Penrose colorways

This directory holds 24 editable SVG variants of the Penrose mark traced from the approved boundary sketch. Each variant assigns the four original RE8CH brand colors exactly once:

| Code | Color | Hex |
| --- | --- | --- |
| R | Red | `#F81018` |
| G | Green | `#00B559` |
| Y | Yellow | `#FFD619` |
| B | Blue | `#0A7FBE` |

A filename such as `re8ch-RGYB.svg` assigns red to the left face, green to the right face, yellow to the base, and blue to the hidden-face glow. The center is transparent. The glow follows all three inner edges and continues along the visible extensions of those edges; it is not a solid triangular fill.

Generate the complete set and the matching [72-second looping SVG animation](../../ANIME/penrose-24-color-cycle.svg) with:

```sh
npm run logos:penrose
```

The animation duration can be set with the CSS custom property `--re8ch-penrose-cycle-duration` (default `72s`), or changed live with the slider in the HTML preview.

The source of geometry, palette, permutations, and animation is [`scripts/generate-penrose-colorways.mjs`](../../scripts/generate-penrose-colorways.mjs). Edit that file, then regenerate. The SVGs use vector paths and SVG filters; no bitmap image is embedded.
