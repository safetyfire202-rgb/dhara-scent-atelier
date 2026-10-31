import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Package, ShoppingBag, Users, LogOut, Plus, Pencil, Trash2, Upload, X } from "lucide-react";
import {
  staffStatus, staffLogin, staffLogout, adminListProducts, saveProduct, deleteProduct,
  uploadProductImage, adminListOrders, setOrderStatus, type ProductRow,
} from "@/lib/catalog.functions";
import { bundledImage, inr } from "@/lib/products";

export const Route = createFileRoute("/admin")({
  loader: () => staffStatus(),
  head: () => ({
    meta: [
      { title: "Staff Hub — Dhara" },
      { name: "description", content: "Dhara staff area for managing perfumes, stock and orders." },
      { property: "og:title", content: "Staff Hub — Dhara" },
      { property: "og:description", content: "Dhara staff area." },
      { name: "robots", content: "noindex" },
    ],
  }),
  errorComponent: ({ error }) => <div className="p-20 text-center">{error.message}</div>,
  component: AdminPage,
});

function AdminPage() {
  const { staff } = Route.useLoaderData();
  return staff ? <Hub /> : <Login />;
}

const field = "w-full border bg-background px-4 py-3 text-sm outline-none transition focus:border-gold";

function Login() {
  const router = useRouter();
  const login = useServerFn(staffLogin);
  const [err, setErr] = useState(false);
  const [busy, setBusy] = useState(false);
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    const r = await login({ data: { password: String(new FormData(e.currentTarget).get("password")) } });
    setBusy(false);
    if (r.ok) router.invalidate(); else setErr(true);
  }
  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary px-6">
      <form onSubmit={submit} className="w-full max-w-md border bg-card p-10 shadow-soft">
        <p className="eyebrow">Dhara Parfums</p>
        <h1 className="mt-3 text-4xl">Staff Hub</h1>
        <p className="mt-3 text-sm text-muted-foreground">Enter the staff password to manage the catalogue, stock and orders.</p>
        <input name="password" type="password" required autoComplete="current-password" placeholder="Password" className={`${field} mt-8`} />
        {err && <p className="mt-3 text-sm text-destructive">That password isn't right.</p>}
        <button disabled={busy} className="mt-6 w-full bg-gold-gradient py-4 text-sm font-semibold tracking-widest text-primary-foreground uppercase disabled:opacity-60">{busy ? "Checking…" : "Enter"}</button>
        <Link to="/" className="mt-6 block text-center text-xs tracking-widest text-muted-foreground uppercase hover:text-gold">← Back to the store</Link>
      </form>
    </div>
  );
}

type Tab = "products" | "orders" | "customers";

function Hub() {
  const router = useRouter();
  const logout = useServerFn(staffLogout);
  const [tab, setTab] = useState<Tab>("products");
  const tabs: [Tab, string, typeof Package][] = [["products", "Products", Package], ["orders", "Orders", ShoppingBag], ["customers", "Customers", Users]];
  return (
    <div className="min-h-screen bg-secondary">
      <header className="border-b bg-card">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div><p className="eyebrow">Dhara Parfums</p><h1 className="text-2xl">Staff Hub</h1></div>
          <div className="flex items-center gap-6">
            <Link to="/" className="text-xs tracking-widest text-muted-foreground uppercase hover:text-gold">View store</Link>
            <button onClick={async () => { await logout(); router.invalidate(); }} className="flex items-center gap-2 text-xs tracking-widest uppercase hover:text-gold"><LogOut className="h-4 w-4" />Sign out</button>
          </div>
        </div>
        <nav className="mx-auto flex max-w-7xl gap-1 px-6">
          {tabs.map(([k, label, Icon]) => (
            <button key={k} onClick={() => setTab(k)} className={`flex items-center gap-2 border-b-2 px-5 py-3 text-sm transition ${tab === k ? "border-gold text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}><Icon className="h-4 w-4" />{label}</button>
          ))}
        </nav>
      </header>
      <div className="mx-auto max-w-7xl px-6 py-10">
        {tab === "products" ? <Products /> : <Orders customersView={tab === "customers"} />}
      </div>
    </div>
  );
}

/* ---------- Products ---------- */

const families = ["Oriental", "Floral", "Attar", "Fresh", "Aquatic", "Woody"] as const;
const forWhom = ["Unisex", "Him", "Her"] as const;
type Draft = { id?: string; name: string; family: (typeof families)[number]; for_whom: (typeof forWhom)[number]; price: number; stock: number; tagline: string; top_notes: string; heart_notes: string; base_notes: string; image_url: string | null; active: boolean; slug?: string };
const blank: Draft = { name: "", family: "Oriental", for_whom: "Unisex", price: 1999, stock: 50, tagline: "", top_notes: "", heart_notes: "", base_notes: "", image_url: null, active: true };

const imgOf = (p: { image_url: string | null; slug?: string }) => p.image_url || (p.slug ? bundledImage(p.slug) : null);

function Products() {
  const qc = useQueryClient();
  const list = useServerFn(adminListProducts);
  const del = useServerFn(deleteProduct);
  const { data = [], isLoading } = useQuery({ queryKey: ["admin-products"], queryFn: () => list() });
  const [edit, setEdit] = useState<Draft | null>(null);
  const [q, setQ] = useState("");
  const shown = data.filter((p) => p.name.toLowerCase().includes(q.toLowerCase()));
  const refresh = () => { qc.invalidateQueries({ queryKey: ["admin-products"] }); qc.invalidateQueries({ queryKey: ["products"] }); };
  const remove = useMutation({ mutationFn: (id: string) => del({ data: { id } }), onSuccess: () => { toast.success("Perfume deleted"); refresh(); }, onError: (e: Error) => toast.error(e.message) });

  const low = data.filter((p) => p.stock <= 5).length;
  const toDraft = (p: ProductRow): Draft => ({ id: p.id, slug: p.slug, name: p.name, family: p.family as Draft["family"], for_whom: p.for_whom as Draft["for_whom"], price: p.price, stock: p.stock, tagline: p.tagline, top_notes: p.top_notes, heart_notes: p.heart_notes, base_notes: p.base_notes, image_url: p.image_url, active: p.active });

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-3">
        <Stat label="Perfumes" value={String(data.length)} />
        <Stat label="Live on store" value={String(data.filter((p) => p.active).length)} />
        <Stat label="Low stock (≤5)" value={String(low)} warn={low > 0} />
      </div>
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search perfumes…" className={`${field} max-w-xs bg-card`} />
        <button onClick={() => setEdit({ ...blank })} className="flex items-center gap-2 bg-gold-gradient px-6 py-3 text-xs font-semibold tracking-widest text-primary-foreground uppercase shadow-soft"><Plus className="h-4 w-4" />Add perfume</button>
      </div>
      <div className="mt-6 overflow-x-auto border bg-card">
        <table className="w-full text-sm">
          <thead className="border-b text-left text-xs tracking-widest text-muted-foreground uppercase">
            <tr><th className="p-4">Perfume</th><th className="p-4">Family</th><th className="p-4">Price</th><th className="p-4">Stock</th><th className="p-4">Status</th><th className="p-4" /></tr>
          </thead>
          <tbody>
            {isLoading && <tr><td colSpan={6} className="p-8 text-center text-muted-foreground">Loading…</td></tr>}
            {shown.map((p) => (
              <tr key={p.id} className="border-b last:border-0">
                <td className="p-4"><div className="flex items-center gap-3">{imgOf(p) ? <img src={imgOf(p)!} alt="" className="h-14 w-11 object-cover" /> : <div className="h-14 w-11 bg-muted" />}<div><p className="font-display text-base">{p.name}</p><p className="text-xs text-muted-foreground">{p.tagline}</p></div></div></td>
                <td className="p-4">{p.family} · {p.for_whom}</td>
                <td className="p-4">{inr(p.price)}</td>
                <td className={`p-4 ${p.stock <= 5 ? "font-semibold text-destructive" : ""}`}>{p.stock}</td>
                <td className="p-4"><span className={`px-2 py-1 text-xs ${p.active ? "bg-gold/15 text-gold" : "bg-muted text-muted-foreground"}`}>{p.active ? "Live" : "Hidden"}</span></td>
                <td className="p-4"><div className="flex justify-end gap-2">
                  <button aria-label={`Edit ${p.name}`} onClick={() => setEdit(toDraft(p))} className="border p-2 hover:border-gold hover:text-gold"><Pencil className="h-4 w-4" /></button>
                  <button aria-label={`Delete ${p.name}`} onClick={() => { if (confirm(`Delete ${p.name}? This can't be undone.`)) remove.mutate(p.id); }} className="border p-2 hover:border-destructive hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
                </div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {edit && <Editor draft={edit} onClose={() => setEdit(null)} onSaved={() => { setEdit(null); refresh(); }} />}
    </>
  );
}

function Stat({ label, value, warn }: { label: string; value: string; warn?: boolean }) {
  return <div className="border bg-card p-6 shadow-soft"><p className="eyebrow">{label}</p><p className={`mt-3 font-display text-4xl ${warn ? "text-destructive" : "text-primary"}`}>{value}</p></div>;
}

function Editor({ draft, onClose, onSaved }: { draft: Draft; onClose: () => void; onSaved: () => void }) {
  const [d, setD] = useState<Draft>(draft);
  const [uploading, setUploading] = useState(false);
  const save = useServerFn(saveProduct);
  const upload = useServerFn(uploadProductImage);
  const set = <K extends keyof Draft>(k: K, v: Draft[K]) => setD((x) => ({ ...x, [k]: v }));
  const m = useMutation({
    mutationFn: () => { const { slug: _s, ...rest } = d; return save({ data: rest }); },
    onSuccess: () => { toast.success(d.id ? "Perfume updated" : "Perfume added"); onSaved(); },
    onError: () => toast.error("Please check the details and try again."),
  });
  const preview = useMemo(() => imgOf(d), [d]);

  async function pick(file: File) {
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) return toast.error("Use a JPG, PNG or WEBP photo");
    if (file.size > 5 * 1024 * 1024) return toast.error("Photo must be under 5 MB");
    setUploading(true);
    try {
      const buf = new Uint8Array(await file.arrayBuffer());
      let bin = ""; for (let i = 0; i < buf.length; i += 0x8000) bin += String.fromCharCode(...buf.subarray(i, i + 0x8000));
      const r = await upload({ data: { name: file.name, type: file.type as "image/jpeg", base64: btoa(bin) } });
      set("image_url", r.url);
    } catch { toast.error("Upload failed"); } finally { setUploading(false); }
  }

  const L = ({ children }: { children: React.ReactNode }) => <span className="mb-1 block text-xs tracking-widest text-muted-foreground uppercase">{children}</span>;
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-ink/50 p-4 backdrop-blur-sm md:p-10" onClick={onClose}>
      <form onClick={(e) => e.stopPropagation()} onSubmit={(e) => { e.preventDefault(); m.mutate(); }} className="w-full max-w-3xl border bg-card p-8 shadow-glow">
        <div className="flex items-center justify-between"><h2 className="text-3xl">{d.id ? "Edit perfume" : "Add a perfume"}</h2><button type="button" aria-label="Close" onClick={onClose}><X className="h-5 w-5" /></button></div>
        <div className="mt-8 grid gap-8 md:grid-cols-[200px_1fr]">
          <div>
            <L>Photo</L>
            <label className="flex aspect-[4/5] cursor-pointer items-center justify-center overflow-hidden border border-dashed bg-background hover:border-gold">
              {preview ? <img src={preview} alt="" className="h-full w-full object-cover" /> : <span className="flex flex-col items-center gap-2 text-xs text-muted-foreground"><Upload className="h-5 w-5" />{uploading ? "Uploading…" : "Upload photo"}</span>}
              <input type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={(e) => e.target.files?.[0] && pick(e.target.files[0])} />
            </label>
            {uploading && preview && <p className="mt-2 text-xs text-muted-foreground">Uploading…</p>}
            <p className="mt-2 text-xs text-muted-foreground">Click to replace. JPG/PNG/WEBP, max 5 MB.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="sm:col-span-2"><L>Name</L><input required maxLength={80} value={d.name} onChange={(e) => set("name", e.target.value)} className={field} /></label>
            <label className="sm:col-span-2"><L>Tagline</L><input maxLength={160} value={d.tagline} onChange={(e) => set("tagline", e.target.value)} className={field} /></label>
            <label><L>Scent family</L><select value={d.family} onChange={(e) => set("family", e.target.value as Draft["family"])} className={field}>{families.map((f) => <option key={f}>{f}</option>)}</select></label>
            <label><L>For</L><select value={d.for_whom} onChange={(e) => set("for_whom", e.target.value as Draft["for_whom"])} className={field}>{forWhom.map((f) => <option key={f}>{f}</option>)}</select></label>
            <label><L>Price (₹, 50 ml)</L><input type="number" min={0} required value={d.price} onChange={(e) => set("price", Math.max(0, Math.round(+e.target.value)))} className={field} /></label>
            <label><L>Stock</L><input type="number" min={0} required value={d.stock} onChange={(e) => set("stock", Math.max(0, Math.round(+e.target.value)))} className={field} /></label>
            <label><L>Top notes</L><input maxLength={160} value={d.top_notes} onChange={(e) => set("top_notes", e.target.value)} className={field} /></label>
            <label><L>Heart notes</L><input maxLength={160} value={d.heart_notes} onChange={(e) => set("heart_notes", e.target.value)} className={field} /></label>
            <label className="sm:col-span-2"><L>Base notes</L><input maxLength={160} value={d.base_notes} onChange={(e) => set("base_notes", e.target.value)} className={field} /></label>
            <label className="flex items-center gap-3 sm:col-span-2"><input type="checkbox" checked={d.active} onChange={(e) => set("active", e.target.checked)} className="h-4 w-4 accent-primary" /><span className="text-sm">Show on the store</span></label>
          </div>
        </div>
        <div className="mt-8 flex justify-end gap-3 border-t pt-6">
          <button type="button" onClick={onClose} className="border px-6 py-3 text-xs tracking-widest uppercase">Cancel</button>
          <button disabled={m.isPending || uploading} className="bg-gold-gradient px-8 py-3 text-xs font-semibold tracking-widest text-primary-foreground uppercase disabled:opacity-60">{m.isPending ? "Saving…" : "Save perfume"}</button>
        </div>
      </form>
    </div>
  );
}

/* ---------- Orders & customers ---------- */

const statuses = ["New", "Packed", "Shipped", "Delivered", "Cancelled"] as const;
type Item = { name: string; qty: number; price: number };

function Orders({ customersView }: { customersView: boolean }) {
  const qc = useQueryClient();
  const list = useServerFn(adminListOrders);
  const setStatus = useServerFn(setOrderStatus);
  const { data = [], isLoading } = useQuery({ queryKey: ["admin-orders"], queryFn: () => list() });
  const m = useMutation({ mutationFn: (v: { id: string; status: (typeof statuses)[number] }) => setStatus({ data: v }), onSuccess: () => { toast.success("Order updated"); qc.invalidateQueries({ queryKey: ["admin-orders"] }); } });

  const customers = useMemo(() => {
    const map = new Map<string, { name: string; email: string; phone: string; city: string; orders: number; spent: number; last: string }>();
    for (const o of data) {
      const c = map.get(o.email) ?? { name: o.customer_name, email: o.email, phone: o.phone, city: o.city, orders: 0, spent: 0, last: o.created_at };
      c.orders++; if (o.status !== "Cancelled") c.spent += o.total;
      map.set(o.email, c);
    }
    return [...map.values()];
  }, [data]);

  const exportCsv = () => {
    const rows = [["Name", "Email", "Phone", "City", "Orders", "Spent"], ...customers.map((c) => [c.name, c.email, c.phone, c.city, c.orders, c.spent])];
    const csv = rows.map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(",")).join("\n");
    const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" })); a.download = "dhara-customers.csv"; a.click();
  };

  const revenue = data.filter((o) => o.status !== "Cancelled").reduce((a, o) => a + o.total, 0);
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-3">
        <Stat label="Orders" value={String(data.length)} />
        <Stat label="Customers" value={String(customers.length)} />
        <Stat label="Revenue" value={inr(revenue)} />
      </div>
      {isLoading ? <p className="mt-10 text-muted-foreground">Loading…</p> : data.length === 0 ? (
        <p className="mt-10 border bg-card p-10 text-center text-muted-foreground">No orders yet. They'll appear here as soon as someone checks out.</p>
      ) : customersView ? (
        <>
          <div className="mt-8 flex justify-end"><button onClick={exportCsv} className="border bg-card px-5 py-3 text-xs tracking-widest uppercase hover:border-gold hover:text-gold">Export CSV</button></div>
          <div className="mt-4 overflow-x-auto border bg-card">
            <table className="w-full text-sm">
              <thead className="border-b text-left text-xs tracking-widest text-muted-foreground uppercase"><tr><th className="p-4">Customer</th><th className="p-4">Phone</th><th className="p-4">City</th><th className="p-4">Orders</th><th className="p-4">Spent</th></tr></thead>
              <tbody>{customers.map((c) => <tr key={c.email} className="border-b last:border-0"><td className="p-4"><p className="font-display text-base">{c.name}</p><p className="text-xs text-muted-foreground">{c.email}</p></td><td className="p-4">{c.phone}</td><td className="p-4">{c.city}</td><td className="p-4">{c.orders}</td><td className="p-4">{inr(c.spent)}</td></tr>)}</tbody>
            </table>
          </div>
        </>
      ) : (
        <div className="mt-8 space-y-4">
          {data.map((o) => (
            <div key={o.id} className="border bg-card p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div><p className="font-display text-xl">#{o.id.slice(0, 8).toUpperCase()} · {o.customer_name}</p><p className="mt-1 text-xs text-muted-foreground">{new Date(o.created_at).toLocaleString("en-IN")} · {o.email} · {o.phone}</p><p className="mt-1 text-xs text-muted-foreground">{o.address}, {o.city}</p></div>
                <div className="flex items-center gap-4"><span className="font-display text-2xl text-gold">{inr(o.total)}</span>
                  <select aria-label="Order status" value={o.status} onChange={(e) => m.mutate({ id: o.id, status: e.target.value as (typeof statuses)[number] })} className="border bg-background px-3 py-2 text-sm">{statuses.map((s) => <option key={s}>{s}</option>)}</select>
                </div>
              </div>
              <ul className="mt-4 border-t pt-4 text-sm">{(o.items as Item[]).map((i, k) => <li key={k} className="flex justify-between py-1"><span>{i.name} × {i.qty}</span><span>{inr(i.price * i.qty)}</span></li>)}</ul>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
