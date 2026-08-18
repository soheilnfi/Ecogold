"use client";

import { useMemo } from "react";
import { copy } from "@/content/copy.fa";
import { useLiveData } from "@/lib/hooks/useLiveData";
import { formatJalaliDate } from "@/lib/jalali";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Card } from "@/components/ui/Card";
import { ExternalLinkArrow } from "@/components/ui/ExternalLinkArrow";
import type { LicensesResponse } from "@/lib/mock/licenses";

export function Licenses() {
  const { data, loading } = useLiveData<LicensesResponse>("/api/licenses");

  const activeItems = useMemo(() => {
    const items = data?.items ?? [];
    const now = Date.now();
    const active = items.filter((item) => new Date(item.validUntil).getTime() >= now);
    const expired = items.filter((item) => new Date(item.validUntil).getTime() < now);
    if (expired.length > 0 && typeof window !== "undefined") {
      // هشدار داخلی — در نسخهٔ واقعی به Sentry/لاگ سرور ارسال می‌شود
      console.warn(
        `[licenses] ${expired.length} مجوز منقضی از نمایش عمومی مخفی شد:`,
        expired.map((e) => e.key)
      );
    }
    return active;
  }, [data]);

  return (
    <section id="licenses" className="scroll-mt-20 border-b border-line">
      <div className="mx-auto max-w-[1160px] px-5 py-16 sm:py-24">
        <Reveal>
          <Eyebrow>{copy.licenses.eyebrow}</Eyebrow>
          <h2 className="mt-3 text-h2 font-black text-ink-900">{copy.licenses.title}</h2>
          <p className="mt-3 max-w-xl text-sm leading-7 text-muted">{copy.licenses.subtitle}</p>
        </Reveal>

        {loading ? (
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-40 animate-pulse rounded-card bg-surface-2" />
            ))}
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {activeItems.map((item, idx) => (
              <Reveal key={item.key} delay={idx * 0.03}>
                <Card className="flex h-full flex-col">
                  <div className="flex size-10 items-center justify-center rounded-full border border-line text-sm font-black text-muted">
                    {item.title.slice(0, 1)}
                  </div>
                  <p className="mt-4 text-sm font-bold text-ink-900">{item.title}</p>
                  <p className="mt-1 text-xs text-muted">{item.issuer}</p>
                  <div className="mt-4 flex-1 space-y-1 tabular-nums text-xs text-muted">
                    <p>
                      {copy.licenses.numberLabel}: {item.number}
                    </p>
                    <p>
                      {copy.licenses.validUntilLabel}: {formatJalaliDate(item.validUntil)}
                    </p>
                  </div>
                  <a
                    href={item.verifyUrl}
                    target="_blank"
                    rel="noopener"
                    className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-info hover:underline"
                  >
                    {copy.licenses.verifyLink}
                    <ExternalLinkArrow className="size-2.5" />
                  </a>
                </Card>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
