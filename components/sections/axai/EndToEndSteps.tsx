import Section from "@/components/common/Section";
import SectionHeader from "@/components/common/SectionHeader";
import { SERVICE_INTRO, STEPS } from "@/data/axai";

/** #service — End-to-End 5 Step + 산출물. 홈 카드 언어. */
export default function EndToEndSteps() {
  return (
    <Section id="service" pillar>
      <div className="center" style={{ textAlign: "center" }}>
        <SectionHeader
          reveal
          eyebrow={SERVICE_INTRO.eyebrow}
          title={SERVICE_INTRO.title}
          sub={
            <span style={{ marginLeft: "auto", marginRight: "auto", display: "block" }}>
              {SERVICE_INTRO.sub}
            </span>
          }
        />
      </div>
      <div className="ax-steps stagger">
        {STEPS.map((s) => (
          <div className="ax-s5" key={s.no}>
            <div className="sk">STEP {s.no}</div>
            <div className="sn">{s.no}</div>
            <h4>{s.title}</h4>
            <ul>
              {s.items.map((it) => (
                <li key={it}>{it}</li>
              ))}
            </ul>
            <div className="deliver">
              <div className="dl">주요 산출물</div>
              {s.output.map((o) => (
                <span className="dchip" key={o}>
                  {o}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
