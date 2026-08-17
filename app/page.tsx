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

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main-content" className="flex-1">
        <Hero />
        <EvidenceBar />
        <ServiceStatus />
        <CoverageReport />
        <Licenses />
        <PriceTransparency />
        <Faq />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}
