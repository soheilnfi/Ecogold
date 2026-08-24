"use client";

import { useEffect, useState } from "react";
import { formatFriendlyDateTime } from "@/lib/jalali";
import { formatToman, toPersianDigits } from "@/lib/format";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { copy } from "@/content/copy.fa";
import { cn } from "@/lib/cn";

export type PayoutUserState = "guest" | "unverified" | "eligible" | "used" | "limited";

const STEP_DELAY_MS = 1400;
const TEST_AMOUNT = 10_000;

function normalizeDigits(input: string): string {
  return input.replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d))).replace(/[\s-]/g, "");
}

function isValidCardOrIban(raw: string): boolean {
  const value = normalizeDigits(raw).toUpperCase();
  if (/^\d{16}$/.test(value)) return true; // شماره کارت ۱۶ رقمی
  if (/^IR\d{24}$/.test(value)) return true; // شبا
  return false;
}

/**
 * ویجت «تست دریافت وجه» — بخش ۰۹ سند.
 * هیچ اتصال واقعی به بک‌اند/بانک وجود ندارد (این پروژه حساب کاربری یا کیف‌پول
 * واقعی ندارد)؛ تایم‌لاین به‌صورت شبیه‌سازی‌شده در فرانت‌اند اجرا می‌شود تا
 * تجربهٔ واقعیِ مسیر برداشت را نشان دهد.
 */
export function PayoutTestWidget({
  userState,
  previousResult,
}: {
  userState: PayoutUserState;
  previousResult?: { depositedAt: string };
}) {
  const t = copy.settlement.payoutWidget;
  const [cardInput, setCardInput] = useState("");
  const [cardError, setCardError] = useState(false);
  const [cardRegistered, setCardRegistered] = useState(false);
  const [stepIndex, setStepIndex] = useState<number>(-1);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    if (stepIndex >= t.timeline.length - 1) {
      setRunning(false);
      return;
    }
    const timer = setTimeout(() => setStepIndex((i) => i + 1), STEP_DELAY_MS);
    return () => clearTimeout(timer);
  }, [running, stepIndex, t.timeline.length]);

  function submitCard() {
    if (!isValidCardOrIban(cardInput)) {
      setCardError(true);
      return;
    }
    setCardError(false);
    setCardRegistered(true);
  }

  function start() {
    setStepIndex(0);
    setRunning(true);
  }

  return (
    <div className="rounded-card border-2 border-gold bg-surface p-6 sm:p-8">
      <Chip tone="ok" icon={<span className="size-1.5 rounded-full bg-ok motion-safe:animate-pulse" />}>
        {t.availabilityBadge}
      </Chip>
      <h3 className="mt-3 text-h3 font-bold text-ink-900">{t.title}</h3>
      <p className="mt-2 text-sm leading-7 text-ink-500">{t.description(formatToman(TEST_AMOUNT))}</p>

      <div className="mt-5">
        {userState === "guest" && (
          <Button variant="dark" href="/login">
            {t.guestCta}
          </Button>
        )}

        {userState === "unverified" && (
          <Button variant="dark" href="/verify">
            {t.unverifiedCta}
          </Button>
        )}

        {userState === "limited" && (
          <p className="rounded-md bg-warn-bg px-4 py-3 text-sm font-bold text-warn">
            {t.limitedMessage}
          </p>
        )}

        {userState === "used" && previousResult && (
          <p className="rounded-md bg-ok-bg px-4 py-3 text-sm font-bold text-ok">
            {t.usedMessagePrefix} {formatFriendlyDateTime(previousResult.depositedAt)}{" "}
            {t.usedMessageSuffix}
          </p>
        )}

        {userState === "eligible" && !cardRegistered && (
          <div className="flex flex-col gap-2">
            <label htmlFor="payout-card" className="text-xs font-bold text-ink-700">
              {t.cardStep.label}
            </label>
            <input
              id="payout-card"
              type="text"
              dir="ltr"
              value={cardInput}
              onChange={(e) => {
                setCardInput(e.target.value);
                setCardError(false);
              }}
              placeholder={t.cardStep.placeholder}
              className="w-full rounded-md border border-line bg-surface px-4 py-2.5 text-left text-sm tabular-nums text-ink-900 placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            />
            <p className="text-xs text-muted">{t.cardStep.helper}</p>
            {cardError && <p className="text-xs font-bold text-down">{t.cardStep.error}</p>}
            <Button variant="dark" size="md" onClick={submitCard} className="mt-1 self-start">
              {t.cardStep.submit}
            </Button>
          </div>
        )}

        {userState === "eligible" && cardRegistered && stepIndex === -1 && (
          <div className="flex flex-col gap-3">
            <p className="text-xs font-bold text-ok">✓ {t.cardStep.registered}</p>
            <Button variant="primary" onClick={start} className="self-start">
              {t.requestCta}
            </Button>
          </div>
        )}

        {userState === "eligible" && stepIndex >= 0 && (
          <ol className="flex flex-col gap-3">
            {t.timeline.map((step, idx) => {
              const done = idx <= stepIndex;
              return (
                <li key={step.key} className="flex items-center gap-3 text-sm">
                  <span
                    className={cn(
                      "flex size-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold",
                      done ? "bg-ok text-white" : "bg-surface-2 text-muted"
                    )}
                    aria-hidden="true"
                  >
                    {done ? "✓" : toPersianDigits(idx + 1)}
                  </span>
                  <span className={done ? "font-bold text-ink-900" : "text-muted"}>
                    {step.label}
                  </span>
                </li>
              );
            })}
          </ol>
        )}
      </div>

      <p className="mt-5 border-t border-line pt-4 text-xs leading-6 text-muted">
        {t.disclaimer}
      </p>
    </div>
  );
}
