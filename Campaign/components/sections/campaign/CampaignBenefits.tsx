import { copy } from "@/content/copy.fa";
import { Card } from "@/components/ui/Card";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { SectionNumber } from "@/components/ui/SectionNumber";

export function CampaignBenefits() {
  const t = copy.campaign.benefits;

  return (
    <section id="why" className="scroll-mt-20 border-b border-line">
      <div className="mx-auto max-w-[1160px] px-5 py-16 sm:py-24">
        <Reveal>
          <Eyebrow>{t.eyebrow}</Eyebrow>
          <h2 className="mt-3 text-display-l font-black text-ink-900">{t.title}</h2>
          <p className="mt-4 max-w-xl text-body leading-8 text-ink-500">{t.subtitle}</p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {t.items.map((item, idx) => (
            <Reveal key={item.number} delay={idx * 0.06}>
              <Card className="h-full">
                <SectionNumber value={item.number} />
                <p className="mt-3 text-h3 font-black text-ink-900">{item.title}</p>
                <p className="mt-2 text-sm leading-7 text-ink-500">{item.body}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
