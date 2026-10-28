import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import p2 from "@/assets/p2.jpg";
import { CtaBanner, InfoColumns, PageHero, Tilt } from "@/components/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Dhara" },
      { name: "description", content: "Get in touch with Dhara for orders, gifting and fragrance consultations." },
      { property: "og:title", content: "Contact — Dhara" },
      { property: "og:description", content: "Orders, gifting and fragrance consultations." },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <>
      <PageHero eyebrow="Say Hello" title="Contact us" image={p2} />
      <div className="mx-auto grid max-w-7xl gap-16 px-6 md:grid-cols-2">
        <div className="space-y-6 text-muted-foreground">
          <p className="eyebrow">Write to us</p>
          <p className="font-display text-3xl text-foreground">hello@dhara.in</p>
          <p className="eyebrow pt-6">Hours</p>
          <p>Monday – Saturday, 10am – 7pm IST</p>
        </div>
        <Tilt max={6}>
          <form className="space-y-4 border bg-card p-8" onSubmit={(e) => { e.preventDefault(); (e.target as HTMLFormElement).reset(); toast.success("Thank you — we'll reply soon"); }}>
            {["Name", "Email"].map((f) => <input key={f} required placeholder={f} type={f === "Email" ? "email" : "text"} className="w-full border bg-background px-4 py-3 outline-none focus:border-gold" />)}
            <textarea required placeholder="Message" rows={5} className="w-full border bg-background px-4 py-3 outline-none focus:border-gold" />
            <button className="w-full bg-gold-gradient py-4 text-sm font-semibold tracking-widest text-primary-foreground uppercase">Send</button>
          </form>
        </Tilt>
      </div>

      <InfoColumns
        eyebrow="How We Can Help"
        title="More ways to reach us"
        cols={[
          ["Order support", "Questions about an existing order, delivery dates or returns — include your order number for the fastest help."],
          ["Fragrance consultations", "Tell us your tastes and the occasion, and our team will recommend scents from the collection within one working day."],
          ["Bulk & corporate", "Wedding favours, festive gifting and corporate orders of twenty pieces or more receive dedicated assistance and pricing."],
        ]}
      />

      <CtaBanner
        eyebrow="Quick Answers"
        title="Looking for something simple?"
        text="Shipping times, returns, longevity and more are already answered on our FAQ page — it may save you a wait."
        to="/faq"
        label="Visit the FAQ"
      />
    </>
  );
}
