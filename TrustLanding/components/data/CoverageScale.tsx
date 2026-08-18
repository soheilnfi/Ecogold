"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { formatPercent } from "@/lib/format";
import type { FreshnessStatus } from "@/lib/freshness";
import type { CoverageDisplayMode } from "@/lib/coverage-disclosure";
import { copy } from "@/content/copy.fa";
import { FreshnessSeal } from "./FreshnessSeal";

/**
 * کفهٔ چپ (موجودی فیزیکی) در SVG سمت x کوچک‌تر است؛ چرخش مثبت (کلاک‌وایز)
 * سمت راست (تعهد به کاربران) را پایین می‌برد. پس وقتی ratio>100 (موجودی
 * سنگین‌تر از تعهد است) باید زاویه منفی باشد تا کفهٔ چپ/موجودی پایین بیفتد —
 * موجودی فیزیکی همیشه باید از تعهد به کاربران سنگین‌تر (پایین‌تر) دیده شود.
 */
function clampAngle(ratio: number): number {
  return Math.min(6, Math.max(-6, -(ratio - 100) * 1.2));
}

/** المان امضا — ترازوی زندهٔ پوشش دارایی */
export function CoverageScale({
  status,
  ratio,
  asOf,
  display,
  loading = false,
}: {
  status: FreshnessStatus;
  ratio: number | null;
  asOf: string | null;
  display: CoverageDisplayMode;
  loading?: boolean;
}) {
  const reduce = useReducedMotion();
  const angle = ratio !== null ? clampAngle(ratio) : 0;
  const showBeam = status !== "unavailable" && !loading;
  const t = copy.hero.scale;

  // فاز ۱: نشست فنری با کمی سرریز (جذاب‌تر از یک چرخش صاف)
  // فاز ۲: بعد از نشستن، یک تاب خیلی ملایم و پیوسته — تا ترازو «زنده» بماند
  const [settled, setSettled] = useState(false);
  useEffect(() => {
    setSettled(false);
  }, [angle, showBeam]);

  return (
    <div className="flex flex-col items-center gap-5">
      <svg
        viewBox="0 0 320 190"
        role="img"
        aria-label={
          status === "unavailable"
            ? t.unavailable
            : display.kind === "number" && ratio !== null
              ? `${t.caption}: ${formatPercent(ratio)}`
              : t.caption
        }
        className="h-auto w-64 sm:w-72"
      >
        {/* پایه */}
        <rect x="152" y="160" width="16" height="14" rx="2" fill="var(--ink-900)" />
        <rect x="120" y="172" width="80" height="8" rx="4" fill="var(--ink-900)" />
        {/* ستون */}
        <rect x="156" y="60" width="8" height="104" fill="var(--ink-900)" />
        {/* فلکه */}
        <circle cx="160" cy="58" r="7" fill="var(--gold)" />

        <motion.g
          initial={false}
          animate={{
            rotate: !showBeam
              ? 0
              : settled
                ? [angle - 0.6, angle + 0.6, angle - 0.6]
                : [angle * 1.6, angle - 0.8, angle + 0.4, angle],
          }}
          transition={
            reduce
              ? { duration: 0 }
              : settled
                ? { duration: 5, repeat: Infinity, ease: "easeInOut" }
                : { duration: 1.3, times: [0, 0.55, 0.8, 1], ease: "easeOut" }
          }
          onAnimationComplete={() => {
            if (!reduce && showBeam) setSettled(true);
          }}
          style={{ originX: "160px", originY: "58px" }}
        >
          {/* تیرک ترازو */}
          <rect x="45" y="55" width="230" height="6" rx="3" fill="var(--ink-900)" />

          {/* بند و کفهٔ راست: تعهد به کاربران */}
          <line x1="262" y1="58" x2="262" y2="98" stroke="var(--ink-700)" strokeWidth="2" />
          <path
            d="M 232 98 Q 262 122 292 98"
            fill="none"
            stroke="var(--ink-900)"
            strokeWidth="4"
            strokeLinecap="round"
          />

          {/* بند و کفهٔ چپ: موجودی فیزیکی */}
          <line x1="58" y1="58" x2="58" y2="98" stroke="var(--ink-700)" strokeWidth="2" />
          <path
            d="M 28 98 Q 58 122 88 98"
            fill="none"
            stroke="var(--gold-dim)"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </motion.g>

        <text x="262" y="140" textAnchor="middle" className="fill-muted text-[10px]">
          {t.liability}
        </text>
        <text x="58" y="140" textAnchor="middle" className="fill-muted text-[10px]">
          {t.asset}
        </text>
      </svg>

      <div className="flex flex-col items-center gap-1 text-center">
        {loading ? (
          <div className="h-12 w-32 animate-pulse rounded-md bg-surface-2" />
        ) : status === "unavailable" ? (
          <p className="max-w-[220px] text-sm font-bold text-muted">
            {t.unavailable}{" "}
            <a href="#status" className="underline underline-offset-2 hover:text-ink-900">
              {t.unavailableLink}
            </a>
          </p>
        ) : display.kind === "threshold-message" ? (
          <p className="max-w-[240px] text-sm font-bold text-warn">
            {copy.coverageReport.disclosurePolicy.thresholdMessage}
          </p>
        ) : display.kind === "qualitative" ? (
          <p className="text-metric font-black text-gold-dim">
            {display.ok
              ? copy.coverageReport.disclosurePolicy.hiddenOk
              : copy.coverageReport.disclosurePolicy.hiddenReviewing}
          </p>
        ) : (
          <p
            className="text-metric font-black tabular-nums text-gold-dim"
            aria-live="polite"
          >
            {ratio !== null ? formatPercent(ratio) : "—"}
          </p>
        )}
        <p className="text-sm text-muted">{t.caption}</p>
        {!loading && <FreshnessSeal status={status} asOf={asOf} />}
      </div>
    </div>
  );
}
