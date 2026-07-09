/**
 * P1 AX·AI 전환 (/ax-ai) 콘텐츠 — 시안(keess_P1_AXAI_D_scenario_v7)의 카피만 verbatim 이식.
 * ⚠️ 시안의 CSS·색토큰·버튼변형·비주얼은 이식하지 않는다. 구성·순서·문구만 참고.
 * 표현은 홈 디자인 시스템(Design.md 토큰 + 공통 컴포넌트)로 재구성한다.
 */

/* ── HERO ──────────────────────────────────────────── */
export const HERO = {
  eyebrow: "P1 · AX·AI 전환 · End-to-End Partner",
  title: "AI를 배우는 데서 멈추지 않습니다. 일하는 방식을 바꿉니다.",
  sub: "진단부터 성과 창출까지, 맞춤형 교육과 실행을 연결하는 KG에듀원 End-to-End 기업 AX Transformation Partner.",
  chips: [
    "AI 성숙도 진단",
    "AX Framework 5단계",
    "End-to-End 5 Step",
    "사전-사후 성과 리포트",
  ],
  stats: [
    { value: 5, suffix: "", label: "AX Framework 단계" },
    { value: 8, suffix: "", label: "직무 Skill Matrix" },
  ],
};

/* ── OFFER (전환 설계) ─────────────────────────────── */
export type OfferIcon = "diagnose" | "design" | "run" | "result";
export const OFFER = {
  eyebrow: "AX 전환 교육",
  lead: {
    kicker: "End-to-End AX Transformation Partner",
    title: "교육이 아니라, 전환을 설계합니다.",
    desc: "진단부터 성과 창출까지 하나로 연결합니다.",
    mini: ["진단", "설계", "학습", "실행", "성과"],
  },
  cards: [
    {
      icon: "diagnose" as OfferIcon,
      kicker: "진단",
      title: "현 위치부터 데이터로",
      desc: "조직 AX 수준·직무 활용도·데이터 성숙도 진단.",
    },
    {
      icon: "design" as OfferIcon,
      kicker: "설계",
      title: "직무에 맞게 그립니다",
      desc: "AX Framework·직무별 Skill Map으로 설계.",
    },
    {
      icon: "run" as OfferIcon,
      kicker: "실행",
      title: "현업 프로젝트로 체득",
      desc: "실전 PBL·Agent 실습·현업 혁신 과제 적용.",
    },
    {
      icon: "result" as OfferIcon,
      kicker: "성과",
      title: "측정하고 확산합니다",
      desc: "생산성·활용도 측정 후 조직 전체로 확산.",
    },
  ],
  stats: [
    { value: 5, suffix: "단계", label: "AX Framework 역량 체계" },
    { value: 8, suffix: "직무", label: "AI Skill Matrix" },
    { value: 5, suffix: "Step", label: "End-to-End 전환 서비스" },
  ],
};

/* ── SCENARIO (목표별 경로) ────────────────────────── */
export type Scenario = {
  key: string;
  badge?: string;
  label: string;
  kicker: string;
  title: string;
  desc: string;
  chips: string[];
  cta: string;
};
export const SCENARIO_INTRO = {
  eyebrow: "목표별 맞춤 경로",
  title: "어떤 목표로 오셨나요?",
  sub: "조직의 목표를 선택하면, 가장 적합한 AX 교육 경로를 안내합니다.",
};
export const SCENARIOS: Scenario[] = [
  {
    key: "diag",
    badge: "추천",
    label: "잘 모르겠다면, 진단부터.",
    kicker: "추천 경로",
    title: "잘 모르겠다면, 진단부터.",
    desc: "AI 성숙도 진단으로 조직의 현 위치를 데이터로 파악하고, 가장 적합한 출발점을 함께 찾습니다.",
    chips: ["조직 AX 수준 진단", "AX 역량 Gap 분석", "우선 육성 과제"],
    cta: "진단 상담받기",
  },
  {
    key: "quick",
    label: "빠르게 실무 AI 역량을 확보하고 싶어요.",
    kicker: "빠른 실무 적용",
    title: "바로 쓰는 실무 AI 역량을, 빠르게.",
    desc: "AI 리터러시부터 직무별 AI 활용까지, 현업에 곧장 적용할 수 있는 실무 역량을 빠르게 끌어올립니다.",
    chips: ["AI 리터러시 공통", "AI 생산성 혁신가", "직무별 AI 활용"],
    cta: "실무 과정 상담받기",
  },
  {
    key: "data",
    label: "현업 데이터로 문제를 해결하고 싶어요.",
    kicker: "현업 문제 해결",
    title: "현업 데이터로, 진짜 솔루션을.",
    desc: "사내 과제와 데이터로 실전 PBL·Agent 실습을 운영해, 실제 업무에 적용 가능한 AI 포트폴리오를 만듭니다.",
    chips: ["시나리오 PBL", "Agent 구축 실습", "현업 혁신 과제"],
    cta: "프로젝트형 상담받기",
  },
  {
    key: "roadmap",
    label: "전사 AX 로드맵을 설계·확산하고 싶어요.",
    kicker: "전사 AX 로드맵",
    title: "전사 역량 체계를, 문화로.",
    desc: "AX Framework 5단계로 전사 AX 역량 체계를 설계하고, 성과 측정·확산까지 연결합니다.",
    chips: ["AX Framework 5단계", "조직 확산 전략", "AX 성과 리포트"],
    cta: "전사 로드맵 상담받기",
  },
];

/* ── SERVICE (End-to-End 5 Step) ───────────────────── */
export type Step = {
  no: string;
  title: string;
  items: string[];
  output: string[];
};
export const SERVICE_INTRO = {
  eyebrow: "KG에듀원 AX Transformation Service",
  title: "진단부터 성과까지, End-to-End 5 Step",
  sub: "단계마다 명확한 산출물이 남습니다. 교육이 아니라 전환 프로젝트입니다.",
};
export const STEPS: Step[] = [
  {
    no: "1",
    title: "AI·데이터 활용 수준 진단",
    items: [
      "조직 AX 수준 진단",
      "직무별 AI 활용도 진단",
      "데이터 활용 성숙도 진단",
      "AX 역량 Gap 분석",
    ],
    output: ["AX 역량 진단 리포트", "조직별 우선 육성 과제"],
  },
  {
    no: "2",
    title: "기업 맞춤형 AX 역량 설계",
    items: [
      "직군별 AX 역량 정의",
      "AI 활용 업무 분석",
      "직무별 AX Skill Map 설계",
      "교육 로드맵 설계",
    ],
    output: ["AX Skill Framework", "직무별 학습 로드맵"],
  },
  {
    no: "3",
    title: "실전 중심 학습 경험 제공",
    items: ["AI 기반 실습", "시나리오 기반 PBL", "블렌디드 러닝", "Agent 구축 실습"],
    output: ["조직 맞춤형 AI 포트폴리오"],
  },
  {
    no: "4",
    title: "성과 창출 중심 실행",
    items: [
      "현업 문제 해결 프로젝트",
      "AI 업무 혁신 과제 수행",
      "부서별 AX 사례 발굴",
      "AI 활용 우수사례 공유",
    ],
    output: ["AX 혁신 과제 결과물", "우수사례·인사이트"],
  },
  {
    no: "5",
    title: "성과 측정 및 확산",
    items: ["업무 생산성 측정", "활용도 분석", "조직 확산 전략 수립"],
    output: ["AX 성과 리포트"],
  },
];

/* ── FRAMEWORK (5단계 역량 체계) + 통증 진단 ───────── */
export type FwCap = { name: string; level: "기본" | "심화" | "응용" };
export type FwArea = { name: string; caps: FwCap[] };
export type FwLevel = {
  lv: string;
  name: string;
  desc: string; // <b> 강조는 컴포넌트에서 처리(앞부분 name)
  areas: FwArea[];
};
export const FRAMEWORK_INTRO = {
  eyebrow: "KG에듀원 AX Framework",
  title: "AI 활용부터 혁신 리딩까지, 5단계 역량 체계",
  sub: "생산성 향상·직무 적용·업무 자동화·조직 혁신으로 확장하도록 설계된 AX 역량 모델입니다. 단계마다 길러야 할 역량 영역이 다릅니다.",
  dxLabel: "이런 고민이라면, 이 단계부터 시작하세요",
};
export const DX_CHIPS = [
  { stage: 1, text: "내 직무에 AI가 필요한지 모르겠어요" },
  { stage: 2, text: "AI를 쓰는데 결과가 아쉬워요" },
  { stage: 3, text: "AI를 써도 업무가 줄지 않아요" },
  { stage: 4, text: "AI가 직원처럼 일했으면 해요" },
  { stage: 5, text: "새로운 혁신·가치를 만들고 싶어요" },
];
export const FW_LEVELS: FwLevel[] = [
  {
    lv: "Lv1",
    name: "AI 리터러시 공통",
    desc: "생성형 AI 기본 개념과 활용·윤리·보안으로 전사 공통 기반을 갖춥니다.",
    areas: [
      {
        name: "AI 이해 및 활용",
        caps: [
          { name: "AI 기초 이해", level: "기본" },
          { name: "생성형 AI 활용", level: "심화" },
          { name: "AI 정보검색 및 리서치", level: "응용" },
        ],
      },
      { name: "AI 활용 기술", caps: [{ name: "프롬프트 설계", level: "심화" }] },
      {
        name: "AI 윤리 및 보안",
        caps: [
          { name: "AI 윤리", level: "기본" },
          { name: "AI 보안", level: "기본" },
          { name: "AI 결과 검증 및 평가", level: "응용" },
        ],
      },
    ],
  },
  {
    lv: "Lv2",
    name: "AI 생산성 혁신가",
    desc: "문서·콘텐츠·정보 분석·협업에 AI를 적용해 개인 생산성을 끌어올립니다.",
    areas: [
      {
        name: "문서·콘텐츠 생산성",
        caps: [
          { name: "AI 문서 작성", level: "기본" },
          { name: "AI 프레젠테이션 제작", level: "기본" },
          { name: "AI 콘텐츠 제작", level: "응용" },
        ],
      },
      { name: "정보 탐색 및 분석", caps: [{ name: "AI 리서치", level: "심화" }] },
      {
        name: "협업 및 커뮤니케이션",
        caps: [
          { name: "AI 회의 활용", level: "응용" },
          { name: "AI 커뮤니케이션", level: "응용" },
        ],
      },
    ],
  },
  {
    lv: "Lv3",
    name: "AI 실무 적용 전문가",
    desc: "직무 워크플로우와 데이터에 AI를 심어 현업 솔루션을 도출합니다.",
    areas: [
      {
        name: "직무별 AI 활용",
        caps: [
          { name: "AI 마케팅", level: "심화" },
          { name: "AI 영업", level: "심화" },
          { name: "AI 인사관리", level: "심화" },
          { name: "AI 교육설계", level: "심화" },
        ],
      },
      { name: "고객·서비스 혁신", caps: [{ name: "AI 고객경험 관리", level: "응용" }] },
      {
        name: "데이터 분석·활용",
        caps: [
          { name: "AI 데이터 분석", level: "심화" },
          { name: "비즈니스 데이터 분석", level: "응용" },
        ],
      },
      {
        name: "데이터 기반 의사소통",
        caps: [{ name: "데이터 스토리텔링", level: "응용" }],
      },
    ],
  },
  {
    lv: "Lv4",
    name: "AI 자동화 설계자",
    desc: "자동화와 AI Agent로 업무 프로세스를 재설계합니다.",
    areas: [
      {
        name: "업무 자동화",
        caps: [
          { name: "노코드 자동화", level: "심화" },
          { name: "업무 프로세스 자동화", level: "응용" },
        ],
      },
      {
        name: "AI 에이전트 구축",
        caps: [
          { name: "AI 에이전트 활용", level: "기본" },
          { name: "AI 에이전트 설계", level: "심화" },
          { name: "멀티 에이전트 협업", level: "응용" },
        ],
      },
      { name: "시스템 연계·확장", caps: [{ name: "RPA 연계 활용", level: "응용" }] },
      { name: "프로세스 혁신", caps: [{ name: "업무 프로세스 최적화", level: "응용" }] },
    ],
  },
  {
    lv: "Lv5",
    name: "AX 혁신 리더",
    desc: "전략·거버넌스·변화관리로 AI를 조직 문화·경영으로 정착시킵니다.",
    areas: [
      {
        name: "AX 전략·거버넌스",
        caps: [
          { name: "AX 리더십", level: "기본" },
          { name: "AI 거버넌스", level: "심화" },
          { name: "AX 전략 수립", level: "응용" },
        ],
      },
      {
        name: "조직 변화관리",
        caps: [
          { name: "AI 활용 조직문화 구축", level: "기본" },
          { name: "AI 변화관리", level: "심화" },
          { name: "AI 조직 설계", level: "응용" },
        ],
      },
      {
        name: "데이터 기반 경영",
        caps: [
          { name: "데이터 기반 문제해결", level: "기본" },
          { name: "AI 기반 의사결정", level: "응용" },
        ],
      },
      {
        name: "디지털·비즈니스 혁신",
        caps: [
          { name: "디지털 전환", level: "심화" },
          { name: "AI 비즈니스 혁신", level: "응용" },
        ],
      },
    ],
  },
];

/* ── JOBS (직무별 × AX 5단계) ──────────────────────── */
export const JOBS_INTRO = {
  eyebrow: "직무별 한눈에 보기",
  title: "우리 직무는 단계별로 무엇을 하나요?",
  sub: "먼저 포지셔닝 맵에서 직무의 AI 활용 위치를 확인하고, 직무를 선택하면 AX 5단계별 역량을 한눈에 볼 수 있습니다.",
  note: "* 단계별 역량은 직무 적용 예시이며, AI 성숙도 진단 후 조직 맞춤으로 확정됩니다.",
  axes: {
    top: "비즈니스 혁신 ↑",
    bottom: "↓ 업무 생산성",
    left: "AI 활용",
    right: "AI 구축·개발",
    quads: {
      tl: "활용 · 혁신",
      tr: "구축 · 혁신",
      bl: "활용 · 생산성",
      br: "구축 · 생산성",
    },
  },
};
export const STAGE_NAMES = [
  "AI 리터러시",
  "AI 생산성",
  "AI 실무 적용",
  "AI 자동화",
  "AX 혁신 리더",
];
export type Job = { key: string; pos: { x: number; y: number }; steps: string[] };
export const JOBS: Job[] = [
  {
    key: "전략/기획",
    pos: { x: 35, y: 82 },
    steps: [
      "AI 기초·리서치 이해",
      "보고서·자료 자동 작성",
      "마켓 인텔리전스·데이터 분석",
      "분석 파이프라인 자동화",
      "AI 기반 의사결정·전략 수립",
    ],
  },
  {
    key: "경영지원/관리",
    pos: { x: 24, y: 28 },
    steps: [
      "AI 기초·보안 이해",
      "문서·규정 자동 작성",
      "비용·계약 데이터 분석",
      "행정 프로세스·챗봇 자동화",
      "AI 기반 운영 거버넌스",
    ],
  },
  {
    key: "인사(HR)",
    pos: { x: 43, y: 50 },
    steps: [
      "AI 기초·윤리 이해",
      "공고·평가 문서 자동화",
      "채용·조직 데이터 분석",
      "HR 응답 챗봇·설문 자동화",
      "AI 기반 인재·조직 설계",
    ],
  },
  {
    key: "생산/제조",
    pos: { x: 58, y: 33 },
    steps: [
      "AI 기초 이해",
      "점검·작업 리포트 자동화",
      "공정·품질 데이터 분석",
      "수율 예측·설비 자동화",
      "AI 기반 생산 혁신",
    ],
  },
  {
    key: "영업/CS",
    pos: { x: 27, y: 40 },
    steps: [
      "AI 기초·프롬프트 이해",
      "미팅 녹취·제안서 초안",
      "고객 데이터 분석·맞춤 제안",
      "응대 챗봇·콜드메일 자동화",
      "AI 기반 영업·CX 혁신",
    ],
  },
  {
    key: "연구(R&D)",
    pos: { x: 68, y: 72 },
    steps: [
      "AI 기초·리서치 이해",
      "문헌·특허 요약 자동화",
      "실험 데이터 분석·시각화",
      "연구 파이프라인 자동화",
      "AI 기반 R&D 전략",
    ],
  },
  {
    key: "개발/IT",
    pos: { x: 82, y: 60 },
    steps: [
      "AI 기초·프롬프트 이해",
      "코드·문서 작성 보조",
      "로그·데이터 분석·리팩토링",
      "AI Agent·워크플로우 설계",
      "AI 기반 아키텍처·기술 전략",
    ],
  },
  {
    key: "마케팅",
    pos: { x: 30, y: 66 },
    steps: [
      "AI 기초·생성형 이해",
      "SNS 카피·콘텐츠 자동 생성",
      "캠페인 분석·A/B 최적화",
      "고객여정 자동화 설계",
      "AI 기반 브랜드 경험 전략",
    ],
  },
];

/* ── WHY (타사 vs KG) ──────────────────────────────── */
export const WHY_INTRO = {
  eyebrow: "무엇이 다른가",
  title: "대체 불가능한 AX 교육은 기준부터 다릅니다.",
};
export type WhyRow = { crit: string; other: string; kg: string };
export const WHY_HEAD = { crit: "기준", other: "일반 AI 교육", kg: "KG에듀원 AX" };
export const WHY_ROWS: WhyRow[] = [
  { crit: "시작", other: "진단 없이 과정부터 시작", kg: "AI 성숙도 진단으로 현 위치부터" },
  { crit: "설계", other: "기존 커리큘럼 재사용", kg: "직무별 Skill Map 맞춤 설계" },
  { crit: "강사", other: "유명세·고정 강사 위주", kg: "검증된 강사 + 컨설턴트 공동 설계" },
  { crit: "결과물", other: "수료증 발급", kg: "AI 포트폴리오·AX 성과 리포트(산출물)" },
  { crit: "성과", other: "만족도 설문", kg: "사전-사후 GAP 정량 증명" },
];

/* ── GAP (성과 증거) ───────────────────────────────── */
export const GAP_INTRO = {
  eyebrow: "성과 증거",
  title: "교육 효과를 숫자로 보고합니다.",
  boxTitle: "사전-사후 GAP 분석",
  caption: "* 개념 도식이며, 실제 수치는 AX 성과 리포트로 제공됩니다.",
};
export type GapMetric = { label: string; pre: number; post: number };
export const GAP_METRICS: GapMetric[] = [
  { label: "AI 활용 역량", pre: 42, post: 86 },
  { label: "현업 적용도", pre: 35, post: 78 },
  { label: "업무 생산성", pre: 48, post: 82 },
];

/* ── COURSES (과정 라인업) ─────────────────────────── */
export const COURSES_INTRO = {
  eyebrow: "과정 라인업",
  title: "입문부터 실무·자격까지",
};
export type Course = { tier: string; title: string };
export const COURSES: Course[] = [
  { tier: "입문", title: "AI 입문 · ChatGPT 마스터 클래스" },
  { tier: "활용", title: "Genspark · Gemini · Perplexity 활용" },
  { tier: "실무", title: "생성형 AI 실무 완벽 활용" },
  { tier: "심화", title: "프롬프트부터 파인튜닝까지" },
  { tier: "일잘러", title: "일잘러 AI 활용법" },
  { tier: "자격", title: "AICE Basic 준비 과정" },
];

/* ── CASE (도입 사례) ──────────────────────────────── */
export const CASE_INTRO = {
  eyebrow: "도입 사례",
  title: "현업에 바로 쓰는 결과물",
  caption: "* 도입 사례·수치는 노출 협의 기준",
};
export type CaseItem = {
  badge: string;
  title: string;
  meta: { value: string; label: string }[];
};
export const CASES: CaseItem[] = [
  {
    badge: "AI 실무 적용",
    title: "KG그룹 AI LAB",
    meta: [
      { value: "규모", label: "노출 협의" },
      { value: "회차", label: "노출 협의" },
    ],
  },
  {
    badge: "직무 특화",
    title: "직무별 AI 활용 교육",
    meta: [
      { value: "8직무", label: "Skill Matrix" },
      { value: "맞춤", label: "현업 과제" },
    ],
  },
  {
    badge: "워크숍·해커톤",
    title: "현업 솔루션 도출",
    meta: [
      { value: "PoC", label: "AI 포트폴리오" },
      { value: "GAP", label: "성과 리포트" },
    ],
  },
];

/* ── FINAL CTA ─────────────────────────────────────── */
export const FINAL = {
  title: "AX, 진단부터 시작하세요.",
  desc: "지금 상담하거나, 먼저 AX 도입 가이드부터 받아보세요.",
};

/* ── 모달 카피 ─────────────────────────────────────── */
export const GUIDE_MODAL = {
  title: "AX 도입 가이드 받기",
  sub: "입력하신 메일로 가이드를 보내드립니다.",
  valueTitle: "이 가이드에 담긴 것",
  value: [
    "AI 성숙도 진단 체크리스트",
    "직무별 AI 적용 예시",
    "단계별 AX 도입 로드맵 (PDF)",
  ],
  consent: "개인정보 수집·이용(가이드 발송 목적)에 동의합니다.",
  submit: "가이드 받기",
  done: {
    title: "가이드를 보내드렸습니다.",
    desc: "입력하신 메일로 AX 도입 가이드를 발송했습니다.",
  },
};
export const CONSULT_MODAL = {
  title: "AX 진단 상담받기",
  sub: "AI 성숙도 진단 기반으로 맞춤 제안을 드립니다.",
  sectors: ["기업 (B2B)", "공공·기관 (B2G)"],
  sizes: ["~50명", "50~300명", "300~1,000명", "1,000명+"],
  interests: ["AI 리터러시", "직무별 AI 활용", "AI 자동화", "AX 전략"],
  submit: "상담 신청",
  done: {
    title: "상담 신청이 접수되었습니다.",
    desc: "담당자가 영업일 기준 1일 내 회신드립니다.",
  },
};
