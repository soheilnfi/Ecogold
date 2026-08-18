import { NextResponse } from "next/server";
import { buildLicensesResponse } from "@/lib/mock/licenses";
import { getScenario } from "@/lib/mock/scenario";

export const revalidate = 0;

export async function GET(request: Request) {
  const scenario = getScenario(request, "licenses");
  const body = buildLicensesResponse(scenario, Date.now());
  return NextResponse.json(body, { status: scenario === "down" ? 503 : 200 });
}
