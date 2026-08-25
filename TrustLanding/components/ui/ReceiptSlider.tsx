"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";
import { toPersianDigits } from "@/lib/format";

const THUMB_TILTS = ["-rotate-3", "rotate-2", "-rotate-1", "rotate-3", "rotate-1", "-rotate-2"];

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

export function ReceiptSlider({ items }: { items: readonly { src: string; alt: string }[] }) {
  const [index, setIndex] = useState(0);
  const active = items[index];

  return (
    <div>
      <div className="relative mx-auto aspect-[3/4] max-w-xs overflow-hidden rounded-card border border-line bg-surface-2">
        <Image
          key={active.src}
          src={active.src}
          alt={active.alt}
          fill
          sizes="320px"
          className="object-contain"
        />

        <button
          type="button"
          onClick={() => setIndex((i) => (i - 1 + items.length) % items.length)}
          aria-label="رسید قبلی"
          className="absolute inset-y-0 right-1 flex items-center focus-visible:outline-none"
        >
          <span className="flex size-8 items-center justify-center rounded-full bg-surface/90 text-ink-900 shadow-md focus-visible:ring-2 focus-visible:ring-gold">
            <ChevronIcon className="size-4 rotate-180" />
          </span>
        </button>
        <button
          type="button"
          onClick={() => setIndex((i) => (i + 1) % items.length)}
          aria-label="رسید بعدی"
          className="absolute inset-y-0 left-1 flex items-center focus-visible:outline-none"
        >
          <span className="flex size-8 items-center justify-center rounded-full bg-surface/90 text-ink-900 shadow-md focus-visible:ring-2 focus-visible:ring-gold">
            <ChevronIcon className="size-4" />
          </span>
        </button>
      </div>

      <p className="mt-2 text-center text-xs tabular-nums text-muted">
        {toPersianDigits(index + 1)} / {toPersianDigits(items.length)}
      </p>

      <div className="mt-4 flex gap-3 overflow-x-auto px-1 pb-2">
        {items.map((item, i) => (
          <button
            key={item.src}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={item.alt}
            className={cn(
              "relative size-14 shrink-0 overflow-hidden rounded-md border-2 bg-surface-2 shadow-sm transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold motion-safe:hover:rotate-0 motion-safe:hover:scale-110",
              i === index ? "border-gold rotate-0 scale-110" : cn("border-line", THUMB_TILTS[i % THUMB_TILTS.length])
            )}
          >
            <Image src={item.src} alt={item.alt} fill sizes="56px" className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
