"use client";

import { useLiveData } from "./useLiveData";
import { resolveFreshness } from "@/lib/freshness";
import { resolveCoverageDisplay, type CoverageDisclosurePolicy } from "@/lib/coverage-disclosure";
import type { CoverageResponse } from "@/lib/mock/coverage";

const POLL_MS = 5 * 60_000;

export function useCoverageData(policy: CoverageDisclosurePolicy) {
  const { data, fetchFailed, loading, refetch } = useLiveData<CoverageResponse>("/api/coverage", {
    intervalMs: POLL_MS,
  });

  const status = resolveFreshness({
    serverStatus: fetchFailed ? "unavailable" : data?.status,
    asOf: data?.asOf ?? null,
    kind: "coverage",
  });

  const ratio = status === "unavailable" ? null : (data?.ratio ?? null);
  const display = resolveCoverageDisplay(policy, ratio);

  return { data, status, ratio, display, loading, refetch };
}
