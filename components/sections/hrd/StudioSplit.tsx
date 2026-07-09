import Section from "@/components/common/Section";
import SectionHeader from "@/components/common/SectionHeader";
import { STUDIO } from "@/data/hrd";

/** #studio(B3-3) — 자체 스튜디오 실사 split + 5항목. KG 핵심 특장점. */
export default function StudioSplit() {
  return (
    <Section id="studio" pillar>
      <SectionHeader
        reveal
        eyebrow={
          <>
            {STUDIO.eyebrow}{" "}
            <span style={{ color: "var(--p3)", fontWeight: 800 }}>
              {STUDIO.eyebrowStar}
            </span>
          </>
        }
        title={STUDIO.title}
        sub={STUDIO.lead}
      />
      <div className="st-split r">
        <div className="st-visual">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={STUDIO.image}
            alt=""
            loading="lazy"
            decoding="async"
          />
          <div className="st-scrim" />
          <div className="st-badge">{STUDIO.badge}</div>
        </div>
        <div className="st-body">
          {STUDIO.items.map((it) => (
            <div className="st-item" key={it.title}>
              <b>{it.title}</b>
              <span>{it.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
