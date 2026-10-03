"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { copy } from "@/content/copy.fa";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { InvestCta } from "@/components/sections/campaign/InvestCta";
import { cn } from "@/lib/cn";

const AUTOPLAY_MS = 7000;

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M15 6l-6 6 6 6" />
    </svg>
  );
}

/**
 * بنر اصلی کمپین — اسلایدشوی متنی روی زمینهٔ خزانه.
 * عمداً از تصویر پروموشنی استفاده نمی‌کند: تصاویر کمپین‌های قبلی تاریخ انقضا
 * داخل خودشان دارند و با گذشت زمان ادعای نادرست تولید می‌کنند.
 */
export function CampaignHero() {
  const { slides, controls, imagePlaceholder } = copy.campaign.hero;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const slide = slides[index];

  const go = useCallback(
    (next: number) => setIndex((next + slides.length) % slides.length),
    [slides.length]
  );

  useEffect(() => {
    if (reduce || paused || slides.length <= 1) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % slides.length), AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [reduce, paused, slides.length]);

  return (
    <section
      id="hero"
      aria-roledescription="carousel"
      aria-label={controls.region}
      className="relative scroll-mt-20 overflow-hidden border-b border-line bg-surface text-ink-900"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="relative mx-auto flex min-h-[30rem] max-w-[1160px] flex-col justify-center px-5 py-20 sm:min-h-[34rem] sm:py-28">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 1 } : { opacity: 0, y: -10 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12"
            aria-live="polite"
          >
          <div className="max-w-2xl">
            <Eyebrow>{slide.eyebrow}</Eyebrow>
            <h1 className="mt-4 text-display-xl font-black">{slide.title}</h1>
            <p className="mt-6 max-w-xl text-body leading-8 text-ink-500">{slide.subtitle}</p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <InvestCta size="lg" />
              <Button href={slide.ctaSecondary.href} variant="ghost" size="lg">
                {slide.ctaSecondary.label}
              </Button>
            </div>
            </div>

            {/* تصویر اسلاید؛ تا رسیدن فایل نهایی، باکس طوسی نمایش داده می‌شود */}
            {slide.image.src ? (
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-card border border-line bg-surface-2 sm:aspect-[5/4] lg:aspect-square">
                <Image
                  src={slide.image.src}
                  alt={slide.image.alt}
                  fill
                  sizes="(min-width: 1024px) 520px, 100vw"
                  className="object-cover"
                  priority={index === 0}
                />
              </div>
            ) : (
              <div
                role="img"
                aria-label={imagePlaceholder}
                className="aspect-[4/3] w-full rounded-card border border-dashed border-line bg-surface-2 sm:aspect-[5/4] lg:aspect-square"
              />
            )}
          </motion.div>
        </AnimatePresence>

        {slides.length > 1 && (
          <div className="mt-12 flex items-center gap-4">
            <div className="flex gap-2">
              {slides.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => go(i)}
                  aria-label={`${controls.goTo} ${i + 1}`}
                  aria-current={i === index}
                  className={cn(
                    "h-1 rounded-pill transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold",
                    i === index ? "w-10 bg-gold-dim" : "w-5 bg-line hover:bg-muted"
                  )}
                />
              ))}
            </div>

            <div className="mr-auto flex gap-2">
              <button
                type="button"
                onClick={() => go(index - 1)}
                aria-label={controls.prev}
                className="flex size-9 items-center justify-center rounded-full border border-line text-ink-900 transition-colors hover:border-ink-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                {/* در RTL «قبلی» به راست اشاره می‌کند — همان قرارداد PhotoCarousel */}
                <ChevronIcon className="size-4 rotate-180" />
              </button>
              <button
                type="button"
                onClick={() => go(index + 1)}
                aria-label={controls.next}
                className="flex size-9 items-center justify-center rounded-full border border-line text-ink-900 transition-colors hover:border-ink-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                <ChevronIcon className="size-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
