# KEESS A-Type · P4 콘텐츠 솔루션 — 기술명세서 (페이지 단위)

| 항목 | 내용 |
|------|------|
| **Version** | 1.0 |
| **기준 PRD** | `../prd/PRD_P4_content.md` |
| **디자인 기준(SoT)** | `../Design.md`(홈 디자인 시스템) |
| **구성 참고(시안)** | `../prototype/keess_P4_content_solution_A_v3.0.html` (A안 4-Axis v3.0 · 구성·인터랙션·카피만 참고, 스타일 이식 X) |
| **전제** | 홈/공통 컴포넌트 레이어 완료, P1·P2·P3 완료 |

> ★ **디자인 시스템의 유일 기준 = 홈(`../Design.md`).** P4도 무조건 홈 디자인 시스템(토큰·공통 컴포넌트)을 따른다. 시안은 **단발성**으로 **섹션 구성·순서·인터랙션·카피만 참고** — 시안의 CSS·색토큰·버튼 변형·비주얼은 **이식하지 않는다.** 카피·과정 데이터는 `data/content.tsx`·`data/courses.ts`에 그대로. **비주얼은 홈 언어로 재현, 푸터는 홈 공통 유지.** A안 P4엔 **다운로드 게이트 없음**(B안 전용).

## 1. 파일 구성 (신규)
```
app/content/page.tsx                    # .tint-p4 wrapper + 4섹션 + axisnav(SubNav) + 모달
styles/content.css                      # P4 고유 레이아웃 뼈대만(4축맵/스케일/7체계/탐색기/법정타임라인·표/제작infra/파트너) — 홈 토큰으로. 시안 CSS 복붙 금지
data/content.tsx                        # P4 카피·정적 데이터(시안 문구 verbatim — 콘텐츠만)
data/courses.ts                         # 대표 라인업 탐색기 34종 실데이터(스키마 아래)
components/sections/content/
  ├─ HeroContent.tsx                    # #hero + 4축 맵
  ├─ AxisHave.tsx                       # #axis-have 스케일+7체계+탐색기 컨테이너
  │   ├─ CourseExplorer.tsx            # 탭·툴바·그리드
  │   └─ CourseCard.tsx / CourseDetailModal.tsx
  ├─ AxisLegal.tsx                      # #axis-legal 타임라인+법정카드+차별화표
  ├─ AxisMake.tsx                       # #axis-make infra+IP+사례
  └─ AxisNetwork.tsx                    # #axis-net 파트너 로고+이원화+counter
components/common/ConsultModal.tsx      # 상담 모달(공통 Modal 재사용, data-consult)
```
- Nav(current='content')·Footer·SubNav·Section·SectionHeader·Button·Card·Chip·Badge·Reveal·Modal은 **기존 재사용**. 신규는 위 P4 고유 섹션·탐색기에 한함. (ConsultModal은 P1에서 만든 것 재사용 가능 시 재사용)

## 2. 라우트 · 셸
- `app/content/page.tsx`: 최상위 `<div className="tint-p4">` 래핑 → 하위 토큰 자동 상속. `Nav current="content"`, `SubNav`(4축 스크롤스파이), 4섹션 + final CTA, `Footer`(홈 공통), 모달 마운트. `--maxw:1180px`.
- **SubNav(axisnav) items**: 01 보유 콘텐츠(axis-have)·02 법정 헌터스(axis-legal)·03 맞춤형 제작(axis-make)·04 파트너 네트워크(axis-net).

## 3. 섹션 컴포넌트 계약 (props · 시안 매핑)
```ts
HeroContent({ eyebrow, title, lead, ctas, note, axisMap })  // axisMap: core{value,label} + quad 4{no,tag,title,meta}
AxisHave({ scale, systems, explorer })
  // scale: total 8,426 + chips 6{value,label}; systems: 7체계{no,title,desc}
CourseExplorer({ courses, categories, filters })  // 탭·검색·셀렉트·정렬·그리드·상세
AxisLegal({ series, lawCards, groups, diffTable, note })
  // series 3{year,name,concept,current?}; lawCards 5{must,title,basis,target,cycle}; diffTable rows
AxisMake({ studio, pipeline, ips, cases })
  // studio{studios[],equipment[]}; pipeline 5{no,title,desc}; ips 6{title,desc}; cases 3{org,desc}
AxisNetwork({ partnersContent, partnersLang, dualFlow, counter })
```
- 각 컴포넌트는 **홈 공통 컴포넌트·토큰·섹션 문법·카드/간격/그림자 토큰**으로 구성. 시안 클래스명(.axq/.syscard/.lawcard/.pipe/.plogo 등)·스타일 이식 금지. P4 고유 레이아웃만 `styles/content.css`가 홈 토큰으로 담당.

## 4. 데이터 모델
### 4-1. 페이지 콘텐츠 (`data/content.tsx`)
- 4축 맵·스케일·7체계·법정(시리즈·카드·표)·제작(인프라·파이프라인·IP·사례)·파트너·final 카피를 타입 지정으로. **문구는 시안 그대로.** samplenote·hero-note 보존.

### 4-2. 과정 카탈로그 — 탐색기 (`data/courses.ts`) [핵심]
```ts
interface Course {
  id: string; title: string;
  category: string; category_key: 'lit'|'data'|'prod'|'job'|'tool'|'dev';
  target: string; level: '입문'|'실무'|'심화';
  duration: string; hours: number;
  duration_band: '숏(≤4h)'|'스탠다드(5–12h)'|'인텐시브(≥13h)';
  book_provided: boolean; tools: string[]; keywords: string[];
  instructor: string|null; overview: string;
  objectives: string[]; curriculum: string[]; curriculum_count: number;
  thumbnail: string|null; detail_pdf: string;
}
```
- 시안의 34종 실데이터(AX·AI 전환 대표 라인업)를 그대로 이식. **차주 6+6 소개서 도착 시 배열만 교체**(스키마 유지). B안 `data/courses.ts`와 동일 스키마 → 공유 가능.

## 5. 인터랙션 로직
- **Reveal**: 기존 `useReveal`(th .16).
- **Nav/축 스크롤스파이(axisnav)**: 공통 Nav(solid)·SubNav. 시안은 IntersectionObserver rootMargin `-45% 0 -50%` — 홈 SubNav 스파이로 통일(현재 축 active).
- **CourseExplorer(#axis-have · 핵심)**:
  - `useState state`: `{cat:'all', q:'', target:'', level:'', band:'', tool:'', sort:'default'}`.
  - 파생: 필터(cat·target·level·band·tool·q) → 정렬(default/hours-asc/hours-desc/level) → 그리드. count 표시. reset로 초기화.
  - 검색 입력 **160ms 디바운스**. 셀렉트 change 즉시 반영. 탭 클릭 → cat 변경.
  - 카드 클릭 / 키보드 Enter·Space → `openDetail(id)` 상세 모달. 카드 `tabindex=0`.
  - 셀렉트 옵션(target·level·band·tool)은 courses에서 유니크 값으로 동적 생성.
- **ConsultModal(consult)**: `data-consult` 트리거(hero "콘텐츠 구성 문의"·제작 "제작 문의"[data-axis="맞춤형 제작"]·final "콘텐츠 도입 문의"). `openConsult(axis?)` → axis 있으면 "문의 대상: {axis}" 컨텍스트. 필드 cf-name·cf-org·cf-mail 검증(이메일 정규식 `.+@.+\..+`) 실패 시 해당 필드 border 강조 → 통과 시 성공(c-ok). body scroll lock·lastFocus 복원.
- **CourseDetailModal(detail)**: 과정 상세(개요·목표·커리큘럼·툴·기간·교재 등) 표시. 공통 Modal 셸. ESC/스크림 닫기.
- **모달 공통**: `openOv/closeOv` 로직을 공통 `useModal`/`Modal`로 대체(포커스 트랩·ESC·body lock·포커스 복원). 시안의 전역 클릭 위임은 React 핸들러로 재구현.

## 6. 스타일 (`styles/content.css` — 최소)
- **시안 `<style>` 발췌·이식 금지.** P4 고유 레이아웃의 **뼈대만** 새로 작성하되 **색·간격·라운드·그림자·이징은 Design.md 토큰(var(--*))만** 사용. 신규 hex/px 0:
  - `#hero` 4축 맵(core + quad 2×2).
  - `#axis-have` scalestrip(총계+칩) · 7체계 matrix · 탐색기(탭·툴바·그리드·카드).
  - `#axis-legal` 연도 타임라인 · 법정 카드 그리드 · 차별화 표.
  - `#axis-make` infra(스튜디오+파이프라인) · IP 그리드 · 사례 바.
  - `#axis-net` 파트너 로고 그리드 · 이원화 flow · counter.
- 웜 강조는 필러 포인트 `--p4`(#F58220)만. 4축 맵/카테고리/타임라인의 다단 스케일은 `--p4`에서 파생(법정 축은 보조 톤). 시안의 --or/--or2/--rp/--rpsoft/--law·btn-or 등 신설 금지.
- 공통 요소(.section/.eyebrow/.btn/.card/.wrap/.badge 등)는 `styles/components.css` 재사용(중복 금지). 틴트는 globals의 `.tint-p4` 담당(색값 재선언 금지).

## 7. 접근성·반응형
- 탐색기 탭 `role="tablist"`/`role="tab"`·`aria-selected`, 셀렉트 `aria-label`, 검색 `aria-label`, 카드 키보드(Enter/Space)·포커스 링. 모달 포커스 트랩·ESC·body lock·포커스 복원(lastFocus).
- 확정 브레이크포인트대로 축소: 4축 맵 세로, 탐색기 그리드 3→2→1열·툴바 접힘, 법정/IP/파트너 그리드 축소. `prefers-reduced-motion` 대응.

## 8. 검증 (DoD)
- **구성·인터랙션 = P4 시안과 일치**(4축·탐색기·상담/상세 모달·스크롤스파이), **비주얼 = 홈 디자인 시스템(Design.md)과 일관**. → 시안과의 픽셀 1:1 대조는 목표 아님. `full-page-screenshot`로 `/content` 캡처 후 **홈·P1~P3와 나란히** 톤 일관성 점검.
- 탐색기 탭/검색/필터/정렬/상세, 상담 모달 검증·성공, 4축 스크롤스파이 동작 확인.
- `next build` 무오류(홈·P1·P2·P3 회귀 없음), 5라우트 정적 유지, **신규 색토큰·서체·버튼변형 0**(4축맵/탐색기 --p4 파생 스케일만 예외). 공통 Footer(부정훈련 예방/신고) 정상.

## 9. Handoff
- 본 스펙 기준 Claude Code P4 빌드 프롬프트(`../PROMPT_06_build_P4.md`)로 전환. P4 완료 시 A안 1차 빌드 종료 → 로컬 디버깅·UI/UX 보강·리팩토링·최종확인 게이트로.
