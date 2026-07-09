# Claude Code 전달용 프롬프트 — 3단계: 공통 컴포넌트 + useReveal

> 사용법: VSCode에서 `KEESS_A-Type`를 열고 Claude Code에 아래 블록을 붙여넣으세요.
> 전제: 2단계(스캐폴딩) 완료 — Next 16 / React 19 / **Tailwind 3.4.17**, 토큰·필러 틴트·폰트·5라우트(200) 구동 확인됨.

---

이제 **3단계: 공통 컴포넌트 레이어 + `useReveal` 훅**을 구현한다. **아직 실제 페이지(홈·필러) 콘텐츠는 조립하지 않는다**(그건 4단계). 재사용 가능한 컴포넌트만 만든다.

## 시작 전 읽을 것
- `CLAUDE.md`(절대원칙·토큰·모션·폴더구조) + `ref/Design.md` §5(컴포넌트)·§6(모션)·§11(Do/Don't).
- 각 컴포넌트의 **정확한 구조·클래스·동작은 확정 원본에서 추출**한다:
  - 공통 크롬·기본 요소(Nav, MobileMenu, Footer, Button, Chip/Badge, Card, MetricStat, Modal, ToTop, PageDots, Reveal) → **홈 `ref/prototype/keess_home_C_v18_최종확정(260703).html`이 canonical**.
  - Tab/Accordion(FAQ) → 홈 FAQ 및 P1 참조.
- 마크업을 새로 지어내지 말고, 원본의 구조·클래스명·인터랙션을 React+TS+Tailwind로 **이식**한다.

## 절대 원칙 (CLAUDE.md 준수)
- 새 UX·컬러·컴포넌트·폰트·그림자·라운드·브레이크포인트 **발명 금지**. 2단계에서 만든 토큰/틴트/Tailwind 토큰 클래스만 조합.
- 색·간격·라운드·그림자·이징은 Tailwind 토큰 클래스(`bg-bg text-ink text-muted border-line bg-surface rounded-r rounded-pill shadow-1/2/3 max-w-site/pillar px-gut font-serif ease-* screens(mx-*)`) 또는 `var(--*)` 경유. 하드코딩 hex/px 신규 금지.
- 컴포넌트는 **데이터 주입형(props)** + TypeScript 타입 지정. A/B·다페이지 재사용 고려. 카피는 컴포넌트에 하드코딩하지 말 것(추후 `data/*.ts`에서 주입).
- 애매하면 임의 결정하지 말고 **질문**.

## 이번 단계에 만들 것
### A. 훅/유틸
- `lib/useReveal.ts` — `IntersectionObserver({threshold:.16})` 1회(unobserve) 관찰로 대상에 `in` 부여. `prefers-reduced-motion` 시 즉시 표시. `.r`/`.stagger` 패턴과 호환.
- (선택) `components/common/Reveal.tsx` — 위 훅을 감싼 래퍼(자식을 감싸 등장 애니메이션). `.stagger` 변형 지원.

### B. 공통 컴포넌트 (`components/common/`)
홈에서 구조·동작이 명확한 것들을 먼저 구현:
- `Container`(=wrap: `max-w-site`/필러는 `max-w-pillar`, `px-gut`, 중앙정렬)
- `Section` + `SectionHeader`(eyebrow→title→sub 위계; eyebrow 12.5px·자간 .16em·대문자·`text-muted`)
- `Button`(변형 `ink` / `glass` / `line-dark`; pill, hover `translateY(-2px)`+shadow)
- `Chip`, `Badge`
- `Card`(기본/`ref`/`cert` 변형; `bg-surface` 또는 흰 배경+`border-line`, `rounded-r`, hover `-3px`+`shadow-2`)
- `MetricStat`(큰 숫자+라벨; 카운트업은 뷰포트 진입 시)
- `Nav`(fixed, 높이 72px, 스크롤 시 배경·보더 페이드 전환) + `MobileMenu`(풀스크린 오버레이 토글)
- `Footer`(다크 `bg-ink`, 60px 패딩, 상단 구분선, SNS/패밀리 메뉴 구조)
- `Modal`(문의/상담/가이드 공용; `rounded-modal`, `shadow-3`, 스크림, 진입 애니메이션)
- `ToTop`(우하단 48px 원형 FAB, 스크롤 후 등장, hover 시 `--p1`), `PageDots`(우측 도트)
- `Tab`, `Accordion`(FAQ: 셰브론 회전 + 높이 애니메이션, 기본 접힘)

**페이지 특화 복합 컴포넌트**(`HeroCarousel`, `PillarCard`, `JourneyStep`/`ProcessSteps`, `Framework(Lv1~5)`, `PositioningMap`)는 그 구조의 원본이 특정 페이지에 있으므로, **원칙적으로 해당 페이지를 조립하는 4단계에서** 원본을 정독해 구현한다. 지금 무리해서 추측 구현하지 말 것. 단, 구조가 홈에서 이미 명확한 `PillarCard`·`HeroCarousel`은 홈 기준으로 지금 만들어도 된다(불확실하면 질문).

## 동작·접근성 요구
- 모션: `--ease`, 등장 .7~.9s, 인터랙션 .2~.35s, hover translateY(-2~3px)+shadow, **1s 초과·바운스·무한반복 금지**. 전 컴포넌트 `prefers-reduced-motion:reduce` 대응.
- Modal: 포커스 트랩, ESC 닫기, 스크림 클릭 닫기, `aria-modal`·`role="dialog"`·라벨 연결, 열릴 때 body 스크롤 잠금.
- Nav/MobileMenu: 키보드 접근, 현재 스크롤 상태 반영, 메뉴 토글 aria-expanded.
- Accordion/Tab: `aria-expanded`/`aria-controls`/`role="tab"` 등 적정 ARIA, 키보드 조작.
- 전 인터랙티브 요소 `:focus-visible` 가시화(이미 globals에 base 있음).

## 검증 & 정지
1. 임시 프리뷰 라우트(`app/_preview/page.tsx`)를 만들어 각 컴포넌트를 한 화면에 렌더 → `full-page-screenshot`(또는 `playwright-skill`)로 확인. **검토 후 `_preview`는 삭제**(실제 IA 아님).
2. `npm run build`(또는 타입체크/lint) 무오류 확인. 에러 시 `root-cause-tracing`.
3. 실제 홈·필러 페이지 콘텐츠는 **만들지 말 것**. 여기서 멈추고 확인받는다.

## 완료 보고
- 생성한 컴포넌트/훅 목록(파일 경로)과 각 props 타입 요약.
- 각 컴포넌트가 근거한 확정 원본(예: Nav←home) 매핑.
- 빌드/타입체크 결과, `_preview` 삭제 여부.
- 4단계에서 원본 정독 후 구현하기로 미룬 복합 컴포넌트 목록.

먼저 위에서 만들 목록과 접근 방식을 3~5줄로 요약해 확인받은 뒤 구현을 시작하라. 애매한 컴포넌트 API는 먼저 질문하라.
