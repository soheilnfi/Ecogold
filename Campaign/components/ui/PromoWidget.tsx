"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { copy } from "@/content/copy.fa";
import { Button } from "@/components/ui/Button";

export function PromoWidget() {
  const [dismissed, setDismissed] = useState(false);
  const reduce = useReducedMotion();
  const t = copy.promoWidget;

  return (
    <AnimatePresence>
      {!dismissed && (
        <motion.div
          initial={reduce ? { opacity: 1 } : { opacity: 0, y: 40, scale: 0.94 }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: 0.6, delay: 0.6, ease: [0.16, 1, 0.3, 1] },
          }}
          exit={{
            opacity: 0,
            y: reduce ? 0 : 20,
            scale: reduce ? 1 : 0.94,
            transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
          }}
          className="fixed bottom-4 left-4 z-30 w-64 overflow-hidden rounded-card border border-line bg-surface shadow-xl motion-safe:transition-transform motion-safe:duration-300 motion-safe:hover:scale-[1.04] sm:w-72"
        >
          <button
            type="button"
            onClick={() => setDismissed(true)}
            aria-label={t.close}
            className="absolute left-2 top-2 z-10 flex size-7 items-center justify-center rounded-full bg-ink-900/60 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            ×
          </button>

          <div className="relative aspect-square border-b border-line bg-surface-2">
            <Image
              src="/images/promo/floating-widget.jpg"
              alt={t.title}
              fill
              sizes="288px"
              className="object-cover"
            />
          </div>

          <div className="p-4">
            <p className="text-xs font-bold text-gold">{t.eyebrow}</p>
            <p className="mt-1 text-sm font-bold text-ink-900">{t.title}</p>
            <p className="mt-1 text-xs leading-6 text-muted">{t.description}</p>
            <Button href="/login" size="md" className="mt-3 w-full justify-center">
              {t.cta}
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
