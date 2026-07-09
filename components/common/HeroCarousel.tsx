"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

/**
 * HeroCarousel (Design.md §5) — 홈 히어로 다중 메시지(5슬라이드).
 * 원본 .hero / .hero-slide / .hs-x / .hero-indicator 구조·Ken Burns 이식.
 * 자동+수동(이전/다음/도트), 재생·일시정지, 진행 라인.
 * a11y: aria-roledescription="carousel", 슬라이드 aria-hidden, 컨트롤 라벨.
 * prefers-reduced-motion: 자동재생·Ken Burns 비활성.
 */
export type HeroTheme = "brand" | "event" | "new" | "gov" | "case";

export type HeroSlide = {
  theme: HeroTheme;
  image?: string;
  tag?: string; // "EVENT · 예시"
  eyebrow: string;
  title: ReactNode;
  sub: ReactNode;
  cta: { label: string; target: string };
};

type HeroCarouselProps = {
  slides: HeroSlide[];
  /** 자동 전환 간격(ms) */
  interval?: number;
  /** CTA 클릭 핸들러(target 전달). 미지정 시 앵커 <a> */
  onCtaClick?: (target: string) => void;
};

export default function HeroCarousel({
  slides,
  interval = 6000,
  onCtaClick,
}: HeroCarouselProps) {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [reduce, setReduce] = useState(false);
  const timer = useRef<number | null>(null);
  const lineRef = useRef<HTMLSpanElement>(null);
  const n = slides.length;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(mq.matches);
    if (mq.matches) setPlaying(false);
  }, []);

  const go = useCallback(
    (i: number) => setActive(((i % n) + n) % n),
    [n],
  );
  const next = useCallback(() => go(active + 1), [active, go]);
  const prev = useCallback(() => go(active - 1), [active, go]);

  // 자동 전환 + 진행 라인
  useEffect(() => {
    if (!playing || reduce || n <= 1) return;
    // 진행 라인 리셋 → 채움
    const line = lineRef.current;
    if (line) {
      line.style.transition = "none";
      line.style.width = "0%";
      // 강제 리플로우 후 채움
      void line.offsetWidth;
      line.style.transition = `width ${interval}ms linear`;
      line.style.width = "100%";
    }
    timer.current = window.setTimeout(next, interval);
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, [active, playing, reduce, interval, n, next]);

  const cur = String(active + 1).padStart(2, "0");
  const tot = String(n).padStart(2, "0");

  return (
    <section
      className="hero"
      id="hero"
      aria-roledescription="carousel"
      aria-label="주요 소식"
    >
      <div className="hero-track">
        {slides.map((s, i) => (
          <div
            key={i}
            className={`hero-slide${i === active ? " active" : ""}`}
            data-theme={s.theme}
            aria-hidden={i !== active}
          >
            <div className="hs-bg" />
            {s.image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                className="hs-img"
                src={s.image}
                alt=""
                loading={i === 0 ? "eager" : "lazy"}
                decoding="async"
              />
            )}
            <div className="hs-scrim" />
            <div className="wrap">
              <div className="hs-content">
                {s.tag && <div className="hs-tag">{s.tag}</div>}
                <p className="eyebrow">{s.eyebrow}</p>
                <h1>{s.title}</h1>
                <p className="sub">{s.sub}</p>
                <div className="actions">
                  {onCtaClick ? (
                    <button
                      className="btn btn-ink"
                      onClick={() => onCtaClick(s.cta.target)}
                    >
                      {s.cta.label}
                    </button>
                  ) : (
                    <a className="btn btn-ink" href={s.cta.target}>
                      {s.cta.label}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="hero-indicator">
        <div className="wrap">
          <div className="hero-ind-inner">
            <button
              className="hero-arrow prev"
              type="button"
              aria-label="이전 슬라이드"
              onClick={prev}
            >
              &#8249;
            </button>
            <button
              className="hero-arrow next"
              type="button"
              aria-label="다음 슬라이드"
              onClick={next}
            >
              &#8250;
            </button>
            <div className="hero-count">
              <span className="cur">{cur}</span>
              <div className="hero-line">
                <span ref={lineRef} />
              </div>
              <span className="tot">{tot}</span>
            </div>
            <button
              className="hero-play"
              type="button"
              aria-label={playing ? "일시정지" : "재생"}
              aria-pressed={!playing}
              onClick={() => setPlaying((v) => !v)}
            >
              {playing ? "❙❙" : "▶"}
            </button>
          </div>
        </div>
      </div>

      <div className="scrolldown">
        SCROLL
        <div className="bar" />
      </div>
    </section>
  );
}
