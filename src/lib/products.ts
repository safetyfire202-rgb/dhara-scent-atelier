export type Family = "Oriental" | "Floral" | "Attar" | "Fresh" | "Aquatic" | "Woody";
export type Product = {
  id: string;
  slug: string;
  name: string;
  family: Family;
  for: "Him" | "Her" | "Unisex";
  price: number;
  image: string;
  gallery: string[];
  tagline: string;
  top: string;
  heart: string;
  base: string;
  stock: number;
};

const files = import.meta.glob("../assets/products/*.jpg", { eager: true, import: "default" }) as Record<string, string>;
const photos = (slug: string) =>
  Object.keys(files)
    .filter((k) => new RegExp(`/${slug}-\\d+\\.jpg$`).test(k))
    .sort((a, b) => Number(a.match(/-(\d+)\.jpg$/)![1]) - Number(b.match(/-(\d+)\.jpg$/)![1]))
    .map((k) => files[k]!);

type Base = Omit<Product, "id" | "image" | "gallery" | "stock">;
const list: Base[] = [
  { slug: "imperial-oud", name: "Imperial Oud", family: "Oriental", for: "Unisex", price: 3499, tagline: "Niche oud crowned in gold", top: "Saffron, Pink Pepper", heart: "Oud, Rose", base: "Amber, Sandalwood" },
  { slug: "oud-al-ameer", name: "Oud Al Ameer", family: "Woody", for: "Him", price: 2999, tagline: "The prince of dark woods", top: "Bergamot, Black Pepper", heart: "Oud, Cedarwood", base: "Vetiver, Musk" },
  { slug: "oud-sultan", name: "Oud Sultan", family: "Oriental", for: "Unisex", price: 2899, tagline: "Rich, ruby and unhurried", top: "Saffron, Plum", heart: "Rose, Oud", base: "Vanilla, Benzoin" },
  { slug: "d-blue", name: "D'Blue", family: "Aquatic", for: "Him", price: 1999, tagline: "Cool blue, sharp and clean", top: "Grapefruit, Sea Salt", heart: "Marine Accord, Lavender", base: "Ambergris, Cedar" },
  { slug: "ebony", name: "Ebony", family: "Fresh", for: "Unisex", price: 1899, tagline: "Green freshness on dark wood", top: "Lime, Green Notes", heart: "Petitgrain, Mint", base: "Vetiver, Ebony Wood" },
  { slug: "orchid", name: "Orchid", family: "Floral", for: "Her", price: 2299, tagline: "Golden petals from the Eternal collection", top: "Pear, Mandarin", heart: "Orchid, Jasmine", base: "Vanilla, Musk" },
  { slug: "vanilla-smog", name: "Vanilla Smog", family: "Oriental", for: "Unisex", price: 2499, tagline: "Sweet smoke from the Blends of Dubai", top: "Pink Pepper", heart: "Bourbon Vanilla, Tobacco", base: "Tonka, Amber" },
  { slug: "swag", name: "Swag", family: "Woody", for: "Him", price: 2499, tagline: "Bold, golden and confident", top: "Cardamom, Bergamot", heart: "Leather, Iris", base: "Oud, Cedar" },
  { slug: "wild", name: "Wild", family: "Fresh", for: "Him", price: 1799, tagline: "Untamed citrus, open sky", top: "Lemon, Bergamot", heart: "Neroli, Sage", base: "Vetiver, Musk" },
  { slug: "oud-blend", name: "Oud Blend", family: "Attar", for: "Unisex", price: 3199, tagline: "A crowned blend of rare woods", top: "Saffron", heart: "Oud, Rose", base: "Sandalwood, Musk" },
  { slug: "avant", name: "Avant", family: "Floral", for: "Her", price: 1999, tagline: "Soft peach and bright blossom", top: "Peach, Mandarin", heart: "Peony, Rose", base: "Cashmere Musk" },
  { slug: "mukhallat-aria", name: "Mukhallat Aria", family: "Attar", for: "Unisex", price: 2599, tagline: "A jade-green mukhallat", top: "Green Notes, Bergamot", heart: "Rose, Jasmine", base: "Oud, Sandalwood" },
  { slug: "emerald-oud", name: "Emerald Oud", family: "Woody", for: "Him", price: 3499, tagline: "Limited edition, intensely deep", top: "Black Pepper, Saffron", heart: "Oud, Cedarwood", base: "Leather, Amber" },
  { slug: "oud-zahir", name: "Oud Zahir", family: "Woody", for: "Him", price: 2899, tagline: "Dark, carved and magnetic", top: "Cardamom", heart: "Oud, Leather", base: "Birch Tar, Musk" },
  { slug: "attar-al-reem", name: "Attar Al Reem", family: "Attar", for: "Her", price: 2699, tagline: "Rose amber in fluted glass", top: "Rose Water, Saffron", heart: "Rose Absolute", base: "Amber, Sandal" },
  { slug: "oud-ayaan", name: "Oud Ayaan", family: "Floral", for: "Her", price: 2799, tagline: "Plum-dark rose with a jewel cap", top: "Blackcurrant, Plum", heart: "Damask Rose, Tuberose", base: "Oud, Patchouli" },
];

export const products: Product[] = list.map((p) => {
  const g = photos(p.slug);
  return { ...p, id: p.slug, stock: 50, image: g[0] ?? "", gallery: g };
});

export const bundledImage = (slug: string) => products.find((p) => p.slug === slug)?.image ?? null;
export const inr = (n: number) => "₹" + n.toLocaleString("en-IN");
