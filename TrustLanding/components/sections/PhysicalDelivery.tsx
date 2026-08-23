import { copy } from "@/content/copy.fa";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Chip } from "@/components/ui/Chip";
import { Button } from "@/components/ui/Button";

export function PhysicalDelivery() {
  const t = copy.physicalDelivery;

  return (
    <section id="delivery" className="scroll-mt-20 border-b border-line">
      <div className="mx-auto max-w-[1160px] px-5 py-16 sm:py-24">
        <Reveal>
          <Eyebrow>{t.eyebrow}</Eyebrow>
          <h2 className="mt-3 text-h2 font-black text-ink-900">{t.title}</h2>
          <p className="mt-3 max-w-xl text-sm leading-7 text-muted">{t.subtitle}</p>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {t.steps.map((step, idx) => (
            <Reveal key={step.number} delay={idx * 0.05}>
              <div className="relative border-t-2 border-gold pt-4">
                <span className="font-mono-id text-xs font-bold text-gold-dim">{step.number}</span>
                <p className="mt-2 text-sm font-bold text-ink-900">{step.title}</p>
                <p className="mt-2 text-sm leading-7 text-muted">{step.description}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Chip tone="neutral">{t.chips.minGrams}</Chip>
            <Chip tone="neutral">{t.chips.feeFrom}</Chip>
            <Chip tone="neutral">{t.chips.timing}</Chip>
          </div>
          <div className="mt-6">
            <Button href="/physical-delivery-terms" variant="ghost" size="md">
              {t.cta}
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
