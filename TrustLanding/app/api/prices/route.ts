import { NextResponse } from "next/server";
import { buildPriceResponse, isAssetKey } from "@/lib/mock/prices";
import { getScenario } from "@/lib/mock/scenario";

export const revalidate = 0;

export async function GET(request: Request) {
  const url = new URL(request.url);
  const assetParam = url.searchParams.get("asset");
  const asset = isAssetKey(assetParam) ? assetParam : "gold";

  const scenario = getScenario(request, "prices");
  const body = buildPriceResponse(asset, scenario, Date.now());
  return NextResponse.json(body, {
    status: scenario === "down" ? 503 : 200,
    headers: { "Cache-Control": "no-store" },
  });
}
