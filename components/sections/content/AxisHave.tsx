import Section from "@/components/common/Section";
import { AXIS_HAVE } from "@/data/content";
import CourseExplorer from "./CourseExplorer";

/** #axis-have(01 LIBRARY) — 스케일 스트립 + 7체계 matrix + 탐색기. */
export default function AxisHave() {
  const a = AXIS_HAVE;
  return (
    <Section id="axis-have" pillar>
      <div className="axhead r">
        <div>
          <span className="eyebrow">
            <span className="no">{a.eyebrowNo}</span> {a.eyebrow}
          </span>
          <h2>{a.title}</h2>
          <p className="lead">{a.lead}</p>
        </div>
        <span className="axtag">{a.axtag}</span>
      </div>

      <div className="scalestrip r">
        <div>
          <div className="tot">
            {a.scale.total}
            <span>개</span>
          </div>
          <div className="totlab">{a.scale.totalLabel}</div>
        </div>
        <div className="chs">
          {a.scale.chips.map((c) => (
            <div className="ch" key={c.label}>
              <b>{c.value}</b>
              <span>{c.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="substep">{a.systemsLabel}</div>
      <div className="matrix stagger">
        {a.systems.map((s) => (
          <div className={`syscard${s.law ? " law" : ""}`} key={s.no}>
            <div className="no">{s.no}</div>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
          </div>
        ))}
      </div>

      <div className="substep">{a.explorerLabel}</div>
      <CourseExplorer />
    </Section>
  );
}
