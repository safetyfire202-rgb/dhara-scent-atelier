import { createFileRoute } from "@tanstack/react-router";
import p5 from "@/assets/p5.jpg";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CtaBanner, InfoColumns, PageHero } from "@/components/site";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Dhara" },
      { name: "description", content: "Answers about Dhara shipping, returns, longevity and attars." },
      { property: "og:title", content: "FAQ — Dhara" },
      { property: "og:description", content: "Shipping, returns, longevity and attars." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Faq,
});

const qa: [string, string][] = [
  ["How long do Dhara perfumes last?", "Our Eau de Parfums are made at high concentration and typically last 8–12 hours on skin."],
  ["Do you ship across India?", "Yes, we ship everywhere in India. Shipping is free on orders above ₹999."],
  ["Are attars alcohol free?", "Yes. All Dhara attars are pure oil perfumes with no alcohol."],
  ["Can I return a perfume?", "Unopened products can be returned within 7 days of delivery."],
  ["Are your products cruelty free?", "Yes, we never test on animals."],
];

function Faq() {
  return (
    <>
      <PageHero eyebrow="Help" title="Questions, answered" image={p5} />
      <div className="mx-auto max-w-3xl px-6">
        <Accordion type="single" collapsible>
          {qa.map(([q, a]) => (
            <AccordionItem key={q} value={q}>
              <AccordionTrigger className="font-display text-2xl hover:text-gold">{q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <InfoColumns
        eyebrow="Good to Know"
        title="The essentials, at a glance"
        cols={[
          ["Delivery", "Orders ship within 24 hours from Jaipur and typically arrive in 2–5 working days across India, with tracking on every parcel."],
          ["Payment", "We accept all major cards, UPI and net banking. Cash on delivery is available on orders up to ₹5,000."],
          ["Authenticity", "Every bottle carries a batch code and seal. Buy only from dhara.in or our listed partners to guarantee a genuine product."],
        ]}
      />

      <CtaBanner
        eyebrow="Still Curious?"
        title="We love a good question"
        text="If your question isn't answered here, write to us — a real person from the Dhara team replies within one working day."
        to="/contact"
        label="Contact us"
      />
    </>
  );
}
