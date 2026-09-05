import { SiteHeader } from "@/components/sections/SiteHeader";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { Hero } from "@/components/sections/Hero";
import { EvidenceBar } from "@/components/sections/EvidenceBar";
import { ServiceStatus } from "@/components/sections/ServiceStatus";
import { CoverageReport } from "@/components/sections/CoverageReport";
import { Licenses } from "@/components/sections/Licenses";
import { PriceTransparency } from "@/components/sections/PriceTransparency";
import { Settlement } from "@/components/sections/Settlement";
import { MidBanner } from "@/components/sections/MidBanner";
import { Products } from "@/components/sections/Products";
import { PhysicalDelivery } from "@/components/sections/PhysicalDelivery";
import { DeliveryCenter } from "@/components/sections/DeliveryCenter";
import { Faq } from "@/components/sections/Faq";
import { Reviews } from "@/components/sections/Reviews";
import { FinalCta } from "@/components/sections/FinalCta";
import { PromoWidget } from "@/components/ui/PromoWidget";
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
        <Hero />
        <EvidenceBar policy={coveragePolicy} />
        <ServiceStatus />
        <CoverageReport policy={coveragePolicy} />
        <Licenses />
        <PriceTransparency />
        <Settlement />
        <MidBanner />
        <Products />
        <PhysicalDelivery />
        <DeliveryCenter />
        <Faq />
        <Reviews />
        <FinalCta />
      </main>
      <SiteFooter />
      <PromoWidget />
    </>
  );
}
