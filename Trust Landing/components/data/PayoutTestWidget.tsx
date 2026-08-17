"use client";

import { useEffect, useState } from "react";
import { formatFriendlyDateTime } from "@/lib/jalali";
import { formatToman } from "@/lib/format";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

export type PayoutUserState = "guest" | "unverified" | "eligible" | "used" | "limited";

type TimelineKey = "requested" | "sentToBank" | "processing" | "deposited";

const TIMELINE_STEPS: { key: TimelineKey; label: string }[] = [
  { key: "requested", label: "ثبت درخواست" },
  { key: "sentToBank", label: "ارسال به بانک" },
  { key: "processing", label: "در حال پردازش بانک" },
  { key: "deposited", label: "واریز شد" },
];

const STEP_DELAY_MS = 1400;
const TEST_AMOUNT = 10_000;

/**
 * ویجت «تست دریافت وجه» — بخش ۰۹ سند (فاز ۲).
 * فعلاً در page.tsx فاز ۱ mount نمی‌شود؛ state machine و تایم‌لاین آماده‌اند
 * تا در فاز ۲ به POST /api/payout-test واقعی (پشت احراز هویت) وصل شوند.
 */
export function PayoutTestWidget({
  userState,
  previousResult,
}: {
  userState: PayoutUserState;
  previousResult?: { depositedAt: string };
}) {
  const [stepIndex, setStepIndex] = useState<number>(-1);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    if (stepIndex >= TIMELINE_STEPS.length - 1) {
      setRunning(false);
      return;
    }
    const timer = setTimeout(() => setStepIndex((i) => i + 1), STEP_DELAY_MS);
    return () => clearTimeout(timer);
  }, [running, stepIndex]);

  function start() {
    setStepIndex(0);
    setRunning(true);
  }

  return (
    <div className="rounded-card border-2 border-gold bg-surface p-6 sm:p-8">
      <h3 className="text-h3 font-bold text-ink-900">باور نمی‌کنید؟ خودتان امتحان کنید.</h3>
      <p className="mt-2 text-sm leading-7 text-ink-500">
        {formatToman(TEST_AMOUNT)} به حساب بانکی ثبت‌شدهٔ خودتان واریز می‌کنیم تا مسیر برداشت را
        ببینید.
      </p>

      <div className="mt-5">
        {userState === "guest" && (
          <Button variant="dark" href="/login">
            ورود / ثبت‌نام
          </Button>
        )}

        {userState === "unverified" && (
          <Button variant="dark" href="/verify">
            تکمیل احراز هویت
          </Button>
        )}

        {userState === "limited" && (
          <p className="rounded-md bg-warn-bg px-4 py-3 text-sm font-bold text-warn">
            به سقف دفعات مجاز تست دریافت وجه رسیده‌اید.
          </p>
        )}

        {userState === "used" && previousResult && (
          <p className="rounded-md bg-ok-bg px-4 py-3 text-sm font-bold text-ok">
            قبلاً در {formatFriendlyDateTime(previousResult.depositedAt)} واریز شده است.
          </p>
        )}

        {userState === "eligible" && stepIndex === -1 && (
          <Button variant="primary" onClick={start}>
            درخواست تست
          </Button>
        )}

        {userState === "eligible" && stepIndex >= 0 && (
          <ol className="flex flex-col gap-3">
            {TIMELINE_STEPS.map((step, idx) => {
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
                    {done ? "✓" : idx + 1}
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
        هر کاربر یک‌بار · نیازمند احراز هویت · فقط به حساب متعلق به خودتان
      </p>
    </div>
  );
}
