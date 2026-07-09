"use client";

import { useEffect, useRef, useState } from "react";
import Button from "@/components/common/Button";
import { useCountUp } from "@/lib/useCountUp";
import { HERO } from "@/data/axai";

/**
 * P1 히어로 — 홈 히어로와 같은 다크 트리트먼트(홈 비주얼 언어).
 * eyebrow → h1(단어별 등장) → sub → actions(상담/가이드) → chips 4 → stats 2.
 */
function HeroStat({ value, label }: { value: number; label: string }) {
  const [ref, n] = useCountUp(value);
  return (
    <div className="hs">
      <div className="hv">
        <span ref={ref}>{n}</span>
      </div>
      <div className="hl">{label}</div>
    </div>
  );
}

export default function AxHero({
  onConsult,
  onGuide,
}: {
  onConsult: () => void;
  onGuide: () => void;
}) {
  const [shown, setShown] = useState(false);
  const words = HERO.title.split(" ");
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const id = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <section className={`ax-hero${shown ? " in" : ""}`} id="hero" ref={rootRef}>
      <div className="wrap">
        <p className="eyebrow">{HERO.eyebrow}</p>
        <h1>
          {words.map((w, i) => (
            <span
              className="w"
              key={i}
              style={{ transitionDelay: `${i * 0.05}s` }}
            >
              {w}
              {i < words.length - 1 ? " " : ""}
            </span>
          ))}
        </h1>
        <p className="sub">{HERO.sub}</p>
        <div className="act">
          <Button variant="ink" onClick={onConsult}>
            AX 진단 상담받기
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              width="17"
              height="17"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Button>
          <Button variant="glass" onClick={onGuide}>
            AX 도입 가이드 받기
          </Button>
        </div>
        <div className="ax-chips">
          {HERO.chips.map((c) => (
            <span key={c}>{c}</span>
          ))}
        </div>
        <div className="ax-hero-stats">
          {HERO.stats.map((s) => (
            <HeroStat key={s.label} value={s.value} label={s.label} />
          ))}
        </div>
      </div>
    </section>
  );
}
