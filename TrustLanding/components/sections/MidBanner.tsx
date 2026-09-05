"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { copy } from "@/content/copy.fa";
import { Button } from "@/components/ui/Button";
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
    <section className="border-b border-line bg-vault-900 text-vault-ink">
      <div className="mx-auto flex max-w-[1160px] flex-col items-center gap-4 px-5 py-6 sm:flex-row sm:justify-between">
        <div className="text-center sm:text-right">
          <p className="text-sm font-bold">{slide.title}</p>
          <p className="mt-1 text-xs text-vault-muted">{slide.description}</p>
        </div>

        <div className="flex items-center gap-4">
          <Button href={slide.href} size="md">
            {slide.cta}
          </Button>

          {slides.length > 1 && (
            <div className="flex gap-1.5">
              {slides.map((s, i) => (
                <button
                  key={s.title}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`پیام ${i + 1} از ${slides.length}`}
                  className={cn(
                    "size-1.5 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold",
                    i === index ? "bg-gold" : "bg-vault-line"
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
