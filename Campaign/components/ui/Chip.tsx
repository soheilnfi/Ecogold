import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Tone = "ok" | "warn" | "down" | "info" | "unavailable" | "neutral";

const tones: Record<Tone, string> = {
  ok: "bg-ok-bg text-ok",
  warn: "bg-warn-bg text-warn",
  down: "bg-down-bg text-down",
  info: "bg-info-bg text-info",
  unavailable: "bg-unavailable-bg text-unavailable",
  neutral: "bg-surface-2 text-ink-700",
};

export function Chip({
  tone = "neutral",
  icon,
  children,
  className,
}: {
  tone?: Tone;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-pill px-3 py-1.5 text-sm font-bold",
        tones[tone],
        className
      )}
    >
      {icon}
      {children}
    </span>
  );
}
