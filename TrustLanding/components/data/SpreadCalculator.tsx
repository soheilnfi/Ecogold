"use client";

import { useState } from "react";
import { formatGrams, formatToman } from "@/lib/format";
import { copy } from "@/content/copy.fa";
import { cn } from "@/lib/cn";

type Mode = "gram" | "toman";

export function SpreadCalculator({
  buy,
  sell,
  disabled = false,
}: {
  buy: number | null;
  sell: number | null;
  disabled?: boolean;
}) {
  const [mode, setMode] = useState<Mode>("gram");
  const [amount, setAmount] = useState("1");
  const t = copy.priceTransparency.calculator;

  const numericAmount = Number(amount);
  const isValid = Number.isFinite(numericAmount) && numericAmount > 0;
  const canCalculate = !disabled && buy !== null && sell !== null && isValid;

  let differenceLabel: string | null = null;
  if (canCalculate && buy !== null && sell !== null) {
    if (mode === "gram") {
      const diff = numericAmount * (buy - sell);
      differenceLabel = formatToman(diff);
    } else {
      const grams = numericAmount / buy;
      const proceeds = grams * sell;
      differenceLabel = formatToman(numericAmount - proceeds);
    }
  }

  return (
    <div className="rounded-card border border-line bg-surface-2 p-5 sm:p-6">
      <p className="mb-4 text-sm font-bold text-ink-900">{t.title}</p>

      <div className="mb-3 inline-flex gap-1 rounded-pill border border-line bg-surface p-1">
        {(["gram", "toman"] as Mode[]).map((m) => (
          <button
            key={m}
            type="button"
            disabled={disabled}
            onClick={() => setMode(m)}
            className={cn(
              "rounded-pill px-4 py-1.5 text-xs font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold",
              mode === m ? "bg-ink-900 text-white" : "text-ink-500 hover:text-ink-900"
            )}
          >
            {m === "gram" ? t.inputGramLabel : t.inputTomanLabel}
          </button>
        ))}
      </div>

      <input
        type="number"
        min={0}
        step="any"
        inputMode="decimal"
        disabled={disabled}
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        aria-label={mode === "gram" ? t.inputGramLabel : t.inputTomanLabel}
        className="w-full rounded-md border border-line bg-surface px-4 py-2.5 text-sm tabular-nums text-ink-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold disabled:opacity-50"
      />

      <p className="mt-4 text-sm" aria-live="polite">
        {disabled ? (
          <span className="text-muted">{t.disabledNote}</span>
        ) : differenceLabel ? (
          <>
            <span className="text-muted">{t.resultPrefix} </span>
            <span className="font-bold tabular-nums text-ink-900">{differenceLabel}</span>
          </>
        ) : (
          <span className="text-muted">—</span>
        )}
      </p>
      {mode === "gram" && !disabled && (
        <p className="mt-1 text-xs text-muted">{formatGrams(numericAmount || 0)}</p>
      )}
    </div>
  );
}
