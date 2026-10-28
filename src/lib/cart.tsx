import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type Line = { slug: string; qty: number };
type Cart = { lines: Line[]; add: (slug: string) => void; remove: (slug: string) => void; setQty: (slug: string, q: number) => void; count: number };

const Ctx = createContext<Cart | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<Line[]>([]);
  useEffect(() => {
    try { setLines(JSON.parse(localStorage.getItem("dhara-cart") || "[]")); } catch { /* empty */ }
  }, []);
  const save = (l: Line[]) => { setLines(l); localStorage.setItem("dhara-cart", JSON.stringify(l)); };
  const add = (slug: string) => {
    const f = lines.find((l) => l.slug === slug);
    save(f ? lines.map((l) => (l.slug === slug ? { ...l, qty: l.qty + 1 } : l)) : [...lines, { slug, qty: 1 }]);
  };
  const remove = (slug: string) => save(lines.filter((l) => l.slug !== slug));
  const setQty = (slug: string, q: number) => (q < 1 ? remove(slug) : save(lines.map((l) => (l.slug === slug ? { ...l, qty: q } : l))));
  return <Ctx.Provider value={{ lines, add, remove, setQty, count: lines.reduce((a, l) => a + l.qty, 0) }}>{children}</Ctx.Provider>;
}

export const useCart = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart outside provider");
  return c;
};
