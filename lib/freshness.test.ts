import { describe, expect, it } from "vitest";
import { resolveFreshness, canShowPositive, FRESHNESS_SLA_MS } from "./freshness";

const NOW = new Date("2026-06-14T14:00:00+03:30").getTime();

describe("resolveFreshness", () => {
  it("returns unavailable when server explicitly says unavailable, even if data is fresh", () => {
    const asOf = new Date(NOW - 1_000).toISOString();
    expect(
      resolveFreshness({ serverStatus: "unavailable", asOf, kind: "price", now: NOW })
    ).toBe("unavailable");
  });

  it("returns unavailable when asOf is missing", () => {
    expect(
      resolveFreshness({ serverStatus: "ok", asOf: null, kind: "coverage", now: NOW })
    ).toBe("unavailable");
  });

  it("returns unavailable when asOf is not a valid date", () => {
    expect(
      resolveFreshness({ serverStatus: "ok", asOf: "not-a-date", kind: "status", now: NOW })
    ).toBe("unavailable");
  });

  it("returns ok when data is within SLA and server says ok", () => {
    const asOf = new Date(NOW - 10_000).toISOString();
    expect(resolveFreshness({ serverStatus: "ok", asOf, kind: "price", now: NOW })).toBe("ok");
  });

  it("downgrades server ok to stale once the SLA window has passed (price: 60s)", () => {
    const asOf = new Date(NOW - (FRESHNESS_SLA_MS.price + 1_000)).toISOString();
    expect(resolveFreshness({ serverStatus: "ok", asOf, kind: "price", now: NOW })).toBe("stale");
  });

  it("respects the longer SLA for coverage (24h)", () => {
    const asOf = new Date(NOW - (FRESHNESS_SLA_MS.coverage - 60_000)).toISOString();
    expect(resolveFreshness({ serverStatus: "ok", asOf, kind: "coverage", now: NOW })).toBe("ok");
  });

  it("never lets a server-reported stale/delayed status be shown as ok", () => {
    const asOf = new Date(NOW - 5_000).toISOString();
    expect(resolveFreshness({ serverStatus: "delayed", asOf, kind: "price", now: NOW })).toBe(
      "stale"
    );
  });
});

describe("canShowPositive", () => {
  it("only allows positive/green rendering for ok", () => {
    expect(canShowPositive("ok")).toBe(true);
    expect(canShowPositive("stale")).toBe(false);
    expect(canShowPositive("unavailable")).toBe(false);
  });
});
