"use client";

import { useEffect, useState } from "react";
import Modal from "@/components/common/Modal";
import Button from "@/components/common/Button";
import { CONSULT } from "@/data/content";

/**
 * 상담 모달 — 공통 Modal 셸 재사용. axis 있으면 "문의 대상: {axis}" 컨텍스트.
 * 필드 name·org·mail 검증(이메일 정규식) → 성공 뷰. 라이브 인라인검증(입력 시 경고 제거).
 * 백엔드 없음.
 */
const emailOk = (v: string) => /.+@.+\..+/.test(v.trim());

export default function ContentConsultModal({
  open,
  axis,
  onClose,
}: {
  open: boolean;
  axis?: string;
  onClose: () => void;
}) {
  const [name, setName] = useState("");
  const [org, setOrg] = useState("");
  const [mail, setMail] = useState("");
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState<Record<string, boolean>>({});
  const [done, setDone] = useState(false);

  // 닫힌 뒤 초기화
  useEffect(() => {
    if (open) return;
    const t = window.setTimeout(() => {
      setName("");
      setOrg("");
      setMail("");
      setMsg("");
      setErr({});
      setDone(false);
    }, 350);
    return () => window.clearTimeout(t);
  }, [open]);

  const clear = (k: string, valid: boolean) =>
    setErr((e) => (valid && e[k] ? { ...e, [k]: false } : e));

  const submit = () => {
    const next = {
      name: !name.trim(),
      org: !org.trim(),
      mail: !emailOk(mail),
    };
    setErr(next);
    if (Object.values(next).some(Boolean)) return;
    setDone(true);
  };

  return (
    <Modal open={open} onClose={onClose} title={CONSULT.title} maxWidth={560}>
      {done ? (
        <div className="pv-done show" style={{ padding: "20px 10px" }}>
          <div className="check">
            <svg
              className="pvi-done"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M8.5 12.5l2.5 2.5 4.5-5" />
            </svg>
          </div>
          <h4>{CONSULT.done.title}</h4>
          <p>{CONSULT.done.desc}</p>
          <div className="pv-done-cta">
            <button className="btn-line-dark" type="button" onClick={onClose}>
              닫기
            </button>
          </div>
        </div>
      ) : (
        <>
          <p style={{ fontSize: "13px", color: "var(--muted)", marginTop: -6 }}>
            {CONSULT.cat} · {CONSULT.meta}
          </p>
          {axis && <div className="cx-ctx" style={{ marginTop: 14 }}>문의 대상: {axis}</div>}

          <div className={`field${err.name ? " invalid" : ""}`}>
            <label htmlFor="cf-name">
              담당자명 <span className="req">*</span>
            </label>
            <input
              id="cf-name"
              type="text"
              placeholder="홍길동"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                clear("name", !!e.target.value.trim());
              }}
            />
            <span className="err">담당자명을 입력해 주세요.</span>
          </div>
          <div className={`field${err.org ? " invalid" : ""}`}>
            <label htmlFor="cf-org">
              회사/기관 <span className="req">*</span>
            </label>
            <input
              id="cf-org"
              type="text"
              placeholder="회사명"
              value={org}
              onChange={(e) => {
                setOrg(e.target.value);
                clear("org", !!e.target.value.trim());
              }}
            />
            <span className="err">회사·기관명을 입력해 주세요.</span>
          </div>
          <div className={`field${err.mail ? " invalid" : ""}`}>
            <label htmlFor="cf-mail">
              이메일 <span className="req">*</span>
            </label>
            <input
              id="cf-mail"
              type="email"
              placeholder="name@company.com"
              value={mail}
              onChange={(e) => {
                setMail(e.target.value);
                clear("mail", emailOk(e.target.value));
              }}
            />
            <span className="err">올바른 이메일을 입력해 주세요.</span>
          </div>
          <div className="field">
            <label htmlFor="cf-msg">필요한 콘텐츠·과제</label>
            <textarea
              id="cf-msg"
              rows={3}
              placeholder="예: 전 직원 법정의무 + 실무자 생성형 AI + 기업 맞춤 제작, 3개월 내 도입"
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
            />
          </div>
          <Button
            variant="ink"
            onClick={submit}
            style={{ width: "100%", marginTop: 20 }}
          >
            {CONSULT.submit}
          </Button>
        </>
      )}
    </Modal>
  );
}
