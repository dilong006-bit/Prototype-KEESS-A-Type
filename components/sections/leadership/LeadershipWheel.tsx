"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Section from "@/components/common/Section";
import SectionHeader from "@/components/common/SectionHeader";
import {
  FRAMEWORK_INTRO,
  WHEEL_TRACKS,
  WHEEL_PALETTE,
  WHEEL_TEXT,
} from "@/data/leadership";

/**
 * #framework — 리더십 휠(SVG 6세그먼트, 극좌표) + 상세 패널.
 * 세그먼트 role="button"·tabindex·Enter/Space·aria-selected. 섹션 진입 시 순차 등장.
 * 색은 --p2 파생 마젠타 스케일(데이터 시각화 포인트). reduced-motion 시 즉시 표시.
 */
const CX = 170;
const CY = 170;
const RO = 150;
const RI = 86;

/** 좌표를 2자리로 반올림 — Math.sin/cos의 서버(Node)·클라(V8) 말단 오차로 인한
 *  하이드레이션 불일치(<text y> 등) 방지. 340px SVG에서 시각 차이 없음. */
const round2 = (n: number): number => Math.round(n * 100) / 100;
const pol = (r: number, a: number): [number, number] => {
  const t = ((a - 90) * Math.PI) / 180;
  return [round2(CX + r * Math.cos(t)), round2(CY + r * Math.sin(t))];
};
const segPath = (rO: number, rI: number, a0: number, a1: number) => {
  const p0 = pol(rO, a0);
  const p1 = pol(rO, a1);
  const p2 = pol(rI, a1);
  const p3 = pol(rI, a0);
  const lg = a1 - a0 > 180 ? 1 : 0;
  return `M${p0[0]} ${p0[1]}A${rO} ${rO} 0 ${lg} 1 ${p1[0]} ${p1[1]}L${p2[0]} ${p2[1]}A${rI} ${rI} 0 ${lg} 0 ${p3[0]} ${p3[1]}Z`;
};

export default function LeadershipWheel() {
  const segs = useMemo(
    () =>
      WHEEL_TRACKS.map((_, i) => {
        const a0 = i * 60 + 1;
        const a1 = (i + 1) * 60 - 1;
        const mid = i * 60 + 30;
        const labelPos = pol((RO + RI) / 2, mid);
        const hoverPos = pol(9, mid);
        return {
          d: segPath(RO, RI, a0, a1),
          labelPos,
          dx: hoverPos[0] - CX,
          dy: hoverPos[1] - CY,
        };
      }),
    [],
  );

  const [active, setActive] = useState<number | null>(null);
  const [hover, setHover] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);
  const [reduce, setReduce] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(mq.matches);
    const el = rootRef.current;
    if (!el) return;
    if (mq.matches) {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const cur = active != null ? WHEEL_TRACKS[active] : null;
  const centerTop = cur ? cur.nm : "Leadership";
  const centerBot = cur ? cur.ko : "6 tracks";

  return (
    <Section id="framework" surface pillar>
      <SectionHeader
        reveal
        eyebrow={FRAMEWORK_INTRO.eyebrow}
        title={FRAMEWORK_INTRO.title}
        sub={FRAMEWORK_INTRO.lead}
      />
      <div className="lw-wrap r" ref={rootRef}>
        <svg
          className="lw-svg"
          viewBox="0 0 340 340"
          role="img"
          aria-label="리더십 6대 역량 휠"
        >
          {segs.map((s, i) => {
            const isActive = active === i;
            const isHover = hover === i;
            const tf =
              isHover && !reduce ? `translate(${s.dx}px, ${s.dy}px)` : "none";
            return (
              <g
                key={i}
                className="lw-seg"
                role="button"
                tabIndex={0}
                aria-label={`${WHEEL_TRACKS[i].ko} ${WHEEL_TRACKS[i].t}`}
                aria-selected={isActive}
                style={{
                  opacity: visible ? 1 : 0,
                  transform: tf,
                  transitionDelay:
                    visible && !reduce ? `${140 + i * 110}ms` : "0ms",
                }}
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
                onClick={() => setActive(i)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActive(i);
                  }
                }}
              >
                <path d={s.d} fill={WHEEL_PALETTE[i]} />
                <text
                  x={s.labelPos[0]}
                  y={s.labelPos[1] + 4}
                  textAnchor="middle"
                  fill={WHEEL_TEXT[i]}
                  fontSize="13"
                  fontWeight="700"
                >
                  {WHEEL_TRACKS[i].nm}
                </text>
              </g>
            );
          })}
          {/* 중앙 코어 */}
          <circle
            cx={CX}
            cy={CY}
            r={RI - 8}
            fill="#fff"
            stroke="var(--line)"
            strokeWidth="1"
          />
          <text
            x={CX}
            y={CY - 3}
            textAnchor="middle"
            fontSize="15"
            fontWeight="800"
            fill="var(--ink)"
          >
            {centerTop}
          </text>
          <text
            x={CX}
            y={CY + 16}
            textAnchor="middle"
            fontSize="12"
            fill="var(--muted)"
          >
            {centerBot}
          </text>
        </svg>

        <div className="lw-detail" aria-live="polite">
          <div className="wd-hint">
            {cur ? cur.k : FRAMEWORK_INTRO.defaults.hint}
          </div>
          <div className="wd-name">
            {cur ? `${cur.ko} · ${cur.t}` : FRAMEWORK_INTRO.defaults.name}
          </div>
          <div className="wd-desc">
            {cur ? cur.d : FRAMEWORK_INTRO.defaults.desc}
          </div>
          <div className="wd-caps">
            {cur?.a.map((c) => (
              <span
                key={c}
                style={{
                  background: `${WHEEL_PALETTE[active!]}22`,
                  color: WHEEL_PALETTE[active!],
                }}
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
