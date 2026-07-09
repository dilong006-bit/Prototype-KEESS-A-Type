"use client";

import { useEffect, useRef, useState } from "react";

/**
 * useCountUp — 뷰포트 진입 시 0→target 카운트업(숫자만).
 * MetricStat(링)과 달리 순수 숫자 표기용. prefers-reduced-motion이면 즉시 최종값.
 * 반환: [ref, displayValue].
 */
export function useCountUp(target: number, duration = 1000) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const run = () => {
      if (reduce) {
        setDisplay(target);
        return;
      }
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / duration);
        setDisplay(Math.round((1 - Math.pow(1 - p, 3)) * target));
        if (p < 1) requestAnimationFrame(tick);
        else setDisplay(target);
      };
      requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            run();
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target, duration]);

  return [ref, display] as const;
}
