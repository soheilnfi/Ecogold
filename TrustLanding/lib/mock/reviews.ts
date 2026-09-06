import type { MockScenario } from "./scenario";

export interface ReviewItem {
  id: string;
  name: string;
  rating: number;
  date: string;
  verified: true;
  voiceUrl: string;
  voiceDurationSeconds: number;
}

export interface ReviewsResponse {
  asOf: string | null;
  status: "ok" | "stale" | "unavailable";
  average: number;
  total: number;
  items: ReviewItem[];
}

const DAY_MS = 24 * 60 * 60_000;

export function buildReviewsResponse(
  scenario: MockScenario,
  now: number,
  limit: number
): ReviewsResponse {
  if (scenario === "unavailable" || scenario === "down") {
    return { asOf: null, status: "unavailable", average: 0, total: 0, items: [] };
  }

  const all: ReviewItem[] = [
    {
      id: "rev-1",
      name: "علی ر.",
      rating: 5,
      date: new Date(now - 3 * DAY_MS).toISOString(),
      verified: true,
      voiceUrl: "/audio/reviews/01.mp3",
      voiceDurationSeconds: 98,
    },
    {
      id: "rev-2",
      name: "مریم س.",
      rating: 4,
      date: new Date(now - 9 * DAY_MS).toISOString(),
      verified: true,
      voiceUrl: "/audio/reviews/02.mp3",
      voiceDurationSeconds: 88,
    },
    {
      id: "rev-3",
      name: "حسین ک.",
      rating: 5,
      date: new Date(now - 14 * DAY_MS).toISOString(),
      verified: true,
      voiceUrl: "/audio/reviews/03.mp3",
      voiceDurationSeconds: 42,
    },
    {
      id: "rev-4",
      name: "زهرا م.",
      rating: 5,
      date: new Date(now - 21 * DAY_MS).toISOString(),
      verified: true,
      voiceUrl: "/audio/reviews/04.mp3",
      voiceDurationSeconds: 32,
    },
    {
      id: "rev-5",
      name: "امیر ت.",
      rating: 4,
      date: new Date(now - 28 * DAY_MS).toISOString(),
      verified: true,
      voiceUrl: "/audio/reviews/05.mp3",
      voiceDurationSeconds: 158,
    },
    {
      id: "rev-6",
      name: "نگار پ.",
      rating: 5,
      date: new Date(now - 35 * DAY_MS).toISOString(),
      verified: true,
      voiceUrl: "/audio/reviews/06.mp3",
      voiceDurationSeconds: 25,
    },
    {
      id: "rev-7",
      name: "رضا ن.",
      rating: 5,
      date: new Date(now - 41 * DAY_MS).toISOString(),
      verified: true,
      voiceUrl: "/audio/reviews/07.mp3",
      voiceDurationSeconds: 67,
    },
    {
      id: "rev-8",
      name: "فاطمه ح.",
      rating: 4,
      date: new Date(now - 48 * DAY_MS).toISOString(),
      verified: true,
      voiceUrl: "/audio/reviews/08.mp3",
      voiceDurationSeconds: 185,
    },
  ];

  return {
    asOf: new Date(now - 3 * 60 * 60_000).toISOString(),
    status: scenario === "stale" ? "stale" : "ok",
    average: 4.7,
    total: 1284,
    items: all.slice(0, Math.max(0, limit)),
  };
}
