import Section from "@/components/common/Section";
import SectionHeader from "@/components/common/SectionHeader";
import { SYSTEM } from "@/data/hrd";

/** #system(B3-1) — 5특징 split + 브라우저·폰 목업 스켈레톤. */
export default function SystemMockup() {
  return (
    <Section id="system" pillar>
      <SectionHeader
        reveal
        eyebrow={SYSTEM.eyebrow}
        title={SYSTEM.title}
        sub={SYSTEM.lead}
      />
      <div className="sys-split r">
        <div className="sys-body">
          {SYSTEM.feats.map((f) => (
            <div className="sys-feat" key={f.k}>
              <span className="sfk">{f.k}</span>
              <span className="sfv">{f.v}</span>
            </div>
          ))}
        </div>
        <div className="sys-mock" aria-hidden="true">
          <div className="mk-browser">
            <div className="mk-bar">
              <span />
              <span />
              <span />
            </div>
            <div className="mk-screen">
              <div className="mk-nav" />
              <div className="mk-hero" />
              <div className="mk-cards">
                <i />
                <i />
                <i />
              </div>
            </div>
          </div>
          <div className="mk-phone">
            <div className="mk-notch" />
            <div className="mk-pbody">
              <div className="mk-pbar" />
              <div className="mk-pc" />
              <div className="mk-pc" />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
