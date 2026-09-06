"use client";

import { useEffect, useRef, useState } from "react";
import { formatDuration } from "@/lib/format";
import { cn } from "@/lib/cn";

/**
 * ویجت پخش ویس نظرات — فایل صوتی واقعی را فقط با کلیک روی پخش بارگذاری
 * می‌کند (preload="none")، نه از قبل.
 */
export function VoicePlayer({
  src,
  durationSeconds,
  playing,
  onPlayToggle,
  className,
}: {
  src: string;
  durationSeconds: number;
  playing: boolean;
  onPlayToggle: () => void;
  className?: string;
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [duration, setDuration] = useState(durationSeconds);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.play().catch(() => onPlayToggle());
    } else {
      audio.pause();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    function onTimeUpdate() {
      setElapsed(audio!.currentTime);
    }
    function onLoadedMetadata() {
      if (Number.isFinite(audio!.duration)) setDuration(audio!.duration);
    }
    function onEnded() {
      setElapsed(0);
      onPlayToggle();
    }

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("ended", onEnded);
    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("ended", onEnded);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const progress = duration > 0 ? Math.min(1, elapsed / duration) : 0;

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <audio ref={audioRef} src={src} preload="none" />

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
        {formatDuration(elapsed)} / {formatDuration(duration)}
      </span>
    </div>
  );
}
