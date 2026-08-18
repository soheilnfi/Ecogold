/**
 * قاعدهٔ کسب‌وکار «سیاست افشای پوشش» — سند بخش ۶.
 * تصمیم دربارهٔ حالت نمایش اینجا گرفته می‌شود؛ کامپوننت‌ها فقط رندر می‌کنند.
 */

export type CoverageDisclosurePolicy = "full" | "threshold" | "hidden";

const VALID_POLICIES: readonly CoverageDisclosurePolicy[] = ["full", "threshold", "hidden"];

/** پیش‌فرض «threshold» طبق تصمیم باز سند تا مصوبهٔ هیئت‌مدیره اعلام شود */
export function getCoverageDisclosurePolicy(): CoverageDisclosurePolicy {
  const raw = process.env.COVERAGE_DISCLOSURE_POLICY;
  return (VALID_POLICIES as readonly string[]).includes(raw ?? "")
    ? (raw as CoverageDisclosurePolicy)
    : "threshold";
}

export const COVERAGE_DISCLOSURE_THRESHOLD = 100;

export type CoverageDisplayMode =
  | { kind: "number" }
  | { kind: "threshold-message" }
  | { kind: "qualitative"; ok: boolean };

export function resolveCoverageDisplay(
  policy: CoverageDisclosurePolicy,
  ratio: number | null,
  threshold: number = COVERAGE_DISCLOSURE_THRESHOLD
): CoverageDisplayMode {
  if (ratio === null) return { kind: "number" };
  if (policy === "hidden") return { kind: "qualitative", ok: ratio >= threshold };
  if (policy === "full") return { kind: "number" };
  return ratio >= threshold ? { kind: "number" } : { kind: "threshold-message" };
}
