"use client";

import { useState } from "react";
import { formatJalaliDate } from "@/lib/jalali";
import { formatPercent } from "@/lib/format";
import { cn } from "@/lib/cn";
import type { ServiceDay } from "@/lib/mock/status";

const BAR_TONE = (day: ServiceDay) => {
  if (day.incidentMinutes === 0) return "bg-ok";
  if (day.incidentMinutes <= 30) return "bg-warn";
  return "bg-down";
};

/** نوار ۹۰ روزهٔ در دسترس‌بودن سرویس — الگوی صفحهٔ status صنعتی */
export function UptimeStrip({ days, className }: { days: ServiceDay[]; className?: string }) {
  const [active, setActive] = useState<ServiceDay | null>(null);

  return (
    <div className={cn("relative", className)}>
      <div
        className="flex items-end gap-[2px]"
        onMouseLeave={() => setActive(null)}
        role="img"
        aria-label={`روند ۹۰ روز گذشته، ${days.filter((d) => d.incidentMinutes > 0).length} روز با اختلال`}
      >
        {days.map((day) => (
          <button
            key={day.date}
            type="button"
            onFocus={() => setActive(day)}
            onMouseEnter={() => setActive(day)}
            onBlur={() => setActive(null)}
            className={cn(
              "h-6 w-[3px] shrink-0 rounded-full transition-transform focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold motion-safe:hover:scale-y-110",
              BAR_TONE(day)
            )}
            aria-label={`${formatJalaliDate(day.date)} · ${formatPercent(day.uptime)}`}
          />
        ))}
      </div>
      {active && (
        <div
          role="tooltip"
          className="absolute bottom-8 right-0 z-10 whitespace-nowrap rounded-md bg-ink-900 px-3 py-1.5 font-mono-id text-xs text-white shadow-lg"
        >
          {formatJalaliDate(active.date)} · {formatPercent(active.uptime)}
          {active.incidentMinutes > 0 && ` · ${active.incidentMinutes} دقیقه اختلال`}
        </div>
      )}
    </div>
  );
}
