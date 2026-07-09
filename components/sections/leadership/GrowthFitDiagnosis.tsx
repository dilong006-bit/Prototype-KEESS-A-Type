import Section from "@/components/common/Section";
import SectionHeader from "@/components/common/SectionHeader";
import { GROWTHFIT } from "@/data/leadership";

/** #growthfit — 조직경험진단 6 Core Dimensions. TBD 표기 보존. */
export default function GrowthFitDiagnosis() {
  return (
    <Section id="growthfit" surface pillar>
      <SectionHeader reveal eyebrow={GROWTHFIT.eyebrow} title={GROWTHFIT.title} />
      <div className="gf r">
        <span className="tbd">{GROWTHFIT.tbd}</span>
        <h3>{GROWTHFIT.subtitle}</h3>
        <p>{GROWTHFIT.desc}</p>
        <div className="gf-dims">
          {GROWTHFIT.dims.map((d) => (
            <div className="gdim" key={d.en}>
              <div className="gv">{d.en}</div>
              <div className="gl">{d.ko}</div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
