import { copy } from "@/content/copy.fa";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Chip } from "@/components/ui/Chip";
import { Button } from "@/components/ui/Button";
import { PhotoCarousel } from "@/components/ui/PhotoCarousel";

export function Settlement() {
  const t = copy.settlement;

  return (
    <section id="settlement" className="scroll-mt-20 border-b border-line">
      <div className="mx-auto max-w-[1160px] px-5 py-16 sm:py-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.1fr]">
          <Reveal>
            <Eyebrow>{t.eyebrow}</Eyebrow>
            <h2 className="mt-3 text-h2 font-black text-ink-900">{t.title}</h2>
            <p className="mt-3 max-w-xl text-sm leading-7 text-muted">{t.subtitle}</p>

            <ul className="mt-10 flex flex-col gap-6">
              {t.slaRows.map((row) => (
                <li key={row.label} className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-1 flex size-6 shrink-0 items-center justify-center rounded-full bg-gold text-xs font-black text-ink-on-gold"
                  >
                    ✓
                  </span>
                  <div>
                    <p className="text-sm font-bold text-ink-900">{row.label}</p>
                    <p className="mt-1 text-sm text-muted">{row.caption}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="overflow-hidden rounded-card border border-line bg-surface">
              <PhotoCarousel slides={t.banner.slides} />
              <div className="p-6 sm:p-8">
                <Chip tone="neutral" className="tabular-nums">
                  {t.banner.dateBadge}
                </Chip>
                <h3 className="mt-4 text-h3 font-bold text-ink-900">{t.banner.title}</h3>
                <p className="mt-2 text-sm leading-7 text-muted">{t.banner.description}</p>
                <Button href="/login" size="md" className="mt-4">
                  {t.banner.ctaLabel}
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
