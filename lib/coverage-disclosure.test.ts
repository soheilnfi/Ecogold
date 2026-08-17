import { describe, expect, it } from "vitest";
import { resolveCoverageDisplay } from "./coverage-disclosure";

describe("resolveCoverageDisplay", () => {
  it("always shows the number under the full policy", () => {
    expect(resolveCoverageDisplay("full", 98.2)).toEqual({ kind: "number" });
    expect(resolveCoverageDisplay("full", 102.4)).toEqual({ kind: "number" });
  });

  it("shows the threshold message when below threshold under the threshold policy", () => {
    expect(resolveCoverageDisplay("threshold", 98.2)).toEqual({ kind: "threshold-message" });
  });

  it("shows the number when at or above threshold under the threshold policy", () => {
    expect(resolveCoverageDisplay("threshold", 102.4)).toEqual({ kind: "number" });
    expect(resolveCoverageDisplay("threshold", 100)).toEqual({ kind: "number" });
  });

  it("never shows a number under the hidden policy, only qualitative state", () => {
    expect(resolveCoverageDisplay("hidden", 98.2)).toEqual({ kind: "qualitative", ok: false });
    expect(resolveCoverageDisplay("hidden", 102.4)).toEqual({ kind: "qualitative", ok: true });
  });

  it("falls back to number when ratio is null (unavailable is handled upstream, not here)", () => {
    expect(resolveCoverageDisplay("threshold", null)).toEqual({ kind: "number" });
  });
});
