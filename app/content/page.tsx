"use client";

/**
 * P4 콘텐츠 솔루션 (/content) — 홈 디자인 시스템으로 시안(A안 4-Axis v3.0) 재현.
 * 웜 틴트(.tint-p4), 필러 폭 --maxw:1180. 시안 CSS·색토큰·버튼변형은 이식하지 않음.
 * 4축맵/탐색기 카테고리/법정 타임라인은 --p4 파생 웜 스케일(데이터 시각화 포인트).
 */
import { type CSSProperties, useState } from "react";
import "@/styles/content.css";
import { useReveal } from "@/lib/useReveal";
import Nav from "@/components/common/Nav";
import SubNav from "@/components/common/SubNav";
import Footer from "@/components/common/Footer";
import ToTop from "@/components/common/ToTop";
import Button from "@/components/common/Button";
import Section from "@/components/common/Section";
import HeroContent from "@/components/sections/content/HeroContent";
import AxisHave from "@/components/sections/content/AxisHave";
import AxisLegal from "@/components/sections/content/AxisLegal";
import AxisMake from "@/components/sections/content/AxisMake";
import AxisNetwork from "@/components/sections/content/AxisNetwork";
import ContentConsultModal from "@/components/sections/content/ContentConsultModal";
import { SUBNAV_ITEMS, FINAL } from "@/data/content";

export default function ContentPage() {
  const scope = useReveal<HTMLDivElement>();
  const [consult, setConsult] = useState<{ open: boolean; axis?: string }>({
    open: false,
  });
  const openConsult = (axis?: string) => setConsult({ open: true, axis });

  return (
    <div
      className="tint-p4"
      ref={scope}
      style={{ ["--maxw" as string]: "1180px" } as CSSProperties}
    >
      <Nav
        linkMode="route"
        current="content"
        solidByDefault
        onCtaClick={() => openConsult()}
      />
      <SubNav items={SUBNAV_ITEMS} accent="var(--p4)" />

      <HeroContent onConsult={() => openConsult()} />
      <AxisHave />
      <AxisLegal />
      <AxisMake onConsult={(axis) => openConsult(axis)} />
      <AxisNetwork />

      {/* FINAL 전환 */}
      <Section pillar>
        <div className="ct-final r">
          <h2>{FINAL.title}</h2>
          <p>{FINAL.desc}</p>
          <div className="fbtns">
            <Button variant="ink" onClick={() => openConsult()}>
              {FINAL.cta}
            </Button>
            <Button variant="glass" href="#axis-have">
              {FINAL.back}
            </Button>
          </div>
        </div>
      </Section>

      <Footer />
      <ToTop />

      <ContentConsultModal
        open={consult.open}
        axis={consult.axis}
        onClose={() => setConsult((c) => ({ ...c, open: false }))}
      />
    </div>
  );
}
