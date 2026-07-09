import type { ReactNode } from "react";

/**
 * SectionHeader — eyebrow → title → sub 고정 위계 (Design.md §5).
 * eyebrow(영문·대문자·자간 .16em·text-muted) → title(clamp) → sub(리드).
 * reveal 적용은 각 요소에 `reveal` prop으로 `.r` 부여(상위 useReveal이 관찰).
 */
type SectionHeaderProps = {
  eyebrow?: ReactNode;
  title?: ReactNode;
  sub?: ReactNode;
  /** 각 요소에 reveal(.r) 부여 */
  reveal?: boolean;
  className?: string;
  /** 리드 최대폭 오버라이드(기본 56ch). 한 줄 노출 시 "none" */
  subMaxWidth?: string;
  /** 데스크톱에서 리드를 한 줄로(줄바꿈 금지). ≤820은 CSS에서 자동 해제 */
  subNowrap?: boolean;
};

export default function SectionHeader({
  eyebrow,
  title,
  sub,
  reveal = false,
  className = "",
  subMaxWidth,
  subNowrap = false,
}: SectionHeaderProps) {
  const r = reveal ? " r" : "";
  return (
    <header className={className || undefined}>
      {eyebrow != null && <p className={`eyebrow${r}`}>{eyebrow}</p>}
      {title != null && (
        <h2 className={`sec-title${r}`} style={{ marginTop: 12 }}>
          {title}
        </h2>
      )}
      {sub != null && (
        <p
          className={`leadsub${r}${subNowrap ? " leadsub-nowrap" : ""}`}
          style={{
            marginTop: 18,
            color: "var(--muted)",
            fontSize: "16.5px",
            maxWidth: subMaxWidth ?? "56ch",
            lineHeight: 1.7,
            wordBreak: "keep-all",
          }}
        >
          {sub}
        </p>
      )}
    </header>
  );
}
