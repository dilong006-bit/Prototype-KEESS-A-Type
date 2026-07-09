# KEESS A-Type · P2 리더십·조직 — 기술명세서 (페이지 단위)

| 항목 | 내용 |
|------|------|
| **Version** | 1.0 |
| **기준 PRD** | `../prd/PRD_P2_leadership.md` |
| **디자인 기준(SoT)** | `../Design.md`(홈 디자인 시스템) |
| **구성 참고(시안)** | `../prototype/keess_P2_leadership_A_journey_v1.0.html` (A안 Journey · 구성·인터랙션·카피만 참고, 스타일 이식 X) |
| **전제** | 홈/공통 컴포넌트 레이어 완료(`components/common/*`, `styles/components.css`, `lib/useReveal.ts`, `data/site.ts`), P1 완료 |

> ★ **디자인 시스템의 유일 기준 = 홈(`../Design.md`).** P2도 무조건 홈 디자인 시스템(토큰·공통 컴포넌트)을 따른다. 시안은 **단발성**으로 **섹션 구성·순서·인터랙션·카피만 참고** — 시안의 CSS·색토큰(--mg/--mg2/--acc/--pink)·버튼 변형(btn-mg/btn-sec)·비주얼은 **이식하지 않는다.** 카피는 `data/leadership.tsx`에 시안 문구 그대로. **비주얼은 홈 언어로 재현, 푸터는 홈 공통 유지.**

## 1. 파일 구성 (신규)
```
app/leadership/page.tsx                 # .tint-p2 wrapper + 전 섹션 조립 + SubNav + 모달
styles/leadership.css                   # P2 고유 레이아웃 뼈대만(journey 타임라인/휠/스텝퍼/growthfit) — 홈 토큰(var(--*))으로. 시안 CSS 복붙 금지
data/leadership.tsx                      # P2 전체 카피·데이터(시안 문구 verbatim — 콘텐츠만)
components/sections/leadership/
  ├─ HeroLeadership.tsx                 # #hero (공통 Hero 패턴 재사용 + P2 카피/비주얼)
  ├─ PainChips.tsx                      # #pain 4칩
  ├─ GrowthJourney.tsx                  # #journey 6단계 타임라인 + Architecture 5스텝
  ├─ TrackCards.tsx                     # #tracks 6 역량 카드
  ├─ LeadershipWheel.tsx                # #framework 리더십 휠(SVG) + 상세 패널
  ├─ StageStepper.tsx                   # #offline 성장시점 4스테이지 스텝퍼
  ├─ GrowthFitDiagnosis.tsx            # #growthfit 6 Core Dimensions
  └─ WhyLeadership.tsx                  # #why 3카드 + 강사 통합 4스텝
```
- Nav(current='leadership')·Footer·SubNav·Section·SectionHeader·Button·Card·Chip·Badge·Reveal·Modal·InquiryForm은 **기존 재사용**. 신규 컴포넌트는 위 P2 고유 섹션에 한함.

## 2. 라우트 · 셸
- `app/leadership/page.tsx`: 최상위 `<div className="tint-p2">` 래핑 → 하위 토큰(`--bg/--surface/--ink/--line`) 자동 상속. `Nav current="leadership"`, `SubNav`(스크롤스파이), 섹션들, `Footer`(홈 공통 다크·부정훈련 예방/신고), 모달 마운트.
- 컨테이너 폭 `--maxw:1180px`(필러). 홈과 달리 중립 아님.
- **SubNav items**: 고민(pain)·성장여정(journey)·6대 역량(tracks)·Framework(framework)·오프라인(offline)·조직진단(growthfit)·차별점(why)·도입문의(inq). 공통 SubNav에 items 주입.

## 3. 섹션 컴포넌트 계약 (props · 시안 매핑)
```ts
// 모든 섹션은 홈 Section/SectionHeader(eyebrow→title→sub) 래퍼 + 홈 Card/Chip/Badge/Button 사용.
HeroLeadership({ tag, title, sub, ctas, strip, visual })
  // title에 마젠타 그라디언트 강조는 --p2 포인트로. visual=실사 img(onerror 폴백)+float 2+label
PainChips({ chips })              // {text(강조 span 포함)}[] 4개
GrowthJourney({ steps, arch })    // steps: 6단계 {no,stage,role,tags[4]}; arch: 5 {no,title,desc}
TrackCards({ tracks })            // 6 {initial,key,name,desc}
LeadershipWheel({ tracks })       // 6 {k,ko,nm,t,d,a[]}; 원형 SVG 6세그먼트 + 상세 패널
StageStepper({ stages })          // 4 {ph,key,nm,en,sub:[{t,d,caps[]}]}; 초기 index 0
GrowthFitDiagnosis({ dims, tbd }) // 6 {en,ko}; tbd 배지
WhyLeadership({ cards, faculty }) // cards 3 {n,title,desc}; faculty {sub, steps:[{n,title,desc}]×4}
```
- 각 컴포넌트는 **홈 공통 컴포넌트·토큰·섹션 문법(eyebrow→title→sub→근거→CTA)·카드/간격/그림자 토큰**으로 구성. 시안 클래스명(.jstep/.tcard/.step 등)·스타일 이식 금지. P2 고유 레이아웃(타임라인·휠·스텝퍼)만 `styles/leadership.css`가 홈 토큰으로 담당.

## 4. 데이터 모델 (`data/leadership.tsx`)
```ts
// 시안 JS 객체(TRACKS/PROG/journey/arch/…)의 데이터·카피를 타입 지정으로 옮김(콘텐츠만). 카피 verbatim.
interface JourneyStep { no:number; stage:string; role:string; tags:string[] }   // 6
interface ArchStep   { no:string; title:string; desc:string }                    // 5
interface Track      { initial:string; key:string; name:string; desc:string }    // 6 (#tracks)
interface WheelTrack { k:string; ko:string; nm:string; t:string; d:string; a:string[] } // 6 (#framework)
interface Stage      { ph:string; key:string; nm:string; en:string;
                       sub:{ t:string; d:string; caps:string[] }[] }             // 4 (#offline)
interface GfDim      { en:string; ko:string }                                    // 6 (#growthfit)
interface WhyCard    { n:string; title:string; desc:string }                     // 3
interface FacStep    { n:string; title:string; desc:string }                     // 4
interface InquiryOption { value:string; label:string }                           // 관심영역 select
```
- 시안의 `TRACKS`(휠 6)·`PROG`(스테이지 4)·journey 6·arch 5·tracks 6·growthfit 6·why 3·faculty 4를 그대로 이식. TBD 표기("상세 문항 확보 후 확장"·"강사 프로필 확보 후 확장") 보존.

## 5. 인터랙션 로직
- **Reveal/Stagger**: 기존 `useReveal`(IntersectionObserver th .16, 1회 unobserve) 재사용. 시안 .12 → .16 정규화.
- **Nav/SubNav 스크롤스파이**: 공통 Nav(solid on scroll)·SubNav(스크롤 임계 후 show + 현재 섹션 active). `goTo(id)`는 공통 스무스 스크롤(offset ~96px).
- **LeadershipWheel(#framework)**:
  - SVG 6세그먼트를 극좌표로 생성(세그먼트 각 60°, RO 150 / RI 86 기준을 뷰포트 폭에 맞게 반응형). 중앙 코어 원 + 라벨("Leadership · 6 tracks").
  - 섹션 뷰포트 진입 시 세그먼트 **순차 페이드 등장**(stagger). `useState` 활성 인덱스 → 상세 패널(hint=k, name=ko+t, desc=d, caps=a[]) 갱신 + 중앙 라벨 갱신.
  - 세그먼트 색: **--p2 기반 마젠타 스케일 6단계**(데이터 시각화 포인트, PRD IV 허용). hover 시 mid-angle 방향 소폭 이동. `<g role="button" tabindex=0>` 키보드 Enter/Space 대응, `aria-selected`.
  - reduced-motion: 순차 등장·이동 생략, 즉시 표시.
- **StageStepper(#offline)**: `useState` 활성 스테이지 → 하위 프로그램 패널(`sub[]` → 카드 t/d/caps) 렌더. 초기 index 0. 버튼 `aria-selected`, 스텝 간 화살표(→)는 데스크톱만, 모바일 세로 전환 시 숨김.
- **Count-up**: hero/journey 등 수치 강조가 있으면 기존 MetricStat(카운트업, reduced-motion 즉시). 시안엔 명시 카운트업 없음 → 불필요 시 생략.
- **도입 문의 모달**: 공통 `Modal` + 안내 문구 → "문의 폼으로 이동"(#inq 스크롤 + 닫기). nav·hero CTA에서 트리거. 포커스 트랩·ESC.
- **InquiryForm(#inq)**: 공통 `InquiryForm`/`LeadForm` 재사용. 필드(회사명·담당자·연락처·관심영역 select[리더십·조직(P2) 기본선택]·문의 내용). 검증 → 성공 뷰("문의가 접수되었습니다"). 백엔드 없음.
- **원본 버그 주의**: 시안에 중복 id가 있으면 React에서 고유 id로 분리.

## 6. 스타일 (`styles/leadership.css` — 최소)
- **시안 `<style>` 발췌·이식 금지.** P2 고유 레이아웃의 **뼈대만** 새로 작성하되 **색·간격·라운드·그림자·이징은 Design.md 토큰(var(--*))만** 사용. 신규 hex/px 0:
  - `#journey` 6단계 수평 타임라인(레일 + 6그리드, 반응형 2열/1열) + Architecture 5그리드.
  - `#framework` 휠 레이아웃(SVG 컨테이너 + 상세 패널 2열, 모바일 1열).
  - `#offline` 스텝퍼(가로 flex + 화살표, 모바일 세로) + 패널 하위 그리드.
  - `#growthfit` 6 dims 그리드.
- 마젠타 강조는 필러 포인트 `--p2`(#E91E63)만. 휠/타임라인의 다단 마젠타 스케일은 `--p2`에서 파생(밝기 변주)해 데이터 시각화 포인트로만 사용. 시안의 --mg/--mg2/--mg3/--acc/--pink·btn-mg·#6A3FB8 등 신설 금지.
- 공통 요소(.section/.eyebrow/.btn/.card/.wrap/.badge 등)는 `styles/components.css` 재사용(중복 금지). 틴트는 globals의 `.tint-p2` 담당(색값 재선언 금지).

## 7. 접근성·반응형
- 모달 포커스 트랩·ESC·스크림·body 잠금(공통 Modal). 선택 UI(휠·스텝퍼) 키보드 조작·`aria-selected`·포커스 링. 폼 라벨·인라인 에러. 휠 SVG `role="img"`/세그먼트 `role="button"`+`aria-label`.
- 확정 브레이크포인트대로 축소: 타임라인 6→2→1열, 휠 축소(모바일 280px), 스텝퍼 세로, arch/dims 그리드 축소. `prefers-reduced-motion` 대응.

## 8. 검증 (DoD)
- **구성·인터랙션 = P2 시안과 일치**(9섹션·휠·스텝퍼·SubNav), **비주얼 = 홈 디자인 시스템(Design.md)과 일관**. → 시안과의 픽셀 1:1 대조는 목표 아님. `full-page-screenshot`로 `/leadership` 캡처 후 **홈·P1과 나란히** 톤 일관성 점검.
- 휠 세그먼트 클릭·스텝퍼 전환·스크롤스파이·문의 폼 검증/성공·모달 동작 확인.
- `next build` 무오류(홈·P1 회귀 없음), 5라우트 정적 유지, **신규 색토큰·서체·버튼변형 0**(휠/타임라인 --p2 파생 스케일만 예외). 공통 Footer(부정훈련 예방/신고) 정상.

## 9. Handoff
- 본 스펙 기준 Claude Code P2 빌드 프롬프트(`../PROMPT_04_build_P2.md`)로 전환. 완료 후 P3(/hrd)로 진행.
