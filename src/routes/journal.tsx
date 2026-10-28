import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import atelier from "@/assets/atelier.jpg";
import p1 from "@/assets/p1.jpg";
import p3 from "@/assets/p3.jpg";
import p6 from "@/assets/p6.jpg";
import { PageHero, Reveal, Tilt } from "@/components/site";

export const Route = createFileRoute("/journal")({
  head: () => ({
    meta: [
      { title: "The Journal — Dhara" },
      { name: "description", content: "Stories, guides and rituals from the world of Dhara perfumes." },
      { property: "og:title", content: "The Journal — Dhara" },
      { property: "og:description", content: "Stories, guides and rituals from Dhara." },
    ],
  }),
  component: Journal,
});

const posts = [
  { t: "How to make perfume last all day", img: p1, b: "Apply to pulse points on moisturised skin, never rub, and layer with an unscented balm. Store bottles away from heat and light." },
  { t: "Attar vs perfume: what's the difference?", img: p3, b: "Attars are oil-based and alcohol-free, sitting close to the skin for hours. Perfumes project more and evolve faster." },
  { t: "Building a fragrance wardrobe", img: p6, b: "Start with one fresh scent for the day, one woody or oriental for evenings, and one statement attar for occasions." },
  { t: "Inside the Dhara atelier", img: atelier, b: "A day with our perfumers — from weighing rose absolute to the slow resting of a new blend." },
];

function Journal() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <>
      <PageHero eyebrow="Journal" title="Notes on scent" image={atelier} />
      <div className="mx-auto grid max-w-7xl gap-10 px-6 md:grid-cols-2">
        {posts.map((p, i) => (
          <Reveal key={p.t}>
            <Tilt max={8}>
              <article className="cursor-pointer border bg-card" onClick={() => setOpen(open === i ? null : i)}>
                <img src={p.img} alt="" loading="lazy" className="aspect-[16/10] w-full object-cover" />
                <div className="p-8">
                  <p className="eyebrow text-[0.6rem]">5 min read</p>
                  <h2 className="mt-2 text-3xl">{p.t}</h2>
                  <p className={`mt-4 overflow-hidden text-muted-foreground transition-all duration-500 ${open === i ? "max-h-40" : "max-h-0"}`}>{p.b}</p>
                  <span className="mt-4 inline-block text-xs tracking-widest text-gold uppercase">{open === i ? "Close" : "Read"}</span>
                </div>
              </article>
            </Tilt>
          </Reveal>
        ))}
      </div>
    </>
  );
}
