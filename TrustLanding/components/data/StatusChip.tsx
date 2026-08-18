"use client";

import { useLiveData } from "@/lib/hooks/useLiveData";
import { resolveFreshness } from "@/lib/freshness";
import { copy } from "@/content/copy.fa";
import { Chip } from "@/components/ui/Chip";
import type { StatusResponse } from "@/lib/mock/status";

const POLL_MS = 60_000;

export function StatusChip() {
  const { data, fetchFailed, loading } = useLiveData<StatusResponse>("/api/status", {
    intervalMs: POLL_MS,
  });

  if (loading) {
    return <div className="h-8 w-40 animate-pulse rounded-pill bg-surface-2" />;
  }

  const freshness = resolveFreshness({
    serverStatus: fetchFailed ? "unavailable" : data?.status,
    asOf: data?.asOf ?? null,
    kind: "status",
  });

  if (freshness !== "ok" || !data) {
    return <Chip tone="unavailable">{copy.header.statusChip.unavailable}</Chip>;
  }

  const downCount = data.services.filter((s) => s.state !== "operational").length;

  if (downCount === 0) {
    return (
      <Chip tone="ok" icon={<span className="size-1.5 rounded-full bg-ok motion-safe:animate-pulse" />}>
        {copy.header.statusChip.allOperational}
      </Chip>
    );
  }

  return <Chip tone="warn">{copy.header.statusChip.degraded(downCount)}</Chip>;
}
