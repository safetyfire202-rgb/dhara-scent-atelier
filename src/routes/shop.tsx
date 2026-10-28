import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import hero from "@/assets/hero.jpg";
import { products } from "@/lib/products";
import { PageHero, ProductCard, Reveal } from "@/components/site";

type S = { family?: string | undefined };

export const Route = createFileRoute("/shop")({
  validateSearch: (s: Record<string, unknown>): S => ({ family: typeof s["family"] === "string" ? s["family"] : undefined }),
  head: () => ({
    meta: [
      { title: "Shop All Perfumes — Dhara" },
      { name: "description", content: "Browse all 20 Dhara perfumes and attars by family, gender and price." },
      { property: "og:title", content: "Shop All Perfumes — Dhara" },
      { property: "og:description", content: "Browse all Dhara perfumes and attars." },
    ],
  }),
  component: Shop,
});

const fams = ["All", "Oriental", "Woody", "Floral", "Attar", "Fresh", "Aquatic"];

function Shop() {
  const { family } = Route.useSearch();
  const [fam, setFam] = useState(family ?? "All");
  const [who, setWho] = useState("All");
  const [sort, setSort] = useState("featured");
  let list = products.filter((p) => (fam === "All" || p.family === fam) && (who === "All" || p.for === who));
  if (sort === "low") list = [...list].sort((a, b) => a.price - b.price);
  if (sort === "high") list = [...list].sort((a, b) => b.price - a.price);
  return (
    <>
      <PageHero eyebrow="The Collection" title="All Perfumes" image={hero} />
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-center gap-3 border-y py-6">
          {fams.map((f) => (
            <button key={f} onClick={() => setFam(f)} className={`border px-4 py-2 text-xs tracking-widest uppercase transition ${fam === f ? "bg-primary text-primary-foreground" : "hover:border-gold hover:text-gold"}`}>{f}</button>
          ))}
          <div className="ml-auto flex gap-3">
            <select value={who} onChange={(e) => setWho(e.target.value)} className="border bg-card px-3 py-2 text-sm">
              {["All", "Him", "Her", "Unisex"].map((w) => <option key={w}>{w}</option>)}
            </select>
            <select value={sort} onChange={(e) => setSort(e.target.value)} className="border bg-card px-3 py-2 text-sm">
              <option value="featured">Featured</option><option value="low">Price: Low to High</option><option value="high">Price: High to Low</option>
            </select>
          </div>
        </div>
        <p className="mt-6 text-sm text-muted-foreground">{list.length} fragrances</p>
        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((p) => <Reveal key={p.slug}><ProductCard p={p} /></Reveal>)}
        </div>
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
