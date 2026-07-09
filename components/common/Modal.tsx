"use client";

import { useCallback, useEffect, useId, useRef, type ReactNode } from "react";

/**
 * Modal (Design.md §5) — 문의/상담/가이드 공용 접근성 셸.
 * 원본 pv-dialog 구조·모션 이식(radius 22, shadow-3, translateY(16px) scale(.985) 진입).
 * a11y: role="dialog", aria-modal, 라벨 연결, ESC 닫기, 스크림 클릭 닫기,
 *        포커스 트랩, 열릴 때 body 스크롤 잠금, 닫힐 때 트리거로 포커스 복귀.
 */
type ModalProps = {
  open: boolean;
  onClose: () => void;
  title?: ReactNode;
  children?: ReactNode;
  /** 다이얼로그 최대폭 override */
  maxWidth?: number;
};

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export default function Modal({
  open,
  onClose,
  title,
  children,
  maxWidth,
}: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const prevFocus = useRef<HTMLElement | null>(null);

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
        return;
      }
      if (e.key === "Tab" && dialogRef.current) {
        const nodes = Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
        ).filter((el) => el.offsetParent !== null);
        if (nodes.length === 0) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    },
    [onClose],
  );

  useEffect(() => {
    if (!open) return;
    prevFocus.current = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKey, true);

    // 초기 포커스: 다이얼로그 내 첫 포커스 대상
    const t = window.setTimeout(() => {
      const node = dialogRef.current?.querySelector<HTMLElement>(FOCUSABLE);
      node?.focus();
    }, 0);

    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", handleKey, true);
      window.clearTimeout(t);
      prevFocus.current?.focus?.();
    };
  }, [open, handleKey]);

  return (
    <div
      className={`pv-overlay${open ? " open" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? titleId : undefined}
      aria-hidden={!open}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="pv-dialog"
        ref={dialogRef}
        style={maxWidth ? { maxWidth } : undefined}
      >
        <div className="pv-head">
          {title != null ? <h3 id={titleId}>{title}</h3> : <span />}
          <button
            className="pv-close"
            type="button"
            aria-label="닫기"
            onClick={onClose}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
        <div className="pv-body">{children}</div>
      </div>
    </div>
  );
}
