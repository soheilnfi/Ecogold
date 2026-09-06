"use client";

import { useState } from "react";
import { copy } from "@/content/copy.fa";
import { useLiveData } from "@/lib/hooks/useLiveData";
import { formatJalaliDate } from "@/lib/jalali";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Card } from "@/components/ui/Card";
import { VoicePlayer } from "@/components/ui/VoicePlayer";
import type { ReviewsResponse } from "@/lib/mock/reviews";

export function Reviews() {
  const { data, fetchFailed, loading } = useLiveData<ReviewsResponse>("/api/reviews?limit=8");
  const [playingId, setPlayingId] = useState<string | null>(null);
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
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data.items.map((review, idx) => (
              <Reveal key={review.id} delay={idx * 0.05}>
                <Card className="flex h-full flex-col">
                  <VoicePlayer
                    src={review.voiceUrl}
                    durationSeconds={review.voiceDurationSeconds}
                    playing={playingId === review.id}
                    onPlayToggle={() =>
                      setPlayingId((current) => (current === review.id ? null : review.id))
                    }
                  />
                  <div className="mt-4 flex-1 rounded-md border border-line bg-surface-2 p-4">
                    <p className="text-xs font-bold text-ink-900">{t.replyLabel}</p>
                    <p className="mt-1 text-xs leading-6 text-muted">{t.replyPlaceholder}</p>
                  </div>

                  <div className="mt-4 flex items-center justify-between text-xs text-muted">
                    <span>{review.name}</span>
                    <span>{formatJalaliDate(review.date)}</span>
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
