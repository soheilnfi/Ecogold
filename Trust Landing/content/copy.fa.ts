/**
 * تمام متن‌های فارسی صفحهٔ «مرکز اعتماد و شفافیت اکوگلد».
 * هیچ رشتهٔ فارسی نباید مستقیم داخل JSX نوشته شود — همه از همین‌جا می‌آیند
 * تا تیم حقوقی/محتوا بتواند با بازبینی یک فایل، کل کپی صفحه را تأیید کند.
 */

export const copy = {
  meta: {
    title: "مرکز اعتماد و شفافیت اکوگلد — پوشش دارایی، مجوزها و وضعیت سرویس‌ها",
    description:
      "نسبت پوشش دارایی، محل نگهداری، شفافیت قیمت و وضعیت لحظه‌ای سرویس‌های اکوگلد؛ هر عدد با زمان‌مُهر و منبع مشخص.",
  },

  a11y: {
    skipToContent: "رفتن به محتوای اصلی",
    closeModal: "بستن",
  },

  header: {
    logo: "اکوگلد",
    logoSub: "مرکز اعتماد",
    nav: [
      { href: "#coverage", label: "پوشش دارایی" },
      { href: "#status", label: "وضعیت سرویس‌ها" },
      { href: "#price", label: "قیمت" },
      { href: "#settlement", label: "تسویه" },
      { href: "#faq", label: "سوالات متداول" },
    ],
    statusChip: {
      allOperational: "همهٔ سرویس‌ها فعال",
      degraded: (n: number) => `${n} سرویس با اختلال`,
      unavailable: "وضعیت در دسترس نیست",
    },
    ctaDownloadReport: "دانلود گزارش امروز",
    ctaLogin: "ورود و ثبت‌نام",
  },

  footer: {
    support: {
      title: "پشتیبانی",
      phone: "۰۲۱-۸۲۸۰۰۸۶۰",
      hours: "همه روزه از ساعت ۸:۳۰ صبح الی ۱۲ شب",
    },
    branch: {
      title: "شعبهٔ ۱",
      address: "بازار تهران، ناصر خسرو، پاساژ شمس‌العماره، واحد ۴۱۸",
      hoursWeekdays: "شنبه تا چهارشنبه: ۱۰:۳۰ الی ۱۸:۰۰",
      hoursThursday: "پنجشنبه: ۱۰:۳۰ الی ۱۵:۰۰",
    },
    usefulLinks: {
      title: "لینک‌های مفید",
      items: [
        { href: "/rules", label: "قوانین و مقررات" },
        { href: "/faq", label: "سوالات متداول" },
        { href: "/contact", label: "تماس با ما" },
        { href: "/licenses", label: "مجوزهای اکوگلد" },
        { href: "/about", label: "درباره ما" },
        { href: "/bug-bounty", label: "شکار باگ" },
        { href: "/invite", label: "دعوت از دوستان" },
      ],
    },
    legalNote:
      "اطلاعات این صفحه صرفاً جهت شفافیت ارائه می‌شود و توصیهٔ سرمایه‌گذاری نیست. اعداد نمایشی دارای زمان‌مُهر و منبع مشخص‌اند؛ در صورت اختلاف، مبنای رسمی گزارش‌های بایگانی‌شده است.",
    copyright: "تمامی حقوق مادی و معنوی این وب‌سایت متعلق به اکوگلد می‌باشد.",
  },

  hero: {
    eyebrow: "مرکز اعتماد و شفافیت",
    title: "اعتماد باید قابل دیدن باشد",
    subtitle:
      "هر گرم دارایی شما پشتوانهٔ فیزیکی دارد. عدد پوشش، محل نگهداری، ساختار قیمت و وضعیت لحظه‌ای سرویس‌ها — همه در یک صفحه، با زمان و منبع مشخص.",
    ctaPrimary: "دانلود گزارش امروز",
    ctaSecondary: "وضعیت سرویس‌ها را ببینید",
    tickers: ["طلا", "نقره", "فلزات گران‌بها"],
    scale: {
      liability: "تعهد به کاربران",
      asset: "موجودی فیزیکی",
      caption: "نسبت پوشش دارایی",
      loading: "در حال دریافت نسبت پوشش…",
      unavailable: "نسبت پوشش در دسترس نیست — در حال بررسی",
      unavailableLink: "مشاهدهٔ رخدادها",
    },
  },

  evidenceBar: {
    items: [
      { metric: "coverageRatio" as const, label: "پوشش دارایی", caption: "گزارش روزانه، قابل دانلود", anchor: "#coverage" },
      { metric: "settlementSla" as const, label: "تسویهٔ ریالی", caption: "فقط به حساب خودِ شما", anchor: "#settlement" },
      { metric: "serviceUptime" as const, label: "سرویس فعال", caption: "پایش خودکار", anchor: "#status" },
      { metric: "minPhysical" as const, label: "حداقل دریافت فیزیکی", caption: "از ۱ روز کاری بعد", anchor: "#delivery" },
    ],
  },

  serviceStatus: {
    eyebrow: "وضعیت لحظه‌ای",
    title: "الان چیزی خراب نیست؟",
    subtitle: "پایش خودکار ۸ سرویس کلیدی، هر ۶۰ ثانیه به‌روزرسانی می‌شود.",
    stateLabels: {
      operational: "عملیاتی",
      degraded: "کند",
      down: "موقتاً غیرفعال",
      unknown: "نامشخص",
    },
    lastCheckedPrefix: "آخرین بررسی خودکار:",
    incidentsLink: "مشاهدهٔ رخدادها",
    unavailableMessage: "پایش موقتاً در دسترس نیست",
    tooltipTemplate: (date: string, uptime: string, incidentMinutes: number) =>
      incidentMinutes > 0
        ? `${date} · ${uptime} · ${incidentMinutes} دقیقه اختلال`
        : `${date} · ${uptime}`,
  },

  coverageReport: {
    eyebrow: "قلب صفحه",
    title: "گزارش پوشش دارایی",
    ratioCaption: "نسبت پوشش دارایی",
    downloadToday: "دانلود گزارش امروز (PDF)",
    viewArchive: "گزارش‌های قبلی",
    chartTitle: "روند ۳۰ روز اخیر",
    chartRangeNote: "محور عمودی برای دیده‌شدن نوسان واقعی به بازهٔ ۹۸ تا ۱۰۶ درصد محدود شده است.",
    baselineLabel: "خط مبنا ۱۰۰٪",
    immutableNote: "گزارش هر روز ساعت ۰۹:۰۰ تولید و بایگانی می‌شود و پس از انتشار تغییر نمی‌کند.",
    howCalculated: {
      title: "این عدد چطور محاسبه می‌شود؟",
      steps: [
        "موجودی فیزیکی انبار ÷ مجموع تعهد به کاربران × ۱۰۰",
        "منبع: سامانهٔ حسابداری",
        "مالک: واحد مالی · مغایرت‌گیری روزانه",
      ],
    },
    archive: {
      title: "گزارش‌های قبلی",
      columns: { date: "تاریخ", ratio: "نسبت", id: "شناسهٔ گزارش", size: "حجم فایل", download: "دانلود" },
      filterAllMonths: "همهٔ ماه‌ها",
      pageSize: 20,
    },
    states: {
      unavailable: "نسبت پوشش در دسترس نیست — در حال بررسی",
      stale: "داده قدیمی",
      downloadDisabled: "به‌دلیل قطع موقت اتصال به منبع، دانلود گزارش امروز فعلاً در دسترس نیست.",
    },
    disclosurePolicy: {
      thresholdMessage:
        "نسبت پوشش زیر آستانهٔ افشای عمومی است. طبق سیاست انتشار، به‌جای عدد، وضعیت کیفی نمایش داده می‌شود.",
      hiddenOk: "پوشش کامل",
      hiddenReviewing: "در حال بررسی",
    },
  },

  licenses: {
    eyebrow: "مجوزها و اعتبارها",
    title: "شفافیت رگولاتوری",
    subtitle: "هر مجوز با شماره، تاریخ اعتبار و لینک راستی‌آزمایی در سامانهٔ مرجع.",
    verifyLink: "راستی‌آزمایی در سامانهٔ مرجع",
    validUntilLabel: "تاریخ اعتبار",
    numberLabel: "شمارهٔ مجوز",
  },

  priceTransparency: {
    eyebrow: "شفافیت قیمت",
    title: "چیزی پنهان نیست",
    subtitle: "قیمت هر ۱۰ ثانیه به‌روز می‌شود؛ اسپرد همیشه هم‌اندازهٔ خودِ قیمت دیده می‌شود.",
    tabs: { gold: "طلا", silver: "نقره", coin: "سکه" },
    labels: { buy: "قیمت خرید", sell: "قیمت فروش", spread: "اسپرد", fee: "کارمزد معامله", perGram: "هر گرم" },
    updateNote: "قیمت هر ۱۰ ثانیه به‌روز می‌شود",
    spreadExplainer: {
      title: "اسپرد چیست و چرا وجود دارد؟",
      body: "اسپرد اختلاف قیمت خرید و فروش است. این اختلاف هزینهٔ نقدشوندگی آنی و ریسک نوسان لحظه‌ای بازار را پوشش می‌دهد؛ هرچه بازار باثبات‌تر باشد، این فاصله معمولاً کوچک‌تر است. اکوگلد اسپرد را همیشه به همان اندازهٔ قیمت‌ها نمایش می‌دهد، نه در پانویس ریز.",
    },
    calculator: {
      title: "اگر همین الان بخرید و بفروشید چقدر اختلاف دارد؟",
      inputGramLabel: "مقدار (گرم)",
      inputTomanLabel: "مبلغ (تومان)",
      resultPrefix: "اختلاف تقریبی:",
      disabledNote: "به‌دلیل قطع موقت قیمت لحظه‌ای، ماشین‌حساب غیرفعال است.",
    },
    states: {
      delayed: "قیمت‌ها با تأخیر نمایش داده می‌شوند",
      unavailable: "—",
    },
  },

  faq: {
    eyebrow: "پرسش‌های متداول",
    title: "اعتماد و امنیت",
    searchPlaceholder: "در پرسش‌ها جست‌وجو کنید…",
    categories: {
      backing: "پشتوانه و دارایی",
      pricing: "قیمت و کارمزد",
      withdrawal: "برداشت و تسویه",
      security: "امنیت حساب",
    },
    items: [
      {
        id: "backing-1",
        category: "backing" as const,
        question: "از کجا بدانم دارایی من پشتوانه دارد؟",
        answer:
          "نسبت پوشش دارایی هر روز از سامانهٔ حسابداری محاسبه و منتشر می‌شود و در گزارش قابل‌دانلود روزانه با زمان‌مُهر مشخص است.",
        linkHref: "#coverage",
        linkLabel: "عدد پوشش امروز را اینجا ببینید ↑",
      },
      {
        id: "pricing-1",
        category: "pricing" as const,
        question: "چرا قیمت خرید و فروش متفاوت است؟",
        answer:
          "این اختلاف «اسپرد» نام دارد و هزینهٔ نقدشوندگی آنی را پوشش می‌دهد. اسپرد همیشه به همان اندازهٔ قیمت‌ها نمایش داده می‌شود.",
        linkHref: "#price",
        linkLabel: "جزئیات شفافیت قیمت ↑",
      },
      {
        id: "backing-2",
        category: "backing" as const,
        question: "آیا امکان دریافت فیزیکی طلا وجود دارد؟",
        answer:
          "بله؛ از حداقل ۰٫۵ گرم، با فلوی ۴مرحله‌ای ثبت درخواست تا تحویل با احراز مالکیت. جزئیات در سکشن «دریافت فیزیکی».",
        linkHref: undefined as string | undefined,
        linkLabel: undefined as string | undefined,
      },
      {
        id: "security-1",
        category: "security" as const,
        question: "آیا امکان دسترسی غیرمجاز به حساب من وجود دارد؟",
        answer:
          "کانال‌های ارتباطی رسمی اکوگلد محدود و مشخص‌اند. اکوگلد و بنیان‌گذار هرگز در پیام خصوصی درخواست انتقال وجه، رمز یا کد تأیید نمی‌کنند.",
        linkHref: undefined as string | undefined,
        linkLabel: undefined as string | undefined,
      },
      {
        id: "withdrawal-1",
        category: "withdrawal" as const,
        question: "در صورت بروز مشکل در واریز یا برداشت چه باید کرد؟",
        answer:
          "تسویهٔ ریالی حداکثر ۲ ساعت کاری و فقط به حساب بانکی خودِ شما انجام می‌شود. می‌توانید مسیر برداشت را با «تست دریافت وجه ۱۰ هزار تومانی» از قبل امتحان کنید.",
        linkHref: "#settlement",
        linkLabel: "تست دریافت وجه ↑",
      },
    ],
  },

  finalCta: {
    title: "شفافیت را خودتان بررسی کنید.",
    subtitle: "گزارش امروز را دانلود کنید یا مسیر برداشت را با ۱۰٬۰۰۰ تومان تست کنید.",
    ctaPrimary: "دانلود گزارش امروز",
    ctaSecondary: "تست دریافت وجه",
  },
} as const;

export type Copy = typeof copy;
