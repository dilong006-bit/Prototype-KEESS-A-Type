import type { ReactNode } from "react";

/**
 * P3 HRD 통합 솔루션 (/hrd) 콘텐츠 — 시안(keess_P3_hrd_A_integrated_v1.6)의
 * 카피/데이터만 verbatim 이식 + 정부지원(#gov)은 SPEC_P3_v2.0 기준.
 * ⚠️ 시안 CSS·색토큰·버튼변형은 이식하지 않는다. 표현은 홈 디자인 시스템으로 재구성.
 */

/* ── SubNav (정부지원 포함) ────────────────────────── */
export const SUBNAV_ITEMS = [
  { key: "pain", label: "고민" },
  { key: "solution", label: "3축 솔루션" },
  { key: "system", label: "시스템" },
  { key: "ops", label: "운영" },
  { key: "studio", label: "제작" },
  { key: "cases", label: "도입사례" },
  { key: "kgesa", label: "차세대" },
  { key: "process", label: "도입절차" },
  { key: "gov", label: "정부지원" },
  { key: "inq", label: "도입문의" },
];

/* ── HERO ──────────────────────────────────────────── */
export const HERO = {
  eyebrow: "KG에듀원 HRD 통합 솔루션",
  title: (
    <>
      여러 곳에 맡기던 HRD를,
      <br />
      <span className="g">한 곳에서</span>
    </>
  ),
  titlePlain: "여러 곳에 맡기던 HRD를, 한 곳에서",
  sub: "시스템·운영·콘텐츠 제작을 하나로 — 벤더를 늘리지 않고, 검증된 인프라로 통합 운영합니다.",
  strip: ["시스템·운영·제작 3축 풀스택", "30+사 운영 실적", "자체 스튜디오 3개소"],
  stats: [
    { value: "3축", label: "풀스택" },
    { value: "30+사", label: "운영 실적" },
  ],
  visualLabel: {
    t: "HRD Total Solution",
    s: "시스템 · 운영 · 제작 · 차세대 시스템",
  },
  image:
    "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1600&auto=format&fit=crop",
};

/* ── PAIN → SOLUTION 매핑(4행) ─────────────────────── */
export type PainRow = {
  pain: ReactNode;
  solutionTitle: string;
  solutionDesc: string;
};
export const PAIN = {
  eyebrow: "HRD 담당자의 현실 — 그리고 KG의 답",
  title: (
    <>
      따로따로 관리하던 일, <span className="g">한 번에 풀립니다</span>
    </>
  ),
  rows: [
    {
      pain: (
        <>
          &quot;LMS 업체, 운영 대행, 영상 제작사를 <b>따로따로</b> 관리합니다&quot;
        </>
      ),
      solutionTitle: "하나의 창구로 통합",
      solutionDesc: "시스템·운영·제작을 KG 한 곳에서",
    },
    {
      pain: (
        <>
          &quot;업체마다 말이 달라 <b>문제 생기면 책임 소재</b>가 불분명합니다&quot;
        </>
      ),
      solutionTitle: "KG 단일 책임 운영",
      solutionDesc: "3단계 대응·총괄 관리로 KG가 끝까지",
    },
    {
      pain: (
        <>
          &quot;콘텐츠 제작 단가는 높은데 <b>품질·일정</b>은 들쭉날쭉합니다&quot;
        </>
      ),
      solutionTitle: "자체 스튜디오로 통제",
      solutionDesc: "인하우스 제작팀 · 단가·일정 예측 가능",
    },
    {
      pain: (
        <>
          &quot;학습자 화면 하나 바꾸는 데도 <b>매번 개발 요청</b>을 넣어야 합니다&quot;
        </>
      ),
      solutionTitle: "담당자가 직접 (KGESA)",
      solutionDesc: "개발 없이 클릭으로 화면 구성",
    },
  ] as PainRow[],
};

/* ── SOLUTION 3축 ──────────────────────────────────── */
export type Axis = {
  kind: string;
  title: string;
  desc: string;
  tag: string;
  highlight?: boolean;
};
export const SOLUTION = {
  eyebrow: "THE SOLUTION · 3축 풀스택",
  title: (
    <>
      필요한 것만 골라도, <span className="g">전부 합쳐도</span>
    </>
  ),
  lead: (
    <>
      위탁운영부터 연수원 구축, 콘텐츠 제작까지 —{" "}
      <span className="g">HRD의 모든 것</span>
    </>
  ),
  axes: [
    {
      kind: "시스템",
      title: "맞춤형 HRD 연수원",
      desc: "LMS + 전용 APP · 하이브리드 학습환경",
      tag: "단독 도입 가능",
    },
    {
      kind: "운영",
      title: "HRD 운영 위탁",
      desc: "HOW 7축 · 30+사 운영 실적",
      tag: "단독 도입 가능",
    },
    {
      kind: "제작",
      title: "콘텐츠 제작 스튜디오",
      desc: "자체 3개소 · 촬영·제작팀 (KG 특장점)",
      tag: "단독 도입 가능",
      highlight: true,
    },
  ] as Axis[],
  note: "지금 필요하신 것부터, 편하게 상담해 보세요.",
};

/* ── SYSTEM (B3-1) ─────────────────────────────────── */
export type SysFeat = { k: string; v: string };
export const SYSTEM = {
  eyebrow: "B3-1 · 시스템",
  title: (
    <>
      맞춤형 HRD 연수원 <span className="g">(LMS + 전용 APP)</span>
    </>
  ),
  lead: "온·오프를 하나로 잇는 하이브리드 학습환경. 웹과 모바일을 통일하고, 고객사 전용 앱까지 제공합니다.",
  feats: [
    { k: "하이브리드 학습", v: "온·오프 통합 학습환경" },
    { k: "맞춤 LMS", v: "WEB·Mobile UI 통일" },
    { k: "고객사 전용 APP", v: "iOS·Android·PUSH" },
    { k: "ISMS 인증", v: "정보보호 관리체계" },
    { k: "동시접속 2만", v: "365일 24h 안정 운영" },
  ] as SysFeat[],
};

/* ── OPS (B3-2) HOW 7축 ────────────────────────────── */
export type OpsStep = { no: string; title: string; desc: string };
export const OPS = {
  eyebrow: "B3-2 · 운영",
  title: (
    <>
      HRD 운영 위탁 서비스 <span className="g">HOW 7축</span>
    </>
  ),
  lead: "단순 대행이 아닙니다. 검증된 7개 운영 체계로 30개 이상 기업을 운영해 왔습니다.",
  steps: [
    { no: "01", title: "VOC SLA", desc: "즉시 / 24H / 48H" },
    { no: "02", title: "AI 챗봇 24h", desc: "상시 자동 응대" },
    { no: "03", title: "운영자 이중화", desc: "정·부 운영자" },
    { no: "04", title: "학습 라이프사이클", desc: "4단계 관리" },
    { no: "05", title: "3단 필터", desc: "품질 검수" },
    { no: "06", title: "결과 보고", desc: "정기 리포트" },
    { no: "07", title: "5단 장애 대응", desc: "마이그레이션 30일" },
  ] as OpsStep[],
};

/* ── STUDIO (B3-3) ─────────────────────────────────── */
export type StudioItem = { title: string; desc: string };
export const STUDIO = {
  eyebrow: "B3-3 · 제작",
  eyebrowStar: "★ KG에듀원 핵심 특장점",
  title: (
    <>
      콘텐츠 제작 스튜디오 <span className="g">자체 3개소</span>
    </>
  ),
  lead: "기획부터 제작까지 한 팀이 맡습니다. 노량진·종로3가·서대문 자체 스튜디오에서 촬영·제작팀이 콘텐츠를 만듭니다.",
  badge: "자체 스튜디오 3개소",
  image:
    "https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=1400&auto=format&fit=crop",
  items: [
    { title: "직접 운영 제작팀", desc: "촬영·편집·기획 인하우스" },
    { title: "연간 동영상 50시간", desc: "무상 제작 지원" },
    { title: "핵심가치·승진자 교육", desc: "무료 제공" },
    { title: "자체 IP 8종", desc: "24년 직장 오락실 실증" },
    { title: "품질 일관성", desc: "단가·일정 예측 가능" },
  ] as StudioItem[],
};

/* ── CASES ─────────────────────────────────────────── */
export const CASES = {
  eyebrow: "CLIENTS · 도입 사례",
  title: (
    <>
      이미, <span className="g">여러 곳에서</span> 함께하고 있습니다
    </>
  ),
  logos: ["HRD FLEX", "저축은행중앙회", "미래에셋증권", "KESCO The NEW"],
  highlight: {
    quote: (
      <>
        &quot;시스템·운영·제작을 <b>한 곳에서</b> 해결하니, 담당자 업무가 확실히
        줄었습니다.&quot;
      </>
    ),
    meta: "저축은행중앙회 · 연수원 운영 위탁",
    tag: "3축 통합 도입",
  },
};

/* ── KGESA (B3-4) 차세대 인터랙티브 데모 ───────────── */
export type Widget = {
  id: "banner" | "dash" | "courses" | "reco" | "debate" | "float";
  name: string;
  on: boolean;
};
export const KGESA = {
  eyebrow: "B3-4 · 차세대 시스템 (KGESA)",
  title: (
    <>
      고르기만 하면, <span className="g">화면은 알아서</span> 완성됩니다{" "}
      <span className="tbd" style={{ verticalAlign: "middle" }}>
        차세대 시스템 미리보기 · 정식 오픈 예정
      </span>
    </>
  ),
  lead: (
    <>
      개발 요청은 이제 그만. <b style={{ color: "var(--p3)" }}>교육 담당자</b>가
      테마와 위젯을 직접 조작하면, 학습자 화면(FO)이 실시간으로 완성됩니다. 아래에서
      직접 조작해 보세요.
    </>
  ),
  foUrl: "연수원 학습자 화면 (FO) · 미리보기",
  foMenu: ["수강신청", "나의 강의실", "부가학습", "학습자료실"],
  foLogo: "KG 연수원",
  widgets: [
    { id: "banner", name: "메인 배너", on: true },
    { id: "dash", name: "학습 대시보드", on: true },
    { id: "courses", name: "과정 리스트", on: true },
    { id: "reco", name: "추천 강의", on: true },
    { id: "debate", name: "디베이트", on: false },
    { id: "float", name: "플로팅 메뉴", on: false },
  ] as Widget[],
  ctrlHint:
    "테마를 바꾸거나 위젯을 켜고 끄고 순서를 조정해 보세요 — 왼쪽 학습자 화면이 즉시 반영됩니다.",
  aiJourney: {
    eyebrow: "AI가 함께하는 학습",
    title: (
      <>
        운영자가 만든 화면 안에서, <span className="g">학습은 AI가 돕습니다</span>
      </>
    ),
    sub: "담당자가 화면을 구성하면, 그 안에서 학습자는 AI의 도움을 받습니다. 운영도 학습도, 손이 덜 갑니다.",
    steps: [
      {
        phase: "학습 전",
        title: "AI 추천 · 큐레이션",
        desc: (
          <>
            관심·직무에 맞는 과정과 콘텐츠를 골라 제안합니다.{" "}
            <span className="aj-src">K디지털콘텐츠 · 아카이브</span>
          </>
        ),
      },
      {
        phase: "학습 중",
        title: "AI FAQ 챗봇 · 튜터존",
        desc: "막히는 순간 챗봇이 즉시 답하고, 더 깊은 질문은 튜터존에서 실시간으로 질의응답합니다.",
        hi: true,
      },
      {
        phase: "학습 후",
        title: "진도 · 피드백 관리",
        desc: "학습 통계와 밀착 피드백을 자동으로 정리해, 담당자와 학습자 모두에게 돌려줍니다.",
      },
    ] as { phase: string; title: string; desc: ReactNode; hi?: boolean }[],
    note: "※ AI FAQ 챗봇·튜터존은 차세대 시스템(KGESA) 구축 기능이며, 세부 구성은 정식 오픈 시 안내됩니다.",
  },
};

/* ── PROCESS 도입 4스텝 ────────────────────────────── */
export type ProcStep = { no: string; title: string; desc: string };
export const PROCESS = {
  eyebrow: "HOW TO START",
  title: (
    <>
      시작은, <span className="g">문의 하나</span>면 됩니다
    </>
  ),
  lead: "복잡하지 않습니다. 문의 한 번으로 상담부터 운영까지, KG가 함께 설계합니다.",
  steps: [
    { no: "01", title: "도입 문의", desc: "간단한 정보만 남기면 담당자가 연락드립니다" },
    { no: "02", title: "컨설팅·미팅", desc: "교육 니즈와 현황을 함께 파악합니다" },
    { no: "03", title: "맞춤 설계·제안", desc: "시스템·운영·제작 조합을 제안서로 드립니다" },
    { no: "04", title: "구축·운영·보고", desc: "실행하고, 정기 리포트로 성과를 돌려드립니다" },
  ] as ProcStep[],
};

/* ── GOV 정부지원 환급(SPEC_P3_v2.0) — 홈 언어로 재구성, --gov 포인트 ── */
export type GovCard = {
  eyebrow: string;
  title: string;
  desc: ReactNode;
  highlight?: boolean;
};
export const GOV = {
  eyebrow: "GOVERNMENT SUPPORT · 정부지원 환급",
  title: (
    <>
      교육비, <span className="g">정부지원으로 돌려받으세요</span>
    </>
  ),
  lead: "고용보험 가입 재직자 대상 사업주훈련비 환급 — 인정 신청부터 비용 정산까지, KG에듀원이 위탁 훈련기관으로 대행합니다.",
  cards: [
    {
      eyebrow: "WHO · 지원 대상",
      title: "고용보험 가입 재직자",
      desc: "재직근로자·채용예정자·구직자까지, 기업 규모와 무관하게 지원 대상입니다.",
    },
    {
      eyebrow: "HOW MUCH · 환급 규모",
      title: "훈련비 최대 90% 환급",
      desc: (
        <>
          우선지원기업 기준. 규모·과정별로 지원율이 달라, 실제 환급액은 상담 시
          확정됩니다. <span className="gov-eg">예시</span>
        </>
      ),
      highlight: true,
    },
    {
      eyebrow: "WHAT WE DO · KG 대행",
      title: "신청·수료·정산 대행",
      desc: "인정 신청·수료 관리·비용지원 신청·정산까지 복잡한 절차를 KG가 대행합니다.",
    },
  ] as GovCard[],
  procTitle: "지원 절차, 4단계로 정리됩니다",
  proc: [
    { no: "STEP 1", title: "인정 신청", desc: "위탁 7일 · 자체 5일 전" },
    { no: "STEP 2", title: "훈련 수행·수료", desc: "진도 80% 이상 / 자격 지도 80%+평가" },
    { no: "STEP 3", title: "비용지원 신청", desc: "수료 14일 이내" },
    { no: "STEP 4", title: "지원금 지급", desc: "KG 대행 · 훈련종료 3개월 내" },
  ],
  ctaTitle: "우리 회사가 얼마나 지원받을까?",
  ctaSub: "규모·과정에 따라 지원율이 달라집니다. 지원 가능 여부부터 확인해 보세요.",
  crossLink: { label: "환급 가능 과정 리스트", href: "/content" },
  cta: "지원 가능 여부 상담 →",
  note: "※ 지원율·환급률은 관계 법령·연도별 고시에 따르며, 위 수치는 예시입니다. 실제 지원 가능 여부는 상담을 통해 확인해 주세요. (출처: 고용노동부·한국산업인력공단 HRD4U)",
};

/* ── INQUIRY / MODAL ───────────────────────────────── */
export const INQUIRY = {
  title: (
    <>
      HRD 통합 솔루션,
      <br />
      진단부터 시작하세요
    </>
  ),
  sub: "시스템·운영·제작을 하나로 — 조직에 맞는 HRD 솔루션을 함께 설계합니다. 도입 문의를 남겨주시면 담당자가 연락드립니다.",
  trust: ["3축 풀스택", "30+사 운영 실적", "자체 스튜디오 3개소"],
  /** 기본 관심영역 + P3 전용 추가 옵션(정부지원 환급) */
  defaultInterest: "HRD 통합 솔루션",
  extraInterest: "정부지원 환급",
};
export const LEAD_MODAL = {
  title: "도입 문의",
  desc: "아래 문의 폼으로 이동합니다. 조직에 맞는 HRD 통합 솔루션을 함께 설계해 드리겠습니다.",
  cta: "문의 폼으로 이동",
};
