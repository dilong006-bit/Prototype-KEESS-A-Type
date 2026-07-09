"use client";

import { useState } from "react";
import Section from "@/components/common/Section";
import SectionHeader from "@/components/common/SectionHeader";
import { KGESA, type Widget } from "@/data/hrd";

/**
 * #kgesa(B3-4 · 하이라이트) — 차세대 시스템 인터랙티브 데모.
 * 담당자가 테마(GNB/LNB)·위젯(on·off·순서)을 조작하면 학습자 화면(FO)이 실시간 반영.
 * a11y: 테마 aria-pressed, 스위치 role=switch·aria-checked, 순서 aria-label, 키보드.
 * reduced-motion 시 블록 페이드 생략.
 */
type Theme = "gnb" | "lnb";

/** 위젯 블록 스켈레톤(FO 미리보기) */
function WidgetBlock({ id }: { id: Widget["id"] }) {
  if (id === "banner")
    return (
      <div className="kw">
        <div className="kw-banner">메인 배너</div>
      </div>
    );
  if (id === "dash")
    return (
      <div className="kw">
        <div className="kw-blk">
          <b>학습 대시보드</b>
          <div className="kw-row">
            <i />
            <i />
            <i />
          </div>
        </div>
      </div>
    );
  if (id === "courses")
    return (
      <div className="kw">
        <div className="kw-blk">
          <b>과정 리스트</b>
          <div className="kw-cards">
            <i />
            <i />
            <i />
          </div>
        </div>
      </div>
    );
  if (id === "reco")
    return (
      <div className="kw">
        <div className="kw-blk">
          <b>추천 강의</b>
          <div className="kw-cards">
            <i />
            <i />
          </div>
        </div>
      </div>
    );
  if (id === "debate")
    return (
      <div className="kw">
        <div className="kw-debate">디베이트</div>
      </div>
    );
  return null;
}

export default function KgesaDemo() {
  const [theme, setTheme] = useState<Theme>("gnb");
  const [widgets, setWidgets] = useState<Widget[]>(KGESA.widgets);
  const [fadeKey, setFadeKey] = useState(0);

  const bump = () => setFadeKey((k) => k + 1);
  const toggle = (i: number) => {
    setWidgets((ws) => ws.map((w, k) => (k === i ? { ...w, on: !w.on } : w)));
    bump();
  };
  const move = (i: number, dir: "up" | "down") => {
    const j = dir === "up" ? i - 1 : i + 1;
    if (j < 0 || j >= widgets.length) return;
    setWidgets((ws) => {
      const n = [...ws];
      [n[i], n[j]] = [n[j], n[i]];
      return n;
    });
    bump();
  };
  const pickTheme = (t: Theme) => {
    setTheme(t);
    bump();
  };

  const bodyWidgets = widgets.filter((w) => w.on && w.id !== "float");
  const floatOn = widgets.some((w) => w.id === "float" && w.on);

  const menu = KGESA.foMenu.map((m) => <span key={m}>{m}</span>);
  const blocks = (
    <>
      {bodyWidgets.map((w, i) => (
        <div
          key={w.id}
          className="kw-anim"
          style={{ animationDelay: `${i * 70}ms` }}
        >
          <WidgetBlock id={w.id} />
        </div>
      ))}
      {floatOn && (
        <div className="fo-float" aria-hidden="true">
          +
        </div>
      )}
    </>
  );

  return (
    <Section id="kgesa" pillar>
      <SectionHeader reveal eyebrow={KGESA.eyebrow} title={KGESA.title} sub={KGESA.lead} />

      <div className="kg-demo r">
        {/* FO 미리보기 */}
        <div className="kg-fo-wrap">
          <div className="kg-fo-bar">
            <span className="dot" />
            <span className="dot" />
            <span className="dot" />
            <span className="kg-url">{KGESA.foUrl}</span>
          </div>
          <div className="kg-fo" key={fadeKey}>
            {theme === "gnb" ? (
              <>
                <div className="fo-gnb">
                  <div className="fo-logo">{KGESA.foLogo}</div>
                  <div className="fo-menu">{menu}</div>
                </div>
                <div className="fo-body">{blocks}</div>
              </>
            ) : (
              <div className="fo-lnb-wrap">
                <div className="fo-lnb">
                  <div className="fo-logo">{KGESA.foLogo}</div>
                  {menu}
                </div>
                <div className="fo-body">{blocks}</div>
              </div>
            )}
          </div>
        </div>

        {/* 컨트롤 패널 */}
        <div className="kg-ctrl">
          <div className="kc-label">테마</div>
          <div className="kc-theme">
            <button
              type="button"
              className={`kc-tbtn${theme === "gnb" ? " on" : ""}`}
              aria-pressed={theme === "gnb"}
              onClick={() => pickTheme("gnb")}
            >
              GNB형 (상단 메뉴)
            </button>
            <button
              type="button"
              className={`kc-tbtn${theme === "lnb" ? " on" : ""}`}
              aria-pressed={theme === "lnb"}
              onClick={() => pickTheme("lnb")}
            >
              LNB형 (좌측 메뉴)
            </button>
          </div>

          <div className="kc-label" style={{ marginTop: 20 }}>
            위젯 구성
          </div>
          <div className="kw-list">
            {widgets.map((w, i) => (
              <div className="kw-item" key={w.id}>
                <span className="kw-name">{w.name}</span>
                <div className="kw-actions">
                  <button
                    type="button"
                    className="kw-mv"
                    aria-label={`${w.name} 위로`}
                    disabled={i === 0}
                    onClick={() => move(i, "up")}
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    className="kw-mv"
                    aria-label={`${w.name} 아래로`}
                    disabled={i === widgets.length - 1}
                    onClick={() => move(i, "down")}
                  >
                    ↓
                  </button>
                  <button
                    type="button"
                    className={`kw-sw${w.on ? " on" : ""}`}
                    role="switch"
                    aria-checked={w.on}
                    aria-label={`${w.name} 사용`}
                    onClick={() => toggle(i)}
                  />
                </div>
              </div>
            ))}
          </div>
          <p className="kc-hint">{KGESA.ctrlHint}</p>
        </div>
      </div>

      {/* AI 학습 여정 */}
      <div className="ai-journey r">
        <div className="aj-head">
          <p className="eyebrow" style={{ marginBottom: 6 }}>
            {KGESA.aiJourney.eyebrow}
          </p>
          <h3>{KGESA.aiJourney.title}</h3>
          <p className="aj-sub">{KGESA.aiJourney.sub}</p>
        </div>
        <div className="aj-flow">
          {KGESA.aiJourney.steps.map((s, i) => (
            <div key={s.phase} style={{ display: "contents" }}>
              {i > 0 && (
                <div className="aj-arr" aria-hidden="true">
                  →
                </div>
              )}
              <div className={`ajs${s.hi ? " hi" : ""}`}>
                <span className="ajt">{s.phase}</span>
                <b>{s.title}</b>
                <p>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="aj-note">{KGESA.aiJourney.note}</p>
      </div>
    </Section>
  );
}
