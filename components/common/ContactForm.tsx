"use client";

import { useId, useRef, useState } from "react";
import {
  SECTOR_OPTIONS,
  SIZE_OPTIONS,
  INTEREST_OPTIONS,
  FILE_HINT,
  INQUIRY_DONE,
  CONSENT_PRIVACY,
  CONSENT_MKT,
} from "@/data/home";

/**
 * ContactForm (Design.md §5 Contact/Diagnostic Form) — 홈 #inq 폼 이식.
 * 부문·규모·회사·담당자·이메일·연락처·관심영역(칩)·문의내용·첨부·동의(필수/선택).
 * 프로토타입이므로 실제 전송 없이 인라인 검증 + 성공 상태 UI만(백엔드 없음).
 * 관심영역 기본 선택은 defaultInterests로 주입(필러 페이지 재사용 대비).
 */
type ContactFormProps = {
  defaultInterests?: string[];
  /** 페이지 전용 관심영역 칩 추가(예: P3 '정부지원 환급'). 홈 옵션은 불변 */
  extraInterests?: string[];
};

const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

type ConsentBlock = { b?: string; t?: string };

function ConsentText({ blocks }: { blocks: ConsentBlock[] }) {
  return (
    <div className="ct-inner">
      {blocks.map((p, i) => (
        <p key={i}>
          {p.b && <b>{p.b}</b>}
          {p.b && p.t && <br />}
          {p.t}
        </p>
      ))}
    </div>
  );
}

export default function ContactForm({
  defaultInterests = [],
  extraInterests = [],
}: ContactFormProps) {
  const interestOptions = [...INTEREST_OPTIONS, ...extraInterests];
  const [sector, setSector] = useState("");
  const [size, setSize] = useState("");
  const [company, setCompany] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [interests, setInterests] = useState<Set<string>>(
    new Set(defaultInterests),
  );
  const [message, setMessage] = useState("");
  const [fileName, setFileName] = useState("");
  const [consentPrivacy, setConsentPrivacy] = useState(false);
  const [consentMkt, setConsentMkt] = useState(false);
  const [privOpen, setPrivOpen] = useState(false);
  const [mktOpen, setMktOpen] = useState(false);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [done, setDone] = useState(false);
  const honeypot = useRef<HTMLInputElement>(null);
  const uid = useId();

  const toggleInterest = (label: string) =>
    setInterests((prev) => {
      const next = new Set(prev);
      next.has(label) ? next.delete(label) : next.add(label);
      return next;
    });

  /* 라이브 인라인 검증: 유효해지는 즉시 해당 경고 제거(제출검증 불변, 제거만) */
  const clear = (key: string, valid: boolean) =>
    setErrors((e) => (valid && e[key] ? { ...e, [key]: false } : e));

  const submit = () => {
    // 허니팟: 봇이 채우면 조용히 무시(성공 위장)
    if (honeypot.current?.value) {
      setDone(true);
      return;
    }
    const next: Record<string, boolean> = {
      sector: !sector,
      size: !size,
      company: !company.trim(),
      name: !name.trim(),
      email: !emailOk(email),
      consent: !consentPrivacy,
    };
    setErrors(next);
    if (Object.values(next).some(Boolean)) return;
    setDone(true);
  };

  if (done) {
    return (
      <div className="form">
        <div className="done show">
          <div className="check">✓</div>
          <h4>{INQUIRY_DONE.title}</h4>
          <p>{INQUIRY_DONE.desc}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="form">
      <div id="form-body">
        <div className="frow">
          <div className={`field${errors.sector ? " invalid" : ""}`}>
            <label htmlFor={`${uid}-sector`}>
              부문 <span className="req">*</span>
            </label>
            <select
              id={`${uid}-sector`}
              value={sector}
              onChange={(e) => {
                setSector(e.target.value);
                clear("sector", !!e.target.value);
              }}
            >
              <option value="">선택</option>
              {SECTOR_OPTIONS.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
            <span className="err">부문을 선택해 주세요.</span>
          </div>
          <div className={`field${errors.size ? " invalid" : ""}`}>
            <label htmlFor={`${uid}-size`}>
              교육 대상 규모 <span className="req">*</span>
            </label>
            <select
              id={`${uid}-size`}
              value={size}
              onChange={(e) => {
                setSize(e.target.value);
                clear("size", !!e.target.value);
              }}
            >
              <option value="">선택</option>
              {SIZE_OPTIONS.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
            <span className="err">규모를 선택해 주세요.</span>
          </div>
        </div>

        <div className="frow">
          <div className={`field${errors.company ? " invalid" : ""}`}>
            <label htmlFor={`${uid}-company`}>
              회사·기관명 <span className="req">*</span>
            </label>
            <input
              id={`${uid}-company`}
              value={company}
              onChange={(e) => {
                setCompany(e.target.value);
                clear("company", !!e.target.value.trim());
              }}
            />
            <span className="err">회사·기관명을 입력해 주세요.</span>
          </div>
          <div className={`field${errors.name ? " invalid" : ""}`}>
            <label htmlFor={`${uid}-name`}>
              담당자명 <span className="req">*</span>
            </label>
            <input
              id={`${uid}-name`}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                clear("name", !!e.target.value.trim());
              }}
            />
            <span className="err">담당자명을 입력해 주세요.</span>
          </div>
        </div>

        <div className="frow">
          <div className={`field${errors.email ? " invalid" : ""}`}>
            <label htmlFor={`${uid}-email`}>
              이메일 <span className="req">*</span>
            </label>
            <input
              id={`${uid}-email`}
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                clear("email", emailOk(e.target.value));
              }}
            />
            <span className="err">올바른 이메일을 입력해 주세요.</span>
          </div>
          <div className="field">
            <label htmlFor={`${uid}-phone`}>연락처</label>
            <input
              id={`${uid}-phone`}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>

        <div className="field">
          <label>관심 영역</label>
          <div className="chips">
            {interestOptions.map((o) => (
              <span
                key={o}
                className={`mchip${interests.has(o) ? " on" : ""}`}
                role="button"
                tabIndex={0}
                aria-pressed={interests.has(o)}
                onClick={() => toggleInterest(o)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    toggleInterest(o);
                  }
                }}
              >
                {o}
              </span>
            ))}
          </div>
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

        <div className="field">
          <label>첨부파일</label>
          <label
            className={`filebox${fileName ? " has" : ""}`}
            htmlFor={`${uid}-file`}
          >
            {fileName || "파일을 선택하거나 끌어다 놓으세요"}
          </label>
          <input
            id={`${uid}-file`}
            type="file"
            style={{ display: "none" }}
            accept=".zip,.pdf,.hwp,.ppt,.pptx,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.gif"
            onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "")}
          />
          <div className="filehint">{FILE_HINT}</div>
        </div>

        {/* 허니팟 */}
        <input
          ref={honeypot}
          className="hp"
          tabIndex={-1}
          autoComplete="off"
          placeholder="website"
          aria-hidden="true"
        />

        <div className="consent-group">
          <div className={`consent${errors.consent ? " invalid" : ""}`}>
            <label className="consent-main">
              <input
                type="checkbox"
                checked={consentPrivacy}
                onChange={(e) => {
                  setConsentPrivacy(e.target.checked);
                  clear("consent", e.target.checked);
                }}
              />
              <span>
                <b className="c-tag req-tag">필수</b> 개인정보 수집·이용 동의
              </span>
            </label>
            <button
              type="button"
              className="consent-view"
              aria-expanded={privOpen}
              onClick={() => setPrivOpen((v) => !v)}
            >
              전문 보기
            </button>
          </div>
          <div
            className="consent-text"
            style={{ maxHeight: privOpen ? 260 : 0 }}
          >
            <ConsentText blocks={CONSENT_PRIVACY} />
          </div>

          <div className="consent">
            <label className="consent-main">
              <input
                type="checkbox"
                checked={consentMkt}
                onChange={(e) => setConsentMkt(e.target.checked)}
              />
              <span>
                <b className="c-tag opt-tag">선택</b> 마케팅 정보 수신 동의
              </span>
            </label>
            <button
              type="button"
              className="consent-view"
              aria-expanded={mktOpen}
              onClick={() => setMktOpen((v) => !v)}
            >
              전문 보기
            </button>
          </div>
          <div
            className="consent-text"
            style={{ maxHeight: mktOpen ? 260 : 0 }}
          >
            <ConsentText blocks={CONSENT_MKT} />
          </div>
        </div>

        <button className="btn submit" onClick={submit}>
          상담 신청
        </button>
      </div>
    </div>
  );
}
