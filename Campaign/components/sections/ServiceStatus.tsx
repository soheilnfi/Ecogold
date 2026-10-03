"use client";

import { copy } from "@/content/copy.fa";
import { useLiveData } from "@/lib/hooks/useLiveData";
import { resolveFreshness } from "@/lib/freshness";
import { formatPercent } from "@/lib/format";
import { formatRelativeFromNow } from "@/lib/jalali";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { UptimeStrip } from "@/components/data/UptimeStrip";
import { MarketStatusCard } from "@/components/data/MarketStatusCard";
import { cn } from "@/lib/cn";
import type { StatusResponse, ServiceState } from "@/lib/mock/status";

/**
 * شکل هر وضعیت با CSS ساخته می‌شود، نه با گلیف یونیکد (●▲■) — چون رندر آن
 * گلیف‌ها به فونت جاری/فالبک بستگی دارد و اندازه/خط پایه‌شان می‌تواند به‌شکل
 * غیرقابل‌پیش‌بینی از قاب کوچک خودش بیرون بزند.
 */
const STATE_STYLE: Record<ServiceState, string> = {
  operational: "size-2 rounded-full bg-ok",
  degraded: "size-0 border-x-[5px] border-b-[8px] border-x-transparent border-b-warn",
  down: "size-2 rounded-[1px] bg-down",
};

/** رنگ‌بندی کارت بر اساس درصد دسترس‌پذیری ۳۰ روزه: ≥۹۰ سبز، ۸۰ تا ۹۰ زرد، زیر ۸۰ قرمز */
function uptimeTier(uptime: number): { bg: string; text: string } {
  if (uptime >= 90) return { bg: "bg-ok-bg", text: "text-ok" };
  if (uptime >= 80) return { bg: "bg-warn-bg", text: "text-warn" };
  return { bg: "bg-down-bg", text: "text-down" };
}

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
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {data.services.map((service, idx) => {
              const style = STATE_STYLE[service.state];
              const tier = uptimeTier(service.uptime30d);
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
                        <span aria-hidden="true" className={cn("inline-block shrink-0", style)} />
                        {copy.serviceStatus.stateLabels[service.state]}
                      </span>
                    </div>

                    <div className="mt-4">
                      <UptimeStrip days={service.days} />
                    </div>

                    <p className={cn("mt-3 text-2xl font-black tabular-nums", tier.text)}>
                      {formatPercent(service.uptime30d, 2)}
                    </p>
                    <p className="mt-0.5 text-xs text-muted">در ۳۰ روز گذشته</p>
                    {service.sla && (
                      <p className="mt-1 text-xs font-bold text-ink-700">{service.sla}</p>
                    )}
                  </div>
                </Reveal>
              );
            })}

            {copy.limitedMarkets.tabs.map((market, idx) => (
              <Reveal key={market.key} delay={(data.services.length + idx) * 0.03}>
                <MarketStatusCard market={market} />
              </Reveal>
            ))}
          </div>
        )}

        {!unavailable && data && (
          <p className="mt-6 text-xs text-muted">
            {copy.serviceStatus.lastCheckedPrefix} {formatRelativeFromNow(data.asOf!)} ·{" "}
            {copy.serviceStatus.availabilityPeriodNote}
          </p>
        )}
      </div>
    </section>
  );
}
