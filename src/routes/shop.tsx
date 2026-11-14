import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import hero from "@/assets/hero.jpg";
import { useProducts } from "@/lib/catalog";
import { InfoColumns, PageHero, ProductCard, Reveal, TrustBar } from "@/components/site";

type S = { family?: string | undefined };

export const Route = createFileRoute("/shop")({
  validateSearch: (s: Record<string, unknown>): S => ({ family: typeof s["family"] === "string" ? s["family"] : undefined }),
  head: () => ({
    meta: [
      { title: "Shop All Perfumes — Dhara" },
      { name: "description", content: "Browse the full Dhara collection of perfumes and attars." },
      { property: "og:title", content: "Shop All Perfumes — Dhara" },
      { property: "og:description", content: "Browse the full Dhara collection of perfumes and attars." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Shop,
});

function Shop() {
  const products = useProducts();
  const { family } = Route.useSearch();

  const list = useMemo(
    () => (family ? products.filter((p) => p.family.toLowerCase() === family.toLowerCase()) : products),
    [products, family],
  );

  return (
    <>
      <PageHero eyebrow="The Collection" title="All Perfumes" image={hero} />
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-center justify-between border-b pb-4">
          <p className="text-sm text-muted-foreground">
            {list.length} {list.length === 1 ? "fragrance" : "fragrances"}
            {family ? ` in ${family}` : ""}
          </p>
          {family && (
            <Link to="/shop" className="border-b border-gold pb-0.5 text-xs tracking-widest text-gold uppercase">
              Show all
            </Link>
          )}
        </div>

        {list.length === 0 ? (
          <div className="py-24 text-center">
            <p className="font-display text-3xl italic">Nothing here yet</p>
            <Link to="/shop" className="mt-8 inline-block bg-primary px-8 py-3 text-xs tracking-widest text-primary-foreground uppercase">
              Show all perfumes
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {list.map((p) => <Reveal key={p.slug}><ProductCard p={p} /></Reveal>)}
          </div>
        )}
      </div>

      <InfoColumns
        eyebrow="Shopping Guide"
        title="Choosing your scent"
        cols={[
          ["By family", "Oriental and woody scents feel warm and evening-ready; fresh and aquatic stay crisp for daytime; florals sit softly in between."],
          ["By occasion", "Office days call for lighter concentrations and clean musks; celebrations deserve oud, amber and rose at full strength."],
          ["By season", "Citrus and marine notes shine in summer heat; vanilla, leather and spice bloom beautifully in winter air."],
        ]}
      />

      <TrustBar
        items={[
          ["Truck", "Free shipping", "On all orders above ₹999, anywhere in India."],
          ["ShieldCheck", "Easy returns", "Unopened bottles can be returned within 7 days."],
          ["Leaf", "Cruelty free", "Never tested on animals, ever."],
          ["Sparkles", "High concentration", "Eau de Parfum strength for 8–12 hour wear."],
        ]}
      />
    </>
  );
}
