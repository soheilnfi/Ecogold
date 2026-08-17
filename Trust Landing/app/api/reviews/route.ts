import { NextResponse } from "next/server";
import { buildReviewsResponse } from "@/lib/mock/reviews";
import { getScenario } from "@/lib/mock/scenario";

export const revalidate = 0;

export async function GET(request: Request) {
  const url = new URL(request.url);
  const limit = Number(url.searchParams.get("limit") ?? "6") || 6;

  const scenario = getScenario(request, "reviews");
  const body = buildReviewsResponse(scenario, Date.now(), limit);
  return NextResponse.json(body, { status: scenario === "down" ? 503 : 200 });
}
