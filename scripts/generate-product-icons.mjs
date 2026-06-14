#!/usr/bin/env node

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const root = path.dirname(path.dirname(__filename));

const COLORS = {
  edge: '#020202',
  invertEdge: '#f8fafc',
  white: '#f8fafc',
  red: '#f81018',
  green: '#00b559',
  yellow: '#ffd619',
  blue: '#0a7fbe',
  softBlue: '#2287c9',
  grayEdge: '#1f2937',
  grayA: '#f8fafc',
  grayB: '#cbd5e1',
  grayC: '#64748b',
  grayD: '#334155',
};

const products = [
  {
    slug: 'anycam',
    name: 'Anycam / 任意相机',
    description: 'SF Symbols-inspired RE8CH camera product mark.',
    symbol: camera,
  },
  {
    slug: 'phonaid',
    name: 'Phonaid / 万能接线助手',
    description: 'SF Symbols-inspired RE8CH call assistant product mark.',
    symbol: microphone,
  },
  {
    slug: 'anysiteonearth',
    name: 'Any Site on Earth',
    description: 'SF Symbols-inspired RE8CH location launch product mark.',
    symbol: rocket,
  },
  {
    slug: 'registry',
    name: 'RE8CH Registry',
    description: 'SF Symbols-inspired RE8CH signed image registry product mark.',
    symbol: registry,
  },
  {
    slug: 'cluster',
    name: 'RE8CH Cluster',
    description: 'SF Symbols-inspired RE8CH cluster build and operations product mark.',
    symbol: cluster,
  },
  {
    slug: 'observable',
    name: 'RE8CH Observable',
    description: 'SF Symbols-inspired RE8CH observability product mark.',
    symbol: observable,
  },
];

const variants = [
  ['icon.svg', 'primary'],
  ['icon-no-edge.svg', 'no-edge'],
  ['icon-gray.svg', 'gray'],
  ['icon-invert.svg', 'invert'],
];

function palette(mode) {
  if (mode === 'gray') {
    return {
      edge: COLORS.grayEdge,
      white: COLORS.grayA,
      red: COLORS.grayD,
      green: COLORS.grayC,
      yellow: COLORS.grayB,
      blue: COLORS.grayD,
      softBlue: COLORS.grayC,
    };
  }

  if (mode === 'invert') {
    return {
      ...COLORS,
      edge: COLORS.invertEdge,
      white: '#111827',
    };
  }

  if (mode === 'no-edge') {
    return {
      ...COLORS,
      edge: 'transparent',
    };
  }

  return COLORS;
}

function svg({ product, mode }) {
  const p = palette(mode);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" width="96" height="96" role="img" aria-labelledby="title desc">
  <title id="title">${escapeXml(product.name)} Icon</title>
  <desc id="desc">${escapeXml(product.description)}</desc>
  ${product.symbol(p, mode)}
</svg>
`;
}

function camera(p) {
  return `<path d="M13 35Q13 26 22 26H33L39 18H58L64 26H74Q83 26 83 35V72Q83 81 74 81H22Q13 81 13 72Z" fill="${p.edge}"/>
  <path d="M21 36H38L44 28H54L60 36H75V71H21Z" fill="${p.white}"/>
  <path d="M21 36H38L44 28H54L60 36H75V45H21Z" fill="${p.blue}"/>
  <circle cx="49" cy="58" r="25" fill="${p.edge}"/>
  <circle cx="49" cy="58" r="19" fill="${p.green}"/>
  <circle cx="49" cy="58" r="12" fill="${p.softBlue}"/>
  <circle cx="49" cy="58" r="6" fill="${p.yellow}"/>
  <path d="M25 39H34V46H25Z" fill="${p.red}"/>
  <path d="M66 46H75V57H70V51H66Z" fill="${p.red}"/>
  <circle cx="32" cy="42" r="4" fill="${p.red}"/>
  <circle cx="42" cy="53" r="4" fill="${p.white}" opacity=".72"/>`;
}

function microphone(p) {
  return `<path d="M34 23Q34 13 48 13Q62 13 62 23V43Q62 53 48 53Q34 53 34 43Z" fill="${p.edge}"/>
  <path d="M41 24Q41 19 48 19Q55 19 55 24V42Q55 47 48 47Q41 47 41 42Z" fill="${p.white}"/>
  <path d="M23 39Q19 48 23 58" fill="none" stroke="${p.red}" stroke-width="7" stroke-linecap="round"/>
  <path d="M14 34Q8 49 14 64" fill="none" stroke="${p.red}" stroke-width="7" stroke-linecap="round"/>
  <path d="M73 39Q77 48 73 58" fill="none" stroke="${p.yellow}" stroke-width="7" stroke-linecap="round"/>
  <path d="M82 34Q88 49 82 64" fill="none" stroke="${p.yellow}" stroke-width="7" stroke-linecap="round"/>
  <path d="M28 49Q28 68 48 68Q68 68 68 49" fill="none" stroke="${p.edge}" stroke-width="9" stroke-linecap="round"/>
  <path d="M34 51Q34 61 48 61Q62 61 62 51" fill="none" stroke="${p.white}" stroke-width="8" stroke-linecap="round"/>
  <path d="M48 67V78" stroke="${p.edge}" stroke-width="8" stroke-linecap="round"/>
  <path d="M33 82H63" stroke="${p.edge}" stroke-width="8" stroke-linecap="round"/>
  <path d="M13 66H83V82Q83 88 77 88H19Q13 88 13 82Z" fill="${p.green}" opacity=".96"/>
  <path d="M35 82H61" stroke="${p.white}" stroke-width="6" stroke-linecap="round"/>`;
}

function rocket(p) {
  return `<path d="M48 10Q67 28 67 55Q67 69 58 80H38Q29 69 29 55Q29 28 48 10Z" fill="${p.edge}"/>
  <path d="M48 20Q60 34 60 55Q60 64 55 73H41Q36 64 36 55Q36 34 48 20Z" fill="${p.white}"/>
  <path d="M48 20Q57 32 59 48H37Q39 32 48 20Z" fill="${p.blue}"/>
  <circle cx="48" cy="51" r="8" fill="${p.yellow}"/>
  <path d="M30 57Q14 64 9 78Q23 77 35 67Z" fill="${p.green}"/>
  <path d="M66 57Q82 64 87 78Q73 77 61 67Z" fill="${p.green}"/>
  <path d="M37 72L25 86H43Z" fill="${p.red}"/>
  <path d="M59 72L71 86H53Z" fill="${p.green}"/>
  <path d="M43 75L48 91L54 75Z" fill="${p.edge}"/>
  <path d="M46 77L48 86L51 77Z" fill="${p.yellow}"/>
  <path d="M14 68Q32 77 48 77Q64 77 82 68" fill="none" stroke="${p.edge}" stroke-width="6" stroke-linecap="round"/>`;
}

function registry(p) {
  return `<path d="M17 23Q17 16 24 16H72Q79 16 79 23V73Q79 80 72 80H24Q17 80 17 73Z" fill="${p.edge}"/>
  <path d="M25 24H71V72H25Z" fill="${p.white}"/>
  <path d="M25 24H71V38H25Z" fill="${p.blue}"/>
  <path d="M34 47H62V66H34Z" fill="${p.edge}"/>
  <path d="M40 47H68V66H40Z" fill="${p.green}"/>
  <path d="M28 40H56V59H28Z" fill="${p.edge}"/>
  <path d="M34 40H62V59H34Z" fill="${p.white}"/>
  <path d="M34 40H62V47H34Z" fill="${p.yellow}"/>
  <path d="M40 53H56" stroke="${p.edge}" stroke-width="5" stroke-linecap="round"/>
  <path d="M33 28H43" stroke="${p.white}" stroke-width="5" stroke-linecap="round"/>
  <path d="M50 28H63" stroke="${p.white}" stroke-width="5" stroke-linecap="round"/>
  <path d="M71 55L82 61L71 67Z" fill="${p.red}"/>`;
}

function cluster(p) {
  return `<path d="M48 10L78 27V62L48 79L18 62V27Z" fill="${p.edge}"/>
  <path d="M48 19L70 32V57L48 70L26 57V32Z" fill="${p.white}"/>
  <path d="M48 19L70 32L48 45L26 32Z" fill="${p.blue}"/>
  <path d="M26 32L48 45V70L26 57Z" fill="${p.green}"/>
  <path d="M70 32L48 45V70L70 57Z" fill="${p.yellow}"/>
  <circle cx="48" cy="45" r="8" fill="${p.edge}"/>
  <circle cx="31" cy="32" r="6" fill="${p.red}"/>
  <circle cx="65" cy="32" r="6" fill="${p.green}"/>
  <circle cx="48" cy="65" r="6" fill="${p.blue}"/>
  <path d="M31 32L48 45L65 32M48 45V65" fill="none" stroke="${p.edge}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>`;
}

function observable(p) {
  return `<path d="M8 48Q22 24 48 24Q74 24 88 48Q74 72 48 72Q22 72 8 48Z" fill="${p.edge}"/>
  <path d="M18 48Q30 32 48 32Q66 32 78 48Q66 64 48 64Q30 64 18 48Z" fill="${p.white}"/>
  <circle cx="48" cy="48" r="18" fill="${p.blue}"/>
  <circle cx="48" cy="48" r="11" fill="${p.green}"/>
  <circle cx="48" cy="48" r="5" fill="${p.yellow}"/>
  <path d="M14 72H30L38 59L48 76L58 57L66 72H82" fill="none" stroke="${p.red}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M19 24H35" stroke="${p.green}" stroke-width="6" stroke-linecap="round"/>
  <path d="M61 24H77" stroke="${p.yellow}" stroke-width="6" stroke-linecap="round"/>
  <circle cx="42" cy="42" r="4" fill="${p.white}" opacity=".72"/>`;
}

function escapeXml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function readme(product) {
  return `# ${product.name} Icon

Product icon assets for **${product.name}**.

## Design Direction

These marks are inspired by the system discipline of SF Symbols: clear vector
silhouette, small-size legibility, palette-friendly layers, and geometry that
aligns cleanly with adjacent text. They are original RE8CH assets and do not
copy Apple symbols.

## Files

- \`SVG/icon.svg\` - primary transparent product mark.
- \`SVG/icon-gray.svg\` - grayscale product mark.
- \`SVG/icon-no-edge.svg\` - color mark without the outer black edge.
- \`SVG/icon-invert.svg\` - dark-surface product mark.
- \`PNG/icon.png\` - 512 px transparent PNG rendered from the primary SVG.

## Public URLs

\`\`\`text
https://brand-assets.re8ch.com/PRODUCTS/${product.slug}/SVG/icon.svg
https://brand-assets.re8ch.com/PRODUCTS/${product.slug}/PNG/icon.png
https://zh-brand-assets.re8ch.com/PRODUCTS/${product.slug}/SVG/icon.svg
https://zh-brand-assets.re8ch.com/PRODUCTS/${product.slug}/PNG/icon.png
\`\`\`

© 2026 RE8CH / 锐奇. All rights reserved.
`;
}

async function main() {
  for (const product of products) {
    const base = path.join(root, 'PRODUCTS', product.slug);
    const svgDir = path.join(base, 'SVG');
    const pngDir = path.join(base, 'PNG');
    await fs.mkdir(svgDir, { recursive: true });
    await fs.mkdir(pngDir, { recursive: true });

    let primary;
    for (const [fileName, mode] of variants) {
      const content = svg({ product, mode });
      if (fileName === 'icon.svg') primary = content;
      await fs.writeFile(path.join(svgDir, fileName), content, 'utf8');
    }

    await sharp(Buffer.from(primary)).resize(512, 512).png().toFile(path.join(pngDir, 'icon.png'));
    await fs.writeFile(path.join(base, 'README.md'), readme(product), 'utf8');
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
