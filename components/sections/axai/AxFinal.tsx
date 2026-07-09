"use client";

import Button from "@/components/common/Button";
import { FINAL } from "@/data/axai";

/** #inq — 최종 CTA(다크 밴드). 상담/가이드 모달 트리거. */
export default function AxFinal({
  onConsult,
  onGuide,
}: {
  onConsult: () => void;
  onGuide: () => void;
}) {
  return (
    <section className="section" id="inq">
      <div className="wrap">
        <div className="ax-final r">
          <h2>{FINAL.title}</h2>
          <p>{FINAL.desc}</p>
          <div className="act">
            <Button variant="ink" onClick={onConsult}>
              AX 진단 상담받기
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                width="17"
                height="17"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Button>
            <Button variant="glass" onClick={onGuide}>
              AX 도입 가이드 받기
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
