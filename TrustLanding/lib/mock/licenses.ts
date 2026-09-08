import type { MockScenario } from "./scenario";

export interface LicenseItem {
  key: string;
  title: string;
  number: string;
  issuer: string;
  validUntil: string;
  verifyUrl: string;
  logoUrl: string | null;
}

export interface LicensesResponse {
  asOf: string | null;
  status: "ok" | "stale" | "unavailable";
  items: LicenseItem[];
}

export function buildLicensesResponse(scenario: MockScenario, now: number): LicensesResponse {
  if (scenario === "unavailable" || scenario === "down") {
    return { asOf: null, status: "unavailable", items: [] };
  }

  const items: LicenseItem[] = [
    {
      key: "gold-silver-trading",
      title: "پروانه کسب سامانه معاملات آنلاین طلا و نقره",
      number: "VB-170580",
      issuer: "اتحادیهٔ صنف کسب‌وکارهای مجازی کشوری",
      validUntil: "2027-02-04",
      verifyUrl: "https://iranasnaf.ir",
      logoUrl: "/images/licenses/license-gold-silver.jpg",
    },
    {
      key: "melted-gold-sale",
      title: "پروانه کسب فروش طلای آبشده",
      number: "GJ-31185",
      issuer: "اتحادیهٔ صنف فروشندگان و سازندگان طلا، جواهر، نقره، سکه و صراف تهران",
      validUntil: "2027-04-24",
      verifyUrl: "https://iranasnaf.ir",
      logoUrl: "/images/licenses/license-gold.jpg",
    },
    {
      key: "silver-sale",
      title: "پروانه کسب فروش نقره",
      number: "GJ-31186",
      issuer: "اتحادیهٔ صنف فروشندگان و سازندگان طلا، جواهر، نقره، سکه و صراف تهران",
      validUntil: "2027-04-24",
      verifyUrl: "https://iranasnaf.ir",
      logoUrl: "/images/licenses/license-silver.jpg",
    },
    {
      key: "coin-sale",
      title: "پروانه کسب فروش سکه",
      number: "GJ-31187",
      issuer: "اتحادیهٔ صنف فروشندگان و سازندگان طلا، جواهر، نقره، سکه و صراف تهران",
      validUntil: "2027-04-24",
      verifyUrl: "https://iranasnaf.ir",
      logoUrl: "/images/licenses/license-coin.jpg",
    },
    {
      key: "gold-retail",
      title: "پروانه کسب فروشندگی طلا",
      number: "1404943329",
      issuer: "اتحادیهٔ صنف فروشندگان و سازندگان طلا، جواهر، نقره، سکه و صراف تهران",
      validUntil: "2031-02-22",
      verifyUrl: "https://iranasnaf.ir",
      logoUrl: "/images/licenses/gold-retail-license.jpg",
    },
    {
      key: "chamber-of-commerce",
      title: "عضویت در اتاق بازرگانی",
      number: "CoC-773301",
      issuer: "اتاق بازرگانی، صنایع، معادن و کشاورزی تهران",
      validUntil: "2027-05-09",
      verifyUrl: "https://tccim.ir",
      logoUrl: "/images/licenses/chamber-of-commerce.jpg",
    },
    {
      key: "cyber-security",
      title: "تایید صلاحیت امنیتی",
      number: "SEC-40821",
      issuer: "تیم متخصص امنیت سایبری",
      validUntil: "2026-12-01",
      verifyUrl: "https://ecogold.ir/bug-bounty",
      logoUrl: "/images/licenses/cyber-security.jpg",
    },
    {
      key: "fintech-association",
      title: "عضویت در انجمن فین‌تک",
      number: "FT-1044",
      issuer: "انجمن صنفی کارفرمایی فناوری‌های نوین مالی (فین‌تک)",
      validUntil: "2026-11-30",
      verifyUrl: "https://ifta.ir",
      logoUrl: "/images/licenses/fintech-association.jpg",
    },
    {
      key: "computer-guild",
      title: "مجوز رسمی از سازمان نظام صنفی رایانه‌ای",
      number: "NSR-56210",
      issuer: "سازمان نظام صنفی رایانه‌ای استان تهران",
      validUntil: "2027-02-15",
      verifyUrl: "https://tehran.irannsr.org",
      logoUrl: "/images/licenses/computer-guild.jpg",
    },
  ];

  return {
    asOf: new Date(now - 6 * 60 * 60_000).toISOString(),
    status: scenario === "stale" ? "stale" : "ok",
    items,
  };
}
