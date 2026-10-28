import p1 from "@/assets/p1.jpg";
import p2 from "@/assets/p2.jpg";
import p3 from "@/assets/p3.jpg";
import p4 from "@/assets/p4.jpg";
import p5 from "@/assets/p5.jpg";
import p6 from "@/assets/p6.jpg";
import hero from "@/assets/hero.jpg";
import gift from "@/assets/gift.jpg";

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

const imgs = { Oriental: hero, Floral: p4, Attar: p3, Fresh: p6, Aquatic: p5, Woody: p1 } as const;

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

export const products: Product[] = raw.map((p) => ({
  ...p,
  slug: p.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
  image: p.name === "Fleur Noire" ? p1 : p.name === "Ivory Jasmine" ? p2 : p.name === "Dhara Signature" ? gift : imgs[p.family],
}));

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const inr = (n: number) => "₹" + n.toLocaleString("en-IN");
