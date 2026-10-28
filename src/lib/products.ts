import p1 from "@/assets/p1.jpg";
import p2 from "@/assets/p2.jpg";
import p3 from "@/assets/p3.jpg";
import p4 from "@/assets/p4.jpg";
import p5 from "@/assets/p5.jpg";
import p6 from "@/assets/p6.jpg";
import hero from "@/assets/hero.jpg";
import gift from "@/assets/gift.jpg";
import i0 from "@/assets/kesar-attar.jpg";
import i1 from "@/assets/midnight-leather.jpg";
import i2 from "@/assets/mitti.jpg";
import i3 from "@/assets/velvet-vanilla.jpg";
import i4 from "@/assets/azure-coast.jpg";
import i5 from "@/assets/neroli-sun.jpg";
import i6 from "@/assets/rose-rooh.jpg";
import i7 from "@/assets/smoked-cedar.jpg";
import i8 from "@/assets/tuberose-nights.jpg";
import i9 from "@/assets/royal-oud.jpg";
import i10 from "@/assets/vetiver-mist.jpg";
import i11 from "@/assets/monsoon-lily.jpg";
import i12 from "@/assets/dhara-signature.jpg";

export type Product = {
  slug: string;
  name: string;
  family: "Oriental" | "Floral" | "Attar" | "Fresh" | "Aquatic" | "Woody";
  for: "Him" | "Her" | "Unisex";
  price: number;
  image: string;
  tagline: string;
  top: string;
  heart: string;
  base: string;
};


const raw: Omit<Product, "slug" | "image">[] = [
  { name: "Amber Noir", family: "Oriental", for: "Unisex", price: 2499, tagline: "Molten amber after midnight", top: "Saffron, Pink Pepper", heart: "Amber, Labdanum", base: "Vanilla, Benzoin" },
  { name: "Fleur Noire", family: "Woody", for: "Her", price: 2299, tagline: "A dark rose in velvet", top: "Blackcurrant", heart: "Damask Rose", base: "Patchouli, Oud" },
  { name: "Ivory Jasmine", family: "Floral", for: "Her", price: 1999, tagline: "Moonlit sambac petals", top: "Neroli", heart: "Jasmine Sambac", base: "White Musk" },
  { name: "Shahi Oud", family: "Attar", for: "Unisex", price: 3499, tagline: "Royal oud, slow-distilled", top: "Saffron", heart: "Cambodian Oud", base: "Sandalwood" },
  { name: "Peony Veil", family: "Floral", for: "Her", price: 1899, tagline: "Soft as blush silk", top: "Lychee", heart: "Peony, Rose", base: "Cashmere Musk" },
  { name: "Tide", family: "Aquatic", for: "Him", price: 1799, tagline: "Salt air on warm stone", top: "Sea Salt, Lemon", heart: "Marine Accord", base: "Driftwood" },
  { name: "Bergamot Bloom", family: "Fresh", for: "Unisex", price: 1599, tagline: "Morning in a citrus grove", top: "Bergamot", heart: "Petitgrain", base: "Vetiver" },
  { name: "Kesar Attar", family: "Attar", for: "Unisex", price: 2799, tagline: "Liquid gold of Kashmir", top: "Saffron", heart: "Rose Otto", base: "Amber" },
  { name: "Midnight Leather", family: "Woody", for: "Him", price: 2599, tagline: "Worn leather, cool night", top: "Cardamom", heart: "Leather", base: "Cedar, Tonka" },
  { name: "Mitti", family: "Attar", for: "Unisex", price: 2199, tagline: "First rain on earth", top: "Petrichor", heart: "Baked Clay", base: "Vetiver" },
  { name: "Velvet Vanilla", family: "Oriental", for: "Her", price: 2199, tagline: "Warm skin, sweet smoke", top: "Pear", heart: "Orchid", base: "Bourbon Vanilla" },
  { name: "Azure Coast", family: "Aquatic", for: "Him", price: 1899, tagline: "Endless blue horizon", top: "Grapefruit", heart: "Sea Fennel", base: "Ambergris" },
  { name: "Neroli Sun", family: "Fresh", for: "Her", price: 1699, tagline: "Sunlight through orange blossom", top: "Mandarin", heart: "Neroli", base: "Musk" },
  { name: "Rose Rooh", family: "Attar", for: "Her", price: 2999, tagline: "Pure Kannauj rose spirit", top: "Rose Water", heart: "Rose Absolute", base: "Sandal" },
  { name: "Smoked Cedar", family: "Woody", for: "Him", price: 2399, tagline: "Embers in a forest", top: "Black Pepper", heart: "Cedarwood", base: "Birch Tar" },
  { name: "Tuberose Nights", family: "Floral", for: "Her", price: 2099, tagline: "Intoxicating, unapologetic", top: "Green Notes", heart: "Tuberose", base: "Coconut Musk" },
  { name: "Royal Oud Intense", family: "Oriental", for: "Him", price: 3999, tagline: "Power in a single spray", top: "Elemi", heart: "Oud, Incense", base: "Leather, Amber" },
  { name: "Vetiver Mist", family: "Fresh", for: "Him", price: 1799, tagline: "Green, crisp, grounded", top: "Lime", heart: "Haitian Vetiver", base: "Oakmoss" },
  { name: "Monsoon Lily", family: "Aquatic", for: "Unisex", price: 1999, tagline: "Lilies after the storm", top: "Rain Accord", heart: "Water Lily", base: "Soft Woods" },
  { name: "Dhara Signature", family: "Oriental", for: "Unisex", price: 4499, tagline: "The essence of Dhara", top: "Saffron, Bergamot", heart: "Rose, Oud", base: "Amber, Sandalwood" },
];

const imgBySlug: Record<string, string> = {"amber-noir": hero, "fleur-noire": p1, "ivory-jasmine": p2, "shahi-oud": p3, "peony-veil": p4, "tide": p5, "bergamot-bloom": p6, "kesar-attar": i0, "midnight-leather": i1, "mitti": i2, "velvet-vanilla": i3, "azure-coast": i4, "neroli-sun": i5, "rose-rooh": i6, "smoked-cedar": i7, "tuberose-nights": i8, "royal-oud-intense": i9, "vetiver-mist": i10, "monsoon-lily": i11, "dhara-signature": i12};

export const products: Product[] = raw.map((p) => {
  const slug = p.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  return { ...p, slug, image: imgBySlug[slug] ?? gift };
});

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const inr = (n: number) => "₹" + n.toLocaleString("en-IN");
