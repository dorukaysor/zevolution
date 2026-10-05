/* ═══════════════════════════════════════════════════════════
   ZEVO Product Data — Single Source of Truth
   16 products across 5 categories
═══════════════════════════════════════════════════════════ */

window.ZEVO_PRODUCTS = [

  /* ── SMARTPHONES (4) ──────────────────────────────────── */
  {
    id: 'nexus-ultra-pro',
    name: 'Nexus Ultra Pro',
    category: 'smartphones',
    categoryLabel: 'Smartphones',
    price: 1099,
    oldPrice: 1299,
    rating: 4.8,
    reviews: 3241,
    tag: 'New',
    colors: ['#1A1A1A', '#F5F5F5', '#1E3A5F'],
    specs: {
      'Display':    '6.7″ AMOLED 120Hz ProMotion',
      'Processor':  'Apex X1 Pro Chip',
      'RAM':        '16 GB LPDDR5X',
      'Storage':    '512 GB UFS 4.0',
      'Camera':     '200 MP + 50 MP + 12 MP',
      'Battery':    '5,200 mAh',
      'Charging':   '100 W Wired · 50 W Wireless',
      'OS':         'Android 15',
    },
    description: 'The Nexus Ultra Pro redefines flagship performance with its Apex X1 Pro chipset and a stunning 6.7″ AMOLED display running at 120Hz. Built for creators and professionals who demand the absolute best in every dimension.',
    images: [
      'https://picsum.photos/seed/nexus-ultra-pro/600/800',
      'https://picsum.photos/seed/nexus-ultra-pro-b/600/800',
      'https://picsum.photos/seed/nexus-ultra-pro-c/600/800',
    ],
  },
  {
    id: 'orbit-x1',
    name: 'Orbit X1',
    category: 'smartphones',
    categoryLabel: 'Smartphones',
    price: 899,
    oldPrice: null,
    rating: 4.6,
    reviews: 1892,
    tag: null,
    colors: ['#0A0A0A', '#4A90D9'],
    specs: {
      'Display':    '6.5″ Super AMOLED 90Hz',
      'Processor':  'Apex X1 Chip',
      'RAM':        '12 GB LPDDR5',
      'Storage':    '256 GB UFS 3.1',
      'Camera':     '108 MP + 12 MP + 10 MP',
      'Battery':    '4,800 mAh',
      'Charging':   '67 W Wired',
      'OS':         'Android 15',
    },
    description: 'A bold performer at a breakthrough price. The Orbit X1 delivers flagship-grade internals in a sleek compact form factor that fits every lifestyle — without the flagship price tag.',
    images: [
      'https://picsum.photos/seed/orbit-x1/600/800',
      'https://picsum.photos/seed/orbit-x1-b/600/800',
      'https://picsum.photos/seed/orbit-x1-c/600/800',
    ],
  },
  {
    id: 'flux-s23',
    name: 'Flux S23',
    category: 'smartphones',
    categoryLabel: 'Smartphones',
    price: 649,
    oldPrice: 799,
    rating: 4.4,
    reviews: 5623,
    tag: 'Sale',
    colors: ['#1A1A1A', '#FFFFFF', '#7C3AED'],
    specs: {
      'Display':    '6.4″ AMOLED 60Hz',
      'Processor':  'Apex A9',
      'RAM':        '8 GB LPDDR4X',
      'Storage':    '128 GB UFS 3.1',
      'Camera':     '64 MP + 12 MP + 5 MP',
      'Battery':    '4,500 mAh',
      'Charging':   '45 W Wired',
      'OS':         'Android 14',
    },
    description: 'The Flux S23 strikes the perfect balance between performance and value. With a vibrant AMOLED display and a capable triple camera system, it handles everything from work to weekend adventures with ease.',
    images: [
      'https://picsum.photos/seed/flux-s23/600/800',
      'https://picsum.photos/seed/flux-s23-b/600/800',
      'https://picsum.photos/seed/flux-s23-c/600/800',
    ],
  },
  {
    id: 'echo-lite',
    name: 'Echo Lite',
    category: 'smartphones',
    categoryLabel: 'Smartphones',
    price: 349,
    oldPrice: null,
    rating: 4.2,
    reviews: 8901,
    tag: 'New',
    colors: ['#1A1A1A', '#22C55E'],
    specs: {
      'Display':    '6.1″ LCD IPS 60Hz',
      'Processor':  'Apex A7',
      'RAM':        '6 GB LPDDR4',
      'Storage':    '128 GB eMMC',
      'Camera':     '48 MP + 5 MP',
      'Battery':    '4,000 mAh',
      'Charging':   '18 W Wired',
      'OS':         'Android 14',
    },
    description: 'Compact, capable, and designed for everyone. The Echo Lite brings essential smartphone features to an accessible price point without cutting corners on build quality or everyday reliability.',
    images: [
      'https://picsum.photos/seed/echo-lite/600/800',
      'https://picsum.photos/seed/echo-lite-b/600/800',
      'https://picsum.photos/seed/echo-lite-c/600/800',
    ],
  },

  /* ── LAPTOPS (3) ──────────────────────────────────────── */
  {
    id: 'apex-book-pro',
    name: 'Apex Book Pro',
    category: 'laptops',
    categoryLabel: 'Laptops',
    price: 1799,
    oldPrice: 1999,
    rating: 4.9,
    reviews: 1203,
    tag: 'New',
    colors: ['#1A1A1A', '#C0C0C0'],
    specs: {
      'Display':    '15″ OLED 2.8K 120Hz',
      'Processor':  'Apex M3 Pro (12-core)',
      'RAM':        '32 GB Unified Memory',
      'Storage':    '1 TB NVMe SSD',
      'GPU':        'Apex GPU 18-core',
      'Battery':    '90 Wh (22 hr)',
      'Ports':      'USB-C ×3 · HDMI · SD',
      'Weight':     '1.8 kg',
    },
    description: 'The Apex Book Pro is engineered for professionals who need extraordinary performance in an impossibly thin chassis. Experience up to 22 hours of battery life paired with the clarity of a true OLED display.',
    images: [
      'https://picsum.photos/seed/apex-book-pro/600/800',
      'https://picsum.photos/seed/apex-book-pro-b/600/800',
      'https://picsum.photos/seed/apex-book-pro-c/600/800',
    ],
  },
  {
    id: 'slim-air-15',
    name: 'Slim Air 15',
    category: 'laptops',
    categoryLabel: 'Laptops',
    price: 1199,
    oldPrice: null,
    rating: 4.7,
    reviews: 2341,
    tag: null,
    colors: ['#E8E8E8', '#1A1A1A'],
    specs: {
      'Display':    '15.3″ IPS 2K 60Hz',
      'Processor':  'Apex M2 (8-core)',
      'RAM':        '16 GB Unified Memory',
      'Storage':    '512 GB NVMe SSD',
      'GPU':        'Apex GPU 10-core',
      'Battery':    '75 Wh (18 hr)',
      'Ports':      'USB-C ×2 · USB-A · 3.5mm',
      'Weight':     '1.24 kg',
    },
    description: 'Effortlessly light and perpetually capable. The Slim Air 15 is the everyday companion for students and professionals who refuse to compromise on performance or portability.',
    images: [
      'https://picsum.photos/seed/slim-air-15/600/800',
      'https://picsum.photos/seed/slim-air-15-b/600/800',
      'https://picsum.photos/seed/slim-air-15-c/600/800',
    ],
  },
  {
    id: 'nova-gamer-g7',
    name: 'Nova Gamer G7',
    category: 'laptops',
    categoryLabel: 'Laptops',
    price: 1499,
    oldPrice: 1799,
    rating: 4.5,
    reviews: 987,
    tag: 'Sale',
    colors: ['#0A0A0A'],
    specs: {
      'Display':    '15.6″ IPS 1080p 144Hz',
      'Processor':  'Intel Core i9-13900HX',
      'RAM':        '32 GB DDR5',
      'Storage':    '1 TB NVMe SSD',
      'GPU':        'NVIDIA RTX 4070',
      'Battery':    '86 Wh (~6 hr gaming)',
      'Ports':      'USB-A ×4 · USB-C · HDMI 2.1',
      'Weight':     '2.3 kg',
    },
    description: 'Dominate every title with the Nova Gamer G7. RTX 4070 power and a buttery-smooth 144Hz display deliver frame rates that no console can match — plus enough thermal headroom for all-night sessions.',
    images: [
      'https://picsum.photos/seed/nova-gamer-g7/600/800',
      'https://picsum.photos/seed/nova-gamer-g7-b/600/800',
      'https://picsum.photos/seed/nova-gamer-g7-c/600/800',
    ],
  },

  /* ── AUDIO (4) ────────────────────────────────────────── */
  {
    id: 'pulse-buds-pro',
    name: 'Pulse Buds Pro',
    category: 'audio',
    categoryLabel: 'Audio',
    price: 129,
    oldPrice: 179,
    rating: 4.7,
    reviews: 12847,
    tag: 'Sale',
    colors: ['#1A1A1A', '#FFFFFF', '#FACC15'],
    specs: {
      'Battery':         '9 hr + 27 hr (case)',
      'ANC':             'Hybrid Adaptive ANC',
      'Driver':          '11 mm Dynamic',
      'Connectivity':    'Bluetooth 5.3',
      'Water Resistance':'IPX5',
      'Codec':           'AAC · LDAC',
      'Microphone':      'Dual-mic array',
      'Weight':          '5.4 g / earbud',
    },
    description: 'Pure sound, zero distractions. Pulse Buds Pro features LDAC high-res audio and adaptive ANC that reads your environment in real time — silencing the world or letting it in, on your terms.',
    images: [
      'https://picsum.photos/seed/pulse-buds-pro/600/800',
      'https://picsum.photos/seed/pulse-buds-pro-b/600/800',
      'https://picsum.photos/seed/pulse-buds-pro-c/600/800',
    ],
  },
  {
    id: 'arc-headphones-h1',
    name: 'Arc Headphones H1',
    category: 'audio',
    categoryLabel: 'Audio',
    price: 349,
    oldPrice: null,
    rating: 4.8,
    reviews: 4521,
    tag: 'New',
    colors: ['#1A1A1A', '#C0C0C0'],
    specs: {
      'Battery':         '40 hr playback',
      'ANC':             'Adaptive ANC + Transparency',
      'Driver':          '40 mm Planar Magnetic',
      'Connectivity':    'Bluetooth 5.2 + 3.5 mm',
      'Frequency':       '5 Hz – 40 kHz',
      'Codec':           'AAC · LDAC · aptX HD',
      'Microphone':      '6-mic array',
      'Weight':          '254 g',
    },
    description: 'Studio precision meets everyday comfort. The Arc H1 uses planar magnetic drivers to deliver audiophile-grade sound in an ultra-comfortable over-ear form, powered by 40 hours of wireless freedom.',
    images: [
      'https://picsum.photos/seed/arc-headphones-h1/600/800',
      'https://picsum.photos/seed/arc-headphones-h1-b/600/800',
      'https://picsum.photos/seed/arc-headphones-h1-c/600/800',
    ],
  },
  {
    id: 'bass-speaker-mini',
    name: 'Bass Speaker Mini',
    category: 'audio',
    categoryLabel: 'Audio',
    price: 79,
    oldPrice: 99,
    rating: 4.3,
    reviews: 7823,
    tag: 'Sale',
    colors: ['#1A1A1A', '#EF4444', '#3B82F6'],
    specs: {
      'Output':          '30 W Stereo',
      'Battery':         '24 hr playback',
      'Water Resistance':'IP67',
      'Connectivity':    'Bluetooth 5.3 · AUX',
      'Frequency':       '60 Hz – 20 kHz',
      'Driver':          'Dual 2″ + passive radiator',
      'Microphone':      'Built-in speakerphone',
      'Weight':          '540 g',
    },
    description: 'Big bass in a pocket-sized package. The Bass Speaker Mini delivers room-filling 30W stereo sound with 24 hours of battery life and IP67 waterproofing for any adventure, indoors or out.',
    images: [
      'https://picsum.photos/seed/bass-speaker-mini/600/800',
      'https://picsum.photos/seed/bass-speaker-mini-b/600/800',
      'https://picsum.photos/seed/bass-speaker-mini-c/600/800',
    ],
  },
  {
    id: 'clarity-iem-pro',
    name: 'Clarity IEM Pro',
    category: 'audio',
    categoryLabel: 'Audio',
    price: 199,
    oldPrice: null,
    rating: 4.6,
    reviews: 3102,
    tag: null,
    colors: ['#1A1A1A', '#C0A060'],
    specs: {
      'Driver':     'Hybrid (BA + Dynamic)',
      'Impedance':  '32 Ω',
      'Frequency':  '20 Hz – 20 kHz',
      'Sensitivity':'106 dB/mW',
      'Cable':      'Detachable 2-pin OFC Silver',
      'Connector':  '3.5 mm + 4.4 mm adaptor',
      'Nozzle':     '5 mm bore',
      'Weight':     '7 g / earbud',
    },
    description: 'Precision-tuned for audiophiles. The Clarity IEM Pro pairs a balanced armature tweeter with a dynamic bass driver for stunning detail retrieval and a natural soundstage worthy of studio monitoring.',
    images: [
      'https://picsum.photos/seed/clarity-iem-pro/600/800',
      'https://picsum.photos/seed/clarity-iem-pro-b/600/800',
      'https://picsum.photos/seed/clarity-iem-pro-c/600/800',
    ],
  },

  /* ── WEARABLES (3) ────────────────────────────────────── */
  {
    id: 'zwatch-ultra',
    name: 'ZWatch Ultra',
    category: 'wearables',
    categoryLabel: 'Wearables',
    price: 449,
    oldPrice: 499,
    rating: 4.8,
    reviews: 6743,
    tag: 'New',
    colors: ['#1A1A1A', '#C0C0C0', '#1E3A5F'],
    specs: {
      'Display':         '1.9″ AMOLED Always-On',
      'Battery':         '72 hr / 18 hr GPS',
      'Water Resistance':'100 m (10 ATM)',
      'Health':          'ECG · SpO2 · Temperature · HRV',
      'GPS':             'Dual-band GPS + GLONASS',
      'Connectivity':    'Bluetooth 5.3 · LTE',
      'Case':            'Titanium Grade 2',
      'Weight':          '61 g',
    },
    description: 'Your ultimate performance partner. The ZWatch Ultra tracks everything from elite marathon pace to deep-dive depths, wrapped in a titanium case built to last as long as your ambitions.',
    images: [
      'https://picsum.photos/seed/zwatch-ultra/600/800',
      'https://picsum.photos/seed/zwatch-ultra-b/600/800',
      'https://picsum.photos/seed/zwatch-ultra-c/600/800',
    ],
  },
  {
    id: 'fitband-x',
    name: 'FitBand X',
    category: 'wearables',
    categoryLabel: 'Wearables',
    price: 89,
    oldPrice: null,
    rating: 4.4,
    reviews: 9234,
    tag: null,
    colors: ['#1A1A1A', '#22C55E', '#FACC15'],
    specs: {
      'Display':         '1.47″ AMOLED',
      'Battery':         '14 days typical',
      'Water Resistance':'5 ATM',
      'Health':          'Heart Rate · SpO2 · Sleep',
      'GPS':             'Connected GPS',
      'Connectivity':    'Bluetooth 5.2',
      'Case':            'Aerospace Aluminum',
      'Weight':          '27 g',
    },
    description: 'Track your health without tracking your budget. FitBand X packs 14 days of battery, comprehensive health monitoring, and a vibrant AMOLED display into a band so light you forget it\'s there.',
    images: [
      'https://picsum.photos/seed/fitband-x/600/800',
      'https://picsum.photos/seed/fitband-x-b/600/800',
      'https://picsum.photos/seed/fitband-x-c/600/800',
    ],
  },
  {
    id: 'visionlens-pro',
    name: 'VisionLens Pro',
    category: 'wearables',
    categoryLabel: 'Wearables',
    price: 699,
    oldPrice: 899,
    rating: 4.2,
    reviews: 521,
    tag: 'Sale',
    colors: ['#1A1A1A', '#C0A060'],
    specs: {
      'Display':    'Dual Micro-LED 1440×1080',
      'Battery':    '3.5 hr active (26 hr standby)',
      'Field of View':'42° diagonal',
      'Processor':  'Apex XR1',
      'Camera':     '16 MP',
      'Connectivity':'Wi-Fi 6 · Bluetooth 5.2 · USB-C',
      'Storage':    '64 GB',
      'Weight':     '88 g',
    },
    description: 'See the world differently. VisionLens Pro blends augmented reality seamlessly into daily life with photorealistic overlays and a featherlight 88 g frame that pairs with any prescription lens.',
    images: [
      'https://picsum.photos/seed/visionlens-pro/600/800',
      'https://picsum.photos/seed/visionlens-pro-b/600/800',
      'https://picsum.photos/seed/visionlens-pro-c/600/800',
    ],
  },

  /* ── ACCESSORIES (2) ──────────────────────────────────── */
  {
    id: 'magpad-65w',
    name: 'MagPad 65W Charger',
    category: 'accessories',
    categoryLabel: 'Accessories',
    price: 49,
    oldPrice: 69,
    rating: 4.5,
    reviews: 15023,
    tag: 'Sale',
    colors: ['#1A1A1A', '#FFFFFF'],
    specs: {
      'Max Wattage':    '65 W total output',
      'Wireless':       'Qi2 + MagSafe compatible',
      'Pads':           '3 simultaneous devices',
      'Cable':          'USB-C 100 W (2 m) included',
      'Compatibility':  'Universal',
      'Protection':     'Overheat + Overcharge + FOD',
      'Dimensions':     '230 × 95 mm',
      'Weight':         '198 g',
    },
    description: 'One pad, three devices, zero cable chaos. MagPad 65W charges your phone, earbuds, and smartwatch simultaneously with intelligent power distribution that adapts to every device\'s needs.',
    images: [
      'https://picsum.photos/seed/magpad-65w/600/800',
      'https://picsum.photos/seed/magpad-65w-b/600/800',
      'https://picsum.photos/seed/magpad-65w-c/600/800',
    ],
  },
  {
    id: 'powercore-26k',
    name: 'PowerCore 26K',
    category: 'accessories',
    categoryLabel: 'Accessories',
    price: 79,
    oldPrice: null,
    rating: 4.7,
    reviews: 8912,
    tag: 'New',
    colors: ['#1A1A1A', '#1E3A5F'],
    specs: {
      'Capacity':     '26,800 mAh',
      'Output':       '65 W USB-C PD + 22.5 W USB-A',
      'Input':        '65 W USB-C PD',
      'Ports':        'USB-C ×2 · USB-A ×1',
      'Phone Charges':'~5× full charges (avg)',
      'Display':      'LED battery percentage',
      'Protection':   'Full-range smart protection',
      'Weight':       '481 g',
    },
    description: 'Never run out of power. The PowerCore 26K packs 26,800 mAh into aviation-grade aluminum housing, delivering 65W fast charging to laptops, phones, and tablets on a single mighty charge.',
    images: [
      'https://picsum.photos/seed/powercore-26k/600/800',
      'https://picsum.photos/seed/powercore-26k-b/600/800',
      'https://picsum.photos/seed/powercore-26k-c/600/800',
    ],
  },

]; // end ZEVO_PRODUCTS


/* ── CATEGORY METADATA ──────────────────────────────────── */
window.ZEVO_CATEGORIES = [
  {
    slug: 'smartphones',
    label: 'Smartphones',
    count: 4,
    icon: `<i class="fa-solid fa-mobile-screen-button"></i>`,
  },
  {
    slug: 'laptops',
    label: 'Laptops',
    count: 3,
    icon: `<i class="fa-solid fa-laptop"></i>`,
  },
  {
    slug: 'audio',
    label: 'Audio',
    count: 4,
    icon: `<i class="fa-solid fa-headphones"></i>`,
  },
  {
    slug: 'wearables',
    label: 'Wearables',
    count: 3,
    icon: `<i class="fa-solid fa-clock"></i>`,
  },
  {
    slug: 'accessories',
    label: 'Accessories',
    count: 2,
    icon: `<i class="fa-solid fa-bolt"></i>`,
  },
];


/* ── HELPERS ─────────────────────────────────────────────── */

/** Format price as Rs. 1,099.00 */
window.formatPrice = function(n) {
  return 'Rs. ' + Number(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

/** Calculate discount percentage */
window.discountPct = function(price, oldPrice) {
  if (!oldPrice) return 0;
  return Math.round((1 - price / oldPrice) * 100);
};

/** Find product by id */
window.getProduct = function(id) {
  return window.ZEVO_PRODUCTS.find(p => p.id === id) || null;
};

/** Get products by category */
window.getByCategory = function(slug) {
  return window.ZEVO_PRODUCTS.filter(p => p.category === slug);
};

/** Render star string (filled + empty) */
window.renderStars = function(rating) {
  const full  = Math.floor(rating);
  const half  = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty);
};

/** Build product card HTML */
window.buildProductCard = function(product, opts = {}) {
  const { delay = 0 } = opts;
  const pct = window.discountPct(product.price, product.oldPrice);
  const badge = product.tag
    ? `<span class="${product.tag === 'Sale' ? 'bg-red-500/15 text-red-400 border border-red-500/30' : 'bg-accent/15 text-[var(--c-accent-text)] border border-accent/30'} font-mono text-[10px] uppercase tracking-[0.06em] rounded-full px-2.5 py-0.5">${product.tag}</span>`
    : '';

  return `
<article class="group relative bg-z-surface border border-subtle rounded-2xl overflow-hidden card-tilt reveal${delay ? ' reveal-delay-' + delay : ''}" data-id="${product.id}" tabindex="0" role="article" aria-label="${product.name}">
  <!-- Image -->
  <div class="relative overflow-hidden rounded-xl mx-3 mt-3" style="aspect-ratio:3/4;background:var(--c-elevated)">
    <img src="${product.images[0]}" alt="${product.name}" class="w-full h-full object-cover img-scale" loading="lazy" width="400" height="533">
    ${badge ? `<div class="absolute top-3 left-3">${badge}</div>` : ''}
    <button class="wishlist-btn absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-z-elevated/80 backdrop-blur-sm border border-subtle hover:border-accent transition-colors cursor-pointer z-10"
      data-id="${product.id}" aria-label="Add ${product.name} to wishlist">
      <i class="fa-regular fa-heart wishlist-icon text-z-muted text-xs"></i>
    </button>
    <!-- Add to cart (revealed on hover) -->
    <div class="absolute bottom-0 left-0 right-0 p-3 cart-reveal z-10">
      <button class="add-to-cart w-full bg-accent text-[#0A0A0A] font-body font-semibold py-2.5 rounded-xl text-sm hover:bg-yellow-300 transition-colors cursor-pointer"
        data-id="${product.id}">Add to Cart</button>
    </div>
  </div>
  <!-- Body -->
  <a href="product.html?id=${product.id}" class="block px-3 pt-3 pb-4 focus:outline-none" tabindex="-1">
    <div class="font-mono text-[10px] uppercase tracking-[0.1em] text-z-muted mb-1">${product.categoryLabel}</div>
    <h3 class="font-body font-medium text-[14px] text-z-text mb-1.5 line-clamp-2">${product.name}</h3>
    <div class="flex items-center gap-1.5 mb-2">
      <span class="stars text-accent text-xs" aria-hidden="true">★★★★★</span>
      <span class="font-mono text-xs text-z-muted">${product.rating} (${product.reviews.toLocaleString()})</span>
    </div>
    <div class="flex items-center gap-2 flex-wrap">
      <span class="font-mono text-base font-medium text-[var(--c-accent-text)]">${window.formatPrice(product.price)}</span>
      ${product.oldPrice ? `<span class="font-mono text-sm text-z-muted line-through">${window.formatPrice(product.oldPrice)}</span>
      <span class="font-mono text-[10px] text-[var(--c-success)]">${pct}% OFF</span>` : ''}
    </div>
  </a>
  <!-- Full-card link overlay (non-interactive area only) -->
  <a href="product.html?id=${product.id}" class="absolute inset-0 z-0 focus:outline-none" aria-label="View ${product.name}" tabindex="-1"></a>
</article>`;
};
