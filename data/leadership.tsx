import type { ReactNode } from "react";

/**
 * P2 리더십·조직 (/leadership) 콘텐츠 — 시안(keess_P2_leadership_A_journey_v1.0)의
 * 카피/데이터만 verbatim 이식. ⚠️ 시안 CSS·색토큰·버튼변형·비주얼은 이식하지 않는다.
 * 구성·순서·인터랙션·카피만 참고. 표현은 홈 디자인 시스템으로 재구성. TBD 표기 보존.
 */

/* ── SubNav ────────────────────────────────────────── */
export const SUBNAV_ITEMS = [
  { key: "pain", label: "고민" },
  { key: "journey", label: "성장여정" },
  { key: "tracks", label: "6대 역량" },
  { key: "framework", label: "Framework" },
  { key: "offline", label: "오프라인" },
  { key: "growthfit", label: "조직진단" },
  { key: "why", label: "차별점" },
  { key: "inq", label: "도입문의" },
];

/* ── HERO ──────────────────────────────────────────── */
export const HERO = {
  eyebrow: "KG에듀원 리더십·조직 체계",
  title: (
    <>
      역할이 바뀌는 순간마다,
      <br />
      다른 리더십이 필요합니다
    </>
  ),
  titlePlain: "역할이 바뀌는 순간마다, 다른 리더십이 필요합니다",
  sub: "신입부터 최고경영진까지 — 성장단계별 리더십 여정을 진단에서 조직문화 정착까지 하나의 체계로 설계합니다.",
  strip: ["성장단계 6단계 로드맵", "6대 리더십 역량", "온·오프라인 통합"],
  stats: [
    { value: "6단계", label: "성장 여정" },
    { value: "진단→정착", label: "5단계 체계" },
  ],
  visualLabel: {
    t: "Leadership Journey",
    s: "신입 · 주니어 · 팀장 · 중간관리자 · 임원 · 최고경영진",
  },
  image:
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1600&auto=format&fit=crop",
};

/* ── PAIN ──────────────────────────────────────────── */
export const PAIN = {
  eyebrow: "LEADERSHIP PAIN",
  title: (
    <>
      리더가 된 순간, <span className="g">준비된 사람은 없습니다</span>
    </>
  ),
  lead: "직급이 오를 때마다 요구되는 리더십은 완전히 달라집니다. 단발성 교육이 아닌, 성장단계에 맞는 체계가 필요한 이유입니다.",
  chips: [
    <>
      &quot;팀장이 됐는데 <b>관리가 처음</b>입니다&quot;
    </>,
    <>
      &quot;교육은 받았지만 <b>현업에 안 남습니다</b>&quot;
    </>,
    <>
      &quot;임원 후보를 <b>어떻게 길러야</b> 할지 모릅니다&quot;
    </>,
    <>
      &quot;리더십을 <b>진단할 기준</b>이 없습니다&quot;
    </>,
  ] as ReactNode[],
};

/* ── JOURNEY (주력) + ARCHITECTURE ─────────────────── */
export type JourneyStep = {
  no: number;
  stage: string;
  role: string;
  tags: string[];
};
export type ArchStep = { no: string; title: string; desc: string };
export const JOURNEY = {
  eyebrow: "LEADERSHIP JOURNEY · 교육체계",
  title: (
    <>
      성장단계마다, <span className="g">필요한 리더십을 설계</span>합니다
    </>
  ),
  lead: (
    <>
      신입부터 최고경영진까지 6단계 성장 로드맵. 각 단계에 필요한 핵심역량을
      한눈에 봅니다.{" "}
      <b style={{ color: "var(--p2)" }}>
        (콘텐츠개발팀 v3.0 기준 · 카피 교체가능)
      </b>
    </>
  ),
  steps: [
    {
      no: 1,
      stage: "신입",
      role: "Entry",
      tags: ["셀프리더십", "책임감", "협업", "성장마인드셋"],
    },
    {
      no: 2,
      stage: "주니어",
      role: "Junior",
      tags: ["협업리더십", "문제해결", "영향력", "실행력"],
    },
    {
      no: 3,
      stage: "팀장",
      role: "Team Leader",
      tags: ["피플매니지먼트", "성과관리", "피드백·코칭", "AI활용리더십"],
    },
    {
      no: 4,
      stage: "중간관리자",
      role: "Middle",
      tags: ["전략적사고", "조직관리", "변화관리", "리더육성"],
    },
    {
      no: 5,
      stage: "임원",
      role: "Executive",
      tags: ["조직문화", "혁신", "비즈니스통찰", "디지털전환"],
    },
    {
      no: 6,
      stage: "최고경영진",
      role: "C-Level",
      tags: ["비전리더십", "초연결리더십", "AI시대경영", "지속가능경영"],
    },
  ] as JourneyStep[],
  archEyebrow: "LEADERSHIP ARCHITECTURE · 방법론",
  archTitle: "진단에서 조직문화 정착까지, 5단계로 이어집니다",
  arch: [
    { no: "STEP 1", title: "진단", desc: "리더십역량·조직문화·건강도·AI리터러시 진단" },
    { no: "STEP 2", title: "역량개발", desc: "온라인학습·집합교육·워크숍·액션러닝·코칭" },
    {
      no: "STEP 3",
      title: "현업적용",
      desc: "AI시뮬레이션·역할기반실습·액션플랜·현업프로젝트",
    },
    { no: "STEP 4", title: "조직확산", desc: "리더십커뮤니티·베스트프랙티스·사내리더육성" },
    { no: "STEP 5", title: "조직문화정착", desc: "피드백문화·협업문화·학습문화·AI활용문화" },
  ] as ArchStep[],
};

/* ── TRACKS (6 역량 카드) ──────────────────────────── */
export type Track = { initial: string; key: string; name: string; desc: string };
export const TRACKS_INTRO = {
  eyebrow: "6 LEADERSHIP TRACKS · 역량 축",
  title: (
    <>
      6개 리더십 트랙으로 <span className="g">무엇을 기를지</span> 정의합니다
    </>
  ),
  lead: "KG에듀원 고유의 리더십 역량 체계 — 여정의 각 단계는 이 6대 역량으로 구성됩니다.",
};
export const TRACKS: Track[] = [
  { initial: "S", key: "TRACK 01", name: "Self", desc: "자기주도성·회복탄력성·성장마인드셋·자기관리" },
  { initial: "P", key: "TRACK 02", name: "People", desc: "코칭·피드백·동기부여·갈등관리·세대이해" },
  {
    initial: "Pf",
    key: "TRACK 03",
    name: "Performance",
    desc: "목표관리·성과관리·의사결정·실행력·문제해결",
  },
  { initial: "C", key: "TRACK 04", name: "Change", desc: "변화관리·혁신·애자일·디지털전환·조직개선" },
  { initial: "H", key: "TRACK 05", name: "Hyper", desc: "협업·영향력·네트워크·크로스펑셔널·이해관계자관리" },
  {
    initial: "Cu",
    key: "TRACK 06",
    name: "Culture",
    desc: "심리적안전감·조직문화·다양성·포용성·학습문화",
  },
];

/* ── FRAMEWORK (리더십 휠) ─────────────────────────── */
export type WheelTrack = {
  k: string;
  ko: string;
  nm: string;
  t: string;
  d: string;
  a: string[];
};
export const FRAMEWORK_INTRO = {
  eyebrow: "LEADERSHIP FRAMEWORK · 6대 역량",
  title: (
    <>
      6개 역량이 모여 <span className="g">하나의 리더십</span>이 됩니다
    </>
  ),
  lead: "동등한 6개 트랙이 원의 균형으로 리더십을 구성합니다. 세그먼트를 클릭해 세부 역량을 확인하세요.",
  defaults: {
    hint: "세그먼트를 클릭하세요",
    name: "6대 리더십 역량 체계",
    desc: "동등한 6개 역량이 하나의 리더십을 구성합니다. 막대 높이가 아니라 원의 균형으로 병렬성을 표현합니다.",
  },
};
export const WHEEL_TRACKS: WheelTrack[] = [
  {
    k: "TRACK 01",
    ko: "셀프 리더십",
    nm: "Self",
    t: "Self Leadership",
    d: "스스로를 이끄는 리더의 출발점 — 자기 이해와 회복탄력성을 바탕으로 지속 성장하는 역량.",
    a: ["자기주도성", "회복탄력성", "성장마인드셋", "자기관리"],
  },
  {
    k: "TRACK 02",
    ko: "피플 리더십",
    nm: "People",
    t: "People Leadership",
    d: "사람을 성장시키는 리더 — 코칭과 피드백으로 구성원의 잠재력을 끌어냅니다.",
    a: ["코칭", "피드백", "동기부여", "갈등관리", "세대이해"],
  },
  {
    k: "TRACK 03",
    ko: "성과 리더십",
    nm: "Perf.",
    t: "Performance Leadership",
    d: "성과를 만드는 리더 — 목표에서 실행까지 조직의 결과를 책임집니다.",
    a: ["목표관리", "성과관리", "의사결정", "실행력", "문제해결"],
  },
  {
    k: "TRACK 04",
    ko: "변화 리더십",
    nm: "Change",
    t: "Change Leadership",
    d: "변화를 이끄는 리더 — 혁신과 디지털 전환으로 조직을 진화시킵니다.",
    a: ["변화관리", "혁신", "애자일", "디지털전환", "조직개선"],
  },
  {
    k: "TRACK 05",
    ko: "하이퍼 리더십",
    nm: "Hyper",
    t: "Hyper Leadership",
    d: "연결하는 리더 — 협업과 영향력으로 경계를 넘는 성과를 만듭니다.",
    a: ["협업", "영향력", "네트워크", "크로스펑셔널", "이해관계자관리"],
  },
  {
    k: "TRACK 06",
    ko: "컬처 리더십",
    nm: "Culture",
    t: "Culture Leadership",
    d: "문화를 세우는 리더 — 심리적 안전감과 학습문화로 지속가능한 조직을 만듭니다.",
    a: ["심리적안전감", "조직문화", "다양성", "포용성", "학습문화"],
  },
];
/** 데이터 시각화 팔레트 — --p2(#E91E63) 기반 마젠타 밝기 스케일 6단계(휠 전용 포인트) */
export const WHEEL_PALETTE = [
  "#7A0E3C",
  "#AD1457",
  "#C2185B",
  "#E91E63",
  "#EC407A",
  "#F06292",
];
export const WHEEL_TEXT = ["#fff", "#fff", "#fff", "#fff", "#fff", "#4B1528"];

/* ── OFFLINE (성장시점 스텝퍼) ─────────────────────── */
export type StageSub = { t: string; d: string; caps: string[] };
export type Stage = {
  ph: string;
  key: string;
  nm: string;
  en: string;
  sub: StageSub[];
};
export const OFFLINE_INTRO = {
  eyebrow: "LEADERSHIP TRACK · 성장 시점 선택",
  title: (
    <>
      우리 조직은 지금, <span className="g">어느 전환점</span>에 있나요?
    </>
  ),
  badge: "오프라인",
  lead: (
    <>
      입사·승진·팀장·임원 — 역할이 바뀌는 시점을 선택하면 맞는 트랙이 열립니다.{" "}
      <b style={{ color: "var(--p2)" }}>
        온라인 여정으로 이어가거나, 오프라인 집합교육으로 진행
      </b>
      할 수 있습니다.{" "}
      <span style={{ color: "var(--muted)", fontSize: "13px" }}>
        (HRD솔루션팀 · 초기 수급 자료 기준)
      </span>
    </>
  ),
  panelMod: "온라인 여정 · 오프라인 집합 선택",
};
export const STAGES: Stage[] = [
  {
    ph: "STAGE 1",
    key: "입사·정착",
    nm: "On-Series",
    en: "입사부터 정착·성장까지",
    sub: [
      { t: "On-Syncing", d: "신입사원 온보딩", caps: ["조직이해", "업무적응", "관계형성", "AI활용"] },
      {
        t: "On-Performing",
        d: "경력 입사자 온보딩",
        caps: ["빠른적응", "성과창출", "협업체계", "역할정착"],
      },
      { t: "On-Powering", d: "성장단계별 리텐션", caps: ["몰입도향상", "성장동력", "조직정착"] },
    ],
  },
  {
    ph: "STAGE 2",
    key: "승진·역할전환",
    nm: "Role-Up",
    en: "역할 변화 시점의 역량 전환",
    sub: [
      { t: "Pro", d: "실행 역량 강화", caps: ["업무생산성", "커뮤니케이션", "AI활용", "협업"] },
      {
        t: "Manager",
        d: "조직 운영 역량",
        caps: ["문제해결", "프로젝트운영", "후배육성", "피드백"],
      },
      { t: "Leader", d: "성과 창출 역량", caps: ["성과관리", "의사결정", "변화관리", "조직운영"] },
    ],
  },
  {
    ph: "STAGE 3",
    key: "팀장 성과",
    nm: "Re:Lead",
    en: "성과를 만드는 팀장",
    sub: [
      {
        t: "팀장 리더십",
        d: "사람관리·성과관리·조직운영 균형",
        caps: ["역할인식", "사람관리", "팀관리", "성과관리", "변화대응"],
      },
    ],
  },
  {
    ph: "STAGE 4",
    key: "핵심인재·임원",
    nm: "Executive",
    en: "미래 성장을 이끄는 리더",
    sub: [
      {
        t: "Executive Leadership",
        d: "핵심인재·차세대 리더",
        caps: ["핵심인재육성", "차세대리더", "Executive Insight"],
      },
    ],
  },
];

/* ── GROWTH-FIT (조직진단) ─────────────────────────── */
export type GfDim = { en: string; ko: string };
export const GROWTHFIT = {
  eyebrow: "ORGANIZATION DIAGNOSIS · B2-3",
  title: (
    <>
      조직전환 연구소 <span className="g">Growth-Fit</span>
    </>
  ),
  tbd: "상세 문항 확보 후 확장 예정",
  subtitle: "조직경험진단 · 6 Core Dimensions",
  desc: "조직의 리더십·문화 성숙도를 6개 축으로 진단하여, 전환 방향을 설계합니다. (현 수급 수준 기준 소개)",
  dims: [
    { en: "Vision", ko: "비전" },
    { en: "Result", ko: "성과" },
    { en: "Trust", ko: "신뢰" },
    { en: "Value", ko: "가치" },
    { en: "Agility", ko: "민첩성" },
    { en: "Infra", ko: "인프라" },
  ] as GfDim[],
};

/* ── WHY + FACULTY ─────────────────────────────────── */
export type WhyCard = { n: string; title: string; desc: string };
export type FacStep = { n: string; title: string; desc: string };
export const WHY = {
  eyebrow: "WHY KG · 체계와 사람",
  title: (
    <>
      단발성 교육이 아닌, <span className="g">성장하는 체계</span>입니다
    </>
  ),
  cards: [
    {
      n: "01",
      title: "진단에서 시작",
      desc: "리더십·조직문화·AI리터러시 진단으로 현재를 파악하고 여정을 설계합니다.",
    },
    {
      n: "02",
      title: "성장단계 정합",
      desc: "신입부터 C-Level까지, 직급이 아닌 성장단계에 맞춘 리더십을 제공합니다.",
    },
    {
      n: "03",
      title: "조직문화로 정착",
      desc: "개인 역량을 넘어 조직확산·문화정착까지 이어지는 5단계 체계입니다.",
    },
  ] as WhyCard[],
  facEyebrow: "그리고, 강사가 설계 단계부터 함께합니다",
  facSub: (
    <>
      교육 컨설턴트와 강사가 함께 설계하고, 품질을 개인이 아닌 시스템으로
      관리합니다. <span className="tbd">강사 프로필·사례 확보 후 확장</span>
    </>
  ),
  facSteps: [
    { n: "STEP 1", title: "전문성 검증", desc: "실무 경험·직무 이해" },
    { n: "STEP 2", title: "기업교육 적합성", desc: "전달력·참여 유도" },
    { n: "STEP 3", title: "운영성과 검증", desc: "만족도·재의뢰 관리" },
    { n: "STEP 4", title: "지속 품질관리", desc: "정기 피드백·역량개발" },
  ] as FacStep[],
};

/* ── INQUIRY / MODAL ───────────────────────────────── */
export const INQUIRY = {
  title: (
    <>
      리더십 체계,
      <br />
      진단부터 시작하세요
    </>
  ),
  sub: "우리 조직에 맞는 리더십·조직 체계를 함께 설계합니다. 도입 문의를 남겨주시면 담당자가 연락드립니다.",
  trust: ["성장단계 6단계", "6대 리더십 역량", "온·오프라인 통합"],
};
export const LEAD_MODAL = {
  title: "도입 문의",
  desc: "아래 문의 폼으로 이동합니다. 우리 조직에 맞는 리더십 체계를 함께 설계해 드리겠습니다.",
  cta: "문의 폼으로 이동",
};
