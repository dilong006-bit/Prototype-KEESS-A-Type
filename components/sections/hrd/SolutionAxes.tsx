import Section from "@/components/common/Section";
import SectionHeader from "@/components/common/SectionHeader";
import { SOLUTION } from "@/data/hrd";

/** #solution — 3축 풀스택 카드(제작 축 강조). */
export default function SolutionAxes() {
  return (
    <Section id="solution" surface pillar>
      <SectionHeader
        reveal
        eyebrow={SOLUTION.eyebrow}
        title={SOLUTION.title}
        sub={SOLUTION.lead}
      />
      <div className="pick-grid stagger">
        {SOLUTION.axes.map((a) => (
          <div className={`pick${a.highlight ? " hi" : ""}`} key={a.kind}>
            <div className="pk-ic">{a.kind}</div>
            <h3>{a.title}</h3>
            <p>{a.desc}</p>
            <span className="pk-tag">{a.tag}</span>
          </div>
        ))}
      </div>
      <p className="pick-note r">{SOLUTION.note}</p>
    </Section>
  );
}
