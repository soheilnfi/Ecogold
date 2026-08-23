"use client";

import { useState } from "react";
import { copy } from "@/content/copy.fa";
import { useLiveData } from "@/lib/hooks/useLiveData";
import { formatCount, formatDecimal } from "@/lib/format";
import { formatJalaliDate } from "@/lib/jalali";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Card } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { Modal } from "@/components/ui/Modal";
import type { ReviewsResponse } from "@/lib/mock/reviews";

function Stars({ rating }: { rating: number }) {
  return (
    <span className="text-gold-dim" aria-hidden="true">
      {"★".repeat(rating)}
      <span className="text-line">{"★".repeat(5 - rating)}</span>
    </span>
  );
}

export function Reviews() {
  const { data, fetchFailed, loading } = useLiveData<ReviewsResponse>("/api/reviews?limit=6");
  const [modalOpen, setModalOpen] = useState(false);
  const t = copy.reviews;

  const unavailable = fetchFailed || !data || data.status === "unavailable" || data.total === 0;

  return (
    <section id="reviews" className="scroll-mt-20 border-b border-line">
      <div className="mx-auto max-w-[1160px] px-5 py-16 sm:py-24">
        <Reveal>
          <Eyebrow>{t.eyebrow}</Eyebrow>
          <h2 className="mt-3 text-h2 font-black text-ink-900">{t.title}</h2>
        </Reveal>

        {loading ? (
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-40 animate-pulse rounded-card bg-surface-2" />
            ))}
          </div>
        ) : unavailable ? (
          <p className="mt-8 rounded-card border border-line bg-surface-2 p-8 text-center text-sm font-bold text-muted">
            {t.unavailable}
          </p>
        ) : (
          <>
            <Reveal delay={0.05}>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Stars rating={Math.round(data.average)} />
                <span className="text-sm font-bold tabular-nums text-ink-900">
                  {formatDecimal(data.average)}
                </span>
                <span className="text-sm text-muted">
                  · {formatCount(data.total)} {t.totalSuffix}
                </span>
                <button
                  onClick={() => setModalOpen(true)}
                  className="text-xs font-bold text-info hover:underline"
                >
                  {t.antiFraudLink}
                </button>
              </div>
            </Reveal>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {data.items.map((review, idx) => (
                <Reveal key={review.id} delay={idx * 0.05}>
                  <Card className="flex h-full flex-col">
                    <div className="flex items-center justify-between gap-2">
                      <Stars rating={review.rating} />
                      {review.verified && <Chip tone="ok">{t.verifiedBadge}</Chip>}
                    </div>
                    <p className="mt-3 flex-1 text-sm leading-7 text-ink-700">{review.text}</p>
                    <div className="mt-4 flex items-center justify-between text-xs text-muted">
                      <span>{review.name}</span>
                      <span>{formatJalaliDate(review.date)}</span>
                    </div>
                  </Card>
                </Reveal>
              ))}
            </div>
          </>
        )}
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={t.antiFraudModal.title}>
        <p className="text-sm leading-8 text-ink-700">{t.antiFraudModal.body}</p>
      </Modal>
    </section>
  );
}
