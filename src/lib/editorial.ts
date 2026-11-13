import type { Product } from "@/lib/products";

export const stories: Record<string, string> = {
  "imperial-oud": "Our niche flagship, dressed in a gold lattice cap and an engraved oval label. Saffron and rose open onto a deep oud that settles into warm amber and sandalwood.",
  "royal-oud": "Made for grand evenings, Royal Oud lets incense and resin rise slowly from the skin. Leather and amber give it a long, regal trail.",
  "oud-al-ameer": "Al Ameer means 'the prince'. Black pepper and bergamot lead into oud and cedar, poured into a heavy black bottle framed in gold arabesque.",
  "oud-sultan": "A ruby-toned bottle for a ruby-toned scent. Plum and saffron melt into rose and oud, then soften into vanilla and benzoin.",
  "d-blue": "Part of our French Collection, D'Blue is a cool breath of the sea — grapefruit and salt over a smooth ambergris base.",
  "ebony": "Bright green on dark wood. Lime and mint sparkle first, then vetiver and ebony wood keep it grounded all day.",
  "orchid": "From the Eternal Collection, Orchid glows like honey in its glass. Pear and jasmine open onto a soft vanilla musk.",
  "vanilla-smog": "One of our Blends of Dubai: bourbon vanilla curled with a ribbon of tobacco smoke, finished with tonka and amber.",
  "swag": "Under the golden carved cap sits a confident blend of cardamom, leather and iris, with oud and cedar beneath.",
  "saffron-vibes": "Saffron, the gold of spices, poured into rose and jasmine and laid over amber and oud — a festive scent from our Blends of Dubai.",
  "oud-galore": "For those who want oud and nothing less. Saffron and elemi lift a rich oud-patchouli heart over leather and sandalwood.",
  "wild": "Fresh, open and full of energy. Lemon and bergamot over neroli and sage, drying down to clean vetiver.",
  "oud-blend": "Crowned with a jewelled cap, Oud Blend is a traditional mix of oud, rose and saffron on a creamy sandalwood base.",
  "oud-exotic": "An extrait de parfum with a royal finish — plum and saffron, oud and incense, wrapped in amber and vanilla.",
  "avant": "Light and modern, Avant pairs juicy peach and mandarin with peony and rose on a soft cashmere musk.",
  "mukhallat-aria": "A mukhallat is a blend of many oils. Aria mixes green notes and rose with oud and sandalwood in a jade-green bottle.",
  "emerald-oud": "A limited edition, deep and powerful. Black pepper and saffron open onto oud and cedar, with leather and amber that last for hours.",
  "oud-zahir": "Dark and magnetic, carved like its bottle. Cardamom and leather over oud, with a smoky birch finish.",
  "attar-al-reem": "Rose in every layer — rose water, rose absolute and a warm amber-sandal base, poured into fluted rose-gold glass.",
  "oud-ayaan": "A plum-dark rose under a crystal jewel cap. Blackcurrant and tuberose bloom over oud and patchouli.",
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
