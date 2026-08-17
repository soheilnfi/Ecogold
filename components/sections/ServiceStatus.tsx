"use client";

import { copy } from "@/content/copy.fa";
import { useLiveData } from "@/lib/hooks/useLiveData";
import { resolveFreshness } from "@/lib/freshness";
import { formatPercent } from "@/lib/format";
import { formatRelativeFromNow } from "@/lib/jalali";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { UptimeStrip } from "@/components/data/UptimeStrip";
import { cn } from "@/lib/cn";
import type { StatusResponse, ServiceState } from "@/lib/mock/status";

const STATE_STYLE: Record<ServiceState, { dot: string; shape: string }> = {
  operational: { dot: "bg-ok", shape: "●" },
  degraded: { dot: "bg-warn", shape: "▲" },
  down: { dot: "bg-down", shape: "■" },
};

export function ServiceStatus() {
  const { data, fetchFailed, loading } = useLiveData<StatusResponse>("/api/status", {
    intervalMs: 60_000,
  });

  const freshness = resolveFreshness({
    serverStatus: fetchFailed ? "unavailable" : data?.status,
    asOf: data?.asOf ?? null,
    kind: "status",
  });

  const unavailable = freshness === "unavailable" || !data || data.services.length === 0;

  return (
    <section id="status" className="scroll-mt-20 border-b border-line">
      <div className="mx-auto max-w-[1160px] px-5 py-16 sm:py-24">
        <Reveal>
          <Eyebrow>{copy.serviceStatus.eyebrow}</Eyebrow>
          <h2 className="mt-3 text-h2 font-black text-ink-900">{copy.serviceStatus.title}</h2>
          <p className="mt-3 max-w-xl text-sm leading-7 text-muted">{copy.serviceStatus.subtitle}</p>
        </Reveal>

        {loading ? (
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-32 animate-pulse rounded-card bg-surface-2" />
            ))}
          </div>
        ) : unavailable ? (
          <div className="mt-10 rounded-card border border-line bg-surface-2 p-8 text-center text-sm font-bold text-muted">
            {copy.serviceStatus.unavailableMessage}
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {data.services.map((service, idx) => {
              const style = STATE_STYLE[service.state];
              return (
                <Reveal key={service.key} delay={idx * 0.03}>
                  <div className="rounded-card border border-line bg-surface p-5">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-bold text-ink-900">{service.label}</p>
                      <span
                        className={cn(
                          "flex items-center gap-1.5 text-xs font-bold",
                          service.state === "operational"
                            ? "text-ok"
                            : service.state === "degraded"
                              ? "text-warn"
                              : "text-down"
                        )}
                      >
                        <span aria-hidden="true" className={cn("text-[8px]", style.dot, "rounded-full")}>
                          {style.shape}
                        </span>
                        {copy.serviceStatus.stateLabels[service.state]}
                      </span>
                    </div>

                    <div className="mt-4">
                      <UptimeStrip days={service.days} />
                    </div>

                    <p className="mt-3 text-xs text-muted">
                      {formatPercent(service.uptime90d, 2)} در ۹۰ روز گذشته
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        )}

        <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-muted">
          {!unavailable && data && (
            <span>
              {copy.serviceStatus.lastCheckedPrefix} {formatRelativeFromNow(data.asOf!)}
            </span>
          )}
          <a href="#incidents" className="font-bold text-ink-700 underline underline-offset-2 hover:text-ink-900">
            {copy.serviceStatus.incidentsLink}
          </a>
        </div>
      </div>
    </section>
  );
}
