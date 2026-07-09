import Section from "@/components/common/Section";
import SectionHeader from "@/components/common/SectionHeader";
import { WHY_INTRO, WHY_HEAD, WHY_ROWS } from "@/data/axai";

/** #why — 일반 AI 교육 vs KG에듀원 AX 비교표. 홈 토큰. */
export default function WhyTable() {
  return (
    <Section id="why" surface pillar>
      <SectionHeader reveal eyebrow={WHY_INTRO.eyebrow} title={WHY_INTRO.title} />
      <div className="ax-vs r">
        <div className="ax-vs-row ax-vs-head">
          <div className="ax-vs-cell crit">{WHY_HEAD.crit}</div>
          <div className="ax-vs-cell other">{WHY_HEAD.other}</div>
          <div className="ax-vs-cell kg">{WHY_HEAD.kg}</div>
        </div>
        {WHY_ROWS.map((r) => (
          <div className="ax-vs-row" key={r.crit}>
            <div className="ax-vs-cell crit">{r.crit}</div>
            <div className="ax-vs-cell other">{r.other}</div>
            <div className="ax-vs-cell kg">{r.kg}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}
