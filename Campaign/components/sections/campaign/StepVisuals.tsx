"use client";

import { motion, useReducedMotion } from "framer-motion";
import { copy } from "@/content/copy.fa";

/**
 * تصویرسازی متحرک هر قدم بنتو. هر انیمیشن باید معنی همان قدم را برساند، نه
 * حرکت تزئینی: پرشدن کد تأیید، رسم نمودار قیمت، و باز شدن سه انتخاب بعد از خرید.
 * با prefers-reduced-motion همه به حالت نهایی و ساکن رندر می‌شوند.
 */

const LOOP = 3.6;

/** قدم ۰۱ — خانه‌های کد تأیید یکی‌یکی پر می‌شوند و بعد نشان «احراز شد» می‌آید */
export function IdentityVisual() {
  const reduce = useReducedMotion();
  const t = copy.campaign.steps.visuals.identity;

  return (
    <div className="rounded-card border border-vault-line bg-vault-700/50 p-4">
      <p className="text-xs text-vault-muted">{t.label}</p>

      {/* ترتیب ارقام LTR است (عدد فارسی چپ‌به‌راست خوانده می‌شود) ولی گروه باید
          مثل بقیهٔ متن کارت از لبهٔ راست شروع شود */}
      <div className="mt-2.5 flex justify-end gap-2" dir="ltr">
        {t.digits.map((digit, i) => (
          <motion.span
            key={i}
            className="flex size-10 items-center justify-center rounded-lg border border-vault-line bg-vault-900 text-base font-black tabular-nums text-vault-ink"
            initial={{ opacity: reduce ? 1 : 0.2 }}
            animate={reduce ? { opacity: 1 } : { opacity: [0.2, 1, 1, 0.2] }}
            transition={
              reduce
                ? undefined
                : {
                    duration: LOOP,
                    times: [0, 0.16, 0.82, 1],
                    repeat: Infinity,
                    delay: i * 0.18,
                    ease: "easeOut",
                  }
            }
          >
            {digit}
          </motion.span>
        ))}
      </div>

      <motion.span
        className="mt-3 inline-flex items-center gap-1.5 rounded-pill bg-ok-bg px-3 py-1.5 text-xs font-bold text-ok"
        initial={{ opacity: reduce ? 1 : 0, scale: reduce ? 1 : 0.92 }}
        animate={
          reduce ? { opacity: 1, scale: 1 } : { opacity: [0, 0, 1, 1, 0], scale: [0.92, 0.92, 1, 1, 0.92] }
        }
        transition={
          reduce
            ? undefined
            : { duration: LOOP, times: [0, 0.42, 0.56, 0.86, 1], repeat: Infinity, ease: "easeOut" }
        }
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="size-3.5"
        >
          <path d="M20 6L9 17l-5-5" />
        </svg>
        {t.verified}
      </motion.span>
    </div>
  );
}

const SPARK = "M4 46 L24 39 L44 43 L64 27 L84 31 L104 15 L124 19 L142 7";
/** آخرین نقطهٔ SPARK — نقطهٔ انتهای خط روی همین مختصات می‌نشیند */
const SPARK_END = { x: 142, y: 7 };

/** قدم ۰۲ — خط قیمت رسم می‌شود و مقدار کمترین خرید کنارش می‌نشیند */
export function BuyVisual() {
  const reduce = useReducedMotion();
  const t = copy.campaign.steps.visuals.buy;

  return (
    <div className="rounded-card border border-line bg-surface-2 p-4">
      <p className="text-xs text-muted">{t.label}</p>

      <div className="mt-2.5 flex items-end gap-4">
        <div className="relative flex-1">
          <svg
            viewBox="0 0 146 52"
            preserveAspectRatio="none"
            className="h-10 w-full"
            aria-hidden="true"
          >
            {/* هشدار: روی این مسیر vectorEffect نگذارید. انیمیشن
                pathLength پشت صحنه stroke-dasharray را با واحد نرمال‌شدهٔ مسیر
                ست می‌کند؛ vectorEffect="non-scaling-stroke" همان عدد را پیکسل
                حساب می‌کند و خط به خط‌چین ریز تبدیل می‌شود — اضافه‌اش نکنید. */}
            <motion.path
              d={SPARK}
              fill="none"
              stroke="var(--gold-dim)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: reduce ? 1 : 0 }}
              animate={reduce ? { pathLength: 1 } : { pathLength: [0, 1, 1] }}
              transition={
                reduce
                  ? undefined
                  : { duration: LOOP, times: [0, 0.5, 1], repeat: Infinity, ease: "easeInOut" }
              }
            />
          </svg>

          {/* نقطهٔ انتهای خط عمداً HTML است نه <circle>: داخل این SVG هر دایره‌ای
              با همان مقیاس نامساوی کشیده و بیضی می‌شد. مرکزکردن با margin انجام
              می‌شود تا با transformِ انیمیشن تداخل نکند. */}
          <motion.span
            aria-hidden="true"
            className="absolute size-2 rounded-full bg-gold"
            style={{
              left: `${(SPARK_END.x / 146) * 100}%`,
              top: `${(SPARK_END.y / 52) * 100}%`,
              marginLeft: -4,
              marginTop: -4,
            }}
            initial={{ opacity: reduce ? 1 : 0, scale: reduce ? 1 : 0.4 }}
            animate={reduce ? { opacity: 1, scale: 1 } : { opacity: [0, 0, 1, 1], scale: [0.4, 0.4, 1, 1] }}
            transition={
              reduce
                ? undefined
                : { duration: LOOP, times: [0, 0.48, 0.58, 1], repeat: Infinity, ease: "easeOut" }
            }
          />
        </div>

        <div className="shrink-0 text-left" dir="rtl">
          <p className="text-h3 font-black tabular-nums text-ink-900">{t.amount}</p>
          <p className="mt-0.5 text-xs text-muted">{t.amountNote}</p>
        </div>
      </div>
    </div>
  );
}

/** قدم ۰۳ — سه انتخاب بعد از خرید پشت سر هم باز می‌شوند */
export function OutcomesVisual() {
  const reduce = useReducedMotion();
  const t = copy.campaign.steps.visuals.outcomes;

  return (
    <div className="rounded-card border border-line bg-surface-2 p-4">
      <p className="text-xs text-muted">{t.label}</p>

      <div className="mt-2.5 flex flex-wrap gap-2">
        {t.items.map((item, i) => (
          <motion.span
            key={item}
            className="inline-flex items-center gap-1.5 rounded-pill border border-line bg-surface px-3 py-1.5 text-sm font-bold text-ink-900"
            initial={reduce ? false : { opacity: 0, y: 10 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, delay: 0.1 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="size-1.5 rounded-full bg-gold" aria-hidden="true" />
            {item}
          </motion.span>
        ))}
      </div>
    </div>
  );
}
