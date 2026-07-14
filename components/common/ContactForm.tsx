"use client";

import { useId, useRef, useState } from "react";
import {
  SECTOR_OPTIONS,
  SIZE_OPTIONS,
  INTEREST_OPTIONS,
  FILE_HINT,
  INQUIRY_DONE,
  CONSENT_PRIVACY,
} from "@/data/home";

// TEMP: 정보보호팀 확정 문구로 교체 (F4). 마케팅 약관 본문은 이 상수 1곳에서만 교체하면 됩니다.
const TERMS_MARKETING = `〔임시〕현행 KEESS 마케팅 정보 수신 동의 약관 본문. 수집 항목: 이름, 전화번호, 이메일. 이용 목적: 마케팅·이벤트·EDM 발송. 보유·이용 기간: 동의 철회 시까지. 동의를 거부할 수 있으며, 미동의 시 마케팅 정보 수신이 제한됩니다.`;

// F2 회사 규모(전사 임직원 수) 옵션 — value≠label(비필수). 신규 색·스타일 없음(.field select 재사용).
const COMPANY_SIZE_OPTIONS: { value: string; label: string }[] = [
  { value: "lt50", label: "50인 미만" },
  { value: "50-300", label: "50~300인 미만" },
  { value: "300-1000", label: "300~1,000인 미만" },
  { value: "gte1000", label: "1,000인 이상" },
];

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
  const [companySize, setCompanySize] = useState(""); // F2 비필수
  const [jobTitle, setJobTitle] = useState(""); // F3 비필수
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
  // 제출 수집 객체(백엔드 없음 → 구성만, 전송 안 함). 신규 필드 키 포함.
  const lastSubmit = useRef<Record<string, unknown> | null>(null);
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
    // 수집 객체 구성(전송 로직 없음). 신규 키: companySize · jobTitle · agreeMarketing,
    // 관심영역에는 '법정 필수' 선택 시 자동 포함.
    lastSubmit.current = {
      sector,
      size,
      company: company.trim(),
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      companySize,
      jobTitle: jobTitle.trim(),
      interests: [...interests],
      message: message.trim(),
      agreePrivacy: consentPrivacy,
      agreeMarketing: consentMkt,
    };
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

        {/* F2·F3: 회사 규모(전사 임직원 수) · 직급/직책 — 둘 다 비필수 */}
        <div className="frow">
          <div className="field">
            <label htmlFor={`${uid}-companySize`}>회사 규모</label>
            <select
              id={`${uid}-companySize`}
              name="companySize"
              value={companySize}
              onChange={(e) => setCompanySize(e.target.value)}
            >
              <option value="">선택</option>
              {COMPANY_SIZE_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
            <div className="filehint">전사 임직원 수 기준 (교육 인원과 별개)</div>
          </div>
          <div className="field">
            <label htmlFor={`${uid}-jobTitle`}>직급/직책</label>
            <input
              id={`${uid}-jobTitle`}
              name="jobTitle"
              type="text"
              maxLength={40}
              placeholder="예: 인사팀 과장 / 교육담당"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
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
            placeholder="도입을 검토 중인 교육 주제와 예상 인원·시기, 해결하고 싶은 조직 과제를 남겨주시면 담당 컨설턴트가 맞춤 상담으로 안내드립니다. (예: 임직원 300명 대상 AX 전환 교육을 3분기 중 검토 중입니다.)"
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
                name="agreeMarketing"
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
          {/* TEMP: 정보보호팀 확정 문구로 교체 (F4) */}
          <p className="filehint">
            수집 항목: 이름, 전화번호, 이메일 · 마케팅(EDM) 정보 발송 목적
          </p>
          <div
            className="consent-text"
            style={{ maxHeight: mktOpen ? 260 : 0 }}
          >
            <div className="ct-inner">
              <p>{TERMS_MARKETING}</p>
            </div>
          </div>
        </div>

        <button className="btn submit" onClick={submit}>
          상담 신청
        </button>
      </div>
    </div>
  );
}
