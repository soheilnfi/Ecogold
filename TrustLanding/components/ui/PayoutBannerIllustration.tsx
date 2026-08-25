/**
 * تصویرسازی مفهومی «واریز تست» برای بنر سکشن تسویه — همان زبان بصری
 * خط‌موی ترازوی هیرو (بدون گرادیان/درخشش)، تا وقتی عکس واقعی جایگزین شود.
 */
export function PayoutBannerIllustration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 225" role="img" aria-hidden="true" className={className}>
      <rect x="0" y="0" width="400" height="225" fill="var(--surface-2)" />

      {/* سکه‌ای که به‌سمت گوشی حرکت می‌کند */}
      <circle cx="110" cy="80" r="20" fill="none" stroke="var(--gold-dim)" strokeWidth="2.5" />
      <text
        x="110"
        y="86"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill="var(--gold-dim)"
      >
        ﷼
      </text>
      <path
        d="M132 92 Q 165 118 190 132"
        fill="none"
        stroke="var(--gold-dim)"
        strokeWidth="2"
        strokeDasharray="4 5"
        strokeLinecap="round"
      />
      <path
        d="M182 124 L190 132 L180 136"
        fill="none"
        stroke="var(--gold-dim)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* بدنهٔ گوشی */}
      <rect
        x="190"
        y="35"
        width="120"
        height="190"
        rx="16"
        fill="var(--surface)"
        stroke="var(--ink-900)"
        strokeWidth="3"
      />
      <rect x="235" y="46" width="30" height="4" rx="2" fill="var(--ink-900)" />
      <rect x="240" y="208" width="20" height="3" rx="1.5" fill="var(--ink-700)" />

      {/* کارت اعلان داخل صفحه — متن راست‌به‌چپ، لنگرشده از لبهٔ راست کارت */}
      <rect
        x="202"
        y="90"
        width="96"
        height="80"
        rx="10"
        fill="var(--surface-2)"
        stroke="var(--line)"
        strokeWidth="1.5"
      />
      <circle cx="228" cy="118" r="12" fill="var(--gold)" />
      <path
        d="M222 118 L226 122 L235 112"
        fill="none"
        stroke="var(--ink-on-gold)"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <text x="288" y="115" direction="rtl" textAnchor="end" fontSize="9" fill="var(--muted)">
        واریز شد
      </text>
      <text
        x="288"
        y="132"
        direction="rtl"
        textAnchor="end"
        fontSize="12"
        fontWeight="800"
        fill="var(--ink-900)"
      >
        ۱۰٬۰۰۰
      </text>
      <text x="288" y="150" direction="rtl" textAnchor="end" fontSize="9" fill="var(--muted)">
        تومان به حساب شما
      </text>
    </svg>
  );
}
