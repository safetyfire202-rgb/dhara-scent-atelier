import { createFileRoute } from "@tanstack/react-router";
import p3 from "@/assets/p3.jpg";
import { products } from "@/lib/products";
import { PageHero, ProductCard, Reveal } from "@/components/site";

export const Route = createFileRoute("/attars")({
  head: () => ({
    meta: [
      { title: "Pure Attars — Dhara" },
      { name: "description", content: "Alcohol-free attars from Dhara: oud, saffron, rose and mitti, distilled the traditional way." },
      { property: "og:title", content: "Pure Attars — Dhara" },
      { property: "og:description", content: "Alcohol-free attars distilled the traditional way." },
    ],
  }),
  component: Attars,
});

function Attars() {
  return (
    <>
      <PageHero eyebrow="Alcohol Free · Traditional" title="The Attar House" image={p3}>
        <p className="mt-6 max-w-lg text-muted-foreground">Copper degs, slow fire and patience — our attars are distilled the centuries-old way, then rested until perfect.</p>
      </PageHero>
      <div className="mx-auto grid max-w-7xl gap-8 px-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.filter((p) => p.family === "Attar").map((p) => <Reveal key={p.slug}><ProductCard p={p} /></Reveal>)}
      </div>
    </>
  );
}
