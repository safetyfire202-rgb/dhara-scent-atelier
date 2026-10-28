import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode, type MouseEvent } from "react";
import { ShoppingBag, Menu, X } from "lucide-react";
import { toast } from "sonner";
import logo from "@/assets/logo.png";
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
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", f);
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <>
      <div className="overflow-hidden border-b bg-ink py-2 text-xs tracking-[0.3em] text-gold">
        <div className="flex w-max animate-marquee gap-16 whitespace-nowrap uppercase">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i}>Free shipping above ₹999 · Long-lasting perfumes · Handcrafted in India</span>
          ))}
        </div>
      </div>
      <header className={`sticky top-0 z-50 transition-all duration-500 ${scrolled ? "border-b bg-background/85 backdrop-blur-xl" : "bg-transparent"}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Dhara" width={40} height={40} className="h-10 w-10" />
            <span className="font-display text-3xl tracking-[0.25em] text-gold-gradient">DHARA</span>
          </Link>
          <nav className="hidden gap-8 lg:flex">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} className="group relative text-sm tracking-widest text-foreground/80 uppercase transition hover:text-gold" activeProps={{ className: "text-gold" }}>
                {n.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <Link to="/cart" className="relative text-foreground hover:text-gold" aria-label="Cart">
              <ShoppingBag className="h-5 w-5" />
              {count > 0 && <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">{count}</span>}
            </Link>
            <button className="lg:hidden" onClick={() => setOpen(!open)} aria-label="Menu">{open ? <X /> : <Menu />}</button>
          </div>
        </div>
        {open && (
          <nav className="flex flex-col gap-4 border-t bg-background px-6 py-6 lg:hidden">
            {nav.map((n) => <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="font-display text-2xl">{n.label}</Link>)}
          </nav>
        )}
      </header>
    </>
  );
}

export function Footer() {
  return (
    <footer className="mt-32 border-t bg-ink">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-4">
        <div>
          <p className="font-display text-4xl tracking-[0.25em] text-gold-gradient">DHARA</p>
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
              {(links as string[][]).map(([to, l]) => (
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
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add("in"); io.disconnect(); } }, { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
}

export function ProductCard({ p }: { p: Product }) {
  const { add } = useCart();
  return (
    <Tilt className="group">
      <div className="overflow-hidden border bg-card">
        <Link to="/product/$slug" params={{ slug: p.slug }} className="block overflow-hidden">
          <img src={p.image} alt={p.name} loading="lazy" width={800} height={1008} className="aspect-[4/5] w-full object-cover transition duration-700 group-hover:scale-110" />
        </Link>
        <div className="p-5" style={{ transform: "translateZ(30px)" }}>
          <p className="eyebrow text-[0.6rem]">{p.family} · For {p.for}</p>
          <Link to="/product/$slug" params={{ slug: p.slug }}><h3 className="mt-2 text-2xl">{p.name}</h3></Link>
          <p className="text-sm text-muted-foreground italic">{p.tagline}</p>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-gold">{inr(p.price)}</span>
            <button onClick={() => { add(p.slug); toast.success(`${p.name} added to bag`); }} className="border border-gold px-4 py-2 text-xs tracking-widest text-gold uppercase transition hover:bg-primary hover:text-primary-foreground">Add</button>
          </div>
        </div>
      </div>
    </Tilt>
  );
}

export function PageHero({ eyebrow, title, image, children }: { eyebrow: string; title: string; image?: string; children?: ReactNode }) {
  return (
    <section className="relative flex min-h-[50vh] items-center overflow-hidden">
      {image && <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-35" />}
      <div className="absolute inset-0 bg-gradient-to-b from-background/30 to-background" />
      <div className="relative mx-auto max-w-7xl px-6 py-24">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-4 max-w-3xl text-6xl md:text-8xl">{title}</h1>
        {children}
      </div>
    </section>
  );
}
