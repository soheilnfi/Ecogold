import { copy } from "@/content/copy.fa";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Tabs } from "@/components/ui/Tabs";
import { PriceAssetPanel } from "./PriceAssetPanel";

export function PriceTransparency() {
  const t = copy.priceTransparency;

  return (
    <section id="price" className="scroll-mt-20 border-b border-line">
      <div className="mx-auto max-w-[1160px] px-5 py-16 sm:py-24">
        <Reveal>
          <Eyebrow>{t.eyebrow}</Eyebrow>
          <h2 className="mt-3 text-h2 font-black text-ink-900">{t.title}</h2>
          <p className="mt-3 max-w-xl text-sm leading-7 text-muted">{t.subtitle}</p>
        </Reveal>

        <Reveal delay={0.05} className="mt-10">
          <Tabs
            items={[
              { key: "gold", label: t.tabs.gold, content: <PriceAssetPanel asset="gold" /> },
              { key: "silver", label: t.tabs.silver, content: <PriceAssetPanel asset="silver" /> },
              { key: "coin", label: t.tabs.coin, content: <PriceAssetPanel asset="coin" /> },
            ]}
          />
        </Reveal>
      </div>
    </section>
  );
}
