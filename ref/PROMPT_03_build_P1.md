# Claude Code 전달용 프롬프트 — A-Type P1(/ax-ai) 빌드

> 사용법: 진행 중인 A-Type 세션(KEESS_A-Type 열림)에 이 블록을 붙여넣으세요. 홈/공통 컴포넌트 레이어는 이미 완료된 상태입니다.

---

다음 페이지 **P1 AX·AI 전환(`/ax-ai`)**을 완성한다.

## ★ 최우선 원칙 (의도 — 반드시 준수)
- **디자인 시스템의 유일한 기준은 '홈'이다.** (`ref/Design.md` + 이미 만든 공통 컴포넌트·`styles/components.css`) P1도 **무조건 홈 디자인 시스템을 따른다.**
- `ref/prototype/keess_P1_AXAI_D_scenario_v7.html`는 **단발성 시안(큰 흐름 확인용)**이다. → **섹션 구성·순서·인터랙션·카피만 참고**한다. **그 자체의 CSS·색 토큰·버튼 변형·비주얼 스타일은 이식하지 않는다.**
- 따라서 결과 P1은 **P1 시안과 픽셀 1:1이 아니라, 홈과 같은 비주얼 언어**로 P1의 구성·인터랙션을 재현한 모습이어야 한다.

## 0. 읽을 것
- `ref/prd/PRD_P1_AXAI.md`, `ref/spec/TECHSPEC_P1_AXAI.md`
- `ref/prototype/keess_P1_AXAI_D_scenario_v7.html` — **구성·인터랙션·카피 참고용**(스타일 이식 금지)
- (이미 숙지) `CLAUDE.md`, `ref/Design.md`

## 1. 절대 원칙
- 홈 디자인 시스템(Design.md 토큰 + 공통 컴포넌트) 적용. **P1 시안의 자체 CSS·색토큰(--rp/--acc/--lilac 등)·버튼 변형(btn-rp 등) 신설·이식 금지.**
- 색: Design.md 토큰만. 보라 액센트가 필요하면 필러 포인트 `--p1`(#2E1A6B)만 사용, 페이지 전체는 `.tint-p1` 틴트.
- 폰트: 전 페이지 통일 Pretendard(self-host) 상속. 신규 서체 금지.
- 컴포넌트: 홈 공통(Nav·Footer·Section·SectionHeader·Button[ink/glass/line-dark]·Card·Chip·Badge·Modal·Reveal·MetricStat·Tab·Accordion 등) 재사용. 새 컴포넌트는 P1 고유 레이아웃(5Step·프레임워크 계단·직무 포지셔닝맵·비교표·GAP)에 한해 최소.
- 카피는 P1 시안 문구 그대로 `data/axai.tsx`에 분리(카피=콘텐츠, 이식 OK).
- 백엔드 없음: 가이드/상담 폼 검증 + 성공 상태.
- 애매하면 질문.

## 2. 구현
- `app/ax-ai/page.tsx`: `.tint-p1` 래핑(`--maxw:1180px`) + 공통 `Nav current="ax-ai"` + 전 섹션 + 공통 `Footer` + 모달.
- `data/axai.tsx`: scenario 4 / 5Step+산출물 / FW Lv1~5(고민→처방) / 직무 8×5단계+포지셔닝 좌표 / 비교표 6행 / GAP 3지표 / 6과정 / 3사례 / 2모달 필드 — **카피 verbatim**.
- `components/sections/axai/*`: ScenarioSelector·EndToEndSteps·FrameworkStair·JobMap·WhyTable·GapEvidence·CourseLineup·CaseStudy. **홈 컴포넌트·토큰·섹션 문법(eyebrow→title→sub→근거→CTA)으로 구성.** 홈 카드·간격·그림자·라운드 재사용.
- `styles/axai.css`(필요 시 최소): P1 고유 레이아웃 뼈대(계단/포지셔닝 맵/GAP 바/비교표 그리드 등)만 **홈 토큰(var(--*))으로** 작성. **P1 시안 스타일시트 발췌·복붙 금지.** 공통 `components.css`와 중복 금지, 틴트 색 재선언 금지.
- 모달: 공통 `Modal` 재사용. GuideModal(회사·담당자·이메일·동의→성공), ConsultModal(부문 B2B/B2G·규모·회사·담당자·이메일·관심영역·연락처·문의→성공). hero·#inq·nav CTA에서 트리거.
- 인터랙션: 목표 선택·프레임워크 단계·직무 선택·GAP 리빌·카운트업 — P1 시안 동작을 useState/공통 useReveal로 재현. reduced-motion 대응. 원본 중복 id는 고유 id로 분리.

## 3. 검증
- **구성·인터랙션 = P1 시안과 일치**하는지, **비주얼 = 홈 페이지와 같은 디자인 시스템**인지 확인(홈과 나란히 대조 권장). → **P1 시안과의 픽셀 1:1 대조는 목표 아님.**
- `full-page-screenshot`로 `/ax-ai` 캡처해 섹션 구성·인터랙션·홈 톤 일관성 점검.
- `npm run build` 무오류(홈 회귀 없음), 5라우트 정적 유지, **신규 색토큰·서체·버튼변형 0**.
- 검증용 임시 리소스(Chrome·프로필 등) 정리.

## 4. 작업 방식
- 먼저 만들 파일·접근을 3~5줄로 요약해 확인받은 뒤 시작. 완료 후 결과 보고하고 멈춘다. (다음은 P2 `/leadership`)
