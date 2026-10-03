"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

const PLACEHOLDER_TINTS = ["bg-surface-2", "bg-ok-bg", "bg-warn-bg", "bg-info-bg"];
const AUTOPLAY_MS = 4500;

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

export function PhotoCarousel({
  slides,
  className,
}: {
  slides: readonly { src: string | null; alt: string }[];
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const slide = slides[index];
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || slides.length <= 1) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % slides.length), AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [reduce, slides.length]);

  return (
    <div className={cn("border-b border-line", className)}>
      <div
        className={cn(
          "relative aspect-[16/9] overflow-hidden",
          slide.src ? "bg-surface-2" : PLACEHOLDER_TINTS[index % PLACEHOLDER_TINTS.length]
        )}
      >
        {slide.src ? (
          <Image src={slide.src} alt={slide.alt} fill sizes="600px" className="object-cover" />
        ) : (
          <div className="absolute inset-2 rounded-md border border-dashed border-line" />
        )}

        {slides.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => setIndex((i) => (i - 1 + slides.length) % slides.length)}
              aria-label="عکس قبلی"
              className="absolute inset-y-0 right-1 flex items-center focus-visible:outline-none"
            >
              <span className="flex size-7 items-center justify-center rounded-full bg-surface/90 text-ink-900 shadow-md focus-visible:ring-2 focus-visible:ring-gold">
                <ChevronIcon className="size-4 rotate-180" />
              </span>
            </button>
            <button
              type="button"
              onClick={() => setIndex((i) => (i + 1) % slides.length)}
              aria-label="عکس بعدی"
              className="absolute inset-y-0 left-1 flex items-center focus-visible:outline-none"
            >
              <span className="flex size-7 items-center justify-center rounded-full bg-surface/90 text-ink-900 shadow-md focus-visible:ring-2 focus-visible:ring-gold">
                <ChevronIcon className="size-4" />
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
      </div>

      <p className="border-t border-line bg-surface px-4 py-2 text-center text-xs text-muted">
        {slide.alt}
      </p>
    </div>
  );
}
