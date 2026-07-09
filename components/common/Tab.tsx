"use client";

import { useRef, type ReactNode } from "react";

/**
 * Tab (Design.md §5) — 밀도 높은 분류 탐색(예: FAQ 카테고리).
 * 아웃라인 pill, 선택 시 --ink. 원본 .faq-tabs/.faq-tab 스타일 사용.
 * a11y: role="tablist"/"tab", aria-selected, 좌우 화살표 키 이동.
 */
export type TabItem = { key: string; label: ReactNode };

type TabProps = {
  items: TabItem[];
  value: string;
  onChange: (key: string) => void;
  ariaLabel?: string;
};

export default function Tab({ items, value, onChange, ariaLabel }: TabProps) {
  const refs = useRef<Record<string, HTMLButtonElement | null>>({});

  const onKey = (e: React.KeyboardEvent, idx: number) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const dir = e.key === "ArrowRight" ? 1 : -1;
    const next = (idx + dir + items.length) % items.length;
    const key = items[next].key;
    onChange(key);
    refs.current[key]?.focus();
  };

  return (
    <div className="faq-tabs" role="tablist" aria-label={ariaLabel}>
      {items.map((it, i) => {
        const selected = it.key === value;
        return (
          <button
            key={it.key}
            ref={(el) => {
              refs.current[it.key] = el;
            }}
            className={`faq-tab${selected ? " on" : ""}`}
            role="tab"
            aria-selected={selected}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(it.key)}
            onKeyDown={(e) => onKey(e, i)}
          >
            {it.label}
          </button>
        );
      })}
    </div>
  );
}
