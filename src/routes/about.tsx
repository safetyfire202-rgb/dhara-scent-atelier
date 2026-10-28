import { createFileRoute } from "@tanstack/react-router";
import atelier from "@/assets/atelier.jpg";
import p3 from "@/assets/p3.jpg";
import { PageHero, Reveal, Tilt } from "@/components/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Our Story — Dhara" },
      { name: "description", content: "Dhara means a flowing stream. Discover the house, the craft and the people behind our perfumes." },
      { property: "og:title", content: "Our Story — Dhara" },
      { property: "og:description", content: "The house, the craft and the people behind Dhara." },
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
      </div>
    </>
  );
}
