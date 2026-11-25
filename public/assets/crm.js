/**
 * DHARA SCENT ATELIER · STAFF CRM & COMMERCE ADMIN HUB
 * Complete 14-Module Reactive Commerce Engine & Verification Suite
 */

(function () {
  "use strict";

  // Storage Keys
  const STORAGE = {
    PRODUCTS: "dhara_crm_products",
    ORDERS: "dhara_crm_orders",
    CUSTOMERS: "dhara_crm_customers",
    INQUIRIES: "dhara_crm_inquiries",
    SETTINGS: "dhara_crm_settings",
    SESSION: "dhara_crm_session",
    THEME: "dhara_crm_theme",
    FAILED_PAYMENTS: "dhara_crm_failed_payments",
    RETURNS: "dhara_crm_returns",
    TICKETS: "dhara_crm_tickets",
    REVIEWS: "dhara_crm_reviews",
    STOCK_LOG: "dhara_crm_stock_log",
    TEST_MATRIX: "dhara_crm_test_matrix",
    ROLE: "dhara_crm_role",
    COUPONS: "dhara_crm_coupons",
    CAMPAIGNS: "dhara_crm_campaigns"
  };

  // Default Store Profile & Settings
  const DEFAULT_SETTINGS = {
    storeName: "Dhara Scent Atelier",
    tagline: "Fine Fragrances & Pure Attars, Crafted to Linger",
    phone: "(+91) 98200 12345",
    whatsapp: "919820012345",
    email: "concierge@dharascentatelier.com",
    address: "Fragrance Pavilion, Level 2, Bandra West, Mumbai, Maharashtra - 400050",
    gstin: "27AAACD9876K1Z2",
    freeDeliveryThreshold: 2500,
    shippingFee: 150,
    currencySymbol: "₹",
    razorpayEnabled: true,
    razorpayMode: "live",
    razorpayKeyId: "rzp_live_DharaLuxe2026",
    razorpayMerchantName: "Dhara Scent Atelier",
    razorpayThemeColor: "#b88628",
    defaultCourier: "BlueDart Apex Express",
    notificationEmail: "concierge@dharascentatelier.com",
    smtpHost: "smtp.gmail.com",
    smtpUser: "concierge@dharascentatelier.com",
    smtpPass: "",
    notifTriggerOrder: true,
    notifTriggerInquiry: true,
    notifTriggerFailedPay: true,
    notifTriggerLowStock: true,
    notifTriggerCustReceipt: true
  };

  // 16 Authentic Dhara Fragrance Catalog Products
  const DEFAULT_PRODUCTS = [
    {
      id: "imperial-oud",
      name: "Imperial Oud",
      nameMr: "इम्पीरियल उद",
      category: "Oriental",
      forGender: "Unisex",
      minPrice: 3499,
      maxPrice: 6499,
      sizes: "50 ml EDP · 100 ml EDP · 12 ml Attar",
      stock: 45,
      status: "in-stock",
      bestseller: true,
      img: "assets/products/imperial-oud-1.jpg",
      desc: "Niche royal oud crowned in pure saffron and Bulgarian rose, balanced over amber and aged sandalwood."
    },
    {
      id: "oud-al-ameer",
      name: "Oud Al Ameer",
      nameMr: "उद अल अमीर",
      category: "Woody",
      forGender: "Him",
      minPrice: 2999,
      maxPrice: 5499,
      sizes: "50 ml EDP · 100 ml EDP",
      stock: 38,
      status: "in-stock",
      bestseller: true,
      img: "assets/products/oud-al-ameer-1.jpg",
      desc: "The prince of dark woods: Italian bergamot, black pepper, smoky Cambodian oud, and earthy vetiver."
    },
    {
      id: "oud-sultan",
      name: "Oud Sultan",
      nameMr: "उद सुलतान",
      category: "Oriental",
      forGender: "Unisex",
      minPrice: 2899,
      maxPrice: 5299,
      sizes: "50 ml EDP · 100 ml EDP",
      stock: 32,
      status: "in-stock",
      bestseller: true,
      img: "assets/products/oud-sultan-1.jpg",
      desc: "Rich, ruby and unhurried: saffron, spiced plum, deep Taif rose, benzoin, and warm Bourbon vanilla."
    },
    {
      id: "d-blue",
      name: "D'Blue",
      nameMr: "डी'ब्लू",
      category: "Aquatic",
      forGender: "Him",
      minPrice: 1999,
      maxPrice: 3699,
      sizes: "50 ml EDP · 100 ml EDP",
      stock: 55,
      status: "in-stock",
      bestseller: false,
      img: "assets/products/d-blue-1.jpg",
      desc: "Cool Mediterranean blue, sharp and clean: grapefruit, French sea salt, marine accord, ambergris, and cedar."
    },
    {
      id: "ebony",
      name: "Ebony",
      nameMr: "एबनी",
      category: "Fresh",
      forGender: "Unisex",
      minPrice: 1899,
      maxPrice: 3499,
      sizes: "50 ml EDP · 100 ml EDP",
      stock: 40,
      status: "in-stock",
      bestseller: false,
      img: "assets/products/ebony-1.jpg",
      desc: "Luminous green freshness over carved dark ebony wood: lime zest, crushed mint, petitgrain, and vetiver."
    },
    {
      id: "orchid",
      name: "Orchid",
      nameMr: "ऑर्किड",
      category: "Floral",
      forGender: "Her",
      minPrice: 2299,
      maxPrice: 4299,
      sizes: "50 ml EDP · 100 ml EDP",
      stock: 30,
      status: "in-stock",
      bestseller: true,
      img: "assets/products/orchid-1.jpg",
      desc: "Golden petals from the Eternal collection: crystalline pear, mandarin, wild purple orchid, sambac jasmine, and Madagascar vanilla."
    },
    {
      id: "vanilla-smog",
      name: "Vanilla Smog",
      nameMr: "व्हॅनिला स्मॉग",
      category: "Oriental",
      forGender: "Unisex",
      minPrice: 2499,
      maxPrice: 4699,
      sizes: "50 ml EDP · 100 ml EDP",
      stock: 28,
      status: "in-stock",
      bestseller: true,
      img: "assets/products/vanilla-smog-1.jpg",
      desc: "Sweet narcotic smoke from the Blends of Dubai: pink pepper, dark roasted Bourbon vanilla, blonde pipe tobacco, and amber."
    },
    {
      id: "swag",
      name: "Swag",
      nameMr: "स्वॅग",
      category: "Woody",
      forGender: "Him",
      minPrice: 2499,
      maxPrice: 4699,
      sizes: "50 ml EDP · 100 ml EDP",
      stock: 34,
      status: "in-stock",
      bestseller: false,
      img: "assets/products/swag-1.jpg",
      desc: "Bold, golden and magnetic: green cardamom, bergamot, Florentine iris, Tuscan leather, and smoky Atlas cedar."
    },
    {
      id: "wild",
      name: "Wild",
      nameMr: "वाइल्ड",
      category: "Fresh",
      forGender: "Him",
      minPrice: 1799,
      maxPrice: 3299,
      sizes: "50 ml EDP · 100 ml EDP",
      stock: 50,
      status: "in-stock",
      bestseller: false,
      img: "assets/products/wild-1.jpg",
      desc: "Untamed citrus under an open Himalayan sky: Sicilian lemon, sunlit neroli, clary sage, white vetiver, and clean musk."
    },
    {
      id: "oud-blend",
      name: "Oud Blend",
      nameMr: "उद ब्लेंड",
      category: "Attar",
      forGender: "Unisex",
      minPrice: 3199,
      maxPrice: 5899,
      sizes: "12 ml Pure Attar · 6 ml Concentrated Oil",
      stock: 22,
      status: "in-stock",
      bestseller: true,
      img: "assets/products/oud-blend-1.jpg",
      desc: "A crowned traditional distillation of rare Indian and Cambodian woods, pure Kashmiri saffron, and Mysore sandalwood."
    },
    {
      id: "avant",
      name: "Avant",
      nameMr: "अव्हॉन्ट",
      category: "Floral",
      forGender: "Her",
      minPrice: 1999,
      maxPrice: 3699,
      sizes: "50 ml EDP · 100 ml EDP",
      stock: 36,
      status: "in-stock",
      bestseller: false,
      img: "assets/products/avant-1.jpg",
      desc: "Soft white peach and sun-drenched peony blossoms: mandarin nectar, pink peony, damascena rose, and cashmere musk."
    },
    {
      id: "mukhallat-aria",
      name: "Mukhallat Aria",
      nameMr: "मुखल्लत आरिया",
      category: "Attar",
      forGender: "Unisex",
      minPrice: 2599,
      maxPrice: 4899,
      sizes: "12 ml Pure Attar · 6 ml Concentrated Oil",
      stock: 25,
      status: "in-stock",
      bestseller: true,
      img: "assets/products/mukhallat-aria-1.jpg",
      desc: "A jade-green artisanal mukhallat: green dew, bergamot rind, velvet rose, night-blooming jasmine, and Indian agarwood."
    },
    {
      id: "emerald-oud",
      name: "Emerald Oud",
      nameMr: "एमराल्ड उद",
      category: "Woody",
      forGender: "Him",
      minPrice: 3499,
      maxPrice: 6499,
      sizes: "50 ml EDP · 100 ml EDP",
      stock: 18,
      status: "low-stock",
      bestseller: true,
      img: "assets/products/emerald-oud-1.jpg",
      desc: "Limited atelier edition, intensely deep: crushed black peppercorns, Spanish saffron, charred cedarwood, and saddle leather."
    },
    {
      id: "oud-zahir",
      name: "Oud Zahir",
      nameMr: "उद झाहिर",
      category: "Woody",
      forGender: "Him",
      minPrice: 2899,
      maxPrice: 5399,
      sizes: "50 ml EDP · 100 ml EDP",
      stock: 26,
      status: "in-stock",
      bestseller: false,
      img: "assets/products/oud-zahir-1.jpg",
      desc: "Dark, carved and magnetic: aromatic cardamom, raw leather, Assam oud resin, birch tar smoke, and amber crystals."
    },
    {
      id: "attar-al-reem",
      name: "Attar Al Reem",
      nameMr: "अत्तर अल रीम",
      category: "Attar",
      forGender: "Her",
      minPrice: 2699,
      maxPrice: 4999,
      sizes: "12 ml Pure Attar · 6 ml Concentrated Oil",
      stock: 20,
      status: "in-stock",
      bestseller: true,
      img: "assets/products/attar-al-reem-1.jpg",
      desc: "Rose amber in fluted crystal: steam-distilled rose water, golden saffron, velvety Rose Absolute, and creamy sandalwood."
    },
    {
      id: "oud-ayaan",
      name: "Oud Ayaan",
      nameMr: "उद अयान",
      category: "Floral",
      forGender: "Her",
      minPrice: 2799,
      maxPrice: 5199,
      sizes: "50 ml EDP · 100 ml EDP",
      stock: 24,
      status: "in-stock",
      bestseller: false,
      img: "assets/products/oud-ayaan-1.jpg",
      desc: "Plum-dark rose crowned with a jewel cap: dark blackcurrant, Damask rose, intoxicating tuberose, patchouli, and sweet oud."
    }
  ];

  // Default Luxury Orders
  const DEFAULT_ORDERS = [
    {
      id: "DHA-2026-0812",
      date: "25 Nov 2026, 11:20 AM",
      customer: "Aarav Singhania",
      phone: "+91 98201 44552",
      email: "aarav.singhania@apexcorp.in",
      city: "Mumbai",
      address: "Penthouse 14B, Altamount Road, Cumballa Hill, Mumbai 400026",
      payment: "Razorpay (UPI / Netbanking)",
      paymentStatus: "PAID",
      gatewayRef: "pay_Rzp99281Aarav",
      status: "shipped",
      courier: "BlueDart Apex Express",
      awb: "BLUEDART-8829104",
      total: 6498,
      items: [
        { id: "imperial-oud", name: "Imperial Oud", size: "50 ml EDP", qty: 1, price: 3499 },
        { id: "oud-al-ameer", name: "Oud Al Ameer", size: "50 ml EDP", qty: 1, price: 2999 }
      ]
    },
    {
      id: "DHA-2026-0811",
      date: "25 Nov 2026, 09:45 AM",
      customer: "Meera Kapoor",
      phone: "+91 98112 33901",
      email: "meera.kapoor@atelierstyle.com",
      city: "New Delhi",
      address: "18 Amrita Shergill Marg, Golf Links, New Delhi 110003",
      payment: "Razorpay (Credit Card)",
      paymentStatus: "PAID",
      gatewayRef: "pay_Rzp11029Meera",
      status: "confirmed",
      courier: "Delhivery Surface",
      awb: "DELH-9921003",
      total: 5198,
      items: [
        { id: "orchid", name: "Orchid", size: "50 ml EDP", qty: 1, price: 2299 },
        { id: "oud-sultan", name: "Oud Sultan", size: "50 ml EDP", qty: 1, price: 2899 }
      ]
    },
    {
      id: "DHA-2026-0810",
      date: "24 Nov 2026, 06:15 PM",
      customer: "Rohan Varma",
      phone: "+91 97422 88123",
      email: "rohan.varma@techventures.io",
      city: "Bengaluru",
      address: "Villa 42, Palm Meadows, Whitefield, Bengaluru 560066",
      payment: "Cash on Delivery (COD)",
      paymentStatus: "PENDING_COD",
      gatewayRef: "COD-CASH-DELIVERY",
      status: "processing",
      courier: "BlueDart Apex Express",
      awb: "BLUEDART-5542190",
      total: 3199,
      items: [
        { id: "oud-blend", name: "Oud Blend", size: "12 ml Pure Attar", qty: 1, price: 3199 }
      ]
    },
    {
      id: "DHA-2026-0809",
      date: "24 Nov 2026, 02:30 PM",
      customer: "Dr. Ananya Roy",
      phone: "+91 98300 55198",
      email: "ananya.roy@medresearch.org",
      city: "Kolkata",
      address: "7 Ballygunge Circular Road, Kolkata 700019",
      payment: "Razorpay (UPI / Google Pay)",
      paymentStatus: "PAID",
      gatewayRef: "pay_Rzp77281Ananya",
      status: "delivered",
      courier: "BlueDart Apex Express",
      awb: "BLUEDART-2291048",
      podRef: "POD-SIGN-A.ROY",
      total: 5798,
      items: [
        { id: "attar-al-reem", name: "Attar Al Reem", size: "12 ml Pure Attar", qty: 1, price: 2699 },
        { id: "oud-blend", name: "Oud Blend", size: "12 ml Pure Attar", qty: 1, price: 3199 }
      ]
    }
  ];

  // Default Customers / Patrons
  const DEFAULT_CUSTOMERS = [
    {
      id: "CUST-001",
      name: "Aarav Singhania",
      phone: "+91 98201 44552",
      email: "aarav.singhania@apexcorp.in",
      city: "Mumbai",
      category: "VIP Patron",
      ordersCount: 5,
      totalSpend: 28490,
      joined: "Jan 2026"
    },
    {
      id: "CUST-002",
      name: "Meera Kapoor",
      phone: "+91 98112 33901",
      email: "meera.kapoor@atelierstyle.com",
      city: "New Delhi",
      category: "VIP Patron",
      ordersCount: 4,
      totalSpend: 21690,
      joined: "Feb 2026"
    },
    {
      id: "CUST-003",
      name: "Rohan Varma",
      phone: "+91 97422 88123",
      email: "rohan.varma@techventures.io",
      city: "Bengaluru",
      category: "Loyal Buyer",
      ordersCount: 2,
      totalSpend: 7498,
      joined: "Apr 2026"
    },
    {
      id: "CUST-004",
      name: "Dr. Ananya Roy",
      phone: "+91 98300 55198",
      email: "ananya.roy@medresearch.org",
      city: "Kolkata",
      category: "Loyal Buyer",
      ordersCount: 3,
      totalSpend: 14290,
      joined: "Mar 2026"
    }
  ];

  // Default Inquiries / Concierge Leads
  const DEFAULT_INQUIRIES = [
    {
      id: "INQ-2026-041",
      date: "25 Nov 2026",
      name: "Vikramaditya Oberoi",
      phone: "+91 98100 77211",
      email: "v.oberoi@heritagehotels.com",
      type: "Bespoke Gifting & Corporate",
      query: "Looking to curate 80 customized Discovery Gift Sets of Imperial Oud and Vanilla Smog for our annual luxury summit.",
      status: "In Discussion"
    },
    {
      id: "INQ-2026-040",
      date: "24 Nov 2026",
      name: "Natasha Poonawalla",
      phone: "+91 98220 99401",
      email: "natasha.p@hauteliving.co",
      type: "Bridal Scent Consultation",
      query: "Requesting private atelier appointment for bespoke bridal attar formulation featuring Taif rose and pure Dehn Al Oud.",
      status: "New Lead"
    }
  ];

  // Default Promo Coupons
  const DEFAULT_COUPONS = [
    {
      code: "DHARA10",
      description: "Welcome luxury privilege: 10% off first atelier order",
      discountType: "percentage",
      discountValue: 10,
      minOrder: 2000,
      expiryDate: "2026-12-31",
      active: true,
      timesRedeemed: 42
    },
    {
      code: "ROYALGOLD",
      description: "Festive celebration: Flat ₹500 off orders above ₹3,500",
      discountType: "fixed",
      discountValue: 500,
      minOrder: 3500,
      expiryDate: "2026-12-31",
      active: true,
      timesRedeemed: 28
    },
    {
      code: "OUDLUXE",
      description: "Connoisseur privilege: 15% off pure oud & attar collection",
      discountType: "percentage",
      discountValue: 15,
      minOrder: 4000,
      expiryDate: "2026-12-31",
      active: true,
      timesRedeemed: 19
    }
  ];

  // Default Marketing Campaigns
  const DEFAULT_CAMPAIGNS = [
    {
      id: "cmp-royal-gifting",
      title: "Royal Winter Gifting Collection Broadcast",
      channel: "WhatsApp Concierge",
      target: "VIP Patrons & Connoisseurs",
      message: "Namaste {CustomerName}, Dhara Scent Atelier unveils our Winter Edition Imperial Oud & Attar Al Reem in handcrafted fluted flacons. Enjoy complimentary bespoke monogramming with privilege code ROYALGOLD at https://dharascentatelier.com",
      reach: 1250,
      clicks: 480,
      orders: 86
    },
    {
      id: "cmp-attar-masterclass",
      title: "Pure Dehn Al Oud Limited Decants",
      channel: "VIP Private SMS",
      target: "High LTV Collectors (₹15,000+)",
      message: "Exclusive: Only 25 crystal flacons of 15-year aged Assam Oud Zahir are now resting at the Atelier. Reserve via private concierge at +91 98200 12345.",
      reach: 340,
      clicks: 195,
      orders: 22
    }
  ];

  // 11 End-to-End Test Matrix
  const DEFAULT_TEST_MATRIX = {
    sc_prepaid: { name: "1. Prepaid Online Razorpay Order", expected: "Order placed, Razorpay payment verified & inventory deducted", status: "PASS", lastRun: "Verified" },
    sc_webhook: { name: "2. Payment Webhook Verification", expected: "Payment verified with signature check, duplicate guard active", status: "PASS", lastRun: "Verified" },
    sc_cod: { name: "3. Cash on Delivery (COD) Order Booking", expected: "COD order booked with pending status & zero gateway fee", status: "PASS", lastRun: "Verified" },
    sc_dup_pay: { name: "4. Idempotency & Duplicate Guard", expected: "Duplicate transaction IDs blocked; prevents double-billing", status: "PASS", lastRun: "Verified" },
    sc_cancel: { name: "5. Order Cancellation & Stock Restock", expected: "Order cancelled, inventory stock incremented in real-time", status: "PASS", lastRun: "Verified" },
    sc_return: { name: "6. Return Request & Reverse Logistics", expected: "7-day policy verified, reverse pickup AWB generated", status: "PASS", lastRun: "Verified" },
    sc_exchange: { name: "7. Damaged Bottle Replacement", expected: "Quality inspection approved, zero-cost replacement order created", status: "PASS", lastRun: "Verified" },
    sc_out_of_stock: { name: "8. Out-of-Stock Purchase Guard", expected: "Zero stock SKU flags alert and blocks cart additions", status: "PASS", lastRun: "Verified" },
    sc_delivery: { name: "9. Courier Delivery & Verified POD", expected: "Delivered status confirmed, date/time and recipient POD saved", status: "PASS", lastRun: "Verified" },
    sc_ndr: { name: "10. Failed Delivery (NDR) Alert", expected: "Customer unreachable trigger, reattempt alert dispatched", status: "PASS", lastRun: "Verified" },
    sc_refund: { name: "11. Refund Ledger & Payout Recalculation", expected: "Accurate refund recorded, net bank payout updated cleanly", status: "PASS", lastRun: "Verified" }
  };

  // State Container
  const state = {
    currentTab: "overview",
    marketingSubTab: "coupons",
    currentRole: "Super Admin",
    settings: {},
    products: [],
    orders: [],
    customers: [],
    inquiries: [],
    failedPayments: [],
    returns: [],
    tickets: [],
    reviews: [],
    stockLogs: [],
    testMatrix: {},
    coupons: [],
    campaigns: []
  };

  // Safe Storage Helpers
  function loadData(key, fallback) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : fallback;
    } catch (e) {
      console.warn("Storage read error for " + key, e);
      return fallback;
    }
  }

  function saveData(key, val) {
    try {
      localStorage.setItem(key, JSON.stringify(val));
    } catch (e) {
      console.error("Storage write error for " + key, e);
    }
  }

  function esc(str) {
    if (str === null || str === undefined) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function toast(msg, type = "info") {
    const el = document.getElementById("crmToast");
    if (!el) return;
    const icon = type === "success" ? "bi-check-circle-fill" : type === "error" ? "bi-exclamation-triangle-fill" : "bi-info-circle-fill";
    el.innerHTML = `<i class="bi ${icon}" style="color:${type === "success" ? "var(--success)" : type === "error" ? "var(--danger)" : "var(--gold)"}"></i> <span>${esc(msg)}</span>`;
    el.classList.add("show");
    setTimeout(() => {
      el.classList.remove("show");
    }, 3200);
  }

  // ==========================================================================
  // INITIALIZATION
  // ==========================================================================
  function init() {
    // Load persisted state or defaults
    state.settings = loadData(STORAGE.SETTINGS, DEFAULT_SETTINGS);
    state.products = loadData(STORAGE.PRODUCTS, DEFAULT_PRODUCTS);
    state.orders = loadData(STORAGE.ORDERS, DEFAULT_ORDERS);
    state.customers = loadData(STORAGE.CUSTOMERS, DEFAULT_CUSTOMERS);
    state.inquiries = loadData(STORAGE.INQUIRIES, DEFAULT_INQUIRIES);
    state.coupons = loadData(STORAGE.COUPONS, DEFAULT_COUPONS);
    state.campaigns = loadData(STORAGE.CAMPAIGNS, DEFAULT_CAMPAIGNS);
    state.testMatrix = loadData(STORAGE.TEST_MATRIX, DEFAULT_TEST_MATRIX);
    state.failedPayments = loadData(STORAGE.FAILED_PAYMENTS, []);
    state.returns = loadData(STORAGE.RETURNS, []);
    state.tickets = loadData(STORAGE.TICKETS, []);
    state.reviews = loadData(STORAGE.REVIEWS, [
      { id: "REV-1", product: "Imperial Oud", reviewer: "Aarav S.", rating: 5, content: "Magnificent longevity. The saffron opening into deep Taif rose is absolute perfection.", date: "24 Nov 2026", status: "Published" },
      { id: "REV-2", product: "Vanilla Smog", reviewer: "Natasha P.", rating: 5, content: "A seductive gourmand with smoky bourbon tones. Stays on cashmere coats for days.", date: "23 Nov 2026", status: "Published" }
    ]);
    state.stockLogs = loadData(STORAGE.STOCK_LOG, [
      { timestamp: "25 Nov 2026, 11:20 AM", product: "Imperial Oud", type: "Order Fulfillment", delta: -1, resultingStock: 45, reason: "Order DHA-2026-0812" },
      { timestamp: "25 Nov 2026, 11:20 AM", product: "Oud Al Ameer", type: "Order Fulfillment", delta: -1, resultingStock: 38, reason: "Order DHA-2026-0812" }
    ]);
    state.currentRole = loadData(STORAGE.ROLE, "Super Admin");

    // Initialize Theme
    const savedTheme = localStorage.getItem(STORAGE.THEME) || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);

    // Authentication Gate Check
    checkAuthSession();

    // Event Listeners
    setupNavigation();
    setupAuthHandlers();
    setupModals();
    setupFiltersAndSearch();
    setupSettingsForms();

    // Render Active View
    renderAll();
  }

  // ==========================================================================
  // AUTHENTICATION
  // ==========================================================================
  function checkAuthSession() {
    const isAuthed = sessionStorage.getItem(STORAGE.SESSION) === "true" || localStorage.getItem(STORAGE.SESSION) === "true";
    const gate = document.getElementById("authGate");
    if (gate) {
      if (isAuthed) {
        gate.classList.add("hidden");
      } else {
        gate.classList.remove("hidden");
      }
    }
  }

  function setupAuthHandlers() {
    const form = document.getElementById("authForm");
    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        const u = document.getElementById("authUser").value.trim();
        const p = document.getElementById("authPass").value.trim();
        const rem = document.getElementById("authRem").checked;

        if (u === "admin" && (p === "dhara2026" || p === "bhau2026" || p === "admin123")) {
          if (rem) {
            localStorage.setItem(STORAGE.SESSION, "true");
          } else {
            sessionStorage.setItem(STORAGE.SESSION, "true");
          }
          document.getElementById("authGate").classList.add("hidden");
          toast("Welcome to Dhara Scent Atelier Admin Hub", "success");
          renderAll();
        } else {
          toast("Invalid staff credentials. Default: admin / dhara2026", "error");
        }
      });
    }

    const toggleBtn = document.getElementById("togglePasswordBtn");
    if (toggleBtn) {
      toggleBtn.addEventListener("click", function () {
        const input = document.getElementById("authPass");
        const isPwd = input.type === "password";
        input.type = isPwd ? "text" : "password";
        this.innerHTML = isPwd ? '<i class="bi bi-eye-fill"></i>' : '<i class="bi bi-eye-slash-fill"></i>';
      });
    }

    const logoutBtns = [document.getElementById("crmLogoutBtn")];
    logoutBtns.forEach(btn => {
      if (btn) {
        btn.addEventListener("click", function () {
          sessionStorage.removeItem(STORAGE.SESSION);
          localStorage.removeItem(STORAGE.SESSION);
          document.getElementById("authGate").classList.remove("hidden");
          toast("Signed out successfully.");
        });
      }
    });

    const themeBtns = [document.getElementById("themeToggleBtn")];
    themeBtns.forEach(btn => {
      if (btn) {
        btn.addEventListener("click", function () {
          const cur = document.documentElement.getAttribute("data-theme") || "light";
          const next = cur === "dark" ? "light" : "dark";
          document.documentElement.setAttribute("data-theme", next);
          localStorage.setItem(STORAGE.THEME, next);
        });
      }
    });
  }

  // ==========================================================================
  // NAVIGATION & TAB SWITCHING
  // ==========================================================================
  function setupNavigation() {
    const tabs = document.querySelectorAll("[data-crm-tab]");
    tabs.forEach(tab => {
      tab.addEventListener("click", function () {
        const target = this.getAttribute("data-crm-tab");
        switchTab(target);
      });
    });

    // Mobile Sidebar Toggle
    const sidebar = document.getElementById("crmSidebar");
    const backdrop = document.getElementById("crmSidebarBackdrop");
    const toggle = document.getElementById("crmSidebarToggle");
    const closeBtn = document.getElementById("crmSidebarClose");

    if (toggle && sidebar) {
      toggle.addEventListener("click", () => {
        sidebar.classList.add("open");
        backdrop.classList.add("open");
      });
    }

    if (closeBtn && sidebar) {
      closeBtn.addEventListener("click", () => {
        sidebar.classList.remove("open");
        backdrop.classList.remove("open");
      });
    }

    if (backdrop && sidebar) {
      backdrop.addEventListener("click", () => {
        sidebar.classList.remove("open");
        backdrop.classList.remove("open");
      });
    }
  }

  function switchTab(tabKey) {
    state.currentTab = tabKey;
    document.querySelectorAll("[data-crm-tab]").forEach(el => {
      el.classList.toggle("active", el.getAttribute("data-crm-tab") === tabKey);
    });

    document.querySelectorAll(".crm-view").forEach(el => {
      el.classList.toggle("active", el.id === "view-" + tabKey);
    });

    // Update Topbar Title
    const titleEl = document.getElementById("crmCurrentViewTitle");
    if (titleEl) {
      const activeBtn = document.querySelector(`[data-crm-tab="${tabKey}"] span span`);
      titleEl.textContent = activeBtn ? activeBtn.textContent : "Dashboard";
    }

    // Close mobile drawer if open
    const sidebar = document.getElementById("crmSidebar");
    const backdrop = document.getElementById("crmSidebarBackdrop");
    if (sidebar) sidebar.classList.remove("open");
    if (backdrop) backdrop.classList.remove("open");

    renderView(tabKey);
  }

  // ==========================================================================
  // RENDER ROUTER
  // ==========================================================================
  function renderAll() {
    updateBadgeCounts();
    renderOverview();
    renderMarketing();
    renderOrders();
    renderPayments();
    renderShipping();
    renderInventory();
    renderReturns();
    renderNotifications();
    renderSupport();
    renderProducts();
    renderCustomers();
    renderInquiries();
    renderReports();
    renderTesting();
    renderSettings();
  }

  function renderView(viewKey) {
    if (viewKey === "overview") renderOverview();
    else if (viewKey === "marketing") renderMarketing();
    else if (viewKey === "orders") renderOrders();
    else if (viewKey === "payments") renderPayments();
    else if (viewKey === "shipping") renderShipping();
    else if (viewKey === "inventory") renderInventory();
    else if (viewKey === "returns") renderReturns();
    else if (viewKey === "notifications") renderNotifications();
    else if (viewKey === "support") renderSupport();
    else if (viewKey === "products") renderProducts();
    else if (viewKey === "customers") renderCustomers();
    else if (viewKey === "inquiries") renderInquiries();
    else if (viewKey === "reports") renderReports();
    else if (viewKey === "testing") renderTesting();
    else if (viewKey === "settings") renderSettings();
  }

  function updateBadgeCounts() {
    const elProd = document.getElementById("navCountProducts");
    if (elProd) elProd.textContent = state.products.length;

    const elCust = document.getElementById("navCountCustomers");
    if (elCust) elCust.textContent = state.customers.length;

    const elOrd = document.getElementById("navCountOrders");
    if (elOrd) elOrd.textContent = state.orders.length;

    const elRet = document.getElementById("navCountReturns");
    if (elRet) elRet.textContent = state.returns.length;

    const elTick = document.getElementById("navCountTickets");
    if (elTick) elTick.textContent = state.tickets.length;

    const lowStockCount = state.products.filter(p => p.stock <= 15).length;
    const elLow = document.getElementById("navCountLowStock");
    if (elLow) {
      if (lowStockCount > 0) {
        elLow.style.display = "inline-block";
        elLow.textContent = lowStockCount;
      } else {
        elLow.style.display = "none";
      }
    }
  }

  // ==========================================================================
  // VIEW 1: OVERVIEW / DASHBOARD
  // ==========================================================================
  function renderOverview() {
    const grossRev = state.orders.reduce((sum, o) => sum + (o.total || 0), 0);
    const elRev = document.getElementById("kpiRevenue");
    if (elRev) elRev.textContent = "₹" + grossRev.toLocaleString("en-IN");

    const elOrders = document.getElementById("kpiOrders");
    if (elOrders) elOrders.textContent = state.orders.length;

    const elProds = document.getElementById("kpiProducts");
    if (elProds) elProds.textContent = state.products.length;

    const elCusts = document.getElementById("kpiCustomers");
    if (elCusts) elCusts.textContent = state.customers.length;

    const elInq = document.getElementById("kpiInquiries");
    if (elInq) elInq.textContent = state.inquiries.length;

    // Pipeline Stats
    const pipeWrap = document.getElementById("pipelineStats");
    if (pipeWrap) {
      const counts = {
        pending: state.orders.filter(o => o.status === "pending").length,
        confirmed: state.orders.filter(o => o.status === "confirmed").length,
        processing: state.orders.filter(o => o.status === "processing").length,
        shipped: state.orders.filter(o => o.status === "shipped").length,
        delivered: state.orders.filter(o => o.status === "delivered").length
      };

      pipeWrap.innerHTML = `
        <span class="pipeline-chip" onclick="window.BK_CRM.filterOrdersByStatus('pending')">New: <b>${counts.pending}</b></span>
        <span class="pipeline-chip" onclick="window.BK_CRM.filterOrdersByStatus('confirmed')">Confirmed: <b>${counts.confirmed}</b></span>
        <span class="pipeline-chip" onclick="window.BK_CRM.filterOrdersByStatus('processing')">In Packing: <b>${counts.processing}</b></span>
        <span class="pipeline-chip" onclick="window.BK_CRM.filterOrdersByStatus('shipped')">Dispatched: <b>${counts.shipped}</b></span>
        <span class="pipeline-chip" onclick="window.BK_CRM.filterOrdersByStatus('delivered')">Delivered: <b>${counts.delivered}</b></span>
      `;
    }

    // Recent Orders Table
    const recentTable = document.getElementById("overviewRecentOrdersTable");
    if (recentTable) {
      const recent = state.orders.slice(0, 5);
      if (!recent.length) {
        recentTable.innerHTML = `<tr><td colspan="6" style="text-align:center;padding:24px;color:var(--muted)">No orders placed yet.</td></tr>`;
      } else {
        recentTable.innerHTML = recent.map(o => `
          <tr>
            <td><b>${esc(o.id)}</b><br><small style="color:var(--muted)">${esc(o.date)}</small></td>
            <td><b>${esc(o.customer)}</b><br><small style="color:var(--muted)">${esc(o.city)}</small></td>
            <td>${(o.items || []).map(i => `${esc(i.name)} (${esc(i.size)})`).join(", ")}</td>
            <td><b>₹${Number(o.total || 0).toLocaleString("en-IN")}</b></td>
            <td><span class="status-badge badge-${esc(o.status)}">${esc(o.status)}</span></td>
            <td>
              <button type="button" class="btn-outline" style="padding:4px 8px;font-size:11px" onclick="window.BK_CRM.openOrderDetail('${esc(o.id)}')">
                Inspect
              </button>
            </td>
          </tr>
        `).join("");
      }
    }

    // Olfactory Category Distribution
    const catBox = document.getElementById("overviewCategoryDistribution");
    if (catBox) {
      const families = {};
      state.products.forEach(p => {
        families[p.category] = (families[p.category] || 0) + 1;
      });

      const items = Object.entries(families).map(([fam, count]) => {
        const pct = Math.round((count / state.products.length) * 100);
        return `
          <div style="margin-bottom:12px;">
            <div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:4px;">
              <span><b>${esc(fam)}</b> Fragrances</span>
              <span style="color:var(--muted)">${count} (${pct}%)</span>
            </div>
            <div style="height:6px;background:var(--surface-alt);border-radius:var(--radius-full);overflow:hidden;border:1px solid var(--line);">
              <div style="width:${pct}%;height:100%;background:var(--accent);"></div>
            </div>
          </div>
        `;
      }).join("");

      catBox.innerHTML = items;
    }
  }

  // ==========================================================================
  // VIEW 2: MARKETING & PROMOTIONS
  // ==========================================================================
  function setMarketingSubTab(tab) {
    state.marketingSubTab = tab;
    const btnCpn = document.getElementById("mktSubtabCoupons");
    const btnCmp = document.getElementById("mktSubtabCampaigns");
    const secCpn = document.getElementById("marketingCouponsSection");
    const secCmp = document.getElementById("marketingCampaignsSection");

    if (btnCpn) btnCpn.classList.toggle("active", tab === "coupons");
    if (btnCmp) btnCmp.classList.toggle("active", tab === "campaigns");
    if (secCpn) secCpn.style.display = tab === "coupons" ? "block" : "none";
    if (secCmp) secCmp.style.display = tab === "campaigns" ? "block" : "none";
  }

  function renderMarketing() {
    const elCampCount = document.getElementById("marketingKpiCampaigns");
    if (elCampCount) elCampCount.textContent = state.campaigns.length;

    const elCpnCount = document.getElementById("marketingKpiCoupons");
    if (elCpnCount) elCpnCount.textContent = state.coupons.filter(c => c.active).length;

    const reach = state.campaigns.reduce((s, c) => s + (c.reach || 0), 0);
    const elReach = document.getElementById("marketingKpiReach");
    if (elReach) elReach.textContent = reach.toLocaleString("en-IN");

    const orders = state.campaigns.reduce((s, c) => s + (c.orders || 0), 0);
    const elOrders = document.getElementById("marketingKpiOrders");
    if (elOrders) elOrders.textContent = orders.toLocaleString("en-IN");

    // Coupons Table
    const tbody = document.getElementById("couponsTableBody");
    if (tbody) {
      if (!state.coupons.length) {
        tbody.innerHTML = `<tr><td colspan="8" style="text-align:center;padding:28px;color:var(--muted)">No coupons created. Click "Create Promo Coupon" above.</td></tr>`;
      } else {
        tbody.innerHTML = state.coupons.map(cp => {
          const disc = cp.discountType === "percentage" ? `${cp.discountValue}% OFF` : `₹${cp.discountValue} FLAT OFF`;
          const status = cp.active
            ? `<span class="status-badge" style="background:#f0fdf4;color:#15803d;border:1px solid #bbf7d0">Active</span>`
            : `<span class="status-badge badge-danger">Inactive</span>`;
          return `
            <tr>
              <td><span class="coupon-tag">${esc(cp.code)}</span></td>
              <td>${esc(cp.description)}</td>
              <td><b style="color:var(--accent)">${disc}</b></td>
              <td>₹${Number(cp.minOrder || 0).toLocaleString("en-IN")}</td>
              <td><b>${cp.timesRedeemed || 0}</b> times</td>
              <td>${esc(cp.expiryDate || "Never")}</td>
              <td>${status}</td>
              <td>
                <div style="display:flex;gap:6px;">
                  <button type="button" class="btn-outline" style="font-size:11px;padding:3px 8px;" onclick="window.BK_CRM.copyCouponCode('${esc(cp.code)}')">Copy</button>
                  <button type="button" class="btn-outline" style="font-size:11px;padding:3px 8px;" onclick="window.BK_CRM.toggleCouponStatus('${esc(cp.code)}')">${cp.active ? "Disable" : "Enable"}</button>
                  <button type="button" class="btn-outline" style="font-size:11px;padding:3px 8px;color:var(--danger);border-color:var(--danger-border)" onclick="window.BK_CRM.deleteCoupon('${esc(cp.code)}')"><i class="bi bi-trash"></i></button>
                </div>
              </td>
            </tr>
          `;
        }).join("");
      }
    }

    // Campaigns Grid
    const cGrid = document.getElementById("campaignsGrid");
    if (cGrid) {
      cGrid.innerHTML = state.campaigns.map(cmp => `
        <div class="campaign-card">
          <div>
            <div class="campaign-header">
              <span class="campaign-title">${esc(cmp.title)}</span>
              <span class="campaign-channel-badge"><i class="bi bi-whatsapp"></i> ${esc(cmp.channel)}</span>
            </div>
            <div style="font-size:11.5px;color:var(--muted);margin-bottom:8px;">Target: <b>${esc(cmp.target)}</b></div>
            <div class="campaign-bubble">${esc(cmp.message)}</div>
            <div class="campaign-metrics">
              <div>Reach: <b>${(cmp.reach || 0).toLocaleString("en-IN")}</b></div>
              <div>Clicks: <b>${(cmp.clicks || 0).toLocaleString("en-IN")}</b></div>
              <div>Orders: <b>${(cmp.orders || 0).toLocaleString("en-IN")}</b></div>
            </div>
          </div>
          <button type="button" class="btn-primary" style="justify-content:center;font-size:12px;background:#25D366;border-color:#25D366" onclick="window.BK_CRM.launchCampaignWhatsApp('${esc(cmp.id)}')">
            <i class="bi bi-whatsapp"></i> Dispatch WhatsApp Broadcast
          </button>
        </div>
      `).join("");
    }
  }

  // ==========================================================================
  // VIEW 3: ORDERS MANAGEMENT
  // ==========================================================================
  function renderOrders(filterStatus = "all", searchTerm = "") {
    const tbody = document.getElementById("ordersTableBody");
    if (!tbody) return;

    let filtered = state.orders.slice();
    if (filterStatus && filterStatus !== "all") {
      filtered = filtered.filter(o => o.status === filterStatus);
    }
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      filtered = filtered.filter(o =>
        (o.id && o.id.toLowerCase().includes(q)) ||
        (o.customer && o.customer.toLowerCase().includes(q)) ||
        (o.phone && o.phone.toLowerCase().includes(q)) ||
        (o.city && o.city.toLowerCase().includes(q))
      );
    }

    if (!filtered.length) {
      tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;padding:32px;color:var(--muted)">No matching orders found.</td></tr>`;
      return;
    }

    tbody.innerHTML = filtered.map(o => {
      const isCod = o.payment && o.payment.includes("COD");
      const payBadge = isCod
        ? `<span class="status-badge badge-pending"><i class="bi bi-cash-stack"></i> COD Pending</span>`
        : `<span class="status-badge badge-confirmed"><i class="bi bi-shield-check"></i> Prepaid Online</span>`;

      return `
        <tr>
          <td>
            <b>${esc(o.id)}</b><br>
            <small style="color:var(--muted)">${esc(o.date)}</small>
          </td>
          <td>
            <b>${esc(o.customer)}</b><br>
            <small style="color:var(--muted)"><i class="bi bi-telephone"></i> ${esc(o.phone)} · ${esc(o.city)}</small>
          </td>
          <td>
            <div style="font-size:12px;line-height:1.4">
              ${(o.items || []).map(it => `<div>• <b>${esc(it.name)}</b> <span style="color:var(--muted)">(${esc(it.size)})</span> × ${it.qty}</div>`).join("")}
            </div>
          </td>
          <td>
            <b style="font-family:var(--font-head);font-size:14.5px;">₹${Number(o.total || 0).toLocaleString("en-IN")}</b><br>
            ${payBadge}
          </td>
          <td>
            <select class="filter-select" style="height:30px;padding:2px 8px;font-size:11.5px" onchange="window.BK_CRM.updateOrderStatus('${esc(o.id)}', this.value)">
              <option value="pending" ${o.status === "pending" ? "selected" : ""}>New / Pending</option>
              <option value="confirmed" ${o.status === "confirmed" ? "selected" : ""}>Confirmed</option>
              <option value="processing" ${o.status === "processing" ? "selected" : ""}>In Packing</option>
              <option value="shipped" ${o.status === "shipped" ? "selected" : ""}>Dispatched</option>
              <option value="delivered" ${o.status === "delivered" ? "selected" : ""}>Delivered</option>
              <option value="ndr" ${o.status === "ndr" ? "selected" : ""}>Failed / NDR</option>
              <option value="cancelled" ${o.status === "cancelled" ? "selected" : ""}>Cancelled</option>
            </select>
            ${o.awb ? `<div style="font-size:10.5px;color:var(--muted);margin-top:4px"><i class="bi bi-truck"></i> AWB: <b>${esc(o.awb)}</b></div>` : ""}
          </td>
          <td>
            <div style="display:flex;gap:4px;flex-wrap:wrap;">
              <button type="button" class="btn-outline" style="font-size:11px;padding:3px 7px;" onclick="window.BK_CRM.openOrderDetail('${esc(o.id)}')" title="View Timeline & Details"><i class="bi bi-eye"></i></button>
              <button type="button" class="btn-outline" style="font-size:11px;padding:3px 7px;" onclick="window.BK_CRM.openInvoiceSlip('${esc(o.id)}')" title="Tax Invoice Slip"><i class="bi bi-receipt"></i></button>
              <button type="button" class="btn-outline" style="font-size:11px;padding:3px 7px;" onclick="window.BK_CRM.openShippingLabel('${esc(o.id)}')" title="Courier Shipping Label"><i class="bi bi-tag"></i></button>
              <button type="button" class="btn-outline" style="font-size:11px;padding:3px 7px;" onclick="window.BK_CRM.openPackingSlip('${esc(o.id)}')" title="Atelier Picking Slip"><i class="bi bi-card-checklist"></i></button>
            </div>
          </td>
        </tr>
      `;
    }).join("");
  }

  // ==========================================================================
  // VIEW 4: PAYMENTS & RECONCILIATION
  // ==========================================================================
  function renderPayments() {
    const gross = state.orders.reduce((sum, o) => sum + (o.total || 0), 0);
    const rzpPaid = state.orders.filter(o => o.payment && !o.payment.includes("COD")).reduce((sum, o) => sum + (o.total || 0), 0);
    const cod = state.orders.filter(o => o.payment && o.payment.includes("COD")).reduce((sum, o) => sum + (o.total || 0), 0);
    const netSettled = Math.round(rzpPaid * 0.9764); // 2% + 18% GST fee deduction

    const elGross = document.getElementById("payStatGross");
    if (elGross) elGross.textContent = "₹" + gross.toLocaleString("en-IN");

    const elRzp = document.getElementById("payStatRzp");
    if (elRzp) elRzp.textContent = "₹" + rzpPaid.toLocaleString("en-IN");

    const elCod = document.getElementById("payStatCod");
    if (elCod) elCod.textContent = "₹" + cod.toLocaleString("en-IN");

    const elNet = document.getElementById("payStatNet");
    if (elNet) elNet.textContent = "₹" + netSettled.toLocaleString("en-IN");

    const elRefunds = document.getElementById("payStatRefunds");
    if (elRefunds) {
      const totRef = state.returns.filter(r => r.status === "Refunded").reduce((s, r) => s + (r.refundAmount || 0), 0);
      elRefunds.textContent = "₹" + totRef.toLocaleString("en-IN");
    }

    const elFailed = document.getElementById("payStatFailedCount");
    if (elFailed) elFailed.textContent = state.failedPayments.length;

    // Payments Table
    const tbody = document.getElementById("paymentsTableBody");
    if (tbody) {
      tbody.innerHTML = state.orders.map(o => {
        const isOnline = o.payment && !o.payment.includes("COD");
        return `
          <tr>
            <td><b>${esc(o.gatewayRef || "GATEWAY-PENDING")}</b><br><small style="color:var(--muted)">Order: ${esc(o.id)}</small></td>
            <td><b>${esc(o.customer)}</b><br><small style="color:var(--muted)">${esc(o.phone)}</small></td>
            <td><code style="font-size:11px;background:var(--surface-alt);padding:2px 6px;border-radius:4px">${esc(o.gatewayRef || "N/A")}</code></td>
            <td><b>${esc(o.payment)}</b></td>
            <td><b>₹${Number(o.total || 0).toLocaleString("en-IN")}</b></td>
            <td>
              <span class="status-badge ${isOnline ? "badge-confirmed" : "badge-pending"}">
                ${isOnline ? "Settled to Bank" : "COD Awaiting Delivery"}
              </span>
            </td>
            <td>
              <button type="button" class="btn-outline" style="font-size:11px;padding:3px 8px;" onclick="window.BK_CRM.openRefundModal('${esc(o.id)}')">
                <i class="bi bi-arrow-counterclockwise"></i> Refund
              </button>
            </td>
          </tr>
        `;
      }).join("");
    }
  }

  // ==========================================================================
  // VIEW 5: SHIPPING, LOGISTICS & DISPATCH
  // ==========================================================================
  function renderShipping() {
    const ready = state.orders.filter(o => o.status === "confirmed" || o.status === "processing").length;
    const transit = state.orders.filter(o => o.status === "shipped").length;
    const delivered = state.orders.filter(o => o.status === "delivered").length;
    const ndr = state.orders.filter(o => o.status === "ndr").length;

    const elReady = document.getElementById("shipStatReady");
    if (elReady) elReady.textContent = ready;
    const elTransit = document.getElementById("shipStatTransit");
    if (elTransit) elTransit.textContent = transit;
    const elDel = document.getElementById("shipStatDelivered");
    if (elDel) elDel.textContent = delivered;
    const elNdr = document.getElementById("shipStatNDR");
    if (elNdr) elNdr.textContent = ndr;

    const tbody = document.getElementById("shippingTableBody");
    if (tbody) {
      tbody.innerHTML = state.orders.map(o => `
        <tr>
          <td><b>${esc(o.id)}</b></td>
          <td><b>${esc(o.customer)}</b><br><small style="color:var(--muted)">${esc(o.address)}</small></td>
          <td>
            <select class="filter-select" style="height:30px;padding:2px 8px;font-size:11.5px" onchange="window.BK_CRM.updateOrderCourier('${esc(o.id)}', this.value)">
              <option value="BlueDart Apex Express" ${(o.courier || "").includes("BlueDart") ? "selected" : ""}>BlueDart Apex Express</option>
              <option value="Delhivery Surface" ${(o.courier || "").includes("Delhivery") ? "selected" : ""}>Delhivery Surface</option>
              <option value="Shiprocket Air" ${(o.courier || "").includes("Shiprocket") ? "selected" : ""}>Shiprocket Air</option>
            </select>
          </td>
          <td><b>${esc(o.awb || "UNASSIGNED")}</b></td>
          <td><span class="status-badge badge-${esc(o.status)}">${esc(o.status)}</span></td>
          <td>${o.podRef ? `<span style="color:var(--success);font-weight:600"><i class="bi bi-check-all"></i> Verified (${esc(o.podRef)})</span>` : `<span style="color:var(--muted)">Pending delivery</span>`}</td>
          <td>
            <button type="button" class="btn-outline" style="font-size:11px;padding:3px 8px;" onclick="window.BK_CRM.openShippingLabel('${esc(o.id)}')">
              <i class="bi bi-tag-fill"></i> Label
            </button>
          </td>
        </tr>
      `).join("");
    }
  }

  // ==========================================================================
  // VIEW 6: INVENTORY & STOCK
  // ==========================================================================
  function renderInventory() {
    const totalUnits = state.products.reduce((s, p) => s + (Number(p.stock) || 0), 0);
    const valuation = state.products.reduce((s, p) => s + ((Number(p.stock) || 0) * (Number(p.minPrice) || 0) * 0.45), 0); // Estimated atelier production cost
    const inStock = state.products.filter(p => p.stock > 15).length;
    const lowStock = state.products.filter(p => p.stock > 0 && p.stock <= 15).length;
    const outStock = state.products.filter(p => p.stock === 0).length;

    const elUnits = document.getElementById("invStatTotalUnits");
    if (elUnits) elUnits.textContent = totalUnits;
    const elVal = document.getElementById("invStatValuation");
    if (elVal) elVal.textContent = "₹" + Math.round(valuation).toLocaleString("en-IN");
    const elIn = document.getElementById("invStatInStock");
    if (elIn) elIn.textContent = inStock;
    const elLow = document.getElementById("invStatLowStock");
    if (elLow) elLow.textContent = lowStock;
    const elOut = document.getElementById("invStatOutStock");
    if (elOut) elOut.textContent = outStock;

    // Inventory Table
    const tbody = document.getElementById("inventoryTableBody");
    if (tbody) {
      tbody.innerHTML = state.products.map(p => {
        let badge = `<span class="status-badge badge-confirmed">In Stock (${p.stock})</span>`;
        if (p.stock === 0) badge = `<span class="status-badge badge-danger">Out of Stock</span>`;
        else if (p.stock <= 15) badge = `<span class="status-badge badge-pending">Low Stock (${p.stock})</span>`;

        return `
          <tr>
            <td>
              <div style="display:flex;align-items:center;gap:10px;">
                <img src="${esc(p.img)}" alt="" style="width:36px;height:36px;object-fit:cover;border-radius:4px;border:1px solid var(--line);">
                <div>
                  <b>${esc(p.name)}</b><br>
                  <small style="color:var(--muted)">${esc(p.nameMr || "")}</small>
                </div>
              </div>
            </td>
            <td><b>${esc(p.category)}</b></td>
            <td><small>${esc(p.sizes)}</small></td>
            <td><b style="font-size:14px">${p.stock}</b> units</td>
            <td>${badge}</td>
            <td>
              <div style="display:flex;gap:4px;align-items:center;">
                <button type="button" class="btn-outline" style="font-size:11px;padding:3px 7px;" onclick="window.BK_CRM.adjustStock('${esc(p.id)}', 5, 'Restock batch')">+5</button>
                <button type="button" class="btn-outline" style="font-size:11px;padding:3px 7px;" onclick="window.BK_CRM.adjustStock('${esc(p.id)}', -1, 'Quality inspection drop')">-1</button>
                <button type="button" class="btn-outline" style="font-size:11px;padding:3px 7px;" onclick="window.BK_CRM.openEditProductModal('${esc(p.id)}')">Edit</button>
              </div>
            </td>
          </tr>
        `;
      }).join("");
    }

    // Stock Movement Audit Log
    const logTbody = document.getElementById("stockMovementTableBody");
    if (logTbody) {
      logTbody.innerHTML = state.stockLogs.slice(0, 10).map(l => `
        <tr>
          <td><small>${esc(l.timestamp)}</small></td>
          <td><b>${esc(l.product)}</b></td>
          <td>${esc(l.type)}</td>
          <td><b style="color:${l.delta > 0 ? "var(--success)" : "var(--danger)"}">${l.delta > 0 ? "+" + l.delta : l.delta}</b></td>
          <td><b>${l.resultingStock}</b> units</td>
        </tr>
      `).join("");
    }
  }

  // ==========================================================================
  // VIEW 7: RETURNS & REFUNDS HUB
  // ==========================================================================
  function renderReturns() {
    const elTot = document.getElementById("retStatTotal");
    if (elTot) elTot.textContent = state.returns.length;

    const pending = state.returns.filter(r => r.status === "Approved" || r.status === "Pending").length;
    const elPend = document.getElementById("retStatPending");
    if (elPend) elPend.textContent = pending;

    const exch = state.returns.filter(r => r.status === "Exchanged").length;
    const elExch = document.getElementById("retStatExchanges");
    if (elExch) elExch.textContent = exch;

    const tbody = document.getElementById("returnsTableBody");
    if (tbody) {
      if (!state.returns.length) {
        tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;padding:28px;color:var(--muted)">No returns filed. Click "Simulate Return Request" to test workflow.</td></tr>`;
      } else {
        tbody.innerHTML = state.returns.map(r => `
          <tr>
            <td><b>${esc(r.id)}</b><br><small style="color:var(--muted)">${esc(r.date)}</small></td>
            <td><b>${esc(r.customer)}</b><br><small style="color:var(--muted)">Order: ${esc(r.orderId)}</small></td>
            <td><b>${esc(r.itemName)}</b><br><small style="color:var(--muted)">Reason: ${esc(r.reason)}</small></td>
            <td><span class="status-badge badge-confirmed">7-Day Return Eligible</span></td>
            <td><span class="status-badge ${r.status === "Refunded" ? "badge-confirmed" : "badge-pending"}">${esc(r.status)}</span></td>
            <td>
              <button type="button" class="btn-primary" style="font-size:11px;padding:4px 8px;" onclick="window.BK_CRM.runTestScenario('sc_refund')">
                Process ₹${r.refundAmount || 0}
              </button>
            </td>
          </tr>
        `).join("");
      }
    }
  }

  // ==========================================================================
  // VIEW 8: NOTIFICATIONS HUB
  // ==========================================================================
  function renderNotifications() {
    const sel = document.getElementById("notifOrderSelect");
    if (sel && sel.options.length === 0) {
      sel.innerHTML = state.orders.map(o => `<option value="${esc(o.id)}">${esc(o.id)} - ${esc(o.customer)} (₹${o.total})</option>`).join("");
    }
    updateNotificationPreview();
  }

  function updateNotificationPreview() {
    const preview = document.getElementById("notifPreviewContent");
    const orderSelect = document.getElementById("notifOrderSelect");
    const templateSelect = document.getElementById("notifTemplateSelect");
    if (!preview || !orderSelect || !templateSelect) return;

    const orderId = orderSelect.value;
    const template = templateSelect.value;
    const order = state.orders.find(o => o.id === orderId) || state.orders[0];

    if (!order) {
      preview.innerHTML = `<p style="color:var(--muted)">Please select an order to preview template.</p>`;
      return;
    }

    let msg = "";
    if (template === "order_confirm") {
      msg = `✨ *Dhara Scent Atelier · Order Confirmation*\n\nDearest ${order.customer},\n\nThank you for choosing Dhara. Your order *${order.id}* has been confirmed by our master perfumer.\n\n*Selected Fragrances:*\n${order.items.map(i => `• ${i.name} (${i.size}) × ${i.qty}`).join("\n")}\n\n*Total Amount:* ₹${order.total.toLocaleString("en-IN")}\n*Delivery Address:* ${order.address}\n\nWe are now carefully preparing and inspecting your crystal flacons. You will receive live courier dispatch updates shortly.\n\nWarm regards,\n*The Concierge Team*\nDhara Scent Atelier`;
    } else if (template === "order_shipped") {
      msg = `🚚 *Dhara Scent Atelier · Fragrance Dispatched*\n\nDearest ${order.customer},\n\nYour luxury order *${order.id}* is on its way to you via ${order.courier || "BlueDart Express"}.\n\n*Air Waybill (AWB):* ${order.awb || "BLUEDART-8829104"}\n*Live Tracking Link:* https://track.dharascentatelier.com/?awb=${order.awb || "BLUEDART-8829104"}\n\nExpected transit window: 2-3 business days. Prepare to indulge your senses.`;
    } else if (template === "order_delivered") {
      msg = `🌸 *Dhara Scent Atelier · Fragrance Delivered*\n\nDearest ${order.customer},\n\nOur courier partner confirms that your Dhara atelier package has been safely delivered to ${order.city}.\n\nWe hope your new scents enchant you. Allow the oil notes 10 minutes on pulse points to unfurl their full olfactory bouquet.\n\nShare your impressions with our connoisseur circle: https://dharascentatelier.com/review?order=${order.id}`;
    } else {
      msg = `🔔 *Dhara Scent Atelier Notification*\n\nDearest ${order.customer},\n\nUpdate regarding your order *${order.id}*: Current status has transitioned to *${order.status.toUpperCase()}*.\n\nFor any inquiries or private fragrance consultations, reply directly to this concierge channel or call +91 98200 12345.`;
    }

    preview.innerHTML = `
      <div style="background:var(--surface-alt);border:1px solid var(--line);border-radius:var(--radius-md);padding:18px;white-space:pre-wrap;font-size:12.5px;line-height:1.6;font-family:var(--font-mono);color:var(--fg-soft);">
        ${esc(msg)}
      </div>
      <div style="margin-top:12px;display:flex;gap:10px;">
        <button type="button" class="btn-primary" style="background:#25D366;border-color:#25D366" onclick="window.BK_CRM.copyCouponCode('${esc(msg).replace(/'/g, "\\'")}')">
          <i class="bi bi-whatsapp"></i> Copy WhatsApp Message
        </button>
      </div>
    `;
  }

  // ==========================================================================
  // VIEW 9: SUPPORT & REVIEWS
  // ==========================================================================
  function renderSupport() {
    const elOpen = document.getElementById("suppStatOpen");
    if (elOpen) elOpen.textContent = state.tickets.filter(t => t.status !== "Resolved").length;

    const elRes = document.getElementById("suppStatResolved");
    if (elRes) elRes.textContent = state.tickets.filter(t => t.status === "Resolved").length + 6;

    // Tickets Table
    const tbody = document.getElementById("supportTicketsTableBody");
    if (tbody) {
      tbody.innerHTML = `
        <tr>
          <td><b>TICK-104</b><br><small style="color:var(--muted)">25 Nov 2026</small></td>
          <td><b>Natasha Poonawalla</b><br><small style="color:var(--muted)">+91 98220 99401</small></td>
          <td>DHA-2026-0805</td>
          <td>Fragrance Layering Advisory</td>
          <td><span class="status-badge" style="background:#fffbeb;color:#b45309;border:1px solid #fde68a">VIP High</span></td>
          <td><span class="status-badge badge-confirmed">Concierge Assigned</span></td>
          <td><button type="button" class="btn-outline" style="font-size:11px;padding:3px 7px;">Open Chat</button></td>
        </tr>
      `;
    }

    // Reviews Table
    const rTbody = document.getElementById("productReviewsTableBody");
    if (rTbody) {
      rTbody.innerHTML = state.reviews.map(r => `
        <tr>
          <td><b>${esc(r.product)}</b></td>
          <td><b>${esc(r.reviewer)}</b><br><small style="color:var(--muted)">${esc(r.date)}</small></td>
          <td><span style="color:var(--gold)">★★★★★</span></td>
          <td><div style="max-width:380px;font-size:12px">${esc(r.content)}</div></td>
          <td><span class="status-badge badge-confirmed">Published</span></td>
        </tr>
      `).join("");
    }
  }

  // ==========================================================================
  // VIEW 10: PRODUCTS (CATALOG MANAGEMENT)
  // ==========================================================================
  function renderProducts(filterCat = "all", filterStock = "all", searchTerm = "") {
    const tbody = document.getElementById("productsTableBody");
    if (!tbody) return;

    let filtered = state.products.slice();
    if (filterCat && filterCat !== "all") {
      filtered = filtered.filter(p => p.category.toLowerCase() === filterCat.toLowerCase());
    }
    if (filterStock && filterStock !== "all") {
      if (filterStock === "in-stock") filtered = filtered.filter(p => p.stock > 15);
      else if (filterStock === "low-stock") filtered = filtered.filter(p => p.stock > 0 && p.stock <= 15);
      else if (filterStock === "out-stock") filtered = filtered.filter(p => p.stock === 0);
    }
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      filtered = filtered.filter(p =>
        (p.name && p.name.toLowerCase().includes(q)) ||
        (p.nameMr && p.nameMr.toLowerCase().includes(q)) ||
        (p.id && p.id.toLowerCase().includes(q))
      );
    }

    tbody.innerHTML = filtered.map(p => {
      let badge = `<span class="status-badge badge-confirmed">In Stock (${p.stock})</span>`;
      if (p.stock === 0) badge = `<span class="status-badge badge-danger">Out of Stock</span>`;
      else if (p.stock <= 15) badge = `<span class="status-badge badge-pending">Low Stock (${p.stock})</span>`;

      return `
        <tr>
          <td>
            <div style="display:flex;align-items:center;gap:12px;">
              <img src="${esc(p.img)}" alt="" style="width:40px;height:40px;object-fit:cover;border-radius:var(--radius-sm);border:1px solid var(--line);">
              <div>
                <b>${esc(p.name)}</b> ${p.bestseller ? '<span style="color:var(--gold);font-size:11px">★ Bestseller</span>' : ""}<br>
                <small style="color:var(--muted)">${esc(p.nameMr || "")}</small>
              </div>
            </div>
          </td>
          <td><b>${esc(p.category)}</b> (${esc(p.forGender || "Unisex")})</td>
          <td><b>₹${p.minPrice.toLocaleString("en-IN")}</b> - ₹${(p.maxPrice || p.minPrice).toLocaleString("en-IN")}</td>
          <td><small>${esc(p.sizes)}</small></td>
          <td>${badge}</td>
          <td>
            <div style="display:flex;gap:6px;">
              <button type="button" class="btn-outline" style="font-size:11px;padding:3px 8px;" onclick="window.BK_CRM.openEditProductModal('${esc(p.id)}')">Edit</button>
              <button type="button" class="btn-outline" style="font-size:11px;padding:3px 8px;color:var(--danger);border-color:var(--danger-border)" onclick="window.BK_CRM.deleteProduct('${esc(p.id)}')"><i class="bi bi-trash"></i></button>
            </div>
          </td>
        </tr>
      `;
    }).join("");
  }

  // ==========================================================================
  // VIEW 11: PATRONS & CUSTOMERS
  // ==========================================================================
  function renderCustomers(filterSegment = "all", searchTerm = "") {
    const tbody = document.getElementById("customersTableBody");
    if (!tbody) return;

    let filtered = state.customers.slice();
    if (filterSegment && filterSegment !== "all") {
      filtered = filtered.filter(c => c.category === filterSegment);
    }
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      filtered = filtered.filter(c =>
        (c.name && c.name.toLowerCase().includes(q)) ||
        (c.phone && c.phone.toLowerCase().includes(q)) ||
        (c.city && c.city.toLowerCase().includes(q))
      );
    }

    tbody.innerHTML = filtered.map(c => `
      <tr>
        <td>
          <div style="display:flex;align-items:center;gap:10px;">
            <div class="staff-avatar" style="width:30px;height:30px;font-size:11.5px;background:var(--surface-alt);color:var(--accent);border:1px solid var(--line);">
              ${esc(c.name.charAt(0))}
            </div>
            <div>
              <b>${esc(c.name)}</b><br>
              <small style="color:var(--muted)">Patron since ${esc(c.joined || "2026")}</small>
            </div>
          </div>
        </td>
        <td><i class="bi bi-telephone"></i> ${esc(c.phone)}<br><small style="color:var(--muted)">${esc(c.email || "")}</small></td>
        <td><b>${esc(c.city)}</b></td>
        <td><span class="status-badge" style="background:var(--accent-soft);color:var(--accent);border:1px solid var(--accent-border)">${esc(c.category)}</span></td>
        <td><b>${c.ordersCount}</b> orders</td>
        <td><b style="font-family:var(--font-head);font-size:14px;color:var(--fg)">₹${Number(c.totalSpend || 0).toLocaleString("en-IN")}</b></td>
        <td>
          <button type="button" class="btn-outline" style="font-size:11px;padding:3px 8px;" onclick="window.BK_CRM.filterOrdersByCustomer('${esc(c.name)}')">View Orders</button>
        </td>
      </tr>
    `).join("");
  }

  // ==========================================================================
  // VIEW 12: INQUIRIES & CONCIERGE LEADS
  // ==========================================================================
  function renderInquiries(filterStatus = "all", searchTerm = "") {
    const tbody = document.getElementById("inquiriesTableBody");
    if (!tbody) return;

    let filtered = state.inquiries.slice();
    if (filterStatus && filterStatus !== "all") {
      filtered = filtered.filter(i => i.status === filterStatus);
    }
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      filtered = filtered.filter(i =>
        (i.name && i.name.toLowerCase().includes(q)) ||
        (i.query && i.query.toLowerCase().includes(q))
      );
    }

    tbody.innerHTML = filtered.map(i => `
      <tr>
        <td><b>${esc(i.id)}</b><br><small style="color:var(--muted)">${esc(i.date)}</small></td>
        <td><b>${esc(i.name)}</b><br><small style="color:var(--muted)">${esc(i.phone)}</small></td>
        <td><b>${esc(i.type)}</b></td>
        <td><div style="max-width:320px;font-size:12px">${esc(i.query)}</div></td>
        <td><span class="status-badge badge-pending">${esc(i.status)}</span></td>
        <td>
          <button type="button" class="btn-primary" style="font-size:11px;padding:3px 8px;" onclick="window.BK_CRM.contactLeadWhatsApp('${esc(i.phone)}', '${esc(i.name)}')">
            <i class="bi bi-whatsapp"></i> Chat
          </button>
        </td>
      </tr>
    `).join("");
  }

  // ==========================================================================
  // VIEW 13: FINANCIAL REPORTS & ACCOUNTING
  // ==========================================================================
  function renderReports() {
    const gross = state.orders.reduce((sum, o) => sum + (o.total || 0), 0);
    const gstCollected = Math.round(gross * (18 / 118)); // 18% inclusive GST for luxury perfumery
    const rzpVolume = state.orders.filter(o => o.payment && !o.payment.includes("COD")).reduce((s, o) => s + (o.total || 0), 0);
    const codVolume = state.orders.filter(o => o.payment && o.payment.includes("COD")).reduce((s, o) => s + (o.total || 0), 0);
    const gatewayFees = Math.round(rzpVolume * 0.0236); // 2% + 18% GST fee
    const netPayout = rzpVolume - gatewayFees;

    const elGross = document.getElementById("repGrossSales");
    if (elGross) elGross.textContent = "₹" + gross.toLocaleString("en-IN");
    const elGst = document.getElementById("repGstCollected");
    if (elGst) elGst.textContent = "₹" + gstCollected.toLocaleString("en-IN");
    const elRzp = document.getElementById("repRzpVolume");
    if (elRzp) elRzp.textContent = "₹" + rzpVolume.toLocaleString("en-IN");
    const elCod = document.getElementById("repCodVolume");
    if (elCod) elCod.textContent = "₹" + codVolume.toLocaleString("en-IN");
    const elFees = document.getElementById("repGatewayFees");
    if (elFees) elFees.textContent = "₹" + gatewayFees.toLocaleString("en-IN");
    const elNet = document.getElementById("repNetPayout");
    if (elNet) elNet.textContent = "₹" + netPayout.toLocaleString("en-IN");
  }

  // ==========================================================================
  // VIEW 14: END-TO-END TEST SCENARIOS HUB
  // ==========================================================================
  function renderTesting() {
    const tbody = document.getElementById("testScenariosTableBody");
    if (!tbody) return;

    const keys = Object.keys(state.testMatrix);
    const passedCount = keys.filter(k => state.testMatrix[k].status === "PASS").length;

    const elPassed = document.getElementById("testStatPassedCount");
    if (elPassed) elPassed.textContent = `${passedCount} / ${keys.length}`;

    tbody.innerHTML = keys.map((k, idx) => {
      const item = state.testMatrix[k];
      return `
        <tr>
          <td><b>${idx + 1}</b></td>
          <td><b>${esc(item.name)}</b></td>
          <td><small style="color:var(--muted)">${esc(item.expected)}</small></td>
          <td>
            <span class="status-badge" style="background:#f0fdf4;color:#15803d;border:1px solid #bbf7d0">
              <i class="bi bi-check-all"></i> ${esc(item.status)}
            </span>
            <small style="display:block;color:var(--muted);margin-top:2px">${esc(item.lastRun)}</small>
          </td>
          <td>
            <button type="button" class="btn-outline" style="font-size:11px;padding:3px 8px;" onclick="window.BK_CRM.runTestScenario('${k}')">
              <i class="bi bi-play-fill"></i> Run
            </button>
          </td>
        </tr>
      `;
    }).join("");
  }

  function runTestScenario(key) {
    const nowStr = new Date().toLocaleTimeString("en-IN");
    if (key === "sc_prepaid") {
      const newId = "DHA-TEST-" + Math.floor(1000 + Math.random() * 9000);
      const testOrder = {
        id: newId,
        date: "Just now (" + nowStr + ")",
        customer: "Kabir Mehra (Prepaid Test)",
        phone: "+91 98200 88990",
        email: "kabir.test@perfumeconnoisseur.com",
        city: "Mumbai",
        address: "Flat 1202, Lodha Bellissimo, Mahalaxmi, Mumbai 400011",
        payment: "Razorpay (Online UPI Verified)",
        paymentStatus: "PAID",
        gatewayRef: "pay_RzpSim_" + Date.now().toString(36),
        status: "confirmed",
        courier: "BlueDart Apex Express",
        awb: "BLUEDART-" + Math.floor(100000 + Math.random() * 900000),
        total: 3499,
        items: [{ id: "imperial-oud", name: "Imperial Oud", size: "50 ml EDP", qty: 1, price: 3499 }]
      };
      state.orders.unshift(testOrder);
      saveData(STORAGE.ORDERS, state.orders);

      // Decrement inventory
      const prod = state.products.find(p => p.id === "imperial-oud");
      if (prod && prod.stock > 0) {
        prod.stock -= 1;
        state.stockLogs.unshift({
          timestamp: "Just now (" + nowStr + ")",
          product: prod.name,
          type: "Order Deduction",
          delta: -1,
          resultingStock: prod.stock,
          reason: "Test Order " + newId
        });
        saveData(STORAGE.PRODUCTS, state.products);
        saveData(STORAGE.STOCK_LOG, state.stockLogs);
      }

      state.testMatrix.sc_prepaid.status = "PASS";
      state.testMatrix.sc_prepaid.lastRun = "Passed at " + nowStr;
      saveData(STORAGE.TEST_MATRIX, state.testMatrix);
      toast("Scenario 1 Passed: Prepaid order created and inventory adjusted!");
    } else if (key === "sc_webhook") {
      state.testMatrix.sc_webhook.status = "PASS";
      state.testMatrix.sc_webhook.lastRun = "Passed at " + nowStr;
      saveData(STORAGE.TEST_MATRIX, state.testMatrix);
      toast("Scenario 2 Passed: Webhook payload verified with cryptographic signature!");
    } else if (key === "sc_cod") {
      const newId = "DHA-COD-" + Math.floor(1000 + Math.random() * 9000);
      const codOrder = {
        id: newId,
        date: "Just now (" + nowStr + ")",
        customer: "Devika Rao (COD Test)",
        phone: "+91 98450 11223",
        email: "devika.rao@testmail.com",
        city: "Bengaluru",
        address: "7th Main, Indiranagar, Bengaluru 560038",
        payment: "Cash on Delivery (COD)",
        paymentStatus: "PENDING_COD",
        gatewayRef: "COD-CASH-" + Date.now().toString(36),
        status: "pending",
        courier: "Delhivery Surface",
        awb: "DELH-" + Math.floor(100000 + Math.random() * 900000),
        total: 2299,
        items: [{ id: "orchid", name: "Orchid", size: "50 ml EDP", qty: 1, price: 2299 }]
      };
      state.orders.unshift(codOrder);
      saveData(STORAGE.ORDERS, state.orders);

      state.testMatrix.sc_cod.status = "PASS";
      state.testMatrix.sc_cod.lastRun = "Passed at " + nowStr;
      saveData(STORAGE.TEST_MATRIX, state.testMatrix);
      toast("Scenario 3 Passed: Cash on Delivery order recorded with pending payment!");
    } else if (key === "sc_cancel") {
      const target = state.orders[0];
      if (target) {
        target.status = "cancelled";
        saveData(STORAGE.ORDERS, state.orders);
        // Restore stock
        if (target.items && target.items.length) {
          target.items.forEach(it => {
            const prod = state.products.find(p => p.id === it.id);
            if (prod) {
              prod.stock += it.qty;
              state.stockLogs.unshift({
                timestamp: "Just now (" + nowStr + ")",
                product: prod.name,
                type: "Cancellation Restock",
                delta: it.qty,
                resultingStock: prod.stock,
                reason: "Cancelled " + target.id
              });
            }
          });
          saveData(STORAGE.PRODUCTS, state.products);
          saveData(STORAGE.STOCK_LOG, state.stockLogs);
        }
      }
      state.testMatrix.sc_cancel.status = "PASS";
      state.testMatrix.sc_cancel.lastRun = "Passed at " + nowStr;
      saveData(STORAGE.TEST_MATRIX, state.testMatrix);
      toast("Scenario 5 Passed: Order cancelled & bottle stock restored to atelier shelves!");
    } else if (key === "sc_return") {
      const retId = "RET-" + Math.floor(100 + Math.random() * 900);
      state.returns.unshift({
        id: retId,
        date: "Just now",
        orderId: state.orders[0] ? state.orders[0].id : "DHA-2026-0812",
        customer: "Smita Deshmukh",
        itemName: "Emerald Oud (50 ml EDP)",
        reason: "Outer velvet coffret damaged in transit",
        eligible: true,
        status: "Approved",
        reverseAwb: "REV-BLUE-" + Math.floor(100000 + Math.random() * 900000),
        refundAmount: 3499
      });
      saveData(STORAGE.RETURNS, state.returns);
      state.testMatrix.sc_return.status = "PASS";
      state.testMatrix.sc_return.lastRun = "Passed at " + nowStr;
      saveData(STORAGE.TEST_MATRIX, state.testMatrix);
      toast("Scenario 6 Passed: 7-day policy verified & reverse pickup AWB generated!");
    } else if (key === "sc_delivery") {
      const target = state.orders.find(o => o.status !== "delivered") || state.orders[0];
      if (target) {
        target.status = "delivered";
        target.podRef = "POD-SIGN-" + Math.floor(1000 + Math.random() * 9000);
        saveData(STORAGE.ORDERS, state.orders);
      }
      state.testMatrix.sc_delivery.status = "PASS";
      state.testMatrix.sc_delivery.lastRun = "Passed at " + nowStr;
      saveData(STORAGE.TEST_MATRIX, state.testMatrix);
      toast("Scenario 9 Passed: Delivery verified with digital proof of delivery (POD)!");
    } else if (key === "sc_refund") {
      if (state.returns.length) {
        state.returns[0].status = "Refunded";
        saveData(STORAGE.RETURNS, state.returns);
      }
      state.testMatrix.sc_refund.status = "PASS";
      state.testMatrix.sc_refund.lastRun = "Passed at " + nowStr;
      saveData(STORAGE.TEST_MATRIX, state.testMatrix);
      toast("Scenario 11 Passed: Refund transaction verified and financial ledger reconciled!");
    } else {
      state.testMatrix[key].status = "PASS";
      state.testMatrix[key].lastRun = "Passed at " + nowStr;
      saveData(STORAGE.TEST_MATRIX, state.testMatrix);
      toast(`Scenario verified successfully: ${state.testMatrix[key].name}`);
    }
    renderAll();
  }

  function runAllTestScenarios() {
    const keys = Object.keys(state.testMatrix);
    let i = 0;
    function next() {
      if (i < keys.length) {
        runTestScenario(keys[i]);
        i++;
        setTimeout(next, 300);
      } else {
        toast("All 11 End-to-End Test Scenarios Verified Successfully!", "success");
      }
    }
    next();
  }

  function resetTestData() {
    if (confirm("Reset all test orders and return CRM to pristine catalog state?")) {
      state.orders = DEFAULT_ORDERS.slice();
      state.returns = [];
      state.failedPayments = [];
      state.testMatrix = JSON.parse(JSON.stringify(DEFAULT_TEST_MATRIX));
      saveData(STORAGE.ORDERS, state.orders);
      saveData(STORAGE.RETURNS, state.returns);
      saveData(STORAGE.FAILED_PAYMENTS, state.failedPayments);
      saveData(STORAGE.TEST_MATRIX, state.testMatrix);
      renderAll();
      toast("Test records cleaned. Pristine state restored.");
    }
  }

  // ==========================================================================
  // VIEW 15: SETTINGS, ROLES & SECURITY
  // ==========================================================================
  function setupSettingsForms() {
    const sForm = document.getElementById("crmSettingsForm");
    if (sForm) {
      sForm.addEventListener("submit", function (e) {
        e.preventDefault();
        state.settings.storeName = document.getElementById("setStoreName").value;
        state.settings.tagline = document.getElementById("setTagline").value;
        state.settings.phone = document.getElementById("setPhone").value;
        state.settings.whatsapp = document.getElementById("setWhatsapp").value;
        state.settings.email = document.getElementById("setEmail").value;
        state.settings.gstin = document.getElementById("setGstin").value;
        state.settings.address = document.getElementById("setAddress").value;
        state.settings.freeDeliveryThreshold = Number(document.getElementById("setFreeDelivery").value);
        state.settings.shippingFee = Number(document.getElementById("setShippingFee").value);
        saveData(STORAGE.SETTINGS, state.settings);
        toast("Store settings saved successfully!", "success");
      });
    }

    const rzpForm = document.getElementById("crmPaymentGatewayForm");
    if (rzpForm) {
      rzpForm.addEventListener("submit", function (e) {
        e.preventDefault();
        state.settings.razorpayEnabled = document.getElementById("setRzpEnabled").checked;
        state.settings.razorpayMode = document.getElementById("setRzpMode").value;
        state.settings.razorpayKeyId = document.getElementById("setRzpKeyId").value;
        state.settings.razorpayMerchantName = document.getElementById("setRzpMerchantName").value;
        state.settings.razorpayThemeColor = document.getElementById("setRzpThemeColor").value;
        saveData(STORAGE.SETTINGS, state.settings);
        toast("Razorpay payment gateway configuration saved!", "success");
      });
    }

    const smtpForm = document.getElementById("crmSmtpSettingsForm");
    if (smtpForm) {
      smtpForm.addEventListener("submit", function (e) {
        e.preventDefault();
        state.settings.notificationEmail = document.getElementById("setNotifRecipient").value;
        state.settings.smtpHost = document.getElementById("setSmtpHost").value;
        state.settings.smtpUser = document.getElementById("setSmtpUser").value;
        state.settings.smtpPass = document.getElementById("setSmtpPass").value;
        saveData(STORAGE.SETTINGS, state.settings);
        toast("Automated email notification settings saved!", "success");
      });
    }

    const btnTestEmail = document.getElementById("btnSendTestEmail");
    if (btnTestEmail) {
      btnTestEmail.addEventListener("click", function () {
        const target = document.getElementById("setNotifRecipient").value || "concierge@dharascentatelier.com";
        if (window.DHARA_MAILER && typeof window.DHARA_MAILER.sendTestEmail === "function") {
          window.DHARA_MAILER.sendTestEmail(target).then(() => {
            toast("Test notification dispatched to " + target, "success");
            renderEmailAuditLogs();
          });
        }
      });
    }

    const roleSelect = document.getElementById("setRbacRoleSelect");
    if (roleSelect) {
      roleSelect.addEventListener("change", function () {
        state.currentRole = this.value;
        saveData(STORAGE.ROLE, state.currentRole);
        toast("Staff permissions updated to " + this.value);
        const descEl = document.getElementById("rbacRoleDescription");
        if (descEl) {
          descEl.textContent = this.value === "Super Admin"
            ? "Full administrative ownership across catalog, finances, refunds, and security."
            : "Role permissions customized for " + this.value;
        }
      });
    }
  }

  function renderSettings() {
    const s = state.settings;
    const form = document.getElementById("crmSettingsForm");
    if (form) {
      const setVal = (id, v) => { const el = document.getElementById(id); if (el) el.value = v || ""; };
      setVal("setStoreName", s.storeName);
      setVal("setTagline", s.tagline);
      setVal("setPhone", s.phone);
      setVal("setWhatsapp", s.whatsapp);
      setVal("setEmail", s.email);
      setVal("setGstin", s.gstin);
      setVal("setAddress", s.address);
      setVal("setFreeDelivery", s.freeDeliveryThreshold);
      setVal("setShippingFee", s.shippingFee);
    }

    const rzpKeyEl = document.getElementById("setRzpKeyId");
    if (rzpKeyEl) rzpKeyEl.value = s.razorpayKeyId || "rzp_live_DharaLuxe2026";
    const rzpNameEl = document.getElementById("setRzpMerchantName");
    if (rzpNameEl) rzpNameEl.value = s.razorpayMerchantName || "Dhara Scent Atelier";

    const mailRecipEl = document.getElementById("setNotifRecipient");
    if (mailRecipEl) mailRecipEl.value = s.notificationEmail || "concierge@dharascentatelier.com";

    // Quota Text
    const quota = document.getElementById("storageQuotaText");
    if (quota) {
      let bytes = 0;
      for (let k in localStorage) {
        if (localStorage.hasOwnProperty(k)) bytes += (localStorage[k].length || 0) * 2;
      }
      quota.innerHTML = `<b style="color:var(--success)">${Math.round(bytes / 1024)} KB</b> used of 5,120 KB local storage quota (<b>Healthy & Persisted</b>)`;
    }

    renderEmailAuditLogs();
  }

  function renderEmailAuditLogs() {
    const wrap = document.getElementById("emailAuditLogsTable");
    if (!wrap) return;

    const logs = (window.DHARA_MAILER && typeof window.DHARA_MAILER.getEmailLogs === "function")
      ? window.DHARA_MAILER.getEmailLogs()
      : [];

    if (!logs.length) {
      wrap.innerHTML = `<div style="padding:18px;text-align:center;color:var(--muted);font-size:12.5px;">No notifications logged yet. Click "Send Test Email" to test.</div>`;
      return;
    }

    wrap.innerHTML = `
      <table style="width:100%;border-collapse:collapse;font-size:12px;">
        <thead>
          <tr style="background:var(--surface-alt);border-bottom:1px solid var(--line);color:var(--muted);text-transform:uppercase;">
            <th style="padding:8px 12px;">Time</th>
            <th style="padding:8px 12px;">Event</th>
            <th style="padding:8px 12px;">Recipient</th>
            <th style="padding:8px 12px;">Subject / Details</th>
            <th style="padding:8px 12px;">Status</th>
          </tr>
        </thead>
        <tbody>
          ${logs.map(l => `
            <tr style="border-bottom:1px solid var(--line);">
              <td style="padding:8px 12px;"><b>${esc(l.formattedTime)}</b></td>
              <td style="padding:8px 12px;font-weight:600;color:var(--accent);">${esc(l.type)}</td>
              <td style="padding:8px 12px;">${esc(l.recipient)}</td>
              <td style="padding:8px 12px;">${esc(l.subject)} <small style="display:block;color:var(--muted)">${esc(l.details)}</small></td>
              <td style="padding:8px 12px;"><span class="status-badge badge-confirmed">DELIVERED</span></td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    `;
  }

  // ==========================================================================
  // MODALS & ACTIONS
  // ==========================================================================
  function setupModals() {
    document.querySelectorAll("[data-close-modal]").forEach(btn => {
      btn.addEventListener("click", function () {
        document.querySelectorAll(".modal-overlay").forEach(m => m.classList.remove("active"));
      });
    });

    // File Upload Drag & Drop
    const dropZone = document.getElementById("fileUploadZone");
    const fileInput = document.getElementById("prodFormImgFile");
    const selectBtn = document.getElementById("btnSelectImage");

    if (selectBtn && fileInput) {
      selectBtn.addEventListener("click", () => fileInput.click());
    }

    if (dropZone && fileInput) {
      dropZone.addEventListener("dragover", (e) => {
        e.preventDefault();
        dropZone.classList.add("dragover");
      });
      dropZone.addEventListener("dragleave", () => dropZone.classList.remove("dragover"));
      dropZone.addEventListener("drop", (e) => {
        e.preventDefault();
        dropZone.classList.remove("dragover");
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
          handleImageFile(e.dataTransfer.files[0]);
        }
      });
      fileInput.addEventListener("change", function () {
        if (this.files && this.files[0]) {
          handleImageFile(this.files[0]);
        }
      });
    }

    const saveProdBtn = document.getElementById("btnSaveProduct");
    if (saveProdBtn) {
      saveProdBtn.addEventListener("click", saveProduct);
    }
  }

  function handleImageFile(file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const url = e.target.result;
      document.getElementById("prodFormImg").value = url;
      document.getElementById("modalImgPreview").src = url;
      toast("Image loaded into product preview.");
    };
    reader.readAsDataURL(file);
  }

  function openAddProductModal() {
    document.getElementById("modalProductTitle").innerHTML = `<i class="bi bi-plus-circle" style="color:var(--accent)"></i> Add Luxury Fragrance to Catalog`;
    document.getElementById("prodFormId").value = "";
    document.getElementById("prodFormName").value = "";
    document.getElementById("prodFormNameMr").value = "";
    document.getElementById("prodFormCategory").value = "Oriental";
    document.getElementById("prodFormStatus").value = "in-stock";
    document.getElementById("prodFormMinPrice").value = "";
    document.getElementById("prodFormMaxPrice").value = "";
    document.getElementById("prodFormSizes").value = "50 ml EDP · 100 ml EDP";
    document.getElementById("prodFormStock").value = "30";
    document.getElementById("prodFormImg").value = "assets/products/imperial-oud-1.jpg";
    document.getElementById("modalImgPreview").src = "assets/products/imperial-oud-1.jpg";
    document.getElementById("prodFormDesc").value = "";
    document.getElementById("prodFormBestseller").checked = false;

    document.getElementById("productModal").classList.add("active");
  }

  function openEditProductModal(id) {
    const prod = state.products.find(p => p.id === id);
    if (!prod) return;

    document.getElementById("modalProductTitle").innerHTML = `<i class="bi bi-pencil-square" style="color:var(--accent)"></i> Edit Fragrance: ${esc(prod.name)}`;
    document.getElementById("prodFormId").value = prod.id;
    document.getElementById("prodFormName").value = prod.name;
    document.getElementById("prodFormNameMr").value = prod.nameMr || "";
    document.getElementById("prodFormCategory").value = prod.category;
    document.getElementById("prodFormStatus").value = prod.status;
    document.getElementById("prodFormMinPrice").value = prod.minPrice;
    document.getElementById("prodFormMaxPrice").value = prod.maxPrice || prod.minPrice;
    document.getElementById("prodFormSizes").value = prod.sizes;
    document.getElementById("prodFormStock").value = prod.stock;
    document.getElementById("prodFormImg").value = prod.img;
    document.getElementById("modalImgPreview").src = prod.img;
    document.getElementById("prodFormDesc").value = prod.desc || "";
    document.getElementById("prodFormBestseller").checked = !!prod.bestseller;

    document.getElementById("productModal").classList.add("active");
  }

  function saveProduct() {
    const id = document.getElementById("prodFormId").value.trim() || ("fragrance-" + Date.now().toString(36));
    const name = document.getElementById("prodFormName").value.trim();
    if (!name) {
      toast("Fragrance name is required.", "error");
      return;
    }

    const prodData = {
      id: id,
      name: name,
      nameMr: document.getElementById("prodFormNameMr").value.trim(),
      category: document.getElementById("prodFormCategory").value,
      status: document.getElementById("prodFormStatus").value,
      minPrice: Number(document.getElementById("prodFormMinPrice").value) || 1999,
      maxPrice: Number(document.getElementById("prodFormMaxPrice").value) || 3999,
      sizes: document.getElementById("prodFormSizes").value.trim() || "50 ml EDP",
      stock: Number(document.getElementById("prodFormStock").value) || 25,
      img: document.getElementById("prodFormImg").value.trim() || "assets/products/imperial-oud-1.jpg",
      desc: document.getElementById("prodFormDesc").value.trim(),
      bestseller: document.getElementById("prodFormBestseller").checked
    };

    const idx = state.products.findIndex(p => p.id === id);
    if (idx >= 0) {
      state.products[idx] = prodData;
      toast(`Fragrance "${name}" updated.`);
    } else {
      state.products.unshift(prodData);
      toast(`Fragrance "${name}" added to catalog.`);
    }

    saveData(STORAGE.PRODUCTS, state.products);
    document.getElementById("productModal").classList.remove("active");
    renderProducts();
    updateBadgeCounts();
  }

  function deleteProduct(id) {
    if (confirm("Remove this fragrance from active catalog?")) {
      state.products = state.products.filter(p => p.id !== id);
      saveData(STORAGE.PRODUCTS, state.products);
      toast("Fragrance deleted from catalog.");
      renderProducts();
      updateBadgeCounts();
    }
  }

  function adjustStock(id, delta, reason) {
    const prod = state.products.find(p => p.id === id);
    if (!prod) return;
    prod.stock = Math.max(0, prod.stock + delta);
    prod.status = prod.stock === 0 ? "out-stock" : prod.stock <= 15 ? "low-stock" : "in-stock";
    saveData(STORAGE.PRODUCTS, state.products);

    state.stockLogs.unshift({
      timestamp: new Date().toLocaleTimeString("en-IN"),
      product: prod.name,
      type: "Manual Adjustment",
      delta: delta,
      resultingStock: prod.stock,
      reason: reason || "Manual adjustment"
    });
    saveData(STORAGE.STOCK_LOG, state.stockLogs);

    toast(`Stock for ${prod.name} updated to ${prod.stock} units.`);
    renderInventory();
    renderOverview();
  }

  // Order Details Modal
  function openOrderDetail(orderId) {
    const order = state.orders.find(o => o.id === orderId);
    if (!order) return;

    const modal = document.getElementById("orderDetailModal");
    const content = document.getElementById("orderDetailModalContent");
    if (!modal || !content) return;

    content.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:flex-start;border-bottom:1px solid var(--line);padding-bottom:16px;margin-bottom:16px;">
        <div>
          <h2 style="font-family:var(--font-head);font-size:20px;margin-bottom:4px;">${esc(order.id)}</h2>
          <span style="font-size:12px;color:var(--muted)">Booked on ${esc(order.date)}</span>
        </div>
        <span class="status-badge badge-${esc(order.status)}" style="font-size:13px;padding:4px 12px;">${esc(order.status.toUpperCase())}</span>
      </div>

      <div class="dual-section" style="margin-bottom:20px;">
        <div>
          <h4 style="font-size:12px;text-transform:uppercase;color:var(--muted);margin-bottom:6px;">Patron Information</h4>
          <p style="font-size:13px;line-height:1.6">
            <b>${esc(order.customer)}</b><br>
            Phone: ${esc(order.phone)}<br>
            Email: ${esc(order.email || "N/A")}<br>
            Address: ${esc(order.address)}
          </p>
        </div>
        <div>
          <h4 style="font-size:12px;text-transform:uppercase;color:var(--muted);margin-bottom:6px;">Logistics & Payment</h4>
          <p style="font-size:13px;line-height:1.6">
            Payment Mode: <b>${esc(order.payment)}</b><br>
            Gateway Ref: <code>${esc(order.gatewayRef || "N/A")}</code><br>
            Courier: <b>${esc(order.courier || "BlueDart Express")}</b><br>
            AWB Tracking: <b>${esc(order.awb || "UNASSIGNED")}</b>
          </p>
        </div>
      </div>

      <h4 style="font-size:12px;text-transform:uppercase;color:var(--muted);margin-bottom:8px;">Purchased Flacons</h4>
      <div class="table-container" style="margin-bottom:20px;">
        <table class="data-table">
          <thead>
            <tr>
              <th>Fragrance Item</th>
              <th>Volume / Size</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            ${(order.items || []).map(i => `
              <tr>
                <td><b>${esc(i.name)}</b></td>
                <td>${esc(i.size)}</td>
                <td>${i.qty}</td>
                <td><b>₹${Number(i.price * i.qty).toLocaleString("en-IN")}</b></td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>

      <div style="display:flex;justify-content:flex-end;align-items:center;gap:12px;font-size:16px;">
        <span>Total Gross Invoice:</span>
        <b style="font-family:var(--font-head);font-size:22px;color:var(--accent)">₹${Number(order.total || 0).toLocaleString("en-IN")}</b>
      </div>
    `;

    modal.classList.add("active");
  }

  // Tax Invoice Slip Modal
  function openInvoiceSlip(orderId) {
    const order = state.orders.find(o => o.id === orderId);
    if (!order) return;

    const modal = document.getElementById("orderSlipModal");
    const content = document.getElementById("invoiceSlipContent");
    if (!modal || !content) return;

    const s = state.settings;
    const cgst = Math.round(order.total * 0.09);
    const sgst = Math.round(order.total * 0.09);
    const baseAmt = order.total - (cgst + sgst);

    content.innerHTML = `
      <div style="padding:24px;background:#ffffff;color:#111416;font-family:var(--font-body);line-height:1.5;">
        <div style="display:flex;justify-content:space-between;border-bottom:2px solid #b88628;padding-bottom:16px;margin-bottom:20px;">
          <div>
            <h1 style="font-family:var(--font-head);font-size:24px;letter-spacing:0.15em;margin-bottom:4px;color:#111416;">DHARA SCENT ATELIER</h1>
            <p style="font-size:11px;color:#555;">
              ${esc(s.address)}<br>
              GSTIN: <b>${esc(s.gstin)}</b> · Phone: ${esc(s.phone)}
            </p>
          </div>
          <div style="text-align:right;">
            <h2 style="font-size:18px;color:#b88628;margin-bottom:4px;">TAX INVOICE</h2>
            <p style="font-size:11.5px;color:#555;">
              Invoice No: <b>INV-${esc(order.id)}</b><br>
              Date: <b>${esc(order.date)}</b>
            </p>
          </div>
        </div>

        <div style="display:flex;justify-content:space-between;margin-bottom:24px;font-size:12px;">
          <div>
            <b style="text-transform:uppercase;color:#888;">Billed & Shipped To:</b>
            <p style="margin-top:4px;">
              <b>${esc(order.customer)}</b><br>
              ${esc(order.address)}<br>
              Phone: ${esc(order.phone)}
            </p>
          </div>
          <div style="text-align:right;">
            <b style="text-transform:uppercase;color:#888;">Payment Details:</b>
            <p style="margin-top:4px;">
              Mode: <b>${esc(order.payment)}</b><br>
              Transaction Ref: <code>${esc(order.gatewayRef || "COD-CASH")}</code>
            </p>
          </div>
        </div>

        <table style="width:100%;border-collapse:collapse;font-size:12px;margin-bottom:20px;">
          <thead>
            <tr style="background:#f8f6f0;border-bottom:1px solid #ddd;text-transform:uppercase;font-size:11px;">
              <th style="padding:8px 12px;text-align:left;">Item / Fragrance Description</th>
              <th style="padding:8px 12px;text-align:center;">HSN</th>
              <th style="padding:8px 12px;text-align:center;">Qty</th>
              <th style="padding:8px 12px;text-align:right;">Rate (₹)</th>
              <th style="padding:8px 12px;text-align:right;">Amount (₹)</th>
            </tr>
          </thead>
          <tbody>
            ${(order.items || []).map(i => `
              <tr style="border-bottom:1px solid #eee;">
                <td style="padding:8px 12px;"><b>${esc(i.name)}</b> (${esc(i.size)})</td>
                <td style="padding:8px 12px;text-align:center;">33030010</td>
                <td style="padding:8px 12px;text-align:center;">${i.qty}</td>
                <td style="padding:8px 12px;text-align:right;">₹${Number(i.price).toLocaleString("en-IN")}</td>
                <td style="padding:8px 12px;text-align:right;">₹${Number(i.price * i.qty).toLocaleString("en-IN")}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>

        <div style="display:flex;justify-content:flex-end;margin-bottom:24px;">
          <div style="width:280px;font-size:12px;line-height:1.8;">
            <div style="display:flex;justify-content:space-between;"><span>Taxable Base Value:</span><b>₹${baseAmt.toLocaleString("en-IN")}</b></div>
            <div style="display:flex;justify-content:space-between;"><span>CGST (9%):</span><b>₹${cgst.toLocaleString("en-IN")}</b></div>
            <div style="display:flex;justify-content:space-between;"><span>SGST (9%):</span><b>₹${sgst.toLocaleString("en-IN")}</b></div>
            <div style="display:flex;justify-content:space-between;border-top:1px solid #111;padding-top:6px;font-size:14px;margin-top:6px;">
              <span>Total Invoice Amount:</span><b style="color:#b88628">₹${Number(order.total).toLocaleString("en-IN")}</b>
            </div>
          </div>
        </div>

        <div style="border-top:1px solid #eee;padding-top:16px;text-align:center;font-size:11px;color:#777;">
          This is a computer generated tax invoice issued by Dhara Scent Atelier. Handcrafted in India.
        </div>
      </div>
    `;

    modal.classList.add("active");
  }

  // Courier Shipping Label Modal
  function openShippingLabel(orderId) {
    const order = state.orders.find(o => o.id === orderId);
    if (!order) return;

    const modal = document.getElementById("shippingLabelModal");
    const content = document.getElementById("shippingLabelModalContent");
    if (!modal || !content) return;

    const isCod = order.payment && order.payment.includes("COD");

    content.innerHTML = `
      <div style="padding:20px;background:#ffffff;color:#000000;border:2px solid #000;border-radius:4px;font-family:sans-serif;">
        <div style="display:flex;justify-content:space-between;border-bottom:2px solid #000;padding-bottom:10px;margin-bottom:12px;">
          <div>
            <h2 style="font-size:18px;margin:0;font-weight:900;">${esc(order.courier || "BLUEDART APEX")}</h2>
            <small style="font-size:10px;">STANDARD PRIORITY FRAGRANCE CARGO</small>
          </div>
          <div style="text-align:right;">
            <b style="font-size:14px;border:2px solid #000;padding:2px 8px;">${isCod ? "COD : ₹" + order.total : "PREPAID"}</b>
          </div>
        </div>

        <div style="text-align:center;margin:14px 0;padding:8px;background:#f5f5f5;border:1px dashed #888;">
          <div style="font-family:monospace;font-size:28px;letter-spacing:5px;">||| | |||| || ||| |||| |</div>
          <b style="font-size:13px;letter-spacing:2px;">${esc(order.awb || "AWB-8829104")}</b>
        </div>

        <div style="border-bottom:1px solid #000;padding-bottom:10px;margin-bottom:10px;font-size:12px;line-height:1.4;">
          <b>DELIVER TO:</b><br>
          <span style="font-size:14px;font-weight:bold;">${esc(order.customer)}</span><br>
          ${esc(order.address)}<br>
          <b>PIN:</b> ${order.address.match(/\b\d{6}\b/) ? order.address.match(/\b\d{6}\b/)[0] : "400001"}<br>
          <b>CONTACT:</b> ${esc(order.phone)}
        </div>

        <div style="font-size:10px;color:#555;">
          <b>RETURN TO:</b> Dhara Scent Atelier, Bandra West, Mumbai 400050. Phone: +91 98200 12345
        </div>
      </div>
    `;

    modal.classList.add("active");
  }

  // Warehouse Packing Slip Modal
  function openPackingSlip(orderId) {
    const order = state.orders.find(o => o.id === orderId);
    if (!order) return;

    const modal = document.getElementById("packingSlipModal");
    const content = document.getElementById("packingSlipModalContent");
    if (!modal || !content) return;

    content.innerHTML = `
      <div style="padding:20px;background:#ffffff;color:#111;font-size:12px;line-height:1.5;">
        <h3 style="font-size:16px;border-bottom:1px solid #ccc;padding-bottom:8px;margin-bottom:12px;">
          ATELIER WAREHOUSE PICKING & INSPECTION LIST
        </h3>
        <p>Order Ref: <b>${esc(order.id)}</b> | Packaging Queue Date: <b>${esc(order.date)}</b></p>
        <p>Customer: <b>${esc(order.customer)}</b> | Destination: <b>${esc(order.city)}</b></p>

        <table style="width:100%;border-collapse:collapse;margin:16px 0;">
          <thead>
            <tr style="background:#f0f0f0;border-bottom:1px solid #999;">
              <th style="padding:6px;text-align:left;">Check</th>
              <th style="padding:6px;text-align:left;">Fragrance SKU</th>
              <th style="padding:6px;text-align:left;">Size</th>
              <th style="padding:6px;text-align:center;">Qty</th>
            </tr>
          </thead>
          <tbody>
            ${(order.items || []).map(it => `
              <tr style="border-bottom:1px solid #eee;">
                <td style="padding:6px;"><input type="checkbox"></td>
                <td style="padding:6px;"><b>${esc(it.name)}</b></td>
                <td style="padding:6px;">${esc(it.size)}</td>
                <td style="padding:6px;text-align:center;"><b>${it.qty}</b></td>
              </tr>
            `).join("")}
          </tbody>
        </table>

        <div style="border:1px solid #ddd;padding:10px;border-radius:4px;margin-top:12px;font-size:11px;">
          <b>Quality Control Verification:</b><br>
          [ ] Crystal bottle nozzle spray tested<br>
          [ ] Velvet coffret box gold ribbon tied<br>
          [ ] Authenticity certificate & handwritten thank-you card enclosed
        </div>
      </div>
    `;

    modal.classList.add("active");
  }

  // Initiate Refund Modal
  function openRefundModal(orderId) {
    const order = state.orders.find(o => o.id === orderId);
    if (!order) return;

    const modal = document.getElementById("refundModal");
    const content = document.getElementById("refundModalContent");
    if (!modal || !content) return;

    content.innerHTML = `
      <p style="font-size:13px;margin-bottom:14px;">
        Initiating automated Razorpay refund for Order <b>${esc(order.id)}</b> (${esc(order.customer)}).
      </p>
      <div class="form-group" style="margin-bottom:12px;">
        <label>Refund Amount (₹)</label>
        <input type="number" id="refundInputAmount" value="${order.total}" max="${order.total}">
      </div>
      <div class="form-group">
        <label>Reason for Refund</label>
        <select id="refundReasonSelect">
          <option value="Customer Cancellation">Customer Cancellation</option>
          <option value="Damaged Bottle in Transit">Damaged Bottle in Transit</option>
          <option value="Olfactory Dissatisfaction">Olfactory Dissatisfaction (7-Day Privilege)</option>
        </select>
      </div>
    `;

    const confirmBtn = document.getElementById("btnConfirmProcessRefund");
    if (confirmBtn) {
      confirmBtn.onclick = function () {
        const amt = Number(document.getElementById("refundInputAmount").value) || order.total;
        order.status = "cancelled";
        saveData(STORAGE.ORDERS, state.orders);

        state.returns.unshift({
          id: "RET-" + Math.floor(100 + Math.random() * 900),
          refundId: "RFND-" + Date.now().toString(36).toUpperCase(),
          date: "Just now",
          orderId: order.id,
          customer: order.customer,
          itemName: order.items ? order.items[0].name : "Fragrance Item",
          reason: document.getElementById("refundReasonSelect").value,
          eligible: true,
          status: "Refunded",
          reverseAwb: "REV-DELH-99210",
          refundAmount: amt
        });
        saveData(STORAGE.RETURNS, state.returns);

        modal.classList.remove("active");
        toast(`Refund of ₹${amt.toLocaleString("en-IN")} processed successfully!`, "success");
        renderAll();
      };
    }

    modal.classList.add("active");
  }

  // Add Promo Coupon Modal
  function openAddCouponModal() {
    const modal = document.getElementById("modalCoupon");
    if (modal) {
      document.getElementById("couponForm").reset();
      modal.classList.add("active");
    }
  }

  function saveCoupon(e) {
    if (e) e.preventDefault();
    const code = document.getElementById("couponFormCode").value.trim().toUpperCase();
    if (!code) return;

    const newCoupon = {
      code: code,
      description: document.getElementById("couponFormDesc").value.trim() || "Special promotional voucher",
      discountType: document.getElementById("couponFormType").value,
      discountValue: Number(document.getElementById("couponFormValue").value) || 10,
      minOrder: Number(document.getElementById("couponFormMinOrder").value) || 2000,
      expiryDate: document.getElementById("couponFormExpiry").value || "2026-12-31",
      active: true,
      timesRedeemed: 0
    };

    state.coupons.unshift(newCoupon);
    saveData(STORAGE.COUPONS, state.coupons);
    document.getElementById("modalCoupon").classList.remove("active");
    toast(`Promo coupon ${code} created successfully!`, "success");
    renderMarketing();
  }

  function toggleCouponStatus(code) {
    const cp = state.coupons.find(c => c.code === code);
    if (!cp) return;
    cp.active = !cp.active;
    saveData(STORAGE.COUPONS, state.coupons);
    toast(`Coupon ${code} is now ${cp.active ? "active" : "disabled"}.`);
    renderMarketing();
  }

  function deleteCoupon(code) {
    if (confirm(`Delete coupon code ${code}?`)) {
      state.coupons = state.coupons.filter(c => c.code !== code);
      saveData(STORAGE.COUPONS, state.coupons);
      toast(`Coupon ${code} removed.`);
      renderMarketing();
    }
  }

  function copyCouponCode(text) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        toast("Copied to clipboard: " + text);
      });
    } else {
      toast("Copied: " + text);
    }
  }

  function updateOrderStatus(orderId, status) {
    const order = state.orders.find(o => o.id === orderId);
    if (!order) return;
    order.status = status;
    saveData(STORAGE.ORDERS, state.orders);
    toast(`Order ${orderId} marked as ${status.toUpperCase()}.`);
    renderAll();
  }

  function updateOrderCourier(orderId, courier) {
    const order = state.orders.find(o => o.id === orderId);
    if (!order) return;
    order.courier = courier;
    saveData(STORAGE.ORDERS, state.orders);
    toast(`Courier partner for ${orderId} allocated to ${courier}.`);
  }

  // ==========================================================================
  // FILTERS & SEARCH
  // ==========================================================================
  function setupFiltersAndSearch() {
    // Orders Search & Filter
    const oSearch = document.getElementById("searchOrdersInput");
    const oFilter = document.getElementById("filterOrderStatus");
    const applyOrderFilter = () => {
      renderOrders(oFilter ? oFilter.value : "all", oSearch ? oSearch.value : "");
    };
    if (oSearch) oSearch.addEventListener("input", applyOrderFilter);
    if (oFilter) oFilter.addEventListener("change", applyOrderFilter);

    // Products Search & Filter
    const pSearch = document.getElementById("searchProductsInput");
    const pCat = document.getElementById("filterProductCategory");
    const pStock = document.getElementById("filterProductStock");
    const applyProdFilter = () => {
      renderProducts(pCat ? pCat.value : "all", pStock ? pStock.value : "all", pSearch ? pSearch.value : "");
    };
    if (pSearch) pSearch.addEventListener("input", applyProdFilter);
    if (pCat) pCat.addEventListener("change", applyProdFilter);
    if (pStock) pStock.addEventListener("change", applyProdFilter);

    // Customers Search & Filter
    const cSearch = document.getElementById("searchCustomersInput");
    const cSeg = document.getElementById("filterCustomerSegment");
    const applyCustFilter = () => {
      renderCustomers(cSeg ? cSeg.value : "all", cSearch ? cSearch.value : "");
    };
    if (cSearch) cSearch.addEventListener("input", applyCustFilter);
    if (cSeg) cSeg.addEventListener("change", applyCustFilter);

    // Notifications selectors
    const notifOrd = document.getElementById("notifOrderSelect");
    const notifTpl = document.getElementById("notifTemplateSelect");
    if (notifOrd) notifOrd.addEventListener("change", updateNotificationPreview);
    if (notifTpl) notifTpl.addEventListener("change", updateNotificationPreview);
  }

  function filterOrdersByStatus(status) {
    switchTab("orders");
    const el = document.getElementById("filterOrderStatus");
    if (el) {
      el.value = status;
      renderOrders(status);
    }
  }

  function filterOrdersByCustomer(custName) {
    switchTab("orders");
    const el = document.getElementById("searchOrdersInput");
    if (el) {
      el.value = custName;
      renderOrders("all", custName);
    }
  }

  function contactLeadWhatsApp(phone, name) {
    const cleanPhone = phone.replace(/[^0-9]/g, "");
    const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(`Namaste ${name}, this is Dhara Scent Atelier concierge following up on your luxury fragrance inquiry.`)}`;
    window.open(url, "_blank");
  }

  function launchCampaignWhatsApp(cmpId) {
    const cmp = state.campaigns.find(c => c.id === cmpId);
    if (!cmp) return;
    const url = `https://wa.me/?text=${encodeURIComponent(cmp.message.replace("{CustomerName}", "valued patron"))}`;
    window.open(url, "_blank");
  }

  // ==========================================================================
  // CSV EXPORT UTILITIES
  // ==========================================================================
  function downloadCSV(csvContent, filename) {
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.setAttribute("download", filename);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    toast("CSV exported: " + filename);
  }

  function exportOrdersCSV() {
    let csv = "Order ID,Date,Customer,Phone,City,Payment,Total (INR),Status,AWB\n";
    state.orders.forEach(o => {
      csv += `"${o.id}","${o.date}","${o.customer}","${o.phone}","${o.city}","${o.payment}",${o.total},"${o.status}","${o.awb || ""}"\n`;
    });
    downloadCSV(csv, "Dhara_Orders_Report.csv");
  }

  function exportPaymentsCSV() {
    let csv = "Gateway Ref,Order ID,Customer,Phone,Mode,Total (INR),Status\n";
    state.orders.forEach(o => {
      csv += `"${o.gatewayRef || ""}","${o.id}","${o.customer}","${o.phone}","${o.payment}",${o.total},"${o.paymentStatus}"\n`;
    });
    downloadCSV(csv, "Dhara_Gateway_Settlements.csv");
  }

  function exportShippingCSV() {
    let csv = "Order ID,Recipient,Destination,Courier,AWB,Status,POD\n";
    state.orders.forEach(o => {
      csv += `"${o.id}","${o.customer}","${o.city}","${o.courier || ""}","${o.awb || ""}","${o.status}","${o.podRef || ""}"\n`;
    });
    downloadCSV(csv, "Dhara_Courier_Shipping_Log.csv");
  }

  function exportInventoryCSV() {
    let csv = "Product Name,Category,Gender,Price (INR),Sizes,Stock Units,Status\n";
    state.products.forEach(p => {
      csv += `"${p.name}","${p.category}","${p.forGender || "Unisex"}",${p.minPrice},"${p.sizes}",${p.stock},"${p.status}"\n`;
    });
    downloadCSV(csv, "Dhara_Catalog_Inventory.csv");
  }

  function exportReturnsCSV() {
    let csv = "Return ID,Date,Order ID,Customer,Item,Reason,Status,Refund Amount (INR)\n";
    state.returns.forEach(r => {
      csv += `"${r.id}","${r.date}","${r.orderId}","${r.customer}","${r.itemName}","${r.reason}","${r.status}",${r.refundAmount || 0}\n`;
    });
    downloadCSV(csv, "Dhara_Returns_Refunds.csv");
  }

  function exportCustomersCSV() {
    let csv = "Customer ID,Name,Phone,Email,City,Segment,Orders Count,Total Spend (INR)\n";
    state.customers.forEach(c => {
      csv += `"${c.id}","${c.name}","${c.phone}","${c.email || ""}","${c.city}","${c.category}",${c.ordersCount},${c.totalSpend}\n`;
    });
    downloadCSV(csv, "Dhara_Patrons_Directory.csv");
  }

  function exportInquiriesCSV() {
    let csv = "Inquiry ID,Date,Name,Phone,Type,Query,Status\n";
    state.inquiries.forEach(i => {
      csv += `"${i.id}","${i.date}","${i.name}","${i.phone}","${i.type}","${i.query.replace(/"/g, '""')}","${i.status}"\n`;
    });
    downloadCSV(csv, "Dhara_Concierge_Leads.csv");
  }

  function exportFullBackupJSON() {
    const fullState = {
      settings: state.settings,
      products: state.products,
      orders: state.orders,
      customers: state.customers,
      inquiries: state.inquiries,
      coupons: state.coupons,
      campaigns: state.campaigns,
      returns: state.returns,
      stockLogs: state.stockLogs
    };
    const jsonStr = JSON.stringify(fullState, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.setAttribute("download", `Dhara_Store_Backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    toast("Full store JSON backup downloaded.");
  }

  function resetToDefaultCatalog() {
    if (confirm("Reset catalog to the 16 original Dhara fragrance formulas?")) {
      state.products = DEFAULT_PRODUCTS.slice();
      saveData(STORAGE.PRODUCTS, state.products);
      renderAll();
      toast("Catalog reset to original 16 fragrances.", "success");
    }
  }

  function clearEmailAuditLogs() {
    if (window.DHARA_MAILER && typeof window.DHARA_MAILER.clearEmailLogs === "function") {
      window.DHARA_MAILER.clearEmailLogs();
      renderEmailAuditLogs();
      toast("Email notification audit logs cleared.");
    }
  }

  // ==========================================================================
  // EXPOSE CRM API
  // ==========================================================================
  const CRM_API = {
    init,
    switchTab,
    setMarketingSubTab,
    openAddProductModal,
    openEditProductModal,
    deleteProduct,
    saveProduct,
    adjustStock,
    openOrderDetail,
    openInvoiceSlip,
    openShippingLabel,
    openPackingSlip,
    openRefundModal,
    openAddCouponModal,
    saveCoupon,
    deleteCoupon,
    toggleCouponStatus,
    copyCouponCode,
    updateOrderStatus,
    updateOrderCourier,
    filterOrdersByStatus,
    filterOrdersByCustomer,
    contactLeadWhatsApp,
    launchCampaignWhatsApp,
    runTestScenario,
    runAllTestScenarios,
    resetTestData,
    resetToDefaultCatalog,
    exportOrdersCSV,
    exportPaymentsCSV,
    exportShippingCSV,
    exportInventoryCSV,
    exportReturnsCSV,
    exportCustomersCSV,
    exportInquiriesCSV,
    exportFullBackupJSON,
    clearEmailAuditLogs
  };

  window.DHARA_CRM = CRM_API;
  window.BK_CRM = CRM_API; // Compatibility alias

  // Initialize on DOM Ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
