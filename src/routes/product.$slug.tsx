import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { getProduct, inr, products } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { ProductCard, Reveal, Tilt } from "@/components/site";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => {
    const p = getProduct(params.slug);
    if (!p) throw notFound();
    return p;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.name} — Dhara` },
          { name: "description", content: `${loaderData.name}: ${loaderData.tagline}. ${loaderData.family} fragrance by Dhara.` },
          { property: "og:title", content: `${loaderData.name} — Dhara` },
          { property: "og:description", content: loaderData.tagline },
        ]
      : [{ title: "Fragrance not found — Dhara" }, { name: "robots", content: "noindex" }],
  }),
  notFoundComponent: () => (
    <div className="py-40 text-center"><h1 className="text-5xl">Fragrance not found</h1><Link to="/shop" className="mt-6 inline-block text-gold">Back to shop</Link></div>
  ),
  component: ProductPage,
});

function ProductPage() {
  const p = Route.useLoaderData();
  const { add } = useCart();
  const [size, setSize] = useState(50);
  const price = Math.round(p.price * (size === 100 ? 1.7 : size === 20 ? 0.5 : 1));
  const related = products.filter((x) => x.family === p.family && x.slug !== p.slug).slice(0, 4);
  return (
    <div className="mx-auto max-w-7xl px-6 pt-32 pb-16">
      <div className="grid gap-16 md:grid-cols-2">
        <Tilt max={18}>
          <div className="relative">
            <img src={p.image} alt={p.name} width={800} height={1008} className="aspect-[4/5] w-full object-cover shadow-glow" />
            <div className="absolute top-6 left-6 bg-card/85 px-4 py-2 backdrop-blur" style={{ transform: "translateZ(60px)" }}><span className="eyebrow">{p.family}</span></div>
          </div>
        </Tilt>
        <div className="flex flex-col justify-center">
          <p className="eyebrow">For {p.for} · Eau de Parfum</p>
          <h1 className="mt-4 text-6xl md:text-7xl">{p.name}</h1>
          <p className="mt-3 font-display text-2xl text-muted-foreground italic">{p.tagline}</p>
          <p className="mt-8 font-display text-4xl text-primary">{inr(price)}</p>
          <div className="mt-8 flex gap-3">
            {[20, 50, 100].map((s) => (
              <button key={s} onClick={() => setSize(s)} className={`border px-6 py-3 text-sm transition ${size === s ? "border-gold bg-gold/10 text-gold" : "hover:border-gold"}`}>{s} ml</button>
            ))}
          </div>
          <button onClick={() => { add(p.slug); toast.success(`${p.name} added to bag`); }} className="mt-8 bg-gold-gradient py-4 text-sm font-semibold tracking-widest text-primary-foreground uppercase shadow-glow transition hover:scale-[1.02]">Add to Bag</button>
          <div className="mt-12 grid grid-cols-3 gap-4">
            {[["Top", p.top], ["Heart", p.heart], ["Base", p.base]].map(([k, v]) => (
              <Tilt key={k}><div className="border bg-card p-4 text-center"><p className="eyebrow text-[0.6rem]">{k} Notes</p><p className="mt-2 text-sm">{v}</p></div></Tilt>
            ))}
          </div>
        </div>
      </div>
      {related.length > 0 && (
        <section className="mt-32">
          <h2 className="text-5xl">You may also love</h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">{related.map((r) => <Reveal key={r.slug}><ProductCard p={r} /></Reveal>)}</div>
        </section>
      )}
    </div>
  );
}
