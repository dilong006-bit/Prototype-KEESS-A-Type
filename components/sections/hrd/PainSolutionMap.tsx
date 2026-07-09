import Section from "@/components/common/Section";
import SectionHeader from "@/components/common/SectionHeader";
import { PAIN } from "@/data/hrd";

/** #pain — 고충→해결 매핑 4행(pain | → | solution). 홈 카드 언어. */
export default function PainSolutionMap() {
  return (
    <Section id="pain" pillar>
      <SectionHeader reveal eyebrow={PAIN.eyebrow} title={PAIN.title} />
      <div className="ps-list r">
        {PAIN.rows.map((row, i) => (
          <div className="ps-row" key={i}>
            <div className="ps-pain">{row.pain}</div>
            <div className="ps-arr" aria-hidden="true">
              →
            </div>
            <div className="ps-sol">
              <b>{row.solutionTitle}</b>
              <span>{row.solutionDesc}</span>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
