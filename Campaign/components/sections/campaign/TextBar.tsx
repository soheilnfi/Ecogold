"use client";

import { useState } from "react";
import Link from "next/link";
import { copy } from "@/content/copy.fa";

/**
 * نوار متنی بالای صفحه. هر متنی که در copy.campaign.textBar نوشته شود همین‌جا
 * رندر می‌شود — نقطهٔ واحد برای اعلان‌های موقت کمپین.
 */
export function TextBar() {
  const t = copy.campaign.textBar;
  const [dismissed, setDismissed] = useState(false);

  if (dismissed || !t.text) return null;

  return (
    <div className="relative z-50 bg-ink-900 text-white">
      <div className="mx-auto flex max-w-[1160px] items-center gap-3 px-5 py-2.5">
        <p className="flex-1 text-center text-xs leading-6 sm:text-sm">
          {t.text}
          {t.linkLabel && (
            <Link
              href={t.linkHref}
              className="mr-2 font-bold text-gold underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              {t.linkLabel}
            </Link>
          )}
        </p>

        <button
          type="button"
          onClick={() => setDismissed(true)}
          aria-label={t.dismiss}
          className="shrink-0 rounded-full p-1 text-white/60 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
            className="size-4"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
