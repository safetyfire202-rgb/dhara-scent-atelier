import { createFileRoute, Link } from "@tanstack/react-router";
import p1 from "@/assets/p1.jpg";
import p3 from "@/assets/p3.jpg";
import p4 from "@/assets/p4.jpg";
import p5 from "@/assets/p5.jpg";
import p6 from "@/assets/p6.jpg";
import hero from "@/assets/hero.jpg";
import { CtaBanner, InfoColumns, PageHero, Reveal, Tilt } from "@/components/site";
import { products } from "@/lib/products";

export const Route = createFileRoute("/collections")({
  head: () => ({
    meta: [
      { title: "Collections — Dhara" },
      { name: "description", content: "Explore Dhara's fragrance families: oriental, woody, floral, attar, fresh and aquatic." },
      { property: "og:title", content: "Collections — Dhara" },
      { property: "og:description", content: "Six fragrance families, one house." },
    ],
  }),
  component: Collections,
});

const cols = [
  { n: "Oriental", img: hero, d: "Warm amber, vanilla and smoke." },
  { n: "Woody", img: p1, d: "Cedar, leather and dark rose." },
  { n: "Attar", img: p3, d: "Pure oil perfumes, alcohol free." },
  { n: "Floral", img: p4, d: "Petals from dawn to dusk." },
  { n: "Aquatic", img: p5, d: "The breath of the sea." },
  { n: "Fresh", img: p6, d: "Citrus, green and bright." },
];

function Collections() {
  return (
    <>
      <PageHero eyebrow="Fragrance Families" title="Collections" image={p1} />
      <div className="mx-auto grid max-w-7xl gap-10 px-6 md:grid-cols-2 lg:grid-cols-3">
        {cols.map((c) => (
          <Reveal key={c.n}>
            <Tilt>
              <Link to="/shop" search={{ family: c.n }} className="group relative block overflow-hidden border">
                <img src={c.img} alt={c.n} loading="lazy" className="aspect-[3/4] w-full object-cover transition duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                <div className="absolute bottom-0 p-8" style={{ transform: "translateZ(50px)" }}>
                  <p className="eyebrow">{products.filter((p) => p.family === c.n).length} scents</p>
                  <h2 className="mt-2 text-5xl">{c.n}</h2>
                  <p className="mt-2 text-muted-foreground">{c.d}</p>
                </div>
              </Link>
            </Tilt>
          </Reveal>
        ))}
      </div>

      <InfoColumns
        eyebrow="A Short Guide"
        title="Reading the families"
        cols={[
          ["Warm families", "Oriental and woody scents are built on amber, vanilla, cedar and leather. They project confidently and suit evenings, winters and occasions."],
          ["Light families", "Fresh and aquatic scents lean on citrus, green leaves and marine air. They feel clean and effortless — ideal for daily wear and hot weather."],
          ["Petal & oil", "Florals celebrate a single bloom or a whole bouquet, while attars are pure oil perfumes: alcohol-free, intimate, and remarkably long-lived on skin."],
        ]}
      />

      <CtaBanner
        eyebrow="Still Deciding?"
        title="Let the Discovery Box choose for you"
        text="Six miniature vials spanning every family — wear each for a day and let your skin pick the winner."
        to="/gifting"
        label="See the Discovery Box"
      />
    </>
  );
}
