"use client";

import { useEffect, useState } from "react";
import { formatDuration } from "@/lib/format";
import { cn } from "@/lib/cn";

/**
 * ویجت پخش ویس نظرات — بدون فایل صوتی واقعی (این نظرات نمونه‌اند)، فقط
 * تجربهٔ تعاملی «پخش/توقف + نوار پیشرفت» را شبیه‌سازی می‌کند، دقیقاً مثل
 * تایم‌لاین شبیه‌سازی‌شدهٔ ویجت تست دریافت وجه.
 */
export function VoicePlayer({
  durationSeconds,
  playing,
  onPlayToggle,
  className,
}: {
  durationSeconds: number;
  playing: boolean;
  onPlayToggle: () => void;
  className?: string;
}) {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (!playing) return;

    const start = Date.now() - elapsed * 1000;
    const timer = setInterval(() => {
      const next = (Date.now() - start) / 1000;
      if (next >= durationSeconds) {
        setElapsed(0);
        onPlayToggle();
        return;
      }
      setElapsed(next);
    }, 200);

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing]);

  useEffect(() => {
    if (!playing) setElapsed(0);
  }, [playing]);

  const progress = durationSeconds > 0 ? Math.min(1, elapsed / durationSeconds) : 0;

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <button
        type="button"
        onClick={onPlayToggle}
        aria-label={playing ? "توقف پخش صدا" : "پخش صدا"}
        className="flex size-8 shrink-0 items-center justify-center rounded-full bg-ink-900 text-white transition-colors hover:bg-ink-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
      >
        {playing ? (
          <svg viewBox="0 0 16 16" className="size-3.5" fill="currentColor" aria-hidden="true">
            <rect x="3" y="2" width="3.5" height="12" rx="1" />
            <rect x="9.5" y="2" width="3.5" height="12" rx="1" />
          </svg>
        ) : (
          <svg viewBox="0 0 16 16" className="size-3.5" fill="currentColor" aria-hidden="true">
            <path d="M4 2.6c0-1 1.1-1.6 1.9-1.1l8 5.4c.8.5.8 1.7 0 2.2l-8 5.4c-.8.5-1.9-.1-1.9-1.1V2.6Z" />
          </svg>
        )}
      </button>

      <div className="h-1.5 flex-1 overflow-hidden rounded-pill bg-surface-2" aria-hidden="true">
        <div
          className="h-full rounded-pill bg-gold transition-[width] duration-150"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      <span className="shrink-0 text-xs tabular-nums text-muted">
        {formatDuration(playing ? elapsed : 0)} / {formatDuration(durationSeconds)}
      </span>
    </div>
  );
}
