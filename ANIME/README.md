# RE8CH Logo Motion Assets

This folder contains a zero-dependency Web Component for reusable RE8CH logo motion across websites and services.

## Trademark Styles

Use the graphic logo mark with one of the following brand names:

- `[图形Logo®]  锐奇`
- `[图形Logo®]  锐奇软件开发工作室`
- `[图形Logo®]  RE8CH`
- `[图形Logo®]  Reachieve LLC`

© 2026 RE8CH / 锐奇. All rights reserved.

## Files

- `re8ch-logo-motion.js` - Web Component definition for `<re8ch-logo-motion>`.
- `re8ch-logo-motion.css` - Motion, sizing, theme, and reduced-motion styles.
- `index.html` - Local preview and usage examples.
- `README.md` - Integration notes.

## Quick Start

```html
<script src="./re8ch-logo-motion.js"></script>

<re8ch-logo-motion
  theme="color"
  motion="loader"
  loop
  size="lg"
  label="Loading RE8CH">
</re8ch-logo-motion>
```

## Attributes

| Attribute | Values | Default | Notes |
| --- | --- | --- | --- |
| `theme` | `color`, `gray`, `invert`, `no-edge`, `no-edge-gray`, `no-edge-invert` | `color` | All themes keep a transparent background. |
| `motion` | `loader`, `enter`, `exit`, `idle`, `pulse`, `success`, `error`, `reveal` | `idle` | `loader`, `idle`, and `pulse` are designed for looping. |
| `size` | `sm`, `md`, `lg`, `xl` | `md` | CSS custom property based sizing. |
| `loop` | boolean | off | Kept only for `loader`, `idle`, and `pulse`. |
| `paused` | boolean | off | Pauses all current animations. |
| `label` | string | `RE8CH logo` | Sets the SVG `aria-label`. |

## JavaScript API

```js
const logo = document.querySelector("re8ch-logo-motion");

logo.play("success");
logo.pause();
logo.resume();
logo.restart();
logo.theme = "invert";
logo.motion = "loader";
logo.size = "lg";
```

## Motion Set

- `loader` - three-beat rotation with color-zone exchange and small orbital offsets.
- `enter` - edge and color pieces settle into place in sequence.
- `exit` - pieces fold toward the center and fade away.
- `idle` - quiet breathing for static pages and empty states.
- `pulse` - color zones swap briefly while the edge expands and softens.
- `success` - all zones resolve through green/yellow energy before returning to brand color.
- `error` - red/yellow warning flash with stronger shake and color drain on other zones.
- `reveal` - zones enter with temporary swapped colors before the edge resolves.

## Accessibility

The component renders an inline SVG with `role="img"` and an `aria-label`. It respects `prefers-reduced-motion: reduce` by disabling persistent loop animations and shortening one-shot animations.

## Preview

Open `index.html` directly in a browser, or serve the folder with any static server:

```sh
python3 -m http.server 8080
```
