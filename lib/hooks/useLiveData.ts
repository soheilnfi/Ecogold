"use client";

import { useCallback, useEffect, useRef, useState } from "react";

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
      const res = await fetch(url, { cache: "no-store" });
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
