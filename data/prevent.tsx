/**
 * 부정훈련 예방/신고 모달 콘텐츠 — 유일 기준: ref/prototype/KEESS_home_C_v26.html.
 * 카피·데이터·검증 규칙을 v26에서 1:1 이식. 백엔드 없음: 신고는 모듈레벨 배열로 세션 유지
 * (원본 window.__keessReports 대응). 필수 항목은 성함·전화번호·비밀번호·제목·내용 5개뿐.
 */

export const PV_TITLE = "부정훈련 예방 및 신고";
/** 마스터 비밀번호 — 조회 상세 잠금 해제 시 해당 신고 pw 또는 이 값이면 열림(v26) */
export const MASTER = "eduoneno1!";

/* ── 탭 ── */
export const PV_TABS = [
  { key: "info", label: "예방 안내" },
  { key: "report", label: "신고 접수" },
  { key: "lookup", label: "신고 조회" },
] as const;
export type PvTab = (typeof PV_TABS)[number]["key"];

/* ── 예방 안내(info) ── */
export const INFO = {
  lead: "KG에듀원은 부정훈련을 철저히 관리합니다. 부정훈련이 적발되면 진도율·평가점수와 관계없이 미수료 처리되며, 고용보험상의 정부지원을 받을 수 없습니다.",
  whatTitle: "부정훈련이란?",
  whatBody:
    "「국민 평생 직업능력 개발법」에 따른 직업능력개발훈련을 법과 규정을 벗어난 방법으로 수행하는 것을 말합니다. 대표적으로 훈련생이 아닌 타인을 대리 수강·평가, 훈련비 지원금 리베이트 거래, 승인 내용과 다르게 운영하는 훈련내용 미준수 등이 있습니다.",
  warn: "정부 및 위탁훈련기관·기업·개인은 훈련비 지원금 징수(부정 수급액 최대 5배)와 지원 제한 등 행정 처분 및 형사처벌을 받을 수 있습니다.",
  verifyTitle: "본인 수강 확인",
  verifyTable: [
    { step: "최초 로그인", method: "휴대폰 · I-PIN" },
    { step: "과정 시작 전 최초 1회", method: "mOTP · 공동인증서 · 휴대폰 · I-PIN" },
    { step: "1일 1회 진도 학습 · 평가 · 과제", method: "mOTP · 휴대폰 · I-PIN" },
  ],
  criteriaTitle: "부정훈련 적발 기준",
  criteria: [
    "연속된 시간에 동일 IP·PC 정보에서 평가를 제출한 경우",
    "접속자의 FDS 정보가 동일한 경우",
    "사업자 정보가 다르지만 동일 IP에서 수강·평가한 경우",
  ],
  note: "위 항목 중 하나라도 해당하면 부정훈련 검출 프로그램을 통해 절차를 진행합니다.",
  promiseTitle: "KG에듀원의 부정훈련 방지 약속",
  promise: [
    "훈련생의 진도·평가를 담당자나 외부 인원이 대신 수행하지 않습니다.",
    "수료 기준에 미달한 훈련생을 임의로 수료 처리하지 않습니다.",
    "승인받은 콘텐츠·교재와 평가문항으로 진행하며, 평가 전 모범답안을 제공하지 않습니다.",
    "경력·학력이 인증된 자격 있는 교·강사가 역할을 수행합니다.",
    "수강을 강요하지 않으며, 대리수강·모사답안 방지를 위해 상시 모니터링합니다.",
  ],
  ctaText: "부정훈련을 발견하셨나요?",
  ctaBtn: "부정훈련 신고하기",
};

/* ── 신고 접수(report) ── */
export const REPORT = {
  toLookup: "이미 신고하셨나요? 신고 조회하기",
  lead: "KG에듀원은 부정·부실훈련을 줄이고 올바른 훈련문화를 만들기 위해 노력합니다. 아래로 신고 내용을 남겨 주시면 접수·처리되며, 입력하신 정보는 비공개로 처리됩니다.",
  reporterTitle: "신고자 정보",
  reporterDesc: "입력 정보는 비공개 처리됩니다",
  pwNote: "상세 조회 시 사용됩니다",
  roleOptions: ["훈련생", "훈련강사", "훈련기관 관계자", "기업 관계자", "기타"],
  trainingTitle: "훈련 정보",
  ttypeOptions: [
    "사업주훈련",
    "디지털아카이브",
    "기업훈련카드",
    "국민내일배움카드",
    "기타",
  ],
  contentTitle: "신고 내용",
  targetOptions: ["훈련생", "훈련강사", "훈련내용", "기타"],
  contentPlaceholder: "신고 내용을 구체적으로 작성해 주세요.",
  submit: "신고 접수",
  errRequired: "필수 항목을 확인해 주세요.",
  done: {
    title: "신고가 접수되었습니다.",
    desc: "담당자가 확인 후 절차를 진행합니다. 접수 시 입력하신 이름·연락처로 신고 내역을 조회하실 수 있습니다.",
    receiptLabel: "접수번호",
    receiptNote:
      "이름·연락처로 목록을 조회하고, 상세 내용은 이 신고의 비밀번호로 확인합니다.",
    lookupBtn: "신고 조회하기",
    close: "닫기",
  },
};

/** 검증 필수 항목 라벨(토스트) — v26 LBL. 이 5개만 필수. */
export const REQUIRED_LABELS: Record<string, string> = {
  name: "성함",
  phone: "전화번호",
  pw: "비밀번호",
  title: "제목",
  content: "내용",
};
export const TOAST = {
  requiredSuffix: " 항목을 확인해 주세요.",
  emailFormat: "이메일 형식",
  pwConfirm: "비밀번호 확인",
  consent: "개인정보 동의",
  submitOk: "신고가 정상적으로 접수되었습니다.",
  lookupNeed: "이름과 연락처를 입력해 주세요.",
};

/* 개인정보 동의 전문 */
export type ConsentBlock = { b?: string; t?: string };
export const CONSENT_PV1: ConsentBlock[] = [
  { b: "개인정보 수집·이용 안내 (필수)" },
  { t: "부정훈련 신고센터를 통해 신고 접수 시 아래와 같이 개인정보를 수집·이용합니다." },
  { b: "수집 항목", t: "(필수) 신고자의 성명, 휴대폰번호, 이메일, 신고자 신분" },
  { b: "수집·이용 목적", t: "신고의 접수·처리 등 소관 업무 수행" },
  {
    b: "보유·이용 기간",
    t: "신고 접수와 관련해 수집한 개인정보는 10년간 기록·보존되며, 기간 경과 시 관련 법령에 따라 파기합니다.",
  },
];
export const CONSENT_PV2: ConsentBlock[] = [
  { b: "개인정보의 제3자 제공 (필수)" },
  { b: "제공받는 기관", t: "훈련기관 주소 기준 관할 고용복지플러스센터, 고용노동부" },
  { b: "제공 목적", t: "부정훈련 신고사항 검토 및 지도점검 등 훈련품질관리 업무" },
  { b: "제공 항목", t: "신고자의 성명, 휴대폰번호, 신고자 신분" },
  {
    b: "보유·이용 기간",
    t: "관련 법령에 따라 10년간 기록·보존되며, 기간 경과 시 파기합니다.",
  },
];

/* ── 신고 조회(lookup) ── */
export const LOOKUP = {
  lead: "접수 시 입력하신 이름과 연락처로 신고 내역을 조회하실 수 있습니다. 상세 내용은 신고마다 설정한 비밀번호로 확인합니다.",
  namePlaceholder: "홍길동",
  phonePlaceholder: "010-1234-5678",
  submit: "신고 내역 조회",
  notfound: "조회할 신고 내역이 없습니다.",
  listHeadPre: "총 ",
  listHeadPost: "건의 신고 내역",
  back: "← 다시 조회",
  pwLabel: "이 신고의 비밀번호",
  pwPlaceholder: "접수 시 설정한 비밀번호",
  pwConfirm: "확인",
  pwErr: "비밀번호가 일치하지 않습니다.",
  metaFallback: "훈련구분 미지정",
  metaSuffix: " 접수",
  answerLabel: "처리 결과",
};
/** 상세(pv-dl2) 라벨·순서 — v26 detailHtml. key "reporter"는 name·phone 결합(컴포넌트 처리) */
export const DETAIL_ROWS: { key: string; label: string; content?: boolean }[] = [
  { key: "no", label: "접수번호" },
  { key: "date", label: "접수일" },
  { key: "reporter", label: "신고자" },
  { key: "email", label: "이메일" },
  { key: "role", label: "신고자 신분" },
  { key: "ttype", label: "훈련 구분" },
  { key: "course", label: "훈련 과정명" },
  { key: "org", label: "훈련 기관" },
  { key: "target", label: "신고 대상" },
  { key: "title", label: "제목" },
  { key: "content", label: "내용", content: true },
];

/* 신고 상태 라벨(배지) / 진행 스텝 */
export const PV_STATUS = ["접수 완료", "검토 중", "처리 완료", "반려"];
export const PV_STEPS = ["접수 완료", "검토 중", "처리 완료"];

/* ── 신고 데이터(모듈레벨 배열, 세션 유지) — v26 window.__keessReports 1:1 ── */
export type PvReport = {
  no: string;
  name: string;
  phone: string;
  pw: string;
  email?: string;
  role?: string;
  ttype?: string;
  course?: string;
  org?: string;
  target?: string;
  title: string;
  content: string;
  status: number;
  date: string;
  answer?: string;
};

export const REPORTS: PvReport[] = [
  {
    no: "KR-20260701-0012",
    name: "홍길동",
    phone: "010-1234-5678",
    pw: "test",
    email: "hong@example.com",
    role: "훈련생",
    ttype: "국민내일배움카드",
    course: "데이터 분석 실무 과정",
    org: "○○직업교육원",
    target: "훈련내용",
    title: "훈련 미실시 의심 신고",
    content:
      "승인된 차시와 다르게 운영된 정황이 있어 신고합니다. 실제 강의가 진행되지 않은 회차가 있는 것으로 보입니다.",
    status: 1,
    date: "2026-07-01",
  },
  {
    no: "KR-20260628-0007",
    name: "홍길동",
    phone: "010-1234-5678",
    pw: "test2",
    email: "hong@example.com",
    role: "훈련생",
    ttype: "사업주훈련",
    course: "리더십 향상 과정",
    org: "△△HRD센터",
    target: "훈련강사",
    title: "대리 수강 정황 신고",
    content: "타인이 대신 수강한 것으로 보이는 정황이 있어 신고합니다.",
    status: 2,
    date: "2026-06-28",
    answer:
      "접수 내용 확인 후 해당 기관에 대한 지도점검을 완료하였습니다. 협조해 주셔서 감사합니다.",
  },
];

export function addReport(r: PvReport): void {
  REPORTS.push(r);
}
