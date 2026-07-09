"use client";

/**
 * P1 AX·AI 전환 (/ax-ai) — 홈 디자인 시스템으로 시안 구성을 재현.
 * 보라 틴트(.tint-p1), 필러 폭 --maxw:1180. 시안 CSS·색토큰·버튼변형은 이식하지 않음.
 */
import { type CSSProperties, useState } from "react";
import "@/styles/axai.css";
import { useReveal } from "@/lib/useReveal";
import Nav from "@/components/common/Nav";
import Footer from "@/components/common/Footer";
import ToTop from "@/components/common/ToTop";
import GuideModal from "@/components/common/GuideModal";
import ConsultModal from "@/components/common/ConsultModal";
import AxHero from "@/components/sections/axai/AxHero";
import AxOffer from "@/components/sections/axai/AxOffer";
import ScenarioSelector from "@/components/sections/axai/ScenarioSelector";
import EndToEndSteps from "@/components/sections/axai/EndToEndSteps";
import FrameworkStair from "@/components/sections/axai/FrameworkStair";
import JobMap from "@/components/sections/axai/JobMap";
import WhyTable from "@/components/sections/axai/WhyTable";
import GapEvidence from "@/components/sections/axai/GapEvidence";
import CourseLineup from "@/components/sections/axai/CourseLineup";
import CaseStudy from "@/components/sections/axai/CaseStudy";
import AxFinal from "@/components/sections/axai/AxFinal";

export default function AxAiPage() {
  const scope = useReveal<HTMLDivElement>();
  const [consultOpen, setConsultOpen] = useState(false);
  const [guideOpen, setGuideOpen] = useState(false);

  const openConsult = () => setConsultOpen(true);
  const openGuide = () => setGuideOpen(true);

  return (
    <div
      className="tint-p1"
      ref={scope}
      style={{ ["--maxw" as string]: "1180px" } as CSSProperties}
    >
      <Nav
        linkMode="route"
        current="ax-ai"
        solidByDefault
        onCtaClick={openConsult}
      />

      <AxHero onConsult={openConsult} onGuide={openGuide} />
      <AxOffer />
      <ScenarioSelector onConsult={openConsult} />
      <EndToEndSteps />
      <FrameworkStair />
      <JobMap />
      <WhyTable />
      <GapEvidence />
      <CourseLineup />
      <CaseStudy />
      <AxFinal onConsult={openConsult} onGuide={openGuide} />

      <Footer />
      <ToTop />

      <ConsultModal open={consultOpen} onClose={() => setConsultOpen(false)} />
      <GuideModal open={guideOpen} onClose={() => setGuideOpen(false)} />
    </div>
  );
}
