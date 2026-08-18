import localFont from "next/font/local";

/**
 * IRANYekanX Variable — فونت اصلی سایت (نمایشی + متن)، برگرفته از ecogold.ir.
 * محور "dots" مخصوص این فونت است (۰ تا ۴)؛ طبق درخواست روی ۲ ثابت شده — globals.css.
 */
export const iranYekan = localFont({
  src: [
    { path: "../public/fonts/iranyekan/IRANYekanXVF.woff2", weight: "100 900", style: "normal" },
  ],
  variable: "--font-iranyekan",
  display: "swap",
  preload: true,
});
