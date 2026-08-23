import { copy } from "@/content/copy.fa";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { PayoutTestWidget } from "@/components/data/PayoutTestWidget";

export function Settlement() {
  const t = copy.settlement;

  return (
    <section id="settlement" className="scroll-mt-20 border-b border-line">
      <div className="mx-auto max-w-[1160px] px-5 py-16 sm:py-24">
        <Reveal>
          <Eyebrow>{t.eyebrow}</Eyebrow>
          <h2 className="mt-3 text-h2 font-black text-ink-900">{t.title}</h2>
          <p className="mt-3 max-w-xl text-sm leading-7 text-muted">{t.subtitle}</p>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.1fr]">
          <Reveal delay={0.05}>
            <ul className="flex flex-col gap-6">
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
            {/* بدون بک‌اند واقعی/حساب کاربری در این پروژه؛ برای نمایش تعاملی کامل
                فلو، حالت پیش‌فرض «واجد شرایط» است — نه یک بررسی احراز هویت واقعی */}
            <PayoutTestWidget userState="eligible" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
