"use client";

/**
 * 홈 (/) — keess_home_C_v18_최종확정 근거. 중립 베이스(틴트 없음).
 * 섹션 순서·카피·수치는 원본 그대로. 이미지는 원본 Unsplash 플레이스홀더.
 */
import "@/styles/home.css";
import { useReveal } from "@/lib/useReveal";
import Nav from "@/components/common/Nav";
import Footer from "@/components/common/Footer";
import ToTop from "@/components/common/ToTop";
import PageDots from "@/components/common/PageDots";
import HeroCarousel from "@/components/common/HeroCarousel";
import PillarCard from "@/components/common/PillarCard";
import MetricStat from "@/components/common/MetricStat";
import Card from "@/components/common/Card";
import Button from "@/components/common/Button";
import ContactForm from "@/components/common/ContactForm";
import HomeFaq from "@/components/sections/home/HomeFaq";
import {
  HERO_SLIDES,
  INTRO,
  PILLARS,
  STATS,
  MANIFESTO,
  REFERENCES,
  CERTS,
  INQUIRY_SIDE,
} from "@/data/home";

const DOTS = [
  { anchor: "#p1", label: "AX·AI" },
  { anchor: "#p2", label: "리더십" },
  { anchor: "#p3", label: "HRD 통합" },
  { anchor: "#p4", label: "콘텐츠" },
];

export default function HomePage() {
  const scope = useReveal<HTMLDivElement>();

  return (
    <div ref={scope}>
      <Nav linkMode="route" />
      <PageDots dots={DOTS} accent="#2E1A6B" />

      <HeroCarousel slides={HERO_SLIDES} />

      {/* 인트로 — 교육체계 */}
      <section className="section intro">
        <div className="wrap">
          <p className="eyebrow r" style={{ marginBottom: 22 }}>
            {INTRO.eyebrow}
          </p>
          <p className="lead r">{INTRO.lead}</p>
          <p className="leadsub r">{INTRO.leadsub}</p>
          <div className="midrule" />
        </div>
      </section>

      {/* 4대 필러 */}
      {PILLARS.map((p) => (
        <PillarCard key={p.id} {...p} />
      ))}

      {/* 성과 지표 */}
      <section className="section stats">
        <div className="wrap">
          <div className="stats-grid">
            {STATS.map((s) => (
              <MetricStat
                key={s.label}
                value={s.value}
                suffix={s.suffix}
                label={s.label}
                pct={s.pct}
                accent={s.accent}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 매니페스토 */}
      <section className="manifesto" id="manifesto">
        <div className="man-bg" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="man-img"
          src={MANIFESTO.image}
          alt=""
          loading="lazy"
          decoding="async"
        />
        <div className="man-scrim" />
        <div className="wrap">
          <h2>{MANIFESTO.heading}</h2>
        </div>
      </section>

      {/* References */}
      <section className="section">
        <div className="wrap">
          <p className="eyebrow r">{REFERENCES.eyebrow}</p>
          <h2 className="sec-title r" style={{ marginTop: 12 }}>
            {REFERENCES.title}
          </h2>
          {REFERENCES.blocks.map((b) => (
            <div className="ref-block r" key={b.label}>
              <p className="ref-label">{b.label}</p>
              <div className="ref-grid stagger">
                {b.items.map((it) => (
                  <Card
                    key={it.org}
                    variant="ref"
                    org={it.org}
                    role={it.role}
                  />
                ))}
              </div>
            </div>
          ))}
          <p className="ref-cap r">{REFERENCES.caption}</p>
        </div>
      </section>

      {/* 정부지원·인증 */}
      <section className="section" id="cert" style={{ background: "var(--surface)" }}>
        <div className="wrap">
          <p className="eyebrow r">{CERTS.eyebrow}</p>
          <h2 className="sec-title r" style={{ marginTop: 12 }}>
            {CERTS.title}
          </h2>
          <div className="cert-grid stagger">
            {CERTS.items.map((c) => (
              <Card key={c.title} variant="cert" title={c.title} small={c.small} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <HomeFaq />

      {/* 문의 */}
      <section className="section inq" id="inq">
        <div className="wrap">
          <div className="inq-grid">
            <div className="inq-side r">
              <div>
                <p className="lead">{INQUIRY_SIDE.lead}</p>
                <p className="leadsub">{INQUIRY_SIDE.leadsub}</p>
              </div>
              <div className="trust">
                {INQUIRY_SIDE.trust.map((t, i) => (
                  <span key={i}>
                    {i > 0 && <span aria-hidden="true">·&nbsp;</span>}
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="r">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <ToTop />
    </div>
  );
}
