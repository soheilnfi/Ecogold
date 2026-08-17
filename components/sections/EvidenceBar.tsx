"use client";

import { copy } from "@/content/copy.fa";
import { useLiveData } from "@/lib/hooks/useLiveData";
import { resolveFreshness } from "@/lib/freshness";
import { formatPercent, toPersianDigits } from "@/lib/format";
import { Reveal } from "@/components/ui/Reveal";
import type { CoverageResponse } from "@/lib/mock/coverage";
import type { StatusResponse } from "@/lib/mock/status";

function useEvidenceValues() {
  const coverage = useLiveData<CoverageResponse>("/api/coverage", { intervalMs: 5 * 60_000 });
  const status = useLiveData<StatusResponse>("/api/status", { intervalMs: 60_000 });

  const coverageStatus = resolveFreshness({
    serverStatus: coverage.fetchFailed ? "unavailable" : coverage.data?.status,
    asOf: coverage.data?.asOf ?? null,
    kind: "coverage",
  });
  const statusStatus = resolveFreshness({
    serverStatus: status.fetchFailed ? "unavailable" : status.data?.status,
    asOf: status.data?.asOf ?? null,
    kind: "status",
  });

  const coverageText =
    coverageStatus !== "unavailable" && coverage.data?.ratio != null
      ? formatPercent(coverage.data.ratio)
      : "—";

  const total = status.data?.services.length ?? 8;
  const operational = status.data?.services.filter((s) => s.state === "operational").length ?? 0;
  const uptimeText =
    statusStatus !== "unavailable" ? toPersianDigits(`${operational}/${total}`) : "—";

  return { coverageText, uptimeText };
}

export function EvidenceBar() {
  const { coverageText, uptimeText } = useEvidenceValues();
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
              <p className="text-metric font-black tabular-nums text-ink-900">
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
