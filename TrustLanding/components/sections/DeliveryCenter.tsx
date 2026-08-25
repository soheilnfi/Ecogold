"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { copy } from "@/content/copy.fa";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { isBranchOpenNow } from "@/lib/branch-hours";
import { toLatinDigits } from "@/lib/format";

const CHECK_INTERVAL_MS = 60_000;

export function DeliveryCenter() {
  const t = copy.deliveryCenter;
  const b = t.branch;
  const [open, setOpen] = useState<boolean | null>(null);

  useEffect(() => {
    setOpen(isBranchOpenNow());
    const timer = setInterval(() => setOpen(isBranchOpenNow()), CHECK_INTERVAL_MS);
    return () => clearInterval(timer);
  }, []);

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(b.address)}`;

  return (
    <section id="branch" className="scroll-mt-20 bg-vault-900 text-vault-ink">
      <div className="mx-auto max-w-[1160px] px-5 py-16 sm:py-24">
        <Reveal>
          <Eyebrow onVault>{t.eyebrow}</Eyebrow>
          <h2 className="mt-3 text-h2 font-black">{t.title}</h2>
          <p className="mt-3 max-w-xl text-sm leading-7 text-vault-muted">{t.subtitle}</p>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mt-10 grid grid-cols-3 gap-3">
            {b.photos.map((photo, i) => (
              <div
                key={photo.src}
                className="relative aspect-[4/3] overflow-hidden rounded-card border border-vault-line"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 1024px) 380px, 33vw"
                  className="object-cover"
                  priority={i === 0}
                />
              </div>
            ))}
          </div>

          <div className="mt-3 rounded-card border border-vault-line bg-vault-700 p-6">
            <p className="text-sm font-bold">{b.title}</p>
            {open !== null && (
              <Chip tone={open ? "ok" : "unavailable"} className="mt-2">
                {open ? b.openNow : b.closedNow}
              </Chip>
            )}
            <p className="mt-4 text-sm leading-7 text-vault-muted">{b.address}</p>
            <p className="mt-2 text-sm text-vault-muted">{b.hoursWeekdays}</p>
            <p className="text-sm text-vault-muted">{b.hoursThursday}</p>
            <p className="text-sm text-vault-muted">{b.closedFriday}</p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button
                href={mapsUrl}
                target="_blank"
                rel="noopener"
                variant="ghost"
                size="md"
                className="!border-vault-line !text-vault-ink hover:!border-gold"
              >
                {b.directionsCta}
              </Button>
              <Button
                href={`tel:${toLatinDigits(b.phone).replace(/-/g, "")}`}
                variant="ghost"
                size="md"
                className="!border-vault-line !text-vault-ink hover:!border-gold"
              >
                {b.callCta}
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
