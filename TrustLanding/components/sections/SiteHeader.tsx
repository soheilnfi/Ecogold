"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { copy } from "@/content/copy.fa";
import { Button } from "@/components/ui/Button";
import { StatusChip } from "@/components/data/StatusChip";
import { cn } from "@/lib/cn";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 80);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-[background-color,border-color,backdrop-filter] duration-200",
        scrolled
          ? "border-b border-line bg-bg/90 backdrop-blur-sm"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-[1160px] items-center justify-between gap-6 px-5">
        <Link href="/" className="flex items-baseline gap-2 shrink-0">
          <span className="text-lg font-black text-ink-900">{copy.header.logo}</span>
          <span className="hidden text-xs font-medium text-muted sm:inline">
            {copy.header.logoSub}
          </span>
        </Link>

        <nav
          aria-label="ناوبری اصلی"
          className="flex flex-1 items-center gap-5 overflow-x-auto px-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {copy.header.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="whitespace-nowrap text-sm font-bold text-ink-500 transition-colors hover:text-ink-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-3">
          <div className="hidden md:block">
            <StatusChip />
          </div>
          <Button href="#coverage" size="md" className="hidden sm:inline-flex">
            {copy.header.ctaDownloadReport}
          </Button>
          <Button href="/login" variant="ghost" size="md">
            {copy.header.ctaLogin}
          </Button>
        </div>
      </div>
    </header>
  );
}
