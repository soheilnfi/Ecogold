import { NextResponse } from "next/server";
import { buildStatusResponse } from "@/lib/mock/status";
import { getScenario } from "@/lib/mock/scenario";

export const revalidate = 0;

export async function GET(request: Request) {
  const scenario = getScenario(request, "status");
  const body = buildStatusResponse(scenario, Date.now());
  return NextResponse.json(body, { status: scenario === "down" ? 503 : 200 });
}
