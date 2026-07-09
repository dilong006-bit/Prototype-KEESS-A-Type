import type { ReactNode } from "react";

/**
 * Chip (Design.md §5) — 핵심 특징·태그 압축. pill, 저대비.
 * 원본 관행상 태그류는 <span class="chip">. 선택형(.on) 지원.
 */
type ChipProps = {
  active?: boolean;
  className?: string;
  onClick?: () => void;
  children?: ReactNode;
};

export default function Chip({
  active = false,
  className = "",
  onClick,
  children,
}: ChipProps) {
  const cls = `chip${active ? " on" : ""}${className ? ` ${className}` : ""}`;
  if (onClick) {
    return (
      <button type="button" className={cls} onClick={onClick} aria-pressed={active}>
        {children}
      </button>
    );
  }
  return <span className={cls}>{children}</span>;
}
