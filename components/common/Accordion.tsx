"use client";

import { useId, useRef, useState, type ReactNode } from "react";

/**
 * Accordion / FAQ (Design.md §5) — 정보 점진 공개.
 * 질문 행 + 셰브론 회전 + 높이 애니메이션. 기본 전체 접힘.
 * 원본 .faq-item/.faq-q/.faq-a 구조·모션 이식.
 * a11y: 질문 버튼 aria-expanded/aria-controls, 답변 영역 role/region.
 */
export type AccordionItem = {
  id: string;
  qn?: string; // "Q01"
  q: ReactNode;
  a: ReactNode;
};

type AccordionProps = {
  items: AccordionItem[];
  /** 한 번에 하나만 열림(기본) */
  single?: boolean;
};

export default function Accordion({ items, single = true }: AccordionProps) {
  const [open, setOpen] = useState<Set<string>>(new Set());
  const baseId = useId();

  const toggle = (id: string) => {
    setOpen((prev) => {
      const next = new Set(single ? [] : prev);
      if (prev.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="faq-list">
      {items.map((it) => (
        <AccordionRow
          key={it.id}
          item={it}
          open={open.has(it.id)}
          onToggle={() => toggle(it.id)}
          panelId={`${baseId}-${it.id}`}
        />
      ))}
    </div>
  );
}

function AccordionRow({
  item,
  open,
  onToggle,
  panelId,
}: {
  item: AccordionItem;
  open: boolean;
  onToggle: () => void;
  panelId: string;
}) {
  const innerRef = useRef<HTMLDivElement>(null);
  const maxH = open ? innerRef.current?.scrollHeight ?? 9999 : 0;

  return (
    <div className={`faq-item${open ? " open" : ""}`}>
      <button
        className="faq-q"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onToggle}
      >
        {item.qn && <span className="qn">{item.qn}</span>}
        <span className="qt">{item.q}</span>
        <svg
          className="chev"
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
      <div
        className="faq-a"
        id={panelId}
        role="region"
        style={{ maxHeight: maxH }}
      >
        <div className="faq-a-inner" ref={innerRef}>
          {item.a}
        </div>
      </div>
    </div>
  );
}
