const currentScript = document.currentScript;
const scriptUrl = new URL(currentScript?.src || import.meta.url);
const baseUrl = scriptUrl.href.replace(/\/UI\/re8ch-product-system\/v1\/re8ch-product-system\.js(?:\?.*)?$/, '');
const componentBase = `${baseUrl}/UI/re8ch-product-system/v1`;
const assetVersion = scriptUrl.search || '';
const cssHref = `${componentBase}/re8ch-product-system.css${assetVersion}`;

const colors = {
  registry: '#0a7fbe',
  cluster: '#00b559',
  observable: '#f81018',
  red: '#f81018',
  yellow: '#ffd619',
  green: '#00b559',
  blue: '#0a7fbe',
  ink: '#08111f',
  light: '#f7faff',
};

const footerData = {
  productLinks: [
    ['RE8CH', 'https://re8ch.com'],
    ['AnySite', 'https://anysiteonearth.re8ch.com'],
    ['Ledger', 'https://ledger.re8ch.com'],
    ['Registry Image', 'https://image.re8ch.com'],
    ['Cluster', 'https://cluster.re8ch.com'],
    ['Observable', 'https://observable.re8ch.com'],
    ['Anycam', 'https://anycam.re8ch.com'],
    ['Phonaid', 'https://phonaid.com'],
  ],
  trustLinks: [
    ['Career', 'https://www.linkedin.com/company/107777110'],
    ['US Certificate', 'https://biz.sosmt.gov/search/business'],
    ['D-U-N-S', 'https://www.dnb.com/duns-number/lookup.html'],
    ['Crunchbase', 'https://www.crunchbase.com/organization/re8ch'],
    ['AngelList', 'https://stack.angellist.com/company/re8ch'],
    ['YC Co-Founder', 'https://www.startupschool.org/cofounder-matching/candidate/k04bmwSEL'],
    ['CoffeeSpace', 'https://www.coffeespace.com/find-cofounders/by-location/united-states'],
    ['China Credit', 'https://www.gsxt.gov.cn/index.html'],
  ],
  content: {
    en: {
      brand: 'RE8CH',
      tagline: 'Reusable product surfaces, runtime layers, and verification signals.',
      productNetworkTitle: 'Product Network',
      productNetworkBody: 'Owned products and capability sites',
      contactTitle: 'Contact',
      externalTitle: 'External verification',
      addressTitle: 'Address',
      email: 'contact@re8ch.com',
      careerEmail: 'career@re8ch.com',
      website: 'www.re8ch.com',
      address: '13359 North Highway 183, Austin, Texas, USA',
      copyright: '© 2026 Reachieve LLC. All rights reserved.',
      icp: '湘ICP备2025130798号-4',
    },
    zh: {
      brand: '锐奇创想 RE8CH',
      tagline: '统一产品视觉、运行层级与外部核验入口。',
      productNetworkTitle: 'Product Network',
      productNetworkBody: '自营产品与能力展示站点',
      contactTitle: 'Contact',
      externalTitle: 'External verification',
      addressTitle: 'Address',
      email: 'contact@re8ch.com',
      careerEmail: 'career@re8ch.com',
      website: 'www.re8ch.com',
      address: '湖南省娄底市涟源市杨市镇锐奇软件开发工作室',
      copyright: '© 2026 锐奇创想经济咨询. All rights reserved.',
      icp: '湘ICP备2025130798号-4',
    },
  },
};

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function cssLink() {
  return `<link rel="stylesheet" href="${cssHref}">`;
}

function iconUrl(product) {
  const key = product === 'image' || product === 'registry-image' ? 'registry' : product;
  return `${baseUrl}/PRODUCTS/${key}/SVG/icon.svg`;
}

function themeIsDark(host) {
  return host.getAttribute('theme') === 'dark' || document.documentElement.dataset.theme === 'dark';
}

function fitCanvas(canvas, host) {
  const parentRect = canvas.parentElement?.getBoundingClientRect();
  const rect = parentRect && parentRect.width > 0 && parentRect.height > 0
    ? parentRect
    : canvas.getBoundingClientRect();
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.max(1, Math.floor(rect.width * dpr));
  canvas.height = Math.max(1, Math.floor(rect.height * dpr));
  canvas.style.width = `${rect.width}px`;
  canvas.style.height = `${rect.height}px`;
  const ctx = canvas.getContext('2d');
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  return { ctx, w: rect.width, h: rect.height, dark: themeIsDark(host) };
}

function roundedRectPath(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function prism(ctx, cx, cy, width, height, depth, color, label, active, tilt = 0) {
  const skew = width * 0.18;
  const top = [
    [cx - width / 2 + skew + tilt, cy - height / 2],
    [cx + width / 2 + skew + tilt, cy - height / 2 + height * 0.16],
    [cx + width / 2 - skew + tilt, cy + height / 2],
    [cx - width / 2 - skew + tilt, cy + height / 2 - height * 0.16],
  ];
  const bottom = top.map(([x, y]) => [x, y + depth]);
  ctx.save();
  ctx.globalAlpha = active ? 0.95 : 0.34;
  ctx.fillStyle = color;
  ctx.strokeStyle = color;
  ctx.lineWidth = active ? 2 : 1;
  ctx.shadowColor = active ? color : 'transparent';
  ctx.shadowBlur = active ? 28 : 0;

  ctx.beginPath();
  ctx.moveTo(...top[2]);
  ctx.lineTo(...top[3]);
  ctx.lineTo(...bottom[3]);
  ctx.lineTo(...bottom[2]);
  ctx.closePath();
  ctx.fillStyle = shade(color, -32);
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(...top[1]);
  ctx.lineTo(...top[2]);
  ctx.lineTo(...bottom[2]);
  ctx.lineTo(...bottom[1]);
  ctx.closePath();
  ctx.fillStyle = shade(color, -18);
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(...top[0]);
  for (let i = 1; i < top.length; i += 1) ctx.lineTo(...top[i]);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
  ctx.stroke();

  ctx.shadowBlur = 0;
  ctx.fillStyle = active ? '#ffffff' : 'rgba(255,255,255,.74)';
  ctx.font = `900 ${Math.max(13, Math.min(18, width / 16))}px system-ui, -apple-system, Segoe UI, sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(label, cx + tilt, cy + depth * 0.1);
  ctx.restore();
}

function shade(hex, amount) {
  const n = parseInt(hex.slice(1), 16);
  const clamp = (v) => Math.max(0, Math.min(255, v));
  return `rgb(${clamp((n >> 16) + amount)}, ${clamp(((n >> 8) & 255) + amount)}, ${clamp((n & 255) + amount)})`;
}

function drawStack(ctx, w, h, active, time, dark, alpha = 1) {
  ctx.save();
  ctx.globalAlpha = alpha;
  const centerX = w * 0.5;
  const centerY = h * 0.44 + Math.sin(time * 0.001) * 5;
  const width = Math.min(w * 0.64, 420);
  const height = Math.min(h * 0.18, 86);
  const depth = Math.min(h * 0.07, 34);
  const order = active === 'observable' ? ['observable', 'cluster', 'registry'] : ['registry', 'cluster', 'observable'];
  const labels = { registry: 'Registry', cluster: 'Cluster', observable: 'Observable' };
  const yMap = active === 'registry'
    ? { registry: -112, cluster: 2, observable: 114 }
    : active === 'cluster'
      ? { registry: -98, cluster: 8, observable: 116 }
      : { observable: -110, cluster: 6, registry: 118 };
  ctx.strokeStyle = dark ? 'rgba(238,246,255,.14)' : 'rgba(8,17,31,.1)';
  for (let i = 0; i < 16; i += 1) {
    const r = 42 + i * 18;
    ctx.beginPath();
    ctx.ellipse(centerX, centerY + 28, r * 1.3, r * 0.32, -0.12, 0, Math.PI * 2);
    ctx.stroke();
  }
  order.forEach((layer) => {
    const activeLayer = layer === active;
    const scale = activeLayer ? 1.08 : 0.84;
    prism(
      ctx,
      centerX,
      centerY + yMap[layer],
      width * scale,
      height * scale,
      depth * (activeLayer ? 1.15 : 0.75),
      colors[layer],
      labels[layer],
      activeLayer,
      Math.sin(time * 0.0006 + yMap[layer]) * 8
    );
  });
  ctx.restore();
}

function drawSignals(ctx, w, h, simulation, active, time, dark) {
  const t = (time * 0.00018) % 1;
  if (simulation === 'cluster-traffic') drawClusterFlow(ctx, w, h, t, dark);
  else if (simulation === 'observable-correlation') drawObservableFlow(ctx, w, h, t, dark);
  else drawRegistryFlow(ctx, w, h, t, dark);
}

function text(ctx, label, x, y, size, dark, color = null) {
  ctx.fillStyle = color || (dark ? '#eef6ff' : '#08111f');
  ctx.font = `900 ${size}px system-ui, -apple-system, Segoe UI, sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(label, x, y);
}

function pulse(ctx, x, y, r, color, t) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.globalAlpha = 0.28 * (1 - t);
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(x, y, r + t * 36, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
}

function drawNode(ctx, x, y, label, color, dark, active = true) {
  ctx.save();
  ctx.fillStyle = color;
  ctx.shadowColor = color;
  ctx.shadowBlur = active ? 18 : 6;
  ctx.beginPath();
  ctx.arc(x, y, active ? 16 : 10, 0, Math.PI * 2);
  ctx.fill();
  ctx.shadowBlur = 0;
  text(ctx, label, x, y + 34, 12, dark);
  ctx.restore();
}

function drawRegistryFlow(ctx, w, h, t, dark) {
  const y = h * 0.72;
  const steps = ['Source', 'Build', 'Image', 'Sign', 'SBOM', 'Policy', 'Production'];
  const start = w * 0.14;
  const gap = (w * 0.72) / (steps.length - 1);
  ctx.save();
  ctx.strokeStyle = dark ? 'rgba(238,246,255,.18)' : 'rgba(8,17,31,.14)';
  ctx.setLineDash([7, 8]);
  ctx.beginPath();
  ctx.moveTo(start, y);
  ctx.lineTo(start + gap * (steps.length - 1), y);
  ctx.stroke();
  ctx.setLineDash([]);
  steps.forEach((s, i) => drawNode(ctx, start + i * gap, y, s, i <= Math.floor(t * steps.length) ? colors.registry : colors.blue, dark, i <= Math.floor(t * steps.length)));
  const cubeX = w * 0.5;
  const cubeY = h * 0.43;
  prism(ctx, cubeX, cubeY, Math.min(w * 0.28, 168), Math.min(h * 0.18, 94), 34, colors.registry, 'Image Cube', true, 0);
  const scanX = cubeX - 92 + (t * 184);
  ctx.fillStyle = 'rgba(10,127,190,.24)';
  roundedRectPath(ctx, scanX, cubeY - 88, 18, 176, 9);
  ctx.fill();
  ctx.strokeStyle = colors.yellow;
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(cubeX - 62, cubeY + 82);
  ctx.lineTo(cubeX + 64, cubeY + 82);
  ctx.stroke();
  ctx.restore();
}

function drawClusterFlow(ctx, w, h, t, dark) {
  const nodes = [
    ['User', .12, .72, colors.blue],
    ['Gateway', .28, .72, colors.green],
    ['Function', .43, .55, colors.green],
    ['Control', .52, .73, colors.blue],
    ['Workers', .69, .62, colors.green],
    ['Service', .86, .72, colors.green],
  ];
  ctx.save();
  ctx.strokeStyle = dark ? 'rgba(238,246,255,.18)' : 'rgba(8,17,31,.14)';
  ctx.setLineDash([7, 8]);
  ctx.beginPath();
  for (let i = 0; i < nodes.length; i += 1) {
    const [, px, py] = nodes[i];
    const x = px * w;
    const y = py * h;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();
  ctx.setLineDash([]);
  nodes.forEach(([label, px, py, color]) => drawNode(ctx, px * w, py * h, label, color, dark));
  pulse(ctx, w * .52, h * .73, 22, colors.blue, (t * 2) % 1);
  for (let i = 0; i < 7; i += 1) {
    const x = w * (.62 + (i % 3) * .07);
    const y = h * (.48 + Math.floor(i / 3) * .12);
    drawNode(ctx, x, y, '', i === 4 ? '#f59e0b' : colors.green, dark, i !== 4);
  }
  const dotX = w * (.12 + ((t + .1) % 1) * .74);
  ctx.fillStyle = colors.blue;
  ctx.beginPath();
  ctx.arc(dotX, h * (.72 - Math.sin(t * Math.PI) * .12), 4, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawObservableFlow(ctx, w, h, t, dark) {
  const center = [w * .5, h * .58];
  const signals = [
    ['Logs', .16, .34, colors.blue],
    ['Metrics', .84, .36, colors.green],
    ['Traces', .16, .82, colors.yellow],
    ['Alerts', .84, .82, colors.red],
  ];
  ctx.save();
  signals.forEach(([label, px, py, color], i) => {
    const x = px * w;
    const y = py * h;
    ctx.strokeStyle = color;
    ctx.globalAlpha = .5;
    ctx.setLineDash([7, 8]);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.quadraticCurveTo(w * .5, y, center[0], center[1]);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.globalAlpha = 1;
    drawNode(ctx, x, y, label, color, dark);
    const p = (t + i * .18) % 1;
    const sx = x + (center[0] - x) * p;
    const sy = y + (center[1] - y) * p;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(sx, sy, 4, 0, Math.PI * 2);
    ctx.fill();
  });
  drawNode(ctx, center[0], center[1], 'Correlation Engine', colors.observable, dark);
  const path = [
    ['Database timeout', w * .34, h * .74, colors.red],
    ['Payment latency', w * .5, h * .82, colors.yellow],
    ['Alert firing', w * .68, h * .74, colors.red],
  ];
  ctx.strokeStyle = colors.yellow;
  ctx.lineWidth = 3;
  ctx.beginPath();
  path.forEach(([_, x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
  ctx.stroke();
  path.forEach(([label, x, y, color]) => drawNode(ctx, x, y, label, color, dark, true));
  ctx.restore();
}

class Re8chProductHero extends HTMLElement {
  connectedCallback() {
    const product = this.getAttribute('product') || 'registry';
    const activeLayer = this.getAttribute('active-layer') || product;
    const simulation = this.getAttribute('simulation') || 'registry-artifact';
    const title = this.getAttribute('title') || 'RE8CH product system';
    const subtitle = this.getAttribute('subtitle') || '';
    const eyebrow = this.getAttribute('eyebrow') || `RE8CH ${product}`;
    const lead = this.getAttribute('lead') || this.getAttribute('description') || '';
    const primaryLabel = this.getAttribute('primary-label') || 'Explore';
    const primaryHref = this.getAttribute('primary-href') || '#workflow';
    const secondaryLabel = this.getAttribute('secondary-label') || 'Live Case';
    const secondaryHref = this.getAttribute('secondary-href') || '#live';
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `${cssLink()}
      <section class="rps-hero">
        <div class="rps-strip"></div>
        <div class="rps-inner">
          <div class="rps-copy">
            <p class="rps-eyebrow"><img src="${iconUrl(product)}" alt="">${escapeHtml(eyebrow)}</p>
            <h1>${escapeHtml(title).replace(/\\b(build|runtime|root-cause|deploy|clarity|production|right)\\b/gi, '<strong>$1</strong>')}</h1>
            <p class="rps-subtitle">${escapeHtml(subtitle)}</p>
            <p class="rps-lead">${escapeHtml(lead)}</p>
            <div class="rps-actions">
              <a class="rps-button primary" href="${escapeHtml(primaryHref)}">${escapeHtml(primaryLabel)}</a>
              <a class="rps-button secondary" href="${escapeHtml(secondaryHref)}">${escapeHtml(secondaryLabel)}</a>
            </div>
          </div>
          <div class="rps-stage" part="stage">
            <canvas class="rps-stack-canvas" aria-hidden="true"></canvas>
            <canvas class="rps-canvas" aria-hidden="true"></canvas>
            <div class="rps-fallback">${fallbackSteps(simulation)}</div>
          </div>
        </div>
      </section>`;
    this.start(activeLayer, simulation);
  }

  start(activeLayer, simulation) {
    const stage = this.shadowRoot.querySelector('.rps-stage');
    const stackCanvas = this.shadowRoot.querySelector('.rps-stack-canvas');
    const flowCanvas = this.shadowRoot.querySelector('.rps-canvas');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const frame = (time = 0) => {
      const stack = fitCanvas(stackCanvas, this);
      const flow = fitCanvas(flowCanvas, this);
      stack.ctx.clearRect(0, 0, stack.w, stack.h);
      flow.ctx.clearRect(0, 0, flow.w, flow.h);
      drawStack(stack.ctx, stack.w, stack.h, activeLayer, time, stack.dark, 0.9);
      drawSignals(flow.ctx, flow.w, flow.h, simulation, activeLayer, time, flow.dark);
      stage.classList.add('rps-ready');
      if (!reduce) this._raf = requestAnimationFrame(frame);
    };
    this._resize = () => frame(performance.now());
    window.addEventListener('resize', this._resize);
    window.addEventListener('re8ch-theme-change', this._resize);
    frame();
  }

  disconnectedCallback() {
    if (this._raf) cancelAnimationFrame(this._raf);
    if (this._resize) {
      window.removeEventListener('resize', this._resize);
      window.removeEventListener('re8ch-theme-change', this._resize);
    }
  }
}

function fallbackSteps(simulation) {
  const steps = simulation === 'cluster-traffic'
    ? ['User Request', 'Gateway', 'Cloud Function', 'Control Plane', 'Worker Pool', 'Service']
    : simulation === 'observable-correlation'
      ? ['Logs', 'Metrics', 'Traces', 'Alerts', 'Root Cause']
      : ['Source Code', 'Build Layer', 'Container Image', 'Signature', 'SBOM', 'Policy Gate', 'Production'];
  return steps.map((step) => `<div class="rps-fallback-step">${step}</div>`).join('');
}

class Re8chLayerStack extends HTMLElement {
  connectedCallback() {
    const activeLayer = this.getAttribute('active-layer') || 'registry';
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `${cssLink()}<div class="rps-layer-card"><canvas class="rps-stack-canvas" aria-hidden="true"></canvas></div>`;
    const canvas = this.shadowRoot.querySelector('canvas');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const frame = (time = 0) => {
      const { ctx, w, h, dark } = fitCanvas(canvas, this);
      ctx.clearRect(0, 0, w, h);
      drawStack(ctx, w, h, activeLayer, time, dark, 1);
      if (!reduce) this._raf = requestAnimationFrame(frame);
    };
    this._resize = () => frame(performance.now());
    window.addEventListener('resize', this._resize);
    window.addEventListener('re8ch-theme-change', this._resize);
    frame();
  }

  disconnectedCallback() {
    if (this._raf) cancelAnimationFrame(this._raf);
    if (this._resize) {
      window.removeEventListener('resize', this._resize);
      window.removeEventListener('re8ch-theme-change', this._resize);
    }
  }
}

class Re8chProductFooter extends HTMLElement {
  connectedCallback() {
    const locale = (this.getAttribute('locale') || document.documentElement.lang || 'en').toLowerCase().startsWith('zh') ? 'zh' : 'en';
    const t = footerData.content[locale];
    const product = this.getAttribute('product') || '';
    const currentProduct = product === 'registry' ? 'image' : product;
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `${cssLink()}
      <footer class="rps-footer">
        <div class="rps-footer-inner">
          <div class="rps-footer-top">
            <img class="rps-footer-logo" src="${baseUrl}/SVG/logo.svg" alt="">
            <div><strong>${escapeHtml(t.brand)}</strong><p>${escapeHtml(t.tagline)}</p></div>
          </div>
          <div class="rps-footer-main">
            <section class="rps-footer-section">
              <h2>${escapeHtml(t.productNetworkTitle)}</h2>
              <p>${escapeHtml(t.productNetworkBody)}</p>
              <nav class="rps-links" aria-label="Product Network">${footerData.productLinks.map(([label, href]) => `<a href="${href}"${href.includes(currentProduct) ? ' aria-current="page"' : ''}>${escapeHtml(label)}</a>`).join('')}</nav>
            </section>
            <section class="rps-footer-section">
              <h2>${escapeHtml(t.contactTitle)}</h2>
              <div class="rps-links">
                <a href="mailto:${t.email}">${escapeHtml(t.email)}</a>
                <a href="mailto:${t.careerEmail}">${escapeHtml(t.careerEmail)}</a>
                <a href="https://www.re8ch.com">${escapeHtml(t.website)}</a>
              </div>
            </section>
            <section class="rps-footer-section"><h2>${escapeHtml(t.externalTitle)}</h2><nav class="rps-links">${footerData.trustLinks.map(([label, href]) => `<a href="${href}" rel="noopener">${escapeHtml(label)}</a>`).join('')}</nav></section>
            <section class="rps-footer-section"><h2>${escapeHtml(t.addressTitle)}</h2><p>${escapeHtml(t.address)}</p></section>
          </div>
          <div class="rps-footer-bottom"><span>${escapeHtml(t.copyright)}</span><a href="https://beian.miit.gov.cn" rel="noopener">${escapeHtml(t.icp)}</a></div>
        </div>
      </footer>`;
  }
}

if (!customElements.get('re8ch-product-hero')) customElements.define('re8ch-product-hero', Re8chProductHero);
if (!customElements.get('re8ch-layer-stack')) customElements.define('re8ch-layer-stack', Re8chLayerStack);
if (!customElements.get('re8ch-product-footer')) customElements.define('re8ch-product-footer', Re8chProductFooter);
