"use client";

import { useId, useState } from "react";
import Modal from "./Modal";
import { GUIDE_MODAL } from "@/data/axai";

/**
 * GuideModal — AX 도입 가이드 받기. 공통 Modal 셸 재사용.
 * 회사·담당자·이메일 + 개인정보 동의 → 검증 → 성공 상태(백엔드 없음).
 */
const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

export default function GuideModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const uid = useId();
  const [company, setCompany] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [err, setErr] = useState<Record<string, boolean>>({});
  const [done, setDone] = useState(false);

  const close = () => {
    onClose();
    // 닫힌 뒤 상태 초기화(트랜지션 후)
    window.setTimeout(() => {
      setDone(false);
      setErr({});
    }, 350);
  };

  /* 라이브 인라인 검증: 유효해지는 즉시 경고 제거(제출검증 불변) */
  const clear = (key: string, valid: boolean) =>
    setErr((e) => (valid && e[key] ? { ...e, [key]: false } : e));

  const submit = () => {
    const next = {
      company: !company.trim(),
      name: !name.trim(),
      email: !emailOk(email),
    };
    setErr(next);
    if (!consent) return;
    if (Object.values(next).some(Boolean)) return;
    setDone(true);
  };

  return (
    <Modal open={open} onClose={close} title={done ? undefined : GUIDE_MODAL.title}>
      {done ? (
        <div className="done show">
          <div className="check">✓</div>
          <h4>{GUIDE_MODAL.done.title}</h4>
          <p>{GUIDE_MODAL.done.desc}</p>
          <div style={{ marginTop: 20 }}>
            <button className="btn btn-line-dark" onClick={close}>
              닫기
            </button>
          </div>
        </div>
      ) : (
        <>
          <p style={{ color: "var(--muted)", fontSize: "14.5px", marginTop: -6 }}>
            {GUIDE_MODAL.sub}
          </p>
          <div className="ax-guide-value" style={{ marginTop: 16 }}>
            <div className="gvt">{GUIDE_MODAL.valueTitle}</div>
            <ul>
              {GUIDE_MODAL.value.map((v) => (
                <li key={v}>{v}</li>
              ))}
            </ul>
          </div>
          <div className={`field${err.company ? " invalid" : ""}`}>
            <label htmlFor={`${uid}-co`}>
              회사·기관명 <span className="req">*</span>
            </label>
            <input
              id={`${uid}-co`}
              value={company}
              onChange={(e) => {
                setCompany(e.target.value);
                clear("company", !!e.target.value.trim());
              }}
            />
            <span className="err">회사·기관명을 입력해 주세요.</span>
          </div>
          <div className={`field${err.name ? " invalid" : ""}`}>
            <label htmlFor={`${uid}-nm`}>
              담당자명 <span className="req">*</span>
            </label>
            <input
              id={`${uid}-nm`}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                clear("name", !!e.target.value.trim());
              }}
            />
            <span className="err">담당자명을 입력해 주세요.</span>
          </div>
          <div className={`field${err.email ? " invalid" : ""}`}>
            <label htmlFor={`${uid}-em`}>
              이메일 <span className="req">*</span>
            </label>
            <input
              id={`${uid}-em`}
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                clear("email", emailOk(e.target.value));
              }}
            />
            <span className="err">올바른 이메일을 입력해 주세요.</span>
          </div>
          <label
            className="consent"
            style={{
              display: "flex",
              gap: 9,
              alignItems: "flex-start",
              marginTop: 16,
              fontSize: "12.5px",
              color: "var(--muted)",
            }}
          >
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              style={{ marginTop: 3, accentColor: "var(--p1)" }}
            />
            <span>
              {GUIDE_MODAL.consent} <u>처리방침</u>
            </span>
          </label>
          <button
            className="btn submit"
            style={{
              marginTop: 20,
              width: "100%",
              background: "var(--ink)",
              color: "#fff",
              padding: 15,
            }}
            onClick={submit}
          >
            {GUIDE_MODAL.submit}
          </button>
        </>
      )}
    </Modal>
  );
}
