"use client";

import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface TabItem {
  key: string;
  label: string;
  content: ReactNode;
}

export function Tabs({
  items,
  defaultKey,
  className,
}: {
  items: TabItem[];
  defaultKey?: string;
  className?: string;
}) {
  const [active, setActive] = useState(defaultKey ?? items[0]?.key);
  const baseId = useId();
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    const idx = items.findIndex((i) => i.key === active);
    if (idx === -1) return;
    let nextIdx: number | null = null;
    // RTL: فلش راست = قبلی، فلش چپ = بعدی
    if (e.key === "ArrowLeft") nextIdx = (idx + 1) % items.length;
    if (e.key === "ArrowRight") nextIdx = (idx - 1 + items.length) % items.length;
    if (nextIdx !== null) {
      e.preventDefault();
      setActive(items[nextIdx].key);
      tabRefs.current[nextIdx]?.focus();
    }
  }

  return (
    <div className={className}>
      <div
        role="tablist"
        aria-orientation="horizontal"
        onKeyDown={onKeyDown}
        className="inline-flex gap-1 rounded-pill border border-line bg-surface-2 p-1"
      >
        {items.map((item, idx) => {
          const selected = item.key === active;
          return (
            <button
              key={item.key}
              ref={(el) => {
                tabRefs.current[idx] = el;
              }}
              role="tab"
              id={`${baseId}-tab-${item.key}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${item.key}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(item.key)}
              className={cn(
                "rounded-pill px-5 py-2 text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold",
                selected ? "bg-ink-900 text-white" : "text-ink-500 hover:text-ink-900"
              )}
            >
              {item.label}
            </button>
          );
        })}
      </div>
      {items.map((item) => (
        <div
          key={item.key}
          role="tabpanel"
          id={`${baseId}-panel-${item.key}`}
          aria-labelledby={`${baseId}-tab-${item.key}`}
          hidden={item.key !== active}
        >
          {item.key === active && item.content}
        </div>
      ))}
    </div>
  );
}
