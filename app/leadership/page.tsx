"use client";

/**
 * P2 리더십·조직 (/leadership) — 홈 디자인 시스템으로 시안 구성을 재현.
 * 마젠타 틴트(.tint-p2), 필러 폭 --maxw:1180. 시안 CSS·색토큰·버튼변형은 이식하지 않음.
 * 휠/타임라인만 --p2 파생 마젠타 스케일(데이터 시각화 포인트).
 */
import { type CSSProperties, useState } from "react";
import "@/styles/leadership.css";
import { useReveal } from "@/lib/useReveal";
import Nav from "@/components/common/Nav";
import SubNav from "@/components/common/SubNav";
import Footer from "@/components/common/Footer";
import ToTop from "@/components/common/ToTop";
import Modal from "@/components/common/Modal";
import Button from "@/components/common/Button";
import ContactForm from "@/components/common/ContactForm";
import Section from "@/components/common/Section";
import PillarHero from "@/components/common/PillarHero";
import PainChips from "@/components/sections/leadership/PainChips";
import GrowthJourney from "@/components/sections/leadership/GrowthJourney";
import TrackCards from "@/components/sections/leadership/TrackCards";
import LeadershipWheel from "@/components/sections/leadership/LeadershipWheel";
import StageStepper from "@/components/sections/leadership/StageStepper";
import GrowthFitDiagnosis from "@/components/sections/leadership/GrowthFitDiagnosis";
import WhyLeadership from "@/components/sections/leadership/WhyLeadership";
import { SUBNAV_ITEMS, INQUIRY, LEAD_MODAL, HERO } from "@/data/leadership";

export default function LeadershipPage() {
  const scope = useReveal<HTMLDivElement>();
  const [modalOpen, setModalOpen] = useState(false);

  const goInquiry = () => {
    const el = document.getElementById("inq");
    if (!el) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  };

  return (
    <div
      className="tint-p2"
      ref={scope}
      style={{ ["--maxw" as string]: "1180px" } as CSSProperties}
    >
      <Nav
        linkMode="route"
        current="leadership"
        solidByDefault
        onCtaClick={() => setModalOpen(true)}
      />
      <SubNav items={SUBNAV_ITEMS} accent="var(--p2)" />

      <PillarHero
        data={HERO}
        secondaryLabel="리더십 체계 보기"
        secondaryTargetId="journey"
        visualAriaLabel="리더십 성장 여정 비주얼"
        onInquiry={() => setModalOpen(true)}
      />
      <PainChips />
      <GrowthJourney />
      <TrackCards />
      <LeadershipWheel />
      <StageStepper />
      <GrowthFitDiagnosis />
      <WhyLeadership />

      {/* 도입 문의 */}
      <Section id="inq" surface pillar>
        <div className="pillar-inq">
          <div className="pillar-inq-side r">
            <div>
              <h2>{INQUIRY.title}</h2>
              <p className="isub">{INQUIRY.sub}</p>
            </div>
            <div className="itrust">
              {INQUIRY.trust.map((t, i) => (
                <span key={i}>
                  {i > 0 && <span aria-hidden="true">·&nbsp;</span>}
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div className="r">
            <ContactForm defaultInterests={["리더십·조직"]} />
          </div>
        </div>
      </Section>

      <Footer />
      <ToTop />

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={LEAD_MODAL.title}
      >
        <p style={{ color: "var(--muted)", lineHeight: 1.7 }}>
          {LEAD_MODAL.desc}
        </p>
        <div style={{ marginTop: 20 }}>
          <Button
            variant="ink"
            onClick={() => {
              setModalOpen(false);
              window.setTimeout(goInquiry, 60);
            }}
          >
            {LEAD_MODAL.cta}
          </Button>
        </div>
      </Modal>
    </div>
  );
}
