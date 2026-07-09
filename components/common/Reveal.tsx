import type { ElementType, ReactNode } from "react";

/**
 * 선택적 reveal 래퍼 (Design.md §6).
 * `.r`(단일 등장) 또는 `.stagger`(자식 순차 등장) 클래스를 부여한다.
 * 실제 관찰·`.in` 부여는 상위 스코프의 useReveal 훅이 담당한다.
 *
 * 렌더 태그는 `as`로 교체 가능(기본 div). props로 받은 className을 병합.
 */
type RevealProps = {
  as?: ElementType;
  stagger?: boolean;
  className?: string;
  children?: ReactNode;
} & Record<string, unknown>;

export default function Reveal({
  as: Tag = "div",
  stagger = false,
  className = "",
  children,
  ...rest
}: RevealProps) {
  const base = stagger ? "stagger" : "r";
  return (
    <Tag className={`${base}${className ? ` ${className}` : ""}`} {...rest}>
      {children}
    </Tag>
  );
}
