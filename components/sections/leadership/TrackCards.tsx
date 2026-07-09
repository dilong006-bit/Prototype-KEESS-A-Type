import Section from "@/components/common/Section";
import SectionHeader from "@/components/common/SectionHeader";
import { TRACKS_INTRO, TRACKS } from "@/data/leadership";

/** #tracks — 6개 리더십 트랙 카드. 홈 카드 언어. */
export default function TrackCards() {
  return (
    <Section id="tracks" pillar>
      <SectionHeader
        reveal
        eyebrow={TRACKS_INTRO.eyebrow}
        title={TRACKS_INTRO.title}
        sub={TRACKS_INTRO.lead}
      />
      <div className="lead-tracks stagger">
        {TRACKS.map((t) => (
          <div className="tcard" key={t.key}>
            <div className="ti">{t.initial}</div>
            <div className="tk">{t.key}</div>
            <h4>{t.name}</h4>
            <p>{t.desc}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
