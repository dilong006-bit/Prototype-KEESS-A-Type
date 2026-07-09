import Section from "@/components/common/Section";
import { AXIS_NET } from "@/data/content";

/** #axis-net(04 NETWORK) — 협력사 로고 + 수급 이원화 + counter. */
export default function AxisNetwork() {
  const a = AXIS_NET;
  return (
    <Section id="axis-net" pillar>
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

      <div className="substep">{a.contentLabel}</div>
      <div className="plogos stagger">
        {a.partnersContent.map((p) => (
          <div className="plogo" key={p}>
            {p}
          </div>
        ))}
      </div>
      <div className="substep">{a.langLabel}</div>
      <div className="plogos stagger">
        {a.partnersLang.map((p) => (
          <div className="plogo lang" key={p}>
            {p}
          </div>
        ))}
      </div>

      <div className="substep">{a.dualLabel}</div>
      <div className="dualflow r">
        <div className="flowbox self">
          <div className="h">{a.dual.self.h}</div>
          <div className="s">{a.dual.self.s}</div>
        </div>
        <div className="flowmid">
          <div className="plus">+</div>
          {a.dual.mid}
        </div>
        <div className="flowbox part">
          <div className="h">{a.dual.part.h}</div>
          <div className="s">{a.dual.part.s}</div>
        </div>
      </div>
      <div className="counter r">
        <b>{a.counter.value}</b>
        <span>{a.counter.label}</span>
      </div>
    </Section>
  );
}
