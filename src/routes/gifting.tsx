import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import gift from "@/assets/gift.jpg";
import { PageHero, Reveal, Tilt } from "@/components/site";
import { inr } from "@/lib/products";

export const Route = createFileRoute("/gifting")({
  head: () => ({
    meta: [
      { title: "Luxury Gift Sets — Dhara" },
      { name: "description", content: "Curated Dhara perfume gift sets and discovery boxes, beautifully wrapped." },
      { property: "og:title", content: "Luxury Gift Sets — Dhara" },
      { property: "og:description", content: "Curated perfume gift sets, beautifully wrapped." },
    ],
  }),
  component: Gifting,
});

const sets = [
  { n: "Discovery Box", d: "Six 5ml vials of our bestsellers", price: 1499 },
  { n: "His & Hers", d: "Two 50ml perfumes in a keepsake box", price: 3999 },
  { n: "Attar Treasury", d: "Four pure attars in a carved case", price: 4999 },
];

function Gifting() {
  return (
    <>
      <PageHero eyebrow="For Someone Special" title="The Gifting Edit" image={gift} />
      <div className="mx-auto grid max-w-7xl gap-10 px-6 md:grid-cols-3">
        {sets.map((s) => (
          <Reveal key={s.n}>
            <Tilt>
              <div className="border bg-card">
                <img src={gift} alt={s.n} loading="lazy" className="aspect-[4/3] w-full object-cover" />
                <div className="p-6">
                  <h2 className="text-3xl">{s.n}</h2>
                  <p className="mt-2 text-muted-foreground">{s.d}</p>
                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-gold">{inr(s.price)}</span>
                    <button onClick={() => toast.success(`${s.n} reserved — we'll be in touch`)} className="border border-gold px-4 py-2 text-xs tracking-widest text-gold uppercase hover:bg-primary hover:text-primary-foreground">Reserve</button>
                  </div>
                </div>
              </div>
            </Tilt>
          </Reveal>
        ))}
      </div>
    </>
  );
}
