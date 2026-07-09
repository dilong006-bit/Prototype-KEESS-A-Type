import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";

/**
 * Button (Design.md §5) — 행동 위계.
 * variant: ink(1차·고대비) / glass(히어로 위 반투명) / line-dark(보조·아웃라인).
 * 모두 pill, hover translateY. href가 있으면 <a>, 없으면 <button>.
 * data-scroll: 페이지 내 앵커 스크롤 대상(4단계 인터랙션에서 소비).
 */
type Variant = "ink" | "glass" | "line-dark";

type CommonProps = {
  variant?: Variant;
  className?: string;
  children?: ReactNode;
};

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className"> & {
    href?: undefined;
  };

type ButtonAsAnchor = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className"> & {
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsAnchor;

const VARIANT_CLASS: Record<Variant, string> = {
  ink: "btn btn-ink",
  glass: "btn btn-glass",
  "line-dark": "btn-line-dark",
};

export default function Button(props: ButtonProps) {
  const { variant = "ink", className = "", children, ...rest } = props;
  const cls = `${VARIANT_CLASS[variant]}${className ? ` ${className}` : ""}`;

  if ("href" in props && props.href != null) {
    const anchorRest = rest as AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a className={cls} {...anchorRest}>
        {children}
      </a>
    );
  }

  const buttonRest = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button className={cls} type={buttonRest.type ?? "button"} {...buttonRest}>
      {children}
    </button>
  );
}
