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
  onVault = false,
}: {
  buy: number | null;
  sell: number | null;
  disabled?: boolean;
  onVault?: boolean;
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
    <div
      className={cn(
        "rounded-card border p-5 sm:p-6",
        onVault ? "border-vault-line bg-vault-700" : "border-line bg-surface-2"
      )}
    >
      <p className={cn("mb-4 text-sm font-bold", onVault ? "text-vault-ink" : "text-ink-900")}>
        {t.title}
      </p>

      <div
        className={cn(
          "mb-3 inline-flex gap-1 rounded-pill border p-1",
          onVault ? "border-vault-line bg-vault-900" : "border-line bg-surface"
        )}
      >
        {(["gram", "toman"] as Mode[]).map((m) => (
          <button
            key={m}
            type="button"
            disabled={disabled}
            onClick={() => setMode(m)}
            className={cn(
              "rounded-pill px-4 py-1.5 text-xs font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold",
              onVault
                ? mode === m
                  ? "bg-gold text-ink-on-gold"
                  : "text-vault-muted hover:text-vault-ink"
                : mode === m
                  ? "bg-ink-900 text-white"
                  : "text-ink-500 hover:text-ink-900"
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
        className={cn(
          "w-full rounded-md border px-4 py-2.5 text-sm tabular-nums focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold disabled:opacity-50",
          onVault
            ? "border-vault-line bg-vault-900 text-vault-ink"
            : "border-line bg-surface text-ink-900"
        )}
      />

      <p className="mt-4 text-sm" aria-live="polite">
        {disabled ? (
          <span className={onVault ? "text-vault-muted" : "text-muted"}>{t.disabledNote}</span>
        ) : differenceLabel ? (
          <>
            <span className={onVault ? "text-vault-muted" : "text-muted"}>{t.resultPrefix} </span>
            <span
              className={cn(
                "font-bold tabular-nums",
                onVault ? "text-gold" : "text-ink-900"
              )}
            >
              {differenceLabel}
            </span>
          </>
        ) : (
          <span className={onVault ? "text-vault-muted" : "text-muted"}>—</span>
        )}
      </p>
      {mode === "gram" && !disabled && (
        <p className={cn("mt-1 text-xs", onVault ? "text-vault-muted" : "text-muted")}>
          {formatGrams(numericAmount || 0)}
        </p>
      )}
    </div>
  );
}
