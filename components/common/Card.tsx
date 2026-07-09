import type { ReactNode } from "react";

/**
 * Card (Design.md §5) — 정보 단위화.
 * variant:
 *  - base: --surface 배경 카드(.card-base), radius --r, hover -3px + shadow-2
 *  - ref : 레퍼런스 카드(.ref) — org/role 슬롯 편의 제공
 *  - cert: 인증 카드(.cert) — 상단 그라디언트 바
 * 원본 클래스(.ref/.cert)를 그대로 사용해 시각 일치.
 */
type CardBaseProps = {
  variant?: "base";
  className?: string;
  children?: ReactNode;
};

type CardRefProps = {
  variant: "ref";
  org: ReactNode;
  role?: ReactNode;
  className?: string;
};

type CardCertProps = {
  variant: "cert";
  title: ReactNode;
  small?: ReactNode;
  className?: string;
};

type CardProps = CardBaseProps | CardRefProps | CardCertProps;

export default function Card(props: CardProps) {
  if (props.variant === "ref") {
    const { org, role, className = "" } = props;
    return (
      <div className={`ref${className ? ` ${className}` : ""}`}>
        <div className="org">{org}</div>
        {role != null && <div className="role">{role}</div>}
      </div>
    );
  }

  if (props.variant === "cert") {
    const { title, small, className = "" } = props;
    return (
      <div className={`cert${className ? ` ${className}` : ""}`}>
        {title}
        {small != null && <small>{small}</small>}
      </div>
    );
  }

  const { className = "", children } = props;
  return (
    <div className={`card-base${className ? ` ${className}` : ""}`}>{children}</div>
  );
}
