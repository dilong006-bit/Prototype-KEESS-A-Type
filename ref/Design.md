# KEESS Design.md — 프로젝트 디자인 헌법 (Design Constitution)

> 이 문서는 KEESS의 최상위 디자인 기준이다. 향후 수백 개 화면을 만들거나 Claude가 코드를 생성·수정하더라도, 모든 페이지가 **하나의 사이트**로 보이도록 강제하는 규칙 문서다.
>
> **본 문서는 신규 디자인을 정의하지 않는다.** 확정 홈(`keess_home_C_v18_최종확정`)을 최상위 기준으로 하고, P1~P4 확정 프로토타입에서 공통으로 검증된 디자인 언어만 추출·체계화했다.
> 모든 규칙은 **WHY(왜) · WHEN(언제) · HOW(어떻게)** 형태로 기술한다.
>
> 확정 기준 파일: `keess_home_C_v18_최종확정(260703).html` (홈), `keess_C_corporate_v3_확정.html`, `keess_P1_AXAI_D_scenario_v7.html`, `keess_P2_leadership_B_framework_v1.0.html`, `keess_P3_hrd_A_integrated_v1.6.html`, `keess_P4_content_solution_A_v3.0.html`

---

## 0. 사용 규칙 (이 문서를 읽는 Claude에게)
- **WHY**: 일관성은 신뢰다. B2B/B2G 구매 결정권자는 "정돈된 사이트 = 정돈된 파트너"로 읽는다.
- **WHEN**: 모든 페이지·컴포넌트·카피 생성 및 수정 전에 이 문서를 먼저 참조한다.
- **HOW**:
  - 새 값(컬러/폰트/그림자/간격/컴포넌트)을 발명하지 않는다. 아래 토큰·컴포넌트만 조합한다.
  - 필요한 패턴이 여기 없으면 → 임의 생성 금지. 홈/P1~P4 확정 파일에서 동일 목적의 기존 패턴을 찾아 재사용한다.
  - 규칙 충돌 시 우선순위: **홈 확정본 > 코퍼레이트 확정본 > P1~P4 프로토타입**.

---

## 1. Project Philosophy (프로젝트 철학)

**WHY — KEESS는 무엇인가**
- KEESS는 KG에듀원 HRD사업본부의 **기업·기관 교육 도입 문의 채널(B2B·B2G 인바운드)**이다. 결제·가격 노출이 없는, 제품 소개와 상담 전환 중심 플랫폼이다.
- KEESS는 "교육을 파는 곳"이 아니라 **"조직 전환(Transformation)을 설계하는 파트너"**로 스스로를 규정한다.

**핵심 명제 (사이트 전체를 지배하는 한 문장)**
> "진단으로 설계하고, 효과로 증명합니다." — 확정 홈 히어로

- 모든 화면은 이 명제의 변주다: **먼저 진단 → 직무로 좁혀 설계 → 실행 → 숫자로 증명.**
- "과정을 고르기 전에, 조직을 먼저 진단합니다."(홈)가 서비스 철학의 표준 표현이다.

**WHEN/HOW**
- 어떤 페이지든, 방문자가 "이 회사는 우리 조직을 이해하고 성과를 책임진다"고 느끼게 한다.
- 기능·커리큘럼 나열보다 **문제 정의 → 해결 여정 → 증거**의 서사를 우선한다.

---

## 2. Core UX Principles (핵심 UX 원칙)

프로젝트 전반에서 실제 사용 중인 원칙. 신규 화면도 반드시 이 원칙을 따른다.

| 원칙 | WHY | WHEN | HOW (프로젝트 내 검증된 구현) |
|---|---|---|---|
| **Diagnostic First** | 판매가 아닌 진단이 KEESS의 차별점 | 모든 상위 페이지 도입부 | "조직을 먼저 진단합니다" 서사, AI 성숙도 4단계, 텐트진단 |
| **Framework First** | 감이 아닌 체계로 신뢰 확보 | 역량·과정 설명 | 5단계 역량모델, Skill Matrix, 7대 교육체계 |
| **Journey / End-to-End** | 단발 교육이 아닌 전환 여정 판매 | 서비스 설명 | 진단→설계→학습→실행→성과 5 Step, 01·02·03 마이크로 스텝 |
| **Evidence Based / Outcome Driven** | "효과를 숫자로 증명" | 성과·레퍼런스 | 전후 비교 리포트, 8,000여 콘텐츠, 동시접속 2만·ISMS, 정량 지표 |
| **Content as Proof** | 콘텐츠 규모·품질이 곧 증거 | 콘텐츠/과정 노출 | 과정 수·신규 과정·위탁운영 기관을 증거로 배치 |
| **One Conversion Path** | 전환 경로를 흩뜨리지 않음 | 전 페이지 CTA | 최종 행동은 항상 "상담/진단/가이드 받기" 하나로 수렴 |
| **Progressive Disclosure** | 정보 과부하 방지 | 복잡한 선택지 | "어떤 목표로 오셨나요?" 목표별 경로, 직무 선택 후 단계 공개 |
| **Channel Separation** | 홈과 상세의 신뢰 근거 분리 | 홈 vs P1~P4 | **홈=전사 신뢰신호(인증·수상·고객사), P1~P4=여정 근거(진단·산출물·멘토링·정부지원)만.** 상세페이지에 전사 인증/고객사 로고 반복 금지 |

---

## 3. Visual Identity (비주얼 아이덴티티)

### 3-1. Color Tokens (확정 홈 기준, 절대 신규 생성 금지)
```css
/* Neutral base — 홈/코퍼레이트 canonical */
--bg:#FAFAFB;      /* 페이지 배경 */
--ink:#14141A;     /* 기본 텍스트·다크 surface·버튼 */
--muted:#54585f;   /* 보조 텍스트·eyebrow */
--line:#E6E8EC;    /* 구분선·테두리 */
--surface:#F3F5F8; /* 카드·톤 박스 배경 */

/* Pillar accents — 포인트 컬러 전용 */
--p1:#2E1A6B; /* AX·AI 전환 · Royal Purple */
--p2:#E91E63; /* 리더십·조직 · Magenta */
--p3:#8B27A8; /* HRD 통합 솔루션 · Violet */
--p4:#F58220; /* 콘텐츠 솔루션 · Orange */
--gov:#F4B83A;/* 정부지원 · Yellow (크로스 배지) */
```

**Pillar 톤 규칙 (P1~P4 페이지에서 검증됨)**
- **WHY**: 페이지마다 정체성은 주되, 사이트는 하나로 보여야 한다.
- **HOW**: 필러 페이지는 중립 베이스를 **각 필러색으로 아주 옅게 틴트**한다. 필러색 자체(#2E1A6B 등)는 **포인트(배지·번호·강조·CTA 강조)에만** 쓴다. 페이지 전체를 필러색으로 칠하지 않는다.
  - P1(AX·AI): `--bg:#FCFCFE --surface:#F4F2FB --ink:#15131D --line:#EAE8F2` (보라 틴트)
  - P2(리더십): `--bg:#FDFBFC --surface:#FCEBF2 --ink:#181318 --line:#F0E3EA` (마젠타 틴트)
  - P3(HRD): `--surface:#F4EAFA --line:#ECE0F4 --ink:#1A1420` (바이올렛 틴트)
  - P4(콘텐츠): `--surface:#F7F4EF --ink:#15131D` (웜 틴트)
- **홈/코퍼레이트**는 틴트 없는 중립 베이스(#FAFAFB) + 4색을 필러 구분에 병렬 사용.
- **DON'T**: 필러색을 큰 배경면·대형 텍스트 전체에 사용. 4색을 한 컴포넌트에 동시 혼합.

### 3-2. Typography
```css
--serif:"Gowun Batang",serif;                 /* 디스플레이/선언(manifesto) 전용 */
/* UI·본문 */ font-family:"Pretendard Variable",Pretendard,system-ui,sans-serif;
body: line-height:1.6; letter-spacing:-.01em; -webkit-font-smoothing:antialiased;
```
- **Pretendard Variable** = 기본 UI·본문·헤딩. **Gowun Batang(serif)** = 선언형 대형 문구(예: 매니페스토, 감성 헤드라인)에만 제한적으로.
- **Type scale (clamp, 반응형) — 검증된 값만 사용**:
  - Hero H1: `clamp(40px,6.8vw,84px)` 또는 `clamp(34px,6vw,74px)`
  - Manifesto(serif): `clamp(30px,5.2vw,60px)`, line-height 1.25
  - Section title: `clamp(27px,3.8vw,42px)` / `clamp(26px,4vw,46px)`
  - Sub/Lead: `clamp(16px,1.8vw,20px)` / `clamp(15px,1.7vw,19px)`, line-height 1.7, max-width ~54ch
  - Body: 14~15px, line-height 1.6~1.7
  - **Eyebrow**: 12.5px, `letter-spacing:.16em`, `text-transform:uppercase`, weight 700, color `--muted` (또는 히어로 위 rgba(255,255,255,.78))
- **WHY 폰트 2종만**: 다중 서체는 통일성을 깬다. 확장 금지.

### 3-3. Spacing / Grid / Layout tokens
```css
--maxw:1200px; /* 홈·코퍼레이트 */   /* 필러 페이지: 1180px */
--gut:24px;    /* 좌우 거터 */
```
- 섹션 상하 여백: `.section` 120px(desktop)/74px(mobile); `.pillar` 108px/70px. **섹션 간 리듬을 이 값으로 유지.**
- 콘텐츠 최대폭: 홈 1200 / 필러 1180. 본문 텍스트 가독폭 ~54ch.

### 3-4. Radius / Elevation / Surface
```css
--r:20px; /* 카드·톤 박스 기본 라운드 */
--shadow-1:0 1px 2px rgba(20,20,26,.05),0 2px 8px rgba(20,20,26,.05);   /* rest, 낮은 카드 */
--shadow-2:0 2px 6px rgba(20,20,26,.06),0 10px 26px rgba(20,20,26,.09); /* hover·부유 요소 */
--shadow-3:0 6px 14px rgba(20,20,26,.08),0 22px 52px rgba(20,20,26,.14);/* 모달·최상위 */
```
- Radius 규칙: 카드/surface = `--r`(20px); 버튼·칩·필 = `999px`(pill); 모달(pv-dialog) = 22px; 소형 메뉴·드롭다운 = 12px.
- Elevation은 위 3단계만. 임의 그림자 금지.

### 3-5. Icon / Illustration / Image
- 아이콘: 인라인 SVG, 얇은 라인·모노톤(텍스트색 상속). 컬러 아이콘 남발 금지.
- 이미지: 히어로/필러 미디어는 대형 배경 이미지 + 스크림(scrim) 오버레이로 텍스트 대비 확보. Ken Burns 류 느린 확대(`@keyframes hs-kb`)만 허용.
- 일러스트: 확정본에 없는 장식 일러스트 신규 도입 금지. 데이터·구조 도식(진단 단계, 프레임워크) 위주.

---

## 4. Layout System

- **Container**: `.wrap`류, `max-width:var(--maxw)`, 좌우 `--gut`. 모든 섹션 내부는 이 컨테이너로 정렬.
- **Section**: 세로 리듬 120/74(pillar 108/70). 섹션 구분은 `border-top:1px solid var(--line)` 또는 배경 톤 전환.
- **Hero 구조 (표준)**: 다크/이미지 배경 → `eyebrow`(영문 카테고리) → `h1`(대형, 단어별 등장) → `sub`(리드) → `actions`(CTA 1차+2차) → 하단 `chips`(핵심 특징 4개) / KPI stat. 홈 히어로는 5장 캐러셀(`hero-slide`).
- **CTA 구조**: 1차 = `btn-ink`(고대비), 2차 = `btn-glass`/`btn-line-dark`(보조). 항상 **1차는 하나**. 최종 CTA는 "상담/진단/가이드"로 수렴.
- **Sticky Navigation**: `.nav` fixed, `z-index:70`, height 72px. 스크롤 시 배경·보더 페이드 전환(`transition:background .5s`). 모바일은 `.mmenu` 풀스크린 오버레이.
- **Footer**: `.foot` 다크(`--ink`) 배경, 60px 패딩, 상단 구분선(rgba white .12). 필러 네비/회사 정보/SNS/패밀리 메뉴.
- **Breakpoints (검증된 값만)**: 1040 / 940 / 880 / 820 / 760 / 740 / 720 / 640 / 560px. 신규 임의 브레이크포인트 금지. 모션은 `@media(prefers-reduced-motion:reduce)` 대응 필수.
- **우측 도구**: 페이지 도트(`.pdots`), 최상단 이동 FAB(`.to-top`, 48px 원형, `--ink`→hover `--p1`).

---

## 5. Component Principles

각 컴포넌트: **존재 이유 · 사용 위치 · 금지 규칙**. 아래는 확정본에 존재하는 컴포넌트만 정의한다.

- **Nav (`.nav`/`.nav-in`)** — WHY: 상시 전환 경로 유지. WHEN: 모든 페이지. HOW: fixed 72px, 스크롤 배경 전환, 우측 "교육 상담" CTA 고정. 금지: 스크롤 시 사라지는 nav, 메뉴 5개 초과.
- **Section Header (eyebrow + title + sub)** — WHY: 스캔 가능한 위계. WHEN: 모든 섹션 도입. HOW: 영문 eyebrow(대문자·자간 .16em) → 국문 title(clamp) → sub 리드. 금지: eyebrow 없이 본문 시작, 두 줄 초과 eyebrow.
- **Metric / KPI (`.stat`/`.kpi`/`.val`)** — WHY: 증거 제시. WHEN: 성과·규모 강조. HOW: 큰 숫자 + 짧은 라벨(예 "8,000여 / 보유 콘텐츠"). 카운트업 애니메이션 허용. 금지: 근거 없는 수치, 소수 남용.
- **Journey Step (`.step`/`.std`/`.snum`/`steps-fill`)** — WHY: 여정 시각화. WHEN: 진단→성과 흐름. HOW: 01·02·03 번호 + 명사구 제목 + 한 줄 설명, 진행 라인. 금지: 4단계 흐름을 임의 색으로 구분.
- **Framework** — WHY: 역량 체계 신뢰. WHEN: 역량/레벨 설명. HOW: Lv1~Lv5 카드, 단계별 "고민→처방" 페어링. 금지: 레벨 수 임의 변경.
- **Pillar Card (`.pillar`/`.pgrid`/`.pbadge`)** — WHY: 4대 솔루션 병렬 소개. WHEN: 홈. HOW: 번호 + 필러색 배지 + 제목 + 01·02·03 포인트. 필러색은 배지/번호에만.
- **Badge / Chip (`.chip`/`.chips`/`.mchip`/`.pbadge`)** — WHY: 핵심 특징·태그 압축. WHEN: 히어로 하단, 카드 태그. HOW: pill(999px), 저대비 배경. 금지: 문장형 칩, 색 남발.
- **Button (`.btn` 계열)** — WHY: 행동 위계 명확화. HOW: `btn-ink`(1차·고대비 `--ink`/역전 시 흰색), `btn-glass`(히어로 위 반투명), `btn-line-dark`(보조·아웃라인). 모두 pill, `gap` 아이콘. hover: `translateY(-2px)`+shadow. 금지: 한 화면 1차 버튼 다수.
- **Card (`.card`/`.ref`/`.cert`)** — WHY: 정보 단위화. HOW: `--surface` 배경 또는 흰 배경+`--line`, radius `--r`, hover `translateY(-3px)`+shadow-2. 금지: 20px 외 라운드, 임의 그림자.
- **Tab (`.faq-tab`)** — WHY: 밀도 높은 분류 탐색. HOW: 아웃라인 pill, 선택 시 `--ink`. hover 살짝 상승.
- **Accordion / FAQ (`.faq-item`/`.faq-q`/`.faq-a`/`.chev`)** — WHY: 정보 점진 공개. WHEN: FAQ·상세. HOW: 질문 행 + 셰브론 회전 + 높이 애니메이션. 금지: 기본 전체 펼침.
- **Modal / Dialog (`.pv-dialog`/`.pvi`)** — WHY: 맥락 이탈 없이 상세·미리보기. HOW: 중앙, radius 22px, shadow-3, `translateY(16px) scale(.985)`→진입, 배경 스크림. `pvfade` 애니메이션. 금지: 중첩 모달.
- **Carousel (`.hero-slide`/`.hs-*`)** — WHY: 홈 히어로 다중 메시지. HOW: 5장, Ken Burns 배경, 도트 인디케이터, 자동+수동. 금지: 상세페이지 히어로 캐러셀 남용.
- **Floating CTA / To-top (`.to-top`)** — WHY: 긴 페이지 전환·복귀 보조. HOW: 우하단 48px 원형 FAB, 스크롤 후 등장. 금지: 콘텐츠 가리는 대형 부유 배너.
- **Contact / Diagnostic Form (`.field`/`.req`/`.err`)** — WHY: 유일한 전환 지점. WHEN: 상담/가이드/진단. HOW: 회사·담당자·이메일·규모·관심영역, 필수 표시(`req`), 인라인 검증(`err`), 개인정보 동의. B2B(기업)/B2G(공공) 부문 선택. 금지: 결제·가격 필드.

---

## 6. Motion System

**WHY**: 모션은 "정돈된 고급감"을 만든다. 과하면 산만, 없으면 저렴해 보인다. 아래 값만 사용한다.

```css
--ease:cubic-bezier(.22,.61,.36,1);     /* 기본 감속 — 등장·이동 */
--ease-out:cubic-bezier(.2,0,0,1);       /* 강한 감속 */
```
- **Scroll Reveal (표준)**: 요소 `.r{opacity:0;transform:translateY(24px)}` → 뷰포트 진입 시 `.in`으로 `opacity:1;transform:none`. `IntersectionObserver({threshold:.16})`, 1회(`unobserve`). transition `.7s var(--ease)`.
- **Stagger**: `.stagger>*`에 동일 패턴, 자식 순차 등장.
- **Hero 등장 시퀀스**: eyebrow(.1s) → h1 단어별 `.w`(translateY 28px, .8s) → sub(.6s delay) → actions(.75s delay). 순차 지연으로 리듬 형성.
- **Hover elevation**: 카드 `translateY(-3px)`, 버튼 `translateY(-2px)` + shadow 상승. active 시 살짝 눌림(`scale(.96~.985)`).
- **Timing 표준**: 등장/전환 .7~.9s, 인터랙션(hover/탭/토글) .2~.35s, 미세 .1~.18s.
- **Micro-interactions**: 셰브론 회전, 프로그레스 라인 채움(`steps-fill`), 카운트업, 셀렉트 메뉴 슬라이드(.25s).
- **Loading/Morph**: `@keyframes hs-kb`(히어로 켄번스), `pvfade`(모달), `sd`. 신규 keyframes는 기존 목적과 겹치면 금지.
- **접근성**: `@media(prefers-reduced-motion:reduce)`에서 모션 최소화 필수.
- **DON'T**: 바운스·과한 스프링, 무한 반복 강조 애니메이션, 1s 초과 등장.

---

## 7. Content Principles (카피라이팅)

**Tone**: B2B/B2G, 전문·신뢰·간결. 교육기관이 아닌 **Transformation Partner**의 목소리.

- **Heading**: 짧은 **선언형 평서문**("~합니다"). 대구(對句) 구조 선호. 예: "진단으로 설계하고, 효과로 증명합니다.", "AI 교육을 진단에서 시작해, 성과로 끝냅니다."
- **Eyebrow**: 영문 카테고리 라벨(AI Transformation / Leadership Development / References). 대문자·자간.
- **Sub/Lead**: 헤딩을 1~2문장으로 구체화. "무엇을·어떻게·무엇으로 증명"을 담되 54ch 이내.
- **Micro-step**: 01·02·03 번호 + **명사구 제목** + 한 줄 설명("진단으로 시작 / AI 성숙도 4단계로 현 위치를 봅니다.").
- **Metric**: 큰 숫자 + 짧은 라벨. 근거 있는 수치만("8,000여 콘텐츠", "동시접속 2만·ISMS").
- **Card**: 제목(명사구) + 1문장 설명 + 행동 링크("과정 살펴보기", "사례 문의").
- **FAQ**: 질문은 고객 언어의 실제 의문형, 답변은 간결·사실 위주.
- **CTA**: 동사형 명령("교육 상담 신청", "AX 진단 상담받기", "AX 도입 가이드 받기"). 최종 행동은 상담/진단/가이드로 수렴.
- **Evidence Writing**: 형용사보다 숫자·기관명·산출물명으로 증명("국민건강보험공단·한국전기안전공사가 위탁운영을 맡깁니다").
- **Placeholder 규칙**: 미확정 데이터는 "예시" 라벨 명시(홈 이벤트/사례 카드 관행).

---

## 8. Information Architecture Principles

- **Hierarchy**: eyebrow → title → sub → body → CTA의 고정 위계. 시선 흐름을 매 섹션 재현.
- **Progressive Disclosure**: 복잡한 선택은 "목표/직무 선택 후 공개". 첫 화면에 모든 정보 노출 금지.
- **Information Density**: 섹션당 1개 핵심 메시지 + 3~5개 근거. 카드 그리드는 3열(desktop)→2열→1열.
- **Scanning**: 번호(01·02·03), 짧은 명사구, 굵기 대비로 스캔 가능하게.
- **Grouping/Chunking**: 관련 정보를 카드·스텝 단위로 묶고, 섹션 사이 `--line` 또는 톤 전환으로 분리.
- **Visual Rhythm**: 섹션 여백(120/74)과 등장 모션으로 스크롤 리듬 유지. 밀도 높은 섹션 뒤에는 여백 섹션.

---

## 9. Content Strategy (콘텐츠를 증거로)

- **과정소개서 표현**: 커리큘럼 나열이 아니라 **문제→여정→산출물**로 재구성. 개별 과정은 상위 프레임워크(예 P1 AX Framework Lv1~Lv5)의 자산으로 배치.
- **대표 과정 노출**: "입문→실무→심화→자격" 또는 레벨 축으로 정렬. 대표성이 드러나게 소수 정예로 카드화.
- **영상 사용**: 미리보기(맛보기)·히어로 배경으로. 자동재생은 무음·스크림 위에서. 콘텐츠 이해를 돕는 보조로만.
- **정부지원 표현**: `--gov`(#F4B83A) 크로스 배지로 일관 표기("사업주훈련 환급"). 절차는 "담당 컨설턴트 안내"로 상담 전환에 연결. 가격/환급액 단정 금지.
- **Content as Proof**: 콘텐츠 규모(8,000여)·신규 과정·위탁운영 기관·시스템(ISMS·동시접속)을 신뢰 증거로 사용.
- **채널 분리(중요)**: 전사 인증·수상·고객사 로고는 **홈에서만**. P1~P4 상세는 여정 근거(진단·산출물·멘토링·정부지원 연계)만으로 신뢰를 만든다.

---

## 10. Brand Voice

- **정체성**: KG에듀원 HRD사업본부의 전환 파트너. 기업·기관 담당자 대상.
- **권장 표현**: 진단, 설계, 여정, 성과, 증명, 정량, 현업 적용, 전환, 책임진다, 맞춤. 선언형 평서문·대구.
- **금지 표현**: 과장·최상급 남발("최고", "1위" 근거 없이), 소비자 판촉 톤, 가격·할인·결제 유도, 이모지, AI 티 나는 상투어, 감탄사 남용.
- **문체**: 간결·단정. 형용사보다 숫자와 사실. 담당자를 존중하되 과잉 공손·장황 금지.

---

## 11. Do / Don't

**DO**
- 홈 확정본의 토큰·컴포넌트·모션만 조합해 새 화면 구성.
- 필러색은 포인트로만, 중립 베이스 유지.
- 섹션마다 eyebrow→title→sub→근거→CTA 위계 재현.
- 증거(숫자·기관·산출물)로 주장 뒷받침.
- 모든 전환을 상담/진단/가이드로 수렴.
- `prefers-reduced-motion` 대응.

**DON'T**
- 신규 컬러·폰트·그림자·라운드·브레이크포인트 생성.
- 필러색으로 페이지 전체 배경 채우기, 4색 동시 혼용.
- 상세페이지에 전사 인증/고객사 로고 반복(채널 분리 위반).
- 한 화면 1차 CTA 다수, 전환 경로 분산.
- 가격·결제·장바구니 요소 추가.
- 바운스/무한 반복/1s 초과 등장 모션.
- 확정 구조(IA·섹션 순서) 임의 변경.

---

## 12. Coding Convention

- **HTML**: 시맨틱 태그(`header/nav/section/article/footer`). 섹션 = `<section class="section">` + 내부 `.wrap` 컨테이너. 단일 파일 프로토타입 관행(스타일·스크립트 인라인) 유지.
- **CSS**:
  - **토큰 우선**: 색·간격·라운드·그림자·이징은 반드시 `var(--*)` 사용. 하드코딩된 hex/px 신규 도입 지양.
  - **커스텀 프로퍼티**: `--kebab-case`. 필러 `--p1~--p4`, `--gov`. 시스템 `--bg/--ink/--muted/--line/--surface/--r/--maxw/--gut/--ease/--ease-out/--shadow-1~3/--serif`.
  - 반응형은 정해진 브레이크포인트만.
- **Class Naming**: 소문자·하이픈, 짧고 기능적. 블록 접두사로 컴포넌트 그룹화: `nav-*`, `hero-slide`/`hs-*`, `faq-*`, `pv-*`(preview dialog), `pillar`/`pgrid`/`pbadge`, `steps`/`std`/`snum`, `btn`/`btn-ink`/`btn-glass`/`btn-line-dark`, `chip`/`mchip`, `eyebrow`, `stat`/`val`.
- **모션 클래스**: 등장 `.r`, 그룹 `.stagger`, 활성 `.in`/`.on`. 이 네이밍을 재사용(신규 명명 금지).
- **Animation Naming**: `@keyframes`는 목적 접두(`hs-kb`, `pvfade`). 기존과 목적 중복 시 재사용.
- **JS**: 스크롤 리빌은 공통 `IntersectionObserver(threshold:.16)` 패턴 재사용. 컴포넌트 초기화는 셀렉터 기반, 전역 오염 최소화.

---

## 13. Future Rule (미래 규칙 — 새 페이지를 만들 때 반드시)

1. **토큰 상속**: 새 페이지도 `:root` 시스템 토큰을 그대로 가져온다. 필러 페이지면 해당 필러 틴트 4값(`--bg/--surface/--ink/--line`)만 교체, 나머지·필러 accent·shadow·ease·font는 동일.
2. **컨테이너·리듬 준수**: `--maxw`(1200/1180)·`--gut`·섹션 여백(120/74·108/70) 유지.
3. **섹션 문법 준수**: eyebrow→title→sub→근거→CTA. 스크롤 리빌 `.r`/`.stagger` 적용.
4. **컴포넌트 재사용**: §5 목록에서 고른다. 없으면 확정 파일에서 동일 목적 패턴을 이식(신규 발명 금지).
5. **전환 수렴**: 최종 행동은 상담/진단/가이드 하나로.
6. **채널 분리 유지**: 홈=전사 신뢰, 상세=여정 근거.
7. **보이스 유지**: 선언형 평서문·대구·증거 기반. 금지 표현 배제.
8. **충돌 시**: 홈 확정본 > 코퍼레이트 > P1~P4 순으로 따른다. 애매하면 새로 만들지 말고 확정본을 확인한다.

> 이 문서와 어긋나는 화면은 "KEESS가 아니다." 일관성이 최우선이다.
