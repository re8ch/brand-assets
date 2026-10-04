import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const output = path.join(root, 'SVG', 'penrose');
const animatedOutput = path.join(root, 'ANIME', 'penrose-24-color-cycle.svg');

export const palette = Object.freeze({
  R: '#F81018',
  G: '#00B559',
  Y: '#FFD619',
  B: '#0A7FBE',
});
export const slots = Object.freeze(['left', 'right', 'base', 'glow']);

function permutations(items) {
  if (items.length === 0) return [[]];
  return items.flatMap((item, index) => permutations(items.filter((_, i) => i !== index)).map((tail) => [item, ...tail]));
}

export const colorways = Object.freeze(permutations(Object.keys(palette)).map((letters) => ({
  code: letters.join(''),
  left: letters[0],
  right: letters[1],
  base: letters[2],
  glow: letters[3],
})));

function cycleKeyframes(slot, property = slot === 'glow' ? 'stroke' : 'fill') {
  const frames = [];
  const count = colorways.length;
  for (let i = 0; i < count; i += 1) {
    const current = palette[colorways[i][slot]];
    frames.push(`${(i / count * 100).toFixed(4)}% { ${property}: ${current}; }`);
  }
  frames.push(`100% { ${property}: ${palette[colorways[0][slot]]}; }`);
  return `@keyframes ${slot}-${property}-cycle { ${frames.join(' ')} }`;
}

export function renderSvg(colorway, animated = false) {
  const color = (slot) => palette[colorway[slot]];
  const cycleCss = animated ? `
      .cycle-left { animation: left-fill-cycle 72s ease-in-out infinite; }
      .cycle-right { animation: right-fill-cycle 72s ease-in-out infinite; }
      .cycle-base { animation: base-fill-cycle 72s ease-in-out infinite; }
      .cycle-glow { animation: glow-stroke-cycle 72s ease-in-out infinite; }
      ${slots.map((slot) => cycleKeyframes(slot)).join('\n      ')}
      @media (prefers-reduced-motion: reduce) {
        .cycle-left, .cycle-right, .cycle-base, .cycle-glow { animation: none; }
      }` : '';
  const name = animated ? '24-color cycle' : colorway.code;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 896 820" role="img" aria-labelledby="title desc">
  <title id="title">RE8CH Penrose ${name}</title>
  <desc id="desc">Three visible color faces and a fourth color glowing from hidden inner faces along all three sides and their extensions. The center remains transparent.</desc>
  <defs>
    <filter id="soft-glow" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="12"/></filter>
    <style>
      .face { stroke: #050505; stroke-width: 2; stroke-linejoin: round; }
      ${cycleCss}
    </style>
  </defs>
  <path id="left" class="face cycle-left" fill="${color('left')}" d="M 383 50 L 681 569 L 540 569 L 377 288 L 78 805 L 17 684 Z"/>
  <path id="right" class="face cycle-right" fill="${color('right')}" d="M 383 50 L 515 50 L 880 684 L 292 684 L 356 569 L 682 569 Z"/>
  <path id="base" class="face cycle-base" fill="${color('base')}" d="M 377 288 L 448 410 L 292 684 L 880 684 L 819 806 L 78 806 Z"/>
  <!-- Light leaks from all three hidden inner faces and continues along each edge extension. -->
  <g id="hidden-face-glow" class="cycle-glow" fill="none" stroke="${color('glow')}" stroke-linecap="round" stroke-width="7" stroke-opacity="0.40" filter="url(#soft-glow)">
    <path d="M 448 410 L 292 684"/>
    <path d="M 377 288 L 540 569"/>
    <path d="M 356 569 L 682 569"/>
  </g>
</svg>
`;
}

export function generate() {
  fs.mkdirSync(output, { recursive: true });
  for (const colorway of colorways) {
    fs.writeFileSync(path.join(output, `re8ch-${colorway.code}.svg`), renderSvg(colorway));
  }
  fs.writeFileSync(animatedOutput, renderSvg(colorways[0], true));
  return { output, animatedOutput, count: colorways.length };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const result = generate();
  console.log(`Generated ${result.count} static SVGs in ${result.output}`);
  console.log(`Generated animation ${result.animatedOutput}`);
}
