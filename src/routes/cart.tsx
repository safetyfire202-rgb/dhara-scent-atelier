import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { toast } from "sonner";
import { useCart } from "@/lib/cart";
import { inr } from "@/lib/products";
import { useProducts } from "@/lib/catalog";
import { placeOrder } from "@/lib/catalog.functions";
import { TrustBar } from "@/components/site";

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

const field = "w-full border bg-background px-4 py-3 text-sm outline-none focus:border-gold";

function Cart() {
  const { lines, setQty, remove } = useCart();
  const products = useProducts();
  const order = useServerFn(placeOrder);
  const [checkout, setCheckout] = useState(false);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState<string | null>(null);
  const items = lines.flatMap((l) => { const p = products.find((x) => x.slug === l.slug); return p ? [{ ...l, p }] : []; });
  const total = items.reduce((a, i) => a + i.p.price * i.qty, 0);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const g = (k: string) => String(f.get(k) ?? "");
    setBusy(true);
    try {
      const r = await order({ data: { customer_name: g("name"), email: g("email"), phone: g("phone"), address: g("address"), city: g("city"), lines: items.map((i) => ({ slug: i.slug, qty: i.qty })) } });
      if (!r.ok) { toast.error(r.message); return; }
      items.forEach((i) => remove(i.slug));
      setDone(r.id.slice(0, 8).toUpperCase());
    } catch {
      toast.error("Please check your details and try again.");
    } finally { setBusy(false); }
  }

  if (done) return (
    <div className="mx-auto max-w-2xl px-6 pt-40 pb-24 text-center">
      <p className="eyebrow text-center">Thank you</p>
      <h1 className="mt-4 text-5xl">Your order is placed</h1>
      <p className="mt-6 text-muted-foreground">Order reference <span className="text-gold">#{done}</span>. We'll be in touch shortly to confirm delivery.</p>
      <Link to="/shop" className="mt-10 inline-block bg-gold-gradient px-8 py-4 text-sm tracking-widest text-primary-foreground uppercase">Continue shopping</Link>
    </div>
  );

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
            {!checkout ? (
              <button onClick={() => setCheckout(true)} className="mt-8 w-full bg-gold-gradient py-4 text-sm font-semibold tracking-widest text-primary-foreground uppercase">Checkout</button>
            ) : (
              <form onSubmit={submit} className="mt-8 space-y-3">
                <input name="name" required minLength={2} placeholder="Full name" className={field} />
                <input name="email" type="email" required placeholder="Email" className={field} />
                <input name="phone" required minLength={6} placeholder="Phone" className={field} />
                <textarea name="address" required minLength={5} placeholder="Delivery address" rows={3} className={field} />
                <input name="city" required minLength={2} placeholder="City" className={field} />
                <button disabled={busy} className="w-full bg-gold-gradient py-4 text-sm font-semibold tracking-widest text-primary-foreground uppercase disabled:opacity-60">{busy ? "Placing order…" : "Place order"}</button>
                <p className="text-center text-xs text-muted-foreground">Pay on delivery</p>
              </form>
            )}
          </div>
        </div>
      )}
      <div className="-mx-6 mt-16">
        <TrustBar items={[["Truck", "Free shipping", "Complimentary on orders above ₹999."], ["ShieldCheck", "Secure payment", "Encrypted checkout, every time."], ["Sparkles", "Gift wrapped", "Each order arrives in our signature box."], ["Leaf", "Easy returns", "Unopened bottles within 7 days."]]} />
      </div>
    </div>
  );
}
