"use client";

import { useEffect, useMemo, useState } from "react";
import { copy } from "@/content/copy.fa";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Accordion } from "@/components/ui/Accordion";

type CategoryKey = keyof typeof copy.faq.categories;

export function Faq() {
  const [initialOpenId, setInitialOpenId] = useState<string | undefined>(undefined);

  useEffect(() => {
    const hash = window.location.hash.replace("#faq-", "");
    if (hash) setInitialOpenId(hash);
  }, []);

  const grouped = useMemo(() => {
    const categories = Object.keys(copy.faq.categories) as CategoryKey[];
    return categories
      .map((key) => ({ key, items: copy.faq.items.filter((item) => item.category === key) }))
      .filter((group) => group.items.length > 0);
  }, []);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: copy.faq.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <section id="faq" className="scroll-mt-20 border-b border-line">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mx-auto max-w-[1160px] px-5 py-16 sm:py-24">
        <Reveal>
          <Eyebrow>{copy.faq.eyebrow}</Eyebrow>
          <h2 className="mt-3 text-h2 font-black text-ink-900">{copy.faq.title}</h2>
        </Reveal>

        <div className="mt-8 flex flex-col gap-10">
          {grouped.map((group) => (
            <Reveal key={group.key}>
              <h3 className="mb-2 text-h3 font-bold text-ink-900">
                {copy.faq.categories[group.key]}
              </h3>
              <Accordion
                openId={initialOpenId}
                items={group.items.map((item) => ({
                  id: item.id,
                  question: item.question,
                  answer: (
                    <>
                      {item.answer}{" "}
                      {item.linkHref && (
                        <a href={item.linkHref} className="font-bold text-info hover:underline">
                          {item.linkLabel}
                        </a>
                      )}
                    </>
                  ),
                }))}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
