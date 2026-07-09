import Section from "@/components/common/Section";
import Button from "@/components/common/Button";
import { AXIS_MAKE } from "@/data/content";

/** #axis-make(03 STUDIO) — 인프라(스튜디오+파이프라인) + IP 6 + 사례 3. */
export default function AxisMake({ onConsult }: { onConsult: (axis: string) => void }) {
  const a = AXIS_MAKE;
  return (
    <Section id="axis-make" pillar>
      <div className="axhead r">
        <div>
          <span className="eyebrow">
            <span className="no">{a.eyebrowNo}</span> {a.eyebrow}
          </span>
          <h2>{a.title}</h2>
          <p className="lead">{a.lead}</p>
        </div>
        <Button variant="line-dark" onClick={() => onConsult(a.consultAxis)}>
          제작 문의
        </Button>
      </div>

      <div className="infra r">
        <div className="studiobox">
          <div className="lb">{a.infraLabel}</div>
          <div className="st">
            {a.studios.map((s) => (
              <div className="s" key={s}>
                <i />
                {s}
              </div>
            ))}
          </div>
          <div className="eq">
            {a.equipment.map((e) => (
              <span key={e}>{e}</span>
            ))}
          </div>
        </div>
        <div className="pipebox">
          <div className="lb">{a.pipelineLabel}</div>
          <div className="pipe">
            {a.pipeline.map((p) => (
              <div className="pstep" key={p.no}>
                <div className="ic">{p.no}</div>
                <div className="t">{p.title}</div>
                <div className="d">{p.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="substep">{a.ipLabel}</div>
      <div className="ipgrid stagger">
        {a.ips.map((ip) => (
          <div className="ipcard" key={ip.title}>
            <span className="ipt">{ip.title}</span>
            <p>{ip.desc}</p>
          </div>
        ))}
      </div>

      <div className="substep">{a.caseLabel}</div>
      <div className="casebar stagger">
        {a.cases.map((c) => (
          <div className="c" key={c.org}>
            <b>{c.org}</b>
            <span>{c.desc}</span>
          </div>
        ))}
      </div>
    </Section>
  );
}
