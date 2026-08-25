"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";

export function PhotoCarousel({
  slides,
  className,
}: {
  slides: readonly { src: string | null; alt: string }[];
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const slide = slides[index];

  return (
    <div className={cn("relative border-b border-line", className)}>
      <div className="relative aspect-[16/9] overflow-hidden bg-surface-2">
        {slide.src ? (
          <Image src={slide.src} alt={slide.alt} fill sizes="600px" className="object-cover" />
        ) : (
          <div className="absolute inset-2 rounded-md border border-dashed border-line" />
        )}
      </div>

      {slides.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => setIndex((i) => (i - 1 + slides.length) % slides.length)}
            aria-label="عکس قبلی"
            className="absolute inset-y-0 right-2 flex items-center focus-visible:outline-none"
          >
            <span className="flex size-8 items-center justify-center rounded-full bg-surface/90 text-ink-900 shadow-md focus-visible:ring-2 focus-visible:ring-gold">
              ›
            </span>
          </button>
          <button
            type="button"
            onClick={() => setIndex((i) => (i + 1) % slides.length)}
            aria-label="عکس بعدی"
            className="absolute inset-y-0 left-2 flex items-center focus-visible:outline-none"
          >
            <span className="flex size-8 items-center justify-center rounded-full bg-surface/90 text-ink-900 shadow-md focus-visible:ring-2 focus-visible:ring-gold">
              ‹
            </span>
          </button>
          <div className="absolute inset-x-0 bottom-3 flex justify-center gap-1.5">
            {slides.map((s, i) => (
              <button
                key={s.alt}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`عکس ${i + 1} از ${slides.length}`}
                className={cn(
                  "size-1.5 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold",
                  i === index ? "bg-gold" : "bg-surface/70"
                )}
              />
            ))}
          </div>
        </>
      )}

      <p className="border-t border-line bg-surface px-4 py-2 text-center text-xs text-muted">
        {slide.alt}
      </p>
    </div>
  );
}
