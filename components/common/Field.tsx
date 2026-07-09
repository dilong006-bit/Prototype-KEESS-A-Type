import type { ReactNode } from "react";

/**
 * Field (Design.md §5 Contact/Diagnostic Form 프리미티브).
 * label + 컨트롤 슬롯 + 필수(.req) + 인라인 에러(.err) 구조.
 * 실제 폼 조립(부문/규모/동의 등)은 4단계 ContactForm에서 이 프리미티브로 구성.
 */
type FieldProps = {
  label: ReactNode;
  htmlFor?: string;
  required?: boolean;
  invalid?: boolean;
  error?: ReactNode;
  className?: string;
  children: ReactNode; // input/select/textarea 등 컨트롤
};

export default function Field({
  label,
  htmlFor,
  required = false,
  invalid = false,
  error,
  className = "",
  children,
}: FieldProps) {
  return (
    <div className={`field${invalid ? " invalid" : ""}${className ? ` ${className}` : ""}`}>
      <label htmlFor={htmlFor}>
        {label} {required && <span className="req">*</span>}
      </label>
      {children}
      {error != null && <span className="err">{error}</span>}
    </div>
  );
}
