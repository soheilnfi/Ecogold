import { copy } from "@/content/copy.fa";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function FinalCta() {
  const t = copy.finalCta;

  return (
    <section className="bg-vault-900 text-vault-ink">
      <div className="mx-auto max-w-[1160px] px-5 py-20 text-center sm:py-28">
        <Reveal>
          <h2 className="text-display-l font-black">{t.title}</h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-8 text-vault-muted">{t.subtitle}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button href="#coverage" size="lg">
              {t.ctaPrimary}
            </Button>
            <Button
              href="#settlement"
              variant="ghost"
              size="lg"
              className="!border-vault-line !text-vault-ink hover:!border-gold"
            >
              {t.ctaSecondary}
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
