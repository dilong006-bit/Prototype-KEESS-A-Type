import Section from "@/components/common/Section";
import SectionHeader from "@/components/common/SectionHeader";
import { WHY } from "@/data/leadership";

/** #why — 차별점 3카드 + 강사 통합 4스텝. TBD 표기 보존. */
export default function WhyLeadership() {
  return (
    <Section id="why" pillar>
      <SectionHeader reveal eyebrow={WHY.eyebrow} title={WHY.title} />
      <div className="lead-why stagger">
        {WHY.cards.map((c) => (
          <div className="wcard" key={c.n}>
            <div className="wn">{c.n}</div>
            <h4>{c.title}</h4>
            <p>{c.desc}</p>
          </div>
        ))}
      </div>

      <div className="fac-inline r">
        <p className="eyebrow">{WHY.facEyebrow}</p>
        <p className="fac-sub">{WHY.facSub}</p>
        <div className="fac-steps">
          {WHY.facSteps.map((s) => (
            <div className="fstep" key={s.n}>
              <span className="fsn">{s.n}</span>
              <b>{s.title}</b>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
