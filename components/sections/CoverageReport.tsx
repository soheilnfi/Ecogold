"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { copy } from "@/content/copy.fa";
import { Eyebrow } from "@/components/ui/Eyebrow";
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

const PAGE_SIZE = copy.coverageReport.archive.pageSize;

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
  const [page, setPage] = useState(0);

  const chartData = useMemo(
    () => (data?.history ?? []).slice(-30).map((p) => ({ ...p, dateLabel: formatJalaliDate(p.date) })),
    [data]
  );

  const archiveRows = useMemo(() => {
    const all = data?.history ?? [];
    return [...all].reverse();
  }, [data]);

  const pageRows = archiveRows.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
  const pageCount = Math.max(1, Math.ceil(archiveRows.length / PAGE_SIZE));

  const unavailable = status === "unavailable";
  const canDownload = !unavailable && !!data?.todayReport;
  // اگر سیاست افشا عدد را پنهان کرده، نمودار/آرشیو هم نباید عدد دقیق را از راه دیگری لو بدهند
  const numericHidden = unavailable || display.kind !== "number";

  return (
    <section id="coverage" className="scroll-mt-20 bg-vault-900 text-vault-ink">
      <div className="mx-auto max-w-[1160px] px-5 py-16 sm:py-24">
        <Reveal>
          <Eyebrow onVault>{copy.coverageReport.eyebrow}</Eyebrow>
          <h2 className="mt-3 text-h2 font-black">{copy.coverageReport.title}</h2>
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
              {!loading && <FreshnessSeal status={status} asOf={data?.asOf ?? null} onVault />}

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
                  className={`!border-vault-line !text-vault-ink hover:!border-gold ${numericHidden ? "pointer-events-none opacity-40" : ""}`}
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
              <p className="mb-1 text-sm font-bold text-vault-ink">{copy.coverageReport.chartTitle}</p>
              <p className="mb-4 text-xs text-vault-muted">{copy.coverageReport.chartRangeNote}</p>
              <div className="h-56 w-full">
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
            <ol className="mt-4 flex flex-col gap-2 text-sm leading-7 text-vault-muted">
              {copy.coverageReport.howCalculated.steps.map((step) => (
                <li key={step}>· {step}</li>
              ))}
            </ol>
          </details>
        </Reveal>
      </div>

      <Modal open={archiveOpen} onClose={() => setArchiveOpen(false)} title={copy.coverageReport.archive.title}>
        <div className="overflow-x-auto">
          <table className="w-full text-right text-sm">
            <thead>
              <tr className="border-b border-line text-xs text-muted">
                <th className="py-2 font-bold">{copy.coverageReport.archive.columns.date}</th>
                <th className="py-2 font-bold">{copy.coverageReport.archive.columns.ratio}</th>
                <th className="py-2 font-bold">{copy.coverageReport.archive.columns.id}</th>
                <th className="py-2 font-bold">{copy.coverageReport.archive.columns.size}</th>
                <th className="py-2 font-bold">{copy.coverageReport.archive.columns.download}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {pageRows.map((row) => (
                <tr key={row.date}>
                  <td className="py-2 font-mono-id">{formatJalaliDate(row.date)}</td>
                  <td className="py-2 tabular-nums">{formatPercent(row.ratio)}</td>
                  <td className="py-2 font-mono-id">{deriveReportId(row.date)}</td>
                  <td className="py-2 tabular-nums text-muted">{formatFileSize(deriveSize(row.date))}</td>
                  <td className="py-2">
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

        <div className="mt-4 flex items-center justify-between text-sm">
          <button
            disabled={page === 0}
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            className="font-bold text-ink-700 disabled:opacity-30"
          >
            قبلی
          </button>
          <span className="text-xs text-muted tabular-nums">
            صفحهٔ {page + 1} از {pageCount}
          </span>
          <button
            disabled={page >= pageCount - 1}
            onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
            className="font-bold text-ink-700 disabled:opacity-30"
          >
            بعدی
          </button>
        </div>
      </Modal>
    </section>
  );
}
