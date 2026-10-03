import { copy } from "@/content/copy.fa";
import { Reveal } from "@/components/ui/Reveal";
import { Tabs } from "@/components/ui/Tabs";
import { PriceAssetPanel } from "./PriceAssetPanel";

export function PriceTransparency() {
  const t = copy.priceTransparency;

  return (
    <section id="price" className="scroll-mt-20 bg-vault-900 pattern-dots-vault text-vault-ink">
      <div className="mx-auto max-w-[1160px] px-5 py-16 sm:py-24">
        <Reveal>
          <h2 className="text-h2 font-black">{t.title}</h2>
          <p className="mt-3 max-w-xl text-sm leading-7 text-vault-muted">{t.subtitle}</p>
        </Reveal>

        <Reveal delay={0.05} className="mt-10">
          <Tabs
            onVault
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
