(() => {
const currentScript = document.currentScript;
const scriptElement = currentScript || document.querySelector('script[src*="/dist/re8ch-footer.js"], script[src*="/dist/current/re8ch-footer.js"]');
const scriptUrl = new URL(scriptElement?.src || 'https://brand-assets.re8ch.com/dist/re8ch-footer.js', document.baseURI);
const componentBaseUrl = scriptUrl.href.replace(/\/re8ch-footer\.js(?:\?.*)?$/, '');
const assetBaseUrl = componentBaseUrl.replace(/\/dist(?:\/current)?$/, '');
const trustMarkBaseUrl = `${assetBaseUrl}/dist/trust-marks`;

const RE8CH_FOOTER_CONFIG = {
  brand: {
    logoSrc: '/logo.svg',
    name: 'RE8CH',
    cnName: '锐奇创想',
    badge: 'Flagship Brand',
    description: '统一产品视觉、运行层级与外部核验入口。',
    homeHref: 'https://re8ch.com/',
  },
  layout: {
    maxWidth: '1600px',
    productsLabel: 'Products',
    recordsVisible: 8,
  },
  products: [
    { id: 'compocv', label: 'CompoCV', href: 'https://compocv.re8ch.com', icon: 'PRODUCTS/compocv/SVG/icon.svg', brandColor: '#2563eb' },
    { id: 'anycam', label: 'Anycam', href: 'https://anycam.re8ch.com', icon: 'PRODUCTS/anycam/SVG/icon.svg', brandColor: '#16a34a' },
    { id: 'anysite', label: 'AnySite', href: 'https://anysiteonearth.re8ch.com', icon: 'PRODUCTS/anysiteonearth/SVG/icon.svg', brandColor: '#14b8c4' },
    { id: 'cluster', label: 'Cluster', href: 'https://cluster.re8ch.com', icon: 'PRODUCTS/cluster/SVG/icon.svg', brandColor: '#00b559' },
    { id: 'ledger', label: 'Ledger', href: 'https://ledger.re8ch.com', icon: 'PRODUCTS/lizhang-ledger/SVG/icon.svg', brandColor: '#2563eb' },
    { id: 'observable', label: 'Observable', href: 'https://observable.re8ch.com', icon: 'PRODUCTS/observable/SVG/icon.svg', brandColor: '#f81018' },
    { id: 'phonaid', label: 'Phonaid', href: 'https://phonaid.com', icon: 'PRODUCTS/phonaid/SVG/icon.svg', brandColor: '#8b5cf6' },
    { id: 'registry-image', label: 'Registry Image', href: 'https://image.re8ch.com', icon: 'PRODUCTS/registry/SVG/icon.svg', brandColor: '#0a7fbe' },
  ],
  companyRecords: [
    {
      id: 'montana-sos',
      name: 'Montana Secretary of State',
      description: 'Company Registry',
      detail: '在 Montana Secretary of State Business Search 中搜索 RE8CH / Reachieve LLC 核验公司注册记录。',
      action: 'View Record',
      href: 'https://biz.sosmt.gov/search/business',
      logo: 'montana-sos.webp',
      icon: 'building',
      brandColor: '#47657f',
    },
    {
      id: 'duns',
      name: 'D-U-N-S Number',
      description: '12-474-2472',
      detail: 'D-U-N-S Number: 12-474-2472。请在 D&B / D-U-N-S 查询入口自行搜索核验。',
      action: 'View Profile',
      href: 'https://www.dnb.com/duns-number/lookup.html',
      logo: 'duns.svg',
      icon: 'duns',
      brandColor: '#2aa8c8',
    },
    {
      id: 'icp',
      name: 'ICP 备案',
      description: '湘ICP备2025130798号-4',
      detail: 'ICP备案号: 湘ICP备2025130798号-4。请在工信部备案管理系统自行搜索核验。',
      action: 'View Filing',
      href: 'https://beian.miit.gov.cn',
      logo: 'miit-favicon.ico',
      icon: 'certificate',
      brandColor: '#2563eb',
    },
    {
      id: 'china-credit',
      name: '国家企业信用信息公示系统',
      description: 'China Credit',
      detail: '请在国家企业信用信息公示系统中搜索主体名称，核验企业公开登记信息。',
      action: 'View Record',
      href: 'https://www.gsxt.gov.cn/index.html',
      logo: 'china-credit.svg',
      icon: 'shield',
      brandColor: '#d92323',
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      description: 'Company Page',
      detail: 'LinkedIn 企业主页，用于核验公开公司资料和联系方式。',
      action: 'View Profile',
      href: 'https://www.linkedin.com/company/107777110',
      logo: 'linkedin.svg',
      icon: 'linkedin',
      brandColor: '#0a66c2',
    },
    {
      id: 'crunchbase',
      name: 'Crunchbase',
      description: 'Company Page',
      detail: 'Crunchbase 企业主页，用于核验公开公司资料、产品与组织信息。',
      action: 'View Profile',
      href: 'https://www.crunchbase.com/organization/re8ch',
      logo: 'crunchbase.svg',
      icon: 'crunchbase',
      brandColor: '#146aff',
    },
    {
      id: 'angellist',
      name: 'AngelList',
      description: 'Company Page',
      detail: 'AngelList / Stack 公开主页，用于核验创业生态相关公开资料。',
      action: 'View Profile',
      href: 'https://stack.angellist.com/company/re8ch',
      logo: 'angellist.svg',
      icon: 'angellist',
      brandColor: '#111827',
    },
    {
      id: 'yc-cofounder',
      name: 'YC Co-Founder',
      description: 'Founder Network',
      detail: 'YC Co-Founder Matching 公开档案，用于核验创始人网络资料。',
      action: 'View Profile',
      href: 'https://www.startupschool.org/cofounder-matching/candidate/k04bmwSEL',
      logo: 'yc-cofounder.svg',
      icon: 'yc',
      brandColor: '#ff5a1f',
    },
    {
      id: 'coffeespace',
      name: 'CoffeeSpace',
      description: 'Co-Working',
      detail: 'CoffeeSpace 公开页面，用于核验创业者网络和共创空间相关资料。',
      action: 'View Profile',
      href: 'https://www.coffeespace.com/find-cofounders/by-location/united-states',
      logo: 'coffeespace.png',
      icon: 'coffee',
      brandColor: '#7c3aed',
    },
  ],
  contacts: [
    { id: 'contact', label: 'Contact Us', href: 'mailto:contact@re8ch.com', title: 'contact@re8ch.com', icon: 'mail' },
    { id: 'career', label: 'Join Us', href: 'mailto:career@re8ch.com', title: 'career@re8ch.com', icon: 'person' },
    { id: 'founder', label: 'Founder Profile', href: 'https://2wood.cn/', title: 'Woomoo Neo · 2wood.cn', icon: 'person' },
  ],
  legal: {
    copyright: '© 2026 锐奇智能 / Re8ch / 锐奇软件开发工作室 / Reachieve LLC. All rights reserved.',
    icp: '湘ICP备2025130798号-4',
    icpHref: 'https://beian.miit.gov.cn',
    address: 'Where We Are',
    addressTitle: '湖南省娄底市涟源市杨市镇锐奇软件开发工作室',
  },
};

const FOOTER_LOCALE_COPY = {
  en: {
    productsLabel: 'Products',
    recordsLabel: 'Company records and public profiles',
    contact: 'Contact Us',
    career: 'Join Us',
    address: 'Where We Are',
    productSuffix: 'product',
    currentProduct: 'current product',
    scrollLeft: 'Scroll left',
    scrollRight: 'Scroll right',
  },
  'zh-CN': {
    productsLabel: '产品网络',
    recordsLabel: '公司记录与公开资料',
    contact: '联系我们',
    career: '加入我们',
    founder: '创始人档案',
    address: '我们在哪里',
    productSuffix: '产品',
    currentProduct: '当前产品',
    scrollLeft: '向左滚动',
    scrollRight: '向右滚动',
  },
  'zh-TW': {
    productsLabel: '產品網路',
    recordsLabel: '公司紀錄與公開資料',
    contact: '聯絡我們',
    career: '加入我們',
    founder: '創辦人檔案',
    address: '我們在哪裡',
    productSuffix: '產品',
    currentProduct: '目前產品',
    scrollLeft: '向左捲動',
    scrollRight: '向右捲動',
  },
  es: { productsLabel: 'Productos', recordsLabel: 'Registros y perfiles públicos', contact: 'Contacto', career: 'Únete', address: 'Dónde estamos', productSuffix: 'producto', currentProduct: 'producto actual', scrollLeft: 'Desplazar a la izquierda', scrollRight: 'Desplazar a la derecha' },
  ar: { productsLabel: 'المنتجات', recordsLabel: 'سجلات الشركة والملفات العامة', contact: 'اتصل بنا', career: 'انضم إلينا', address: 'أين نحن', productSuffix: 'منتج', currentProduct: 'المنتج الحالي', scrollLeft: 'مرر لليسار', scrollRight: 'مرر لليمين' },
  hi: { productsLabel: 'उत्पाद', recordsLabel: 'कंपनी रिकॉर्ड और सार्वजनिक प्रोफाइल', contact: 'संपर्क करें', career: 'हमसे जुड़ें', address: 'हम कहाँ हैं', productSuffix: 'उत्पाद', currentProduct: 'वर्तमान उत्पाद', scrollLeft: 'बाएँ स्क्रॉल करें', scrollRight: 'दाएँ स्क्रॉल करें' },
  'pt-BR': { productsLabel: 'Produtos', recordsLabel: 'Registros e perfis públicos', contact: 'Fale conosco', career: 'Junte-se a nós', address: 'Onde estamos', productSuffix: 'produto', currentProduct: 'produto atual', scrollLeft: 'Rolar para a esquerda', scrollRight: 'Rolar para a direita' },
  bn: { productsLabel: 'পণ্য', recordsLabel: 'কোম্পানি রেকর্ড ও পাবলিক প্রোফাইল', contact: 'যোগাযোগ করুন', career: 'আমাদের সাথে যোগ দিন', address: 'আমরা কোথায়', productSuffix: 'পণ্য', currentProduct: 'বর্তমান পণ্য', scrollLeft: 'বামে স্ক্রল করুন', scrollRight: 'ডানে স্ক্রল করুন' },
  ru: { productsLabel: 'Продукты', recordsLabel: 'Записи компании и публичные профили', contact: 'Связаться', career: 'Присоединиться', address: 'Где мы', productSuffix: 'продукт', currentProduct: 'текущий продукт', scrollLeft: 'Прокрутить влево', scrollRight: 'Прокрутить вправо' },
  ja: { productsLabel: 'プロダクト', recordsLabel: '会社記録と公開プロフィール', contact: 'お問い合わせ', career: '採用情報', address: '所在地', productSuffix: 'プロダクト', currentProduct: '現在のプロダクト', scrollLeft: '左へスクロール', scrollRight: '右へスクロール' },
  fr: { productsLabel: 'Produits', recordsLabel: 'Registres et profils publics', contact: 'Nous contacter', career: 'Nous rejoindre', address: 'Où nous sommes', productSuffix: 'produit', currentProduct: 'produit actuel', scrollLeft: 'Faire défiler à gauche', scrollRight: 'Faire défiler à droite' },
  de: { productsLabel: 'Produkte', recordsLabel: 'Unternehmensregister und öffentliche Profile', contact: 'Kontakt', career: 'Mitmachen', address: 'Wo wir sind', productSuffix: 'Produkt', currentProduct: 'aktuelles Produkt', scrollLeft: 'Nach links scrollen', scrollRight: 'Nach rechts scrollen' },
  ko: { productsLabel: '제품', recordsLabel: '회사 기록 및 공개 프로필', contact: '문의하기', career: '함께하기', address: '위치', productSuffix: '제품', currentProduct: '현재 제품', scrollLeft: '왼쪽으로 스크롤', scrollRight: '오른쪽으로 스크롤' },
  id: { productsLabel: 'Produk', recordsLabel: 'Catatan perusahaan dan profil publik', contact: 'Hubungi kami', career: 'Bergabung', address: 'Lokasi kami', productSuffix: 'produk', currentProduct: 'produk saat ini', scrollLeft: 'Gulir ke kiri', scrollRight: 'Gulir ke kanan' },
  tr: { productsLabel: 'Ürünler', recordsLabel: 'Şirket kayıtları ve herkese açık profiller', contact: 'Bize ulaşın', career: 'Bize katılın', address: 'Neredeyiz', productSuffix: 'ürün', currentProduct: 'geçerli ürün', scrollLeft: 'Sola kaydır', scrollRight: 'Sağa kaydır' },
  vi: { productsLabel: 'Sản phẩm', recordsLabel: 'Hồ sơ công ty và hồ sơ công khai', contact: 'Liên hệ', career: 'Tham gia', address: 'Chúng tôi ở đâu', productSuffix: 'sản phẩm', currentProduct: 'sản phẩm hiện tại', scrollLeft: 'Cuộn sang trái', scrollRight: 'Cuộn sang phải' },
  it: { productsLabel: 'Prodotti', recordsLabel: 'Registri aziendali e profili pubblici', contact: 'Contattaci', career: 'Unisciti a noi', address: 'Dove siamo', productSuffix: 'prodotto', currentProduct: 'prodotto corrente', scrollLeft: 'Scorri a sinistra', scrollRight: 'Scorri a destra' },
  fa: { productsLabel: 'محصولات', recordsLabel: 'سوابق شرکت و پروفایل‌های عمومی', contact: 'تماس با ما', career: 'به ما بپیوندید', address: 'ما کجا هستیم', productSuffix: 'محصول', currentProduct: 'محصول فعلی', scrollLeft: 'اسکرول به چپ', scrollRight: 'اسکرول به راست' },
  ur: { productsLabel: 'مصنوعات', recordsLabel: 'کمپنی ریکارڈز اور عوامی پروفائلز', contact: 'رابطہ کریں', career: 'ہمارے ساتھ شامل ہوں', address: 'ہم کہاں ہیں', productSuffix: 'مصنوعہ', currentProduct: 'موجودہ مصنوعہ', scrollLeft: 'بائیں اسکرول کریں', scrollRight: 'دائیں اسکرول کریں' },
  th: { productsLabel: 'ผลิตภัณฑ์', recordsLabel: 'ทะเบียนบริษัทและโปรไฟล์สาธารณะ', contact: 'ติดต่อเรา', career: 'ร่วมงานกับเรา', address: 'เราอยู่ที่ไหน', productSuffix: 'ผลิตภัณฑ์', currentProduct: 'ผลิตภัณฑ์ปัจจุบัน', scrollLeft: 'เลื่อนไปทางซ้าย', scrollRight: 'เลื่อนไปทางขวา' },
  pl: { productsLabel: 'Produkty', recordsLabel: 'Rejestry firmy i profile publiczne', contact: 'Kontakt', career: 'Dołącz do nas', address: 'Gdzie jesteśmy', productSuffix: 'produkt', currentProduct: 'bieżący produkt', scrollLeft: 'Przewiń w lewo', scrollRight: 'Przewiń w prawo' },
  nl: { productsLabel: 'Producten', recordsLabel: 'Bedrijfsrecords en openbare profielen', contact: 'Contact', career: 'Werk met ons', address: 'Waar we zijn', productSuffix: 'product', currentProduct: 'huidig product', scrollLeft: 'Naar links scrollen', scrollRight: 'Naar rechts scrollen' },
  sw: { productsLabel: 'Bidhaa', recordsLabel: 'Rekodi za kampuni na wasifu wa umma', contact: 'Wasiliana nasi', career: 'Jiunge nasi', address: 'Tulipo', productSuffix: 'bidhaa', currentProduct: 'bidhaa ya sasa', scrollLeft: 'Sogeza kushoto', scrollRight: 'Sogeza kulia' },
  ms: { productsLabel: 'Produk', recordsLabel: 'Rekod syarikat dan profil awam', contact: 'Hubungi kami', career: 'Sertai kami', address: 'Di mana kami', productSuffix: 'produk', currentProduct: 'produk semasa', scrollLeft: 'Tatal ke kiri', scrollRight: 'Tatal ke kanan' },
  fil: { productsLabel: 'Mga produkto', recordsLabel: 'Mga rekord ng kumpanya at pampublikong profile', contact: 'Makipag-ugnayan', career: 'Sumali sa amin', address: 'Nasaan kami', productSuffix: 'produkto', currentProduct: 'kasalukuyang produkto', scrollLeft: 'Mag-scroll pakaliwa', scrollRight: 'Mag-scroll pakanan' },
  uk: { productsLabel: 'Продукти', recordsLabel: 'Записи компанії та публічні профілі', contact: 'Зв’язатися', career: 'Приєднатися', address: 'Де ми', productSuffix: 'продукт', currentProduct: 'поточний продукт', scrollLeft: 'Прокрутити ліворуч', scrollRight: 'Прокрутити праворуч' },
  he: { productsLabel: 'מוצרים', recordsLabel: 'רשומות חברה ופרופילים ציבוריים', contact: 'צרו קשר', career: 'הצטרפו אלינו', address: 'איפה אנחנו', productSuffix: 'מוצר', currentProduct: 'המוצר הנוכחי', scrollLeft: 'גלול שמאלה', scrollRight: 'גלול ימינה' },
};

const PRODUCT_LABELS = {
  'zh-CN': { compocv: 'CompoCV', anysite: 'AnySite 任意地点', ledger: '理账 Ledger', 'registry-image': 'Registry Image 镜像', cluster: 'Cluster 集群', observable: 'Observable 可观测', anycam: 'Anycam 任意相机', phonaid: 'Phonaid 万能接线助手' },
  'zh-TW': { compocv: 'CompoCV', anysite: 'AnySite 任意地點', ledger: '理帳 Ledger', 'registry-image': 'Registry Image 映像', cluster: 'Cluster 叢集', observable: 'Observable 可觀測', anycam: 'Anycam 任意相機', phonaid: 'Phonaid 萬能接線助手' },
};

const ICONS = {
  mark: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 21 19H3L12 3Z"/><path d="M12 7.5 17 17H7L12 7.5Z"/><path d="M12 7.5 9 17M12 7.5 15 17"/></svg>',
  badge: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3.8 18.5 6v5.4c0 4.1-2.2 7.1-6.5 8.8-4.3-1.7-6.5-4.7-6.5-8.8V6L12 3.8Z"/><path d="m9.4 12 1.8 1.8 3.7-4"/></svg>',
  box: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3.8 7.4 4.2v8L12 20.2 4.6 16V8L12 3.8Z"/><path d="M5 8.2 12 12l7-3.8M12 12v8"/></svg>',
  rocket: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3c3.2 3.1 4.8 6.1 4.8 9 0 2.1-.8 3.9-2.4 5.5H9.6C8 15.9 7.2 14.1 7.2 12c0-2.9 1.6-5.9 4.8-9Z"/><path d="M7.5 13.4 4.5 17.5 8.9 16M16.5 13.4l3 4.1-4.4-1.5"/><circle cx="12" cy="10.4" r="1.9"/></svg>',
  ledger: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.4 4.5h9.8a2 2 0 0 1 2 2v13H8.8a2.4 2.4 0 0 1-2.4-2.4V4.5Z"/><path d="M9.2 4.5v15M9.2 16.5h9"/><path d="M12.3 9h3.4M12.3 12h2.8"/></svg>',
  registry: '<svg viewBox="222 220 650 640" aria-hidden="true"><path d="M291 777 L505 413 L571 532 L494 666 Z" fill="#ffd619" stroke="none"/><path d="M516 390 L582 275 L792 638 L657 638 Z" fill="#0a7fbe" stroke="none"/></svg>',
  camera: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 8.7c0-1.4.8-2.2 2.2-2.2h2.7l1.4-2h3.4l1.4 2h2.7c1.4 0 2.2.8 2.2 2.2v8.1c0 1.4-.8 2.2-2.2 2.2H6.7c-1.4 0-2.2-.8-2.2-2.2V8.7Z"/><circle cx="12" cy="13" r="4"/><circle cx="12" cy="13" r="1.2"/></svg>',
  phone: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="8.5" y="3.5" width="7" height="11" rx="3.5"/><path d="M5.5 11.2c0 4 2.3 6.2 6.5 6.2s6.5-2.2 6.5-6.2M12 17.4v3.1M9 20.5h6"/><path d="M4 9.6c-1.3 1.9-1.3 4 0 5.9M20 9.6c1.3 1.9 1.3 4 0 5.9"/></svg>',
  building: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20h16M6 18V9l6-4 6 4v9M9 18v-5M12 18v-5M15 18v-5M8 10h8"/></svg>',
  certificate: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"/><path d="M8 8h8M8 12h8M8 16h5"/></svg>',
  duns: '<svg viewBox="0 0 24 24" aria-hidden="true"><text x="4" y="15.5" font-size="6.8" font-weight="800">D&amp;B</text></svg>',
  globe: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8"/><path d="M4 12h16M12 4c2 2.2 3 4.8 3 8s-1 5.8-3 8M12 4c-2 2.2-3 4.8-3 8s1 5.8 3 8"/></svg>',
  shield: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3.8 18.5 6v5.4c0 4.1-2.2 7.1-6.5 8.8-4.3-1.7-6.5-4.7-6.5-8.8V6L12 3.8Z"/><path d="m9.3 12 1.8 1.8 3.8-4"/></svg>',
  linkedin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 9h3v10H5zM6.5 5.5v.1M11 9h3v1.5c.7-1.1 1.7-1.7 3-1.7 2 0 3 1.3 3 4V19h-3v-5.3c0-1.1-.5-1.8-1.5-1.8S14 12.7 14 14v5h-3z"/></svg>',
  crunchbase: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 7v10M6 12h3a3 3 0 1 1 0 6H6"/><path d="M18 15.7a3 3 0 1 1 0-3.4"/></svg>',
  angellist: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 20c-1.5-2-2.2-4.1-2.2-6.4V6.2C6.8 4.4 8.2 3 10 3l2 7 2-7c1.8 0 3.2 1.4 3.2 3.2v7.4c0 2.3-.7 4.4-2.2 6.4"/><path d="M7 12h10M8 16h8"/></svg>',
  yc: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="5" width="14" height="14" rx="2"/><path d="m8.5 8.5 3.5 4 3.5-4M12 12.5v4"/></svg>',
  coffee: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 8h10v5a5 5 0 0 1-5 5 5 5 0 0 1-5-5Z"/><path d="M16 10h1.5a2.5 2.5 0 0 1 0 5H16M7 4c1.2.8 1.2 1.6 0 2.4M11 4c1.2.8 1.2 1.6 0 2.4M15 4c1.2.8 1.2 1.6 0 2.4"/></svg>',
  mail: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="6" width="16" height="12" rx="2"/><path d="m5.5 8 6.5 5 6.5-5"/></svg>',
  person: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8.4" r="3"/><path d="M5.8 19c.8-4 2.9-6 6.2-6s5.4 2 6.2 6"/></svg>',
  location: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20s6-5.2 6-10a6 6 0 0 0-12 0c0 4.8 6 10 6 10Z"/><circle cx="12" cy="10" r="2"/></svg>',
  chevronLeft: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>',
  chevronRight: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 6 6 6-6 6"/></svg>',
};

function mergeConfig(base, override) {
  if (!override || typeof override !== 'object') return structuredCloneSafe(base);
  const output = structuredCloneSafe(base);
  for (const [key, value] of Object.entries(override)) {
    if (Array.isArray(value)) {
      output[key] = value;
    } else if (value && typeof value === 'object' && output[key] && !Array.isArray(output[key])) {
      output[key] = mergeConfig(output[key], value);
    } else {
      output[key] = value;
    }
  }
  return output;
}

function structuredCloneSafe(value) {
  return JSON.parse(JSON.stringify(value));
}

function baseConfig() {
  return mergeConfig(RE8CH_FOOTER_CONFIG, window.RE8CH_FOOTER_CONFIG);
}

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function icon(name) {
  return ICONS[name] || ICONS.mark;
}

function productIcon(value) {
  const raw = String(value || '').trim();
  if (!raw) return icon('mark');
  if (ICONS[raw]) return icon(raw);
  if (/\.(svg|png|webp|jpe?g|gif)$/i.test(raw) || raw.includes('/')) {
    const src = /^(https?:|data:|\/)/.test(raw) ? raw : `${assetBaseUrl}/${raw.replace(/^\/+/, '')}`;
    return `<img class="re8ch-footer__product-icon" src="${escapeHtml(src)}" alt="" loading="lazy" decoding="async">`;
  }
  return icon(raw);
}

function normalizeProductId(value) {
  const key = String(value || '').trim().toLowerCase();
  if (key === 'anysiteonearth' || key === 'earth') return 'anysite';
  if (key === 'image' || key === 'registry') return 'registry-image';
  return key;
}

function boolAttr(value) {
  return value === '' || value === 'true' || value === true;
}

function splitIds(value) {
  return String(value || '')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

function normalizeLocale(value) {
  const raw = String(value || 'en');
  if (raw === 'zh') return 'zh-CN';
  if (raw === 'zh-Hant') return 'zh-TW';
  return FOOTER_LOCALE_COPY[raw] ? raw : 'en';
}

function localeCopy(locale) {
  return FOOTER_LOCALE_COPY[normalizeLocale(locale)] || FOOTER_LOCALE_COPY.en;
}

function localeProductLabel(product, locale) {
  const normalized = normalizeLocale(locale);
  return PRODUCT_LABELS[normalized]?.[product.id] || product.label;
}

function localizedHref(href, locale) {
  const normalized = normalizeLocale(locale);
  if (!href || normalized === 'en') return href;
  try {
    const url = new URL(href);
    url.pathname = `/${normalized}/`;
    return url.href.replace(/\/$/, '/');
  } catch {
    return href;
  }
}

function assetUrl(value) {
  if (!value) return '';
  if (/^(https?:|data:|\/)/.test(value)) return value;
  return `${trustMarkBaseUrl}/${value}`;
}

function setContact(contacts, id, label, hrefPrefix = '') {
  if (!label) return contacts;
  return contacts.map((contact) => {
    if (contact.id !== id) return contact;
    return {
      ...contact,
      label,
      title: label,
      href: hrefPrefix ? `${hrefPrefix}${label}` : label,
    };
  });
}

class Re8chFooter extends HTMLElement {
  static observedAttributes = [
    'active-product',
    'theme',
    'locale',
    'language-options',
    'language-mode',
    'compact',
    'variant',
    'max-width',
    'brand-logo',
    'brand-name',
    'brand-cn-name',
    'brand-href',
    'brand-description',
    'brand-badge',
    'products-label',
    'product-ids',
    'record-ids',
    'records-visible',
    'hide-products',
    'hide-records',
    'copyright',
    'icp',
    'icp-href',
    'address',
    'address-title',
    'contact-email',
    'career-email',
    'contact-label',
    'career-label',
  ];

  connectedCallback() {
    this.render();
    window.addEventListener('resize', this.handleViewportChange);
  }

  disconnectedCallback() {
    window.removeEventListener('resize', this.handleViewportChange);
  }

  attributeChangedCallback() {
    if (this.isConnected) this.render();
  }

  handleViewportChange = () => {
    this.updateScrollRails();
  };

  componentConfig() {
    const data = baseConfig();
    const locale = normalizeLocale(this.getAttribute('locale') || document.documentElement.lang || 'en');
    const copy = localeCopy(locale);
    const attrMap = [
      ['brand-logo', data.brand, 'logoSrc'],
      ['brand-name', data.brand, 'name'],
      ['brand-cn-name', data.brand, 'cnName'],
      ['brand-href', data.brand, 'homeHref'],
      ['brand-description', data.brand, 'description'],
      ['brand-badge', data.brand, 'badge'],
      ['products-label', data.layout, 'productsLabel'],
      ['copyright', data.legal, 'copyright'],
      ['icp', data.legal, 'icp'],
      ['icp-href', data.legal, 'icpHref'],
      ['address', data.legal, 'address'],
      ['address-title', data.legal, 'addressTitle'],
    ];

    attrMap.forEach(([attr, target, key]) => {
      if (this.hasAttribute(attr)) target[key] = this.getAttribute(attr);
    });

    if (!this.hasAttribute('products-label')) data.layout.productsLabel = copy.productsLabel;
    if (!this.hasAttribute('contact-label')) {
      data.contacts = data.contacts.map((contact) => contact.id === 'contact' ? { ...contact, label: copy.contact } : contact);
    }
    if (!this.hasAttribute('career-label')) {
      data.contacts = data.contacts.map((contact) => contact.id === 'career' ? { ...contact, label: copy.career } : contact);
    }
    data.contacts = data.contacts.map((contact) => contact.id === 'founder' ? { ...contact, label: copy.founder || contact.label } : contact);
    if (!this.hasAttribute('address')) data.legal.address = copy.address;

    data.contacts = setContact(data.contacts, 'contact', this.getAttribute('contact-email'), 'mailto:');
    data.contacts = setContact(data.contacts, 'career', this.getAttribute('career-email'), 'mailto:');
    if (this.hasAttribute('contact-label')) {
      data.contacts = data.contacts.map((contact) => contact.id === 'contact'
        ? { ...contact, label: this.getAttribute('contact-label') }
        : contact);
    }
    if (this.hasAttribute('career-label')) {
      data.contacts = data.contacts.map((contact) => contact.id === 'career'
        ? { ...contact, label: this.getAttribute('career-label') }
        : contact);
    }

    data.locale = locale;
    data.copy = copy;

    const productIds = splitIds(this.getAttribute('product-ids'));
    if (productIds.length) {
      data.products = data.products.filter((product) => productIds.includes(product.id));
    }

    const recordIds = splitIds(this.getAttribute('record-ids'));
    if (recordIds.length) {
      data.companyRecords = data.companyRecords.filter((record) => recordIds.includes(record.id));
    }

    data.layout.maxWidth = this.getAttribute('max-width') || data.layout.maxWidth || '1600px';
    if (this.hasAttribute('records-visible')) {
      const recordsVisible = Number(this.getAttribute('records-visible'));
      if (Number.isFinite(recordsVisible) && recordsVisible > 0) data.layout.recordsVisible = recordsVisible;
    }
    return data;
  }

  render() {
    const data = this.componentConfig();
    const activeProduct = this.getAttribute('active-product') || '';
    const theme = this.getAttribute('theme') || 'light';
    const compact = boolAttr(this.getAttribute('compact'));
    const variant = this.getAttribute('variant') || 'standard';

    this.dataset.theme = theme === 'dark' ? 'dark' : 'light';
    this.dataset.compact = compact ? 'true' : 'false';
    this.dataset.variant = variant;
    this.style.setProperty('--re8ch-footer-max-width', data.layout.maxWidth);

    this.innerHTML = `
      <footer class="re8ch-footer" aria-label="RE8CH footer">
        <div class="re8ch-footer__inner">
          ${this.hasAttribute('hide-products') ? '' : this.renderProducts(data.products, activeProduct, data.layout.productsLabel, data.brand, data.locale, data.copy)}
          ${this.hasAttribute('hide-records') ? '' : this.renderCompanyRecords(data.companyRecords, data.layout.recordsVisible, data.copy)}
          ${this.renderBottom(data.contacts, data.legal)}
        </div>
        <div class="re8ch-footer__record-tooltip" data-record-tooltip hidden></div>
      </footer>`;

    this.setupScrollRails();
    this.setupRecordTooltips();
    requestAnimationFrame(() => this.updateScrollRails());
  }

  renderProducts(products, activeProduct, label, brand, locale, copy) {
    const items = `
      <a class="re8ch-footer__rail-label" href="${escapeHtml(localizedHref(brand.homeHref, locale))}" aria-label="${escapeHtml(brand.name)} home">
        <img src="${escapeHtml(brand.logoSrc)}" alt="" loading="lazy">
        <span>${escapeHtml(label || 'Products')}</span>
      </a>
      ${products.map((product) => this.renderProduct(product, activeProduct, locale, copy)).join('')}`;
    return this.renderScrollRail('products', label || copy.productsLabel, items, {}, copy);
  }

  renderProduct(product, activeProduct, locale, copy) {
    const isActive = normalizeProductId(product.id) === normalizeProductId(activeProduct);
    const style = product.brandColor ? ` style="--item-color: ${escapeHtml(product.brandColor)}"` : '';
    const label = localeProductLabel(product, locale);
    const aria = `${label} ${copy.productSuffix}${isActive ? `, ${copy.currentProduct}` : ''}`;
    return `
      <a class="re8ch-footer__product-link" href="${escapeHtml(localizedHref(product.href, locale))}" data-product-id="${escapeHtml(product.id)}" data-active="${isActive ? 'true' : 'false'}" aria-label="${escapeHtml(aria)}" ${isActive ? 'aria-current="page"' : ''}${style}>
        ${productIcon(product.icon)}
        <span>${escapeHtml(label)}</span>
      </a>`;
  }

  renderCompanyRecords(records, recordsVisible, copy) {
    const items = records.map((record) => this.renderCompanyRecord(record)).join('');
    return `
      <section class="re8ch-footer__records-section" aria-label="${escapeHtml(copy.recordsLabel)}">
        ${this.renderScrollRail('records', copy.recordsLabel, items, { loop: true, count: records.length, visible: recordsVisible }, copy)}
      </section>`;
  }

  renderCompanyRecord(record) {
    const style = record.brandColor ? ` style="--item-color: ${escapeHtml(record.brandColor)}"` : '';
    const aria = `${record.name}. ${record.description}. ${record.detail || record.action}`;
    return `
      <button class="re8ch-footer__trust-mark" type="button" aria-label="${escapeHtml(aria)}" aria-haspopup="dialog"${style}
        data-record-name="${escapeHtml(record.name)}"
        data-record-description="${escapeHtml(record.description)}"
        data-record-detail="${escapeHtml(record.detail || record.description)}"
        data-record-action="${escapeHtml(record.action)}"
        data-record-href="${escapeHtml(record.href)}">
        <span class="re8ch-footer__trust-logo">
          ${record.logo ? `<img src="${escapeHtml(assetUrl(record.logo))}" alt="" loading="eager" decoding="async">` : icon(record.icon)}
          <span class="re8ch-footer__trust-fallback">${icon(record.icon)}</span>
        </span>
        <strong>${escapeHtml(record.name)}</strong>
      </button>`;
  }

  renderScrollRail(kind, ariaLabel, items, options = {}, copy = FOOTER_LOCALE_COPY.en) {
    const loopAttrs = options.loop
      ? ` data-loop-rail="true" data-loop-index="0" data-loop-count="${escapeHtml(options.count)}" style="--record-visible-count: ${escapeHtml(options.visible || 8)}"`
      : '';
    return `
      <div class="re8ch-footer__rail-shell re8ch-footer__rail-shell--${escapeHtml(kind)}" data-scroll-rail data-can-left="false" data-can-right="false"${loopAttrs}>
        <span class="re8ch-footer__rail-fade re8ch-footer__rail-fade--left" aria-hidden="true"></span>
        <button class="re8ch-footer__rail-button re8ch-footer__rail-button--left" type="button" data-scroll-dir="-1" aria-label="${escapeHtml(copy.scrollLeft)}">${icon('chevronLeft')}</button>
        <div class="re8ch-footer__rail-viewport" data-scroll-viewport role="region" aria-label="${escapeHtml(ariaLabel)}" tabindex="0">
          <div class="re8ch-footer__rail-track">
            ${items}
          </div>
        </div>
        <span class="re8ch-footer__rail-fade re8ch-footer__rail-fade--right" aria-hidden="true"></span>
        <button class="re8ch-footer__rail-button re8ch-footer__rail-button--right" type="button" data-scroll-dir="1" aria-label="${escapeHtml(copy.scrollRight)}">${icon('chevronRight')}</button>
      </div>`;
  }

  renderBottom(contacts, legal) {
    return `
      <div class="re8ch-footer__bottom">
        <span class="re8ch-footer__copyright">${escapeHtml(legal.copyright)}</span>
        <nav class="re8ch-footer__contact-row" aria-label="联系方式">
          ${contacts.map((contact) => `
            <a href="${escapeHtml(contact.href)}" aria-label="${escapeHtml(contact.title || contact.label)}" title="${escapeHtml(contact.title || contact.label)}">${icon(contact.icon)}<span>${escapeHtml(contact.label)}</span></a>
          `).join('')}
          <span title="${escapeHtml(legal.addressTitle || legal.address)}">${icon('location')}<span>${escapeHtml(legal.address)}</span></span>
        </nav>
        <a class="re8ch-footer__icp" href="${escapeHtml(legal.icpHref)}" rel="noopener" target="_blank">${escapeHtml(legal.icp)}</a>
      </div>`;
  }

  setupScrollRails() {
    this.querySelectorAll('[data-scroll-rail]').forEach((rail) => {
      const viewport = rail.querySelector('[data-scroll-viewport]');
      if (!viewport) return;

      viewport.addEventListener('scroll', () => this.updateScrollRail(rail), { passive: true });
      if (rail.dataset.loopRail === 'true') {
        viewport.addEventListener('wheel', (event) => this.handleLoopRailWheel(event, rail), { passive: false });
      }
      rail.querySelectorAll('[data-scroll-dir]').forEach((button) => {
        button.addEventListener('click', () => {
          const direction = Number(button.getAttribute('data-scroll-dir')) || 1;
          if (rail.dataset.loopRail === 'true') {
            this.moveLoopRail(rail, direction);
          } else {
            viewport.scrollBy({ left: direction * 260, behavior: 'smooth' });
          }
        });
      });
    });
  }

  handleLoopRailWheel(event, rail) {
    const horizontal = Math.abs(event.deltaX) >= Math.abs(event.deltaY);
    const delta = horizontal ? event.deltaX : (event.shiftKey ? event.deltaY : 0);
    if (!delta) return;

    event.preventDefault();
    rail.loopWheelRemainder = (rail.loopWheelRemainder || 0) + delta;
    const threshold = 44;
    if (Math.abs(rail.loopWheelRemainder) < threshold) return;

    const direction = rail.loopWheelRemainder > 0 ? 1 : -1;
    rail.loopWheelRemainder = 0;
    this.moveLoopRail(rail, direction);
  }

  moveLoopRail(rail, direction) {
    const track = rail.querySelector('.re8ch-footer__rail-track');
    const count = Number(rail.dataset.loopCount) || 0;
    if (!track || count < 2 || rail.dataset.animating === 'true') return;

    const item = track.querySelector('.re8ch-footer__trust-mark');
    if (!item) return;

    const distance = item.getBoundingClientRect().width;
    rail.dataset.animating = 'true';
    track.style.transition = 'none';

    if (direction < 0) {
      track.insertBefore(track.lastElementChild, track.firstElementChild);
      track.style.transform = `translateX(${-distance}px)`;
      requestAnimationFrame(() => {
        track.style.transition = 'transform 180ms ease-out';
        track.style.transform = 'translateX(0)';
      });
      window.setTimeout(() => {
        track.style.transition = 'none';
        track.style.transform = 'translateX(0)';
        rail.dataset.animating = 'false';
      }, 205);
      return;
    }

    track.style.transform = 'translateX(0)';
    requestAnimationFrame(() => {
      track.style.transition = 'transform 180ms ease-out';
      track.style.transform = `translateX(${-distance}px)`;
    });
    window.setTimeout(() => {
      track.style.transition = 'none';
      track.appendChild(track.firstElementChild);
      track.style.transform = 'translateX(0)';
      rail.dataset.animating = 'false';
    }, 205);
  }

  setupRecordTooltips() {
    const tooltip = this.querySelector('[data-record-tooltip]');
    if (!tooltip) return;

    let hideTimer;
    const clearHide = () => {
      if (hideTimer) window.clearTimeout(hideTimer);
      hideTimer = undefined;
    };
    const scheduleHide = () => {
      clearHide();
      hideTimer = window.setTimeout(() => {
        tooltip.hidden = true;
        tooltip.dataset.open = 'false';
      }, 140);
    };

    tooltip.addEventListener('mouseenter', clearHide);
    tooltip.addEventListener('mouseleave', scheduleHide);
    tooltip.addEventListener('focusin', clearHide);
    tooltip.addEventListener('focusout', scheduleHide);

    this.querySelectorAll('.re8ch-footer__trust-mark').forEach((mark) => {
      const show = () => this.showRecordTooltip(mark, tooltip);
      mark.addEventListener('mouseenter', show);
      mark.addEventListener('focusin', show);
      mark.addEventListener('mouseleave', scheduleHide);
      mark.addEventListener('focusout', scheduleHide);
      mark.addEventListener('click', show);
    });
  }

  showRecordTooltip(mark, tooltip) {
    const name = mark.dataset.recordName || '';
    const description = mark.dataset.recordDescription || '';
    const detail = mark.dataset.recordDetail || '';
    const action = mark.dataset.recordAction || 'View';
    const href = mark.dataset.recordHref || '#';

    tooltip.innerHTML = `
      <strong>${escapeHtml(name)}</strong>
      <small>${escapeHtml(description)}</small>
      <p>${escapeHtml(detail)}</p>
      <a href="${escapeHtml(href)}" rel="noopener" target="_blank">${escapeHtml(action)} <span aria-hidden="true">→</span></a>`;
    tooltip.hidden = false;
    tooltip.dataset.open = 'true';

    const rect = mark.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();
    const gap = 10;
    const left = Math.min(
      Math.max(12, rect.left + rect.width / 2 - tooltipRect.width / 2),
      window.innerWidth - tooltipRect.width - 12,
    );
    const top = rect.top > tooltipRect.height + gap + 12
      ? rect.top - tooltipRect.height - gap
      : rect.bottom + gap;

    tooltip.style.left = `${left}px`;
    tooltip.style.top = `${Math.max(12, top)}px`;
  }

  updateScrollRails() {
    this.querySelectorAll('[data-scroll-rail]').forEach((rail) => this.updateScrollRail(rail));
  }

  updateScrollRail(rail) {
    if (rail.dataset.loopRail === 'true') {
      const viewport = rail.querySelector('[data-scroll-viewport]');
      const count = Number(rail.dataset.loopCount) || 0;
      if (viewport) {
        const visible = Math.min(
          Number(rail.style.getPropertyValue('--record-visible-count')) || 8,
          viewport.clientWidth < 520 ? 2 : viewport.clientWidth < 760 ? 3 : viewport.clientWidth < 1120 ? 6 : 8,
          count || 8,
        );
        rail.style.setProperty('--record-visible-count', String(Math.max(1, visible)));
        viewport.scrollLeft = 0;
      }
      rail.dataset.canLeft = count > 1 ? 'true' : 'false';
      rail.dataset.canRight = count > 1 ? 'true' : 'false';
      rail.dataset.overflow = count > 1 ? 'true' : 'false';
      return;
    }

    const viewport = rail.querySelector('[data-scroll-viewport]');
    if (!viewport) return;

    const maxScroll = viewport.scrollWidth - viewport.clientWidth;
    const canLeft = viewport.scrollLeft > 2;
    const canRight = viewport.scrollLeft < maxScroll - 2;
    rail.dataset.canLeft = canLeft ? 'true' : 'false';
    rail.dataset.canRight = canRight ? 'true' : 'false';
    rail.dataset.overflow = maxScroll > 2 ? 'true' : 'false';
  }
}

window.RE8CH_FOOTER_DEFAULT_CONFIG = RE8CH_FOOTER_CONFIG;
window.Re8chFooter = Re8chFooter;

if (!customElements.get('re8ch-footer')) {
  customElements.define('re8ch-footer', Re8chFooter);
}

})();
