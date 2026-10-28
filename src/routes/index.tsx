import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import slide1 from "@/assets/slide1.jpg";
import slide2 from "@/assets/slide2.jpg";
import slide3 from "@/assets/slide3.jpg";
import hero from "@/assets/hero.jpg";
import p1 from "@/assets/p1.jpg";
import p3 from "@/assets/p3.jpg";
import p4 from "@/assets/p4.jpg";
import p5 from "@/assets/p5.jpg";
import p6 from "@/assets/p6.jpg";
import gift from "@/assets/gift.jpg";
import atelier from "@/assets/atelier.jpg";
import { products } from "@/lib/products";
import { ProductCard, Reveal, Tilt } from "@/components/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dhara — Luxury Perfumes & Attars Crafted in India" },
      { name: "description", content: "Discover Dhara: long-lasting luxury perfumes, pure attars and gift sets, handcrafted in India." },
      { property: "og:title", content: "Dhara — Luxury Perfumes & Attars" },
      { property: "og:description", content: "Long-lasting luxury perfumes, pure attars and gift sets." },
    ],
  }),
  component: Index,
});

function Index() {
  const families = [
    { n: "Oriental", img: hero }, { n: "Woody", img: p1 }, { n: "Attar", img: p3 },
    { n: "Floral", img: p4 }, { n: "Aquatic", img: p5 }, { n: "Fresh", img: p6 },
  ];
  return (
    <>
      <HeroSlider />

      <section className="mx-auto max-w-7xl px-6 py-24">
        <Reveal>
          <p className="eyebrow text-center">Shop by Family</p>
          <h2 className="mt-3 text-center text-5xl md:text-6xl">Find your signature</h2>
        </Reveal>
        <div className="mt-14 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
          {families.map((f) => (
            <Reveal key={f.n}>
              <Tilt max={20}>
                <Link to="/shop" search={{ family: f.n }} className="group block">
                  <div className="aspect-square overflow-hidden rounded-full border border-border p-1 shadow-soft">
                    <img src={f.img} alt={f.n} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-125" />
                  </div>
                  <p className="mt-4 text-center font-display text-xl group-hover:text-gold">{f.n}</p>
                </Link>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <Reveal className="flex items-end justify-between">
          <div><p className="eyebrow">Bestsellers</p><h2 className="mt-3 text-5xl">Most loved</h2></div>
          <Link to="/shop" className="text-sm tracking-widest text-gold uppercase hover:underline">View all →</Link>
        </Reveal>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {products.slice(0, 8).map((p) => <Reveal key={p.slug}><ProductCard p={p} /></Reveal>)}
        </div>
      </section>

      <section className="perspective relative my-24 overflow-hidden py-32">
        <div className="mx-auto flex max-w-7xl flex-col items-center px-6">
          <p className="eyebrow">The Dhara Carousel</p>
          <h2 className="mt-3 mb-20 text-5xl">A world in every bottle</h2>
          <div className="preserve-3d relative h-[340px] w-[240px] animate-spin-y">
            {products.slice(0, 8).map((p, i) => (
              <Link key={p.slug} to="/product/$slug" params={{ slug: p.slug }} className="absolute inset-0 block overflow-hidden border border-gold/40" style={{ transform: `rotateY(${i * 45}deg) translateZ(420px)` }}>
                <img src={p.image} alt={p.name} loading="lazy" className="h-full w-full object-cover" />
                <span className="absolute bottom-0 w-full bg-card/90 py-2 text-center font-display text-lg">{p.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl items-center gap-16 px-6 py-12 md:grid-cols-2">
        <Reveal><Tilt><img src={atelier} alt="Dhara atelier" loading="lazy" width={1200} height={912} className="w-full shadow-glow" /></Tilt></Reveal>
        <Reveal>
          <p className="eyebrow">Our Craft</p>
          <h2 className="mt-3 text-5xl md:text-6xl">Rooted in Kannauj, made for the world</h2>
          <p className="mt-6 text-muted-foreground">Every Dhara fragrance begins with raw ingredients — roses, sandalwood, oud, saffron — blended slowly and aged until they sing.</p>
          <Link to="/about" className="mt-8 inline-block border-b border-gold pb-1 text-sm tracking-widest text-gold uppercase">Read our story</Link>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24">
        <Reveal>
          <Link to="/gifting" className="group relative block overflow-hidden">
            <img src={gift} alt="Gift sets" loading="lazy" width={1200} height={912} className="h-[480px] w-full object-cover transition duration-1000 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-transparent" />
            <div className="absolute inset-y-0 left-0 flex flex-col justify-center p-12">
              <p className="eyebrow">Gifting</p>
              <h2 className="mt-3 max-w-md text-6xl">Gifts that are remembered</h2>
              <span className="mt-6 text-sm tracking-widest text-gold uppercase">Discover sets →</span>
            </div>
          </Link>
        </Reveal>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-6 md:grid-cols-4">
        {[["12h+", "Lasting wear"], ["100%", "Cruelty free"], ["20+", "Signature scents"], ["50k", "Happy customers"]].map(([a, b]) => (
          <Reveal key={b}><Tilt><div className="border bg-card p-8 text-center"><p className="font-display text-5xl text-gold-gradient">{a}</p><p className="mt-2 text-sm tracking-widest text-muted-foreground uppercase">{b}</p></div></Tilt></Reveal>
        ))}
      </section>

      <ProcessSteps
        eyebrow="The Ritual"
        title="How to wear Dhara"
        steps={[
          ["Prepare the skin", "Apply to freshly moisturised skin — scent clings longest where the skin is soft and warm."],
          ["Pulse points only", "Wrists, neck and behind the ears. Two to four sprays is enough; never rub the scent in."],
          ["Let it settle", "Give the top notes ten minutes to open. The heart and base reveal themselves through the day."],
        ]}
      />

      <SplitInfo
        eyebrow="Ingredient Spotlight"
        title="Kannauj rose, Kashmir saffron"
        body="Each harvest season we travel to the source: damask roses picked before dawn in Kannauj, saffron threads graded by hand in Pampore, sandalwood aged in Mysore. These raw materials are what give every Dhara blend its depth."
        image={p2}
        alt="Kannauj roses"
        flip
        link={["/about", "Meet our makers"]}
      />

      <CtaBanner
        eyebrow="Begin Here"
        title="Not sure where to start?"
        text="Our Discovery Box holds six miniature vials of the bestsellers — find the one that feels like you before committing to a full bottle."
        to="/gifting"
        label="Explore the Discovery Box"
      />
    </>
  );
}

const slides = [
  { img: slide1, eyebrow: "Oud & Sandalwood", title: "Find the fragrance that defines you", text: "A curated house of perfumes crafted from the finest ingredients, made for moments worth remembering.", to: "/shop" as const },
  { img: slide2, eyebrow: "The White Rose Edit", title: "Soft light, lasting impressions", text: "Luminous florals that whisper from morning until midnight.", to: "/collections" as const },
  { img: slide3, eyebrow: "The Attar House", title: "Heritage, distilled", text: "Pure, alcohol-free attars made the way Indian royalty wore them.", to: "/attars" as const },
];

function HeroSlider() {
  const [i, setI] = useState(0);
  const [m, setM] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const t = setTimeout(() => setI((v) => (v + 1) % slides.length), 6500);
    return () => clearTimeout(t);
  }, [i]);
  const s = slides[i]!;
  return (
    <section
      className="relative h-screen min-h-[640px] overflow-hidden bg-ink"
      onMouseMove={(e) => setM({ x: e.clientX / window.innerWidth - 0.5, y: e.clientY / window.innerHeight - 0.5 })}
    >
      {slides.map((sl, k) => (
        <div key={k} className={`absolute inset-0 transition-opacity duration-[1400ms] ${k === i ? "opacity-100" : "opacity-0"}`}>
          <img
            src={sl.img}
            alt=""
            width={1920}
            height={1088}
            className={`h-full w-full object-cover ${k === i ? "animate-kenburns" : ""}`}
            style={{ translate: `${m.x * -24}px ${m.y * -16}px` }}
          />
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-r from-ink/75 via-ink/30 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />

      <div key={i} className="relative mx-auto flex h-full max-w-[1440px] flex-col justify-end px-6 pb-24 lg:px-10">
        <p className="eyebrow animate-in fade-in slide-in-from-bottom-4 text-gold-soft duration-700">{s.eyebrow}</p>
        <h1 className="animate-in fade-in slide-in-from-bottom-6 mt-5 max-w-3xl text-5xl leading-[1.05] text-on-image duration-1000 md:text-7xl">{s.title}</h1>
        <p className="animate-in fade-in slide-in-from-bottom-6 mt-6 max-w-xl text-lg font-light text-on-image/85 duration-1000">{s.text}</p>
        <Link to={s.to} className="group animate-in fade-in mt-10 flex w-fit items-center gap-1 duration-1000">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-on-image text-ink transition-transform duration-500 group-hover:rotate-45">
            <ArrowUpRight className="h-5 w-5" />
          </span>
          <span className="flex h-14 items-center rounded-full bg-on-image px-9 text-sm tracking-wider text-ink transition group-hover:bg-gold-soft">Shop Now</span>
        </Link>
      </div>

      <div className="absolute right-6 bottom-24 hidden gap-5 md:flex lg:right-10">
        {slides.map((sl, k) => (
          <button key={k} onClick={() => setI(k)} aria-label={`Show ${sl.eyebrow}`} className="perspective relative h-24 w-24">
            <svg viewBox="0 0 100 100" className="absolute -inset-2 h-28 w-28 -rotate-90">
              {k === i && <circle key={i} cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="283" className="text-on-image [animation:ring_6.5s_linear_forwards]" />}
            </svg>
            <img src={sl.img} alt="" className={`h-24 w-24 rounded-full object-cover transition duration-500 ${k === i ? "scale-100" : "scale-90 opacity-70 grayscale hover:opacity-100 hover:grayscale-0"}`} />
          </button>
        ))}
      </div>

      <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 text-[0.65rem] tracking-[0.4em] text-on-image/70 uppercase md:block">Scroll</div>
    </section>
  );
}
