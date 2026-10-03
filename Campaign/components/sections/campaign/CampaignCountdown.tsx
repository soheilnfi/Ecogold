"use client";

import { useEffect, useState } from "react";
import { copy } from "@/content/copy.fa";
import { toPersianDigits } from "@/lib/format";
import { formatJalaliDate, formatClock } from "@/lib/jalali";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { InvestCta } from "@/components/sections/campaign/InvestCta";

interface Remaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function remainingFrom(endMs: number, now: number): Remaining | null {
  const diff = endMs - now;
  if (diff <= 0) return null;
  const totalSeconds = Math.floor(diff / 1000);
  return {
    days: Math.floor(totalSeconds / 86_400),
    hours: Math.floor((totalSeconds % 86_400) / 3_600),
    minutes: Math.floor((totalSeconds % 3_600) / 60),
    seconds: totalSeconds % 60,
  };
}

function Unit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex min-w-[4.5rem] flex-col items-center rounded-card border border-vault-line bg-vault-700/60 px-4 py-4 sm:min-w-[5.5rem]">
      <span className="text-display-l font-black tabular-nums leading-none text-vault-ink">
        {toPersianDigits(String(value).padStart(2, "0"))}
      </span>
      <span className="mt-2 text-xs text-vault-muted">{label}</span>
    </div>
  );
}

export function CampaignCountdown() {
  const t = copy.campaign.countdown;
  const endMs = new Date(t.endsAt).getTime();

  // زمان فقط بعد از mount محاسبه می‌شود: سرور و کلاینت هرگز به یک ثانیه نمی‌رسند
  // و رندر زمان روی سرور باعث اختلاف hydration می‌شود.
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  const remaining = now === null ? undefined : remainingFrom(endMs, now);

  return (
    <section className="bg-vault-900 pattern-dots-vault text-vault-ink">
      <div className="mx-auto max-w-[1160px] px-5 py-16 text-center sm:py-20">
        <Reveal>
          <Eyebrow onVault>{t.eyebrow}</Eyebrow>
          <h2 className="mt-3 text-h2 font-black">{t.title}</h2>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3" dir="ltr">
            {remaining === undefined ? (
              <p className="text-sm text-vault-muted">{t.loading}</p>
            ) : remaining === null ? (
              <p className="text-sm font-bold text-vault-ink">{t.finished}</p>
            ) : (
              <>
                <Unit value={remaining.seconds} label={t.units.seconds} />
                <Unit value={remaining.minutes} label={t.units.minutes} />
                <Unit value={remaining.hours} label={t.units.hours} />
                <Unit value={remaining.days} label={t.units.days} />
              </>
            )}
          </div>

          <p className="mt-6 text-xs text-vault-muted">
            {t.endsAtNote} {formatJalaliDate(t.endsAt)} — {formatClock(t.endsAt)}
          </p>

          {remaining !== null && (
            <div className="mt-8">
              <InvestCta />
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}
