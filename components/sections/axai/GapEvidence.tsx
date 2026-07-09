"use client";

import { useEffect, useRef, useState } from "react";
import Section from "@/components/common/Section";
import SectionHeader from "@/components/common/SectionHeader";
import { GAP_INTRO, GAP_METRICS } from "@/data/axai";

/** 성과 증거 — 사전/사후 GAP 바. 뷰포트 진입 시 width 채움(reduced-motion 즉시). */
export default function GapEvidence() {
  const boxRef = useRef<HTMLDivElement>(null);
  const [fill, setFill] = useState(false);

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setFill(true);
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Section pillar>
      <SectionHeader reveal eyebrow={GAP_INTRO.eyebrow} title={GAP_INTRO.title} />
      <div className="ax-gap r" ref={boxRef}>
        <div className="gt">{GAP_INTRO.boxTitle}</div>
        {GAP_METRICS.map((m) => (
          <div className="ax-gap-row" key={m.label}>
            <span className="gl">{m.label}</span>
            <div className="ax-gap-track">
              <div className="ax-gap-pre" style={{ width: fill ? `${m.pre}%` : 0 }} />
              <div
                className="ax-gap-post"
                style={{ width: fill ? `${m.post}%` : 0 }}
              />
            </div>
          </div>
        ))}
        <div className="ax-gap-leg">
          <span>
            <b style={{ background: "color-mix(in srgb, var(--p1) 22%, #fff)" }} />
            사전
          </span>
          <span>
            <b style={{ background: "var(--p1)" }} />
            사후
          </span>
        </div>
        <p className="ax-gap-cap">{GAP_INTRO.caption}</p>
      </div>
    </Section>
  );
}
