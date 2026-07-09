import type { ReactNode } from "react";
import Container from "./Container";

/**
 * Section — 세로 리듬 120/74(Design.md §3-3) 표준 섹션.
 * 내부를 Container(.wrap)로 정렬. 배경 톤/구분선 옵션 제공.
 */
type SectionProps = {
  id?: string;
  className?: string;
  /** surface 배경 톤 전환 */
  surface?: boolean;
  /** 상단 구분선 */
  bordered?: boolean;
  /** Container 폭(필러 페이지 1180) */
  pillar?: boolean;
  /** Container 래핑 없이 자식을 직접 배치 */
  bare?: boolean;
  children?: ReactNode;
};

export default function Section({
  id,
  className = "",
  surface = false,
  bordered = false,
  pillar = false,
  bare = false,
  children,
}: SectionProps) {
  const cls = [
    "section",
    surface ? "bg-surface" : "",
    bordered ? "border-t border-line" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section id={id} className={cls}>
      {bare ? children : <Container pillar={pillar}>{children}</Container>}
    </section>
  );
}
