"use client";

import Button from "@/components/common/Button";
import { HERO } from "@/data/content";

/** #hero — 다크 웜 히어로 + 4축 맵(core + quad 4). */
export default function HeroContent({ onConsult }: { onConsult: () => void }) {
  const goHave = () => {
    const el = document.getElementById("axis-have");
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  };

  return (
    <section className="ct-hero" id="hero">
      <div className="wrap">
        <div>
          <span className="eyebrow">{HERO.eyebrow}</span>
          <h1>{HERO.title}</h1>
          <p className="lead">{HERO.lead}</p>
          <div className="hero-cta">
            <Button variant="ink" onClick={goHave}>
              콘텐츠 체계 살펴보기
            </Button>
            <Button variant="glass" onClick={onConsult}>
              콘텐츠 구성 문의
            </Button>
          </div>
          <p className="hero-note">{HERO.note}</p>
        </div>

        <div className="axismap" aria-label="4축 맵">
          <div className="core">
            <b>{HERO.axisMap.core.value}</b>
            <span>{HERO.axisMap.core.label}</span>
          </div>
          <div className="quad">
            {HERO.axisMap.quad.map((q) => (
              <a
                className={`axq${q.tone ? ` ${q.tone}` : ""}`}
                href={`#${q.key}`}
                key={q.key}
              >
                <div className="n">{q.no}</div>
                <div className="t">{q.title}</div>
                <div className="m">{q.meta}</div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
