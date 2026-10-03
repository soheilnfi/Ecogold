import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "dark" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-pill font-bold transition-transform duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:opacity-40 disabled:pointer-events-none motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0";

const variants: Record<Variant, string> = {
  primary: "bg-gold text-ink-on-gold hover:brightness-95",
  dark: "bg-ink-900 text-white hover:bg-ink-700",
  ghost: "bg-transparent text-ink-900 border border-line hover:border-ink-900",
};

const sizes: Record<Size, string> = {
  md: "text-sm px-5 py-2.5",
  lg: "text-base px-7 py-3.5",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  className?: string;
  children: ReactNode;
}

type ButtonProps = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type LinkProps = CommonProps & {
  href: string;
  target?: string;
  rel?: string;
};

export function Button(props: ButtonProps | LinkProps) {
  const { variant = "primary", size = "md", icon, className, children } = props;
  const classes = cn(base, variants[variant], sizes[size], className);

  if ("href" in props && props.href) {
    const { href, target, rel } = props;
    return (
      <Link href={href} target={target} rel={rel} className={classes}>
        {children}
        {icon}
      </Link>
    );
  }

  // variant/size/icon/className/children are already destructured above;
  // exclude them here so they don't overwrite `classes` on the element below
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { type = "button", variant: _variant, size: _size, icon: _icon, className: _className, children: _children, ...rest } =
    props as ButtonProps;
  return (
    <button type={type} className={classes} {...rest}>
      {children}
      {icon}
    </button>
  );
}
