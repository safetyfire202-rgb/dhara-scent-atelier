import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { useCart } from "@/lib/cart";
import { getProduct, inr } from "@/lib/products";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Bag — Dhara" },
      { name: "description", content: "Review the Dhara perfumes in your bag." },
      { property: "og:title", content: "Your Bag — Dhara" },
      { property: "og:description", content: "Review your Dhara bag." },
    ],
  }),
  component: Cart,
});

function Cart() {
  const { lines, setQty, remove } = useCart();
  const items = lines.map((l) => ({ ...l, p: getProduct(l.slug)! })).filter((i) => i.p);
  const total = items.reduce((a, i) => a + i.p.price * i.qty, 0);
  return (
    <div className="mx-auto max-w-5xl px-6 pt-36 pb-20">
      <h1 className="text-6xl">Your Bag</h1>
      {items.length === 0 ? (
        <div className="mt-12 text-center"><p className="text-muted-foreground">Your bag is empty.</p><Link to="/shop" className="mt-6 inline-block bg-gold-gradient px-8 py-4 text-sm tracking-widest text-primary-foreground uppercase">Shop perfumes</Link></div>
      ) : (
        <div className="mt-12 grid gap-12 md:grid-cols-3">
          <ul className="space-y-6 md:col-span-2">
            {items.map(({ p, qty }) => (
              <li key={p.slug} className="flex gap-6 border-b pb-6">
                <img src={p.image} alt={p.name} className="h-32 w-24 object-cover" />
                <div className="flex-1">
                  <h2 className="text-2xl">{p.name}</h2>
                  <p className="text-sm text-muted-foreground">{p.family}</p>
                  <div className="mt-4 flex items-center gap-3">
                    <button onClick={() => setQty(p.slug, qty - 1)} className="h-8 w-8 border">−</button>
                    <span>{qty}</span>
                    <button onClick={() => setQty(p.slug, qty + 1)} className="h-8 w-8 border">+</button>
                    <button onClick={() => remove(p.slug)} className="ml-4 text-xs text-muted-foreground uppercase hover:text-destructive">Remove</button>
                  </div>
                </div>
                <p className="text-gold">{inr(p.price * qty)}</p>
              </li>
            ))}
          </ul>
          <div className="h-fit border bg-card p-8">
            <div className="flex justify-between"><span>Subtotal</span><span>{inr(total)}</span></div>
            <div className="mt-2 flex justify-between text-sm text-muted-foreground"><span>Shipping</span><span>{total >= 999 ? "Free" : inr(99)}</span></div>
            <div className="mt-6 flex justify-between border-t pt-6 font-display text-2xl"><span>Total</span><span className="text-gold">{inr(total + (total >= 999 ? 0 : 99))}</span></div>
            <button onClick={() => toast("Checkout is coming soon")} className="mt-8 w-full bg-gold-gradient py-4 text-sm font-semibold tracking-widest text-primary-foreground uppercase">Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
}
