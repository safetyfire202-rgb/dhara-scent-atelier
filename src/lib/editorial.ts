import type { Product } from "@/lib/products";

export const stories: Record<string, string> = {
  "amber-noir": "Created on a winter night in old Lucknow, when the bazaars close and only the lanterns stay lit. Amber resin is warmed slowly with labdanum until it glows like embers in a brass burner.",
  "fleur-noire": "A rose picked at the very end of the season, when its petals turn deep and velvety. We wrapped it in patchouli and a thread of oud for a floral that wears its shadows proudly.",
  "ivory-jasmine": "Inspired by the strings of malli sold at temple gates in Madurai at dusk. The buds are gathered closed, then opened in the cool night air to give their purest scent.",
  "shahi-oud": "A tribute to the royal perfumers of the Mughal court, who prized oud above gold. Our oud is aged for years before it meets Mysuru sandalwood in the copper still.",
  "peony-veil": "Peony is too delicate to distil, so we rebuilt its scent petal by petal. The result is soft as blush silk, lifted with juicy lychee and settled on cashmere musk.",
  "tide": "Written on the rocks of Gokarna, where the Arabian Sea meets sun-warmed stone. Sea salt, bright lemon and bleached driftwood capture a single endless afternoon.",
  "bergamot-bloom": "The first hour of morning in a citrus grove, when the leaves are still wet. Bergamot and petitgrain sparkle, then fall gently into green vetiver roots.",
  "kesar-attar": "Each October, the saffron fields of Pampore turn violet for only a few weeks. We infuse those crimson threads into rose otto and amber, the way Kannauj families have for generations.",
  "midnight-leather": "Inspired by a well-worn leather journal carried across the Rajasthan desert. Cardamom opens it, while cedar and tonka linger like the cool night after a hot day.",
  "mitti": "In Kannauj, clay discs baked by summer sun are distilled to capture the smell of the first monsoon rain. Mitti is that moment bottled — the earth exhaling after waiting all summer.",
  "velvet-vanilla": "Bourbon vanilla pods cured for months until they turn dark and supple. Paired with soft orchid and ripe pear, it feels like warm skin wrapped in cashmere.",
  "azure-coast": "A sail drifting off the Konkan coast with nothing but blue in every direction. Grapefruit and sea fennel meet a soft ambergris that stays close to the skin.",
  "neroli-sun": "Bitter-orange blossom picked at sunrise, when its scent is strongest. Mandarin adds sweetness and a clean musk keeps it glowing well into the afternoon.",
  "rose-rooh": "Rooh means 'soul' — the purest part of the rose. Damask petals from Kannauj are distilled directly into sandalwood in copper deg stills, a method nearly 400 years old.",
  "smoked-cedar": "Inspired by a Himalayan campfire, where cedar logs crackle under a sky full of stars. Black pepper sparks the opening, while birch tar leaves a soft trail of smoke.",
  "tuberose-nights": "Rajnigandha, the queen of the night, blooms only after dark. We let it be heady and unapologetic, softened just slightly with creamy coconut musk.",
  "royal-oud-intense": "Our most powerful creation, made for those who enter a room and change it. Oud and incense rise over leather and amber in a single, unforgettable spray.",
  "vetiver-mist": "Khus roots were once woven into window screens and sprinkled with water to cool the summer air. Vetiver Mist brings back that green, damp, grounding freshness.",
  "monsoon-lily": "Water lilies opening on a pond in Kerala just after a monsoon storm. A rain accord and soft woods give it a quiet, meditative calm.",
  "dhara-signature": "The scent of our house, blended from everything we love most about India. Saffron, rose and oud rest on amber and sandalwood — rich, warm and timeless.",
};

type Origin = { region: string; note: string };
const originByNote: [RegExp, Origin][] = [
  [/saffron/i, { region: "Pampore, Kashmir", note: "Hand-picked at dawn, three threads per flower." }],
  [/rose/i, { region: "Kannauj, Uttar Pradesh", note: "Damask petals gathered before the sun gets warm." }],
  [/oud/i, { region: "Assam & Cambodia", note: "Agarwood resin, aged for years before blending." }],
  [/sandal/i, { region: "Mysuru, Karnataka", note: "Creamy heartwood that softens every base." }],
  [/jasmine/i, { region: "Madurai, Tamil Nadu", note: "Malli buds gathered closed at dusk." }],
  [/vetiver|petrichor|clay/i, { region: "Rajasthan & Kannauj", note: "Earthy roots and sun-baked clay, slowly distilled." }],
  [/tuberose/i, { region: "West Bengal", note: "Rajnigandha blooms, picked at night." }],
  [/cardamom|pepper/i, { region: "Western Ghats, Kerala", note: "Green spice from the hills of Idukki." }],
  [/vanilla/i, { region: "Madagascar", note: "Bourbon pods, cured for months." }],
  [/bergamot|lemon|mandarin|grapefruit|lime|neroli/i, { region: "Calabria & Nagpur", note: "Cold-pressed peel for a bright, sparkling lift." }],
  [/amber|labdanum|benzoin/i, { region: "Andalusia & Laos", note: "Warm resins that glow on the skin." }],
  [/cedar|birch/i, { region: "Himalayas", note: "Dry mountain woods with a soft smoky edge." }],
];

export function originsFor(p: Product): (Origin & { name: string })[] {
  const notes = `${p.top}, ${p.heart}, ${p.base}`.split(",").map((s) => s.trim()).filter(Boolean);
  const out: (Origin & { name: string })[] = [];
  for (const n of notes) {
    const hit = originByNote.find(([re]) => re.test(n));
    if (hit && !out.some((o) => o.region === hit[1].region)) out.push({ name: n, ...hit[1] });
  }
  return out.slice(0, 3);
}

export const noteMeta = [
  { k: "Top", when: "First 15 minutes", d: "The bright opening you meet first — light, lively and quick to fade." },
  { k: "Heart", when: "15 minutes – 4 hours", d: "The true character of the scent, rising as the opening settles." },
  { k: "Base", when: "4 hours onward", d: "The deep, lasting trail that stays on skin and clothes." },
] as const;
