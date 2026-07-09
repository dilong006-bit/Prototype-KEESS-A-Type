"use client";

import { useState } from "react";
import Section from "@/components/common/Section";
import SectionHeader from "@/components/common/SectionHeader";
import Badge from "@/components/common/Badge";
import { OFFLINE_INTRO, STAGES } from "@/data/leadership";

/** #offline — 성장시점 4스테이지 스텝퍼 → 하위 프로그램 패널. 초기 index 0. */
export default function StageStepper() {
  const [active, setActive] = useState(0);
  const cur = STAGES[active];

  return (
    <Section id="offline" pillar>
      <SectionHeader
        reveal
        eyebrow={OFFLINE_INTRO.eyebrow}
        title={
          <>
            {OFFLINE_INTRO.title}{" "}
            <Badge
              style={{
                background: "color-mix(in srgb, var(--p2) 12%, #fff)",
                color: "var(--p2)",
                verticalAlign: "middle",
                fontSize: "13px",
              }}
            >
              {OFFLINE_INTRO.badge}
            </Badge>
          </>
        }
        sub={OFFLINE_INTRO.lead}
      />

      <div className="ls r">
        <div className="ls-steps" role="tablist" aria-label="성장 시점 선택">
          {STAGES.map((s, i) => (
            <button
              key={s.ph}
              type="button"
              className={`ls-step${i === active ? " on" : ""}`}
              role="tab"
              aria-selected={i === active}
              onClick={() => setActive(i)}
            >
              <span className="lsn">{s.ph}</span>
              <b>{s.key}</b>
              <span className="lsnm">{s.nm}</span>
              {i < STAGES.length - 1 && (
                <span className="lsar" aria-hidden="true">
                  →
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="ls-panel" role="tabpanel" aria-live="polite">
          <div className="ls-phead">
            <span className="pnm">{cur.nm}</span>
            <span className="pen">{cur.en}</span>
            <span className="pmod">{OFFLINE_INTRO.panelMod}</span>
          </div>
          <div className="ls-subs">
            {cur.sub.map((x) => (
              <div className="ls-sub" key={x.t}>
                <b>{x.t}</b>
                <div className="sd">{x.d}</div>
                <div className="ls-caps">
                  {x.caps.map((c) => (
                    <span key={c}>{c}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
