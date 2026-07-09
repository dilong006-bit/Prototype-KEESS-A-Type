import { Fragment } from "react";
import Section from "@/components/common/Section";
import SectionHeader from "@/components/common/SectionHeader";
import { PROCESS } from "@/data/hrd";

/** #process — 도입 4스텝 flow(전환 직전 안심). */
export default function ProcessFlow() {
  return (
    <Section id="process" surface pillar>
      <SectionHeader
        reveal
        eyebrow={PROCESS.eyebrow}
        title={PROCESS.title}
        sub={PROCESS.lead}
      />
      <div className="proc-flow r">
        {PROCESS.steps.map((s, i) => (
          <Fragment key={s.no}>
            {i > 0 && (
              <div className="proc-arr" aria-hidden="true">
                →
              </div>
            )}
            <div className="proc-step">
              <div className="pn">{s.no}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          </Fragment>
        ))}
      </div>
    </Section>
  );
}
