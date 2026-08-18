import Link from "next/link";
import { copy } from "@/content/copy.fa";

export function SiteFooter() {
  const { support, branch, usefulLinks, legalNote, copyright } = copy.footer;

  return (
    <footer className="bg-vault-900 text-vault-ink">
      <div className="mx-auto grid max-w-[1160px] grid-cols-1 gap-10 px-5 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-lg font-black">{copy.header.logo}</p>
          <p className="mt-3 max-w-xs text-sm leading-7 text-vault-muted">{legalNote}</p>
        </div>

        <div>
          <p className="eyebrow eyebrow-on-vault mb-3">{support.title}</p>
          <p className="font-mono-id text-sm text-vault-ink" dir="ltr">
            {support.phone}
          </p>
          <p className="mt-2 text-sm text-vault-muted">{support.hours}</p>
        </div>

        <div>
          <p className="eyebrow eyebrow-on-vault mb-3">{branch.title}</p>
          <p className="text-sm leading-7 text-vault-muted">{branch.address}</p>
          <p className="mt-2 text-sm text-vault-muted">{branch.hoursWeekdays}</p>
          <p className="text-sm text-vault-muted">{branch.hoursThursday}</p>
        </div>

        <div>
          <p className="eyebrow eyebrow-on-vault mb-3">{usefulLinks.title}</p>
          <ul className="flex flex-col gap-2">
            {usefulLinks.items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-vault-muted transition-colors hover:text-vault-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-vault-line">
        <div className="mx-auto max-w-[1160px] px-5 py-6">
          <p className="text-xs text-vault-muted">{copyright}</p>
        </div>
      </div>
    </footer>
  );
}
