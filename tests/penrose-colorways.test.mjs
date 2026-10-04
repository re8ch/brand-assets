import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { colorways, palette, renderSvg } from '../scripts/generate-penrose-colorways.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

test('all 24 color assignments exist exactly once and match generated SVGs', () => {
  assert.equal(colorways.length, 24);
  assert.equal(new Set(colorways.map(({ code }) => code)).size, 24);
  for (const variant of colorways) {
    assert.equal(new Set(variant.code).size, 4);
    const file = path.join(root, 'SVG', 'penrose', `re8ch-${variant.code}.svg`);
    assert.equal(fs.readFileSync(file, 'utf8'), renderSvg(variant));
    for (const hex of Object.values(palette)) assert.ok(renderSvg(variant).includes(hex));
  }
});

test('glow follows three inner edges and three extensions without a center fill', () => {
  const svg = renderSvg(colorways[0]);
  assert.match(svg, /id="inner-edge-glow"/);
  assert.match(svg, /id="extended-edge-glow"/);
  for (const line of ['M 448 410 L 356 569', 'M 448 410 L 540 569', 'M 356 569 L 540 569', 'M 356 569 L 292 684', 'M 377 288 L 448 410', 'M 540 569 L 682 569']) {
    assert.ok(svg.includes(line), line);
  }
  assert.doesNotMatch(svg, /<circle/);
});

test('animated SVG cycles the same 24 assignments and honors reduced motion', () => {
  const file = fs.readFileSync(path.join(root, 'ANIME', 'penrose-24-color-cycle.svg'), 'utf8');
  assert.equal(file, renderSvg(colorways[0], true));
  for (const slot of ['left', 'right', 'base', 'glow']) {
    assert.match(file, new RegExp(`@keyframes ${slot}-cycle`));
  }
  assert.match(file, /prefers-reduced-motion: reduce/);
  assert.match(file, /72s linear infinite/);
});
