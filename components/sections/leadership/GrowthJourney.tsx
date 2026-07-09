import Section from "@/components/common/Section";
import SectionHeader from "@/components/common/SectionHeader";
import { JOURNEY } from "@/data/leadership";

/** #journey — 6단계 성장 타임라인 + Architecture 5스텝. 홈 토큰. */
export default function GrowthJourney() {
  return (
    <Section id="journey" surface pillar>
      <SectionHeader
        reveal
        eyebrow={JOURNEY.eyebrow}
        title={JOURNEY.title}
        sub={JOURNEY.lead}
        subMaxWidth="none"
        subNowrap
      />

      <div className="lj r">
        <div className="lj-rail" />
        <div className="lj-steps">
          {JOURNEY.steps.map((s) => (
            <div className="lj-step" key={s.no}>
              <div className="lj-num">{s.no}</div>
              <div className="lj-stage">{s.stage}</div>
              <div className="lj-role">{s.role}</div>
              <div className="lj-tags">
                {s.tags.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="eyebrow r" style={{ marginTop: 52 }}>
        {JOURNEY.archEyebrow}
      </p>
      <h3
        className="r"
        style={{ fontSize: 20, fontWeight: 800, marginTop: 8 }}
      >
        {JOURNEY.archTitle}
      </h3>
      <div className="lj-arch stagger">
        {JOURNEY.arch.map((a) => (
          <div className="lj-acard" key={a.no}>
            <div className="an">{a.no}</div>
            <div className="at">{a.title}</div>
            <div className="ad">{a.desc}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}
