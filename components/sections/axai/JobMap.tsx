"use client";

import { useEffect, useState } from "react";
import Section from "@/components/common/Section";
import SectionHeader from "@/components/common/SectionHeader";
import { JOBS_INTRO, JOBS, STAGE_NAMES } from "@/data/axai";

/** #jobs — 직무 포지셔닝 맵 + 직무 선택 시 5단계 역량. 홈 토큰. */
export default function JobMap() {
  const [job, setJob] = useState(JOBS[0].key);
  const [stepsIn, setStepsIn] = useState(false);
  const cur = JOBS.find((j) => j.key === job)!;
  const { axes } = JOBS_INTRO;

  useEffect(() => {
    setStepsIn(false);
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const id = window.setTimeout(() => setStepsIn(true), reduce ? 0 : 30);
    return () => window.clearTimeout(id);
  }, [job]);

  return (
    <Section id="jobs" pillar>
      <SectionHeader
        reveal
        eyebrow={JOBS_INTRO.eyebrow}
        title={JOBS_INTRO.title}
        sub={JOBS_INTRO.sub}
      />

      <div className="ax-qmap r">
        <div className="ax-qax qy-top">{axes.top}</div>
        <div className="ax-qax qy-bot">{axes.bottom}</div>
        <div className="ax-qax qx-left">{axes.left}</div>
        <div className="ax-qax qx-right">{axes.right}</div>
        <div className="ax-qplot">
          <div className="qline-h" />
          <div className="qline-v" />
          <span className="ax-quad qq-tl">{axes.quads.tl}</span>
          <span className="ax-quad qq-tr">{axes.quads.tr}</span>
          <span className="ax-quad qq-bl">{axes.quads.bl}</span>
          <span className="ax-quad qq-br">{axes.quads.br}</span>
          {JOBS.map((j) => (
            <button
              key={j.key}
              className={`ax-qdot${job === j.key ? " on" : ""}`}
              style={{ left: `${j.pos.x}%`, top: `${100 - j.pos.y}%` }}
              aria-label={j.key}
              onClick={() => setJob(j.key)}
            >
              <span className="pt" />
              <span className="lb">{j.key}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="ax-jpills r">
        {JOBS.map((j) => (
          <button
            key={j.key}
            className={`ax-jpill${job === j.key ? " on" : ""}`}
            onClick={() => setJob(j.key)}
          >
            {j.key}
          </button>
        ))}
      </div>

      <div className="ax-jsteps r">
        {cur.steps.map((cap, i) => (
          <div
            className={`ax-jstep${stepsIn ? " in" : ""}`}
            key={i}
            style={{ transitionDelay: `${i * 0.06}s` }}
          >
            <div className="jl">
              Lv{i + 1} · {STAGE_NAMES[i]}
            </div>
            <div className="jt">{cap}</div>
          </div>
        ))}
      </div>

      <p className="ax-job-note r">{JOBS_INTRO.note}</p>
    </Section>
  );
}
