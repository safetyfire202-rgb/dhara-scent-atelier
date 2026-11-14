import { describe, expect, it } from "vitest";
import { products } from "@/lib/products";
import saffronPhoto from "@/assets/products/saffron-vibes-cover.jpeg";
import vanillaPhoto from "@/assets/products/vanilla-smog-cover.jpeg";
import galorePhoto from "@/assets/products/oud-galore-cover.jpeg";
import exoticPhoto from "@/assets/products/oud-exotic-cover.jpeg";

describe("Confirmed Dhara product photo assignments", () => {
  const assignments = [
    ["saffron-vibes", "Saffron Vibes", saffronPhoto],
    ["vanilla-smog", "Vanilla Smog", vanillaPhoto],
    ["oud-galore", "Oud Galore", galorePhoto],
    ["oud-exotic", "Oud Exotic", exoticPhoto],
  ];

  for (const [slug, name, image] of assignments) {
    it(`lists ${name} once with its confirmed uploaded cover first`, () => {
      const entries = products.filter((p) => p.slug === slug);
      expect(entries).toHaveLength(1);
      expect(entries[0]?.name).toBe(name);
      expect(entries[0]?.image).toBe(image);
      expect(entries[0]?.gallery[0]).toBe(image);
    });
  }
});