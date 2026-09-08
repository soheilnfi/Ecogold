import Image from "next/image";
import { copy } from "@/content/copy.fa";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Tabs } from "@/components/ui/Tabs";
import { formatDecimal, formatPercent, toPersianDigits } from "@/lib/format";

/** کارمزد تحویل طلای آب‌شده بر اساس وزن: زیر ۱۵ گرم ۱.۵٪، زیر ۳۰ گرم ۱٪، از ۳۰ گرم به بالا ۰.۵٪ */
function meltedGoldFeePercent(weightGrams: number): number {
  if (weightGrams < 15) return 1.5;
  if (weightGrams < 30) return 1;
  return 0.5;
}

function ProductCard({
  imageUrl,
  alt,
  brand,
  children,
}: {
  imageUrl: string;
  alt: string;
  brand: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full flex-col items-start gap-2 rounded-card border border-line bg-surface p-4">
      <div className="relative h-16 w-full shrink-0 overflow-hidden rounded-md bg-surface-2">
        <Image
          src={imageUrl}
          alt={alt}
          fill
          sizes="40px"
          className="object-contain object-bottom p-2"
        />
      </div>
      <p className="text-sm font-bold text-ink-900">{brand}</p>
      <div className="flex flex-col gap-1">{children}</div>
    </div>
  );
}

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

        <Reveal delay={0.05} className="mt-10">
          <Tabs
            items={[
              {
                key: "melted",
                label: t.tabs.melted,
                content: (
                  <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                    {t.meltedItems.map((item) => (
                      <ProductCard
                        key={item.key}
                        imageUrl={t.meltedGoldImage}
                        alt={`${item.brand} ${formatDecimal(item.rawWeightGrams, 3)} گرم`}
                        brand={item.brand}
                      >
                        <p className="text-xs tabular-nums text-muted">
                          {t.rawWeightLabel}: {formatDecimal(item.rawWeightGrams, 3)} گرم
                        </p>
                        <p className="text-xs tabular-nums text-muted">
                          {t.purityLabel}: {toPersianDigits(item.purity)}
                        </p>
                        <p className="text-xs tabular-nums text-muted">
                          {t.weight750Label}: {formatDecimal(item.weight750Grams, 3)} گرم
                        </p>
                        <p className="text-xs tabular-nums text-muted">
                          {t.deliveryFeeLabel}: {formatPercent(meltedGoldFeePercent(item.rawWeightGrams), 1)}
                        </p>
                      </ProductCard>
                    ))}
                  </div>
                ),
              },
              {
                key: "bar",
                label: t.tabs.bar,
                content: (
                  <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                    {t.barItems.map((item) => (
                      <ProductCard
                        key={item.key}
                        imageUrl={t.barImage}
                        alt={`${item.brand} ${formatDecimal(item.weightGrams, 1)} گرم`}
                        brand={item.brand}
                      >
                        <p className="text-xs tabular-nums text-muted">
                          {t.weightLabel}: {formatDecimal(item.weightGrams, 1)} گرم
                        </p>
                        <p className="text-xs tabular-nums text-muted">
                          {t.deliveryFeeLabel}: {formatPercent(item.deliveryFeePercent, 1)}
                        </p>
                      </ProductCard>
                    ))}
                  </div>
                ),
              },
            ]}
          />
        </Reveal>
      </div>
    </section>
  );
}
