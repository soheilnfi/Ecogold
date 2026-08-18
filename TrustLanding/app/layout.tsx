import type { Metadata } from "next";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "./globals.css";
import { iranYekan } from "@/lib/fonts";
import { copy } from "@/content/copy.fa";

export const metadata: Metadata = {
  title: copy.meta.title,
  description: copy.meta.description,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fa" dir="rtl" className={`${iranYekan.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-bg text-ink-900">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:top-3 focus:right-3 focus:rounded-md focus:bg-ink-900 focus:px-4 focus:py-2 focus:text-sm focus:text-white"
        >
          {copy.a11y.skipToContent}
        </a>
        {children}
      </body>
    </html>
  );
}
