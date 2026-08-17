"use client";

import { useCoverageData } from "@/lib/hooks/useCoverageData";
import { CoverageScale } from "@/components/data/CoverageScale";
import type { CoverageDisclosurePolicy } from "@/lib/coverage-disclosure";

export function HeroCoverageScale({ policy }: { policy: CoverageDisclosurePolicy }) {
  const { data, status, ratio, display, loading } = useCoverageData(policy);

  return (
    <CoverageScale
      status={status}
      ratio={ratio}
      asOf={data?.asOf ?? null}
      display={display}
      loading={loading}
    />
  );
}
