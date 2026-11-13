import { describe, expect, it } from "vitest";

import { hasIngredient, matches, occasionMap } from "@/lib/match";
import { products } from "@/lib/products";

const bySlug = (slug: string) => products.find((p) => p.slug === slug)!;

describe("Scent finder matching", () => {
  it("Evening only offers warm families", () => {
    expect(occasionMap["Evening"]).toEqual(["Oriental", "Woody"]);
    expect(matches(bySlug("imperial-oud"), { occ: "Evening" })).toBe(true);
    expect(matches(bySlug("wild"), { occ: "Evening" })).toBe(false);
  });

  it("Wedding & Festive offers attars and orientals", () => {
    expect(matches(bySlug("saffron-vibes"), { occ: "Wedding & Festive" })).toBe(true);
    expect(matches(bySlug("d-blue"), { occ: "Wedding & Festive" })).toBe(false);
  });

  it("matches ingredients against the note pyramid", () => {
    expect(hasIngredient(bySlug("saffron-vibes"), "Saffron")).toBe(true);
    expect(hasIngredient(bySlug("d-blue"), "Citrus")).toBe(true);
    expect(hasIngredient(bySlug("d-blue"), "Oud")).toBe(false);
    expect(matches(bySlug("attar-al-reem"), { ings: ["Rose", "Sandal"] })).toBe(true);
  });

  it("respects the wearer answer", () => {
    expect(matches(bySlug("oud-ayaan"), { who: "Him" })).toBe(false);
    expect(matches(bySlug("oud-ayaan"), { who: "Her" })).toBe(true);
    expect(matches(bySlug("oud-ayaan"), { who: "All" })).toBe(true);
  });

  it("an unanswered question narrows nothing", () => {
    expect(matches(bySlug("d-blue"), {})).toBe(true);
    expect(matches(bySlug("d-blue"), { ings: [], occ: "", who: "All" })).toBe(true);
  });
});
