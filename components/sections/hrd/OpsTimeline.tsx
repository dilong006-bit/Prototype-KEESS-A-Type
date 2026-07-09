import Section from "@/components/common/Section";
import SectionHeader from "@/components/common/SectionHeader";
import { OPS } from "@/data/hrd";

/** #ops(B3-2) — HOW 7축 가로 타임라인(모바일 가로 스크롤). */
export default function OpsTimeline() {
  return (
    <Section id="ops" surface pillar>
      <SectionHeader
        reveal
        eyebrow={OPS.eyebrow}
        title={OPS.title}
        sub={OPS.lead}
      />
      <div className="how-tl r">
        {OPS.steps.map((s) => (
          <div className="htl-step" key={s.no}>
            <span className="htl-n">{s.no}</span>
            <b>{s.title}</b>
            <p>{s.desc}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
