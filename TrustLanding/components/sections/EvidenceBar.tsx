"use client";

import { copy } from "@/content/copy.fa";
import { useCoverageData } from "@/lib/hooks/useCoverageData";
import { useLiveData } from "@/lib/hooks/useLiveData";
import { resolveFreshness } from "@/lib/freshness";
import { formatPercent, toPersianDigits } from "@/lib/format";
import { Reveal } from "@/components/ui/Reveal";
import type { CoverageDisclosurePolicy } from "@/lib/coverage-disclosure";
import type { StatusResponse } from "@/lib/mock/status";

function useEvidenceValues(policy: CoverageDisclosurePolicy) {
  const coverage = useCoverageData(policy);
  const status = useLiveData<StatusResponse>("/api/status", { intervalMs: 60_000 });

  const statusStatus = resolveFreshness({
    serverStatus: status.fetchFailed ? "unavailable" : status.data?.status,
    asOf: status.data?.asOf ?? null,
    kind: "status",
  });

  // همان قاعدهٔ سیاست افشا که در هیرو/گزارش پوشش رعایت می‌شود — اینجا هم باید
  // بدون نشتی رعایت شود، وگرنه نوار شواهد از راه دیگری عدد پنهان‌شده را لو می‌دهد
  const coverageText =
    coverage.display.kind === "number" && coverage.ratio !== null
      ? formatPercent(coverage.ratio)
      : coverage.display.kind === "qualitative"
        ? coverage.display.ok
          ? copy.coverageReport.disclosurePolicy.hiddenOk
          : copy.coverageReport.disclosurePolicy.hiddenReviewing
        : "—";

  const total = status.data?.services.length ?? 8;
  const operational = status.data?.services.filter((s) => s.state === "operational").length ?? 0;
  const uptimeText =
    statusStatus !== "unavailable" ? toPersianDigits(`${operational}/${total}`) : "—";

  return { coverageText, uptimeText };
}

export function EvidenceBar({ policy }: { policy: CoverageDisclosurePolicy }) {
  const { coverageText, uptimeText } = useEvidenceValues(policy);
  const values: Record<string, string> = {
    coverageRatio: coverageText,
    serviceUptime: uptimeText,
    settlementSla: "تا ۲ ساعت کاری",
    minPhysical: "۰٫۵ گرم",
  };

  return (
    <section aria-label="شواهد کلیدی" className="border-b border-line">
      <div className="mx-auto grid max-w-[1160px] grid-cols-2 divide-y divide-line sm:grid-cols-4 sm:divide-x sm:divide-y-0">
        {copy.evidenceBar.items.map((item, idx) => (
          <Reveal key={item.metric} delay={idx * 0.05}>
            <a
              href={item.anchor}
              className="block px-5 py-8 text-center transition-colors hover:bg-surface-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold sm:text-right"
            >
              <p className="text-h2 font-black tabular-nums text-ink-900 whitespace-nowrap sm:text-xl lg:text-h2">
                {values[item.metric]}
              </p>
              <p className="mt-2 text-sm font-bold text-ink-900">{item.label}</p>
              <p className="mt-1 text-xs text-muted">{item.caption}</p>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
