import type { ElementType, ReactNode } from "react";

/**
 * Container(=.wrap) — 콘텐츠 최대폭·좌우 거터·중앙정렬 (Design.md §4).
 * width: 홈/코퍼레이트 1200(var(--maxw)) / 필러 페이지 1180.
 */
type ContainerProps = {
  as?: ElementType;
  pillar?: boolean; // true → max-width 1180 (필러 페이지)
  className?: string;
  children?: ReactNode;
};

export default function Container({
  as: Tag = "div",
  pillar = false,
  className = "",
  children,
}: ContainerProps) {
  return (
    <Tag className={`wrap${pillar ? " pillar-w" : ""}${className ? ` ${className}` : ""}`}>
      {children}
    </Tag>
  );
}
