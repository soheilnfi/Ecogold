import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Eyebrow({
  children,
  onVault = false,
  className,
}: {
  children: ReactNode;
  onVault?: boolean;
  className?: string;
}) {
  return (
    <p className={cn("eyebrow", onVault && "eyebrow-on-vault", className)}>
      {children}
    </p>
  );
}
