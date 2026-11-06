import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import hero from "@/assets/hero.jpg";
import { useProducts } from "@/lib/catalog";
import { Chip, InfoColumns, PageHero, ProductCard, Reveal, TrustBar } from "@/components/site";
import { fams, ingredients, matches, occasions } from "@/lib/match";

type S = { family?: string | undefined };

export const Route = createFileRoute("/shop")({
  validateSearch: (s: Record<string, unknown>): S => ({ family: typeof s["family"] === "string" ? s["family"] : undefined }),
  head: () => ({
    meta: [
      { title: "Shop All Perfumes — Dhara" },
      { name: "description", content: "Browse Dhara perfumes and attars by ingredient, scent family and occasion." },
      { property: "og:title", content: "Shop All Perfumes — Dhara" },
      { property: "og:description", content: "Find your Dhara scent by ingredient, family and occasion." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Shop,
});

const toggle = (arr: string[], v: string) => (arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

function Shop() {
  const products = useProducts();
  const { family } = Route.useSearch();
  const [fam, setFam] = useState<string[]>(family ? [family] : []);
  const [ing, setIng] = useState<string[]>([]);
  const [occ, setOcc] = useState<string>("");
  const [who, setWho] = useState("All");
  const [sort, setSort] = useState("featured");

  const list = useMemo(() => {
    let l = products.filter((p) => matches(p, { fams: fam, ings: ing, occ, who }));
    if (sort === "low") l = [...l].sort((a, b) => a.price - b.price);
    if (sort === "high") l = [...l].sort((a, b) => b.price - a.price);
    return l;
  }, [products, fam, ing, occ, who, sort]);

  const active = fam.length + ing.length + (occ ? 1 : 0) + (who !== "All" ? 1 : 0);
  const reset = () => { setFam([]); setIng([]); setOcc(""); setWho("All"); };

  return (
    <>
      <PageHero eyebrow="The Collection" title="All Perfumes" image={hero} />
      <div className="mx-auto max-w-7xl px-6">
        <div className="border bg-card p-6 shadow-soft md:p-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Find your scent</p>
              <h2 className="mt-2 text-3xl md:text-4xl">Browse by what you love</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              <select aria-label="For" value={who} onChange={(e) => setWho(e.target.value)} className="border bg-background px-3 py-2 text-sm">
                {["All", "Him", "Her", "Unisex"].map((w) => <option key={w} value={w}>{w === "All" ? "For everyone" : `For ${w}`}</option>)}
              </select>
              <select aria-label="Sort" value={sort} onChange={(e) => setSort(e.target.value)} className="border bg-background px-3 py-2 text-sm">
                <option value="featured">Featured</option><option value="low">Price: Low to High</option><option value="high">Price: High to Low</option>
              </select>
            </div>
          </div>

          <div className="mt-8 grid gap-8">
            <div>
              <p className="mb-3 font-display text-lg italic">Ingredient</p>
              <div className="flex flex-wrap gap-2">
                {ingredients.map((i) => <Chip key={i} on={ing.includes(i)} onClick={() => setIng(toggle(ing, i))}>{i}</Chip>)}
              </div>
            </div>
            <div>
              <p className="mb-3 font-display text-lg italic">Scent family</p>
              <div className="flex flex-wrap gap-2">
                {fams.map((f) => <Chip key={f} on={fam.includes(f)} onClick={() => setFam(toggle(fam, f))}>{f}</Chip>)}
              </div>
            </div>
            <div>
              <p className="mb-3 font-display text-lg italic">Occasion</p>
              <div className="flex flex-wrap gap-2">
                {occasions.map((o) => <Chip key={o} on={occ === o} onClick={() => setOcc(occ === o ? "" : o)}>{o}</Chip>)}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between border-b pb-4">
          <p className="text-sm text-muted-foreground">{list.length} {list.length === 1 ? "fragrance" : "fragrances"}</p>
          {active > 0 && <button onClick={reset} className="border-b border-gold pb-0.5 text-xs tracking-widest text-gold uppercase">Clear {active} filter{active > 1 ? "s" : ""}</button>}
        </div>

        {list.length === 0 ? (
          <div className="py-24 text-center">
            <p className="font-display text-3xl italic">No scent matches every choice</p>
            <p className="mt-3 text-muted-foreground">Try removing a filter to see more of the collection.</p>
            <button onClick={reset} className="mt-8 bg-primary px-8 py-3 text-xs tracking-widest text-primary-foreground uppercase">Show all perfumes</button>
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
