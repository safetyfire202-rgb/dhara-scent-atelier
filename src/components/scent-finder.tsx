import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Check, RotateCcw } from "lucide-react";
import { Chip, ProductCard, Reveal } from "@/components/site";
import { useProducts } from "@/lib/catalog";
import { ingredients, matches, occasions } from "@/lib/match";

const steps = ["Occasion", "Notes", "Wearer"];
const wearers: [string, string][] = [["All", "Anyone"], ["Him", "For him"], ["Her", "For her"], ["Unisex", "Unisex only"]];

export function ScentFinder() {
  const products = useProducts();
  const [step, setStep] = useState(0);
  const [occ, setOcc] = useState("");
  const [ings, setIngs] = useState<string[]>([]);
  const [who, setWho] = useState("All");

  const results = useMemo(() => products.filter((p) => matches(p, { occ, ings, who })), [products, occ, ings, who]);
  const onlyFamily = new Set(results.map((p) => p.family)).size === 1 ? results[0]!.family : undefined;
  const reset = () => { setStep(0); setOcc(""); setIngs([]); setWho("All"); };
  const toggleIng = (i: string) => setIngs((t) => (t.includes(i) ? t.filter((x) => x !== i) : [...t, i]));

  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <Reveal>
        <div className="relative overflow-hidden border bg-card px-6 py-14 shadow-soft md:px-14 md:py-16">
          <div className="pointer-events-none absolute -top-28 -right-16 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />
          <div className="relative grid gap-12 md:grid-cols-[1fr_1.35fr]">
            <div>
              <p className="eyebrow">Select Your Scent</p>
              <h2 className="mt-3 text-5xl md:text-6xl">Three questions to your signature</h2>
              <p className="mt-5 max-w-sm text-muted-foreground">Answer as you would to a perfumer — the moment, the notes, the wearer. We narrow the house to the bottles that fit.</p>

              <ol className="mt-10 space-y-5">
                {steps.map((s, i) => (
                  <li key={s} className="flex items-center gap-4">
                    <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border font-display text-sm transition duration-500 ${i < step ? "border-gold bg-gold text-on-image" : i === step ? "border-primary text-primary" : "border-border text-muted-foreground"}`}>
                      {i < step ? <Check className="h-4 w-4" /> : `0${i + 1}`}
                    </span>
                    <span className={`text-xs tracking-[0.28em] uppercase transition duration-500 ${i === step ? "text-primary" : "text-muted-foreground"}`}>{s}</span>
                  </li>
                ))}
              </ol>

              <div className="mt-10 h-px w-full max-w-xs bg-border">
                <div className="h-px bg-gold transition-all duration-700" style={{ width: `${(Math.min(step, steps.length) / steps.length) * 100}%` }} />
              </div>
            </div>

            <div key={step} className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              {step === 0 && (
                <div>
                  <p className="font-display text-3xl italic">When will you wear it?</p>
                  <p className="mt-2 text-sm text-muted-foreground">Choose the moment you have in mind.</p>
                  <div className="mt-7 flex flex-wrap gap-2">
                    {occasions.map((o) => <Chip key={o} on={occ === o} onClick={() => { setOcc(o); setStep(1); }}>{o}</Chip>)}
                  </div>
                </div>
              )}

              {step === 1 && (
                <div>
                  <p className="font-display text-3xl italic">Which notes call to you?</p>
                  <p className="mt-2 text-sm text-muted-foreground">Pick as many as you like — or none, and we'll judge by occasion alone.</p>
                  <div className="mt-7 flex flex-wrap gap-2">
                    {ingredients.map((i) => <Chip key={i} on={ings.includes(i)} onClick={() => toggleIng(i)}>{i}</Chip>)}
                  </div>
                  <div className="mt-9 flex flex-wrap items-center gap-7">
                    <button onClick={() => setStep(2)} className="flex items-center gap-2 bg-primary px-8 py-3 text-xs tracking-widest text-primary-foreground uppercase transition hover:opacity-90">
                      Continue <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                    <button onClick={() => setStep(0)} className="text-xs tracking-widest text-muted-foreground uppercase transition hover:text-gold">Back</button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <p className="font-display text-3xl italic">Who is it for?</p>
                  <p className="mt-2 text-sm text-muted-foreground">Wear it yourself, or give it away.</p>
                  <div className="mt-7 flex flex-wrap gap-2">
                    {wearers.map(([v, l]) => <Chip key={v} on={who === v} onClick={() => { setWho(v); setStep(3); }}>{l}</Chip>)}
                  </div>
                  <div className="mt-9">
                    <button onClick={() => setStep(1)} className="text-xs tracking-widest text-muted-foreground uppercase transition hover:text-gold">Back</button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <div className="flex flex-wrap items-end justify-between gap-4">
                    <div>
                      <p className="eyebrow">Your matches</p>
                      <h3 className="mt-2 text-4xl">
                        {results.length} {results.length === 1 ? "fragrance" : "fragrances"}
                        {occ ? <span className="text-muted-foreground"> for {occ.toLowerCase()}</span> : null}
                      </h3>
                    </div>
                    <button onClick={reset} className="flex items-center gap-2 border-b border-gold pb-1 text-xs tracking-widest text-gold uppercase">
                      <RotateCcw className="h-3.5 w-3.5" /> Start again
                    </button>
                  </div>

                  <p className="mt-4 text-sm text-muted-foreground italic">
                    {occ || "Any occasion"} · {ings.length ? ings.join(", ") : "any notes"} · {wearers.find(([v]) => v === who)?.[1]}
                  </p>

                  {results.length === 0 ? (
                    <div className="mt-8">
                      <p className="font-display text-2xl italic">Nothing fits all three answers</p>
                      <p className="mt-3 max-w-md text-muted-foreground">Loosen one answer, or let the Discovery Box introduce you to six of the house at once.</p>
                      <Link to="/gifting" className="mt-7 inline-block bg-primary px-8 py-3 text-xs tracking-widest text-primary-foreground uppercase transition hover:opacity-90">The Discovery Box</Link>
                    </div>
                  ) : (
                    <>
                      <div className="mt-8 grid gap-8 sm:grid-cols-2">
                        {results.slice(0, 4).map((p) => <ProductCard key={p.slug} p={p} />)}
                      </div>
                      {results.length > 4 && (
                        <Link to="/shop" search={{ family: onlyFamily }} className="mt-9 inline-flex items-center gap-2 border-b border-gold pb-1 text-sm tracking-widest text-gold uppercase">
                          See all {results.length} in the shop <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
