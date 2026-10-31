import { createServerFn } from "@tanstack/react-start";
import { useSession } from "@tanstack/react-start/server";
import { createClient } from "@supabase/supabase-js";
import { createHash, timingSafeEqual } from "node:crypto";
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";

export type ProductRow = Database["public"]["Tables"]["products"]["Row"];
export type OrderRow = Database["public"]["Tables"]["orders"]["Row"];

const sessionConfig = () => ({
  password: process.env["SESSION_SECRET"]!,
  name: "dhara-staff",
  maxAge: 60 * 60 * 12,
  cookie: { httpOnly: true, secure: true, sameSite: "lax" as const, path: "/" },
});
type StaffSession = { staff?: boolean };

function publicClient() {
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
  return createClient<Database>(process.env["SUPABASE_URL"]!, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const h = new Headers(init?.headers);
        if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) h.delete("Authorization");
        h.set("apikey", key);
        return fetch(input, { ...init, headers: h });
      },
    },
  });
}

async function requireStaff() {
  const s = await useSession<StaffSession>(sessionConfig());
  if (!s.data.staff) throw new Error("Please sign in to the staff hub");
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  return supabaseAdmin;
}

/* ---------- Public ---------- */

export const listProducts = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await publicClient().from("products").select("*").order("sort").order("created_at");
  if (error) throw new Error("Could not load perfumes");
  return data;
});

const orderSchema = z.object({
  customer_name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().min(6).max(20),
  address: z.string().trim().min(5).max(400),
  city: z.string().trim().min(2).max(100),
  lines: z.array(z.object({ slug: z.string().max(120), qty: z.number().int().min(1).max(20) })).min(1).max(50),
});

export const placeOrder = createServerFn({ method: "POST" })
  .inputValidator((d) => orderSchema.parse(d))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: prods } = await supabaseAdmin.from("products").select("slug,name,price,stock,active").in("slug", data.lines.map((l) => l.slug));
    const items = data.lines.flatMap((l) => {
      const p = prods?.find((x) => x.slug === l.slug && x.active);
      return p ? [{ slug: p.slug, name: p.name, price: p.price, qty: l.qty, stock: p.stock }] : [];
    });
    if (items.length === 0) return { ok: false as const, message: "These perfumes are no longer available." };
    const short = items.find((i) => i.qty > i.stock);
    if (short) return { ok: false as const, message: `Only ${short.stock} of ${short.name} left in stock.` };
    const sub = items.reduce((a, i) => a + i.price * i.qty, 0);
    const total = sub + (sub >= 999 ? 0 : 99);
    const { data: order, error } = await supabaseAdmin.from("orders").insert({
      customer_name: data.customer_name, email: data.email, phone: data.phone, address: data.address, city: data.city,
      items: items.map(({ stock: _s, ...i }) => i), total,
    }).select("id").single();
    if (error) return { ok: false as const, message: "We couldn't place your order. Please try again." };
    for (const i of items) await supabaseAdmin.from("products").update({ stock: i.stock - i.qty }).eq("slug", i.slug);
    return { ok: true as const, id: order.id };
  });

/* ---------- Staff ---------- */

function matches(a: string, b: string) {
  return timingSafeEqual(createHash("sha256").update(a).digest(), createHash("sha256").update(b).digest());
}

export const staffStatus = createServerFn({ method: "GET" }).handler(async () => {
  const s = await useSession<StaffSession>(sessionConfig());
  return { staff: !!s.data.staff };
});

export const staffLogin = createServerFn({ method: "POST" })
  .inputValidator((d: { password: string }) => ({ password: String(d.password ?? "").slice(0, 200) }))
  .handler(async ({ data }) => {
    const expected = process.env["ADMIN_PASSWORD"];
    if (!expected || !matches(data.password, expected)) return { ok: false };
    const s = await useSession<StaffSession>(sessionConfig());
    await s.update({ staff: true });
    return { ok: true };
  });

export const staffLogout = createServerFn({ method: "POST" }).handler(async () => {
  const s = await useSession<StaffSession>(sessionConfig());
  await s.clear();
  return { ok: true };
});

export const adminListProducts = createServerFn({ method: "GET" }).handler(async () => {
  const db = await requireStaff();
  const { data, error } = await db.from("products").select("*").order("sort").order("created_at");
  if (error) throw new Error(error.message);
  return data;
});

const productSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().trim().min(1).max(80),
  family: z.enum(["Oriental", "Floral", "Attar", "Fresh", "Aquatic", "Woody"]),
  for_whom: z.enum(["Him", "Her", "Unisex"]),
  price: z.number().int().min(0).max(1000000),
  stock: z.number().int().min(0).max(100000),
  tagline: z.string().trim().max(160),
  top_notes: z.string().trim().max(160),
  heart_notes: z.string().trim().max(160),
  base_notes: z.string().trim().max(160),
  image_url: z.string().url().max(2000).nullable(),
  active: z.boolean(),
});

export const saveProduct = createServerFn({ method: "POST" })
  .inputValidator((d) => productSchema.parse(d))
  .handler(async ({ data }) => {
    const db = await requireStaff();
    const { id, ...rest } = data;
    if (id) {
      const { error } = await db.from("products").update(rest).eq("id", id);
      if (error) throw new Error(error.message);
      return { ok: true };
    }
    const base = rest.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "perfume";
    let slug = base;
    for (let n = 2; ; n++) {
      const { data: ex } = await db.from("products").select("id").eq("slug", slug).maybeSingle();
      if (!ex) break;
      slug = `${base}-${n}`;
    }
    const { error } = await db.from("products").insert({ ...rest, slug, sort: 1000 });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const deleteProduct = createServerFn({ method: "POST" })
  .inputValidator((d: { id: string }) => ({ id: z.string().uuid().parse(d.id) }))
  .handler(async ({ data }) => {
    const db = await requireStaff();
    const { error } = await db.from("products").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const uploadProductImage = createServerFn({ method: "POST" })
  .inputValidator((d) => z.object({ name: z.string().max(200), type: z.enum(["image/jpeg", "image/png", "image/webp"]), base64: z.string().max(7_500_000) }).parse(d))
  .handler(async ({ data }) => {
    const db = await requireStaff();
    const bytes = Uint8Array.from(atob(data.base64), (c) => c.charCodeAt(0));
    const ext = data.type.split("/")[1];
    const path = `${crypto.randomUUID()}.${ext}`;
    const up = await db.storage.from("product-images").upload(path, bytes, { contentType: data.type });
    if (up.error) throw new Error(up.error.message);
    const signed = await db.storage.from("product-images").createSignedUrl(path, 60 * 60 * 24 * 365 * 10);
    if (signed.error) throw new Error(signed.error.message);
    return { url: signed.data.signedUrl };
  });

export const adminListOrders = createServerFn({ method: "GET" }).handler(async () => {
  const db = await requireStaff();
  const { data, error } = await db.from("orders").select("*").order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data;
});

export const setOrderStatus = createServerFn({ method: "POST" })
  .inputValidator((d) => z.object({ id: z.string().uuid(), status: z.enum(["New", "Packed", "Shipped", "Delivered", "Cancelled"]) }).parse(d))
  .handler(async ({ data }) => {
    const db = await requireStaff();
    const { error } = await db.from("orders").update({ status: data.status }).eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
