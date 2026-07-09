"use client";

import { useEffect, useState, type ReactNode } from "react";
import Button from "@/components/common/Button";

/**
 * PillarHero — 필러 페이지 공용 다크 히어로(P2·P3 공용화, 리팩토링).
 * eyebrow → h1(단어별 등장) → sub → actions(도입 문의/보조 CTA) → strip + 우측 비주얼(스탯 2 + 라벨).
 * 스타일은 components.css `.pillar-hero`(액센트 var(--pillar)). P4는 4축맵 구조라 미사용.
 */
export type PillarHeroData = {
  eyebrow: ReactNode;
  titlePlain: string;
  sub: ReactNode;
  strip: string[];
  stats: { value: string; label: string }[];
  visualLabel: { t: string; s: string };
  image: string;
};

export default function PillarHero({
  data,
  secondaryLabel,
  secondaryTargetId,
  visualAriaLabel,
  onInquiry,
}: {
  data: PillarHeroData;
  secondaryLabel: string;
  secondaryTargetId: string;
  visualAriaLabel: string;
  onInquiry: () => void;
}) {
  const [shown, setShown] = useState(false);
  const words = data.titlePlain.split(" ");

  useEffect(() => {
    const id = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const goSecondary = () => {
    const el = document.getElementById(secondaryTargetId);
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  };

  return (
    <section className={`pillar-hero${shown ? " in" : ""}`} id="hero">
      <div className="wrap">
        <div>
          <p className="eyebrow">{data.eyebrow}</p>
          <h1>
            {words.map((w, i) => (
              <span className="w" key={i} style={{ transitionDelay: `${i * 0.05}s` }}>
                {w}
                {i < words.length - 1 ? " " : ""}
              </span>
            ))}
          </h1>
          <p className="sub">{data.sub}</p>
          <div className="act">
            <Button variant="ink" onClick={onInquiry}>
              도입 문의
            </Button>
            <Button variant="glass" onClick={goSecondary}>
              {secondaryLabel}
            </Button>
          </div>
          <div className="pillar-strip">
            {data.strip.map((s) => (
              <span key={s}>{s}</span>
            ))}
          </div>
        </div>

        <div className="pillar-visual" role="img" aria-label={visualAriaLabel}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={data.image} alt="" loading="eager" decoding="async" />
          <div className="vscrim" />
          <div className="float f1">
            <div className="fv">{data.stats[0].value}</div>
            <div className="fl">{data.stats[0].label}</div>
          </div>
          <div className="float f2">
            <div className="fv">{data.stats[1].value}</div>
            <div className="fl">{data.stats[1].label}</div>
          </div>
          <div className="vlabel">
            <div className="t">{data.visualLabel.t}</div>
            <div className="s">{data.visualLabel.s}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
