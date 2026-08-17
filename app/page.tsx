import { SiteHeader } from "@/components/sections/SiteHeader";
import { SiteFooter } from "@/components/sections/SiteFooter";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main-content" className="flex-1">
        {/* سکشن‌های فاز ۱ در ادامهٔ همین فایل اضافه می‌شوند */}
      </main>
      <SiteFooter />
    </>
  );
}
