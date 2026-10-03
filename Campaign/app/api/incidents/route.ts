import { NextResponse } from "next/server";
import { buildIncidentsResponse } from "@/lib/mock/incidents";
import { getScenario } from "@/lib/mock/scenario";

export const revalidate = 0;

export async function GET(request: Request) {
  const url = new URL(request.url);
  const limit = Number(url.searchParams.get("limit") ?? "5") || 5;

  const scenario = getScenario(request, "incidents");
  const body = buildIncidentsResponse(scenario, Date.now(), limit);
  return NextResponse.json(body, { status: scenario === "down" ? 503 : 200 });
}
