import Link from "next/link";
import Section from "@/components/common/Section";
import Button from "@/components/common/Button";
import { GOV } from "@/data/hrd";

/**
 * #gov — 정부지원(재직자훈련) 환급. SPEC_P3_v2.0 기준을 홈 언어로 재구성.
 * 색 포인트는 기존 --gov 토큰만(eyebrow·강조카드 border·step 넘버·CTA 버튼).
 * gov CTA → onInquiry(#inq 스크롤). 크로스링크 → P4(/content).
 */
export default function GovSupport({ onInquiry }: { onInquiry: () => void }) {
  return (
    <Section id="gov" pillar>
      <p className="eyebrow r gov-eyebrow">{GOV.eyebrow}</p>
      <h2 className="sec-title r" style={{ marginTop: 12 }}>
        {GOV.title}
      </h2>
      <p
        className="r"
        style={{
          marginTop: 16,
          fontSize: 16,
          color: "var(--muted)",
          maxWidth: "62ch",
          lineHeight: 1.7,
        }}
      >
        {GOV.lead}
      </p>

      <div className="gov-grid stagger">
        {GOV.cards.map((c) => (
          <div className={`gov-card${c.highlight ? " hi" : ""}`} key={c.eyebrow}>
            <div className="gc-eyebrow">{c.eyebrow}</div>
            <h3>{c.title}</h3>
            <p>{c.desc}</p>
          </div>
        ))}
      </div>

      <h3 className="gov-proc-h r">{GOV.procTitle}</h3>
      <div className="gov-proc stagger">
        {GOV.proc.map((s) => (
          <div className="gov-pstep" key={s.no}>
            <span className="gn">{s.no}</span>
            <b>{s.title}</b>
            <p>{s.desc}</p>
          </div>
        ))}
      </div>

      <div className="gov-cta r">
        <div className="gov-cta-t">
          <b>{GOV.ctaTitle}</b>
          <span>{GOV.ctaSub}</span>
        </div>
        <div className="gov-cta-a">
          <Link className="gov-cross" href={GOV.crossLink.href}>
            {GOV.crossLink.label} →
          </Link>
          <Button variant="ink" onClick={onInquiry}>
            {GOV.cta}
          </Button>
        </div>
      </div>

      <p className="gov-note r">{GOV.note}</p>
    </Section>
  );
}
