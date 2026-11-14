import { createFileRoute } from "@tanstack/react-router";
import p3 from "@/assets/p3.jpg";
import { useProducts } from "@/lib/catalog";
import { InfoColumns, PageHero, ProcessSteps, ProductCard, Reveal, TrustBar } from "@/components/site";

export const Route = createFileRoute("/attars")({
  head: () => ({
    meta: [
      { title: "Pure Attars — Dhara" },
      { name: "description", content: "Alcohol-free attars from Dhara: oud, saffron, rose and mitti, distilled the traditional way." },
      { property: "og:title", content: "Pure Attars — Dhara" },
      { property: "og:description", content: "Alcohol-free attars distilled the traditional way." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Attars,
});

function Attars() {
  const products = useProducts();
  return (
    <>
      <PageHero eyebrow="Alcohol Free · Traditional" title="The Attar House" image={p3}>
        <p className="mt-6 max-w-lg text-muted-foreground">Copper degs, slow fire and patience — our attars are distilled the centuries-old way, then rested until perfect.</p>
      </PageHero>
      <div className="mx-auto grid max-w-7xl gap-8 px-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.filter((p) => p.family === "Attar").map((p) => <Reveal key={p.slug}><ProductCard p={p} /></Reveal>)}
      </div>

      <ProcessSteps
        eyebrow="The Craft"
        title="How an attar is born"
        steps={[
          ["The deg", "Fresh petals or woods are sealed into a copper still with water and heated over a slow wood fire for hours."],
          ["The bhapka", "The fragrant steam travels through a bamboo pipe into a receiving vessel of sandalwood oil, which absorbs the scent."],
          ["The rest", "The young attar is then rested in leather bottles for months — sometimes a year — until the edges soften into silk."],
        ]}
      />

      <InfoColumns
        eyebrow="Wearing Attars"
        title="A different kind of perfume"
        cols={[
          ["A drop is enough", "Attars are pure oil. One small drop on the wrist or behind the ear warms with your skin and lasts all day."],
          ["No alcohol, ever", "Gentle on sensitive skin and suitable for those who avoid alcohol-based sprays."],
          ["Closer to you", "Attars don't shout across a room — they stay in your personal space, revealing themselves to those who come near."],
        ]}
      />

      <TrustBar
        items={[
          ["Leaf", "100% natural oils", "No alcohol, no synthetic dilutions."],
          ["Sparkles", "Aged for months", "Rested in traditional leather bottles."],
          ["ShieldCheck", "Heritage method", "Distilled in Kannauj, the perfume capital of India."],
          ["Truck", "Secure delivery", "Leak-proof vials, shipped across India."],
        ]}
      />
    </>
  );
}
