"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { copy } from "@/content/copy.fa";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { FreshnessSeal } from "@/components/data/FreshnessSeal";
import { useCoverageData } from "@/lib/hooks/useCoverageData";
import type { CoverageDisclosurePolicy } from "@/lib/coverage-disclosure";
import { formatFileSize, formatPercent } from "@/lib/format";
import { formatJalaliDate, jalaliReportSuffix } from "@/lib/jalali";

const CoverageChart = dynamic(() => import("./CoverageChart"), {
  loading: () => <div className="h-full w-full animate-pulse rounded-md bg-vault-700" />,
});

function deriveReportId(date: string): string {
  return `CVG-${jalaliReportSuffix(date)}`;
}

function deriveSize(date: string): number {
  // اندازهٔ شبه‌تصادفی ولی پایدار برای هر تاریخ — فقط برای نمایش آرشیو
  const hash = Array.from(date).reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return 170_000 + (hash % 40) * 1024;
}

export function CoverageReport({ policy }: { policy: CoverageDisclosurePolicy }) {
  const { data, status, ratio, display, loading } = useCoverageData(policy);
  const [archiveOpen, setArchiveOpen] = useState(false);

  const chartData = useMemo(() => {
    const cutoff = Date.now() - 30 * 24 * 60 * 60_000;
    return (data?.history ?? [])
      .filter((p) => new Date(p.date).getTime() >= cutoff)
      .map((p) => ({ ...p, dateLabel: formatJalaliDate(p.date) }));
  }, [data]);

  const archiveRows = useMemo(() => {
    const all = data?.history ?? [];
    return [...all].reverse().slice(0, 10);
  }, [data]);

  const unavailable = status === "unavailable";
  const canDownload = !unavailable && !!data?.todayReport;
  // اگر سیاست افشا عدد را پنهان کرده، نمودار/آرشیو هم نباید عدد دقیق را از راه دیگری لو بدهند
  const numericHidden = unavailable || display.kind !== "number";

  return (
    <section id="coverage" className="scroll-mt-20 bg-vault-900 text-vault-ink">
      <div className="mx-auto max-w-[1160px] px-5 py-16 sm:py-24">
        <Reveal>
          <h2 className="text-h2 font-black">{copy.coverageReport.title}</h2>
          <p className="mt-3 max-w-xl text-sm leading-7 text-vault-muted">{copy.coverageReport.subtitle}</p>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-2">
          <Reveal delay={0.05}>
            <div>
              {loading ? (
                <div className="h-20 w-48 animate-pulse rounded-md bg-vault-700" />
              ) : unavailable ? (
                <p className="max-w-sm text-sm font-bold text-vault-muted">
                  {copy.coverageReport.states.unavailable}{" "}
                  <a href="#faq" className="underline underline-offset-2">
                    مشاهدهٔ رخدادها
                  </a>
                </p>
              ) : display.kind === "threshold-message" ? (
                <p className="max-w-sm text-sm font-bold text-warn">
                  {copy.coverageReport.disclosurePolicy.thresholdMessage}
                </p>
              ) : display.kind === "qualitative" ? (
                <p className="text-metric font-black text-gold">
                  {display.ok
                    ? copy.coverageReport.disclosurePolicy.hiddenOk
                    : copy.coverageReport.disclosurePolicy.hiddenReviewing}
                </p>
              ) : (
                <p className="text-metric font-black tabular-nums text-gold" aria-live="polite">
                  {ratio !== null ? formatPercent(ratio) : "—"}
                </p>
              )}
              <p className="mt-2 text-sm text-vault-muted">{copy.coverageReport.ratioCaption}</p>
              {!loading && (
                <>
                  <p className="mt-6 text-xs font-bold text-vault-ink">{copy.coverageReport.latestReportLabel}</p>
                  <FreshnessSeal status={status} asOf={data?.asOf ?? null} variant="date" onVault />
                </>
              )}

              <div className="mt-8 flex flex-wrap gap-3">
                <Button
                  href={data?.todayReport?.url ?? "#"}
                  variant="primary"
                  size="md"
                  className={!canDownload ? "pointer-events-none opacity-40" : undefined}
                >
                  {copy.coverageReport.downloadToday}
                </Button>
                <Button
                  variant="ghost"
                  size="md"
                  onClick={() => !numericHidden && setArchiveOpen(true)}
                  className={`!border-vault-line !text-vault-ink hover:!border-gold hover:!bg-vault-700 hover:!text-gold ${numericHidden ? "pointer-events-none opacity-40" : ""}`}
                >
                  {copy.coverageReport.viewArchive}
                </Button>
              </div>
              {!canDownload && !loading && (
                <p className="mt-3 max-w-sm text-xs text-vault-muted">
                  {copy.coverageReport.states.downloadDisabled}
                </p>
              )}

              <p className="mt-8 max-w-sm text-xs leading-6 text-vault-muted">
                {copy.coverageReport.immutableNote}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div>
              <p className="mb-4 text-sm font-bold text-vault-ink">{copy.coverageReport.chartTitle}</p>
              <div className="h-56 w-full" dir="ltr">
                {numericHidden ? (
                  <div className="flex h-full items-center justify-center text-center text-sm text-vault-muted">
                    {display.kind === "threshold-message"
                      ? copy.coverageReport.disclosurePolicy.thresholdMessage
                      : copy.coverageReport.states.unavailable}
                  </div>
                ) : chartData.length > 0 ? (
                  <CoverageChart
                    chartData={chartData}
                    baselineLabel={copy.coverageReport.baselineLabel}
                    ratioCaption={copy.coverageReport.ratioCaption}
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-sm text-vault-muted">
                    {copy.coverageReport.states.unavailable}
                  </div>
                )}
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <details className="mt-14 rounded-card border border-vault-line p-5 sm:p-6">
            <summary className="cursor-pointer text-sm font-bold text-vault-ink focus-visible:outline-none">
              {copy.coverageReport.howCalculated.title}
            </summary>
            <div className="mt-4 flex flex-col gap-4 text-sm leading-7 text-vault-muted">
              {copy.coverageReport.howCalculated.sections.map((section) => (
                <div key={section.heading}>
                  <p className="font-bold text-vault-ink">{section.heading}</p>
                  {section.items.map((item) => (
                    <p key={item}>{item}</p>
                  ))}
                </div>
              ))}
            </div>
          </details>
        </Reveal>
      </div>

      <Modal open={archiveOpen} onClose={() => setArchiveOpen(false)} title={copy.coverageReport.archive.title}>
        <div className="overflow-x-auto">
          <table className="w-full text-right text-sm">
            <thead className="sticky top-0 bg-surface">
              <tr className="border-b border-line text-xs text-muted">
                <th className="py-3 font-bold">{copy.coverageReport.archive.columns.date}</th>
                <th className="py-3 font-bold">{copy.coverageReport.archive.columns.size}</th>
                <th className="py-3 font-bold">{copy.coverageReport.archive.columns.download}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {archiveRows.map((row) => (
                <tr key={row.date}>
                  <td className="py-4 tabular-nums">{formatJalaliDate(row.date)}</td>
                  <td className="py-4 tabular-nums text-muted">{formatFileSize(deriveSize(row.date))}</td>
                  <td className="py-4">
                    <a
                      href={`/reports/${deriveReportId(row.date)}.pdf`}
                      className="font-bold text-info hover:underline"
                    >
                      دانلود
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Modal>
    </section>
  );
}
