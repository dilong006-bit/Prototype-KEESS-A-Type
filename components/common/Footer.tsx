"use client";

import { useEffect, useRef, useState } from "react";
import {
  BRAND,
  FAMILY_SITES,
  SNS_LINKS,
  FOOTER_NOTE,
  COMPANY_INFO,
  FOOTER_COPYRIGHT,
  type SnsKind,
} from "@/data/site";
import PreventTrainingModal from "./PreventTrainingModal";
import type { PvTab } from "@/data/prevent";

/**
 * Footer (Design.md §4·§5) — 홈 canonical 이식. 다크(--ink) 배경.
 * FAMILY SITE 드롭다운(aria-expanded·바깥클릭 닫기·ESC), SNS, 회사정보, 정책줄.
 * ISMS 마크는 이미지 자산이므로 ismsMarkSrc prop으로 주입(미지정 시 생략).
 */
function SnsIcon({ kind }: { kind: SnsKind }) {
  if (kind === "instagram")
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    );
  if (kind === "facebook")
    return (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M14 9h3V5.5h-3c-2 0-3.5 1.6-3.5 3.6V11H8v3h2.5v7H14v-7h2.6l.4-3H14V9.4c0-.3.2-.4.5-.4z" />
      </svg>
    );
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 4h11a2 2 0 012 2v14l-4-3H5a2 2 0 01-2-2V6a2 2 0 012-2z" />
      <path d="M8 9h7M8 13h5" />
    </svg>
  );
}

type FooterProps = {
  ismsMarkSrc?: string;
};

export default function Footer({ ismsMarkSrc }: FooterProps) {
  const [famOpen, setFamOpen] = useState(false);
  const famRef = useRef<HTMLDivElement>(null);
  const [pvOpen, setPvOpen] = useState(false);
  const [pvTab, setPvTab] = useState<PvTab>("info");
  const openPrevent = (tab: PvTab) => {
    setPvTab(tab);
    setPvOpen(true);
  };

  useEffect(() => {
    if (!famOpen) return;
    const onDoc = (e: MouseEvent) => {
      if (famRef.current && !famRef.current.contains(e.target as Node)) {
        setFamOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setFamOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [famOpen]);

  return (
    <footer className="foot" id="site-footer">
      <div className="wrap">
        <div className="foot-util">
          <div className="famsite" ref={famRef}>
            <button
              className={`fam-btn${famOpen ? " open" : ""}`}
              aria-expanded={famOpen}
              aria-haspopup="true"
              onClick={() => setFamOpen((v) => !v)}
            >
              FAMILY SITE
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            <ul className={`fam-menu${famOpen ? " open" : ""}`} role="menu">
              {FAMILY_SITES.map((f) => (
                <li role="none" key={f.href}>
                  <a
                    role="menuitem"
                    href={f.href}
                    target="_blank"
                    rel="noopener"
                  >
                    {f.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <a className="totop" href="#hero">
            맨 위로 <span aria-hidden="true">&#8593;</span>
          </a>
        </div>

        <div className="foot-main">
          <div className="foot-brand">
            <div className="logo">{BRAND}</div>
            <p className="note">{FOOTER_NOTE}</p>
            <div className="sns">
              {SNS_LINKS.map((s) => (
                <a
                  key={s.kind}
                  href={s.href}
                  target="_blank"
                  rel="noopener"
                  aria-label={s.label}
                >
                  <SnsIcon kind={s.kind} />
                </a>
              ))}
            </div>
          </div>
          <div className="foot-company">
            <dl className="cinfo">
              {COMPANY_INFO.map((c) => (
                <div key={c.dt}>
                  <dt>{c.dt}</dt>
                  <dd>{c.dd}</dd>
                </div>
              ))}
            </dl>
            <div className="foot-policy">
              <a className="priv" href="#">
                개인정보처리방침
              </a>
              <span>·</span>
              <a href="#">이용약관</a>
              <span>·</span>
              <button
                className="report-link"
                type="button"
                onClick={() => openPrevent("info")}
              >
                부정훈련 예방 안내
              </button>
              <span>·</span>
              <button
                className="report-link"
                type="button"
                onClick={() => openPrevent("report")}
              >
                부정훈련 신고
              </button>
              {ismsMarkSrc && (
                <img
                  className="isms-mark"
                  src={ismsMarkSrc}
                  alt="ISMS 정보보호 관리체계 인증"
                  width={116}
                  height={82}
                />
              )}
            </div>
          </div>
        </div>

        <div className="foot-bottom">
          <div className="copy">{FOOTER_COPYRIGHT}</div>
        </div>
      </div>

      <PreventTrainingModal
        open={pvOpen}
        onClose={() => setPvOpen(false)}
        initialTab={pvTab}
      />
    </footer>
  );
}
