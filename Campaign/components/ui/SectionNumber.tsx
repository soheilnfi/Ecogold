import { cn } from "@/lib/cn";

/** شمارهٔ سکشن به سبک das studio — عدد فارسی از پیش فرمت‌شده (مثل «۰۱») */
export function SectionNumber({
  value,
  onVault = false,
  className,
}: {
  value: string;
  onVault?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "tabular-nums text-sm font-medium",
        onVault ? "text-vault-muted" : "text-muted",
        className
      )}
      aria-hidden="true"
    >
      {value}
    </span>
  );
}
