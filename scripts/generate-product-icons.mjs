#!/usr/bin/env node

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const root = path.dirname(path.dirname(__filename));

const COLORS = {
  ink: '#111820',
  white: '#f8fafc',
  red: '#f81018',
  green: '#00b559',
  yellow: '#ffd619',
  blue: '#0a7fbe',
  softBlue: '#2287c9',
  grayInk: '#1f2937',
  grayAccent: '#64748b',
  grayAccent2: '#cbd5e1',
};

const products = [
  {
    slug: 'anycam',
    name: 'Anycam / 任意相机',
    description: 'Original RE8CH system-symbol camera product mark.',
    accent: COLORS.softBlue,
    accent2: COLORS.yellow,
    symbol: camera,
  },
  {
    slug: 'phonaid',
    name: 'Phonaid / 万能接线助手',
    description: 'Original RE8CH system-symbol call assistant product mark.',
    accent: COLORS.green,
    accent2: COLORS.yellow,
    symbol: microphone,
  },
  {
    slug: 'anysiteonearth',
    name: 'Any Site on Earth',
    description: 'Original RE8CH system-symbol location launch product mark.',
    accent: COLORS.blue,
    accent2: COLORS.green,
    symbol: rocket,
    extraVariants: [
      ['icon-flat.svg', 'flat'],
      ['icon-inverse.svg', 'inverse'],
      ['icon-minimal-light.svg', 'minimal-light'],
      ['icon-minimal-dark.svg', 'minimal-dark'],
    ],
  },
  {
    slug: 'lizhang-ledger',
    name: '理账 Ledger',
    description: 'Original RE8CH system-symbol ledger product mark.',
    accent: COLORS.blue,
    accent2: COLORS.yellow,
    symbol: ledger,
  },
  {
    slug: 'registry',
    name: 'RE8CH Registry',
    description: 'RE8CH Registry product mark derived from the blue and yellow security and certification regions of the RE8CH flagship mark.',
    designDirection: 'This mark directly reuses the original RE8CH flagship SVG path geometry for the blue and yellow regions, representing security, registry, and certification surfaces.',
    accent: COLORS.blue,
    accent2: COLORS.yellow,
    symbol: registry,
  },
  {
    slug: 'cluster',
    name: 'RE8CH Cluster',
    description: 'RE8CH Cluster product mark derived from the yellow and green execution and delivery regions of the RE8CH flagship mark.',
    designDirection: 'This mark directly reuses the original RE8CH flagship SVG path geometry for the yellow and green regions, representing execution, delivery, and cluster operations.',
    accent: COLORS.green,
    accent2: COLORS.yellow,
    symbol: cluster,
  },
  {
    slug: 'observable',
    name: 'RE8CH Observable',
    description: 'RE8CH Observable product mark derived from the red observability region of the RE8CH flagship mark.',
    designDirection: 'This mark directly reuses the original RE8CH flagship SVG path geometry for the red inverted-V region, representing observability and signal surfaces.',
    accent: COLORS.red,
    accent2: COLORS.red,
    symbol: observable,
  },
];

const baseVariants = [
  ['icon.svg', 'primary'],
  ['icon-no-edge.svg', 'no-edge'],
  ['icon-gray.svg', 'gray'],
  ['icon-invert.svg', 'invert'],
];

function palette(product, mode) {
  if (mode === 'gray') {
    return {
      ink: COLORS.grayInk,
      accent: COLORS.grayAccent,
      accent2: COLORS.grayAccent2,
      soft: COLORS.grayAccent2,
      edge: COLORS.grayInk,
      red: COLORS.grayAccent,
      blue: COLORS.grayAccent,
      yellow: COLORS.grayAccent2,
      green: COLORS.grayAccent,
    };
  }

  if (mode === 'invert' || mode === 'inverse' || mode === 'minimal-dark') {
    return {
      ink: COLORS.white,
      accent: product.accent,
      accent2: product.accent2,
      soft: 'rgba(248,250,252,.28)',
      edge: COLORS.white,
      red: COLORS.red,
      blue: COLORS.blue,
      yellow: COLORS.yellow,
      green: COLORS.green,
    };
  }

  if (mode === 'no-edge' || mode === 'flat') {
    return {
      ink: product.accent,
      accent: product.accent2,
      accent2: COLORS.red,
      soft: 'rgba(17,24,32,.18)',
      edge: 'transparent',
      red: COLORS.red,
      blue: COLORS.blue,
      yellow: COLORS.yellow,
      green: COLORS.green,
    };
  }

  if (mode === 'minimal-light') {
    return {
      ink: COLORS.ink,
      accent: COLORS.ink,
      accent2: COLORS.ink,
      soft: 'rgba(17,24,32,.18)',
      edge: COLORS.ink,
      red: COLORS.ink,
      blue: COLORS.ink,
      yellow: COLORS.ink,
      green: COLORS.ink,
    };
  }

  return {
    ink: COLORS.ink,
    accent: product.accent,
    accent2: product.accent2,
    soft: 'rgba(17,24,32,.16)',
    edge: COLORS.ink,
    red: COLORS.red,
    blue: COLORS.blue,
    yellow: COLORS.yellow,
    green: COLORS.green,
  };
}

function svg({ product, mode }) {
  const p = palette(product, mode);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" width="96" height="96" role="img" aria-labelledby="title desc">
  <title id="title">${escapeXml(product.name)} Icon</title>
  <desc id="desc">${escapeXml(product.description)}</desc>
  <g fill="none" stroke-linecap="round" stroke-linejoin="round">
    ${product.symbol(p)}
  </g>
</svg>
`;
}

function camera(p) {
  return `<path d="M17 36.5Q17 29 24.5 29H34L40 21H56L62 29H71.5Q79 29 79 36.5V69Q79 76 72 76H24Q17 76 17 69Z" stroke="${p.ink}" stroke-width="7"/>
    <path d="M33 29H63" stroke="${p.soft}" stroke-width="7"/>
    <circle cx="48" cy="55" r="18" stroke="${p.ink}" stroke-width="7"/>
    <circle cx="48" cy="55" r="7" stroke="${p.accent}" stroke-width="7"/>
    <path d="M27 43H34" stroke="${p.accent2}" stroke-width="7"/>
    <path d="M65 43H69" stroke="${p.ink}" stroke-width="7"/>`;
}

function microphone(p) {
  return `<rect x="36" y="13" width="24" height="40" rx="12" stroke="${p.ink}" stroke-width="7"/>
    <path d="M25 43Q25 66 48 66Q71 66 71 43" stroke="${p.ink}" stroke-width="7"/>
    <path d="M48 66V80" stroke="${p.ink}" stroke-width="7"/>
    <path d="M34 80H62" stroke="${p.ink}" stroke-width="7"/>
    <path d="M20 35Q13 48 20 61" stroke="${p.accent}" stroke-width="7"/>
    <path d="M76 35Q83 48 76 61" stroke="${p.accent2}" stroke-width="7"/>
    <path d="M43 26H53" stroke="${p.soft}" stroke-width="6"/>`;
}

function rocket(p) {
  return `<path d="M48 10Q65 27 65 53Q65 67 56 78H40Q31 67 31 53Q31 27 48 10Z" stroke="${p.ink}" stroke-width="7"/>
    <circle cx="48" cy="45" r="8" stroke="${p.accent2}" stroke-width="7"/>
    <path d="M32 58Q19 63 13 78Q26 77 37 68" stroke="${p.accent}" stroke-width="7"/>
    <path d="M64 58Q77 63 83 78Q70 77 59 68" stroke="${p.accent}" stroke-width="7"/>
    <path d="M43 78L48 89L53 78" stroke="${p.ink}" stroke-width="7"/>
    <path d="M17 82Q48 67 79 82" stroke="${p.soft}" stroke-width="6"/>`;
}

function ledger(p) {
  return `<path d="M23 18H64Q74 18 74 28V78H34Q23 78 23 67Z" stroke="${p.ink}" stroke-width="7"/>
    <path d="M34 18V78" stroke="${p.ink}" stroke-width="7"/>
    <path d="M34 65H74" stroke="${p.ink}" stroke-width="7"/>
    <path d="M45 36H61" stroke="${p.soft}" stroke-width="6"/>
    <path d="M45 48H58" stroke="${p.soft}" stroke-width="6"/>
    <path d="M55 55L62 62L76 44" stroke="${p.accent2}" stroke-width="7"/>
    <path d="M24 31H33" stroke="${p.accent}" stroke-width="7"/>`;
}

const LOGO_REGION_PATHS = {
  red: 'M225 843 L156 727 L526 83 Q531 78 540 78 L632 78 Q639 78 644 88 L955 632 L813 632 L583 244 L252 795 Z',
  greenEdge: 'M246 845 L566 638 L973 638 Q983 639 989 648 L1023 716 Q1032 729 1023 743 L963 840 Q954 856 934 856 L222 856 Q239 847 246 845 Z',
  green: 'M253 844 L574 657 L966 657 L1009 727 L943 834 Q940 844 927 845 L253 845 Z',
  yellowEdge: 'M251 808 L504 383 L590 531 L503 697 Z',
  yellow: 'M291 777 L505 413 L571 532 L494 666 Z',
  blueEdge: 'M497 386 L582 239 L824 657 L646 657 Z',
  blue: 'M516 390 L582 275 L792 638 L657 638 Z',
  centerEdge: 'M503 682 L583 536 L654 656 L575 656 Z',
};

function registry(p) {
  return `<g transform="translate(-30 -26) scale(0.145)">
      <path d="${LOGO_REGION_PATHS.yellow}" fill="${p.yellow}" stroke="none"/>
      <path d="${LOGO_REGION_PATHS.blue}" fill="${p.blue}" stroke="none"/>
    </g>`;
}

function cluster(p) {
  return `<g transform="translate(-17 -30) scale(0.105)">
      <path d="${LOGO_REGION_PATHS.yellow}" fill="${p.yellow}" stroke="none"/>
      <path d="${LOGO_REGION_PATHS.green}" fill="${p.green}" stroke="none"/>
    </g>`;
}

function observable(p) {
  return `<g transform="translate(-13 -7) scale(0.105)">
      <path d="${LOGO_REGION_PATHS.red}" fill="${p.red}" stroke="${p.edge}" stroke-width="22" paint-order="stroke fill"/>
    </g>`;
}

function escapeXml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function readme(product, variants) {
  const svgFiles = variants.map(([fileName]) => `- \`SVG/${fileName}\` - ${variantDescription(fileName)}.`).join('\n');
  const pngFiles = variants.map(([fileName]) => `- \`PNG/${fileName.replace(/\.svg$/, '.png')}\` - 512 px PNG render of \`SVG/${fileName}\`.`).join('\n');

  return `# ${product.name} Icon

Product logo assets for **${product.name}**.

## Design Direction

${product.designDirection || `These marks use an original RE8CH system-symbol language: rounded strokes,
compact silhouettes, small-size legibility, and palette-aware variants. They are
not Apple SF Symbols artwork and do not copy Apple symbol shapes.`}

## Files

${svgFiles}
${pngFiles}

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

function variantDescription(fileName) {
  switch (fileName) {
    case 'icon.svg':
      return 'primary transparent product logo';
    case 'icon-no-edge.svg':
      return 'color-accent product logo without black keyline';
    case 'icon-gray.svg':
      return 'grayscale product logo';
    case 'icon-invert.svg':
    case 'icon-inverse.svg':
      return 'dark-surface product logo';
    case 'icon-flat.svg':
      return 'flat color-accent product logo';
    case 'icon-minimal-light.svg':
      return 'single-color light-surface product logo';
    case 'icon-minimal-dark.svg':
      return 'single-color dark-surface product logo';
    default:
      return 'product logo variant';
  }
}

async function main() {
  for (const product of products) {
    const variants = [...baseVariants, ...(product.extraVariants || [])];
    const base = path.join(root, 'PRODUCTS', product.slug);
    const svgDir = path.join(base, 'SVG');
    const pngDir = path.join(base, 'PNG');
    await fs.mkdir(svgDir, { recursive: true });
    await fs.mkdir(pngDir, { recursive: true });

    for (const [fileName, mode] of variants) {
      const content = svg({ product, mode });
      await fs.writeFile(path.join(svgDir, fileName), content, 'utf8');
      await sharp(Buffer.from(content))
        .resize(512, 512)
        .png()
        .toFile(path.join(pngDir, fileName.replace(/\.svg$/, '.png')));
    }

    await fs.writeFile(path.join(base, 'README.md'), readme(product, variants), 'utf8');
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
