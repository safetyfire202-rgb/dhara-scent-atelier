import { describe, expect, it } from "vitest";

import { hasIngredient, matches, occasionMap } from "@/lib/match";
import { products } from "@/lib/products";

const bySlug = (slug: string) => products.find((p) => p.slug === slug)!;

describe("Scent finder matching", () => {
  it("Evening only offers warm families", () => {
    expect(occasionMap["Evening"]).toEqual(["Oriental", "Woody"]);
    expect(matches(bySlug("amber-noir"), { occ: "Evening" })).toBe(true);
    expect(matches(bySlug("mitti"), { occ: "Evening" })).toBe(false);
  });

  it("Wedding & Festive offers attars and orientals", () => {
    expect(matches(bySlug("kesar-attar"), { occ: "Wedding & Festive" })).toBe(true);
    expect(matches(bySlug("tide"), { occ: "Wedding & Festive" })).toBe(false);
  });

  it("matches ingredients against the note pyramid", () => {
    expect(hasIngredient(bySlug("kesar-attar"), "Saffron")).toBe(true);
    expect(hasIngredient(bySlug("tide"), "Citrus")).toBe(true);
    expect(hasIngredient(bySlug("tide"), "Oud")).toBe(false);
    expect(matches(bySlug("rose-rooh"), { ings: ["Rose", "Sandal"] })).toBe(true);
  });

  it("respects the wearer answer", () => {
    expect(matches(bySlug("fleur-noire"), { who: "Him" })).toBe(false);
    expect(matches(bySlug("fleur-noire"), { who: "Her" })).toBe(true);
    expect(matches(bySlug("fleur-noire"), { who: "All" })).toBe(true);
  });

  it("an unanswered question narrows nothing", () => {
    expect(matches(bySlug("tide"), {})).toBe(true);
    expect(matches(bySlug("tide"), { ings: [], occ: "", who: "All" })).toBe(true);
  });
});
