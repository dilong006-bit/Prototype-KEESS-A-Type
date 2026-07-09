import type { ReactNode } from "react";

/**
 * P4 콘텐츠 솔루션 (/content) 콘텐츠 — 시안(keess_P4_content_solution_A_v3.0) 카피 verbatim.
 * ⚠️ 시안 CSS·색토큰(--or/--rp/--law)·버튼변형은 이식하지 않는다. 표현은 홈 디자인 시스템.
 * 34종 과정 데이터는 data/courses.ts. 카테고리 색은 --p4 파생 웜 스케일(데이터 시각화).
 */

/* ── SubNav (4축 스크롤스파이) ─────────────────────── */
export const SUBNAV_ITEMS = [
  { key: "axis-have", label: "01 보유 콘텐츠" },
  { key: "axis-legal", label: "02 법정 헌터스" },
  { key: "axis-make", label: "03 맞춤형 제작" },
  { key: "axis-net", label: "04 파트너 네트워크" },
];

/* ── HERO + 4축 맵 ─────────────────────────────────── */
export const HERO = {
  eyebrow: "Content Solution",
  title: (
    <>
      기업의 <span className="hl">모든 학습 니즈</span>를,
      <br />
      KG에듀원 기업교육
    </>
  ),
  lead: "8,426개 이상의 콘텐츠와 전문 교육 파트너 네트워크를 기반으로 직무역량부터 자격증·외국어·조직문화까지. 보유·법정·제작·파트너 4개 축으로 정리해 딜리버리합니다.",
  note: "※ 프로토타입 (A안 v3 · 4-Axis) — 보유 축은 AX·AI 34종 실데이터 탐색기, 법정·제작·파트너는 소개서 기준. 가격·결제 미노출.",
  axisMap: {
    core: { value: "8,426", label: "개 과정 보유 · 매월 100+ 신규 (소개서 기준)" },
    quad: [
      { key: "axis-have", no: "01 · LIBRARY", title: "보유 콘텐츠", meta: "7체계 · 8,426" },
      { key: "axis-legal", no: "02 · COMPLIANCE", title: "법정 헌터스", meta: "연도별 시리즈", tone: "law" },
      { key: "axis-make", no: "03 · STUDIO", title: "맞춤형 제작", meta: "스튜디오 · AI · IP" },
      { key: "axis-net", no: "04 · NETWORK", title: "파트너 네트워크", meta: "협력사 19+", tone: "net" },
    ],
  },
};

/* ── 01 보유(LIBRARY) — 스케일 + 7체계 + 탐색기 ────── */
export const AXIS_HAVE = {
  eyebrowNo: "01",
  eyebrow: "Library",
  title: "보유 콘텐츠 — 8,426개 과정, 7개 체계",
  lead: "규모에서 시작해 체계로, 다시 대표 과정으로. 필요한 학습을 한눈에 좁혀갑니다.",
  axtag: "매월 100+ 신규 제작",
  scale: {
    total: "8,426",
    totalLabel: "전체 보유 과정 (2026.06 기준)",
    chips: [
      { value: "2,574", label: "직무 공통" },
      { value: "4,146", label: "외국어" },
      { value: "1,007", label: "전문 직무" },
      { value: "494", label: "자격증" },
      { value: "143", label: "인문·교양" },
      { value: "62", label: "필수 교육" },
    ],
  },
  systemsLabel: "교육 체계 · 7분류",
  systems: [
    { no: "01", title: "직무역량", desc: "DX·AX · 경영기획 · 마케팅영업 · 인사조직 · 재무회계 · 구매생산품질" },
    { no: "02", title: "글로벌 역량", desc: "영어 · 중국어 · 일본어 · 제2외국어" },
    { no: "03", title: "비즈니스 공통역량", desc: "업무생산성 · OA·디지털 · 리더십 · 자기관리" },
    { no: "04", title: "자격 역량", desc: "국가기술자격 · IT·사무자격 · 전문자격" },
    { no: "05", title: "조직문화·기업가치", desc: "ESG · 조직문화 · 윤리경영" },
    { no: "06", title: "인문·교양", desc: "인문학 · 경제·트렌드 · 라이프디자인" },
    { no: "07", title: "법정·컴플라이언스", desc: "법정의무 · 산업안전 · 금융컴플라이언스 · 윤리·ESG", law: true },
  ],
  explorerLabel: "대표 라인업 탐색 · AX·AI 전환 34선",
  searchPlaceholder: "과정명·키워드 검색 (예: RAG, 프롬프트, HR)",
  reset: "필터 초기화",
  empty: {
    title: "조건에 맞는 과정이 없습니다",
    desc: "필터를 조정하거나 초기화해 보세요.",
  },
};

/* 카테고리 탭 + 정렬. grad는 --p4 파생 웜 스케일(데이터 시각화 포인트) */
export const CATS: { key: string; label: string }[] = [
  { key: "all", label: "전체" },
  { key: "lit", label: "AI 리터러시·전략" },
  { key: "data", label: "데이터·의사결정" },
  { key: "prod", label: "업무 생산성·문서" },
  { key: "job", label: "직무·소프트스킬 특화" },
  { key: "tool", label: "AI 도구·콘텐츠 제작" },
  { key: "dev", label: "개발·기술·보안" },
];
/** category_key → 카드 썸네일 그라디언트 (--p4 웜 스케일 6단, 신규 hex 없음) */
export const CAT_GRAD: Record<string, string> = {
  lit: "linear-gradient(135deg, var(--p4), color-mix(in srgb, var(--p4) 62%, var(--ink)))",
  data: "linear-gradient(135deg, color-mix(in srgb, var(--p4) 90%, #fff), color-mix(in srgb, var(--p4) 58%, var(--ink)))",
  prod: "linear-gradient(135deg, color-mix(in srgb, var(--p4) 82%, #fff), color-mix(in srgb, var(--p4) 68%, var(--ink)))",
  job: "linear-gradient(135deg, color-mix(in srgb, var(--p4) 75%, #fff), color-mix(in srgb, var(--p4) 55%, var(--ink)))",
  tool: "linear-gradient(135deg, var(--p4), color-mix(in srgb, var(--p4) 70%, #fff))",
  dev: "linear-gradient(135deg, color-mix(in srgb, var(--p4) 70%, var(--ink)), color-mix(in srgb, var(--p4) 45%, var(--ink)))",
};
export const SORT_OPTIONS = [
  { value: "default", label: "기본순" },
  { value: "hours-asc", label: "시간 짧은순" },
  { value: "hours-desc", label: "시간 긴순" },
  { value: "level", label: "레벨순" },
];
export const BAND_ORDER = ["숏(≤4h)", "스탠다드(5–12h)", "인텐시브(≥13h)"];
export const LEVEL_ORDER = ["입문", "실무", "심화"];

/* ── 02 법정(COMPLIANCE) ───────────────────────────── */
export const AXIS_LEGAL = {
  eyebrowNo: "02",
  eyebrow: "Compliance",
  title: (
    <>
      법정 헌터스 — <span className="hl">반복되는 의무교육</span>을 콘텐츠 경쟁력으로
    </>
  ),
  lead: "매년 새로운 컨셉의 대표 시리즈로 몰입을 높이고, 근거·대상·주기까지 책임집니다.",
  axtag: "법정의무 · 컴플라이언스",
  seriesLabel: "연도별 대표 시리즈",
  series: [
    { year: "2024", name: "뽕뽕 직장 오락실", concept: "지구오락실 컨셉" },
    { year: "2025", name: "법정마불", concept: "지구마블 세계여행 컨셉" },
    { year: "2026", name: "법정 헌터스", concept: "K-POP Demon Hunters 컨셉", current: true },
  ],
  lawLabel: "공통 법정의무교육",
  lawCards: [
    { title: "성희롱 예방 교육", basis: "남녀고용평등법 제13조", target: "전 직원", cycle: "연 1회" },
    { title: "직장 내 괴롭힘 예방", basis: "근로기준법 제76조의3", target: "전 직원", cycle: "연 1회" },
    { title: "장애인 인식개선 교육", basis: "장애인고용촉진법 제5조의2", target: "전 직원", cycle: "연 1회" },
    { title: "개인정보보호 교육", basis: "개인정보보호법 제28조", target: "취급자", cycle: "연 1회↑" },
    { title: "퇴직연금 교육", basis: "근로자퇴직급여보장법 제32조", target: "가입 근로자", cycle: "연 1회" },
  ],
  groups: ["공통 법정의무", "금융 컴플라이언스", "윤리·준법경영", "정보보호"],
  diffLabel: "경쟁사 대비 차별화",
  diffHead: ["구분", "일반 법정교육", "KG에듀원"],
  diffRows: [
    ["교육 방식", "강의형", "스토리텔링·예능형"],
    ["콘텐츠 기획", "법규 중심", "학습 몰입 중심"],
    ["최신성", "정기 개정", "매년 신규 시리즈"],
    ["학습 경험", "이수 중심", "참여 중심"],
    ["맞춤 제작", "제한적", "기업 맞춤 제작"],
  ],
  note: "※ 법적근거·주기는 대표 표기 — 실제 편성 시 최신 법령 기준으로 검증됩니다.",
};

/* ── 03 제작(STUDIO) ───────────────────────────────── */
export const AXIS_MAKE = {
  eyebrowNo: "03",
  eyebrow: "Studio",
  title: "맞춤형 제작 — 보유를 넘어, 직접 만듭니다",
  lead: "자체 스튜디오와 AI 제작 파이프라인으로 기업 전용 콘텐츠를 빠르고 효과적으로.",
  consultAxis: "맞춤형 제작",
  infraLabel: "자체 제작 인프라",
  studios: ["호리즌 스튜디오", "크로마키 스튜디오", "무빙월 시스템"],
  equipment: ["4K 카메라", "PTZ 자동추적", "방송용 조명", "무선 음향", "프롬프터"],
  pipelineLabel: "AI 제작 파이프라인",
  pipeline: [
    { no: "1", title: "촬영", desc: "전문 스튜디오 3종" },
    { no: "2", title: "AI 강사·아바타", desc: "AI 강사 생성" },
    { no: "3", title: "음성·립싱크", desc: "TTS · AI 립싱크" },
    { no: "4", title: "다국어 현지화", desc: "더빙 · 번역 · 자막" },
    { no: "5", title: "완성", desc: "포맷별 편집" },
  ],
  ipLabel: "IP 협업 사례 · 네이버·카카오 웹툰 IP",
  ips: [
    { title: "신과함께", desc: "지옥에서도 통하는 변화적응 리더십" },
    { title: "미생 the Real Story", desc: "현장형 세일즈" },
    { title: "가우스전자", desc: "리얼스토리 리더십 편" },
    { title: "운명을 보는 회사원", desc: "마음을 움직이는 설득의 기술" },
    { title: "조조코믹스", desc: "내 커리어의 주인이 되는 셀프리더십" },
    { title: "먹는 인생 X 직장", desc: "직장인 스트레스를 부탁해" },
  ],
  caseLabel: "고객 맞춤 제작 사례",
  cases: [
    { org: "KG그룹", desc: "핵심가치·윤리교육" },
    { org: "코오롱그룹", desc: "개인정보취급자 온라인 콘텐츠" },
    { org: "KG제로인", desc: "기금형 퇴직연금 시리즈 (AI)" },
  ],
};

/* ── 04 파트너(NETWORK) ────────────────────────────── */
export const AXIS_NET = {
  eyebrowNo: "04",
  eyebrow: "Network",
  title: "파트너 네트워크 — 국내 대표 교육기관과 함께",
  lead: "자체 제작에 더해, 검증된 협력사 콘텐츠를 도입해 라이브러리를 넓힙니다.",
  axtag: "협력사 19+",
  contentLabel: "콘텐츠 협력사",
  partnersContent: [
    "롯데인재개발원", "멀티캠퍼스", "휴넷", "현대경제연구원", "한국사회능력개발원",
    "고려아카데미", "인키움", "올원에듀", "알엠피", "DSBL", "겟스마트", "유밥", "알파코", "팀스파르타",
  ],
  langLabel: "외국어 협력사",
  partnersLang: ["해커스", "파고다", "다락원", "야나두", "당근영어"],
  dualLabel: "콘텐츠 수급 이원화",
  dual: {
    self: { h: "자체 제작", s: "스튜디오 · AI 파이프라인 (축 03)" },
    mid: "단일 라이브러리",
    part: { h: "파트너 도입", s: "협력사 콘텐츠 소싱 · 현지화" },
  },
  counter: { value: "100+", label: "매월 신규 콘텐츠 업데이트 — 최신 산업 트렌드·직무 변화 대응" },
};

/* ── FINAL 전환 ────────────────────────────────────── */
export const FINAL = {
  title: (
    <>
      4개 축 중 무엇이든,
      <br />
      조직 과제를 알려주시면 구성해 드립니다
    </>
  ),
  desc: "8,426개 보유 콘텐츠와 법정 시리즈·맞춤 제작·파트너 네트워크까지, 목적에 맞춰 큐레이션합니다.",
  cta: "콘텐츠 도입 문의",
  back: "4개 축 다시 보기",
};

/* ── 상담 모달(consult) ────────────────────────────── */
export const CONSULT: {
  cat: string;
  title: string;
  meta: string;
  fields: { id: string; label: string; placeholder: string; required?: boolean; type?: string; textarea?: boolean }[];
  submit: string;
  done: { title: string; desc: string };
} = {
  cat: "Inquiry",
  title: "콘텐츠 도입 문의",
  meta: "영업일 1일 내 회신",
  fields: [
    { id: "name", label: "담당자명", placeholder: "홍길동", required: true },
    { id: "org", label: "회사/기관", placeholder: "회사명", required: true },
    { id: "mail", label: "이메일", placeholder: "name@company.com", required: true, type: "email" },
    {
      id: "msg",
      label: "필요한 콘텐츠·과제",
      placeholder: "예: 전 직원 법정의무 + 실무자 생성형 AI + 기업 맞춤 제작, 3개월 내 도입",
      textarea: true,
    },
  ],
  submit: "문의 보내기",
  done: {
    title: "문의가 접수되었습니다",
    desc: "담당자가 영업일 1일 내 회신드립니다.",
  },
};

/* 상세 모달 라벨 */
export const DETAIL_LABELS = {
  overview: "과정 개요",
  objectives: "학습 목표",
  curriculum: "커리큘럼",
  tools: "활용 툴",
  book: "도서 제공",
  instructor: "대표 강사",
} as const;

export type ReactNodeType = ReactNode;
