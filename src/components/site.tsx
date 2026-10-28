import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode, type MouseEvent } from "react";
import { ShoppingBag, Menu, X, Leaf, ShieldCheck, Sparkles, Truck, type LucideIcon } from "lucide-react";
import { toast } from "sonner";
import logo from "@/assets/logo-bright.png";
import logoDeep from "@/assets/logo-deep.png";
import { useCart } from "@/lib/cart";
import { inr, type Product } from "@/lib/products";

const nav = [
  { to: "/shop", label: "Shop" },
  { to: "/collections", label: "Collections" },
  { to: "/attars", label: "Attars" },
  { to: "/gifting", label: "Gifting" },
  { to: "/about", label: "Story" },
  { to: "/journal", label: "Journal" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const path = useRouterState({ select: (r) => r.location.pathname });
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 40);
    f();
    window.addEventListener("scroll", f);
    return () => window.removeEventListener("scroll", f);
  }, []);
  const overlay = path === "/" && !scrolled && !open;
  const linkCls = `group relative text-[0.78rem] tracking-[0.22em] uppercase transition ${overlay ? "text-on-image/90 hover:text-on-image" : "text-foreground/75 hover:text-primary"}`;
  const left = nav.slice(0, 4);
  const right = nav.slice(4);
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${overlay ? "border-b border-on-image/20 bg-transparent" : "border-b bg-background/90 shadow-soft backdrop-blur-xl"}`}>
      {overlay && <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-ink/45 to-transparent" />}
      <div className="mx-auto grid h-20 max-w-[1440px] grid-cols-[1fr_auto_1fr] items-center px-6 lg:px-10">
        <div className="flex items-center gap-8">
          <button className={`lg:hidden ${overlay ? "text-on-image" : ""}`} onClick={() => setOpen(!open)} aria-label="Menu">{open ? <X /> : <Menu />}</button>
          <nav className="hidden gap-8 lg:flex">
            {left.map((n) => (
              <Link key={n.to} to={n.to} className={linkCls}>
                {n.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-current transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>
        </div>
        <Link to="/" className="flex h-20 flex-col items-center justify-center px-7">
          <img src={overlay ? logo : logoDeep} alt="" width={30} height={30} className={`h-8 w-8 transition-all duration-500 ${overlay ? "[filter:drop-shadow(0_0_5px_oklch(0_0_0/85%))_drop-shadow(0_1px_2px_oklch(0_0_0/80%))]" : ""}`} />
          <span className={`font-display text-xl font-semibold tracking-[0.3em] transition-colors duration-500 ${overlay ? "text-on-image [text-shadow:0_1px_12px_oklch(0_0_0/60%)]" : "text-primary"}`}>DHARA</span>
          <span className={`text-[0.55rem] tracking-[0.45em] transition-colors duration-500 ${overlay ? "text-on-image/85 [text-shadow:0_1px_8px_oklch(0_0_0/70%)]" : "text-primary/55"}`}>PARFUMS</span>
        </Link>
        <div className="flex items-center justify-end gap-8">
          <nav className="hidden gap-8 lg:flex">
            {right.map((n) => (
              <Link key={n.to} to={n.to} className={linkCls}>
                {n.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-current transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>
          <Link to="/cart" className={`relative ${overlay ? "text-on-image" : "text-foreground hover:text-primary"}`} aria-label="Bag">
            <ShoppingBag className="h-5 w-5" strokeWidth={1.5} />
            {count > 0 && <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-gold text-[10px] font-semibold text-on-image">{count}</span>}
          </Link>
        </div>
      </div>
      {open && (
        <nav className="flex flex-col gap-4 border-t bg-background px-6 py-8 lg:hidden">
          {nav.map((n) => <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="font-display text-3xl">{n.label}</Link>)}
        </nav>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="mt-32 border-t bg-secondary">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-4">
        <div>
          <p className="font-display text-4xl tracking-[0.3em] text-primary">DHARA</p>
          <p className="mt-4 text-sm text-muted-foreground">Fine fragrances and attars, crafted to linger like a memory.</p>
        </div>
        {[
          ["Shop", [["/shop", "All Perfumes"], ["/collections", "Collections"], ["/attars", "Attars"], ["/gifting", "Gift Sets"]]],
          ["House", [["/about", "Our Story"], ["/journal", "Journal"], ["/contact", "Contact"]]],
          ["Help", [["/faq", "FAQ"], ["/cart", "Your Bag"]]],
        ].map(([h, links]) => (
          <div key={h as string}>
            <p className="eyebrow mb-4">{h as string}</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {(links as [string, string][]).map(([to, l]) => (
                <li key={to}><Link to={to} className="hover:text-gold">{l}</Link></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="border-t py-6 text-center text-xs tracking-widest text-muted-foreground">© 2026 DHARA PARFUMS · ALL RIGHTS RESERVED</p>
    </footer>
  );
}

export function Tilt({ children, className = "", max = 14 }: { children: ReactNode; className?: string; max?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const move = (e: MouseEvent) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `rotateY(${x * max}deg) rotateX(${-y * max}deg) translateZ(10px)`;
    el.style.setProperty("--gx", `${(x + 0.5) * 100}%`);
    el.style.setProperty("--gy", `${(y + 0.5) * 100}%`);
  };
  const leave = () => { if (ref.current) ref.current.style.transform = ""; };
  return (
    <div className="perspective">
      <div ref={ref} onMouseMove={move} onMouseLeave={leave} className={`preserve-3d relative transition-transform duration-300 ease-out ${className}`}>
        {children}
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 hover:opacity-100 [background:radial-gradient(circle_at_var(--gx)_var(--gy),oklch(0.9_0.09_88/25%),transparent_50%)] group-hover:opacity-100" />
      </div>
    </div>
  );
}

export function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e?.isIntersecting) { el.classList.add("in"); io.disconnect(); } }, { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
}

export function ProductCard({ p }: { p: Product }) {
  const { add } = useCart();
  return (
    <Tilt className="group">
      <div className="overflow-hidden bg-card shadow-soft">
        <Link to="/product/$slug" params={{ slug: p.slug }} className="block overflow-hidden">
          <img src={p.image} alt={p.name} loading="lazy" width={800} height={1008} className="aspect-[4/5] w-full object-cover transition duration-700 group-hover:scale-110" />
        </Link>
        <div className="p-5" style={{ transform: "translateZ(30px)" }}>
          <p className="eyebrow text-[0.6rem]">{p.family} · For {p.for}</p>
          <Link to="/product/$slug" params={{ slug: p.slug }}><h3 className="mt-2 text-2xl">{p.name}</h3></Link>
          <p className="text-sm text-muted-foreground italic">{p.tagline}</p>
          <div className="mt-4 flex items-center justify-between">
            <span className="font-medium text-foreground">{inr(p.price)}</span>
            <button onClick={() => { add(p.slug); toast.success(`${p.name} added to bag`); }} className="rounded-full border border-primary px-5 py-2 text-xs tracking-widest text-primary uppercase transition hover:bg-primary hover:text-primary-foreground">Add</button>
          </div>
        </div>
      </div>
    </Tilt>
  );
}

export function PageHero({ eyebrow, title, image, children }: { eyebrow: string; title: string; image?: string; children?: ReactNode }) {
  return (
    <section className="relative mb-16 flex min-h-[60vh] items-end overflow-hidden pt-20">
      {image && <img src={image} alt="" className="absolute inset-0 h-full w-full animate-kenburns object-cover" />}
      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/30 to-ink/10" />
      <div className="relative mx-auto w-full max-w-7xl px-6 py-16 text-on-image/85">
        <p className="eyebrow text-gold-soft">{eyebrow}</p>
        <h1 className="mt-4 max-w-3xl text-5xl text-on-image md:text-7xl">{title}</h1>
        {children}
      </div>
    </section>
  );
}
