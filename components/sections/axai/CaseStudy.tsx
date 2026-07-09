import Section from "@/components/common/Section";
import SectionHeader from "@/components/common/SectionHeader";
import { CASE_INTRO, CASES } from "@/data/axai";

/** 도입 사례 — 3 카드 + 메타. 홈 카드 언어. */
export default function CaseStudy() {
  return (
    <Section pillar>
      <SectionHeader reveal eyebrow={CASE_INTRO.eyebrow} title={CASE_INTRO.title} />
      <div className="ax-case-grid stagger">
        {CASES.map((c) => (
          <div className="ax-case" key={c.title}>
            <div className="ax-thumb ct">
              <span className="badge">{c.badge}</span>
            </div>
            <div className="cb">
              <h4>{c.title}</h4>
              <div className="meta">
                {c.meta.map((m, i) => (
                  <div key={i}>
                    <div className="mv">{m.value}</div>
                    <div className="ml">{m.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <p className="ax-cap r">{CASE_INTRO.caption}</p>
    </Section>
  );
}
