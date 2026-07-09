# KEESS A-Type · P3 HRD 통합 솔루션 — 기술명세서 (페이지 단위)

| 항목 | 내용 |
|------|------|
| **Version** | 1.0 |
| **기준 PRD** | `../prd/PRD_P3_hrd.md` |
| **디자인 기준(SoT)** | `../Design.md`(홈 디자인 시스템) |
| **구성 참고(시안)** | `../prototype/keess_P3_hrd_A_integrated_v1.6.html` (A안 통합 서사형 · 구성·인터랙션·카피만 참고, 스타일 이식 X) |
| **전제** | 홈/공통 컴포넌트 레이어 완료, P1·P2 완료 |

> ★ **디자인 시스템의 유일 기준 = 홈(`../Design.md`).** P3도 무조건 홈 디자인 시스템(토큰·공통 컴포넌트)을 따른다. 시안은 **단발성**으로 **섹션 구성·순서·인터랙션·카피만 참고** — 시안의 CSS·색토큰·버튼 변형·비주얼은 **이식하지 않는다.** 카피는 `data/hrd.tsx`에 시안 문구 그대로. **비주얼은 홈 언어로 재현, 푸터는 홈 공통 유지.** 시안 내 P2 잔여 코드(휠·스텝퍼 CSS/JS)는 무시.

## 1. 파일 구성 (신규)
```
app/hrd/page.tsx                        # .tint-p3 wrapper + 전 섹션 + SubNav + 모달
styles/hrd.css                          # P3 고유 레이아웃 뼈대만(고충매핑/3축/목업/HOW타임라인/스튜디오split/KGESA데모/프로세스) — 홈 토큰으로. 시안 CSS 복붙 금지
data/hrd.tsx                            # P3 전체 카피·데이터(시안 문구 verbatim — 콘텐츠만)
components/sections/hrd/
  ├─ HeroHrd.tsx                        # #hero
  ├─ PainSolutionMap.tsx               # #pain 고충→해결 4행
  ├─ SolutionAxes.tsx                  # #solution 3축 카드
  ├─ SystemMockup.tsx                  # #system B3-1 split + 목업
  ├─ OpsTimeline.tsx                   # #ops HOW 7축 타임라인
  ├─ StudioSplit.tsx                   # #studio B3-3 실사 split
  ├─ ClientCases.tsx                   # #cases 로고월 + 강조
  ├─ KgesaDemo.tsx                     # #kgesa 인터랙티브 데모(컨트롤+FO) + AiJourney
  └─ ProcessFlow.tsx                   # #process 도입 4스텝
```
- Nav(current='hrd')·Footer·SubNav·Section·SectionHeader·Button·Card·Chip·Badge·Reveal·Modal·InquiryForm은 **기존 재사용**. 신규는 위 P3 고유 섹션에 한함.

## 2. 라우트 · 셸
- `app/hrd/page.tsx`: 최상위 `<div className="tint-p3">` 래핑 → 하위 토큰 자동 상속. `Nav current="hrd"`, `SubNav`(스크롤스파이), 섹션들, `Footer`(홈 공통), 모달 마운트. `--maxw:1180px`.
- **SubNav items**: 고민(pain)·3축 솔루션(solution)·시스템(system)·운영(ops)·제작(studio)·도입사례(cases)·차세대(kgesa)·도입절차(process)·도입문의(inq).

## 3. 섹션 컴포넌트 계약 (props · 시안 매핑)
```ts
// 모든 섹션은 홈 Section/SectionHeader(eyebrow→title→sub) 래퍼 + 홈 Card/Chip/Badge/Button 사용.
HeroHrd({ tag, title, sub, ctas, strip, visual })
PainSolutionMap({ rows })         // 4 {pain(강조 포함), solution:{title,desc}}
SolutionAxes({ axes, note })      // 3 {kind:'시스템'|'운영'|'제작', title, desc, tag:'단독 도입 가능', highlight?}
SystemMockup({ feats, mock })     // feats 5 {k,v}; mock=브라우저+폰 스켈레톤
OpsTimeline({ steps })            // 7 {no, title, desc}
StudioSplit({ items, visual, badge }) // items 5 {title,desc}; visual=실사(onerror no-img)
ClientCases({ logos, highlight }) // logos 4 string; highlight {quote(강조), meta, tag}
KgesaDemo({ widgets, themes, aiJourney }) // widgets 6 {id,name,on}; aiJourney {steps:[{phase,title,desc,src?}], note}
ProcessFlow({ steps })            // 4 {no, title, desc}
```
- 각 컴포넌트는 **홈 공통 컴포넌트·토큰·섹션 문법·카드/간격/그림자 토큰**으로 구성. 시안 클래스명(.ps-row/.pick/.htl-step/.kg-fo 등)·스타일 이식 금지. P3 고유 레이아웃만 `styles/hrd.css`가 홈 토큰으로 담당.

## 4. 데이터 모델 (`data/hrd.tsx`)
```ts
// 시안 JS/마크업의 데이터·카피를 타입 지정으로 옮김(콘텐츠만). 카피 verbatim.
interface PainRow  { pain:string; solutionTitle:string; solutionDesc:string }          // 4
interface Axis     { kind:'시스템'|'운영'|'제작'; title:string; desc:string; tag:string; highlight?:boolean } // 3
interface SysFeat  { k:string; v:string }                                               // 5
interface OpsStep  { no:string; title:string; desc:string }                             // 7
interface StudioItem { title:string; desc:string }                                      // 5
interface CaseHighlight { quote:string; meta:string; tag:string }
interface Widget   { id:'banner'|'dash'|'courses'|'reco'|'debate'|'float'; name:string; on:boolean } // 6
interface AiStep   { phase:'학습 전'|'학습 중'|'학습 후'; title:string; desc:string; src?:string }    // 3
interface ProcStep { no:string; title:string; desc:string }                             // 4
interface InquiryOption { value:string; label:string }
```
- KGESA 위젯 6종(banner/dash/courses/reco/debate/float, 초기 on: banner·dash·courses·reco / off: debate·float), 테마 2종(gnb/lnb, 초기 gnb) 이식. TBD 표기("차세대 시스템 미리보기 · 정식 오픈 예정"·aj-note) 보존.

## 5. 인터랙션 로직
- **Reveal**: 기존 `useReveal`(th .16, 1회 unobserve). 시안 .12 → .16 정규화.
- **Nav/SubNav 스크롤스파이**: 공통 Nav(solid)·SubNav(스크롤 임계 후 show + active). `goTo(id)` 공통 스무스 스크롤(offset ~96px).
- **KgesaDemo(#kgesa · 핵심)**:
  - `useState`: `theme:'gnb'|'lnb'`, `widgets: Widget[]`(순서 = 표시 순서).
  - 컨트롤: 테마 2버튼(active `aria-pressed`), 위젯 리스트 — 각 항목 순서 ↑/↓ 버튼(배열 swap) + on/off 스위치(토글). 
  - FO 렌더: `theme==='gnb'`면 상단 GNB 레이아웃, `'lnb'`면 좌측 LNB 레이아웃. 켜진 위젯만 `widgets` 순서대로 블록 렌더(banner/dash/courses/reco/debate), `float` on이면 플로팅 버튼. 상태 변경 시 블록 소폭 페이드 인(stagger).
  - 접근성: 버튼 `aria-label`, 스위치 `role="switch"`/`aria-checked`, 키보드 조작. reduced-motion 시 페이드 생략.
  - **AiJourney**(하위): 3스텝 서사(학습 전/중/후) 카드, 가운데 강조(hi) + `aj-src` 태그 + note. 정적.
- **도입 문의 모달**: 공통 `Modal` → "문의 폼으로 이동"(#inq 스크롤+닫기). nav·hero CTA 트리거. 포커스 트랩·ESC.
- **InquiryForm(#inq)**: 공통 폼 재사용. 필드(회사명·담당자·연락처·관심영역 select[HRD 통합(P3) 기본]·문의 내용) 검증 → 성공 뷰. 백엔드 없음.
- **시안 버그 주의**: 시안 select에 'HRD 통합' 옵션 중복 → 빌드 시 옵션 정리(P1/P2/P3/P4 1개씩). 중복 id는 고유 id로 분리.

## 6. 스타일 (`styles/hrd.css` — 최소)
- **시안 `<style>` 발췌·이식 금지.** P3 고유 레이아웃의 **뼈대만** 새로 작성하되 **색·간격·라운드·그림자·이징은 Design.md 토큰(var(--*))만** 사용. 신규 hex/px 0:
  - `#pain` 고충→해결 3열 그리드(1fr auto 1fr, 모바일 1열).
  - `#solution` 3축 pick 그리드.
  - `#system` split(.85/1.15) + 목업 스켈레톤(브라우저 바·화면·폰).
  - `#ops` HOW 7축 가로 타임라인(노드 연결선, 가로 스크롤).
  - `#studio` 실사 split.
  - `#kgesa` 데모 2열(FO 프레임 + 컨트롤 패널), FO 내부 GNB/LNB 레이아웃·위젯 블록·스위치.
  - `#process` 4스텝 flow.
- 바이올렛 강조는 필러 포인트 `--p3`(#8B27A8)만. KGESA 배너/스텝 넘버/타임라인 노드의 다단 스케일은 `--p3`에서 파생. 시안의 --mg/--mg2/--mg3/--acc·#8B6FE0·#6A3FB8·btn-mg 등 신설 금지.
- 공통 요소(.section/.eyebrow/.btn/.card/.wrap/.badge 등)는 `styles/components.css` 재사용(중복 금지). 틴트는 globals의 `.tint-p3` 담당(색값 재선언 금지).

## 7. 접근성·반응형
- 모달 포커스 트랩·ESC·스크림·body 잠금(공통 Modal). KGESA 컨트롤(테마·스위치·순서) 키보드·`aria-pressed`/`role="switch"`·포커스 링. 폼 라벨·인라인 에러.
- 확정 브레이크포인트대로 축소: 3축 flex→세로, 목업/스튜디오 split→1열, HOW 타임라인 가로 스크롤 유지, KGESA 데모 2열→1열. `prefers-reduced-motion` 대응.

## 8. 검증 (DoD)
- **구성·인터랙션 = P3 시안과 일치**(10섹션·KGESA·SubNav), **비주얼 = 홈 디자인 시스템(Design.md)과 일관**. → 시안과의 픽셀 1:1 대조는 목표 아님. `full-page-screenshot`로 `/hrd` 캡처 후 **홈·P1·P2와 나란히** 톤 일관성 점검.
- KGESA 테마/위젯 on-off/순서 실시간 반영·스크롤스파이·문의 폼 검증/성공·모달 동작 확인.
- `next build` 무오류(홈·P1·P2 회귀 없음), 5라우트 정적 유지, **신규 색토큰·서체·버튼변형 0**(KGESA/타임라인 --p3 파생 스케일만 예외). 공통 Footer(부정훈련 예방/신고) 정상.

## 9. Handoff
- 본 스펙 기준 Claude Code P3 빌드 프롬프트(`../PROMPT_05_build_P3.md`)로 전환. 완료 후 P4(/content)로 진행.
