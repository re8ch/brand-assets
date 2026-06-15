const currentScript = document.currentScript;
const scriptUrl = new URL(currentScript?.src || import.meta.url);
const ASSET_BASE = scriptUrl.href.replace(/\/dist\/re8ch-navigator\.js(?:\?.*)?$/, '');
const CSS_HREF = `${ASSET_BASE}/dist/re8ch-navigator.css${scriptUrl.search || ''}`;
const ASSET_QUERY = scriptUrl.search || '';

const STORAGE_KEYS = {
  theme: 're8ch-product-theme',
  accessibility: 're8ch-accessibility',
};

const PRODUCT_CONFIG = {
  re8ch: { label: 'RE8CH', href: 'https://re8ch.com', icon: 'SVG/logo.svg', color: '#2563eb' },
  anysite: { label: 'AnySite', href: 'https://anysiteonearth.re8ch.com', icon: 'PRODUCTS/anysiteonearth/SVG/icon.svg', color: '#14b8c4' },
  ledger: { label: 'Ledger', href: 'https://ledger.re8ch.com', icon: 'PRODUCTS/lizhang-ledger/SVG/icon.svg', color: '#2563eb' },
  'registry-image': { label: 'Registry Image', href: 'https://image.re8ch.com', icon: 'PRODUCTS/registry/SVG/icon.svg', color: '#0a7fbe' },
  registry: { label: 'Registry Image', href: 'https://image.re8ch.com', icon: 'PRODUCTS/registry/SVG/icon.svg', color: '#0a7fbe' },
  cluster: { label: 'Cluster', href: 'https://cluster.re8ch.com', icon: 'PRODUCTS/cluster/SVG/icon.svg', color: '#00b559' },
  observable: { label: 'Observable', href: 'https://observable.re8ch.com', icon: 'PRODUCTS/observable/SVG/icon.svg', color: '#f81018' },
  anycam: { label: 'Anycam', href: 'https://anycam.re8ch.com', icon: 'PRODUCTS/anycam/SVG/icon.svg', color: '#16a34a' },
  phonaid: { label: 'Phonaid', href: 'https://phonaid.com', icon: 'PRODUCTS/phonaid/SVG/icon.svg', color: '#8b5cf6' },
};

const DEFAULT_LINKS = {
  re8ch: [
    { label: { zh: '首页', en: 'Home' }, href: '/home' },
    { label: { zh: '关于', en: 'About' }, href: '/about' },
    { label: { zh: '咨询服务', en: 'Consulting' }, href: '/consulting' },
    { label: { zh: '反馈', en: 'Feedback' }, href: '/feedback' },
  ],
  product: [
    { label: 'Metrics', href: '#metrics' },
    { label: 'Workflow', href: '#workflow' },
    { label: 'Live Case', href: '#live' },
  ],
};

const DEFAULT_LANGUAGES = [
  { label: '中文', value: 'zh-CN', href: '/' },
  { label: 'EN', value: 'en', href: '/' },
];

const GLOBAL_LANGUAGE_CATALOG = [
  { locale: 'en', label: 'English', nativeLabel: 'English', scriptIcon: 'Aa', aliases: ['en-US', 'en-GB'] },
  { locale: 'zh-CN', label: 'Chinese Simplified', nativeLabel: '简体中文', scriptIcon: '简', aliases: ['zh', 'zh-Hans', 'zh-Hans-CN'] },
  { locale: 'zh-Hant', label: 'Chinese Traditional', nativeLabel: '繁體中文', scriptIcon: '繁', aliases: ['zh-TW', 'zh-HK', 'zh-MO'] },
  { locale: 'es', label: 'Spanish', nativeLabel: 'Español', scriptIcon: 'Ñ', aliases: ['es-ES', 'es-MX', 'es-419'] },
  { locale: 'ar', label: 'Arabic', nativeLabel: 'العربية', scriptIcon: 'ع' },
  { locale: 'hi', label: 'Hindi', nativeLabel: 'हिन्दी', scriptIcon: 'दे' },
  { locale: 'pt', label: 'Portuguese', nativeLabel: 'Português', scriptIcon: 'Ç', aliases: ['pt-BR', 'pt-PT'] },
  { locale: 'fr', label: 'French', nativeLabel: 'Français', scriptIcon: 'É' },
  { locale: 'de', label: 'German', nativeLabel: 'Deutsch', scriptIcon: 'Ä' },
  { locale: 'ja', label: 'Japanese', nativeLabel: '日本語', scriptIcon: 'あ' },
  { locale: 'ru', label: 'Russian', nativeLabel: 'Русский', scriptIcon: 'Я' },
  { locale: 'ko', label: 'Korean', nativeLabel: '한국어', scriptIcon: '한' },
  { locale: 'id', label: 'Indonesian', nativeLabel: 'Indonesia', scriptIcon: 'Id' },
  { locale: 'tr', label: 'Turkish', nativeLabel: 'Türkçe', scriptIcon: 'Ü' },
  { locale: 'it', label: 'Italian', nativeLabel: 'Italiano', scriptIcon: 'It' },
  { locale: 'nl', label: 'Dutch', nativeLabel: 'Nederlands', scriptIcon: 'Ĳ' },
  { locale: 'pl', label: 'Polish', nativeLabel: 'Polski', scriptIcon: 'Ł' },
  { locale: 'vi', label: 'Vietnamese', nativeLabel: 'Tiếng Việt', scriptIcon: 'Vi' },
  { locale: 'th', label: 'Thai', nativeLabel: 'ไทย', scriptIcon: 'ก' },
  { locale: 'fa', label: 'Persian', nativeLabel: 'فارسی', scriptIcon: 'فا' },
  { locale: 'ur', label: 'Urdu', nativeLabel: 'اردو', scriptIcon: 'ارد' },
  { locale: 'bn', label: 'Bengali', nativeLabel: 'বাংলা', scriptIcon: 'ব' },
  { locale: 'ms', label: 'Malay', nativeLabel: 'Melayu', scriptIcon: 'Ms' },
  { locale: 'fil', label: 'Filipino', nativeLabel: 'Filipino', scriptIcon: 'Fi' },
  { locale: 'sw', label: 'Swahili', nativeLabel: 'Kiswahili', scriptIcon: 'Sw' },
  { locale: 'ha', label: 'Hausa', nativeLabel: 'Hausa', scriptIcon: 'Ha' },
  { locale: 'he', label: 'Hebrew', nativeLabel: 'עברית', scriptIcon: 'ע' },
  { locale: 'el', label: 'Greek', nativeLabel: 'Ελληνικά', scriptIcon: 'Ω' },
  { locale: 'cs', label: 'Czech', nativeLabel: 'Čeština', scriptIcon: 'Č' },
  { locale: 'sv', label: 'Swedish', nativeLabel: 'Svenska', scriptIcon: 'Å' },
  { locale: 'uk', label: 'Ukrainian', nativeLabel: 'Українська', scriptIcon: 'Ї' },
];

const DEFAULT_GLASS_OPACITY = 0.78;
const GLASS_OPACITY_MIN = 0.1;
const GLASS_OPACITY_MAX = 0.9;
const GLASS_OPACITY_STEP = 0.05;

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function parseJsonAttribute(value, fallback) {
  if (!value) return fallback;
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
}

function clampNumber(value, min, max, fallback) {
  const number = Number(value);
  if (!Number.isFinite(number)) return fallback;
  return Math.min(max, Math.max(min, number));
}

function snapNumber(value, step) {
  return Math.round(value / step) * step;
}

function clampGlassOpacity(value, fallback = DEFAULT_GLASS_OPACITY) {
  return clampNumber(snapNumber(Number(value), GLASS_OPACITY_STEP), GLASS_OPACITY_MIN, GLASS_OPACITY_MAX, fallback);
}

function glassOpacityProgress(value) {
  return (clampGlassOpacity(value) - GLASS_OPACITY_MIN) / (GLASS_OPACITY_MAX - GLASS_OPACITY_MIN);
}

function localeKey(value) {
  return String(value || '').trim().replaceAll('_', '-').toLowerCase();
}

function languageValue(language) {
  return language?.locale || language?.value || language?.label || '';
}

function languageMatches(catalogLanguage, supportedLanguage) {
  const supported = localeKey(languageValue(supportedLanguage));
  if (!supported) return false;
  const keys = [catalogLanguage.locale, ...(catalogLanguage.aliases || [])].map(localeKey);
  return keys.includes(supported);
}

function resolveLanguages(catalog, supported, locale, mode) {
  const normalized = localeKey(locale);
  const supportedWithCatalog = supported.map((language) => {
    const catalogLanguage = catalog.find((item) => languageMatches(item, language));
    return {
      ...(catalogLanguage || {}),
      ...language,
      locale: languageValue(language),
      enabled: true,
    };
  });

  if (mode === 'available') return supportedWithCatalog;

  return catalog.map((language) => {
    const supportedLanguage = supported.find((item) => languageMatches(language, item));
    const enabled = Boolean(supportedLanguage?.href);
    return {
      ...language,
      ...(supportedLanguage || {}),
      locale: language.locale,
      selected: [language.locale, ...(language.aliases || [])].map(localeKey).includes(normalized),
      enabled,
    };
  });
}

function mergeConfig() {
  return {
    products: { ...PRODUCT_CONFIG, ...(window.RE8CH_NAVIGATOR_CONFIG?.products || {}) },
    links: window.RE8CH_NAVIGATOR_CONFIG?.links || {},
    languages: window.RE8CH_NAVIGATOR_CONFIG?.languages || null,
    languageCatalog: window.RE8CH_NAVIGATOR_CONFIG?.languageCatalog || GLOBAL_LANGUAGE_CATALOG,
    extraActions: window.RE8CH_NAVIGATOR_CONFIG?.extraActions || {},
  };
}

function localeKind(locale) {
  return String(locale || document.documentElement.lang || 'en').toLowerCase().startsWith('zh') ? 'zh' : 'en';
}

function labelText(label, locale) {
  if (label && typeof label === 'object') return label[localeKind(locale)] || label.en || label.zh || '';
  return label || '';
}

function normalizeProductId(id) {
  if (id === 'image') return 'registry-image';
  if (id === 'registry') return 'registry-image';
  if (id === 'earth') return 'anysite';
  return id || 're8ch';
}

function resolveThemePreference(value) {
  if (value === 'system') return 'auto';
  return value === 'light' || value === 'dark' || value === 'auto' ? value : 'auto';
}

function resolveTheme(preference) {
  if (preference === 'light' || preference === 'dark') return preference;
  const hour = new Date().getHours();
  return hour >= 7 && hour < 19 ? 'light' : 'dark';
}

function readAccessibility() {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEYS.accessibility) || '{}');
    return {
      reduceMotion: Boolean(data.reduceMotion),
      highContrast: Boolean(data.highContrast),
      largerText: Boolean(data.largerText),
      glassOpacity: clampGlassOpacity(data.glassOpacity),
    };
  } catch {
    return { reduceMotion: false, highContrast: false, largerText: false, glassOpacity: DEFAULT_GLASS_OPACITY };
  }
}

function writeAccessibility(value) {
  localStorage.setItem(STORAGE_KEYS.accessibility, JSON.stringify(value));
}

class Re8chNavigator extends HTMLElement {
  static get observedAttributes() {
    return ['product', 'locale', 'theme', 'brand', 'home-href', 'links', 'language-options', 'language-mode', 'extra-actions', 'sticky', 'max-width', 'glass-opacity'];
  }

  connectedCallback() {
    if (!this.shadowRoot) this.attachShadow({ mode: 'open' });
    this.themePreference = resolveThemePreference(this.getAttribute('theme') || localStorage.getItem(STORAGE_KEYS.theme));
    this.accessibility = readAccessibility();
    this.accessibility.glassOpacity = clampGlassOpacity(this.getAttribute('glass-opacity'), this.accessibility.glassOpacity);
    this.render();
    this.applyTheme(this.themePreference);
    this.applyAccessibility();
    this.autoThemeTimer = window.setInterval(() => {
      if (this.themePreference === 'auto') this.applyTheme('auto');
    }, 15 * 60 * 1000);
  }

  disconnectedCallback() {
    this.abortController?.abort();
    if (this.autoThemeTimer) window.clearInterval(this.autoThemeTimer);
  }

  attributeChangedCallback() {
    if (this.isConnected) this.render();
  }

  get data() {
    const config = mergeConfig();
    const productId = normalizeProductId(this.getAttribute('product'));
    const product = config.products[productId] || config.products.re8ch;
    const locale = this.getAttribute('locale') || document.documentElement.lang || 'en';
    const links = parseJsonAttribute(
      this.getAttribute('links'),
      config.links[productId] || (productId === 're8ch' ? DEFAULT_LINKS.re8ch : DEFAULT_LINKS.product)
    );
    const languages = parseJsonAttribute(
      this.getAttribute('language-options'),
      config.languages || DEFAULT_LANGUAGES
    );
    const languageCatalog = config.languageCatalog || GLOBAL_LANGUAGE_CATALOG;
    const languageMode = this.getAttribute('language-mode') === 'available' ? 'available' : 'global';
    const extraActions = parseJsonAttribute(
      this.getAttribute('extra-actions'),
      config.extraActions[productId] || []
    );
    const brand = this.getAttribute('brand') || (productId === 're8ch' ? product.label : `RE8CH ${product.label}`);
    const homeHref = this.getAttribute('home-href') || product.href || '/';
    return { productId, product, locale, links, languages, languageCatalog, languageMode, extraActions, brand, homeHref };
  }

  render() {
    if (!this.shadowRoot) this.attachShadow({ mode: 'open' });

    const { productId, product, locale, links, languages, languageCatalog, languageMode, extraActions, brand, homeHref } = this.data;
    const sticky = this.getAttribute('sticky') || 'true';
    const maxWidth = this.getAttribute('max-width') || '1240px';
    const activeColor = product.color || '#2563eb';
    const iconHref = product.icon?.startsWith('http') ? product.icon : `${ASSET_BASE}/${product.icon}${ASSET_QUERY}`;

    this.setAttribute('data-product', productId);
    this.setAttribute('data-sticky', sticky);
    this.style.setProperty('--re8ch-nav-max-width', maxWidth);
    this.style.setProperty('--re8ch-nav-accent', activeColor);

    this.abortController?.abort();
    this.abortController = new AbortController();

    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="${escapeHtml(CSS_HREF)}">
      <nav class="re8ch-nav" aria-label="${escapeHtml(brand)} navigation">
        <div class="re8ch-nav__inner">
          <a class="re8ch-nav__brand" href="${escapeHtml(homeHref)}" aria-label="${escapeHtml(brand)}">
            <span class="re8ch-nav__mark"><img src="${escapeHtml(iconHref)}" alt="" decoding="async"></span>
            <strong>${escapeHtml(brand)}</strong>
          </a>
          <button class="re8ch-nav__menu" type="button" aria-expanded="false" aria-controls="re8ch-nav-panel">
            <span></span><span></span><span></span>
            <span class="re8ch-nav__sr">Menu</span>
          </button>
          <div class="re8ch-nav__panel" id="re8ch-nav-panel">
            <div class="re8ch-nav__links">
              ${links.map((link) => this.renderLink(link, locale)).join('')}
            </div>
            <div class="re8ch-nav__actions">
              ${extraActions.map((action) => this.renderAction(action, locale)).join('')}
              ${this.renderLanguageMenu(resolveLanguages(languageCatalog, languages, locale, languageMode), locale)}
              ${this.renderThemeButton()}
              ${this.renderAccessibilityMenu()}
            </div>
          </div>
        </div>
      </nav>`;

    this.bindEvents();
    this.syncControlState();
  }

  renderLink(link, locale) {
    const label = labelText(link.label, locale);
    const current = link.current ? ' aria-current="page"' : '';
    return `<a class="re8ch-nav__link" href="${escapeHtml(link.href || '#')}"${current}>${escapeHtml(label)}</a>`;
  }

  renderAction(action, locale) {
    const label = labelText(action.label, locale);
    return `<a class="re8ch-nav__action" href="${escapeHtml(action.href || '#')}" rel="${escapeHtml(action.rel || 'noopener')}">${escapeHtml(label)}</a>`;
  }

  renderLanguageMenu(languages, locale) {
    const normalized = localeKey(locale);
    const active = languages.find((language) => {
      const keys = [language.locale, language.value, ...(language.aliases || [])].map(localeKey);
      return keys.includes(normalized);
    }) || languages.find((language) => language.enabled) || languages[0];
    const activeLabel = active?.scriptIcon || active?.nativeLabel || active?.label || locale || 'Lang';
    const items = languages.map((language) => {
      const keys = [language.locale, language.value, ...(language.aliases || [])].map(localeKey);
      const selected = language.selected || keys.includes(normalized);
      const disabled = !language.enabled || !language.href;
      return `
        <button class="re8ch-nav__language-option" type="button"
          data-language-option="${escapeHtml(language.locale || language.value || '')}"
          data-href="${escapeHtml(language.href || '')}"
          aria-disabled="${disabled ? 'true' : 'false'}"
          ${selected ? 'aria-current="true"' : ''}>
          <span class="re8ch-nav__language-icon" aria-hidden="true">${escapeHtml(language.scriptIcon || 'Aa')}</span>
          <span><strong>${escapeHtml(language.nativeLabel || language.label || language.locale)}</strong><small>${escapeHtml(language.label || language.locale)}</small></span>
        </button>`;
    }).join('');
    return `
      <div class="re8ch-nav__menu-wrap">
        <button class="re8ch-nav__language-button" type="button" data-re8ch-menu-button="language" aria-expanded="false" aria-label="Language">
          <span class="re8ch-nav__language-icon" aria-hidden="true">${escapeHtml(activeLabel)}</span>
          <span class="re8ch-nav__sr">Language</span>
        </button>
        <div class="re8ch-nav__popover re8ch-nav__language-menu" data-re8ch-menu="language">
          ${items}
        </div>
      </div>`;
  }

  renderThemeButton() {
    return `
      <div class="re8ch-nav__theme-control" role="group" aria-label="Theme">
        <button class="re8ch-nav__theme-zone re8ch-nav__theme-zone--dark" type="button" data-theme-option="dark" aria-label="Dark theme"><span aria-hidden="true">Dark</span></button>
        <button class="re8ch-nav__theme-zone re8ch-nav__theme-zone--auto" type="button" data-theme-option="auto" aria-label="Auto theme by local time"><span aria-hidden="true">Auto</span></button>
        <button class="re8ch-nav__theme-zone re8ch-nav__theme-zone--light" type="button" data-theme-option="light" aria-label="Light theme"><span aria-hidden="true">Light</span></button>
      </div>`;
  }

  renderAccessibilityMenu() {
    return `
      <div class="re8ch-nav__menu-wrap">
        <button class="re8ch-nav__icon-button" type="button" data-re8ch-menu-button="accessibility" aria-expanded="false" aria-label="Accessibility">
          ${this.icon('accessibility')}
        </button>
        <div class="re8ch-nav__popover re8ch-nav__accessibility-menu" data-re8ch-menu="accessibility">
          <div class="re8ch-nav__a11y-toggles" role="group" aria-label="Accessibility quick settings">
            <label title="Reduce Motion"><input type="checkbox" data-accessibility-option="reduceMotion"><span aria-hidden="true">${this.icon('motion')}</span><span class="re8ch-nav__sr">Reduce Motion</span></label>
            <label title="High Contrast"><input type="checkbox" data-accessibility-option="highContrast"><span aria-hidden="true">${this.icon('contrast')}</span><span class="re8ch-nav__sr">High Contrast</span></label>
            <label title="Larger Text"><input type="checkbox" data-accessibility-option="largerText"><span aria-hidden="true">Aa</span><span class="re8ch-nav__sr">Larger Text</span></label>
          </div>
          <div class="re8ch-nav__dial-label">
            <span><strong>Glass</strong><output data-glass-output>78%</output></span>
            <button class="re8ch-nav__opacity-dial" type="button" data-accessibility-dial="glassOpacity"
              role="slider" aria-label="Glass opacity" aria-valuemin="10" aria-valuemax="90" aria-valuenow="78">
              <span class="re8ch-nav__dial-face" aria-hidden="true"><i></i></span>
            </button>
          </div>
        </div>
      </div>`;
  }

  icon(name) {
    if (name === 'accessibility') {
      return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true"><circle cx="12" cy="4" r="2"></circle><path d="M5 8h14"></path><path d="M12 8v12"></path><path d="m8 20 4-8 4 8"></path></svg>';
    }
    if (name === 'motion') {
      return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true"><path d="M5 12h8"></path><path d="m10 8 4 4-4 4"></path><path d="M17 5v14"></path></svg>';
    }
    if (name === 'contrast') {
      return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true"><circle cx="12" cy="12" r="8"></circle><path d="M12 4v16"></path></svg>';
    }
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true"><path d="M12 3v2"></path><path d="M12 19v2"></path><path d="m4.22 4.22 1.42 1.42"></path><path d="m18.36 18.36 1.42 1.42"></path><path d="M3 12h2"></path><path d="M19 12h2"></path><path d="m4.22 19.78 1.42-1.42"></path><path d="m18.36 5.64 1.42-1.42"></path><circle cx="12" cy="12" r="4"></circle></svg>';
  }

  bindEvents() {
    const { signal } = this.abortController;
    const menuButton = this.shadowRoot.querySelector('.re8ch-nav__menu');
    const panel = this.shadowRoot.querySelector('.re8ch-nav__panel');
    menuButton?.addEventListener('click', () => {
      const open = this.classList.toggle('is-open');
      menuButton.setAttribute('aria-expanded', open ? 'true' : 'false');
      panel.toggleAttribute('data-open', open);
    }, { signal });

    this.shadowRoot.querySelectorAll('[data-language-option]').forEach((button) => {
      button.addEventListener('click', () => {
        if (button.getAttribute('aria-disabled') === 'true') return;
        const href = button.dataset.href;
        if (href) window.location.href = href;
        this.dispatchEvent(new CustomEvent('re8ch-language-change', { bubbles: true, detail: { locale: button.dataset.languageOption } }));
      }, { signal });
    });

    this.shadowRoot.querySelectorAll('[data-re8ch-menu-button]').forEach((button) => {
      button.addEventListener('click', () => {
        const name = button.dataset.re8chMenuButton;
        const menu = this.shadowRoot.querySelector(`[data-re8ch-menu="${name}"]`);
        const open = !menu.hasAttribute('data-open');
        this.closePopovers();
        menu.toggleAttribute('data-open', open);
        button.setAttribute('aria-expanded', open ? 'true' : 'false');
      }, { signal });
    });

    this.shadowRoot.querySelectorAll('[data-theme-option]').forEach((button) => {
      button.addEventListener('click', () => {
        this.applyTheme(button.dataset.themeOption, true);
        this.closePopovers();
      }, { signal });
    });

    this.shadowRoot.querySelectorAll('[data-accessibility-option]').forEach((input) => {
      input.addEventListener('change', () => {
        this.accessibility[input.dataset.accessibilityOption] = input.checked;
        writeAccessibility(this.accessibility);
        this.applyAccessibility();
      }, { signal });
    });

    this.shadowRoot.querySelectorAll('[data-accessibility-dial]').forEach((dial) => {
      const setFromEvent = (event) => {
        this.setGlassOpacity(this.opacityFromPointer(event, dial));
      };
      dial.addEventListener('pointerdown', (event) => {
        event.preventDefault();
        dial.setPointerCapture?.(event.pointerId);
        setFromEvent(event);
        const move = (moveEvent) => setFromEvent(moveEvent);
        const up = (upEvent) => {
          dial.releasePointerCapture?.(upEvent.pointerId);
          window.removeEventListener('pointermove', move);
          window.removeEventListener('pointerup', up);
        };
        window.addEventListener('pointermove', move, { signal });
        window.addEventListener('pointerup', up, { signal, once: true });
      }, { signal });
      dial.addEventListener('keydown', (event) => {
        const current = this.accessibility[dial.dataset.accessibilityDial] || DEFAULT_GLASS_OPACITY;
        let next = current;
        if (event.key === 'ArrowRight' || event.key === 'ArrowUp') next += GLASS_OPACITY_STEP;
        if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') next -= GLASS_OPACITY_STEP;
        if (event.key === 'Home') next = GLASS_OPACITY_MIN;
        if (event.key === 'End') next = GLASS_OPACITY_MAX;
        if (next !== current) {
          event.preventDefault();
          this.setGlassOpacity(next);
        }
      }, { signal });
    });

    this.shadowRoot.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        this.closePopovers();
        this.classList.remove('is-open');
        menuButton?.setAttribute('aria-expanded', 'false');
      }
    }, { signal });
  }

  closePopovers() {
    this.shadowRoot.querySelectorAll('[data-re8ch-menu]').forEach((menu) => menu.removeAttribute('data-open'));
    this.shadowRoot.querySelectorAll('[data-re8ch-menu-button]').forEach((button) => button.setAttribute('aria-expanded', 'false'));
  }

  applyTheme(preference, persist = false) {
    this.themePreference = resolveThemePreference(preference);
    const resolved = resolveTheme(this.themePreference);
    if (persist) localStorage.setItem(STORAGE_KEYS.theme, this.themePreference);
    document.documentElement.dataset.theme = resolved;
    document.documentElement.dataset.themePreference = this.themePreference;
    this.setAttribute('data-theme', resolved);
    this.syncControlState();
    document.querySelectorAll('re8ch-footer').forEach((footer) => footer.setAttribute('theme', resolved));
    window.dispatchEvent(new CustomEvent('re8ch-theme-change', { detail: { theme: resolved, preference: this.themePreference } }));
  }

  applyAccessibility() {
    const opacity = this.accessibility.highContrast ? GLASS_OPACITY_MAX : (this.accessibility.glassOpacity || DEFAULT_GLASS_OPACITY);
    document.documentElement.dataset.re8chReduceMotion = this.accessibility.reduceMotion ? 'true' : 'false';
    document.documentElement.dataset.re8chHighContrast = this.accessibility.highContrast ? 'true' : 'false';
    document.documentElement.dataset.re8chLargerText = this.accessibility.largerText ? 'true' : 'false';
    document.documentElement.dataset.re8chGlassOpacity = String(opacity);
    document.documentElement.style.setProperty('--re8ch-nav-glass-opacity', String(opacity));
    this.style.setProperty('--re8ch-nav-glass-opacity', String(opacity));
    this.syncControlState();
    window.dispatchEvent(new CustomEvent('re8ch-accessibility-change', { detail: { ...this.accessibility, glassOpacity: opacity } }));
  }

  opacityFromPointer(event, element) {
    const rect = element.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    const angle = (Math.atan2(y, x) * 180 / Math.PI + 450) % 360;
    return clampGlassOpacity(GLASS_OPACITY_MIN + (angle / 360) * (GLASS_OPACITY_MAX - GLASS_OPACITY_MIN));
  }

  setGlassOpacity(value) {
    this.accessibility.glassOpacity = clampGlassOpacity(value);
    writeAccessibility(this.accessibility);
    this.applyAccessibility();
  }

  syncControlState() {
    if (!this.shadowRoot) return;
    this.shadowRoot.querySelectorAll('[data-theme-option]').forEach((button) => {
      button.toggleAttribute('aria-current', button.dataset.themeOption === this.themePreference);
    });
    this.shadowRoot.querySelectorAll('[data-accessibility-option]').forEach((input) => {
      input.checked = Boolean(this.accessibility?.[input.dataset.accessibilityOption]);
    });
    this.shadowRoot.querySelectorAll('[data-accessibility-dial]').forEach((dial) => {
      const value = this.accessibility?.[dial.dataset.accessibilityDial] || DEFAULT_GLASS_OPACITY;
      const percent = Math.round(value * 100);
      dial.setAttribute('aria-valuenow', String(percent));
      dial.style.setProperty('--re8ch-nav-dial-angle', `${glassOpacityProgress(value) * 360}deg`);
      dial.style.setProperty('--re8ch-nav-dial-percent', `${percent}%`);
    });
    this.shadowRoot.querySelectorAll('[data-glass-output]').forEach((output) => {
      output.textContent = `${Math.round((this.accessibility?.glassOpacity || DEFAULT_GLASS_OPACITY) * 100)}%`;
    });
  }
}

if (!customElements.get('re8ch-navigator')) {
  customElements.define('re8ch-navigator', Re8chNavigator);
}
