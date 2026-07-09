"use client";

import { useId, useState } from "react";
import Modal from "./Modal";
import { CONSULT_MODAL } from "@/data/axai";

/**
 * ConsultModal — AX 진단 상담받기. 공통 Modal 셸 재사용.
 * 부문·회사·담당자·이메일·규모·관심영역·연락처·문의 → 검증 → 성공(백엔드 없음).
 */
const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

export default function ConsultModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const uid = useId();
  const [sector, setSector] = useState("");
  const [company, setCompany] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [size, setSize] = useState("");
  const [interests, setInterests] = useState<Set<string>>(new Set());
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [err, setErr] = useState<Record<string, boolean>>({});
  const [done, setDone] = useState(false);

  const close = () => {
    onClose();
    window.setTimeout(() => {
      setDone(false);
      setErr({});
    }, 350);
  };

  const toggle = (label: string) =>
    setInterests((prev) => {
      const next = new Set(prev);
      next.has(label) ? next.delete(label) : next.add(label);
      return next;
    });

  /* 라이브 인라인 검증: 유효해지는 즉시 경고 제거(제출검증 불변) */
  const clear = (key: string, valid: boolean) =>
    setErr((e) => (valid && e[key] ? { ...e, [key]: false } : e));

  const submit = () => {
    const next = {
      sector: !sector,
      company: !company.trim(),
      name: !name.trim(),
      email: !emailOk(email),
      size: !size,
    };
    setErr(next);
    if (Object.values(next).some(Boolean)) return;
    setDone(true);
  };

  return (
    <Modal
      open={open}
      onClose={close}
      title={done ? undefined : CONSULT_MODAL.title}
    >
      {done ? (
        <div className="done show">
          <div className="check">✓</div>
          <h4>{CONSULT_MODAL.done.title}</h4>
          <p>{CONSULT_MODAL.done.desc}</p>
          <div style={{ marginTop: 20 }}>
            <button className="btn btn-line-dark" onClick={close}>
              닫기
            </button>
          </div>
        </div>
      ) : (
        <>
          <p style={{ color: "var(--muted)", fontSize: "14.5px", marginTop: -6 }}>
            {CONSULT_MODAL.sub}
          </p>
          <div className={`field${err.sector ? " invalid" : ""}`}>
            <label htmlFor={`${uid}-sec`}>
              부문 <span className="req">*</span>
            </label>
            <select
              id={`${uid}-sec`}
              value={sector}
              onChange={(e) => {
                setSector(e.target.value);
                clear("sector", !!e.target.value);
              }}
            >
              <option value="">선택</option>
              {CONSULT_MODAL.sectors.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
            <span className="err">부문을 선택해 주세요.</span>
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
          <div className={`field${err.size ? " invalid" : ""}`}>
            <label htmlFor={`${uid}-sz`}>
              교육 대상 규모 <span className="req">*</span>
            </label>
            <select
              id={`${uid}-sz`}
              value={size}
              onChange={(e) => {
                setSize(e.target.value);
                clear("size", !!e.target.value);
              }}
            >
              <option value="">선택</option>
              {CONSULT_MODAL.sizes.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
            <span className="err">규모를 선택해 주세요.</span>
          </div>
          <div className="field">
            <label>관심 영역</label>
            <div className="chips">
              {CONSULT_MODAL.interests.map((o) => (
                <span
                  key={o}
                  className={`mchip${interests.has(o) ? " on" : ""}`}
                  role="button"
                  tabIndex={0}
                  aria-pressed={interests.has(o)}
                  onClick={() => toggle(o)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      toggle(o);
                    }
                  }}
                >
                  {o}
                </span>
              ))}
            </div>
          </div>
          <div className="field">
            <label htmlFor={`${uid}-ph`}>연락처</label>
            <input
              id={`${uid}-ph`}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="field">
            <label htmlFor={`${uid}-msg`}>문의 내용</label>
            <textarea
              id={`${uid}-msg`}
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
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
            {CONSULT_MODAL.submit}
          </button>
        </>
      )}
    </Modal>
  );
}
