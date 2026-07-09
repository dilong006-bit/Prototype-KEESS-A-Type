"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

/**
 * MetricStat (Design.md §5) — 증거 제시용 링 게이지 + 카운트업.
 * 원본 홈 stats 섹션의 .stat/.ring 구조를 이식.
 * - value: 목표 숫자, prefix/suffix: 앞뒤 텍스트("8,000"+ / 2"만")
 * - pct: 링 채움 비율(0~1), accent: 링·강조색(기본 --p1)
 * 뷰포트 진입 시 1회 카운트업 + 링 채움. prefers-reduced-motion이면 즉시 최종값.
 */
const CIRC = 326.726; // 2π·r (r=52)

type MetricStatProps = {
  value: number;
  label: string;
  pct: number;
  prefix?: string;
  suffix?: string;
  accent?: string;
  /** 카운트업 지속(ms) */
  duration?: number;
};

export default function MetricStat({
  value,
  label,
  pct,
  prefix = "",
  suffix = "",
  accent = "var(--p1)",
  duration = 1200,
}: MetricStatProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState(0);
  const [filled, setFilled] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const run = () => {
      setFilled(true);
      if (reduce) {
        setDisplay(value);
        return;
      }
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / duration);
        // easeOutCubic
        const eased = 1 - Math.pow(1 - p, 3);
        setDisplay(Math.round(value * eased));
        if (p < 1) requestAnimationFrame(tick);
        else setDisplay(value);
      };
      requestAnimationFrame(tick);
    };

    if (reduce) {
      run();
      return;
    }

    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            run();
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value, duration]);

  const offset = filled ? CIRC * (1 - pct) : CIRC;

  return (
    <div className="stat" ref={ref} style={{ "--ac": accent } as CSSProperties}>
      <div className="stat-ring">
        <svg viewBox="0 0 120 120" aria-hidden="true">
          <circle className="bg" cx="60" cy="60" r="52" />
          <circle
            className="fg"
            cx="60"
            cy="60"
            r="52"
            style={{ strokeDashoffset: offset }}
          />
        </svg>
        <div className="val">
          {prefix}
          <span className="num">{display.toLocaleString()}</span>
          {suffix}
        </div>
      </div>
      <div className="lab">{label}</div>
    </div>
  );
}
