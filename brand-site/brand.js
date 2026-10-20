// brand.re8ch.com showcase. Assets come from the brand-assets CDN in
// production and from the repository checkout when served locally.
(() => {
  const CDN = 'https://brand-assets.re8ch.com';
  const local = location.protocol === 'file:' || ['localhost', '127.0.0.1', '[::1]'].includes(location.hostname);
  const BASE = document.documentElement.dataset.assetBase || (local ? '..' : CDN);
  const asset = (path) => `${BASE}/${path}`;
  const cdn = (path) => `${CDN}/${path}`;

  const LANGUAGES = [
    { value: 'zh-CN', label: '简体中文', nativeLabel: '简体中文' },
    { value: 'en', label: 'English', nativeLabel: 'English' },
  ];

  // English copy keyed by data-i18n. Chinese lives in the HTML and is cached
  // on first run so switching back restores it.
  const EN = {
    toc: 'Page sections',
    tocLabel: 'Brand center',
    'nav.overview': 'Overview',
    'nav.logo': 'Logo',
    'nav.color': 'Color',
    'nav.type': 'Typography',
    'nav.products': 'Product marks',
    'nav.orgs': 'Org avatars',
    'nav.icons': 'Icons',
    'nav.ui': 'UI elements',
    'nav.components': 'Components',
    'nav.motion': 'Logo motion',
    'nav.examples': 'Product UI',
    'nav.rules': 'Principles',
    'hero.title': 'One mark,<br>every product.',
    'hero.lead': 'Logos, color, type, product marks and shared interface components for RE8CH / 锐奇. Every file is referenced straight from the brand-assets CDN, so there is nothing to copy around.',
    'hero.cta': 'See the logo',
    'hero.repo': 'Source repository',
    'lockups.title': 'Trademark lockups',
    'lockups.lead': 'Pair the graphic mark with one of these four names, set to the right of the mark and vertically centred.',
    'logo.title': 'Logo',
    'logo.lead': 'Six variants cover color, grayscale and inverted use. Use the black-edge mark on light backgrounds and the invert mark on dark ones; switch to no-edge when space is tight or the mark is very small.',
    'logo.do': 'Do',
    'logo.do1': 'Scale proportionally and keep clear space of at least half the mark height',
    'logo.do2': 'Use the invert variant on dark backgrounds',
    'logo.do3': 'Reference the CDN SVG on the web, with a version query',
    'logo.dont': 'Avoid',
    'logo.dont1': 'Stretching, rotating, recoloring or reordering the color regions',
    'logo.dont2': 'Adding drop shadows, glows or gradients',
    'logo.dont3': 'Placing it on saturated or patterned backgrounds',
    'color.title': 'Color',
    'color.lead': 'Each of the four regions in the mark stands for a family of products. Interfaces sit on cool neutral grays with a single action blue. Hover a swatch to find it in the mark, click to copy.',
    'color.ui': 'Interface neutrals',
    'color.dark': 'Dark mode',
    'type.title': 'Typography',
    'type.lead': 'A system font stack with no web-font download: Chinese falls back to PingFang or Microsoft YaHei, Latin prefers Inter. Numbers in tables and code use the monospace stack.',
    'products.title': 'Product marks',
    'products.lead': 'Every product has its own mark, drawn from the color regions and geometry of the parent mark. Open a card for every variant and its download links.',
    'products.variant': 'Variant',
    'variant.icon': 'Primary',
    'variant.noEdge': 'No edge',
    'variant.gray': 'Gray',
    'variant.invert': 'Invert',
    'orgs.title': 'Organization avatars',
    'orgs.lead': 'Avatars for the GitHub organizations in the RE8CH enterprise. A yellow dashed ring marks a related but separately administered organization.',
    'icons.title': 'Icons',
    'icons.lead': 'Product-specific interface icon sets. General interface icons use Lucide at stroke width 2 with round caps, matching the strokes of the product marks.',
    'ui.title': 'UI elements',
    'ui.lead': 'Building blocks shared by User Hub, Catalog and Cluster. Borders instead of shadows, 8 to 12 px radii, compact controls.',
    'ui.buttons': 'Buttons',
    'ui.primary': 'Primary',
    'ui.secondary': 'Secondary',
    'ui.quiet': 'Text button',
    'ui.disabled': 'Disabled',
    'ui.fields': 'Inputs',
    'ui.org': 'Current organization',
    'ui.search': 'Search',
    'ui.searchPh': 'Search organizations, users or email',
    'ui.segmented': 'Segmented and status',
    'ui.hex': 'Honeycomb',
    'ui.list': 'List',
    'ui.ok': 'Running',
    'ui.warn': 'Pending',
    'ui.idle': 'Preview',
    'ui.nav': 'Grouped sidebar',
    'ui.account': 'Account',
    'ui.profile': 'Profile',
    'ui.orgGroup': 'Organization',
    'ui.members': 'Organizations & members',
    'ui.billing': 'Balance & billing',
    'ui.honeycomb': 'Honeycomb picker',
    'components.title': 'Shared components',
    'components.lead': 'Every product site loads the same navigator and footer Web Components from the CDN, and they keep language, theme and accessibility preferences in sync. The header and footer of this page are the live components.',
    'components.product': 'Product',
    'components.seeFooter': 'See page footer',
    'components.footerNote': 'A company trust strip: a horizontal product rail, company records and public profiles, and a legal and contact row. Rows only scroll, slowly, when their content overflows.',
    'components.demo': 'Open demo',
    'components.systemNote': 'Hero stage and three-layer architecture components for product sites, in UI/re8ch-product-system/v1.',
    copy: 'Copy',
    close: 'Close',
    'motion.title': 'Logo motion',
    'motion.lead': '<re8ch-logo-motion> is a zero-dependency component for loading, success and error states. Looping motion turns off when the system asks for reduced motion. Click a card to replay.',
    'examples.title': 'Product UI',
    'examples.lead': 'Shipped pages built on this system, as references for new work.',
    'examples.cluster': 'Site hero, light dotted globe',
    'examples.orgs': 'Organizations and members, honeycomb directory',
    'examples.dark': 'Dark mode',
    'examples.catalog': 'Service marketplace',
    'examples.services': 'Services and AI tools',
    'examples.clusterDark': 'Site hero, dark',
    'rules.title': 'Design principles',
    'rules.lead': 'Check new pages against these before launch. The full version is PRODUCT_SITE_DESIGN_GUIDELINES.md in the repository.',
    'rules.r1t': 'Light background by default',
    'rules.r1': 'Use #F8FAFC; dark mode uses a controlled blue-gray, never pure black.',
    'rules.r2t': 'Borders, not shadows',
    'rules.r2': 'Separate cards and panels with 1px borders; heavy shadows are reserved for overlays.',
    'rules.r3t': 'No decorative blobs',
    'rules.r3': 'No blurred glows, gradient bubbles or illustration backgrounds that carry no information.',
    'rules.r4t': 'No nested cards',
    'rules.r4': 'A card holds content and controls, never another card.',
    'rules.r5t': 'Product mark first',
    'rules.r5': 'Product pages lead with the product mark; RE8CH appears through the navigator, footer and legal text.',
    'rules.r6t': 'No flags for language',
    'rules.r6': 'Language menus use text and script icons, never national flags.',
    'rules.r7t': 'Visible focus',
    'rules.r7': 'Every control works from the keyboard with a clear focus ring.',
    'rules.r8t': 'Version your assets',
    'rules.r8': 'When a CDN component or mark changes, bump the ?v= query where it is referenced so edges drop the old file.',
  };

  const DYN = {
    'zh-CN': {
      stats: ['标志变体', '产品标识', '组织头像', '共享组件'],
      copied: '已复制',
      variants: (n) => `${n} 个变体`,
      sheetSub: (p) => `${p.zh} · ${p.variants.length} 个变体`,
      noFile: '此产品没有该变体',
      navLinks: [{ label: '标志', href: '#logo' }, { label: '色彩', href: '#color' }, { label: '产品', href: '#products' }, { label: '组件', href: '#components' }],
      brand: [
        ['red', '标志红', '#F81018', '可观测：倒 V 形红色区域'],
        ['yellow', '标志黄', '#FFD619', '安全认证与执行交付的交汇'],
        ['green', '标志绿', '#00B559', '执行与交付：Cluster'],
        ['blue', '标志蓝', '#0A7FBE', '安全与认证：Registry Image'],
        ['edge', '描边黑', '#020202', '所有色块外的统一描边'],
      ],
      ui: [
        ['页面背景', '#F8FAFC'], ['卡片表面', '#FFFFFF'], ['边框', '#E2E8F0'], ['正文', '#0F172A'],
        ['次要文字', '#64748B'], ['弱化图标', '#94A3B8'], ['操作蓝', '#086A9F'], ['选中底色', '#E6F2F9'],
      ],
      dark: [['页面背景', '#0B1220'], ['卡片表面', '#111A2B'], ['边框', '#1F2B40'], ['正文', '#E2E8F0'], ['选中文字', '#7CC4EA']],
      type: [
        ['展示标题', '52 / 1.12 · 700', '整个星球，一掌之间。', 'font-size:44px;line-height:1.15;font-weight:700;letter-spacing:-.03em'],
        ['页面标题', '28 / 1.3 · 600', '组织与成员', 'font-size:28px;line-height:1.3;font-weight:600'],
        ['区块标题', '20 / 1.4 · 600', '已关联的服务', 'font-size:20px;line-height:1.4;font-weight:600'],
        ['正文', '15 / 1.6 · 400', '一个账号使用全部 RE8CH 产品。点选一个六边形继续。', 'font-size:15px;line-height:1.6'],
        ['辅助文字', '13 / 1.5 · 400', '安装入口不会授予权限。', 'font-size:13px;line-height:1.5;color:var(--muted)'],
        ['眉标', '12 · 600 · 0.14em', 'RE8CH CLOUD', 'font-size:12px;font-weight:600;letter-spacing:.14em;color:var(--muted)'],
        ['等宽数字', '13 · mono', 'compute_second  13 nodes  ¥0.0042', 'font-family:var(--mono);font-size:13px'],
      ],
      motions: { loader: '加载', enter: '进入', exit: '退出', idle: '待机', pulse: '脉冲', success: '成功', error: '出错', reveal: '揭示' },
    },
    en: {
      stats: ['Logo variants', 'Product marks', 'Org avatars', 'Components'],
      copied: 'Copied',
      variants: (n) => `${n} variants`,
      sheetSub: (p) => `${p.en} · ${p.variants.length} variants`,
      noFile: 'No such variant for this product',
      navLinks: [{ label: 'Logo', href: '#logo' }, { label: 'Color', href: '#color' }, { label: 'Products', href: '#products' }, { label: 'Components', href: '#components' }],
      brand: [
        ['red', 'Mark red', '#F81018', 'Observability: the red inverted V'],
        ['yellow', 'Mark yellow', '#FFD619', 'Where security meets delivery'],
        ['green', 'Mark green', '#00B559', 'Execution and delivery: Cluster'],
        ['blue', 'Mark blue', '#0A7FBE', 'Security and certification: Registry Image'],
        ['edge', 'Edge black', '#020202', 'One edge around every region'],
      ],
      ui: [
        ['Page background', '#F8FAFC'], ['Card surface', '#FFFFFF'], ['Border', '#E2E8F0'], ['Body text', '#0F172A'],
        ['Muted text', '#64748B'], ['Muted icon', '#94A3B8'], ['Action blue', '#086A9F'], ['Selected fill', '#E6F2F9'],
      ],
      dark: [['Page background', '#0B1220'], ['Card surface', '#111A2B'], ['Border', '#1F2B40'], ['Body text', '#E2E8F0'], ['Selected text', '#7CC4EA']],
      type: [
        ['Display', '52 / 1.12 · 700', 'The whole planet, in hand.', 'font-size:44px;line-height:1.15;font-weight:700;letter-spacing:-.03em'],
        ['Page title', '28 / 1.3 · 600', 'Organizations & members', 'font-size:28px;line-height:1.3;font-weight:600'],
        ['Section title', '20 / 1.4 · 600', 'Linked services', 'font-size:20px;line-height:1.4;font-weight:600'],
        ['Body', '15 / 1.6 · 400', 'One account for every RE8CH product. Pick a hexagon to continue.', 'font-size:15px;line-height:1.6'],
        ['Supporting', '13 / 1.5 · 400', 'Install links never grant permissions.', 'font-size:13px;line-height:1.5;color:var(--muted)'],
        ['Eyebrow', '12 · 600 · 0.14em', 'RE8CH CLOUD', 'font-size:12px;font-weight:600;letter-spacing:.14em;color:var(--muted)'],
        ['Tabular', '13 · mono', 'compute_second  13 nodes  ¥0.0042', 'font-family:var(--mono);font-size:13px'],
      ],
      motions: { loader: 'Loader', enter: 'Enter', exit: 'Exit', idle: 'Idle', pulse: 'Pulse', success: 'Success', error: 'Error', reveal: 'Reveal' },
    },
  };

  // Navigator product ids, in the order they are offered in the preview.
  const NAV_PRODUCTS = ['re8ch', 'compocv', 'ledger', 'anycam', 'anysite', 'phonaid', 'aesthete', 'registry-image', 'cluster', 'observable'];

  // The RE8CH mark split into named regions, from SVG/logo.svg.
  const MARK_PATHS = [
    ['edge', '#020202', 'M135 722 L510 66 Q518 55 532 55 L632 55 Q650 55 659 75 L1029 722 Q1034 733 1027 745 L965 848 Q955 866 932 866 L222 866 Q207 866 198 849 L138 743 Q132 733 135 722 Z'],
    ['red', '#f81018', 'M225 843 L156 727 L526 83 Q531 78 540 78 L632 78 Q639 78 644 88 L955 632 L813 632 L583 244 L252 795 Z'],
    ['edge', '#020202', 'M246 845 L566 638 L973 638 Q983 639 989 648 L1023 716 Q1032 729 1023 743 L963 840 Q954 856 934 856 L222 856 Q239 847 246 845 Z'],
    ['green', '#00b559', 'M253 844 L574 657 L966 657 L1009 727 L943 834 Q940 844 927 845 L253 845 Z'],
    ['edge', '#020202', 'M251 808 L504 383 L590 531 L503 697 Z'],
    ['yellow', '#ffd619', 'M291 777 L505 413 L571 532 L494 666 Z'],
    ['edge', '#020202', 'M497 386 L582 239 L824 657 L646 657 Z'],
    ['blue', '#0a7fbe', 'M516 390 L582 275 L792 638 L657 638 Z'],
    ['edge', '#020202', 'M503 682 L583 536 L654 656 L575 656 Z'],
  ];

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const h = (tag, attrs = {}, children = []) => {
    const el = document.createElement(tag);
    for (const [key, value] of Object.entries(attrs)) {
      if (value === null || value === undefined || value === false) continue;
      if (key === 'text') el.textContent = value;
      else if (key === 'style') el.style.cssText = value;
      else if (key.startsWith('on')) el.addEventListener(key.slice(2), value);
      else el.setAttribute(key, value === true ? '' : value);
    }
    for (const child of [].concat(children)) if (child) el.append(child);
    return el;
  };

  const state = {
    locale: 'zh-CN',
    inventory: null,
    productVariant: 'icon',
    navProduct: 're8ch',
  };
  const t = () => DYN[state.locale] || DYN['zh-CN'];

  function loadStyle(href) {
    document.head.append(h('link', { rel: 'stylesheet', href }));
  }

  function loadScript(src) {
    document.head.append(h('script', { src }));
  }

  // Shared chrome and logo motion component.
  loadStyle(asset('dist/re8ch-navigator.css'));
  loadStyle(asset('dist/re8ch-footer.css'));
  loadScript(asset('dist/re8ch-navigator.js'));
  loadScript(asset('dist/re8ch-footer.js'));
  loadScript(asset('ANIME/re8ch-logo-motion.js'));

  // Locale
  const original = new Map();
  function applyLocale(locale) {
    state.locale = locale === 'en' ? 'en' : 'zh-CN';
    document.documentElement.lang = state.locale;
    for (const el of $$('[data-i18n]')) {
      if (!original.has(el)) original.set(el, el.innerHTML);
      const key = el.dataset.i18n;
      el.innerHTML = state.locale === 'en' && EN[key] ? EN[key].replace(/^<re8ch-logo-motion>/, '&lt;re8ch-logo-motion&gt;') : original.get(el);
    }
    for (const el of $$('[data-i18n-attr]')) {
      const [attr, key] = el.dataset.i18nAttr.split(':');
      const store = `${attr}::orig`;
      if (!el[store]) el[store] = el.getAttribute(attr) || '';
      el.setAttribute(attr, state.locale === 'en' && EN[key] ? EN[key] : el[store]);
    }
    const nav = $('re8ch-navigator');
    nav.setAttribute('links', JSON.stringify(t().navLinks));
    if (nav.getAttribute('locale') !== state.locale) nav.setAttribute('locale', state.locale);
    $('#site-footer').setAttribute('locale', state.locale);
    renderDynamic();
  }

  function savedLocale() {
    try {
      const value = localStorage.getItem('re8ch-locale-choice');
      if (value) return value;
    } catch {}
    return (navigator.language || '').toLowerCase().startsWith('zh') ? 'zh-CN' : 'en';
  }

  // Copy helper
  let toastTimer;
  async function copy(text, label = text) {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const area = h('textarea', { style: 'position:fixed;opacity:0' });
      area.value = text;
      document.body.append(area);
      area.select();
      document.execCommand('copy');
      area.remove();
    }
    const toast = $('#toast');
    toast.textContent = `${t().copied} · ${label}`;
    toast.setAttribute('data-show', '');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.removeAttribute('data-show'), 1600);
  }

  // WCAG contrast
  function luminance(hex) {
    const [r, g, b] = hex.replace('#', '').match(/../g).map((x) => {
      const c = parseInt(x, 16) / 255;
      return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  }
  function contrast(a, b) {
    const [x, y] = [luminance(a), luminance(b)].sort((m, n) => n - m);
    return (x + 0.05) / (y + 0.05);
  }

  function fileLinks(row) {
    return h('span', { class: 'tile__links' }, [
      row.svg && h('a', { class: 'btn btn--quiet btn--sm', href: asset(row.svg), target: '_blank', rel: 'noopener', text: 'SVG' }),
      row.png && h('a', { class: 'btn btn--quiet btn--sm', href: asset(row.png), target: '_blank', rel: 'noopener', text: 'PNG' }),
      h('button', { class: 'btn btn--quiet btn--sm', type: 'button', text: 'URL', title: cdn(row.svg || row.png), onclick: () => copy(cdn(row.svg || row.png), row.svg || row.png) }),
    ]);
  }

  const isDarkVariant = (name) => /invert|inverse|minimal-dark|dark$/.test(name);

  function renderLogos() {
    const grid = $('#logo-grid');
    grid.replaceChildren(...state.inventory.logos.map((row) => h('div', { class: 'tile' }, [
      h('div', { class: `tile__art${isDarkVariant(row.name) ? ' tile__art--dark' : ''}` }, h('img', { src: asset(row.svg || row.png), alt: row.name, loading: 'lazy' })),
      h('div', { class: 'tile__meta' }, [h('span', { class: 'tile__name', text: row.name }), fileLinks(row)]),
    ])));
  }

  function renderStats() {
    const inv = state.inventory;
    const values = [inv.logos.length, inv.products.length, inv.orgs.length, 2];
    $('#stats').replaceChildren(...values.map((value, i) => h('div', {}, [h('dt', { text: t().stats[i] }), h('dd', { text: String(value) })])));
  }

  function renderPalette() {
    const ns = 'http://www.w3.org/2000/svg';
    const figure = $('#palette-mark');
    if (!figure.firstChild) {
      const svg = document.createElementNS(ns, 'svg');
      svg.setAttribute('viewBox', '120 40 930 840');
      for (const [region, fill, d] of MARK_PATHS) {
        const path = document.createElementNS(ns, 'path');
        path.setAttribute('d', d);
        path.setAttribute('fill', fill);
        path.dataset.region = region;
        svg.append(path);
      }
      // The small inner triangle is a transparent hole in the source mark.
      const hole = document.createElementNS(ns, 'path');
      hole.setAttribute('d', 'M518 670 L583 533 L650 647 L579 647 Z');
      hole.setAttribute('fill', '#ffffff');
      svg.append(hole);
      figure.append(svg);
    }

    const focus = (region) => (region ? figure.setAttribute('data-focus', region) : figure.removeAttribute('data-focus'));
    $('#brand-swatches').replaceChildren(...t().brand.map(([region, name, hex, note]) => h('button', {
      class: 'swatch', type: 'button',
      onmouseenter: () => focus(region), onmouseleave: () => focus(null),
      onfocus: () => focus(region), onblur: () => focus(null),
      onclick: () => copy(hex),
    }, [
      h('span', { class: 'swatch__chip', style: `background:${hex}` }),
      h('span', { class: 'swatch__info' }, [
        h('span', { class: 'swatch__name', text: name }),
        h('span', { class: 'swatch__hex', text: hex }),
        h('span', { class: 'swatch__note', text: note }),
      ]),
    ])));

    const neutral = (rows, bgForRatio) => rows.map(([name, hex]) => h('button', { class: 'swatch', type: 'button', onclick: () => copy(hex) }, [
      h('span', { class: 'swatch__chip', style: `background:${hex}` }),
      h('span', { class: 'swatch__info' }, [
        h('span', { class: 'swatch__name', text: name }),
        h('span', { class: 'swatch__hex', text: hex }),
        h('span', { class: 'swatch__contrast', text: `${contrast(hex, bgForRatio).toFixed(1)}:1 vs ${bgForRatio}` }),
      ]),
    ]));
    $('#ui-swatches').replaceChildren(...neutral(t().ui, '#FFFFFF'));
    $('#dark-swatches').replaceChildren(...neutral(t().dark, '#0B1220'));
  }

  function renderType() {
    $('#type-scale').replaceChildren(...t().type.map(([name, spec, sample, style]) => h('div', { class: 'type-row' }, [
      h('div', { class: 'type-row__spec' }, [h('b', { text: name }), spec]),
      h('p', { class: 'type-row__sample', style, text: sample }),
    ])));
  }

  function productIcon(product, variant) {
    const row = product.variants.find((v) => v.name === variant) || product.variants.find((v) => v.name === 'icon') || product.variants[0];
    return row;
  }

  function renderProducts() {
    const variant = state.productVariant;
    const name = (p) => (state.locale === 'en' ? p.en : p.zh);
    $('#product-grid').replaceChildren(...state.inventory.products.map((product) => {
      const row = productIcon(product, variant);
      const dark = isDarkVariant(row.name);
      return h('button', { class: 'product', type: 'button', onclick: () => openProduct(product) }, [
        h('span', { class: 'product__art', 'data-dark': dark }, h('img', { src: asset(row.svg || row.png), alt: '', loading: 'lazy' })),
        h('span', { class: 'product__body' }, [
          h('span', { class: 'product__name', text: product.name }),
          h('span', { class: 'product__desc', text: name(product) }),
          h('span', { class: 'product__meta' }, [
            h('span', {}, [h('i', { class: 'dot', style: `background:${product.color}` }), product.color.toUpperCase()]),
            h('span', { text: t().variants(product.variants.length) }),
          ]),
        ]),
      ]);
    }));
  }

  function openProduct(product) {
    const sheet = $('#product-sheet');
    const main = productIcon(product, 'icon');
    $('#sheet-icon').src = asset(main.svg || main.png);
    $('#sheet-title').textContent = product.name;
    const sub = $('#sheet-sub');
    sub.replaceChildren(t().sheetSub(product));
    if (product.href) {
      sub.append(' · ', h('a', { href: product.href, target: '_blank', rel: 'noopener', text: product.href.replace(/^https:\/\//, '') }));
    }
    $('#sheet-body').replaceChildren(h('div', { class: 'tiles' }, product.variants.map((row) => h('div', { class: 'tile' }, [
      h('div', { class: `tile__art${isDarkVariant(row.name) ? ' tile__art--dark' : ''}` }, h('img', { src: asset(row.svg || row.png), alt: row.name, loading: 'lazy' })),
      h('div', { class: 'tile__meta' }, [h('span', { class: 'tile__name', text: row.name }), fileLinks(row)]),
    ]))));
    sheet.showModal();
  }

  function renderOrgs() {
    $('#org-grid').replaceChildren(...state.inventory.orgs.map((org) => h('button', {
      class: 'org', type: 'button', title: cdn(org.svg), onclick: () => copy(cdn(org.svg), org.name),
    }, [h('img', { src: asset(org.svg), alt: '', loading: 'lazy' }), h('span', { text: org.name })])));
  }

  function renderIcons() {
    $('#icon-sets').replaceChildren(...state.inventory.iconSets.map((set) => h('div', { class: 'icon-set' }, [
      h('h3', { text: set.name }),
      h('div', { class: 'icon-grid' }, set.icons.map((icon) => h('button', {
        class: 'icon-cell', type: 'button', title: cdn(icon.svg), onclick: () => copy(cdn(icon.svg), icon.name),
      }, [h('img', { src: asset(icon.svg), alt: '', loading: 'lazy' }), icon.name]))),
    ])));
  }

  function navSnippet() {
    const locale = state.locale;
    return `<link rel="stylesheet" href="${CDN}/dist/re8ch-navigator.css">
<script type="module" src="${CDN}/dist/re8ch-navigator.js"></script>
<re8ch-navigator
  product="${state.navProduct}"
  locale="${locale}"
  language-mode="available"
  links='${JSON.stringify(t().navLinks.slice(0, 2))}'>
</re8ch-navigator>`;
  }

  function footerSnippet() {
    return `<link rel="stylesheet" href="${CDN}/dist/re8ch-footer.css">
<script type="module" src="${CDN}/dist/re8ch-footer.js"></script>
<re8ch-footer
  active-product="${state.navProduct === 're8ch' ? 'cluster' : state.navProduct}"
  locale="${state.locale}"
  language-mode="available"
  theme="light">
</re8ch-footer>`;
  }

  function renderComponents() {
    const select = $('#nav-product');
    if (!select.options.length) {
      for (const id of NAV_PRODUCTS) select.append(h('option', { value: id, text: id }));
      select.addEventListener('change', () => {
        state.navProduct = select.value;
        renderComponents();
      });
    }
    select.value = state.navProduct;
    const stage = $('#nav-stage');
    let preview = $('re8ch-navigator', stage);
    if (!preview) {
      preview = h('re8ch-navigator', { sticky: 'false', 'language-mode': 'available', 'max-width': '100%' });
      stage.append(preview);
    }
    preview.setAttribute('language-options', JSON.stringify(LANGUAGES));
    preview.setAttribute('locale', state.locale);
    preview.setAttribute('links', JSON.stringify(t().navLinks.slice(0, 2)));
    preview.setAttribute('product', state.navProduct);
    $('#nav-code').textContent = navSnippet();
    $('#footer-code').textContent = footerSnippet();
  }

  function renderMotion() {
    const grid = $('#motion-grid');
    const names = t().motions;
    if (!grid.children.length) {
      for (const motion of Object.keys(names)) {
        const loop = ['loader', 'idle', 'pulse'].includes(motion);
        const logo = h('re8ch-logo-motion', { motion, size: 'md', loop, label: `RE8CH ${motion}` });
        grid.append(h('button', {
          class: 'motion', type: 'button', 'data-motion': motion,
          onclick: () => logo.restart?.(),
        }, [logo, h('span', { text: motion }), h('small', {})]));
      }
    }
    for (const card of grid.children) $('small', card).textContent = names[card.dataset.motion];
    // One-shot motions (exit in particular) end blank, so replay them while
    // the section is on screen, unless the visitor asked for less motion.
    if (!grid.dataset.replay && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
      grid.dataset.replay = '1';
      let visible = false;
      new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }).observe(grid);
      setInterval(() => {
        if (!visible || document.hidden) return;
        for (const logo of $$('re8ch-logo-motion:not([loop])', grid)) logo.restart?.();
      }, 3200);
    }
  }

  function renderDynamic() {
    if (!state.inventory) return;
    renderStats();
    renderPalette();
    renderType();
    renderProducts();
    renderComponents();
    renderMotion();
  }

  function wireStatic() {
    for (const el of $$('[data-asset]')) el.src = asset(el.dataset.asset);
    for (const el of $$('[data-asset-href]')) {
      el.href = asset(el.dataset.assetHref);
      el.target = '_blank';
      el.rel = 'noopener';
    }

    const nav = $('re8ch-navigator');
    nav.setAttribute('language-options', JSON.stringify(LANGUAGES));
    $('#site-footer').setAttribute('language-options', JSON.stringify(LANGUAGES));
    $('#site-footer').setAttribute('brand-logo', asset('SVG/logo.svg'));
    document.addEventListener('re8ch-language-change', (event) => {
      if (event.target === nav) applyLocale(event.detail.locale);
    });

    $('#product-variant').addEventListener('click', (event) => {
      const button = event.target.closest('button[data-value]');
      if (!button) return;
      state.productVariant = button.dataset.value;
      for (const b of $$('button', button.parentElement)) b.setAttribute('aria-pressed', String(b === button));
      renderProducts();
    });

    // Demo-only interactivity for the UI kit.
    for (const group of $$('.kit .segmented')) {
      group.addEventListener('click', (event) => {
        const button = event.target.closest('button');
        if (!button) return;
        for (const b of $$('button', group)) b.setAttribute('aria-pressed', String(b === button));
      });
    }
    $('#honeycomb').addEventListener('click', (event) => {
      const hex = event.target.closest('.hex');
      if (!hex) return;
      for (const item of $$('.hex', hex.parentElement)) item.setAttribute('aria-selected', String(item === hex));
    });
    for (const link of $$('.mini-nav a')) {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        for (const a of $$('.mini-nav a')) a.toggleAttribute('aria-current', a === link);
        link.setAttribute('aria-current', 'page');
      });
    }

    for (const button of $$('[data-copy-target]')) {
      button.addEventListener('click', () => copy($(`#${button.dataset.copyTarget}`).textContent, 'HTML'));
    }

    const sheet = $('#product-sheet');
    $('[data-close]', sheet).addEventListener('click', () => sheet.close());
    sheet.addEventListener('click', (event) => {
      if (event.target === sheet) sheet.close();
    });

    // Highlight the section in view.
    const links = new Map($$('.toc a').map((a) => [a.hash.slice(1), a]));
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        for (const a of links.values()) a.removeAttribute('aria-current');
        links.get(entry.target.id)?.setAttribute('aria-current', 'true');
      }
    }, { rootMargin: '-30% 0px -60% 0px' });
    for (const id of links.keys()) {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    }
  }

  async function init() {
    wireStatic();
    const response = await fetch('./inventory.json', { cache: 'no-cache' });
    state.inventory = await response.json();
    renderLogos();
    renderOrgs();
    renderIcons();
    applyLocale(new URLSearchParams(location.search).get('locale') || savedLocale());
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
