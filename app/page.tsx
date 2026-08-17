import { SiteHeader } from "@/components/sections/SiteHeader";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { Hero } from "@/components/sections/Hero";
import { EvidenceBar } from "@/components/sections/EvidenceBar";
import { ServiceStatus } from "@/components/sections/ServiceStatus";
import { CoverageReport } from "@/components/sections/CoverageReport";
import { Licenses } from "@/components/sections/Licenses";
import { PriceTransparency } from "@/components/sections/PriceTransparency";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { getCoverageDisclosurePolicy } from "@/lib/coverage-disclosure";

export default function Home() {
  // فقط سرور می‌تواند COVERAGE_DISCLOSURE_POLICY واقعی را بخواند؛ یک‌بار اینجا
  // محاسبه و به همهٔ سکشن‌های نیازمند به‌عنوان prop داده می‌شود — هیچ کامپوننت
  // کلاینتی مجاز نیست خودش این تابع را صدا بزند (در باندل کلاینت این env var
  // همیشه undefined است و به‌طور خطرناکی روی مقدار پیش‌فرض می‌افتد).
  const coveragePolicy = getCoverageDisclosurePolicy();

  return (
    <>
      <SiteHeader />
      <main id="main-content" className="flex-1">
        <Hero policy={coveragePolicy} />
        <EvidenceBar policy={coveragePolicy} />
        <ServiceStatus />
        <CoverageReport policy={coveragePolicy} />
        <Licenses />
        <PriceTransparency />
        <Faq />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}
