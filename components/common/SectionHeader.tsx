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
};

export default function SectionHeader({
  eyebrow,
  title,
  sub,
  reveal = false,
  className = "",
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
          className={`leadsub${r}`}
          style={{
            marginTop: 18,
            color: "var(--muted)",
            fontSize: "16.5px",
            maxWidth: "56ch",
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
