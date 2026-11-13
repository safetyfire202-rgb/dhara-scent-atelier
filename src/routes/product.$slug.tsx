import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { inr } from "@/lib/products";
import { productsQuery, useProducts } from "@/lib/catalog";
import { useCart } from "@/lib/cart";
import { ProductCard, Reveal, Tilt, TrustBar, InfoColumns } from "@/components/site";
import { noteMeta, originsFor, stories } from "@/lib/editorial";

export const Route = createFileRoute("/product/$slug")({
  loader: async ({ params, context }) => {
    const rows = await context.queryClient.ensureQueryData(productsQuery);
    const r = rows.find((x) => x.slug === params.slug);
    if (!r) throw notFound();
    return r;
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
  errorComponent: () => <div className="py-40 text-center"><h1 className="text-4xl">This fragrance didn't load</h1><Link to="/shop" className="mt-6 inline-block text-gold">Back to shop</Link></div>,
  notFoundComponent: () => (
    <div className="py-40 text-center"><h1 className="text-5xl">Fragrance not found</h1><Link to="/shop" className="mt-6 inline-block text-gold">Back to shop</Link></div>
  ),
  component: ProductPage,
});

function ProductPage() {
  const p = Route.useLoaderData();
  const products = useProducts();
  const { add } = useCart();
  const [size, setSize] = useState(50);
  const [shot, setShot] = useState(0);
  const main = p.gallery[shot] ?? p.image;
  const price = Math.round(p.price * (size === 100 ? 1.7 : size === 20 ? 0.5 : 1));
  const related = products.filter((x) => x.family === p.family && x.slug !== p.slug).slice(0, 4);
  const origins = originsFor(p);
  return (
    <div className="mx-auto max-w-7xl px-6 pt-32 pb-16">
      <div className="grid gap-16 md:grid-cols-2">
        <Tilt max={18}>
          <div className="relative">
            <img src={main} alt={p.name} width={800} height={1008} className="aspect-[4/5] w-full bg-card object-cover shadow-glow" />
            <div className="absolute top-6 left-6 bg-card/85 px-4 py-2 backdrop-blur" style={{ transform: "translateZ(60px)" }}><span className="eyebrow">{p.family}</span></div>
          </div>
        </Tilt>
        {p.gallery.length > 1 && (
          <div className="-mt-10 flex flex-wrap gap-3 md:col-start-1">
            {p.gallery.map((g, i) => (
              <button key={g} onClick={() => setShot(i)} aria-label={`Photo ${i + 1}`} className={`h-20 w-16 overflow-hidden border transition ${i === shot ? "border-gold" : "opacity-70 hover:opacity-100"}`}>
                <img src={g} alt="" loading="lazy" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        )}
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
          <button disabled={p.stock < 1} onClick={() => { add(p.slug); toast.success(`${p.name} added to bag`); }} className="mt-8 bg-gold-gradient py-4 text-sm font-semibold tracking-widest text-primary-foreground uppercase shadow-glow transition hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100">{p.stock < 1 ? "Sold out" : "Add to Bag"}</button>
          <div className="mt-12 grid grid-cols-3 gap-4">
            {[["Top", p.top], ["Heart", p.heart], ["Base", p.base]].map(([k, v]) => (
              <Tilt key={k}><div className="border bg-card p-4 text-center"><p className="eyebrow text-[0.6rem]">{k} Notes</p><p className="mt-2 text-sm">{v}</p></div></Tilt>
            ))}
          </div>
        </div>
      </div>
      <Reveal>
        <section className="mx-auto mt-32 max-w-3xl text-center">
          <p className="eyebrow text-center">The Story</p>
          <h2 className="mt-4 text-4xl md:text-5xl">Behind {p.name}</h2>
          <p className="mt-8 font-display text-xl leading-relaxed italic md:text-2xl">“{stories[p.slug] ?? p.tagline}”</p>
          <p className="mt-6 text-xs tracking-[0.35em] text-muted-foreground uppercase">— The Dhara Atelier</p>
        </section>
      </Reveal>

      <section className="mt-32">
        <Reveal><p className="eyebrow">The Composition</p><h2 className="mt-3 text-4xl md:text-5xl">How it unfolds</h2></Reveal>
        <div className="mt-12 grid border-t md:grid-cols-3">
          {noteMeta.map((m, i) => (
            <Reveal key={m.k}>
              <div className={`h-full border-b py-10 md:border-b-0 md:px-8 ${i > 0 ? "md:border-l" : "md:pl-0"}`}>
                <p className="font-display text-5xl text-gold-gradient">0{i + 1}</p>
                <p className="mt-6 eyebrow">{m.k} Notes · {m.when}</p>
                <h3 className="mt-4 text-3xl">{i === 0 ? p.top : i === 1 ? p.heart : p.base}</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{m.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {origins.length > 0 && (
        <section className="mt-32 border bg-card p-8 shadow-soft md:p-14">
          <Reveal><p className="eyebrow">Ingredient Origins</p><h2 className="mt-3 text-4xl md:text-5xl">Where it comes from</h2></Reveal>
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {origins.map((o) => (
              <Reveal key={o.region}>
                <p className="text-xs tracking-[0.3em] text-gold uppercase">{o.region}</p>
                <h3 className="mt-3 text-3xl">{o.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{o.note}</p>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      <TrustBar items={[["Leaf", "Pure oils", "High-concentration extrait blended in small batches."], ["Sparkles", "8–12 hour wear", "Layered to unfold from opening to dry-down."], ["ShieldCheck", "Authentic", "Sealed and batch-numbered at our atelier."], ["Truck", "Free shipping", "On orders above ₹999, beautifully boxed."]]} />
      <InfoColumns eyebrow="The Ritual" title="Wearing it well" cols={[["Pulse points", "Apply to wrists, neck and behind the ears where warmth lifts the scent."], ["Don't rub", "Let it settle on its own — rubbing breaks the top notes too soon."], ["Store gently", "Keep away from sunlight and heat to protect the oils for years."]]} />
      {related.length > 0 && (
        <section className="mt-32">
          <h2 className="text-5xl">You may also love</h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">{related.map((r) => <Reveal key={r.slug}><ProductCard p={r} /></Reveal>)}</div>
        </section>
      )}
    </div>
  );
}
