"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

/**
 * PillarCard (Design.md §5) — 홈 4대 솔루션 병렬 소개 블록.
 * 원본 .pillar/.pgrid/.pmedia/.ptext/.steps 구조를 이식.
 * 필러색(--ac)은 번호·룰·배지·steps 강조에만. 미디어 그라디언트(--pg).
 * 뷰포트 진입 시 steps-fill 채움 + step 순차 lit + prule/lines reveal.
 * (reveal 관찰은 상위 useReveal이 .r/.lines를 처리; steps 진행은 자체 관찰)
 */
export type PillarStep = { num: string; title: string; desc: string };

export type PillarCardProps = {
  id?: string;
  index: string; // "01"
  name: string; // "AX·AI 전환"
  badge: string; // "AI Transformation"
  accent: string; // "var(--p1)"
  mediaGradient: string; // "linear-gradient(...)"
  image?: string;
  /** 제목 줄들 — 각 줄이 .ln>span 으로 렌더 */
  headingLines: ReactNode[];
  steps: PillarStep[];
  close?: ReactNode;
  reversed?: boolean;
};

export default function PillarCard({
  id,
  index,
  name,
  badge,
  accent,
  mediaGradient,
  image,
  headingLines,
  steps,
  close,
  reversed = false,
}: PillarCardProps) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const light = () => {
      el.querySelector<HTMLElement>(".prule")?.classList.add("in");
      const fill = el.querySelector<HTMLElement>(".steps-fill");
      if (fill) fill.style.setProperty("--sp", "100%");
      const stepEls = el.querySelectorAll<HTMLElement>(".step");
      stepEls.forEach((s, i) => {
        if (reduce) {
          s.classList.add("lit");
        } else {
          window.setTimeout(() => s.classList.add("lit"), 180 * i);
        }
      });
    };

    if (reduce) {
      light();
      return;
    }
    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            light();
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={rootRef}
      className={`pillar${reversed ? " rev" : ""}`}
      id={id}
      style={
        {
          "--ac": accent,
          "--pg": mediaGradient,
        } as CSSProperties
      }
    >
      <div className="pgrid">
        <div className="pmedia">
          {image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              className="pimg"
              src={image}
              alt=""
              loading="lazy"
              decoding="async"
            />
          )}
          <div className="pscrim" />
          <div className="pbadge">{badge}</div>
        </div>
        <div className="ptext">
          <div className="pidx r">{index}</div>
          <div className="pname r">{name}</div>
          <h3 className="lines">
            {headingLines.map((line, i) => (
              <span className="ln" key={i}>
                <span>{line}</span>
              </span>
            ))}
          </h3>
          <div className="prule" />
          <div className="steps">
            <div className="steps-line">
              <div className="steps-fill" />
            </div>
            {steps.map((s) => (
              <div className="step" key={s.num}>
                <div className="snum">{s.num}</div>
                <div className="stt">{s.title}</div>
                <div className="std">{s.desc}</div>
              </div>
            ))}
          </div>
          {close != null && <div className="pclose r">{close}</div>}
        </div>
      </div>
    </section>
  );
}
