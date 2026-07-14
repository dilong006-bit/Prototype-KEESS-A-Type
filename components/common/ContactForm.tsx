"use client";

import { useEffect, useId, useRef, useState } from "react";
import {
  INTEREST_OPTIONS,
  FILE_HINT,
  INQUIRY_DONE,
  CONSENT_PRIVACY,
} from "@/data/home";

// TEMP: 정보보호팀 확정 문구로 교체. 마케팅 약관 본문은 이 상수 1곳에서만 교체하면 됩니다.
const TERMS_MARKETING = `〔임시〕현행 KEESS 마케팅 정보 수신 동의 약관 본문. 수집 항목: 이름, 전화번호, 이메일. 수신 채널: 이메일·SMS·전화. 이용 목적: 마케팅·이벤트·EDM 발송. 보유·이용 기간: 동의 철회 시까지. 동의를 거부할 수 있으며, 미동의 시 마케팅 정보 수신이 제한됩니다.`;

// 회사 규모(전사 임직원 수) 옵션 — value≠label(비필수). 신규 색·스타일 없음(.field select 재사용).
const COMPANY_SIZE_OPTIONS: { value: string; label: string }[] = [
  { value: "lt50", label: "50인 미만" },
  { value: "50-300", label: "50~300인 미만" },
  { value: "300-1000", label: "300~1,000인 미만" },
  { value: "gte1000", label: "1,000인 이상" },
];

// 예상 교육인원(trainScale) 옵션 — value≠label(비필수). 신규 색·스타일 없음.
const TRAIN_SCALE_OPTIONS: { value: string; label: string }[] = [
  { value: "none", label: "해당없음" },
  { value: "lte50", label: "~ 50명" },
  { value: "lte100", label: "~ 100명" },
  { value: "lte500", label: "~ 500명" },
  { value: "lte1000", label: "~ 1000명" },
  { value: "gt1000", label: "~ 1000명 이상" },
];

// 이메일 도메인 선택 옵션(+ '직접입력'으로 자유 도메인). 신규 색·스타일 없음.
const EMAIL_DOMAINS = [
  "naver.com",
  "gmail.com",
  "hanmail.net",
  "daum.net",
  "kakao.com",
  "nate.com",
];

const buildEmail = (local: string, domain: string) =>
  local.trim() && domain.trim() ? `${local.trim()}@${domain.trim()}` : "";

/**
 * ContactForm (Design.md §5 Contact/Diagnostic Form) — 홈 #inq 폼 이식.
 * 회사·담당자·이메일(필수) + 연락처·직급·회사규모·교육규모·관심영역·문의·첨부·동의(선택).
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
  const [company, setCompany] = useState("");
  const [name, setName] = useState(""); // 담당자명(contactName)
  const [emailLocal, setEmailLocal] = useState(""); // 이메일 아이디
  const [emailDomain, setEmailDomain] = useState(""); // 도메인(선택/직접입력)
  const [emailDirect, setEmailDirect] = useState(false); // 직접입력 모드
  const [phone, setPhone] = useState("");
  const [jobTitle, setJobTitle] = useState(""); // 선택
  const [companySize, setCompanySize] = useState(""); // 선택
  const [size, setSize] = useState(""); // 교육 대상 규모(trainScale) · 선택
  const [interests, setInterests] = useState<Set<string>>(
    new Set(defaultInterests),
  );
  const [message, setMessage] = useState("");
  const [fileName, setFileName] = useState("");
  const [consentPrivacy, setConsentPrivacy] = useState(false);
  // 마케팅 동의 — 3채널 개별 + 전체 동의(3채널 파생)
  const [mktEmail, setMktEmail] = useState(false);
  const [mktSms, setMktSms] = useState(false);
  const [mktTel, setMktTel] = useState(false);
  const agreeMarketing = mktEmail && mktSms && mktTel;
  const someMkt = mktEmail || mktSms || mktTel;
  const mktAllRef = useRef<HTMLInputElement>(null);
  const [privOpen, setPrivOpen] = useState(false);
  const [mktOpen, setMktOpen] = useState(false);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [done, setDone] = useState(false);
  const honeypot = useRef<HTMLInputElement>(null);
  // 제출 수집 객체(백엔드 없음 → 구성만, 전송 안 함).
  const lastSubmit = useRef<Record<string, unknown> | null>(null);
  const uid = useId();

  // 전체 동의 체크박스 indeterminate: 일부만 체크된 상태 표시
  useEffect(() => {
    if (mktAllRef.current)
      mktAllRef.current.indeterminate = someMkt && !agreeMarketing;
  }, [someMkt, agreeMarketing]);

  const setAllMkt = (v: boolean) => {
    setMktEmail(v);
    setMktSms(v);
    setMktTel(v);
  };

  const toggleInterest = (label: string) =>
    setInterests((prev) => {
      const next = new Set(prev);
      next.has(label) ? next.delete(label) : next.add(label);
      return next;
    });

  /* 라이브 인라인 검증: 유효해지는 즉시 해당 경고 제거(제출검증 불변, 제거만) */
  const clear = (key: string, valid: boolean) =>
    setErrors((e) => (valid && e[key] ? { ...e, [key]: false } : e));

  // 이메일 = 아이디 + '@' + 도메인(선택 또는 직접입력)
  const fullEmail = buildEmail(emailLocal, emailDomain);
  const onEmailLocal = (v: string) => {
    setEmailLocal(v);
    clear("email", emailOk(buildEmail(v, emailDomain)));
  };
  const onEmailDomain = (v: string) => {
    setEmailDomain(v);
    clear("email", emailOk(buildEmail(emailLocal, v)));
  };

  const submit = () => {
    // 허니팟: 봇이 채우면 조용히 무시(성공 위장)
    if (honeypot.current?.value) {
      setDone(true);
      return;
    }
    // 필수 6개: 회사·기관명 / 담당자명 / 연락처 / 직급·직책 / 이메일 / 개인정보 동의.
    const next: Record<string, boolean> = {
      company: !company.trim(),
      name: !name.trim(),
      phone: !phone.trim(),
      jobTitle: !jobTitle.trim(),
      email: !emailOk(fullEmail),
      consent: !consentPrivacy,
    };
    setErrors(next);
    if (Object.values(next).some(Boolean)) return;
    // 수집 객체 구성(전송 로직 없음). 나머지 필드는 전부 선택.
    lastSubmit.current = {
      company: company.trim(),
      contactName: name.trim(),
      email: fullEmail,
      phone: phone.trim(),
      jobTitle: jobTitle.trim(),
      companySize,
      trainScale: size,
      interest: [...interests], // '법정 필수' 선택 시 자동 포함
      message: message.trim(),
      attachment: fileName,
      agreePrivacy: consentPrivacy,
      agreeMarketing,
      agreeMarketingEmail: mktEmail,
      agreeMarketingSms: mktSms,
      agreeMarketingTel: mktTel,
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

  const channelLabelStyle = { flex: "none" as const, fontSize: "13.5px" };

  return (
    <div className="form">
      <div id="form-body">
        {/* 1행: 회사·기관명* · 담당자명* */}
        <div className="frow">
          <div className={`field${errors.company ? " invalid" : ""}`}>
            <label htmlFor={`${uid}-company`}>
              회사·기관명 <span className="req">*</span>
            </label>
            <input
              id={`${uid}-company`}
              name="company"
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
              name="contactName"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                clear("name", !!e.target.value.trim());
              }}
            />
            <span className="err">담당자명을 입력해 주세요.</span>
          </div>
        </div>

        {/* 2행: 연락처* · 직급/직책* */}
        <div className="frow">
          <div className={`field${errors.phone ? " invalid" : ""}`}>
            <label htmlFor={`${uid}-phone`}>
              연락처 <span className="req">*</span>
            </label>
            <input
              id={`${uid}-phone`}
              name="phone"
              type="tel"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                clear("phone", !!e.target.value.trim());
              }}
            />
            <span className="err">연락처를 입력해 주세요.</span>
          </div>
          <div className={`field${errors.jobTitle ? " invalid" : ""}`}>
            <label htmlFor={`${uid}-jobTitle`}>
              직급/직책 <span className="req">*</span>
            </label>
            <input
              id={`${uid}-jobTitle`}
              name="jobTitle"
              type="text"
              maxLength={40}
              placeholder="예: 인사팀 과장 / 교육담당"
              value={jobTitle}
              onChange={(e) => {
                setJobTitle(e.target.value);
                clear("jobTitle", !!e.target.value.trim());
              }}
            />
            <span className="err">직급/직책을 입력해 주세요.</span>
          </div>
        </div>

        {/* 3행: 이메일* — 전체 한 줄. 아이디 @ 도메인(선택/직접입력) */}
        <div className={`field${errors.email ? " invalid" : ""}`}>
          <label htmlFor={`${uid}-email`}>
            이메일 <span className="req">*</span>
          </label>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              flexWrap: "wrap",
            }}
          >
            <input
              id={`${uid}-email`}
              name="emailLocal"
              value={emailLocal}
              placeholder="이메일 아이디"
              onChange={(e) => onEmailLocal(e.target.value)}
              style={{ flex: "1 1 160px", width: "auto", minWidth: 0 }}
            />
            <span
              aria-hidden="true"
              style={{ flex: "none", color: "var(--muted)", fontWeight: 700 }}
            >
              @
            </span>
            {emailDirect ? (
              <input
                name="emailDomain"
                value={emailDomain}
                placeholder="직접 입력 (예: company.com)"
                aria-label="이메일 도메인 직접 입력"
                onChange={(e) => onEmailDomain(e.target.value)}
                style={{ flex: "1 1 150px", width: "auto", minWidth: 0 }}
              />
            ) : (
              <select
                name="emailDomain"
                value={emailDomain}
                aria-label="이메일 도메인 선택"
                onChange={(e) => onEmailDomain(e.target.value)}
                style={{ flex: "1 1 160px", width: "auto", minWidth: 0 }}
              >
                <option value="">이메일 선택</option>
                {EMAIL_DOMAINS.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            )}
            <label
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 7,
                flex: "none",
                padding: "0 2px",
                fontSize: "13.5px",
                color: "var(--muted)",
                fontWeight: 600,
                whiteSpace: "nowrap",
                cursor: "pointer",
                lineHeight: 1,
              }}
            >
              <input
                type="checkbox"
                checked={emailDirect}
                onChange={(e) => {
                  setEmailDirect(e.target.checked);
                  onEmailDomain("");
                }}
                style={{
                  flex: "none",
                  width: 16,
                  height: 16,
                  margin: 0,
                  accentColor: "var(--p1)",
                  cursor: "pointer",
                }}
              />
              직접입력
            </label>
          </div>
          <span className="err">
            {!emailLocal.trim() || !emailDomain.trim()
              ? "이메일을 입력해 주세요."
              : "올바른 이메일을 입력해 주세요."}
          </span>
        </div>

        {/* 4행: 회사 규모(임직원 수) · 예상 교육인원 — 둘 다 선택 */}
        <div className="frow">
          <div className="field">
            <label htmlFor={`${uid}-companySize`}>회사 규모 (임직원 수)</label>
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
          </div>
          <div className="field">
            <label htmlFor={`${uid}-size`}>예상 교육인원</label>
            <select
              id={`${uid}-size`}
              name="trainScale"
              value={size}
              onChange={(e) => setSize(e.target.value)}
            >
              <option value="" disabled>
                예상 교육인원
              </option>
              {TRAIN_SCALE_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
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
            name="message"
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
            name="attachment"
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
                name="agreePrivacy"
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

          {/* 마케팅 정보 수신 동의 — 전체 동의 + 3채널 개별 */}
          <div className="consent">
            <label className="consent-main">
              <input
                ref={mktAllRef}
                type="checkbox"
                id={`${uid}-mktAll`}
                name="agreeMarketing"
                checked={agreeMarketing}
                onChange={(e) => setAllMkt(e.target.checked)}
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
          {/* TEMP: 정보보호팀 확정 문구로 교체 */}
          <p className="filehint">
            수집 항목: 이름, 전화번호, 이메일 · 마케팅(EDM·이벤트) 정보 발송 목적
          </p>
          <div
            className="agree-channels"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px 18px",
              marginTop: 8,
              marginLeft: 28,
            }}
          >
            <label className="consent-main" style={channelLabelStyle}>
              <input
                type="checkbox"
                name="agreeMarketingEmail"
                checked={mktEmail}
                onChange={(e) => setMktEmail(e.target.checked)}
              />
              이메일
            </label>
            <label className="consent-main" style={channelLabelStyle}>
              <input
                type="checkbox"
                name="agreeMarketingSms"
                checked={mktSms}
                onChange={(e) => setMktSms(e.target.checked)}
              />
              SMS(문자)
            </label>
            <label className="consent-main" style={channelLabelStyle}>
              <input
                type="checkbox"
                name="agreeMarketingTel"
                checked={mktTel}
                onChange={(e) => setMktTel(e.target.checked)}
              />
              전화(TM)
            </label>
          </div>
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
