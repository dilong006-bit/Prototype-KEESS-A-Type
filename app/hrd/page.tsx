"use client";

/**
 * P3 HRD 통합 솔루션 (/hrd) — 홈 디자인 시스템으로 시안 구성을 재현 + 정부지원(#gov) 추가.
 * 바이올렛 틴트(.tint-p3), 필러 폭 --maxw:1180. 시안 CSS·색토큰·버튼변형은 이식하지 않음.
 * KGESA/타임라인은 --p3 파생 스케일, 정부지원은 기존 --gov 토큰 포인트.
 */
import { type CSSProperties, useState } from "react";
import "@/styles/hrd.css";
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
import PainSolutionMap from "@/components/sections/hrd/PainSolutionMap";
import SolutionAxes from "@/components/sections/hrd/SolutionAxes";
import SystemMockup from "@/components/sections/hrd/SystemMockup";
import OpsTimeline from "@/components/sections/hrd/OpsTimeline";
import StudioSplit from "@/components/sections/hrd/StudioSplit";
import ClientCases from "@/components/sections/hrd/ClientCases";
import KgesaDemo from "@/components/sections/hrd/KgesaDemo";
import ProcessFlow from "@/components/sections/hrd/ProcessFlow";
import GovSupport from "@/components/sections/hrd/GovSupport";
import { SUBNAV_ITEMS, INQUIRY, LEAD_MODAL, HERO } from "@/data/hrd";

export default function HrdPage() {
  const scope = useReveal<HTMLDivElement>();
  const [modalOpen, setModalOpen] = useState(false);

  const goInquiry = () => {
    const el = document.getElementById("inq");
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  };

  return (
    <div
      className="tint-p3"
      ref={scope}
      style={{ ["--maxw" as string]: "1180px" } as CSSProperties}
    >
      <Nav
        linkMode="route"
        current="hrd"
        solidByDefault
        onCtaClick={() => setModalOpen(true)}
      />
      <SubNav items={SUBNAV_ITEMS} accent="var(--p3)" />

      <PillarHero
        data={HERO}
        secondaryLabel="3축 솔루션 보기"
        secondaryTargetId="solution"
        visualAriaLabel="HRD 통합 솔루션 비주얼"
        onInquiry={() => setModalOpen(true)}
      />
      <PainSolutionMap />
      <SolutionAxes />
      <SystemMockup />
      <OpsTimeline />
      <StudioSplit />
      <ClientCases />
      <KgesaDemo />
      <ProcessFlow />
      <GovSupport onInquiry={goInquiry} />

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
            <ContactForm
              defaultInterests={[INQUIRY.defaultInterest]}
              extraInterests={[INQUIRY.extraInterest]}
            />
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
        <p style={{ color: "var(--muted)", lineHeight: 1.7 }}>{LEAD_MODAL.desc}</p>
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
