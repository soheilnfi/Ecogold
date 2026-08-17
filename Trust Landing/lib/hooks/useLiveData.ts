"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * برای تست E2E: اگر صفحه با کوئری‌پارامی مثل ?mock=unavailable یا ?ratio=98.2
 * باز شده باشد، همان پارامترها را به فراخوانی API این هوک هم اضافه می‌کند —
 * تا بشود کل صفحه را با یک URL به یک سناریو برد، بدون نیاز به route interception
 * جدا برای هر endpoint. فقط خارج از production فعال است.
 */
function withPageScenarioOverrides(url: string): string {
  if (process.env.NODE_ENV === "production" || typeof window === "undefined") return url;
  const pageParams = new URLSearchParams(window.location.search);
  if (Array.from(pageParams.keys()).length === 0) return url;

  const target = new URL(url, window.location.origin);
  pageParams.forEach((value, key) => {
    if (!target.searchParams.has(key)) target.searchParams.set(key, value);
  });
  return `${target.pathname}?${target.searchParams.toString()}`;
}

interface UseLiveDataOptions {
  /** اگر تعیین نشود، فقط یک‌بار fetch می‌شود */
  intervalMs?: number;
  /** وقتی تب مخفی است polling متوقف شود — پیش‌فرض true */
  pauseWhenHidden?: boolean;
}

interface UseLiveDataResult<T> {
  data: T | null;
  /** خطای شبکه/HTTP — باید مثل serverStatus="unavailable" با resolveFreshness ترکیب شود */
  fetchFailed: boolean;
  loading: boolean;
  refetch: () => void;
}

export function useLiveData<T>(
  url: string,
  { intervalMs, pauseWhenHidden = true }: UseLiveDataOptions = {}
): UseLiveDataResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [fetchFailed, setFetchFailed] = useState(false);
  const [loading, setLoading] = useState(true);
  const requestId = useRef(0);

  const fetchOnce = useCallback(async () => {
    const id = ++requestId.current;
    try {
      const res = await fetch(withPageScenarioOverrides(url), { cache: "no-store" });
      if (!res.ok) throw new Error(String(res.status));
      const json = (await res.json()) as T;
      if (id === requestId.current) {
        setData(json);
        setFetchFailed(false);
      }
    } catch {
      if (id === requestId.current) setFetchFailed(true);
    } finally {
      if (id === requestId.current) setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchOnce();
    if (!intervalMs) return;

    let timer: ReturnType<typeof setInterval> | null = null;
    const start = () => {
      if (!timer) timer = setInterval(fetchOnce, intervalMs);
    };
    const stop = () => {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    };
    const handleVisibility = () => {
      if (!pauseWhenHidden) return;
      if (document.hidden) stop();
      else {
        fetchOnce();
        start();
      }
    };

    start();
    if (pauseWhenHidden) document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      stop();
      if (pauseWhenHidden) document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [fetchOnce, intervalMs, pauseWhenHidden]);

  return { data, fetchFailed, loading, refetch: fetchOnce };
}
