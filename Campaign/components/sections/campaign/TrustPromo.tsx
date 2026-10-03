import { copy } from "@/content/copy.fa";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="mt-1 size-4 shrink-0 text-gold"
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

/**
 * پل کمپین به «مرکز اعتماد و شفافیت» — تنها کاری که این سکشن دارد این است که
 * ادعاهای کمپین را به صفحه‌ای وصل کند که هر عدد را با منبع و زمان‌مُهر نشان می‌دهد.
 *
 * محتوای تیره داخل یک کارت روی زمینهٔ روشن نشسته: فوتر هم vault-900 است و بدون
 * این قاب، سکشن و فوتر یک بلوک تیرهٔ ممتد به‌نظر می‌رسیدند و مرزشان گم می‌شد.
 */
export function TrustPromo() {
  const t = copy.campaign.trust;

  return (
    <section id="trust" className="scroll-mt-20 bg-bg">
      <div className="mx-auto max-w-[1160px] px-5 py-16 sm:py-20">
        <div className="grid grid-cols-1 gap-12 rounded-card bg-vault-900 pattern-dots-vault px-6 py-14 text-vault-ink sm:px-10 sm:py-16 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-16">
          <Reveal>
            <div>
              <Eyebrow onVault>{t.eyebrow}</Eyebrow>
              <h2 className="mt-3 text-display-l font-black">{t.title}</h2>
              <p className="mt-5 max-w-xl text-body leading-8 text-vault-muted">{t.subtitle}</p>
              <div className="mt-8">
                <Button href={t.cta.href} size="lg">
                  {t.cta.label}
                </Button>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-card border border-vault-line bg-vault-line sm:grid-cols-2">
              {t.items.map((item) => (
                <li key={item.title} className="bg-vault-700 p-6">
                  <div className="flex items-start gap-2.5">
                    <CheckIcon />
                    <div>
                      <p className="text-sm font-bold text-vault-ink">{item.title}</p>
                      <p className="mt-1.5 text-sm leading-7 text-vault-muted">{item.body}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
