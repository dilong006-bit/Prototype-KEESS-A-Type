import Section from "@/components/common/Section";
import { AXIS_LEGAL } from "@/data/content";

/** #axis-legal(02 COMPLIANCE) — 연도 타임라인 + 법정 5카드 + 그룹바 + 차별화표. */
export default function AxisLegal() {
  const a = AXIS_LEGAL;
  return (
    <Section id="axis-legal" surface pillar>
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

      <div className="substep law">{a.seriesLabel}</div>
      <div className="timeline stagger">
        {a.series.map((s) => (
          <div className={`tnode${s.current ? " cur" : ""}`} key={s.year}>
            <div className="yr">{s.year}</div>
            <div className="nm">{s.name}</div>
            <div className="cc">{s.concept}</div>
            {s.current && <div className="badge-now">현재 시리즈</div>}
          </div>
        ))}
      </div>

      <div className="substep law">{a.lawLabel}</div>
      <div className="lawgrid stagger">
        {a.lawCards.map((c) => (
          <div className="lawcard" key={c.title}>
            <span className="must">의무</span>
            <h3>{c.title}</h3>
            <div className="frow">
              <dt>근거</dt>
              <dd>{c.basis}</dd>
            </div>
            <div className="frow">
              <dt>대상</dt>
              <dd>{c.target}</dd>
            </div>
            <div className="frow">
              <dt>주기</dt>
              <dd>{c.cycle}</dd>
            </div>
          </div>
        ))}
      </div>
      <div className="groupbar r">
        {a.groups.map((g) => (
          <span key={g}>{g}</span>
        ))}
      </div>

      <div className="substep law">{a.diffLabel}</div>
      <div className="difftable r">
        <table>
          <thead>
            <tr>
              {a.diffHead.map((h) => (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {a.diffRows.map((row) => (
              <tr key={row[0]}>
                {row.map((cell, i) => (
                  <td key={i}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="samplenote r">{a.note}</p>
    </Section>
  );
}
