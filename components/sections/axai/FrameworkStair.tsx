"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Section from "@/components/common/Section";
import SectionHeader from "@/components/common/SectionHeader";
import {
  FRAMEWORK_INTRO,
  DX_CHIPS,
  FW_LEVELS,
  type FwCap,
} from "@/data/axai";

const STAIR_H = ["112px", "142px", "172px", "202px", "232px"];
// 단계가 올라갈수록 옅은 보라 틴트 상승(약간의 그라데이션 허용)
const STAIR_TINT = ["6%", "9%", "12%", "16%", "20%"];
const LV_CLASS: Record<FwCap["level"], string> = {
  기본: "b1",
  심화: "b2",
  응용: "b3",
};

/** #framework — 통증 진단 5칩 + 5단계 계단 + 역량 영역. 홈 토큰. */
export default function FrameworkStair() {
  const [stage, setStage] = useState(1); // 1..5
  const [capsIn, setCapsIn] = useState(false);
  const stairRef = useRef<HTMLDivElement>(null);
  const lvl = FW_LEVELS[stage - 1];

  // 단계 변경 시 역량 카드 순차 등장
  useEffect(() => {
    setCapsIn(false);
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const id = window.setTimeout(() => setCapsIn(true), reduce ? 0 : 40);
    return () => window.clearTimeout(id);
  }, [stage]);

  const pickStage = (s: number, scroll = false) => {
    setStage(s);
    if (scroll) {
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      stairRef.current?.scrollIntoView({
        behavior: reduce ? "auto" : "smooth",
        block: "center",
      });
    }
  };

  return (
    <Section id="framework" surface pillar>
      <SectionHeader
        reveal
        eyebrow={FRAMEWORK_INTRO.eyebrow}
        title={FRAMEWORK_INTRO.title}
        sub={FRAMEWORK_INTRO.sub}
      />

      <div className="ax-dx r">
        <div className="dxq">
          <svg
            className="dxq-ico"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.2-4.2" />
            <path d="M11 8v3.2M11 14h.01" />
          </svg>
          {FRAMEWORK_INTRO.dxLabel}
        </div>
        <div className="ax-dx-chips">
          {DX_CHIPS.map((c) => (
            <button
              key={c.stage}
              className={`ax-dx-chip${stage === c.stage ? " on" : ""}`}
              onClick={() => pickStage(c.stage, true)}
            >
              {c.text}
            </button>
          ))}
        </div>
      </div>

      <div
        className="ax-stair r"
        role="tablist"
        aria-label="AX 단계 선택"
        ref={stairRef}
      >
        {FW_LEVELS.map((l, i) => (
          <button
            key={l.lv}
            className={`ax-stair-step${stage === i + 1 ? " on" : ""}`}
            style={
              {
                "--h": STAIR_H[i],
                "--tint": STAIR_TINT[i],
              } as CSSProperties
            }
            role="tab"
            aria-selected={stage === i + 1}
            onClick={() => pickStage(i + 1)}
          >
            <span className="sl">{l.lv}</span>
            <span className="sn">{l.name}</span>
          </button>
        ))}
      </div>

      <div className="ax-fw-body">
        <p className="fd">
          <b>{lvl.name}</b> · {lvl.desc}
        </p>
        <div className="ax-fw-areas">
          {lvl.areas.map((a) => (
            <div className="ax-fw-area" key={a.name}>
              <h5>{a.name}</h5>
              {a.caps.map((c, ci) => (
                <div
                  className={`ax-fw-cap${capsIn ? " in" : ""}`}
                  key={c.name}
                  style={{ transitionDelay: `${ci * 0.035}s` }}
                >
                  <span>{c.name}</span>
                  <span className={`lv ${LV_CLASS[c.level]}`}>{c.level}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
