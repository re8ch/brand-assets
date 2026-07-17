#!/usr/bin/env node

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const root = path.dirname(path.dirname(__filename));
const requestedProduct = process.argv.find((arg) => arg.startsWith('--product='))?.slice('--product='.length);

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
    description: 'Canonical Phonaid document handoff mark vectorized from the approved phonaid-logo.png asset.',
    designDirection: 'This logo is the approved Phonaid product mark: color document panels, two writing tools, a navy outline system, white filled hand surfaces, and a transparent outside background. The SVG keeps that composition rather than using the older microphone mark.',
    accent: COLORS.green,
    accent2: COLORS.yellow,
    svgSource: 'source/phonaid-logo.svg',
    pngSourceByMode: {
      primary: 'source/phonaid-logo.png',
      'no-edge': 'source/phonaid-logo.png',
    },
    canonicalSources: [
      'source/phonaid-logo.png',
      'source/phonaid-logo.svg',
    ],
  },
  {
    slug: 'anysiteonearth',
    name: 'Any Site on Earth',
    description: 'Canonical Anysite / Any Site on Earth modular site icon traced from the approved anysite-2.png source.',
    designDirection: 'This logo uses the approved Anysite modular structure mark: stacked site blocks, dark architectural outlines, and light interior surfaces. The SVG is traced from the approved PNG source because no production SVG source exists.',
    accent: COLORS.blue,
    accent2: COLORS.green,
    svgSource: 'source/anysiteonearth-icon.svg',
    tracedSvg: true,
    pngSourceByMode: {
      primary: 'source/anysite-2.png',
      'no-edge': 'source/anysite-2.png',
      flat: 'source/anysite-2.png',
    },
    canonicalSources: [
      'source/anysite-1.png',
      'source/anysite-2.png',
      'source/anysiteonearth-icon.svg',
    ],
    copyFiles: [
      ['source/anysite-2.png', 'PNG/icon-1024.png'],
    ],
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
    description: 'Canonical 理账 Ledger app icon copied from the production mini program asset.',
    designDirection: 'This logo uses the approved mini program icon without redesign. The primary PNG files are copied from the production mini program source, while SVG files use the matching production vector geometry.',
    accent: COLORS.blue,
    accent2: COLORS.yellow,
    svgSource: 'source/lizhang-ledger-icon.svg',
    pngSourceByMode: {
      primary: 'source/lizhang-ledger-icon-512.png',
      'no-edge': 'source/lizhang-ledger-icon-512.png',
    },
    canonicalSources: [
      'source/lizhang-ledger-icon.png',
      'source/lizhang-ledger-icon-512.png',
      'source/lizhang-ledger-icon.svg',
    ],
    copyFiles: [
      ['source/lizhang-ledger-icon.png', 'PNG/icon-1024.png'],
    ],
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

async function svg({ product, mode, base }) {
  if (product.svgSource) {
    const source = await fs.readFile(path.join(base, product.svgSource), 'utf8');
    if (product.slug === 'lizhang-ledger') {
      return ledgerSvgVariant(source, mode);
    }

    if (product.tracedSvg) {
      return tracedSvgVariant(source, product, mode);
    }

    return source;
  }

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

function rocket(p) {
  return `<path d="M48 10Q65 27 65 53Q65 67 56 78H40Q31 67 31 53Q31 27 48 10Z" stroke="${p.ink}" stroke-width="7"/>
    <circle cx="48" cy="45" r="8" stroke="${p.accent2}" stroke-width="7"/>
    <path d="M32 58Q19 63 13 78Q26 77 37 68" stroke="${p.accent}" stroke-width="7"/>
    <path d="M64 58Q77 63 83 78Q70 77 59 68" stroke="${p.accent}" stroke-width="7"/>
    <path d="M43 78L48 89L53 78" stroke="${p.ink}" stroke-width="7"/>
    <path d="M17 82Q48 67 79 82" stroke="${p.soft}" stroke-width="6"/>`;
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

function tracedSvgVariant(source, product, mode) {
  const viewBox = source.match(/viewBox="([^"]+)"/)?.[1] || '0 0 512 512';
  const inner = source
    .replace(/^.*?<svg\b[^>]*>/s, '')
    .replace(/<\/svg>\s*$/s, '');
  const isGray = mode === 'gray' || mode === 'minimal-light';
  const isInverted = mode === 'invert' || mode === 'inverse' || mode === 'minimal-dark';
  const filter = isGray
    ? `<filter id="variant-gray"><feColorMatrix type="saturate" values="0"/></filter>`
    : isInverted
      ? `<filter id="variant-invert"><feComponentTransfer><feFuncR type="table" tableValues="1 0"/><feFuncG type="table" tableValues="1 0"/><feFuncB type="table" tableValues="1 0"/></feComponentTransfer></filter>`
      : '';
  const filterRef = isGray
    ? ' filter="url(#variant-gray)"'
    : isInverted
      ? ' filter="url(#variant-invert)"'
      : '';

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" width="512" height="512" role="img" aria-labelledby="title desc">
  <title id="title">${escapeXml(product.name)} Icon</title>
  <desc id="desc">${escapeXml(product.description)}</desc>
  ${filter ? `<defs>${filter}</defs>` : ''}
  <g${filterRef}>${inner}</g>
</svg>
`;
}

function ledgerSvgVariant(source, mode) {
  if (mode === 'primary' || mode === 'no-edge') {
    return source;
  }

  const replacements = mode === 'gray'
    ? [
        ['#020202', '#1f2937'],
        ['#f8fafc', '#f8fafc'],
        ['#2563eb', '#64748b'],
        ['#ffffff', '#ffffff'],
        ['#00b559', '#94a3b8'],
        ['#f81018', '#475569'],
        ['#ffd619', '#cbd5e1'],
      ]
    : [
        ['#020202', '#f8fafc'],
        ['#f8fafc', '#111820'],
        ['#2563eb', '#2f7df6'],
        ['#ffffff', '#111820'],
        ['#00b559', '#00c266'],
        ['#f81018', '#ff2633'],
        ['#ffd619', '#ffd619'],
      ];

  return replacements.reduce(
    (content, [from, to]) => content.replaceAll(from, to),
    source,
  );
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
  const pngFiles = variants.map(([fileName, mode]) => {
    const pngFileName = fileName.replace(/\.svg$/, '.png');
    const source = product.pngSourceByMode?.[mode];
    return source
      ? `- \`PNG/${pngFileName}\` - 512 px PNG from canonical source \`${source}\`.`
      : `- \`PNG/${pngFileName}\` - 512 px PNG render of \`SVG/${fileName}\`.`;
  }).join('\n');
  const sourceFiles = (product.canonicalSources || []).map((fileName) => `- \`${fileName}\` - canonical approved source asset.`).join('\n');
  const copiedFiles = (product.copyFiles || []).map(([, fileName]) => `- \`${fileName}\` - copied canonical production asset.`).join('\n');
  const sourceSection = sourceFiles
    ? `\n## Canonical Sources\n\n${sourceFiles}\n`
    : '';

  return `# ${product.name} Icon

Product logo assets for **${product.name}**.

## Design Direction

${product.designDirection || `These marks use an original RE8CH system-symbol language: rounded strokes,
compact silhouettes, small-size legibility, and palette-aware variants. They are
not Apple SF Symbols artwork and do not copy Apple symbol shapes.`}

## Files

${svgFiles}
${pngFiles}${copiedFiles ? `\n\n${copiedFiles}` : ''}${sourceSection}

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
  const selectedProducts = requestedProduct
    ? products.filter((product) => product.slug === requestedProduct)
    : products;

  if (requestedProduct && selectedProducts.length === 0) {
    throw new Error(`Unknown product slug: ${requestedProduct}`);
  }

  for (const product of selectedProducts) {
    const variants = [...baseVariants, ...(product.extraVariants || [])];
    const base = path.join(root, 'PRODUCTS', product.slug);
    const svgDir = path.join(base, 'SVG');
    const pngDir = path.join(base, 'PNG');
    await fs.mkdir(svgDir, { recursive: true });
    await fs.mkdir(pngDir, { recursive: true });

    for (const [fileName, mode] of variants) {
      const content = await svg({ product, mode, base });
      await fs.writeFile(path.join(svgDir, fileName), content, 'utf8');
      const pngSource = product.pngSourceByMode?.[mode];
      const pngTarget = path.join(pngDir, fileName.replace(/\.svg$/, '.png'));
      if (pngSource) {
        const pngSourcePath = path.join(base, pngSource);
        const metadata = await sharp(pngSourcePath).metadata();
        if (metadata.width === 512 && metadata.height === 512) {
          await fs.copyFile(pngSourcePath, pngTarget);
        } else {
          await sharp(pngSourcePath)
            .resize(512, 512)
            .png()
            .toFile(pngTarget);
        }
      } else {
        await sharp(Buffer.from(content))
          .resize(512, 512)
          .png()
          .toFile(pngTarget);
      }
    }

    for (const [source, target] of product.copyFiles || []) {
      await fs.copyFile(path.join(base, source), path.join(base, target));
    }

    await fs.writeFile(path.join(base, 'README.md'), readme(product, variants), 'utf8');
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
