"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { copy } from "@/content/copy.fa";
import { useLiveData } from "@/lib/hooks/useLiveData";
import { formatJalaliDate } from "@/lib/jalali";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Modal } from "@/components/ui/Modal";
import { ExternalLinkArrow } from "@/components/ui/ExternalLinkArrow";
import type { LicenseItem, LicensesResponse } from "@/lib/mock/licenses";

function ExpandIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M15 4h5v5" />
      <path d="M20 4L13 11" />
      <path d="M9 20H4v-5" />
      <path d="M4 20l7-7" />
    </svg>
  );
}

export function Licenses() {
  const { data, loading } = useLiveData<LicensesResponse>("/api/licenses");
  const [openItem, setOpenItem] = useState<LicenseItem | null>(null);

  const activeItems = useMemo(() => {
    const items = data?.items ?? [];
    const now = Date.now();
    const active = items.filter((item) => new Date(item.validUntil).getTime() >= now);
    const expired = items.filter((item) => new Date(item.validUntil).getTime() < now);
    if (expired.length > 0 && typeof window !== "undefined") {
      // هشدار داخلی — در نسخهٔ واقعی به Sentry/لاگ سرور ارسال می‌شود
      console.warn(
        `[licenses] ${expired.length} مجوز منقضی از نمایش عمومی مخفی شد:`,
        expired.map((e) => e.key)
      );
    }
    return active;
  }, [data]);

  return (
    <section id="licenses" className="scroll-mt-20 border-b border-line">
      <div className="mx-auto max-w-[1160px] px-5 py-16 sm:py-24">
        <Reveal>
          <Eyebrow>{copy.licenses.eyebrow}</Eyebrow>
          <h2 className="mt-3 text-h2 font-black text-ink-900">{copy.licenses.title}</h2>
          <p className="mt-3 max-w-xl text-sm leading-7 text-muted">{copy.licenses.subtitle}</p>
        </Reveal>

        {loading ? (
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-40 animate-pulse rounded-card bg-surface-2" />
            ))}
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {activeItems.map((item, idx) => (
              <Reveal key={item.key} delay={idx * 0.03}>
                <div className="flex h-full flex-col overflow-hidden rounded-card border border-line bg-surface">
                  <button
                    type="button"
                    onClick={() => setOpenItem(item)}
                    aria-label={`نمایش بزرگ‌تر ${item.title}`}
                    className="group relative aspect-[16/9] w-full border-b border-line bg-surface-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                  >
                    {item.logoUrl && (
                      <Image
                        src={item.logoUrl}
                        alt={item.title}
                        fill
                        sizes="(min-width: 1024px) 270px, 50vw"
                        className="object-contain p-4"
                      />
                    )}
                    <span className="absolute bottom-2 left-2 flex size-6 items-center justify-center rounded-full border border-line bg-surface text-ink-500 motion-safe:transition-transform motion-safe:group-hover:scale-110">
                      <ExpandIcon className="size-3" />
                    </span>
                  </button>
                  <div className="flex flex-1 flex-col p-6 sm:p-8">
                    <p className="text-sm font-bold text-ink-900">{item.title}</p>
                    <p className="mt-1 text-xs text-muted">{item.issuer}</p>
                    <div className="mt-4 flex-1 space-y-1 tabular-nums text-xs text-muted">
                      <p>
                        {copy.licenses.numberLabel}: {item.number}
                      </p>
                      <p>
                        {copy.licenses.validUntilLabel}: {formatJalaliDate(item.validUntil)}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </div>

      <Modal open={!!openItem} onClose={() => setOpenItem(null)} title={openItem?.title ?? ""}>
        {openItem && (
          <>
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-card border border-line bg-surface-2">
              {openItem.logoUrl && (
                <Image
                  src={openItem.logoUrl}
                  alt={openItem.title}
                  fill
                  sizes="600px"
                  className="object-contain p-6"
                />
              )}
            </div>
            {openItem.verifyUrl && (
              <a
                href={openItem.verifyUrl}
                target="_blank"
                rel="noopener"
                className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-info hover:underline"
              >
                {copy.licenses.verifyLink}
                <ExternalLinkArrow className="size-3" />
              </a>
            )}
          </>
        )}
      </Modal>
    </section>
  );
}
