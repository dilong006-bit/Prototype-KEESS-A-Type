import type { CSSProperties, ReactNode } from "react";

/**
 * Badge (Design.md §5) — 핵심 태그. pill.
 * tone으로 배경/글자색 지정(예: 정부지원 --gov 크로스 배지).
 */
type BadgeProps = {
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
};

export default function Badge({ className = "", style, children }: BadgeProps) {
  return (
    <span className={`badge${className ? ` ${className}` : ""}`} style={style}>
      {children}
    </span>
  );
}
