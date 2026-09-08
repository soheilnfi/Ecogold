import Image from "next/image";
import { copy } from "@/content/copy.fa";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { formatDecimal, formatPercent, toPersianDigits } from "@/lib/format";

export function Products() {
  const t = copy.products;

  return (
    <section id="products" className="scroll-mt-20 border-b border-line">
      <div className="mx-auto max-w-[1160px] px-5 py-16 sm:py-24">
        <Reveal>
          <Eyebrow>{t.eyebrow}</Eyebrow>
          <h2 className="mt-3 text-h2 font-black text-ink-900">{t.title}</h2>
          <p className="mt-3 max-w-xl text-sm leading-7 text-muted">{t.subtitle}</p>
        </Reveal>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {t.items.map((item, idx) => (
            <Reveal key={item.key} delay={idx * 0.02}>
              <div className="flex h-full flex-col overflow-hidden rounded-card border border-line bg-surface">
                <div className="relative aspect-square border-b border-line bg-surface-2">
                  {item.imageUrl ? (
                    <Image
                      src={item.imageUrl}
                      alt={`شمش ${item.brand} ${formatDecimal(item.rawWeightGrams, 3)} گرم`}
                      fill
                      sizes="(min-width: 1024px) 200px, 33vw"
                      className="object-cover"
                    />
                  ) : (
                    <div className="absolute inset-3 rounded-md border border-dashed border-line" />
                  )}
                </div>
                <div className="flex flex-1 flex-col gap-1 p-4">
                  <p className="text-sm font-bold text-ink-900">{item.brand}</p>
                  <p className="text-xs tabular-nums text-muted">
                    {t.rawWeightLabel}: {formatDecimal(item.rawWeightGrams, 3)} گرم
                  </p>
                  <p className="text-xs tabular-nums text-muted">
                    {t.purityLabel}: {toPersianDigits(item.purity)}
                  </p>
                  <p className="text-xs tabular-nums text-muted">
                    {t.weight750Label}: {formatDecimal(item.weight750Grams, 3)} گرم
                  </p>
                  {item.deliveryFeePercent !== null && (
                    <p className="text-xs tabular-nums text-muted">
                      {t.deliveryFeeLabel}: {formatPercent(item.deliveryFeePercent, 0)}
                    </p>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
