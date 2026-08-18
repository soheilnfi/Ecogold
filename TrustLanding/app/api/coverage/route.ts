import { NextResponse } from "next/server";
import { buildCoverageResponse } from "@/lib/mock/coverage";
import { getNumberOverride, getScenario } from "@/lib/mock/scenario";

export const revalidate = 0;

export async function GET(request: Request) {
  const scenario = getScenario(request, "coverage");
  const ratioOverride = getNumberOverride(request, "ratio");
  const body = buildCoverageResponse(scenario, Date.now(), ratioOverride);
  return NextResponse.json(body, { status: scenario === "down" ? 503 : 200 });
}
