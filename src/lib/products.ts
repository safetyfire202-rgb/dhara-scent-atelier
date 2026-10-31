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

import type { ProductRow } from "@/lib/catalog.functions";

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

export const fromRow = (r: ProductRow): Product => ({
  id: r.id, slug: r.slug, name: r.name, family: r.family as Family, for: r.for_whom as Product["for"],
  price: r.price, tagline: r.tagline, top: r.top_notes, heart: r.heart_notes, base: r.base_notes, stock: r.stock,
  image: r.image_url || imgBySlug[r.slug] || gift,
});

export const bundledImage = (slug: string) => imgBySlug[slug] ?? null;
export const inr = (n: number) => "₹" + n.toLocaleString("en-IN");
