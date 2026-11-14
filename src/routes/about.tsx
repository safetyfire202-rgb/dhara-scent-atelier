import { createFileRoute } from "@tanstack/react-router";
import atelier from "@/assets/atelier.jpg";
import p3 from "@/assets/p3.jpg";
import { CtaBanner, PageHero, Reveal, Tilt } from "@/components/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Our Story — Dhara" },
      { name: "description", content: "Dhara means a flowing stream. Discover the house, the craft and the people behind our perfumes." },
      { property: "og:title", content: "Our Story — Dhara" },
      { property: "og:description", content: "The house, the craft and the people behind Dhara." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

function About() {
  return (
    <>
      <PageHero eyebrow="Our Story" title="A stream of scent" image={atelier} />
      <div className="mx-auto max-w-7xl space-y-32 px-6">
        <section className="grid items-center gap-16 md:grid-cols-2">
          <Reveal><Tilt><img src={atelier} alt="Atelier" loading="lazy" className="w-full shadow-glow" /></Tilt></Reveal>
          <Reveal>
            <h2 className="text-5xl">Dhara — the flow</h2>
            <p className="mt-6 text-muted-foreground">In Sanskrit, dhara is a continuous stream. That is how we think of fragrance: not a moment, but a current that carries memory, mood and identity through your day.</p>
          </Reveal>
        </section>
        <section className="grid items-center gap-16 md:grid-cols-2">
          <Reveal className="md:order-2"><Tilt><img src={p3} alt="Attar" loading="lazy" className="w-full shadow-glow" /></Tilt></Reveal>
          <Reveal>
            <h2 className="text-5xl">Ingredients first</h2>
            <p className="mt-6 text-muted-foreground">We source rose from Kannauj, saffron from Kashmir and sandalwood from Mysore, then blend with modern accords in small batches.</p>
          </Reveal>
        </section>
        <section className="grid gap-8 md:grid-cols-3">
          {[["Sourced", "Ethical, traceable raw materials."], ["Aged", "Every blend matures for weeks."], ["Lasting", "High concentration for all-day wear."]].map(([t, d]) => (
            <Reveal key={t}><Tilt><div className="border bg-card p-10"><h3 className="text-4xl text-gold-gradient">{t}</h3><p className="mt-4 text-muted-foreground">{d}</p></div></Tilt></Reveal>
          ))}
        </section>

        <section>
          <Reveal>
            <p className="eyebrow text-center">The Journey</p>
            <h2 className="mt-3 text-center text-5xl md:text-6xl">From a single still to a house</h2>
          </Reveal>
          <div className="mt-14 grid gap-10 md:grid-cols-4">
            {[
              ["2016", "The first still", "A copper deg in Kannauj and one rose attar, made for family and friends."],
              ["2019", "The atelier opens", "Our blending studio in Jaipur welcomes its first perfumers and apprentices."],
              ["2022", "Twenty signatures", "The full Dhara collection launches — perfumes and attars, side by side."],
              ["2026", "Across India", "Fifty thousand customers and counting, with the same small-batch promise."],
            ].map(([y, t, d]) => (
              <Reveal key={y}>
                <div className="border-l-2 border-gold/50 pl-6">
                  <p className="font-display text-4xl text-gold-gradient">{y}</p>
                  <h3 className="mt-3 text-2xl">{t}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section>
          <Reveal>
            <p className="eyebrow text-center">What We Believe</p>
            <h2 className="mt-3 text-center text-5xl md:text-6xl">Our values</h2>
          </Reveal>
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {[
              ["Patience over speed", "A blend is ready when it is ready. Some of our attars rest for a full year before bottling."],
              ["Honesty in ingredients", "Every formula lists its true materials. No hidden fillers, no shortcuts, no synthetic stand-ins for naturals."],
              ["Craft over trend", "We make scents meant to be worn for decades, not seasons. Classics, not novelties."],
            ].map(([t, d]) => (
              <Reveal key={t}>
                <Tilt><div className="h-full border bg-card p-10 shadow-soft"><h3 className="text-3xl">{t}</h3><p className="mt-4 text-muted-foreground">{d}</p></div></Tilt>
              </Reveal>
            ))}
          </div>
        </section>

        <CtaBanner
          eyebrow="Experience It"
          title="Smell the story yourself"
          text="Words only go so far. Explore the collection and find the fragrance that carries your own story."
          to="/shop"
          label="Shop the collection"
        />
      </div>
    </>
  );
}
