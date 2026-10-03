"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { copy } from "@/content/copy.fa";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { SectionNumber } from "@/components/ui/SectionNumber";
import { cn } from "@/lib/cn";
import { InvestCta } from "@/components/sections/campaign/InvestCta";
import {
  BuyVisual,
  IdentityVisual,
  OutcomesVisual,
} from "@/components/sections/campaign/StepVisuals";

/** کارت بنتو — ورود پلکانی هنگام اسکرول + بالا آمدن ملایم روی hover */
function BentoCard({
  index,
  onVault = false,
  className,
  children,
}: {
  index: number;
  onVault?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "flex flex-col justify-between gap-4 rounded-card border p-5 transition-transform duration-300 motion-safe:hover:-translate-y-1 sm:p-5",
        onVault
          ? "border-vault-line bg-vault-900 text-vault-ink"
          : "border-line bg-surface text-ink-900",
        className
      )}
    >
      {children}
    </motion.li>
  );
}

export function CampaignSteps() {
  const t = copy.campaign.steps;
  const [first, second, third] = t.items;

  return (
    <section id="how" className="scroll-mt-16 border-b border-line bg-surface-2">
      <div className="mx-auto max-w-[1160px] px-5 py-10 sm:py-12">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <Eyebrow>{t.eyebrow}</Eyebrow>
              <h2 className="mt-3 text-display-l font-black text-ink-900">{t.title}</h2>
            </div>
            <InvestCta size="md" />
          </div>
        </Reveal>

        {/* بنتو: قدم اول کارت بزرگ و تیره (در RTL سمت راست)، دو قدم بعدی روی هم */}
        <ol className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-2 lg:grid-rows-2">
          <BentoCard index={0} onVault className="relative overflow-hidden lg:row-span-2">
            <div className="pattern-dots-vault pointer-events-none absolute inset-0" aria-hidden="true" />
            <div className="relative">
              <SectionNumber value={first.number} onVault />
              <p className="mt-2 text-h2 font-black">{first.title}</p>
              <p className="mt-2.5 max-w-md text-sm leading-7 text-vault-muted">{first.body}</p>
            </div>
            <div className="relative">
              <IdentityVisual />
            </div>
          </BentoCard>

          <BentoCard index={1}>
            <div>
              <SectionNumber value={second.number} />
              <p className="mt-2 text-h3 font-black">{second.title}</p>
              <p className="mt-2.5 text-sm leading-7 text-ink-500">{second.body}</p>
            </div>
            <BuyVisual />
          </BentoCard>

          <BentoCard index={2}>
            <div>
              <SectionNumber value={third.number} />
              <p className="mt-2 text-h3 font-black">{third.title}</p>
              <p className="mt-2.5 text-sm leading-7 text-ink-500">{third.body}</p>
            </div>
            <OutcomesVisual />
          </BentoCard>
        </ol>

      </div>
    </section>
  );
}
