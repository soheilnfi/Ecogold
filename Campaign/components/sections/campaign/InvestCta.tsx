import { copy } from "@/content/copy.fa";
import { Button } from "@/components/ui/Button";

/**
 * تنها دکمهٔ «شروع سرمایه‌گذاری» کمپین. همه‌جا از همین کامپوننت استفاده شود تا
 * متن و مقصد CTA یک منبع واحد داشته باشد.
 */
export function InvestCta({
  size = "lg",
  variant = "primary",
  className,
}: {
  size?: "md" | "lg";
  variant?: "primary" | "dark" | "ghost";
  className?: string;
}) {
  const t = copy.campaign.ctaInvest;

  return (
    <Button href={t.href} size={size} variant={variant} className={className}>
      {t.label}
    </Button>
  );
}
