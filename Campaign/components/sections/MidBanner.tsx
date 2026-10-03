"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import { copy } from "@/content/copy.fa";
import { cn } from "@/lib/cn";

const AUTOPLAY_MS = 5000;

export function MidBanner() {
  const slides = copy.midBanner.slides;
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();
  const slide = slides[index];

  useEffect(() => {
    if (reduce || slides.length <= 1) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % slides.length), AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [reduce, slides.length]);

  return (
    <section className="border-b border-line">
      <div className="mx-auto max-w-[1160px] px-5 py-8">
        <div className="relative aspect-[3/1] w-full overflow-hidden rounded-card">
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            sizes="(min-width: 1160px) 1160px, 100vw"
            className="object-cover"
            priority={index === 0}
          />

          <Link
            href={slide.href}
            aria-label={`${slide.alt} — ${slide.cta}`}
            className="absolute inset-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          />

          {slides.length > 1 && (
            <div className="pointer-events-none absolute inset-x-0 bottom-3 flex justify-center gap-1.5">
              {slides.map((s, i) => (
                <button
                  key={s.src}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`پیام ${i + 1} از ${slides.length}`}
                  className={cn(
                    "pointer-events-auto size-1.5 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold",
                    i === index ? "bg-gold" : "bg-white/50"
                  )}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
