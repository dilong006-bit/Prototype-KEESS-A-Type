# KEESS A-Type · P1 AX·AI 전환 — 기술명세서 (페이지 단위)

| 항목 | 내용 |
|------|------|
| **Version** | 1.0 |
| **기준 PRD** | `../prd/PRD_P1_AXAI.md` |
| **원본** | `../prototype/keess_P1_AXAI_D_scenario_v7.html` (D 확정) |
| **전제** | 홈/공통 컴포넌트 레이어 완료(`components/common/*`, `styles/components.css`, `lib/useReveal.ts`, `data/site.ts`) |

> ★ **디자인 시스템의 유일 기준 = 홈(`../Design.md`).** P1도 무조건 홈 디자인 시스템(토큰·공통 컴포넌트)을 따른다. `../prototype/keess_P1_AXAI_D_scenario_v7.html`는 **단발성 시안**으로, **섹션 구성·순서·인터랙션·카피만 참고**한다 — 그 자체의 CSS·색토큰·버튼 변형·비주얼 스타일은 **이식하지 않는다.** 카피는 `data/axai.tsx`에 시안 문구 그대로. **D 확정 — 구성·카피 변경 금지, 비주얼은 홈 언어로 재현.**

## 1. 파일 구성 (신규)
```
app/ax-ai/page.tsx                      # .tint-p1 wrapper + 전 섹션 조립
styles/axai.css                         # P1 고유 레이아웃 뼈대만(계단/포지셔닝맵/GAP바/비교표) — 홈 토큰(var(--*))으로. 시안 CSS 복붙 금지
data/axai.tsx                           # P1 전체 카피·데이터(시안 문구 verbatim — 콘텐츠만)
components/sections/axai/
  ├─ ScenarioSelector.tsx               # #scenario 목표별 경로
  ├─ EndToEndSteps.tsx                  # #service 5 Step + 산출물
  ├─ FrameworkStair.tsx                 # #framework Lv1~5 계단 + 고민→처방
  ├─ JobMap.tsx                         # #jobs 포지셔닝 맵 + 직무 선택
  ├─ WhyTable.tsx                       # #why 비교표
  ├─ GapEvidence.tsx                    # 성과증거 GAP 바
  ├─ CourseLineup.tsx                   # #courses 6카드
  └─ CaseStudy.tsx                      # 도입 사례
components/common/GuideModal.tsx        # 가이드 받기(신규, Modal 재사용)
components/common/ConsultModal.tsx      # 상담 신청(신규, Modal/ContactForm 재사용)
```
- Nav(current='ax-ai')·Footer·Section·Button·Reveal·MetricStat·Modal·Field는 **기존 재사용**.

## 2. 라우트 · 셸
- `app/ax-ai/page.tsx`: 최상위 `<div className="tint-p1">` 래핑 → 하위 토큰(`--bg/--surface/--ink/--line`) 자동 상속. `Nav current="ax-ai"`, 섹션들, `Footer`, 모달 마운트.
- 컨테이너 폭 `--maxw:1180px`(필러). 홈과 달리 중립 아님.

## 3. 섹션 컴포넌트 계약 (props · 원본 매핑)
```ts
// #hero: 원본 .hero — 단어별 등장 h1, 칩 4, 스탯 2. (공통 Reveal + MetricStat)
// intro: "전환을 설계합니다" 4블록(진단·설계·실행·성과) + 스탯 3

ScenarioSelector({ scenarios })      // data-scen, renderScen: 목표 선택 → 패널 전환. useState(active)
EndToEndSteps({ steps })             // STEP1~5 {label,title,items[],output[]}
FrameworkStair({ levels })           // Lv1~5 {lv,name,pain,desc,areas[]}; setStage: 선택 → fwDesc/fwAreas 갱신
JobMap({ jobs, axes })               // 포지셔닝 맵(qplot) + jobPills → selectJob/renderJob: 직무별 5단계
WhyTable({ rows })                   // {기준, 일반, KG}[] 비교표
GapEvidence({ metrics })             // {label, pre, post}[]; 뷰포트 진입 시 pre/post 바 width 애니메이션
CourseLineup({ courses })            // 6카드 {tier, title}
CaseStudy({ cases })                 // KG그룹 AI LAB·8직무·워크숍(노출 협의 표기)
```
- 각 컴포넌트는 **홈 공통 컴포넌트·섹션 문법(eyebrow→title→sub→근거→CTA)·카드/간격/그림자 토큰**으로 구성. 시안 클래스명·스타일 이식 금지. P1 고유 레이아웃(계단/맵/GAP/비교표)만 `styles/axai.css`가 홈 토큰으로 담당.

## 4. 데이터 모델 (`data/axai.tsx`)
```ts
// 시안 JS 객체(scen/fw/jobs/…)의 데이터·카피를 타입 지정으로 옮김(콘텐츠만). 카피 verbatim.
interface Scenario { key:string; label:string; title:string; desc:string; chips:string[]; cta:string }
interface Step { no:string; title:string; items:string[]; output:string[] }
interface FwLevel { lv:string; name:string; pain:string; desc:string; areas:string[] }
interface Job { key:string; label:string; quadrant:'활용·생산성'|'활용·혁신'|'구축·생산성'|'구축·혁신'; steps:string[] }
interface WhyRow { 기준:string; 일반:string; kg:string }
interface GapMetric { label:string; pre:number; post:number }
interface Course { tier:string; title:string }
interface CaseItem { title:string; meta:{label:string; value:string}[] }
```

## 5. 인터랙션 로직
- **Reveal/Stagger**: 기존 `useReveal`(IntersectionObserver th .16, 1회 unobserve) 재사용.
- **Count-up**: 기존 MetricStat(카운트업, reduced-motion 즉시). 원본 `cup()`/`data-count`/`RM` 대응.
- **GAP 바**: 뷰포트 진입 시 `gap-pre`/`gap-post` width를 `data-w`(%)로 트랜지션. 전용 IO 또는 useReveal 확장. reduced-motion 시 즉시 최종 폭.
- **ScenarioSelector**: `useState` 활성 목표 → 패널 렌더(원본 renderScen 로직).
- **FrameworkStair**: `useState` 활성 Lv → desc/areas 갱신(원본 setStage). 계단 활성 스타일(.step.on).
- **JobMap**: `useState` 활성 직무 → 5단계 스텝(원본 selectJob/renderJob). 포지셔닝 맵 점 위치는 data 기반.
- **GuideModal**: 공통 `Modal` + 필드(회사·담당자·이메일·동의). `validEmail` 검증 → 성공 뷰(guide-done). 실패 시 필드 강조. 백엔드 없음.
- **ConsultModal**: 공통 `Modal` + 필드(부문 select B2B/B2G·규모 select·회사·담당자·이메일·관심영역·연락처·문의). 검증 → 성공 뷰(done-view). 백엔드 없음.
- 모달 트리거: hero/inq/nav의 "AX 진단 상담받기"→ConsultModal, "AX 도입 가이드 받기"→GuideModal.
- **원본 버그 주의**: 원본에 중복 id가 있으면(예: 여러 폼 필드) React에서 고유 id로 분리.

## 6. 스타일 (`styles/axai.css` — 최소)
- **시안 `<style>` 발췌·이식 금지.** P1 고유 레이아웃(framework 계단·jobs 포지셔닝맵·gap 바·why 비교표 그리드 등)의 **뼈대만** 새로 작성하되 **색·간격·라운드·그림자·이징은 Design.md 토큰(var(--*))만** 사용. 신규 hex/px 0.
- 보라 액센트가 필요하면 필러 포인트 `--p1`(#2E1A6B)만. 시안의 --rp/--acc/--lilac·btn-rp 등 신설 금지.
- 공통 요소(.section/.eyebrow/.btn/.card/.wrap 등)는 `styles/components.css` 재사용(중복 금지). 틴트는 globals의 `.tint-p1` 담당(색값 재선언 금지).

## 7. 접근성·반응형
- 모달 포커스 트랩·ESC·스크림·body 잠금(공통 Modal). 선택 UI(scenario/framework/job) 키보드 조작·`aria-selected`. 폼 라벨·인라인 에러.
- 포지셔닝 맵·계단·5스텝 그리드는 원본 브레이크포인트대로 축소(모바일 1열). `prefers-reduced-motion` 대응.

## 8. 검증 (DoD)
- **구성·인터랙션 = P1 시안과 일치**, **비주얼 = 홈 디자인 시스템(Design.md)과 일관**. → 시안과의 픽셀 1:1 대조는 목표 아님. `full-page-screenshot`로 `/ax-ai` 캡처 후 **홈 페이지와 나란히** 톤 일관성 점검.
- scenario/framework/job/gap/count-up/2모달 동작 확인.
- `next build` 무오류(홈 회귀 없음), 5라우트 정적 유지, **신규 색토큰·서체·버튼변형 0**.

## 9. Handoff
- 본 스펙 기준 Claude Code P1 빌드 프롬프트로 전환. 완료 후 P2(/leadership)로 진행.
