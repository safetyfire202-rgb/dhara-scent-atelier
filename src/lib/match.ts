import type { Product } from "@/lib/products";

export const fams = ["Oriental", "Woody", "Floral", "Attar", "Fresh", "Aquatic"];

export const ingredients = [
  "Saffron", "Rose", "Oud", "Amber", "Vanilla",
  "Jasmine", "Sandal", "Vetiver", "Musk", "Leather", "Citrus",
];

const citrus = /lemon|bergamot|mandarin|grapefruit|lime|neroli|petitgrain/i;

export const hasIngredient = (p: Product, i: string) => {
  const notes = `${p.top} ${p.heart} ${p.base}`;
  return i === "Citrus" ? citrus.test(notes) : notes.toLowerCase().includes(i.toLowerCase());
};

export const occasionMap: Record<string, Product["family"][]> = {
  "Everyday": ["Fresh", "Aquatic", "Floral"],
  "Office": ["Fresh", "Floral"],
  "Evening": ["Oriental", "Woody"],
  "Wedding & Festive": ["Attar", "Oriental"],
  "Summer": ["Fresh", "Aquatic"],
  "Winter": ["Oriental", "Woody", "Attar"],
};

export const occasions = Object.keys(occasionMap);

export type Filter = { fams?: string[]; ings?: string[]; occ?: string; who?: string };

export const matches = (p: Product, f: Filter) =>
  (!f.fams || f.fams.length === 0 || f.fams.includes(p.family)) &&
  (!f.ings || f.ings.length === 0 || f.ings.some((i) => hasIngredient(p, i))) &&
  (!f.occ || (occasionMap[f.occ] ?? []).includes(p.family)) &&
  (!f.who || f.who === "All" || p.for === f.who);
