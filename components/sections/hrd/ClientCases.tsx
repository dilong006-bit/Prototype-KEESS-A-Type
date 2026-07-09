import Section from "@/components/common/Section";
import SectionHeader from "@/components/common/SectionHeader";
import { CASES } from "@/data/hrd";

/** #cases — 로고월 4 + 대표 인용 강조. */
export default function ClientCases() {
  return (
    <Section id="cases" surface pillar>
      <SectionHeader reveal eyebrow={CASES.eyebrow} title={CASES.title} />
      <div className="case-wall stagger">
        {CASES.logos.map((l) => (
          <span key={l}>{l}</span>
        ))}
      </div>
      <div className="case-hi r">
        <div className="ch-quote">{CASES.highlight.quote}</div>
        <div className="ch-meta">
          {CASES.highlight.meta}
          <span className="ch-tag">{CASES.highlight.tag}</span>
        </div>
      </div>
    </Section>
  );
}
