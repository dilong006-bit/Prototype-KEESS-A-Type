# Claude Code 전달용 프롬프트 — KEESS A-Type 1차 빌드

> 사용법: VSCode에서 `KEESS_A-Type` 폴더를 열고 Claude Code에 아래 블록을 그대로 붙여넣으세요.

---

너는 KEESS 프로젝트의 프론트엔드 엔지니어다. 지금 폴더(`KEESS_A-Type`)에서 **A-Type 풀버전(5페이지) 고충실도 인터랙티브 프로토타입**을 Next.js로 1차 빌드한다. 실운영 배포가 아니라 **기획안·화면 방향성 검증용**이다.

## 0. 시작 전 반드시 읽을 것 (순서대로)
1. `Design.md` — 디자인 헌법. 컬러/타이포/간격/라운드/그림자/모션/컴포넌트/보이스의 **유일한 규칙**. 여기 없는 값은 만들지 마라.
2. `BUILD_STRATEGY.md` — 목표·범위·폴더구조·라우트맵·섹션 인벤토리·단계 계획.
3. `ref/prototype/*.html` — 본부 확정 정적 프로토타입 5종. **레이아웃·섹션 순서·카피의 시각적 원본(source of truth)**.
   - 홈: `keess_home_C_v18_최종확정(260703).html`
   - P1: `keess_P1_AXAI_D_scenario_v7.html`
   - P2: `keess_P2_leadership_A_journey_v1.0.html`
   - P3: `keess_P3_hrd_A_integrated_v1.6.html`
   - P4: `keess_P4_content_solution_A_v3.0.html`

읽은 뒤, **구현을 시작하기 전에** 3~6줄짜리 실행 계획을 먼저 제시하고 내 확인을 받아라. 애매하거나 원본이 충돌하면 임의로 정하지 말고 질문하라.

## 1. 절대 원칙 (위반 금지)
- 새 UX·IA·섹션·컬러·컴포넌트·폰트를 **발명하지 않는다.** 확정 프로토타입과 Design.md에 있는 것만 코드로 옮긴다.
- 디자인 토큰은 `Design.md` 값 그대로 1:1 이식. 하드코딩 hex/px 신규 도입 금지 → 전부 CSS 변수/Tailwind 토큰 경유.
- **카피(문구)는 확정 HTML 그대로** 옮긴다. 재작성·요약·의역 금지. "예시" 라벨 관행 유지.
- P1(AX·AI, D 확정)은 **구성(IA·섹션) 변경 금지**. 사이트 일관성 목적의 표현 조정만 허용.
- "하나의 사이트 = 일관된 디자인"이 최우선. 필러 페이지 개성은 **틴트 토큰(--bg/--surface/--ink/--line) 교체로만**, 필러색(#2E1A6B 등)은 포인트에만.
- 백엔드/DB/로그인/결제/API/관리자 **구현하지 않는다.** 문의 폼은 제출 시 성공 상태 UI만.
- 규칙 충돌 시 우선순위: 홈 확정본 > 코퍼레이트 > P1~P4. 그래도 애매하면 질문.

## 2. 기술 스택 / 셋업
- Next.js(**App Router**) + React + TypeScript + Tailwind CSS.
- `app/globals.css`의 `:root`에 Design.md 토큰 전량 이식: `--bg --ink --muted --line --surface --p1~--p4 --gov --ease --ease-out --maxw --gut --serif --r --shadow-1~3`.
- `tailwind.config.ts`에 colors/spacing/borderRadius/boxShadow/fontFamily/screens를 CSS 변수 및 확정 브레이크포인트(1040/940/880/820/760/740/720/640/560)에 매핑.
- 폰트: 본문·UI = Pretendard Variable, 디스플레이(serif) = Gowun Batang(Google Fonts). `next/font`로 로드.
- 이미지: 확정본이 플레이스홀더/Unsplash 다수 → 동일하게 플레이스홀더로 두고 `// TODO: 실제 자산` 주석. 브랜드 이미지 임의 생성 금지.

## 3. 폴더 구조 (BUILD_STRATEGY 준수)
```
app/ (layout.tsx, page.tsx, ax-ai/, leadership/, hrd/, content/, globals.css)
components/common/  (Nav, Footer, Section, SectionHeader, Button, Chip, Card, MetricStat, Modal, ToTop, Reveal ...)
components/sections/  (페이지별 섹션)
data/  (home.ts, axai.ts, leadership.ts, hrd.ts, content.ts — 카피는 확정본 그대로)
lib/  (useReveal 훅, 상수)
```

## 4. 라우트 · 페이지 매핑
| 라우트 | 확정 원본 | 필러 틴트 |
|---|---|---|
| `/` | home_C_v18 | 중립(틴트 없음) |
| `/ax-ai` | P1_AXAI_D | 보라 |
| `/leadership` | P2_A_journey | 마젠타 |
| `/hrd` | P3_A_integrated | 바이올렛 |
| `/content` | P4_A_solution | 웜 |

각 페이지 섹션 구성은 `BUILD_STRATEGY.md` §6 인벤토리를 따르고, 실제 마크업·문구는 해당 `ref/prototype` HTML을 원본으로 재현한다.

## 5. 컴포넌트 · 모션
- 공통 컴포넌트는 Design.md §5 목록을 데이터 주입(props)형으로 구현(A/B 재사용 대비).
- 모션은 Design.md §6만 사용: `--ease` cubic-bezier(.22,.61,.36,1), 스크롤 리빌 `.r`/`.stagger` → `IntersectionObserver(threshold:.16)` 1회, 등장 .7~.9s, 인터랙션 .2~.35s, hover translateY(-2~3px)+shadow. `prefers-reduced-motion` 대응 필수.

## 6. 작업 순서 (단계별로, 각 단계 후 멈추고 확인)
1. **git init + CLAUDE.md 생성** — 저장소 초기화(`git init`, `.gitignore`) 후 Design.md + 위 절대원칙을 요약한 CLAUDE.md 작성(Claude Code가 매 세션 자동 참조).
2. **스캐폴딩** — Next.js(App Router)+TS+Tailwind 초기화, 토큰/폰트/글로벌, 빈 라우트 5개 구동 확인(`npm run dev`).
3. **공통 컴포넌트** — §5 목록 + `useReveal` 훅.
4. **페이지 조립** — 홈 → /ax-ai → /leadership → /hrd → /content 순, `data/*.ts` 분리. **각 페이지 완성 직후** `full-page-screenshot`(또는 `playwright-skill`)로 스크린샷을 찍어 `ref/prototype` 원본과 1:1 시각 대조.
5. **인터랙션·반응형·접근성** — CTA/앵커, 문의 모달, 카드 hover, 탭/아코디언, Desktop/Tablet/Mobile, 시맨틱·포커스. `playwright-skill`로 동작·반응형 검증.
6. **자체 검증** — 5개 라우트 전체를 원본과 시각 대조, Design.md 준수 체크. 에러 발생 시 `root-cause-tracing`로 근본 원인 추적.
7. **커밋** — 의미 단위로 `git-pushing`로 커밋(원격 미설정 시 로컬 커밋까지).

## 7. 설치된 스킬 활용 지침 (프로젝트 `.claude/skills/`)
아래 5개가 설치돼 있다. 해당 상황이 오면 **적극 사용**하라.
- `full-page-screenshot` — 페이지 전체 롱스크린샷. → 각 페이지를 `ref/prototype` 원본과 1:1 시각 대조(4·6단계).
- `playwright-skill` — dev 서버 자동감지 후 동작·폼·반응형·UX 검증, 스크린샷. → 4·5·6단계 화면 검증(브라우저 구동 시 Node/Playwright 설치 필요하면 먼저 확인).
- `root-cause-tracing` — 오류를 콜스택 역추적해 최초 트리거에서 수정. → 하이드레이션·빌드·런타임 에러 발생 시.
- `git-pushing` — 스테이징·conventional commit·푸시. → 단계별 커밋(7단계).
- `using-git-worktrees` — 작업 격리 워크스페이스. → 실험적 변경·B타입 병렬 작업 격리 시.
- 참고: `software-architecture`는 미설치. 아키텍처·구조 판단은 Design.md·BUILD_STRATEGY 기준으로 직접 수행.

## 8. 완료 기준 (Definition of Done)
- `npm run dev` 무오류, 5개 라우트 정상.
- 확정 원본과 섹션 순서·카피 일치, 필러 일관성 유지, 신규 토큰 0.
- 각 페이지 스크린샷을 `ref/prototype` 원본과 대조해 레이아웃 일치 확인(`full-page-screenshot`/`playwright-skill`).
- 3-디바이스 레이아웃 정상, 리빌·hover·모달·탭/아코디언 동작.
- 시맨틱 마크업·키보드 포커스·prefers-reduced-motion 대응.

## 9. 작업 태도
- 원본 우선. 추측으로 채우지 말고, 원본이 없거나 충돌하면 **먼저 질문**한다.
- 지정 범위만 수술적으로 구현하고, 범위 밖을 임의 변경/삭제하지 않는다.
- 큰 결정·구조 변경 전에는 짧게 근거를 보고하고 확인을 받는다.

먼저 0번의 파일들을 읽고, 1~7단계 실행 계획을 요약해 제시하라. 승인하면 git init + CLAUDE.md 생성부터 시작한다.
