"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const isModifiedClick = (event) =>
  event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;

export default function RouteLoader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [visible, setVisible] = useState(false);
  const [showBackdrop, setShowBackdrop] = useState(false);
  const [progress, setProgress] = useState(0);

  const navigatingRef = useRef(false);
  const progressIntervalRef = useRef(null);
  const hideTimerRef = useRef(null);
  const backdropTimerRef = useRef(null);

  const clearTimers = () => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }
    if (backdropTimerRef.current) {
      clearTimeout(backdropTimerRef.current);
      backdropTimerRef.current = null;
    }
  };

  const start = () => {
    if (navigatingRef.current) return;
    navigatingRef.current = true;
    clearTimers();
    setVisible(true);
    setProgress(12);
    setShowBackdrop(false);

    backdropTimerRef.current = setTimeout(() => {
      setShowBackdrop(true);
    }, 140);

    progressIntervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) return prev;
        const step = Math.max(1, (92 - prev) * 0.14);
        return Math.min(90, prev + step);
      });
    }, 180);
  };

  const complete = () => {
    if (!navigatingRef.current) return;
    navigatingRef.current = false;
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
    setProgress(100);

    hideTimerRef.current = setTimeout(() => {
      setShowBackdrop(false);
      setVisible(false);
      setProgress(0);
    }, 260);
  };

  useEffect(() => {
    const onDocumentClick = (event) => {
      if (event.defaultPrevented || event.button !== 0 || isModifiedClick(event)) return;
      const target = event.target instanceof Element ? event.target.closest("a[href]") : null;
      if (!target) return;
      if (target.dataset.noRouteLoader === "true") return;
      if (target.hasAttribute("download")) return;

      const href = target.getAttribute("href");
      const targetAttr = target.getAttribute("target");
      if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return;
      if (targetAttr && targetAttr !== "_self") return;

      const url = new URL(target.href, window.location.href);
      if (url.origin !== window.location.origin) return;

      const current = `${window.location.pathname}${window.location.search}`;
      const next = `${url.pathname}${url.search}`;
      if (current === next) return;

      start();
    };

    const onPopState = () => start();

    document.addEventListener("click", onDocumentClick, true);
    window.addEventListener("popstate", onPopState);

    return () => {
      document.removeEventListener("click", onDocumentClick, true);
      window.removeEventListener("popstate", onPopState);
    };
  }, []);

  useEffect(() => {
    complete();
  }, [pathname, searchParams]);

  useEffect(() => () => clearTimers(), []);

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[999] transition-opacity duration-200 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden="true"
    >
      <div className="fixed left-0 right-0 top-0 h-[3px] bg-transparent">
        <div
          className="h-full bg-gradient-to-r from-[#4EA1FF] via-[#CE80DD] to-[#4EA1FF] shadow-[0_0_12px_rgba(206,128,221,0.6)] transition-[width] duration-200 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div
        className={`absolute inset-0 transition-opacity duration-200 ${
          showBackdrop ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="absolute inset-0 bg-[#070C1C]/20 backdrop-blur-[1px]" />
        <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full border border-white/15 bg-[#070C1C]/70 px-4 py-2">
          <span className="h-2 w-2 animate-bounce rounded-full bg-[#4EA1FF] [animation-delay:-0.2s]" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-[#CE80DD] [animation-delay:-0.1s]" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-[#4EA1FF]" />
        </div>
      </div>
    </div>
  );
}

