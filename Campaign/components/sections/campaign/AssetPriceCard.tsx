"use client";

import Image from "next/image";
import Link from "next/link";
import { copy } from "@/content/copy.fa";
import type { FreshnessStatus } from "@/lib/freshness";
import { formatPercent, formatToman } from "@/lib/format";
import { cn } from "@/lib/cn";
import type { AssetKey, PricePoint, PriceResponse } from "@/lib/mock/prices";

type Direction = "up" | "down" | "flat";

function directionOf(percent: number | null): Direction {
  if (percent === null || percent === 0) return "flat";
  return percent > 0 ? "up" : "down";
}

const STROKE: Record<Direction, string> = {
  up: "var(--market-up)",
  down: "var(--market-down)",
  flat: "var(--market-flat)",
};

const BADGE: Record<Direction, string> = {
  up: "bg-market-up-bg text-market-up",
  down: "bg-market-down-bg text-market-down",
  flat: "bg-market-flat-bg text-market-flat",
};

/** اسپارک‌لاین سری ۲۴ ساعته — رنگش از جهت تغییر می‌آید، نه از رنگ برند */
function Sparkline({ points, direction }: { points: PricePoint[]; direction: Direction }) {
  const values = points.map((p) => p.price);
  if (values.length < 2) return null;

  const W = 100;
  const H = 34;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const step = W / (values.length - 1);

  const line = values
    .map((v, i) => `${i === 0 ? "M" : "L"}${(i * step).toFixed(2)} ${(H - ((v - min) / range) * H).toFixed(2)}`)
    .join(" ");
  const area = `${line} L${W} ${H} L0 ${H} Z`;
  const gradientId = `spark-${direction}-${points.length}-${Math.round(min)}`;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="none"
      className="h-8 w-20"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={STROKE[direction]} stopOpacity={0.28} />
          <stop offset="100%" stopColor={STROKE[direction]} stopOpacity={0} />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${gradientId})`} />
      <path
        d={line}
        fill="none"
        stroke={STROKE[direction]}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="size-3.5 text-muted transition-transform duration-200 group-hover:-translate-x-0.5"
    >
      <path d="M15 6l-6 6 6 6" />
    </svg>
  );
}

export function AssetPriceCard({
  asset,
  data,
  status,
  loading,
}: {
  asset: AssetKey;
  data: PriceResponse | null;
  status: FreshnessStatus;
  loading: boolean;
}) {
  const t = copy.campaign.priceTicker;
  const meta = t.assets[asset];

  const unavailable = status === "unavailable" || !data || data.buy === null;
  const stale = status === "stale";
  const percent = unavailable ? null : (data!.change24hPercent ?? null);
  const direction = directionOf(percent);
  const unitLabel = data?.unit === "piece" ? t.units.piece : t.units.gram;

  const changeText =
    percent === null
      ? t.states.noChange
      : `${percent > 0 ? "+" : percent < 0 ? "−" : ""}${formatPercent(Math.abs(percent), 2)}`;

  return (
    <Link
      href={meta.href}
      className="group flex flex-col rounded-card border border-line bg-surface p-5 transition-transform duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold motion-safe:hover:-translate-y-1"
    >
      <div className="flex items-start justify-between gap-3">
        {meta.icon ? (
          <Image src={meta.icon} alt={meta.iconAlt} width={36} height={36} className="size-9" />
        ) : (
          <span
            role="img"
            aria-label={meta.iconAlt}
            className="size-9 rounded-full border border-dashed border-line bg-surface-2"
          />
        )}

        {!unavailable && data!.history && data!.history.length > 1 && (
          <Sparkline points={data!.history} direction={direction} />
        )}
      </div>

      <div className="mt-4 flex items-center gap-1.5">
        <p className="text-sm font-bold text-ink-900">{meta.label}</p>
        <ChevronIcon />
        <span className="mr-auto text-xs text-muted">{unitLabel}</span>
      </div>

      <p
        className={cn(
          "mt-1.5 text-lg font-black tabular-nums",
          unavailable ? "text-muted" : "text-ink-900"
        )}
      >
        {loading && !data
          ? t.states.loading
          : unavailable
            ? t.states.unavailable
            : formatToman(data!.buy!)}
      </p>

      {stale && (
        <p className="mt-2 text-xs font-bold leading-6 text-warn">{t.states.delayed}</p>
      )}

      <div className="mt-4 flex items-center justify-between gap-3">
        <span className="text-xs text-muted">{t.labels.change}</span>
        <span
          className={cn(
            "rounded-pill px-2.5 py-1 text-xs font-bold tabular-nums",
            unavailable ? "bg-unavailable-bg text-unavailable" : BADGE[direction]
          )}
        >
          {unavailable ? "—" : changeText}
        </span>
      </div>
    </Link>
  );
}
