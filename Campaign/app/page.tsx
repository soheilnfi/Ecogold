import type { Metadata } from "next";
import { SiteHeader } from "@/components/sections/SiteHeader";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { EvidenceBar } from "@/components/sections/EvidenceBar";
import { TextBar } from "@/components/sections/campaign/TextBar";
import { CampaignHero } from "@/components/sections/campaign/CampaignHero";
import { PriceCards } from "@/components/sections/campaign/PriceCards";
import { CampaignBanner } from "@/components/sections/campaign/CampaignBanner";
import { CampaignBenefits } from "@/components/sections/campaign/CampaignBenefits";
import { PriceChartWidget } from "@/components/sections/campaign/PriceChartWidget";
import { CampaignSteps } from "@/components/sections/campaign/CampaignSteps";
import { CampaignCountdown } from "@/components/sections/campaign/CampaignCountdown";
import { TrustPromo } from "@/components/sections/campaign/TrustPromo";
import { copy } from "@/content/copy.fa";
import { getCoverageDisclosurePolicy } from "@/lib/coverage-disclosure";

export const metadata: Metadata = {
  title: copy.campaign.meta.title,
  description: copy.campaign.meta.description,
};

export default function CampaignLanding() {
  // مثل صفحهٔ مرکز اعتماد: سیاست افشا فقط سمت سرور خوانده می‌شود و به‌صورت
  // prop پایین می‌رود — نوار شواهد یک کامپوننت کلاینتی است و خودش نباید بخواند.
  const coveragePolicy = getCoverageDisclosurePolicy();

  // لنگرهای نوار شواهد (#coverage, #status …) روی این صفحه وجود ندارند؛
  // با پیشوند مقصدِ همان CTA اعتماد، به صفحهٔ مرکز اعتماد هدایت می‌شوند.
  const trustBase = copy.campaign.trust.cta.href;

  return (
    <>
      <TextBar />
      <SiteHeader nav={copy.campaign.nav} />

      <main id="main-content" className="flex-1">
        <CampaignHero />
        <EvidenceBar policy={coveragePolicy} hrefBase={trustBase} />
        <CampaignCountdown />
        <PriceCards />
        <CampaignBanner />
        <CampaignBenefits />
        <PriceChartWidget />
        <CampaignSteps />
        <TrustPromo />
      </main>
      <SiteFooter />
    </>
  );
}
