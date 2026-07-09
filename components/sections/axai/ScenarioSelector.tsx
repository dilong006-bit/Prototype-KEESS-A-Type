"use client";

import { useRef, useState } from "react";
import Section from "@/components/common/Section";
import SectionHeader from "@/components/common/SectionHeader";
import Button from "@/components/common/Button";
import { SCENARIO_INTRO, SCENARIOS } from "@/data/axai";

/** #scenario 목표별 경로 — 목표 선택 시 우측 패널 갱신(원본 renderScen 로직). */
export default function ScenarioSelector({
  onConsult,
}: {
  onConsult: () => void;
}) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const cur = SCENARIOS[active];

  const onKey = (e: React.KeyboardEvent, i: number) => {
    if (["ArrowDown", "ArrowRight", "ArrowUp", "ArrowLeft"].includes(e.key)) {
      e.preventDefault();
      const dir = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : -1;
      const n = (i + dir + SCENARIOS.length) % SCENARIOS.length;
      setActive(n);
      refs.current[n]?.focus();
    }
  };

  return (
    <Section id="scenario" surface pillar>
      <SectionHeader
        reveal
        eyebrow={SCENARIO_INTRO.eyebrow}
        title={SCENARIO_INTRO.title}
        sub={SCENARIO_INTRO.sub}
      />
      <div className="ax-scen">
        <div className="ax-scen-opts" role="tablist" aria-label="목표 선택">
          {SCENARIOS.map((s, i) => (
            <button
              key={s.key}
              ref={(el) => {
                refs.current[i] = el;
              }}
              className={`ax-opt${i === active ? " on" : ""}`}
              role="tab"
              aria-selected={i === active}
              tabIndex={i === active ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(e) => onKey(e, i)}
            >
              <span className="od" />
              <span>
                {s.badge && <span className="obadge">{s.badge}</span>}
                <span className="ot">{s.label}</span>
              </span>
            </button>
          ))}
        </div>
        <div className="ax-scen-panel" role="tabpanel" aria-live="polite">
          <div className="pk">{cur.kicker}</div>
          <h3>{cur.title}</h3>
          <p>{cur.desc}</p>
          <div className="pchips">
            {cur.chips.map((c) => (
              <span key={c}>{c}</span>
            ))}
          </div>
          <div className="pcta">
            <Button variant="ink" onClick={onConsult} style={{ background: "#fff", color: "var(--p1)" }}>
              {cur.cta}
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
