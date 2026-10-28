import { createFileRoute } from "@tanstack/react-router";
import p5 from "@/assets/p5.jpg";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { PageHero } from "@/components/site";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Dhara" },
      { name: "description", content: "Answers about Dhara shipping, returns, longevity and attars." },
      { property: "og:title", content: "FAQ — Dhara" },
      { property: "og:description", content: "Shipping, returns, longevity and attars." },
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
    </>
  );
}
