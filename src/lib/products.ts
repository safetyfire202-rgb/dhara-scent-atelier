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


export type Family = "Oriental" | "Floral" | "Attar" | "Fresh" | "Aquatic" | "Woody";
export type Product = {
  id: string;
  slug: string;
  name: string;
  family: Family;
  for: "Him" | "Her" | "Unisex";
  price: number;
  image: string;
  tagline: string;
  top: string;
  heart: string;
  base: string;
  stock: number;
};

const imgBySlug: Record<string, string> = {"amber-noir": hero, "fleur-noire": p1, "ivory-jasmine": p2, "shahi-oud": p3, "peony-veil": p4, "tide": p5, "bergamot-bloom": p6, "kesar-attar": i0, "midnight-leather": i1, "mitti": i2, "velvet-vanilla": i3, "azure-coast": i4, "neroli-sun": i5, "rose-rooh": i6, "smoked-cedar": i7, "tuberose-nights": i8, "royal-oud-intense": i9, "vetiver-mist": i10, "monsoon-lily": i11, "dhara-signature": i12};

export const products: Product[] = [
  { id: "amber-noir", slug: "amber-noir", name: "Amber Noir", family: "Oriental", for: "Unisex", price: 2499, tagline: "Molten amber after midnight", top: "Saffron, Pink Pepper", heart: "Amber, Labdanum", base: "Vanilla, Benzoin", stock: 50, image: imgBySlug["amber-noir"] },
  { id: "fleur-noire", slug: "fleur-noire", name: "Fleur Noire", family: "Woody", for: "Her", price: 2299, tagline: "A dark rose in velvet", top: "Blackcurrant", heart: "Damask Rose", base: "Patchouli, Oud", stock: 50, image: imgBySlug["fleur-noire"] },
  { id: "ivory-jasmine", slug: "ivory-jasmine", name: "Ivory Jasmine", family: "Floral", for: "Her", price: 1999, tagline: "Moonlit sambac petals", top: "Neroli", heart: "Jasmine Sambac", base: "White Musk", stock: 50, image: imgBySlug["ivory-jasmine"] },
  { id: "shahi-oud", slug: "shahi-oud", name: "Shahi Oud", family: "Attar", for: "Unisex", price: 3499, tagline: "Royal oud, slow-distilled", top: "Saffron", heart: "Cambodian Oud", base: "Sandalwood", stock: 50, image: imgBySlug["shahi-oud"] },
  { id: "peony-veil", slug: "peony-veil", name: "Peony Veil", family: "Floral", for: "Her", price: 1899, tagline: "Soft as blush silk", top: "Lychee", heart: "Peony, Rose", base: "Cashmere Musk", stock: 50, image: imgBySlug["peony-veil"] },
  { id: "tide", slug: "tide", name: "Tide", family: "Aquatic", for: "Him", price: 1799, tagline: "Salt air on warm stone", top: "Sea Salt, Lemon", heart: "Marine Accord", base: "Driftwood", stock: 50, image: imgBySlug["tide"] },
  { id: "bergamot-bloom", slug: "bergamot-bloom", name: "Bergamot Bloom", family: "Fresh", for: "Unisex", price: 1599, tagline: "Morning in a citrus grove", top: "Bergamot", heart: "Petitgrain", base: "Vetiver", stock: 50, image: imgBySlug["bergamot-bloom"] },
  { id: "kesar-attar", slug: "kesar-attar", name: "Kesar Attar", family: "Attar", for: "Unisex", price: 2799, tagline: "Liquid gold of Kashmir", top: "Saffron", heart: "Rose Otto", base: "Amber", stock: 50, image: imgBySlug["kesar-attar"] },
  { id: "midnight-leather", slug: "midnight-leather", name: "Midnight Leather", family: "Woody", for: "Him", price: 2599, tagline: "Worn leather, cool night", top: "Cardamom", heart: "Leather", base: "Cedar, Tonka", stock: 50, image: imgBySlug["midnight-leather"] },
  { id: "mitti", slug: "mitti", name: "Mitti", family: "Attar", for: "Unisex", price: 2199, tagline: "First rain on earth", top: "Petrichor", heart: "Baked Clay", base: "Vetiver", stock: 50, image: imgBySlug["mitti"] },
  { id: "velvet-vanilla", slug: "velvet-vanilla", name: "Velvet Vanilla", family: "Oriental", for: "Her", price: 2199, tagline: "Warm skin, sweet smoke", top: "Pear", heart: "Orchid", base: "Bourbon Vanilla", stock: 50, image: imgBySlug["velvet-vanilla"] },
  { id: "azure-coast", slug: "azure-coast", name: "Azure Coast", family: "Aquatic", for: "Him", price: 1899, tagline: "Endless blue horizon", top: "Grapefruit", heart: "Sea Fennel", base: "Ambergris", stock: 50, image: imgBySlug["azure-coast"] },
  { id: "neroli-sun", slug: "neroli-sun", name: "Neroli Sun", family: "Fresh", for: "Her", price: 1699, tagline: "Sunlight through orange blossom", top: "Mandarin", heart: "Neroli", base: "Musk", stock: 50, image: imgBySlug["neroli-sun"] },
  { id: "rose-rooh", slug: "rose-rooh", name: "Rose Rooh", family: "Attar", for: "Her", price: 2999, tagline: "Pure Kannauj rose spirit", top: "Rose Water", heart: "Rose Absolute", base: "Sandal", stock: 50, image: imgBySlug["rose-rooh"] },
  { id: "smoked-cedar", slug: "smoked-cedar", name: "Smoked Cedar", family: "Woody", for: "Him", price: 2399, tagline: "Embers in a forest", top: "Black Pepper", heart: "Cedarwood", base: "Birch Tar", stock: 50, image: imgBySlug["smoked-cedar"] },
  { id: "tuberose-nights", slug: "tuberose-nights", name: "Tuberose Nights", family: "Floral", for: "Her", price: 2099, tagline: "Intoxicating, unapologetic", top: "Green Notes", heart: "Tuberose", base: "Coconut Musk", stock: 50, image: imgBySlug["tuberose-nights"] },
  { id: "royal-oud-intense", slug: "royal-oud-intense", name: "Royal Oud Intense", family: "Oriental", for: "Him", price: 3999, tagline: "Power in a single spray", top: "Elemi", heart: "Oud, Incense", base: "Leather, Amber", stock: 50, image: imgBySlug["royal-oud-intense"] },
  { id: "vetiver-mist", slug: "vetiver-mist", name: "Vetiver Mist", family: "Fresh", for: "Him", price: 1799, tagline: "Green, crisp, grounded", top: "Lime", heart: "Haitian Vetiver", base: "Oakmoss", stock: 50, image: imgBySlug["vetiver-mist"] },
  { id: "monsoon-lily", slug: "monsoon-lily", name: "Monsoon Lily", family: "Aquatic", for: "Unisex", price: 1999, tagline: "Lilies after the storm", top: "Rain Accord", heart: "Water Lily", base: "Soft Woods", stock: 50, image: imgBySlug["monsoon-lily"] },
  { id: "dhara-signature", slug: "dhara-signature", name: "Dhara Signature", family: "Oriental", for: "Unisex", price: 4499, tagline: "The essence of Dhara", top: "Saffron, Bergamot", heart: "Rose, Oud", base: "Amber, Sandalwood", stock: 50, image: imgBySlug["dhara-signature"] },
];

export const bundledImage = (slug: string) => imgBySlug[slug] ?? null;
export const inr = (n: number) => "₹" + n.toLocaleString("en-IN");
