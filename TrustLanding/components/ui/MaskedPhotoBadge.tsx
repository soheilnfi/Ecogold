import { cn } from "@/lib/cn";

/**
 * جای عکس واقعی (فعلاً placeholder) با ماسک دایره‌ای و یک حلقهٔ نقطه‌چین
 * چرخان دورش — تزئینی و بدون گرادیان/درخشش، فقط چرخش آرام یک خط‌مو.
 */
export function MaskedPhotoBadge({
  label = "عکس واقعی اینجا",
  className,
}: {
  label?: string;
  className?: string;
}) {
  return (
    <div className={cn("relative size-20 sm:size-24", className)}>
      <div
        aria-hidden="true"
        className="absolute -inset-2 rounded-full border border-dashed border-gold motion-safe:animate-[spin_18s_linear_infinite] motion-reduce:animate-none"
      />
      <div className="flex size-full items-center justify-center overflow-hidden rounded-full border border-line bg-surface-2 p-2 text-center text-[10px] leading-4 text-muted">
        {label}
      </div>
    </div>
  );
}
