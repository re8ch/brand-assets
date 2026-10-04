import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

function load(component) {
  const document = { querySelector: () => null, baseURI: 'https://example.test/', documentElement: { dataset: {} }, hidden: false };
  const callbacks = new Map();
  let frame = 0;
  const context = { document, window: {}, URL, HTMLElement: class {}, customElements: { get() {}, define() {} },
    localStorage: { setItem() {} }, matchMedia: () => ({ matches: false }),
    requestAnimationFrame: fn => { callbacks.set(++frame, fn); return frame; }, cancelAnimationFrame: id => callbacks.delete(id) };
  vm.runInNewContext(readFileSync(`src/re8ch-${component}.js`, 'utf8'), context);
  return { context, callbacks, Class: context.window[component === 'footer' ? 'Re8chFooter' : 'Re8chNavigator'] };
}

test('published CDN copies match their source', () => {
  for (const component of ['navigator', 'footer']) for (const extension of ['css', 'js']) {
    const name = `re8ch-${component}.${extension}`;
    for (const target of ['dist', 'dist/current']) assert.equal(readFileSync(`${target}/${name}`, 'utf8'), readFileSync(`src/${name}`, 'utf8'));
  }
});

test('opacity handles absent values, 1% steps and bounds', () => {
  const { Class } = load('navigator');
  const nav = new Class();
  nav.accessibility = {};
  nav.applyAccessibility = () => {};
  for (const [input, expected] of [[null, .78], ['', .78], [.79, .79], [.01, .1], [1, .9], ['bad', .78]]) {
    nav.setGlassOpacity(input);
    assert.equal(nav.accessibility.glassOpacity, expected);
  }
});

test('marquee moves slowly, loops seamlessly and respects pause states', () => {
  const { Class, context, callbacks } = load('footer');
  const footer = new Class();
  const items = Array.from({ length: 3 }, (_, id) => ({ id, getBoundingClientRect: () => ({ width: 100 }) }));
  const track = { children: items, get firstElementChild() { return items[0]; }, style: {}, appendChild(item) { items.splice(items.indexOf(item), 1); items.push(item); } };
  const rail = { dataset: {}, style: { getPropertyValue: () => '2' }, querySelector: () => track };
  const tooltip = { hidden: true };
  footer.querySelector = selector => selector === '[data-loop-rail]' ? rail : selector === '[data-record-tooltip]' ? tooltip : null;
  footer.querySelectorAll = () => [];
  footer.isCompactRail = () => false;
  footer.matches = () => false;
  footer.setupScrollRails();
  let time = 1000;
  const tick = () => { const [id, fn] = callbacks.entries().next().value; callbacks.delete(id); fn(time); time += 50; };
  tick(); tick();
  assert.equal(rail.marqueeOffset, .6);
  for (const stop of [() => { rail.dataset.paused = 'true'; }, () => { context.document.documentElement.dataset.re8chReduceMotion = 'true'; }, () => { context.matchMedia = () => ({ matches: true }); }, () => { tooltip.hidden = false; }, () => { context.document.hidden = true; }, () => { footer.matches = () => true; }]) {
    rail.dataset.paused = 'false'; context.document.documentElement.dataset.re8chReduceMotion = 'false';
    context.matchMedia = () => ({ matches: false }); tooltip.hidden = true; context.document.hidden = false; footer.matches = () => false;
    stop(); const before = rail.marqueeOffset; tick(); assert.equal(rail.marqueeOffset, before);
  }
  footer.matches = () => false;
  rail.marqueeOffset = 99.8; tick();
  assert.equal(track.firstElementChild.id, 1);
  assert.ok(rail.marqueeOffset < 1);
  footer.setupScrollRails();
  assert.equal(callbacks.size, 1, 're-render must cancel the old animation loop');
});
