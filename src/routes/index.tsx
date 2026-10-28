import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
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
  const [m, setM] = useState({ x: 0, y: 0 });
  const [sy, setSy] = useState(0);
  useEffect(() => {
    const f = () => setSy(window.scrollY);
    window.addEventListener("scroll", f);
    return () => window.removeEventListener("scroll", f);
  }, []);
  const families = [
    { n: "Oriental", img: hero }, { n: "Woody", img: p1 }, { n: "Attar", img: p3 },
    { n: "Floral", img: p4 }, { n: "Aquatic", img: p5 }, { n: "Fresh", img: p6 },
  ];
  return (
    <>
      <section
        className="relative -mt-[72px] flex min-h-screen items-center overflow-hidden"
        onMouseMove={(e) => setM({ x: e.clientX / window.innerWidth - 0.5, y: e.clientY / window.innerHeight - 0.5 })}
      >
        <img src={hero} alt="" width={1600} height={1008} className="absolute inset-0 h-full w-full scale-110 object-cover opacity-40 blur-sm" style={{ transform: `translateY(${sy * 0.3}px) scale(1.1)` }} />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 pt-24 md:grid-cols-2">
          <div style={{ transform: `translate3d(${m.x * -20}px, ${m.y * -20}px, 0)` }}>
            <p className="eyebrow">Maison de Parfum · Est. India</p>
            <h1 className="mt-6 text-7xl leading-[0.95] md:text-9xl">The art of <em className="text-gold-gradient">lingering</em></h1>
            <p className="mt-6 max-w-md text-lg text-muted-foreground">Perfumes and attars that stay with you from first light to last dance.</p>
            <div className="mt-10 flex gap-4">
              <Link to="/shop" className="bg-gold-gradient px-8 py-4 text-sm font-semibold tracking-widest text-primary-foreground uppercase shadow-glow transition hover:scale-105">Shop Now</Link>
              <Link to="/collections" className="border border-gold px-8 py-4 text-sm tracking-widest text-gold uppercase transition hover:bg-gold/10">Explore</Link>
            </div>
          </div>
          <div className="perspective flex justify-center">
            <div className="preserve-3d animate-float3d" style={{ transform: `rotateY(${m.x * 30}deg) rotateX(${-m.y * 20}deg)` }}>
              <div className="preserve-3d relative" style={{ transform: `rotateY(${m.x * 30}deg) rotateX(${-m.y * 20}deg)` }}>
                <img src={hero} alt="Amber Noir bottle" width={1600} height={1008} className="h-[520px] w-[420px] rounded-sm object-cover shadow-glow" />
                <div className="absolute -inset-6 -z-10 rounded-full bg-gold/20 blur-3xl" />
                <div className="absolute -bottom-6 -left-10 border bg-card/80 px-5 py-3 backdrop-blur" style={{ transform: "translateZ(80px)" }}>
                  <p className="eyebrow text-[0.6rem]">Bestseller</p>
                  <p className="font-display text-2xl">Amber Noir</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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
                  <div className="aspect-square overflow-hidden rounded-full border-2 border-gold/40">
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
                <span className="absolute bottom-0 w-full bg-ink/80 py-2 text-center font-display text-lg">{p.name}</span>
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
    </>
  );
}
