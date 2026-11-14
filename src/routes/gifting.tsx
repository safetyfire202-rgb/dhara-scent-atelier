import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import gift from "@/assets/gift.jpg";
import { CtaBanner, InfoColumns, PageHero, Reveal, Tilt, TrustBar } from "@/components/site";
import { inr } from "@/lib/products";

export const Route = createFileRoute("/gifting")({
  head: () => ({
    meta: [
      { title: "Luxury Gift Sets — Dhara" },
      { name: "description", content: "Curated Dhara perfume gift sets and discovery boxes, beautifully wrapped." },
      { property: "og:title", content: "Luxury Gift Sets — Dhara" },
      { property: "og:description", content: "Curated perfume gift sets, beautifully wrapped." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
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

      <InfoColumns
        eyebrow="The Details"
        title="Every gift, wrapped with care"
        cols={[
          ["Signature wrapping", "Hand-folded ivory paper, a burgundy ribbon and a wax seal — no extra charge, on every gift order."],
          ["A personal note", "Add a message at checkout and we will hand-write it on a card inside the box."],
          ["Occasion ready", "Weddings, anniversaries, festivals and corporate gifting — tell us the occasion and we will suggest the right set."],
        ]}
      />

      <TrustBar
        items={[
          ["Sparkles", "Keepsake boxes", "Packaging beautiful enough to keep."],
          ["Truck", "Timed delivery", "Choose a delivery date for the big day."],
          ["ShieldCheck", "Gift receipts", "Prices stay hidden inside the box."],
          ["Leaf", "Thoughtful materials", "Recycled paper and reusable cases."],
        ]}
      />

      <CtaBanner
        eyebrow="Need Advice?"
        title="Let us help you choose"
        text="Tell us who the gift is for and what they love, and our team will suggest the perfect scent within a day."
        to="/contact"
        label="Ask for a suggestion"
      />
    </>
  );
}
