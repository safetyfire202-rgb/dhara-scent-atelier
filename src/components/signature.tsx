import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site";

const origins = [
  { n: "Saffron", r: "Pampore, Kashmir", x: 34, y: 12, s: "Hand-picked at dawn each October, three crimson threads per flower.", slug: "saffron-vibes" },
  { n: "Rose", r: "Kannauj, Uttar Pradesh", x: 47, y: 32, s: "Damask petals distilled into sandalwood in copper deg stills, as for 400 years.", slug: "attar-al-reem" },
  { n: "Mitti", r: "Kannauj, Uttar Pradesh", x: 50, y: 36, s: "Sun-baked earth distilled to capture the scent of the first monsoon rain.", slug: "ebony" },
  { n: "Vetiver", r: "Bharatpur, Rajasthan", x: 38, y: 38, s: "Cool, smoky roots of khus — the grass once woven into summer screens.", slug: "wild" },
  { n: "Jasmine", r: "Madurai, Tamil Nadu", x: 48, y: 82, s: "Malli buds gathered closed at dusk, opening their scent through the night.", slug: "orchid" },
  { n: "Sandalwood", r: "Mysuru, Karnataka", x: 42, y: 74, s: "Creamy heartwood, aged slowly — the soft base of every Dhara attar.", slug: "imperial-oud" },
];

export function ScentOrigins() {
  const [a, setA] = useState(0);
  const o = origins[a]!;
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <Reveal>
        <p className="eyebrow">Notes of India</p>
        <h2 className="mt-3 max-w-2xl text-5xl md:text-6xl">Every note has a home</h2>
        <p className="mt-5 max-w-xl text-muted-foreground">We travel to the source. Choose an ingredient to see where it grows and the scent it becomes.</p>
      </Reveal>
      <div className="mt-14 grid items-center gap-12 md:grid-cols-[1fr_1.1fr]">
        <div className="relative mx-auto aspect-[4/5] w-full max-w-md border bg-card shadow-soft">
          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full text-gold/25" preserveAspectRatio="none" aria-hidden>
            {[20, 40, 60, 80].map((v) => <line key={v} x1={v} y1="0" x2={v} y2="100" stroke="currentColor" strokeWidth="0.15" />)}
            {[20, 40, 60, 80].map((v) => <line key={"h" + v} x1="0" y1={v} x2="100" y2={v} stroke="currentColor" strokeWidth="0.15" />)}
          </svg>
          <p className="absolute top-4 left-4 font-display text-sm text-muted-foreground italic">Bhārat · an olfactive map</p>
          {origins.map((p, i) => (
            <button key={p.n} onClick={() => setA(i)} style={{ left: `${p.x}%`, top: `${p.y}%` }} className="group absolute -translate-x-1/2 -translate-y-1/2" aria-label={p.n}>
              <span className={`block h-3 w-3 rounded-full border border-gold transition ${i === a ? "scale-150 bg-gold" : "bg-card group-hover:bg-gold/50"}`} />
              {i === a && <span className="absolute inset-0 animate-ping rounded-full border border-gold" />}
              <span className={`absolute left-5 top-1/2 -translate-y-1/2 whitespace-nowrap text-xs tracking-widest uppercase ${i === a ? "text-primary" : "text-muted-foreground"}`}>{p.n}</span>
            </button>
          ))}
        </div>
        <div>
          <div className="flex flex-wrap gap-3">
            {origins.map((p, i) => (
              <button key={p.n} onClick={() => setA(i)} className={`border px-5 py-2 text-xs tracking-widest uppercase transition ${i === a ? "border-primary bg-primary text-primary-foreground" : "hover:border-gold"}`}>{p.n}</button>
            ))}
          </div>
          <div key={o.n} className="mt-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <p className="eyebrow">{o.r}</p>
            <h3 className="mt-3 text-6xl text-gold-gradient">{o.n}</h3>
            <p className="mt-5 max-w-md font-display text-xl leading-relaxed italic">“{o.s}”</p>
            <Link to="/product/$slug" params={{ slug: o.slug }} className="mt-8 inline-block border-b border-gold pb-1 text-sm tracking-widest text-gold uppercase">Discover the scent</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function GoldCursor() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const el = ref.current; if (!el) return;
    el.style.display = "block";
    let x = 0, y = 0, cx = 0, cy = 0, raf = 0;
    const mv = (e: PointerEvent) => {
      x = e.clientX; y = e.clientY;
      const t = e.target as HTMLElement;
      el.classList.toggle("scale-[2.2]", !!t.closest("a,button"));
    };
    const loop = () => { cx += (x - cx) * 0.18; cy += (y - cy) * 0.18; el.style.translate = `${cx - 14}px ${cy - 14}px`; raf = requestAnimationFrame(loop); };
    window.addEventListener("pointermove", mv); loop();
    return () => { window.removeEventListener("pointermove", mv); cancelAnimationFrame(raf); };
  }, []);
  return <div ref={ref} aria-hidden className="pointer-events-none fixed top-0 left-0 z-[70] hidden h-7 w-7 rounded-full border border-gold transition-transform duration-300 mix-blend-multiply" />;
}
