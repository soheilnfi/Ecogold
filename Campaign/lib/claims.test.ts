import { describe, expect, it } from "vitest";
import { APPROVED_CLAIMS, getClaim, type ClaimKey } from "./claims";

describe("claims registry", () => {
  it("returns the claim record for a known key", () => {
    const claim = getClaim("coverageRatio");
    expect(claim.source).toBe("سامانهٔ حسابداری");
    expect(claim.owner).toBe("واحد مالی");
  });

  it("every approved claim has a label, source, owner and verification mechanism", () => {
    const keys = Object.keys(APPROVED_CLAIMS) as ClaimKey[];
    expect(keys.length).toBeGreaterThan(0);
    for (const key of keys) {
      const claim = getClaim(key);
      expect(claim.label).toBeTruthy();
      expect(claim.source).toBeTruthy();
      expect(claim.owner).toBeTruthy();
      expect(claim.verification).toBeTruthy();
    }
  });

  it("throws for a key outside the approved list", () => {
    // @ts-expect-error -- کلید خارج از فهرست باید هم در تایپ و هم در ران‌تایم رد شود
    expect(() => getClaim("madeUpClaim")).toThrow(/فهرست ادعاهای مجاز/);
  });
});
