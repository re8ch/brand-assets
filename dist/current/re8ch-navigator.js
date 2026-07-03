(() => {
const currentScript = document.currentScript;
const scriptElement = currentScript || document.querySelector('script[src*="/dist/re8ch-navigator.js"], script[src*="/dist/current/re8ch-navigator.js"]');
const scriptUrl = new URL(scriptElement?.src || 'https://brand-assets.re8ch.com/dist/re8ch-navigator.js', document.baseURI);
const COMPONENT_BASE = scriptUrl.href.replace(/\/re8ch-navigator\.js(?:\?.*)?$/, '');
const ASSET_BASE = COMPONENT_BASE.replace(/\/dist(?:\/current)?$/, '');
const CSS_HREF = `${COMPONENT_BASE}/re8ch-navigator.css${scriptUrl.search || ''}`;
const ASSET_QUERY = scriptUrl.search || '';

const STORAGE_KEYS = {
  theme: 're8ch-product-theme',
  accessibility: 're8ch-accessibility',
  authIdentity: 're8ch.auth.identity.v1',
  localeChoice: 're8ch-locale-choice',
  localeManual: 're8ch-locale-manual',
};

const PRODUCT_CONFIG = {
  re8ch: { label: 'RE8CH', href: 'https://re8ch.com', icon: 'SVG/logo.svg', color: '#2563eb' },
  compocv: { label: 'CompoCV', href: 'https://compocv.re8ch.com', icon: 'PRODUCTS/compocv/SVG/icon.svg', color: '#2563eb' },
  anysite: { label: 'AnySite', href: 'https://anysiteonearth.re8ch.com', icon: 'PRODUCTS/anysiteonearth/SVG/icon.svg', color: '#14b8c4' },
  ledger: { label: 'Ledger', href: 'https://ledger.re8ch.com', icon: 'PRODUCTS/lizhang-ledger/SVG/icon.svg', color: '#2563eb' },
  'registry-image': { label: 'Registry Image', href: 'https://image.re8ch.com', icon: 'PRODUCTS/registry/SVG/icon.svg', color: '#0a7fbe' },
  registry: { label: 'Registry Image', href: 'https://image.re8ch.com', icon: 'PRODUCTS/registry/SVG/icon.svg', color: '#0a7fbe' },
  cluster: { label: 'Cluster', href: 'https://cluster.re8ch.com', icon: 'PRODUCTS/cluster/SVG/icon.svg', color: '#00b559' },
  observable: { label: 'Observable', href: 'https://observable.re8ch.com', icon: 'PRODUCTS/observable/SVG/icon.svg', color: '#f81018' },
  aesthete: { label: 'Aesthete', href: 'https://aesthete.re8ch.com', icon: 'PRODUCTS/aesthete/SVG/icon.svg', color: '#d6a23e' },
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

const NAVIGATOR_UI_COPY = {
  en: {
    menu: 'Menu',
    language: 'Language',
    theme: 'Theme',
    darkTheme: 'Dark theme',
    autoTheme: 'Auto theme by local time',
    lightTheme: 'Light theme',
    accessibility: 'Accessibility',
    accessibilitySettings: 'Accessibility quick settings',
    reduceMotion: 'Reduce Motion',
    highContrast: 'High Contrast',
    largerText: 'Larger Text',
    glass: 'Glass',
    glassOpacity: 'Glass opacity',
  },
  'zh-CN': { menu: '菜单', language: '语言', theme: '主题', darkTheme: '深色主题', autoTheme: '自动主题', lightTheme: '浅色主题', accessibility: '无障碍', accessibilitySettings: '无障碍快捷设置', reduceMotion: '减少动态效果', highContrast: '高对比度', largerText: '更大文字', glass: '玻璃', glassOpacity: '玻璃透明度' },
  'zh-TW': { menu: '選單', language: '語言', theme: '主題', darkTheme: '深色主題', autoTheme: '自動主題', lightTheme: '淺色主題', accessibility: '無障礙', accessibilitySettings: '無障礙快捷設定', reduceMotion: '減少動態效果', highContrast: '高對比度', largerText: '更大文字', glass: '玻璃', glassOpacity: '玻璃透明度' },
  es: { menu: 'Menú', language: 'Idioma', theme: 'Tema', darkTheme: 'Tema oscuro', autoTheme: 'Tema automático', lightTheme: 'Tema claro', accessibility: 'Accesibilidad', accessibilitySettings: 'Ajustes rápidos de accesibilidad', reduceMotion: 'Reducir movimiento', highContrast: 'Alto contraste', largerText: 'Texto más grande', glass: 'Cristal', glassOpacity: 'Opacidad del cristal' },
  ar: { menu: 'القائمة', language: 'اللغة', theme: 'السمة', darkTheme: 'السمة الداكنة', autoTheme: 'السمة التلقائية', lightTheme: 'السمة الفاتحة', accessibility: 'إمكانية الوصول', accessibilitySettings: 'إعدادات إمكانية الوصول السريعة', reduceMotion: 'تقليل الحركة', highContrast: 'تباين عال', largerText: 'نص أكبر', glass: 'زجاج', glassOpacity: 'شفافية الزجاج' },
  hi: { menu: 'मेनू', language: 'भाषा', theme: 'थीम', darkTheme: 'डार्क थीम', autoTheme: 'ऑटो थीम', lightTheme: 'लाइट थीम', accessibility: 'एक्सेसिबिलिटी', accessibilitySettings: 'एक्सेसिबिलिटी त्वरित सेटिंग्स', reduceMotion: 'मोशन कम करें', highContrast: 'हाई कॉन्ट्रास्ट', largerText: 'बड़ा टेक्स्ट', glass: 'ग्लास', glassOpacity: 'ग्लास अपारदर्शिता' },
  'pt-BR': { menu: 'Menu', language: 'Idioma', theme: 'Tema', darkTheme: 'Tema escuro', autoTheme: 'Tema automático', lightTheme: 'Tema claro', accessibility: 'Acessibilidade', accessibilitySettings: 'Ajustes rápidos de acessibilidade', reduceMotion: 'Reduzir movimento', highContrast: 'Alto contraste', largerText: 'Texto maior', glass: 'Vidro', glassOpacity: 'Opacidade do vidro' },
  bn: { menu: 'মেনু', language: 'ভাষা', theme: 'থিম', darkTheme: 'ডার্ক থিম', autoTheme: 'অটো থিম', lightTheme: 'লাইট থিম', accessibility: 'অ্যাক্সেসিবিলিটি', accessibilitySettings: 'অ্যাক্সেসিবিলিটি দ্রুত সেটিংস', reduceMotion: 'মোশন কমান', highContrast: 'উচ্চ কনট্রাস্ট', largerText: 'বড় লেখা', glass: 'গ্লাস', glassOpacity: 'গ্লাস অপাসিটি' },
  ru: { menu: 'Меню', language: 'Язык', theme: 'Тема', darkTheme: 'Темная тема', autoTheme: 'Авто тема', lightTheme: 'Светлая тема', accessibility: 'Доступность', accessibilitySettings: 'Быстрые настройки доступности', reduceMotion: 'Меньше движения', highContrast: 'Высокий контраст', largerText: 'Крупный текст', glass: 'Стекло', glassOpacity: 'Прозрачность стекла' },
  ja: { menu: 'メニュー', language: '言語', theme: 'テーマ', darkTheme: 'ダークテーマ', autoTheme: '自動テーマ', lightTheme: 'ライトテーマ', accessibility: 'アクセシビリティ', accessibilitySettings: 'アクセシビリティ設定', reduceMotion: '動きを減らす', highContrast: '高コントラスト', largerText: '大きな文字', glass: 'ガラス', glassOpacity: 'ガラスの透明度' },
  fr: { menu: 'Menu', language: 'Langue', theme: 'Thème', darkTheme: 'Thème sombre', autoTheme: 'Thème automatique', lightTheme: 'Thème clair', accessibility: 'Accessibilité', accessibilitySettings: 'Réglages rapides d’accessibilité', reduceMotion: 'Réduire les animations', highContrast: 'Contraste élevé', largerText: 'Texte plus grand', glass: 'Verre', glassOpacity: 'Opacité du verre' },
  de: { menu: 'Menü', language: 'Sprache', theme: 'Design', darkTheme: 'Dunkles Design', autoTheme: 'Automatisches Design', lightTheme: 'Helles Design', accessibility: 'Barrierefreiheit', accessibilitySettings: 'Schnelleinstellungen für Barrierefreiheit', reduceMotion: 'Bewegung reduzieren', highContrast: 'Hoher Kontrast', largerText: 'Größerer Text', glass: 'Glas', glassOpacity: 'Glas-Deckkraft' },
  ko: { menu: '메뉴', language: '언어', theme: '테마', darkTheme: '다크 테마', autoTheme: '자동 테마', lightTheme: '라이트 테마', accessibility: '접근성', accessibilitySettings: '접근성 빠른 설정', reduceMotion: '동작 줄이기', highContrast: '고대비', largerText: '큰 글자', glass: '글래스', glassOpacity: '글래스 투명도' },
  id: { menu: 'Menu', language: 'Bahasa', theme: 'Tema', darkTheme: 'Tema gelap', autoTheme: 'Tema otomatis', lightTheme: 'Tema terang', accessibility: 'Aksesibilitas', accessibilitySettings: 'Pengaturan cepat aksesibilitas', reduceMotion: 'Kurangi gerakan', highContrast: 'Kontras tinggi', largerText: 'Teks lebih besar', glass: 'Kaca', glassOpacity: 'Opasitas kaca' },
  tr: { menu: 'Menü', language: 'Dil', theme: 'Tema', darkTheme: 'Koyu tema', autoTheme: 'Otomatik tema', lightTheme: 'Açık tema', accessibility: 'Erişilebilirlik', accessibilitySettings: 'Erişilebilirlik hızlı ayarları', reduceMotion: 'Hareketi azalt', highContrast: 'Yüksek kontrast', largerText: 'Daha büyük metin', glass: 'Cam', glassOpacity: 'Cam opaklığı' },
  vi: { menu: 'Menu', language: 'Ngôn ngữ', theme: 'Giao diện', darkTheme: 'Giao diện tối', autoTheme: 'Giao diện tự động', lightTheme: 'Giao diện sáng', accessibility: 'Trợ năng', accessibilitySettings: 'Cài đặt trợ năng nhanh', reduceMotion: 'Giảm chuyển động', highContrast: 'Tương phản cao', largerText: 'Chữ lớn hơn', glass: 'Kính', glassOpacity: 'Độ mờ kính' },
  it: { menu: 'Menu', language: 'Lingua', theme: 'Tema', darkTheme: 'Tema scuro', autoTheme: 'Tema automatico', lightTheme: 'Tema chiaro', accessibility: 'Accessibilità', accessibilitySettings: 'Impostazioni rapide di accessibilità', reduceMotion: 'Riduci movimento', highContrast: 'Contrasto elevato', largerText: 'Testo più grande', glass: 'Vetro', glassOpacity: 'Opacità del vetro' },
  fa: { menu: 'منو', language: 'زبان', theme: 'پوسته', darkTheme: 'پوسته تیره', autoTheme: 'پوسته خودکار', lightTheme: 'پوسته روشن', accessibility: 'دسترس‌پذیری', accessibilitySettings: 'تنظیمات سریع دسترس‌پذیری', reduceMotion: 'کاهش حرکت', highContrast: 'کنتراست بالا', largerText: 'متن بزرگ‌تر', glass: 'شیشه', glassOpacity: 'شفافیت شیشه' },
  ur: { menu: 'مینو', language: 'زبان', theme: 'تھیم', darkTheme: 'ڈارک تھیم', autoTheme: 'آٹو تھیم', lightTheme: 'لائٹ تھیم', accessibility: 'رسائی', accessibilitySettings: 'رسائی کی فوری ترتیبات', reduceMotion: 'حرکت کم کریں', highContrast: 'زیادہ کنٹراسٹ', largerText: 'بڑا متن', glass: 'شیشہ', glassOpacity: 'شیشے کی شفافیت' },
  th: { menu: 'เมนู', language: 'ภาษา', theme: 'ธีม', darkTheme: 'ธีมมืด', autoTheme: 'ธีมอัตโนมัติ', lightTheme: 'ธีมสว่าง', accessibility: 'การช่วยการเข้าถึง', accessibilitySettings: 'ตั้งค่าการช่วยการเข้าถึงด่วน', reduceMotion: 'ลดการเคลื่อนไหว', highContrast: 'คอนทราสต์สูง', largerText: 'ข้อความใหญ่ขึ้น', glass: 'กระจก', glassOpacity: 'ความทึบของกระจก' },
  pl: { menu: 'Menu', language: 'Język', theme: 'Motyw', darkTheme: 'Ciemny motyw', autoTheme: 'Automatyczny motyw', lightTheme: 'Jasny motyw', accessibility: 'Dostępność', accessibilitySettings: 'Szybkie ustawienia dostępności', reduceMotion: 'Ogranicz ruch', highContrast: 'Wysoki kontrast', largerText: 'Większy tekst', glass: 'Szkło', glassOpacity: 'Przezroczystość szkła' },
  nl: { menu: 'Menu', language: 'Taal', theme: 'Thema', darkTheme: 'Donker thema', autoTheme: 'Automatisch thema', lightTheme: 'Licht thema', accessibility: 'Toegankelijkheid', accessibilitySettings: 'Snelle toegankelijkheidsinstellingen', reduceMotion: 'Minder beweging', highContrast: 'Hoog contrast', largerText: 'Grotere tekst', glass: 'Glas', glassOpacity: 'Glasdekking' },
  sw: { menu: 'Menyu', language: 'Lugha', theme: 'Mandhari', darkTheme: 'Mandhari meusi', autoTheme: 'Mandhari ya moja kwa moja', lightTheme: 'Mandhari meupe', accessibility: 'Ufikiaji', accessibilitySettings: 'Mipangilio ya haraka ya ufikiaji', reduceMotion: 'Punguza mwendo', highContrast: 'Utofautishaji mkubwa', largerText: 'Maandishi makubwa', glass: 'Kioo', glassOpacity: 'Uwazi wa kioo' },
  ms: { menu: 'Menu', language: 'Bahasa', theme: 'Tema', darkTheme: 'Tema gelap', autoTheme: 'Tema automatik', lightTheme: 'Tema cerah', accessibility: 'Kebolehcapaian', accessibilitySettings: 'Tetapan pantas kebolehcapaian', reduceMotion: 'Kurangkan gerakan', highContrast: 'Kontras tinggi', largerText: 'Teks lebih besar', glass: 'Kaca', glassOpacity: 'Kelegapan kaca' },
  fil: { menu: 'Menu', language: 'Wika', theme: 'Tema', darkTheme: 'Madilim na tema', autoTheme: 'Awtomatikong tema', lightTheme: 'Maliwanag na tema', accessibility: 'Pagiging naa-access', accessibilitySettings: 'Mabilisang setting sa accessibility', reduceMotion: 'Bawasan ang galaw', highContrast: 'Mataas na contrast', largerText: 'Mas malaking text', glass: 'Salamin', glassOpacity: 'Opacity ng salamin' },
  uk: { menu: 'Меню', language: 'Мова', theme: 'Тема', darkTheme: 'Темна тема', autoTheme: 'Автоматична тема', lightTheme: 'Світла тема', accessibility: 'Доступність', accessibilitySettings: 'Швидкі налаштування доступності', reduceMotion: 'Менше руху', highContrast: 'Високий контраст', largerText: 'Більший текст', glass: 'Скло', glassOpacity: 'Прозорість скла' },
  he: { menu: 'תפריט', language: 'שפה', theme: 'ערכת נושא', darkTheme: 'ערכת נושא כהה', autoTheme: 'ערכת נושא אוטומטית', lightTheme: 'ערכת נושא בהירה', accessibility: 'נגישות', accessibilitySettings: 'הגדרות נגישות מהירות', reduceMotion: 'הפחתת תנועה', highContrast: 'ניגודיות גבוהה', largerText: 'טקסט גדול יותר', glass: 'זכוכית', glassOpacity: 'אטימות זכוכית' },
};

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

function normalizeNavigatorLocale(locale) {
  const normalized = localeKey(locale || document.documentElement.lang || 'en');
  if (!normalized) return 'en';
  if (['zh', 'zh-cn', 'zh-hans', 'zh-hans-cn'].includes(normalized)) return 'zh-CN';
  if (['zh-tw', 'zh-hant', 'zh-hant-tw', 'zh-hk', 'zh-mo'].includes(normalized)) return 'zh-TW';
  if (normalized === 'pt' || normalized.startsWith('pt-')) return 'pt-BR';
  return Object.keys(NAVIGATOR_UI_COPY).find((key) => localeKey(key) === normalized) || normalized;
}

function localizedValue(label, locale) {
  if (!label || typeof label !== 'object') return label || '';
  const normalized = normalizeNavigatorLocale(locale);
  const language = localeKey(normalized).split('-')[0];
  const candidates = [normalized, localeKey(normalized), language];

  for (const candidate of candidates) {
    if (Object.prototype.hasOwnProperty.call(label, candidate)) return label[candidate];
  }

  const matchingKey = Object.keys(label).find((key) => candidates.includes(localeKey(key)));
  if (matchingKey) return label[matchingKey];
  if (language === 'zh' && label.zh) return label.zh;
  if (language === 'pt' && label.pt) return label.pt;
  return label.en || label.zh || Object.values(label).find((value) => typeof value === 'string') || '';
}

function labelText(label, locale) {
  return localizedValue(label, locale);
}

function uiCopy(locale) {
  return {
    ...NAVIGATOR_UI_COPY.en,
    ...(NAVIGATOR_UI_COPY[normalizeNavigatorLocale(locale)] || {}),
  };
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

function readAuthIdentity() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.authIdentity);
    if (!raw) return null;
    const cached = JSON.parse(raw);
    const identity = cached?.identity;
    if (!identity?.subject) return null;
    const expiresAt = Date.parse(identity.expiresAt || cached.expiresAt || '');
    const cachedAt = Date.parse(cached.cachedAt || '') || Number(cached.cachedAt) || Date.now();
    const fallback = cachedAt + 15 * 60 * 1000;
    const deadline = (Number.isFinite(expiresAt) ? expiresAt : fallback) - 30000;
    if (Date.now() > deadline) return null;
    return identity;
  } catch {
    return null;
  }
}

function authLabel(identity) {
  return identity?.name || identity?.preferredUsername || identity?.email || identity?.phone || 'Account';
}

function authReturnHref(href) {
  try {
    const url = new URL(href, document.baseURI);
    return url.searchParams.get('return_to') || url.searchParams.get('returnTo') || href;
  } catch {
    return href || '#';
  }
}

function isAuthAction(action, locale) {
  const label = labelText(action.label, locale).trim().toLowerCase();
  const href = String(action.href || '');
  return href.includes('/auth/start') || ['sign in', 'log in', 'login', '登录', '登入'].includes(label);
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
    this.authChangeHandler = () => this.render();
    window.addEventListener('re8ch-auth-change', this.authChangeHandler);
    window.addEventListener('storage', this.authChangeHandler);
  }

  disconnectedCallback() {
    this.abortController?.abort();
    if (this.autoThemeTimer) window.clearInterval(this.autoThemeTimer);
    if (this.authChangeHandler) {
      window.removeEventListener('re8ch-auth-change', this.authChangeHandler);
      window.removeEventListener('storage', this.authChangeHandler);
    }
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
    const ui = uiCopy(locale);
    const sticky = this.getAttribute('sticky') || 'true';
    const maxWidth = this.getAttribute('max-width') || '1240px';
    const activeColor = product.color || '#2563eb';
    const iconHref = product.icon?.startsWith('http') ? product.icon : `${ASSET_BASE}/${product.icon}${ASSET_QUERY}`;
    const resolvedLanguages = resolveLanguages(languageCatalog, languages, locale, languageMode);
    const quickActions = extraActions.filter((action) => isAuthAction(action, locale));

    this.setAttribute('data-product', productId);
    this.setAttribute('data-sticky', sticky);
    this.style.setProperty('--re8ch-nav-max-width', maxWidth);
    this.style.setProperty('--re8ch-nav-accent', activeColor);

    this.abortController?.abort();
    this.abortController = new AbortController();

    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="${escapeHtml(CSS_HREF)}">
      <nav class="re8ch-nav" aria-label="${escapeHtml(brand)}">
        <div class="re8ch-nav__inner">
          <a class="re8ch-nav__brand" href="${escapeHtml(homeHref)}" aria-label="${escapeHtml(brand)}">
            <span class="re8ch-nav__mark"><img src="${escapeHtml(iconHref)}" alt="" decoding="async"></span>
            <strong>${escapeHtml(brand)}</strong>
          </a>
          <div class="re8ch-nav__quick-actions" aria-label="${escapeHtml(ui.accessibilitySettings)}">
            ${quickActions.map((action) => this.renderAction(action, locale, 're8ch-nav__action re8ch-nav__quick-auth')).join('')}
            ${this.renderLanguageMenu(resolvedLanguages, locale, ui, 'language-quick', 're8ch-nav__menu-wrap--quick-language')}
          </div>
          <button class="re8ch-nav__menu" type="button" aria-expanded="false" aria-controls="re8ch-nav-panel">
            <span></span><span></span><span></span>
            <span class="re8ch-nav__sr">${escapeHtml(ui.menu)}</span>
          </button>
          <div class="re8ch-nav__panel" id="re8ch-nav-panel">
            <div class="re8ch-nav__links">
              ${links.map((link) => this.renderLink(link, locale)).join('')}
            </div>
            <div class="re8ch-nav__actions">
              ${extraActions.map((action) => this.renderAction(action, locale)).join('')}
              ${this.renderLanguageMenu(resolvedLanguages, locale, ui)}
              ${this.renderThemeButton(ui)}
              ${this.renderAccessibilityMenu(ui)}
            </div>
          </div>
        </div>
      </nav>`;

    this.bindEvents();
    this.syncControlState();
    this.syncFooters();
  }

  renderLink(link, locale) {
    const label = labelText(link.label, locale);
    const current = link.current ? ' aria-current="page"' : '';
    return `<a class="re8ch-nav__link" href="${escapeHtml(link.href || '#')}"${current}>${escapeHtml(label)}</a>`;
  }

  renderAction(action, locale, className = 're8ch-nav__action') {
    const identity = isAuthAction(action, locale) ? readAuthIdentity() : null;
    const label = identity ? authLabel(identity) : labelText(action.label, locale);
    const href = identity ? authReturnHref(action.href) : (action.href || '#');
    const title = identity ? `Signed in as ${authLabel(identity)}` : label;
    const authState = identity ? ' data-auth-state="signed-in"' : '';
    return `<a class="${escapeHtml(className)}" href="${escapeHtml(href)}" rel="${escapeHtml(action.rel || 'noopener')}" title="${escapeHtml(title)}"${authState}>${escapeHtml(label)}</a>`;
  }

  renderLanguageMenu(languages, locale, ui, menuName = 'language', extraClassName = '') {
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
      <div class="re8ch-nav__menu-wrap re8ch-nav__menu-wrap--language ${escapeHtml(extraClassName)}">
        <button class="re8ch-nav__language-button" type="button" data-re8ch-menu-button="${escapeHtml(menuName)}" aria-expanded="false" aria-label="${escapeHtml(ui.language)}" title="${escapeHtml(ui.language)}">
          <span class="re8ch-nav__language-icon" aria-hidden="true">${escapeHtml(activeLabel)}</span>
          <span class="re8ch-nav__sr">${escapeHtml(ui.language)}</span>
        </button>
        <div class="re8ch-nav__popover re8ch-nav__language-menu" data-re8ch-menu="${escapeHtml(menuName)}">
          ${items}
        </div>
      </div>`;
  }

  renderThemeButton(ui) {
    return `
      <div class="re8ch-nav__theme-control" role="group" aria-label="${escapeHtml(ui.theme)}">
        <button class="re8ch-nav__theme-zone re8ch-nav__theme-zone--dark" type="button" data-theme-option="dark" aria-label="${escapeHtml(ui.darkTheme)}" title="${escapeHtml(ui.darkTheme)}"><span class="re8ch-nav__theme-icon" aria-hidden="true">${this.icon('moon')}</span><span class="re8ch-nav__sr">${escapeHtml(ui.darkTheme)}</span></button>
        <button class="re8ch-nav__theme-zone re8ch-nav__theme-zone--auto" type="button" data-theme-option="auto" aria-label="${escapeHtml(ui.autoTheme)}" title="${escapeHtml(ui.autoTheme)}"><span class="re8ch-nav__theme-icon" aria-hidden="true">${this.icon('auto')}</span><span class="re8ch-nav__sr">${escapeHtml(ui.autoTheme)}</span></button>
        <button class="re8ch-nav__theme-zone re8ch-nav__theme-zone--light" type="button" data-theme-option="light" aria-label="${escapeHtml(ui.lightTheme)}" title="${escapeHtml(ui.lightTheme)}"><span class="re8ch-nav__theme-icon" aria-hidden="true">${this.icon('sun')}</span><span class="re8ch-nav__sr">${escapeHtml(ui.lightTheme)}</span></button>
      </div>`;
  }

  renderAccessibilityMenu(ui) {
    return `
      <div class="re8ch-nav__menu-wrap">
        <button class="re8ch-nav__icon-button" type="button" data-re8ch-menu-button="accessibility" aria-expanded="false" aria-label="${escapeHtml(ui.accessibility)}" title="${escapeHtml(ui.accessibility)}">
          ${this.icon('accessibility')}
        </button>
        <div class="re8ch-nav__popover re8ch-nav__accessibility-menu" data-re8ch-menu="accessibility">
          <div class="re8ch-nav__a11y-toggles" role="group" aria-label="${escapeHtml(ui.accessibilitySettings)}">
            <label title="${escapeHtml(ui.reduceMotion)}"><input type="checkbox" data-accessibility-option="reduceMotion"><span aria-hidden="true">${this.icon('motion')}</span><span class="re8ch-nav__sr">${escapeHtml(ui.reduceMotion)}</span></label>
            <label title="${escapeHtml(ui.highContrast)}"><input type="checkbox" data-accessibility-option="highContrast"><span aria-hidden="true">${this.icon('contrast')}</span><span class="re8ch-nav__sr">${escapeHtml(ui.highContrast)}</span></label>
            <label title="${escapeHtml(ui.largerText)}"><input type="checkbox" data-accessibility-option="largerText"><span aria-hidden="true">Aa</span><span class="re8ch-nav__sr">${escapeHtml(ui.largerText)}</span></label>
          </div>
          <div class="re8ch-nav__dial-label">
            <span><strong>${escapeHtml(ui.glass)}</strong><output data-glass-output>78%</output></span>
            <button class="re8ch-nav__opacity-dial" type="button" data-accessibility-dial="glassOpacity"
              role="slider" aria-label="${escapeHtml(ui.glassOpacity)}" aria-valuemin="10" aria-valuemax="90" aria-valuenow="78">
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
    if (name === 'moon') {
      return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true"><path d="M20 14.2A7.2 7.2 0 0 1 9.8 4a8 8 0 1 0 10.2 10.2Z"></path></svg>';
    }
    if (name === 'auto') {
      return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true"><circle cx="12" cy="12" r="7"></circle><path d="M12 5v7l4 2"></path><path d="M4.8 4.8 6.2 6.2"></path><path d="M17.8 17.8l1.4 1.4"></path></svg>';
    }
    if (name === 'sun') {
      return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true"><path d="M12 3v2"></path><path d="M12 19v2"></path><path d="M5.6 5.6 7 7"></path><path d="M17 17l1.4 1.4"></path><path d="M3 12h2"></path><path d="M19 12h2"></path><path d="M5.6 18.4 7 17"></path><path d="M17 7l1.4-1.4"></path><circle cx="12" cy="12" r="4"></circle></svg>';
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
        try {
          localStorage.setItem(STORAGE_KEYS.localeChoice, button.dataset.languageOption || '');
          localStorage.setItem(STORAGE_KEYS.localeManual, '1');
          document.cookie = `${STORAGE_KEYS.localeChoice}=${encodeURIComponent(button.dataset.languageOption || '')}; Max-Age=31536000; Path=/; SameSite=Lax; Secure`;
        } catch {}
        document.querySelectorAll('re8ch-footer').forEach((footer) => footer.setAttribute('locale', button.dataset.languageOption));
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
    this.syncFooters(resolved);
    window.dispatchEvent(new CustomEvent('re8ch-theme-change', { detail: { theme: resolved, preference: this.themePreference } }));
  }

  syncFooters(theme = this.getAttribute('data-theme')) {
    const data = this.data || this.parseData();
    document.querySelectorAll('re8ch-footer').forEach((footer) => {
      footer.setAttribute('locale', data.locale);
      footer.setAttribute('language-options', JSON.stringify(data.languages || []));
      footer.setAttribute('language-mode', data.languageMode || 'global');
      if (theme) footer.setAttribute('theme', theme);
    });
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

window.Re8chNavigator = Re8chNavigator;
})();
