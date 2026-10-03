"use client";

import { useState } from "react";
import { formatGrams, formatPieces, formatToman, toLatinDigits, toPersianDigits } from "@/lib/format";
import { copy } from "@/content/copy.fa";
import { cn } from "@/lib/cn";

type Mode = "quantity" | "toman";

/** ورودی کاربر (فارسی/لاتین، با جداکننده یا بدون آن) را به رشتهٔ عددی خام (لاتین) تبدیل می‌کند */
function toRawDigits(input: string): string {
  const cleaned = toLatinDigits(input)
    .replace(/[,٬]/g, "")
    .replace(/٫/g, ".")
    .replace(/[^\d.]/g, "");
  const [intPart, ...rest] = cleaned.split(".");
  return rest.length ? `${intPart}.${rest.join("")}` : intPart;
}

/** رشتهٔ عددی خام را برای نمایش در اینپوت با ارقام فارسی و جداکنندهٔ هزارگان قالب‌بندی می‌کند */
function formatAmountDisplay(raw: string): string {
  if (!raw) return "";
  const [intPart, decPart] = raw.split(".");
  const grouped = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const withPersianInt = toPersianDigits(grouped).replace(/,/g, "٬");
  return decPart !== undefined ? `${withPersianInt}٫${toPersianDigits(decPart)}` : withPersianInt;
}

export function SpreadCalculator({
  buy,
  sell,
  unit = "gram",
  disabled = false,
  onVault = false,
}: {
  buy: number | null;
  sell: number | null;
  unit?: "gram" | "piece";
  disabled?: boolean;
  onVault?: boolean;
}) {
  const [mode, setMode] = useState<Mode>("quantity");
  const [amount, setAmount] = useState("1");
  const t = copy.priceTransparency.calculator;
  const quantityLabel = unit === "piece" ? t.inputPieceLabel : t.inputGramLabel;
  const formatQuantity = unit === "piece" ? formatPieces : formatGrams;

  const numericAmount = Number(amount);
  const isValid = Number.isFinite(numericAmount) && numericAmount > 0;
  const canCalculate = !disabled && buy !== null && sell !== null && isValid;

  let differenceLabel: string | null = null;
  if (canCalculate && buy !== null && sell !== null) {
    if (mode === "quantity") {
      const diff = numericAmount * (buy - sell);
      differenceLabel = formatToman(diff);
    } else {
      const units = numericAmount / buy;
      const proceeds = units * sell;
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
        {(["quantity", "toman"] as Mode[]).map((m) => (
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
            {m === "quantity" ? quantityLabel : t.inputTomanLabel}
          </button>
        ))}
      </div>

      <input
        type="text"
        inputMode="decimal"
        disabled={disabled}
        value={formatAmountDisplay(amount)}
        onChange={(e) => setAmount(toRawDigits(e.target.value))}
        aria-label={mode === "quantity" ? quantityLabel : t.inputTomanLabel}
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
      {mode === "quantity" && !disabled && (
        <p className={cn("mt-1 text-xs", onVault ? "text-vault-muted" : "text-muted")}>
          {formatQuantity(numericAmount || 0)}
        </p>
      )}
    </div>
  );
}
