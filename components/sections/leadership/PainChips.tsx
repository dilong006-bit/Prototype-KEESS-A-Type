import Section from "@/components/common/Section";
import SectionHeader from "@/components/common/SectionHeader";
import { PAIN } from "@/data/leadership";

/** #pain — 리더십 고민 4칩. 홈 카드 언어(+ --p2 포인트). */
export default function PainChips() {
  return (
    <Section id="pain" pillar>
      <SectionHeader
        reveal
        eyebrow={PAIN.eyebrow}
        title={PAIN.title}
        sub={PAIN.lead}
      />
      <div className="lead-pain stagger">
        {PAIN.chips.map((c, i) => (
          <div className="pain-chip" key={i}>
            {c}
          </div>
        ))}
      </div>
    </Section>
  );
}
