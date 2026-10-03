import Image from "next/image";
import Link from "next/link";
import { copy } from "@/content/copy.fa";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { InvestCta } from "@/components/sections/campaign/InvestCta";

/**
 * بنر میانی کمپین. اگر تصویر بنر ست شده باشد همان رندر می‌شود، وگرنه نوار
 * طلاییِ متنی. تصویری که تیتر و دکمه داخل خودش دارد باید از این مسیر بیاید —
 * کل بنر یک لینک است، چون دکمهٔ داخل عکس کلیک‌پذیر نیست.
 */
export function CampaignBanner() {
  const t = copy.campaign.banner;

  return (
    <section className="border-b border-line">
      <div className="mx-auto max-w-[1160px] px-5 py-10">
        <Reveal>
          {t.image.src ? (
            <Link
              href={t.image.href}
              className="group block overflow-hidden rounded-card border border-line focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
            >
              <Image
                src={t.image.src}
                alt={t.image.alt}
                width={t.image.width}
                height={t.image.height}
                sizes="(min-width: 1160px) 1120px, 100vw"
                className="h-auto w-full transition-transform duration-500 motion-safe:group-hover:scale-[1.02]"
              />
            </Link>
          ) : (
            <div className="flex flex-col items-start gap-6 rounded-card bg-gold px-6 py-8 text-ink-on-gold sm:flex-row sm:items-center sm:justify-between sm:px-10">
              <div>
                <Eyebrow className="!text-ink-on-gold/70">{t.eyebrow}</Eyebrow>
                <p className="mt-2 text-h2 font-black">{t.title}</p>
                <p className="mt-2 max-w-xl text-sm leading-7 text-ink-on-gold/80">
                  {t.description}
                </p>
              </div>
              <InvestCta variant="dark" size="lg" className="shrink-0" />
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}
