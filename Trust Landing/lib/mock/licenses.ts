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
      key: "business-license",
      title: "پروانهٔ کسب",
      number: "۱۴۰۲/۸۸۱۲۳",
      issuer: "اتحادیهٔ صنف فروشندگان طلا و جواهر",
      validUntil: "2027-03-20",
      verifyUrl: "https://iranasnaf.ir",
      logoUrl: null,
    },
    {
      key: "bank-deposit",
      title: "سپردهٔ بانک کارگشایی",
      number: "SPD-99213",
      issuer: "بانک مرکزی جمهوری اسلامی ایران",
      validUntil: "2027-01-10",
      verifyUrl: "https://cbi.ir",
      logoUrl: null,
    },
    {
      key: "fintech-association",
      title: "عضویت انجمن فین‌تک ایران",
      number: "FT-1044",
      issuer: "انجمن فناوری‌های نوین مالی ایران",
      validUntil: "2026-11-30",
      verifyUrl: "https://ifta.ir",
      logoUrl: null,
    },
    {
      key: "chamber-of-commerce",
      title: "عضویت اتاق بازرگانی",
      number: "CoC-773301",
      // نمونهٔ عمدی برای تست فیلتر خودکار مجوز منقضی
      issuer: "اتاق بازرگانی، صنایع، معادن و کشاورزی تهران",
      validUntil: "2026-05-01",
      verifyUrl: "https://tccim.ir",
      logoUrl: null,
    },
    {
      key: "computer-guild",
      title: "نظام صنفی رایانه‌ای",
      number: "NSR-56210",
      issuer: "سازمان نظام صنفی رایانه‌ای کشور",
      validUntil: "2027-02-15",
      verifyUrl: "https://tvto-portal.ir",
      logoUrl: null,
    },
    {
      key: "enamad",
      title: "نماد اعتماد الکترونیکی (اینماد)",
      number: "ENAMAD-198234",
      issuer: "مرکز توسعهٔ تجارت الکترونیکی",
      validUntil: "2026-12-25",
      verifyUrl: "https://trustseal.enamad.ir",
      logoUrl: null,
    },
    {
      key: "payment-gateway",
      title: "مجوز درگاه پرداخت",
      number: "PSP-30987",
      issuer: "شرکت شاپرک",
      validUntil: "2027-04-05",
      verifyUrl: "https://shaparak.ir",
      logoUrl: null,
    },
    {
      key: "ssl",
      title: "گواهی امنیتی SSL",
      number: "SSL-EV-2026-EG",
      issuer: "مرجع صدور گواهی دیجیتال",
      validUntil: "2026-10-18",
      verifyUrl: "https://www.ssllabs.com/ssltest/",
      logoUrl: null,
    },
  ];

  return {
    asOf: new Date(now - 6 * 60 * 60_000).toISOString(),
    status: scenario === "stale" ? "stale" : "ok",
    items,
  };
}
