# Claude Code 전달용 프롬프트 — A-Type P2(/leadership) 빌드

> 사용법: 진행 중인 A-Type 세션(KEESS_A-Type 열림)에 이 블록을 붙여넣으세요. 홈·P1·공통 컴포넌트 레이어는 완료된 상태입니다.

---

다음 페이지 **P2 리더십·조직(`/leadership`)**을 완성한다.

## ★ 최우선 원칙 (의도 — 반드시 준수)
- **디자인 시스템의 유일한 기준은 '홈'이다.** (`ref/Design.md` + 이미 만든 공통 컴포넌트·`styles/components.css`) P2도 **무조건 홈 디자인 시스템을 따른다.**
- `ref/prototype/keess_P2_leadership_A_journey_v1.0.html`는 **단발성 시안(큰 흐름 확인용)**이다. → **섹션 구성·순서·인터랙션·카피만 참고**한다. **그 자체의 CSS·색 토큰(--mg/--mg2/--acc/--pink 등)·버튼 변형(btn-mg/btn-sec 등)·비주얼 스타일은 이식하지 않는다.**
- 결과 P2는 **시안과 픽셀 1:1이 아니라, 홈·P1과 같은 비주얼 언어**로 P2의 구성·인터랙션을 재현한 모습이어야 한다.
- **푸터는 홈 공통 Footer(부정훈련 예방/신고 포함)를 그대로 유지**한다. 시안의 경량 gnav·미니 푸터·와이어프레임 플래그는 제외.

## 0. 읽을 것
- `ref/prd/PRD_P2_leadership.md` (섹션·인터랙션·수용조건)
- `ref/spec/TECHSPEC_P2_leadership.md` (파일 구성·컴포넌트 계약·데이터·인터랙션 로직) — **구현은 이 문서를 따른다.**
- `ref/prototype/keess_P2_leadership_A_journey_v1.0.html` — **구성·인터랙션·카피 참고용**(스타일 이식 금지)
- (이미 숙지) `CLAUDE.md`, `ref/Design.md`

## 1. 절대 원칙
- 홈 디자인 시스템(Design.md 토큰 + 공통 컴포넌트) 적용. **시안의 자체 CSS·색토큰·버튼 변형 신설·이식 금지.**
- 색: Design.md 토큰만. 마젠타 액센트가 필요하면 필러 포인트 `--p2`(#E91E63)만, 페이지 전체는 `.tint-p2` 틴트.
  - **데이터 시각화 예외**: 리더십 휠 6세그먼트·성장 타임라인 레일은 `--p2`에서 파생한 마젠타 스케일(밝기 변주)을 **포인트로만** 허용. 그 외 카드·배경·본문은 중립 베이스+틴트 유지.
- 폰트: 전 페이지 통일 Pretendard(self-host) 상속. 신규 서체 금지.
- 컴포넌트: 홈 공통(Nav·Footer·SubNav·Section·SectionHeader·Button[ink/glass/line]·Card·Chip·Badge·Modal·Reveal·MetricStat·InquiryForm 등) 재사용. 새 컴포넌트는 P2 고유 레이아웃(6단계 타임라인·리더십 휠·성장시점 스텝퍼·Growth-Fit)에 한해 최소.
- 카피는 시안 문구 그대로 `data/leadership.tsx`에 분리(카피=콘텐츠, 이식 OK). TBD 표기 보존.
- 백엔드 없음: 문의 폼 검증 + 성공 상태.
- 애매하면 질문.

## 2. 구현
- `app/leadership/page.tsx`: `.tint-p2` 래핑(`--maxw:1180px`) + 공통 `Nav current="leadership"` + `SubNav`(items: 고민·성장여정·6대 역량·Framework·오프라인·조직진단·차별점·도입문의) + 전 섹션 + 공통 `Footer` + 모달.
- `data/leadership.tsx`: journey 6단계 / arch 5스텝 / tracks 6 / 휠 TRACKS 6(k·ko·nm·t·d·a[]) / 스테이지 PROG 4(sub[]) / growthfit 6 dims / why 3 / faculty 4 / 관심영역 옵션 — **카피 verbatim**.
- `components/sections/leadership/*`: HeroLeadership·PainChips·GrowthJourney·TrackCards·LeadershipWheel·StageStepper·GrowthFitDiagnosis·WhyLeadership. **홈 컴포넌트·토큰·섹션 문법(eyebrow→title→sub→근거→CTA)으로 구성.** 홈 카드·간격·그림자·라운드 재사용.
- `styles/leadership.css`(최소): P2 고유 레이아웃 뼈대(6단계 수평 타임라인+레일 / 아키텍처 5그리드 / 휠 2열 레이아웃 / 스텝퍼 가로+화살표 / growthfit 6그리드)만 **홈 토큰(var(--*))으로** 작성. **시안 스타일시트 발췌·복붙 금지.** 공통 `components.css`와 중복 금지, 틴트 색 재선언 금지.
- **LeadershipWheel(#framework)**: SVG 6세그먼트를 극좌표(각 60°, RO~150/RI~86 반응형)로 생성 + 중앙 코어/라벨. 섹션 진입 시 순차 페이드 등장, `useState` 활성 세그먼트 → 상세 패널(hint·name·desc·caps) + 중앙 라벨 갱신. 세그먼트 `role="button"`·tabindex·Enter/Space·`aria-selected`. reduced-motion 시 즉시 표시.
- **StageStepper(#offline)**: `useState` 활성 스테이지(초기 0) → 하위 프로그램 패널(t·d·caps) 렌더. 버튼 `aria-selected`, 화살표는 데스크톱만.
- **도입 문의 모달**: 공통 `Modal` 재사용 → 안내 후 "문의 폼으로 이동"(#inq 스크롤+닫기). nav·hero CTA에서 트리거.
- **문의 폼(#inq)**: 공통 `InquiryForm` 재사용. 필드(회사명·담당자·연락처·관심영역 select[리더십·조직(P2) 기본]·문의 내용) 검증 → 성공 뷰. 백엔드 없음.
- 인터랙션(리빌·스크롤스파이·휠·스텝퍼)은 useState/공통 useReveal(th .16)로 재현. reduced-motion 대응. 시안 중복 id는 고유 id로 분리.

## 3. 검증
- **구성·인터랙션 = P2 시안과 일치**(9섹션·휠·스텝퍼·SubNav), **비주얼 = 홈·P1과 같은 디자인 시스템**인지 확인(홈·P1과 나란히 대조 권장). → **시안과의 픽셀 1:1 대조는 목표 아님.**
- 휠 세그먼트 클릭·스텝퍼 전환·스크롤스파이·문의 폼 검증/성공·모달 동작 확인.
- `full-page-screenshot`로 `/leadership` 캡처해 섹션 구성·인터랙션·홈 톤 일관성 점검.
- `npm run build` 무오류(홈·P1 회귀 없음), 5라우트 정적 유지, **신규 색토큰·서체·버튼변형 0**(휠/타임라인 --p2 파생 스케일만 예외). 공통 Footer(부정훈련 예방/신고) 정상.
- 검증용 임시 리소스(Chrome·프로필 등) 정리.

## 4. 작업 방식
- 먼저 만들 파일·접근을 3~5줄로 요약해 확인받은 뒤 시작. 완료 후 결과 보고하고 멈춘다. (다음은 P3 `/hrd`)
