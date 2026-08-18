"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface AccordionItem {
  id: string;
  question: string;
  answer: ReactNode;
}

export function Accordion({
  items,
  openId,
  className,
}: {
  items: AccordionItem[];
  openId?: string;
  className?: string;
}) {
  const [open, setOpen] = useState<string | null>(openId ?? null);

  return (
    <div className={cn("divide-y divide-line border-y border-line", className)}>
      {items.map((item) => {
        const expanded = open === item.id;
        return (
          <div key={item.id} id={`faq-${item.id}`} className="scroll-mt-28">
            <h3>
              <button
                type="button"
                aria-expanded={expanded}
                aria-controls={`faq-panel-${item.id}`}
                onClick={() => setOpen(expanded ? null : item.id)}
                className="flex w-full items-center justify-between gap-4 py-5 text-right text-base font-bold text-ink-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                <span>{item.question}</span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "shrink-0 text-xl font-light transition-transform duration-200 motion-reduce:transition-none",
                    expanded && "rotate-45"
                  )}
                >
                  +
                </span>
              </button>
            </h3>
            <div
              id={`faq-panel-${item.id}`}
              role="region"
              hidden={!expanded}
              className="pb-5 text-sm leading-8 text-ink-500"
            >
              {item.answer}
            </div>
          </div>
        );
      })}
    </div>
  );
}
