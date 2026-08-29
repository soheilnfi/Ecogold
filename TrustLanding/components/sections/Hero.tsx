import { copy } from "@/content/copy.fa";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";

export function Hero() {
  return (
    <section id="hero" className="scroll-mt-20 border-b border-line">
      <div className="mx-auto grid max-w-[1160px] grid-cols-1 items-center gap-12 px-5 py-16 sm:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
        <div>
          <Eyebrow>{copy.hero.eyebrow}</Eyebrow>
          <h1 className="mt-4 text-display-xl font-black leading-[1.1] text-ink-900">
            {copy.hero.title}
          </h1>
          <p className="mt-6 max-w-xl text-body leading-8 text-ink-500">{copy.hero.subtitle}</p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button href="#coverage" size="lg">
              {copy.hero.ctaPrimary}
            </Button>
            <Button href="#status" variant="ghost" size="lg">
              {copy.hero.ctaSecondary}
            </Button>
          </div>
          <p className="mt-3 text-xs text-ink-500">{copy.hero.ctaPrimaryNote}</p>
        </div>

        <div className="aspect-square w-full max-w-md rounded-card border border-dashed border-line bg-surface-2 sm:aspect-[4/5]" />
      </div>
    </section>
  );
}
