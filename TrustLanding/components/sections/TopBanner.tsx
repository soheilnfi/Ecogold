"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { copy } from "@/content/copy.fa";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

const AUTOPLAY_MS = 5000;

export function TopBanner() {
  const slides = copy.topBanner.slides;
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || slides.length <= 1) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % slides.length), AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [reduce, slides.length]);

  const slide = slides[index];

  return (
    <div
      className={cn(
        "relative aspect-[16/3] w-full overflow-hidden border-b border-vault-line bg-vault-900",
        slide.src && "bg-surface-2"
      )}
    >
      {slide.src && (
        <Image src={slide.src} alt={slide.title} fill sizes="100vw" className="object-cover" />
      )}
      <div className="relative mx-auto flex h-full max-w-[1160px] items-center px-5">
        <div className="max-w-md">
          <p className="text-sm font-bold text-vault-ink sm:text-base">{slide.title}</p>
          <p className="mt-1 text-xs leading-6 text-vault-muted">{slide.description}</p>
          <Button href={slide.href} size="md" className="mt-2">
            {slide.cta}
          </Button>
        </div>
      </div>

      {slides.length > 1 && (
        <div className="absolute inset-x-0 bottom-2 flex justify-center gap-1.5">
          {slides.map((s, i) => (
            <button
              key={s.title}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`اسلاید ${i + 1} از ${slides.length}`}
              className={cn(
                "size-1.5 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold",
                i === index ? "bg-gold" : "bg-vault-ink/25"
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
