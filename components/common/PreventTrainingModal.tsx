"use client";

import {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { toast } from "@/lib/toast";
import {
  PV_TITLE,
  MASTER,
  PV_TABS,
  type PvTab,
  INFO,
  REPORT,
  REQUIRED_LABELS,
  TOAST,
  LOOKUP,
  DETAIL_ROWS,
  PV_STATUS,
  PV_STEPS,
  REPORTS,
  addReport,
  CONSENT_PV1,
  CONSENT_PV2,
  type PvReport,
  type ConsentBlock,
} from "@/data/prevent";

/**
 * PreventTrainingModal — 부정훈련 예방/신고(3탭). 유일 기준 ref/prototype/KEESS_home_C_v26.html 1:1 이식.
 * 필수 5개(성함·전화·비밀번호·제목·내용)만. 이메일/비번확인은 값 있을 때만 검증, 동의 2개 필수.
 * 전화 자동 하이픈, 검증/성공 토스트, 조회는 전체 최신순, 상세는 pw 또는 MASTER로 해제.
 */
const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';
const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

/** v26 fmtPhone — 010-XXXX-XXXX */
function fmtPhone(v: string): string {
  const d = (v || "").replace(/\D/g, "").slice(0, 11);
  if (d.length < 4) return d;
  if (d.length < 8) return `${d.slice(0, 3)}-${d.slice(3)}`;
  if (d.length < 11) return `${d.slice(0, 3)}-${d.slice(3, 6)}-${d.slice(6)}`;
  return `${d.slice(0, 3)}-${d.slice(3, 7)}-${d.slice(7)}`;
}

/* ── 아이콘 ── */
type IconName =
  | "shield"
  | "flag"
  | "search"
  | "warn"
  | "check"
  | "user"
  | "book"
  | "pencil";
function Icon({ name, className }: { name: IconName; className: string }) {
  const p = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  return (
    <svg className={className} viewBox="0 0 24 24" {...p}>
      {name === "shield" && (
        <>
          <path d="M12 3l7 3v5c0 4.6-3.1 8.2-7 10-3.9-1.8-7-5.4-7-10V6l7-3z" />
          <path d="M9 12l2 2 4-4" />
        </>
      )}
      {name === "flag" && (
        <>
          <path d="M5 21V4" />
          <path d="M5 4h11l-1.6 4L16 12H5" />
        </>
      )}
      {name === "search" && (
        <>
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-4.2-4.2" />
        </>
      )}
      {name === "warn" && (
        <>
          <path d="M10.3 4.3 2.8 17a2 2 0 0 0 1.7 3h15a2 2 0 0 0 1.7-3L13.7 4.3a2 2 0 0 0-3.4 0z" />
          <path d="M12 9v4M12 17h.01" />
        </>
      )}
      {name === "check" && (
        <>
          <circle cx="12" cy="12" r="9" />
          <path d="M8.5 12.5l2.5 2.5 4.5-5" />
        </>
      )}
      {name === "user" && (
        <>
          <circle cx="12" cy="8" r="3.6" />
          <path d="M5 20a7 7 0 0 1 14 0" />
        </>
      )}
      {name === "book" && (
        <>
          <path d="M5 4h13a1 1 0 0 1 1 1v15H6a2 2 0 0 1-2-2V5a1 1 0 0 1 1-1z" />
          <path d="M5 17h14" />
        </>
      )}
      {name === "pencil" && (
        <>
          <path d="M12 20h8" />
          <path d="M16.5 3.5a2 2 0 0 1 3 3L8 18l-4 1 1-4z" />
        </>
      )}
    </svg>
  );
}
const TAB_ICON: Record<PvTab, IconName> = {
  info: "shield",
  report: "flag",
  lookup: "search",
};

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

type ReportForm = {
  name: string;
  phone: string;
  pw: string;
  pw2: string;
  email: string;
  role: string;
  ttype: string;
  course: string;
  org: string;
  target: string;
  title: string;
  content: string;
};
const EMPTY_FORM: ReportForm = {
  name: "",
  phone: "",
  pw: "",
  pw2: "",
  email: "",
  role: "",
  ttype: "",
  course: "",
  org: "",
  target: "",
  title: "",
  content: "",
};

export default function PreventTrainingModal({
  open,
  onClose,
  initialTab = "info",
}: {
  open: boolean;
  onClose: () => void;
  initialTab?: PvTab;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const prevFocus = useRef<HTMLElement | null>(null);
  const downOnOverlay = useRef(false);

  const [tab, setTabState] = useState<PvTab>(initialTab);

  // 신고 접수 폼
  const [form, setForm] = useState<ReportForm>(EMPTY_FORM);
  const [agree1, setAgree1] = useState(false);
  const [agree2, setAgree2] = useState(false);
  const [pv1Open, setPv1Open] = useState(false);
  const [pv2Open, setPv2Open] = useState(false);
  const [invalid, setInvalid] = useState<Set<string>>(new Set());
  const [receiptNo, setReceiptNo] = useState<string | null>(null);
  const [phoneHint, setPhoneHint] = useState(false);
  const phoneHintTimer = useRef<number | undefined>(undefined);

  // 신고 조회
  const [lkName, setLkName] = useState("");
  const [lkPhone, setLkPhone] = useState("");
  const [lkInvalid, setLkInvalid] = useState<Set<string>>(new Set());
  const [lkPhoneHint, setLkPhoneHint] = useState(false);
  const lkPhoneHintTimer = useRef<number | undefined>(undefined);
  const [results, setResults] = useState<PvReport[] | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [cardOpen, setCardOpen] = useState<Set<string>>(new Set());
  const [cardPw, setCardPw] = useState<Record<string, string>>({});
  const [cardErr, setCardErr] = useState<Record<string, string>>({});
  const [unlocked, setUnlocked] = useState<Set<string>>(new Set());

  const reduce = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* 라이브 인라인 검증: 값이 유효해지는 즉시 해당 필드 경고 제거(제출검증·필수정의 불변, 제거만) */
  const fieldValid = (
    k: string,
    f: ReportForm,
    a1: boolean,
    a2: boolean,
  ): boolean => {
    if (k === "email") return !f.email.trim() || emailOk(f.email);
    if (k === "pw2") return !f.pw2 || f.pw === f.pw2;
    if (k === "agree1") return a1;
    if (k === "agree2") return a2;
    return f[k as keyof ReportForm].trim().length > 0; // name/phone/pw/title/content
  };
  const revalidate = (f: ReportForm, a1: boolean, a2: boolean) =>
    setInvalid((prev) => {
      if (!prev.size) return prev;
      const n = new Set(prev);
      for (const k of prev) if (fieldValid(k, f, a1, a2)) n.delete(k);
      return n.size === prev.size ? prev : n;
    });

  const setField = (k: keyof ReportForm, v: string) => {
    const next = { ...form, [k]: v };
    setForm(next);
    revalidate(next, agree1, agree2);
  };

  const resetReport = useCallback(() => {
    setForm(EMPTY_FORM);
    setAgree1(false);
    setAgree2(false);
    setPv1Open(false);
    setPv2Open(false);
    setInvalid(new Set());
    setReceiptNo(null);
    setPhoneHint(false);
  }, []);

  const resetLookup = useCallback(() => {
    setLkName("");
    setLkPhone("");
    setLkInvalid(new Set());
    setLkPhoneHint(false);
    setResults(null);
    setNotFound(false);
    setCardOpen(new Set());
    setCardPw({});
    setCardErr({});
    setUnlocked(new Set());
  }, []);

  const switchTab = useCallback(
    (t: PvTab) => {
      if (t === "report" && receiptNo) resetReport();
      setTabState(t);
      if (bodyRef.current) bodyRef.current.scrollTop = 0;
    },
    [receiptNo, resetReport],
  );

  const close = useCallback(() => {
    onClose();
    window.setTimeout(() => {
      resetReport();
      resetLookup();
    }, 350);
  }, [onClose, resetReport, resetLookup]);

  // 열릴 때 초기 탭
  useEffect(() => {
    if (open) {
      setTabState(initialTab);
      if (bodyRef.current) bodyRef.current.scrollTop = 0;
    }
  }, [open, initialTab]);

  // a11y: body 잠금 · ESC · 포커스 트랩 · 포커스 복귀
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        close();
        return;
      }
      if (e.key === "Tab" && dialogRef.current) {
        const nodes = Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
        ).filter((el) => el.offsetParent !== null);
        if (!nodes.length) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    },
    [close],
  );

  useEffect(() => {
    if (!open) return;
    prevFocus.current = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKey, true);
    const t = window.setTimeout(() => {
      dialogRef.current?.querySelector<HTMLElement>(".pv-close")?.focus();
    }, 0);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", handleKey, true);
      window.clearTimeout(t);
      prevFocus.current?.focus?.();
    };
  }, [open, handleKey]);

  useEffect(
    () => () => {
      window.clearTimeout(phoneHintTimer.current);
      window.clearTimeout(lkPhoneHintTimer.current);
    },
    [],
  );

  /* ── 전화 입력(자동 하이픈 + 힌트) ── */
  const onPhoneChange = (raw: string) => {
    const bad = /[^0-9-]/.test(raw);
    const next = { ...form, phone: fmtPhone(raw) };
    setForm(next);
    revalidate(next, agree1, agree2);
    setPhoneHint(bad);
    if (bad) {
      window.clearTimeout(phoneHintTimer.current);
      phoneHintTimer.current = window.setTimeout(() => setPhoneHint(false), 2500);
    }
  };
  const onLkPhoneChange = (raw: string) => {
    const bad = /[^0-9-]/.test(raw);
    setLkPhone(fmtPhone(raw));
    setLkPhoneHint(bad);
    if (bad) {
      window.clearTimeout(lkPhoneHintTimer.current);
      lkPhoneHintTimer.current = window.setTimeout(
        () => setLkPhoneHint(false),
        2500,
      );
    }
  };

  /* ── 신고 접수 제출(v26 검증) ── */
  const genNo = () => {
    const d = new Date();
    const p = (x: number) => `0${x}`.slice(-2);
    const r = `000${Math.floor(Math.random() * 9000 + 1000)}`.slice(-4);
    return `KR-${d.getFullYear()}${p(d.getMonth() + 1)}${p(d.getDate())}-${r}`;
  };

  const submitReport = () => {
    const bad = new Set<string>();
    const miss: string[] = [];
    (["name", "phone", "pw", "title", "content"] as const).forEach((k) => {
      if (!form[k].trim()) {
        bad.add(k);
        miss.push(REQUIRED_LABELS[k]);
      }
    });
    const email = form.email.trim();
    if (email && !emailOk(email)) {
      bad.add("email");
      miss.push(TOAST.emailFormat);
    }
    if (form.pw2 && form.pw !== form.pw2) {
      bad.add("pw2");
      miss.push(TOAST.pwConfirm);
    }
    if (!agree1 || !agree2) {
      if (!agree1) bad.add("agree1");
      if (!agree2) bad.add("agree2");
      miss.push(TOAST.consent);
    }
    setInvalid(bad);
    if (miss.length) {
      toast(miss.join(", ") + TOAST.requiredSuffix, "error");
      requestAnimationFrame(() =>
        bodyRef.current
          ?.querySelector(".field.invalid, .consent.invalid")
          ?.scrollIntoView({
            behavior: reduce() ? "auto" : "smooth",
            block: "center",
          }),
      );
      return;
    }
    const d = new Date();
    const dd = `${d.getFullYear()}-${`0${d.getMonth() + 1}`.slice(-2)}-${`0${d.getDate()}`.slice(-2)}`;
    const no = genNo();
    addReport({
      no,
      name: form.name.trim(),
      phone: form.phone.trim(),
      pw: form.pw,
      email: form.email.trim(),
      role: form.role,
      ttype: form.ttype,
      course: form.course.trim(),
      org: form.org.trim(),
      target: form.target,
      title: form.title.trim(),
      content: form.content.trim(),
      status: 0,
      date: dd,
    });
    setReceiptNo(no);
    if (bodyRef.current) bodyRef.current.scrollTop = 0;
    toast(TOAST.submitOk);
  };

  /* ── 신고 조회(전체 최신순, 필터 없음) ── */
  const doLookup = () => {
    const bad = new Set<string>();
    if (!lkName.trim()) bad.add("lkName");
    if (!lkPhone.trim()) bad.add("lkPhone");
    setLkInvalid(bad);
    if (!lkName.trim() || !lkPhone.trim()) {
      toast(TOAST.lookupNeed, "error");
      return;
    }
    const recs = [...REPORTS].reverse();
    setCardOpen(new Set());
    setCardPw({});
    setCardErr({});
    setUnlocked(new Set());
    if (!recs.length) {
      setResults(null);
      setNotFound(true);
      return;
    }
    setNotFound(false);
    setResults(recs);
  };

  const backToLookup = () => {
    setResults(null);
    setNotFound(false);
  };

  const toggleCard = (no: string) =>
    setCardOpen((prev) => {
      const n = new Set(prev);
      if (n.has(no)) n.delete(no);
      else n.add(no);
      return n;
    });

  const verifyCard = (rec: PvReport) => {
    const v = cardPw[rec.no] ?? "";
    if (v !== rec.pw && v !== MASTER) {
      setCardErr((e) => ({ ...e, [rec.no]: LOOKUP.pwErr }));
      return;
    }
    setCardErr((e) => ({ ...e, [rec.no]: "" }));
    setUnlocked((prev) => new Set(prev).add(rec.no));
  };

  const inv = (id: string) => (invalid.has(id) ? " invalid" : "");

  /* ── 예방 안내 ── */
  const InfoPane = (
    <div className="pv-pane on" id="pv-pane-info">
      <p className="pv-lead">{INFO.lead}</p>
      <h4 className="pv-h">
        <Icon name="warn" className="pvi" />
        {INFO.whatTitle}
      </h4>
      <p>{INFO.whatBody}</p>
      <p className="pv-warn">
        <Icon name="warn" className="pvi-warn" />
        <span>{INFO.warn}</span>
      </p>
      <h4 className="pv-h">
        <Icon name="shield" className="pvi" />
        {INFO.verifyTitle}
      </h4>
      <table className="pv-table">
        <thead>
          <tr>
            <th>학습 단계</th>
            <th>본인 확인 방식</th>
          </tr>
        </thead>
        <tbody>
          {INFO.verifyTable.map((r) => (
            <tr key={r.step}>
              <td>{r.step}</td>
              <td>{r.method}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h4 className="pv-h">
        <Icon name="search" className="pvi" />
        {INFO.criteriaTitle}
      </h4>
      <ul className="pv-list">
        {INFO.criteria.map((c) => (
          <li key={c}>{c}</li>
        ))}
      </ul>
      <p className="pv-note">{INFO.note}</p>
      <h4 className="pv-h">
        <Icon name="check" className="pvi" />
        {INFO.promiseTitle}
      </h4>
      <ul className="pv-list">
        {INFO.promise.map((c) => (
          <li key={c}>{c}</li>
        ))}
      </ul>
      <div className="pv-cta">
        <div>
          <b>{INFO.ctaText}</b>
        </div>
        <button
          className="btn btn-ink"
          type="button"
          id="pv-goto-report"
          onClick={() => switchTab("report")}
        >
          <Icon name="flag" className="pvi-sm" />
          {INFO.ctaBtn}
        </button>
      </div>
    </div>
  );

  /* ── 신고 접수 ── */
  const fld = (
    key: keyof ReportForm,
    domId: string,
    label: ReactNode,
    node: ReactNode,
    extra?: ReactNode,
  ) => (
    <div className={`field${inv(key)}`}>
      <label htmlFor={domId}>{label}</label>
      {node}
      {extra}
      <span className="err">{REPORT.errRequired}</span>
    </div>
  );
  const req = <span className="req">*</span>;

  const ReportPane = (
    <div className="pv-pane on" id="pv-pane-report">
      {receiptNo ? (
        <div className="pv-done show" id="pv-done">
          <div className="check">
            <Icon name="check" className="pvi-done" />
          </div>
          <h4>{REPORT.done.title}</h4>
          <p>{REPORT.done.desc}</p>
          <div className="pv-receipt">
            <span>{REPORT.done.receiptLabel}</span>
            <b id="pv-receipt-no">{receiptNo}</b>
          </div>
          <p className="pv-receipt-note">{REPORT.done.receiptNote}</p>
          <div className="pv-done-cta">
            <button
              className="btn btn-ink"
              type="button"
              id="pv-done-lookup"
              onClick={() => {
                setLkName(form.name.trim());
                setLkPhone(form.phone.trim());
                switchTab("lookup");
              }}
            >
              <Icon name="search" className="pvi-sm" />
              {REPORT.done.lookupBtn}
            </button>
            <button className="btn-line-dark" type="button" onClick={close}>
              {REPORT.done.close}
            </button>
          </div>
        </div>
      ) : (
        <div id="pv-report-form">
          <div className="pv-toplink">
            <button
              type="button"
              className="pv-link"
              id="pv-to-lookup"
              onClick={() => switchTab("lookup")}
            >
              <Icon name="search" className="pvi-sm" />
              {REPORT.toLookup}
            </button>
          </div>
          <p className="pv-lead">{REPORT.lead}</p>

          {/* 신고자 정보 */}
          <div className="pv-fs">
            <div className="pv-fs-head">
              <span className="pv-fs-t">
                <Icon name="user" className="pvi-sm" />
                {REPORT.reporterTitle}
              </span>
              <span className="pv-fs-d">{REPORT.reporterDesc}</span>
            </div>
            <div className="pv-frow">
              {fld(
                "name",
                "pv-name",
                <>성함 {req}</>,
                <input
                  id="pv-name"
                  type="text"
                  value={form.name}
                  onChange={(e) => setField("name", e.target.value)}
                />,
              )}
              {fld(
                "phone",
                "pv-phone",
                <>전화번호 {req}</>,
                <input
                  id="pv-phone"
                  type="tel"
                  inputMode="numeric"
                  placeholder="010-0000-0000"
                  value={form.phone}
                  onChange={(e) => onPhoneChange(e.target.value)}
                />,
                phoneHint && (
                  <span className="phone-hint">숫자만 입력할 수 있어요.</span>
                ),
              )}
            </div>
            <div className="pv-frow">
              {fld(
                "pw",
                "pv-pw",
                <>접수 비밀번호 {req}</>,
                <input
                  id="pv-pw"
                  type="password"
                  value={form.pw}
                  onChange={(e) => setField("pw", e.target.value)}
                />,
                <span className="fnote">{REPORT.pwNote}</span>,
              )}
              {fld(
                "pw2",
                "pv-pw2",
                "비밀번호 확인",
                <input
                  id="pv-pw2"
                  type="password"
                  value={form.pw2}
                  onChange={(e) => setField("pw2", e.target.value)}
                />,
              )}
            </div>
            <div className="pv-frow">
              {fld(
                "email",
                "pv-email",
                "이메일",
                <input
                  id="pv-email"
                  type="email"
                  placeholder="name@company.com"
                  value={form.email}
                  onChange={(e) => setField("email", e.target.value)}
                />,
              )}
              {fld(
                "role",
                "pv-role",
                "신고자 신분",
                <select
                  id="pv-role"
                  value={form.role}
                  onChange={(e) => setField("role", e.target.value)}
                >
                  <option value="">선택</option>
                  {REPORT.roleOptions.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>,
              )}
            </div>
          </div>

          {/* 훈련 정보 */}
          <div className="pv-fs">
            <span className="pv-fs-t">
              <Icon name="book" className="pvi-sm" />
              {REPORT.trainingTitle}
            </span>
            <div className="pv-frow">
              {fld(
                "ttype",
                "pv-ttype",
                "훈련 구분",
                <select
                  id="pv-ttype"
                  value={form.ttype}
                  onChange={(e) => setField("ttype", e.target.value)}
                >
                  <option value="">선택</option>
                  {REPORT.ttypeOptions.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>,
              )}
              {fld(
                "course",
                "pv-course",
                "훈련 과정명",
                <input
                  id="pv-course"
                  type="text"
                  value={form.course}
                  onChange={(e) => setField("course", e.target.value)}
                />,
              )}
            </div>
            {fld(
              "org",
              "pv-org",
              "훈련 기관",
              <input
                id="pv-org"
                type="text"
                value={form.org}
                onChange={(e) => setField("org", e.target.value)}
              />,
            )}
          </div>

          {/* 신고 내용 */}
          <div className="pv-fs">
            <span className="pv-fs-t">
              <Icon name="pencil" className="pvi-sm" />
              {REPORT.contentTitle}
            </span>
            {fld(
              "target",
              "pv-target",
              "신고 대상",
              <select
                id="pv-target"
                value={form.target}
                onChange={(e) => setField("target", e.target.value)}
              >
                <option value="">선택</option>
                {REPORT.targetOptions.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>,
            )}
            {fld(
              "title",
              "pv-title",
              <>제목 {req}</>,
              <input
                id="pv-title"
                type="text"
                value={form.title}
                onChange={(e) => setField("title", e.target.value)}
              />,
            )}
            {fld(
              "content",
              "pv-content",
              <>내용 {req}</>,
              <textarea
                id="pv-content"
                rows={4}
                placeholder={REPORT.contentPlaceholder}
                value={form.content}
                onChange={(e) => setField("content", e.target.value)}
              />,
            )}
          </div>

          {/* 동의 */}
          <div className="consent-group" style={{ marginTop: 8 }}>
            <div
              className={`consent${invalid.has("agree1") ? " invalid" : ""}`}
              id="pv-c1-wrap"
            >
              <label className="consent-main">
                <input
                  type="checkbox"
                  id="pv-agree1"
                  checked={agree1}
                  onChange={(e) => {
                    setAgree1(e.target.checked);
                    revalidate(form, e.target.checked, agree2);
                  }}
                />
                <span>
                  <b className="c-tag req-tag">필수</b> 개인정보 수집·이용 안내
                </span>
              </label>
              <button
                type="button"
                className="consent-view"
                aria-expanded={pv1Open}
                onClick={() => setPv1Open((v) => !v)}
              >
                {pv1Open ? "접기" : "전문 보기"}
              </button>
            </div>
            <div
              className={`consent-text${pv1Open ? " open" : ""}`}
              style={{ maxHeight: pv1Open ? 320 : 0 }}
            >
              <ConsentText blocks={CONSENT_PV1} />
            </div>

            <div
              className={`consent${invalid.has("agree2") ? " invalid" : ""}`}
              id="pv-c2-wrap"
            >
              <label className="consent-main">
                <input
                  type="checkbox"
                  id="pv-agree2"
                  checked={agree2}
                  onChange={(e) => {
                    setAgree2(e.target.checked);
                    revalidate(form, agree1, e.target.checked);
                  }}
                />
                <span>
                  <b className="c-tag req-tag">필수</b> 개인정보 제3자 제공
                </span>
              </label>
              <button
                type="button"
                className="consent-view"
                aria-expanded={pv2Open}
                onClick={() => setPv2Open((v) => !v)}
              >
                {pv2Open ? "접기" : "전문 보기"}
              </button>
            </div>
            <div
              className={`consent-text${pv2Open ? " open" : ""}`}
              style={{ maxHeight: pv2Open ? 320 : 0 }}
            >
              <ConsentText blocks={CONSENT_PV2} />
            </div>
          </div>

          <button
            className="btn btn-ink"
            id="pv-submit"
            type="button"
            style={{ width: "100%", marginTop: 20 }}
            onClick={submitReport}
          >
            {REPORT.submit}
          </button>
        </div>
      )}
    </div>
  );

  /* ── 신고 조회 ── */
  const StepBar = ({ status }: { status: number }) => (
    <div className="pv-steps">
      {PV_STEPS.map((s, k) => (
        <Fragment key={s}>
          {k > 0 && <span className="pv-step-arrow">›</span>}
          <span className={`pv-step${k <= Math.min(status, 2) ? " on" : ""}`}>
            <span className="dot" />
            {s}
          </span>
        </Fragment>
      ))}
    </div>
  );

  const detailJsx = (rec: PvReport) => (
    <>
      <dl className="pv-dl2">
        {DETAIL_ROWS.map((row) => {
          let dd: string;
          if (row.key === "reporter")
            dd = `${rec.name || ""} · ${rec.phone || ""}`;
          else dd = (rec as unknown as Record<string, string>)[row.key] || "-";
          return (
            <Fragment key={row.label}>
              <dt>{row.label}</dt>
              <dd className={row.content ? "pv-dd-content" : undefined}>{dd}</dd>
            </Fragment>
          );
        })}
      </dl>
      {rec.status < 3 && <StepBar status={rec.status} />}
      {rec.answer && (
        <div className="pv-answer">
          <b>{LOOKUP.answerLabel}</b>
          <p>{rec.answer}</p>
        </div>
      )}
    </>
  );

  const LookupPane = (
    <div className="pv-pane on" id="pv-pane-lookup">
      <p className="pv-lead">
        접수 시 입력하신 <b>이름</b>과 <b>연락처</b>로 신고 내역을 조회하실 수
        있습니다. 상세 내용은 신고마다 설정한 <b>비밀번호</b>로 확인합니다.
      </p>

      {results === null && !notFound && (
        <div id="pv-lookup-form">
          <div className="pv-fs">
            <div className="pv-frow">
              <div
                className={`field${lkInvalid.has("lkName") ? " invalid" : ""}`}
              >
                <label htmlFor="pv-lk-name">이름 {req}</label>
                <input
                  id="pv-lk-name"
                  type="text"
                  placeholder={LOOKUP.namePlaceholder}
                  value={lkName}
                  onChange={(e) => setLkName(e.target.value)}
                />
                <span className="err">{REPORT.errRequired}</span>
              </div>
              <div
                className={`field${lkInvalid.has("lkPhone") ? " invalid" : ""}`}
              >
                <label htmlFor="pv-lk-phone">연락처 {req}</label>
                <input
                  id="pv-lk-phone"
                  type="tel"
                  inputMode="numeric"
                  placeholder={LOOKUP.phonePlaceholder}
                  value={lkPhone}
                  onChange={(e) => onLkPhoneChange(e.target.value)}
                />
                {lkPhoneHint && (
                  <span className="phone-hint">숫자만 입력할 수 있어요.</span>
                )}
                <span className="err">{REPORT.errRequired}</span>
              </div>
            </div>
          </div>
          <button
            className="btn btn-ink"
            id="pv-lookup-btn"
            type="button"
            style={{ width: "100%", marginTop: 6 }}
            onClick={doLookup}
          >
            {LOOKUP.submit}
          </button>
        </div>
      )}

      {notFound && <div className="pv-notfound">{LOOKUP.notfound}</div>}

      {results && (
        <div id="pv-lookup-result" aria-live="polite">
          <div className="pv-list-head">
            <span>
              {LOOKUP.listHeadPre}
              <b>{results.length}</b>
              {LOOKUP.listHeadPost}
            </span>
            <button className="pv-link" type="button" onClick={backToLookup}>
              {LOOKUP.back}
            </button>
          </div>
          {results.map((rec) => {
            const opened = cardOpen.has(rec.no);
            const isUnlocked = unlocked.has(rec.no);
            const preview =
              rec.content.length > 52
                ? `${rec.content.slice(0, 52)}…`
                : rec.content;
            return (
              <div className={`pv-rcard${opened ? " open" : ""}`} key={rec.no}>
                <div className="pv-rc-head" onClick={() => toggleCard(rec.no)}>
                  <div className="pv-rc-top">
                    <span className="pv-rc-no">{rec.no}</span>
                    <span className={`pv-badge s${rec.status}`}>
                      {PV_STATUS[rec.status]}
                    </span>
                    <span className="pv-rc-chev">›</span>
                  </div>
                  <div className="pv-rc-title">{rec.title}</div>
                  <div className="pv-rc-meta">
                    {(rec.ttype || LOOKUP.metaFallback) +
                      " · " +
                      rec.date +
                      LOOKUP.metaSuffix}
                  </div>
                  <div className="pv-rc-preview">{preview}</div>
                </div>
                <div className={`pv-rc-detail${opened ? " open" : ""}`}>
                  {!isUnlocked ? (
                    <div className="pv-rc-pw">
                      <label>{LOOKUP.pwLabel}</label>
                      <div className="pv-rc-pwrow">
                        <input
                          type="password"
                          placeholder={LOOKUP.pwPlaceholder}
                          value={cardPw[rec.no] ?? ""}
                          onChange={(e) =>
                            setCardPw((m) => ({ ...m, [rec.no]: e.target.value }))
                          }
                          onKeyDown={(e) => {
                            if (e.key === "Enter") verifyCard(rec);
                          }}
                        />
                        <button
                          className="btn-line-dark"
                          type="button"
                          onClick={() => verifyCard(rec)}
                        >
                          {LOOKUP.pwConfirm}
                        </button>
                      </div>
                      <span className="pv-rc-err">{cardErr[rec.no] ?? ""}</span>
                    </div>
                  ) : (
                    <div className="pv-rc-content">{detailJsx(rec)}</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );

  return (
    <div
      className={`pv-overlay${open ? " open" : ""}`}
      id="prevent-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pv-modal-title"
      aria-hidden={!open}
      onPointerDown={(e) => {
        downOnOverlay.current = e.target === e.currentTarget;
      }}
      onPointerUp={(e) => {
        if (e.target === e.currentTarget && downOnOverlay.current) close();
        downOnOverlay.current = false;
      }}
    >
      <div className="pv-dialog" ref={dialogRef}>
        <div className="pv-head">
          <h3 id="pv-modal-title">{PV_TITLE}</h3>
          <button
            className="pv-close"
            type="button"
            aria-label="닫기"
            onClick={close}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
        <div className="pv-tabs" role="tablist">
          {PV_TABS.map((t) => (
            <button
              key={t.key}
              className={`pv-tab${tab === t.key ? " on" : ""}`}
              type="button"
              role="tab"
              aria-selected={tab === t.key}
              onClick={() => switchTab(t.key)}
            >
              <Icon name={TAB_ICON[t.key]} className="pvi-sm" />
              {t.label}
            </button>
          ))}
        </div>
        <div className="pv-body" ref={bodyRef}>
          {tab === "info" && InfoPane}
          {tab === "report" && ReportPane}
          {tab === "lookup" && LookupPane}
        </div>
      </div>
    </div>
  );
}
