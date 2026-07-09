# CLAUDE.md — KEESS A-Type 빌드·코딩 규칙

> KG에듀원 HRD사업본부 **KEESS**(기업·기관 교육 도입 문의 채널, B2B·B2G 인바운드)의 A-Type 풀버전(5페이지) 고충실도 인터랙티브 프로토타입. **실운영 배포가 아닌 기획안·화면 방향성 검증용.**
> 상위 기준 문서: [`ref/Design.md`](ref/Design.md)(디자인 헌법) · [`ref/BUILD_STRATEGY.md`](ref/BUILD_STRATEGY.md) · [`ref/prototype/*.html`](ref/prototype)(확정 원본 = source of truth).

## 0. 절대 원칙 (위반 금지)
1. **발명 금지**: 새 UX·IA·컬러·폰트·컴포넌트·그림자·라운드·브레이크포인트를 만들지 않는다. 확정 원본과 Design.md에 있는 것만 코드로 옮긴다.
2. **토큰 1:1**: 색·간격·라운드·그림자·이징은 반드시 `var(--*)` / Tailwind 토큰 경유. 하드코딩 hex/px 신규 도입 금지.
3. **카피 = 확정본 그대로**: 문구(카피)는 `ref/prototype` HTML 원본 그대로 이식. 재작성·요약·의역 금지. "예시" 라벨 관행 유지.
4. **P1(/ax-ai, D안)은 구성(IA·섹션) 변경 금지**. 사이트 일관성 목적의 **표현(디자인) 조정만** 허용.
5. **하나의 사이트 = 일관된 디자인**이 최우선. 페이지 정체성은 **필러 틴트(`--bg/--surface/--ink/--line` 4값 교체)로만**, 필러색(#2E1A6B 등)은 포인트(배지·번호·강조·CTA 강조)에만.
6. **백엔드 없음**: 회원/로그인/결제/DB/관리자/API 미구현. 문의 폼은 제출 시 성공 상태 UI만.
7. **규칙 충돌 시 우선순위**: 홈 확정본 > 코퍼레이트 확정본 > P1~P4. **애매하면 임의로 정하지 말고 질문**.

## 1. 디자인 토큰 (Design.md §3, `globals.css :root` 1:1)
```css
--bg:#FAFAFB; --ink:#14141A; --muted:#54585f; --line:#E6E8EC; --surface:#F3F5F8;
--p1:#2E1A6B; --p2:#E91E63; --p3:#8B27A8; --p4:#F58220; --gov:#F4B83A;
--ease:cubic-bezier(.22,.61,.36,1); --ease-out:cubic-bezier(.2,0,0,1);
--maxw:1200px; --gut:24px; --serif:"Gowun Batang",serif; --r:20px;
--shadow-1:0 1px 2px rgba(20,20,26,.05),0 2px 8px rgba(20,20,26,.05);
--shadow-2:0 2px 6px rgba(20,20,26,.06),0 10px 26px rgba(20,20,26,.09);
--shadow-3:0 6px 14px rgba(20,20,26,.08),0 22px 52px rgba(20,20,26,.14);
```
- **폰트 2종만**: 본문·UI = Pretendard Variable, 디스플레이/선언(serif) = Gowun Batang. `next/font`로 로드. 확장 금지.
- **컨테이너**: `--maxw` 홈/코퍼레이트 1200px, 필러 페이지 1180px. 거터 `--gut` 24px. 본문 가독폭 ~54ch.
- **섹션 여백**: `.section` 120px(desktop)/74px(≤720). `.pillar` 108px/70px.
- **Radius**: 카드·surface `--r`(20px), 버튼·칩·필 999px(pill), 모달 22px, 소형 메뉴 12px.
- **Elevation**: `--shadow-1/2/3` 3단계만. 임의 그림자 금지.
- **브레이크포인트(검증값만)**: 1040 / 940 / 880 / 820 / 760 / 740 / 720 / 640 / 560px. 신규 임의 BP 금지.

### 필러 틴트 (해당 페이지 wrapper에서 4값만 오버라이드)
- **P1 AX·AI**(보라): `--bg:#FCFCFE --surface:#F4F2FB --ink:#15131D --line:#EAE8F2`
- **P2 리더십**(마젠타): `--bg:#FDFBFC --surface:#FCEBF2 --ink:#181318 --line:#F0E3EA`
- **P3 HRD**(바이올렛): `--surface:#F4EAFA --line:#ECE0F4 --ink:#1A1420`
- **P4 콘텐츠**(웜): `--surface:#F7F4EF --ink:#15131D`
- 홈: 틴트 없는 중립 베이스(#FAFAFB), 4색을 필러 구분에 병렬 사용.

## 2. 라우트 · 페이지 매핑
| 라우트 | 페이지 | 근거 확정본 | 필러 틴트 |
|---|---|---|---|
| `/` | 홈 | `keess_home_C_v18_최종확정(260703).html` | 중립(틴트 없음) |
| `/ax-ai` | P1 AX·AI 전환 | `keess_P1_AXAI_D_scenario_v7.html` | 보라(P1) |
| `/leadership` | P2 리더십·조직 | `keess_P2_leadership_A_journey_v1.0.html` | 마젠타(P2) |
| `/hrd` | P3 HRD 통합 솔루션 | `keess_P3_hrd_A_integrated_v1.6.html` | 바이올렛(P3) |
| `/content` | P4 콘텐츠 솔루션 | `keess_P4_content_solution_A_v3.0.html` | 웜(P4) |

섹션 인벤토리는 [`ref/BUILD_STRATEGY.md`](ref/BUILD_STRATEGY.md) §6, 실제 마크업·카피는 각 원본 HTML을 정독해 이식.

## 3. 기술 스택 · 폴더 구조
- Next.js(**App Router**) + React + TypeScript + Tailwind CSS.
```
app/            layout.tsx, page.tsx(/), ax-ai/, leadership/, hrd/, content/, globals.css
components/common/    Nav, MobileMenu, Footer, Section, SectionHeader, Button, Chip, Card,
                      MetricStat, Modal, ToTop, PageDots, Reveal, PillarCard, JourneyStep,
                      Framework, Tab, Accordion(FAQ) ...
components/sections/  페이지별 섹션 컴포넌트
data/           home.ts, axai.ts, leadership.ts, hrd.ts, content.ts  (카피 = 확정본 그대로)
lib/            useReveal 훅, 상수
```
- 컴포넌트는 **데이터 주입형(props)** 으로 구현(A/B 재사용 대비). 카피는 `data/*.ts`에 확정본 그대로.
- 이미지: 원본이 Unsplash/플레이스홀더면 동일하게 두고 `// TODO: 실제 자산` 주석. 브랜드 이미지 신규 생성 금지.

## 4. 모션 (Design.md §6 값만)
- Scroll Reveal: `.r{opacity:0;transform:translateY(24px)}` → `.in`, `IntersectionObserver({threshold:.16})` 1회(unobserve), transition `.7s var(--ease)`. `.stagger>*` 순차.
- Hover: 카드 `translateY(-3px)`, 버튼 `translateY(-2px)` + shadow 상승. active 살짝 눌림.
- Timing: 등장/전환 .7~.9s, 인터랙션 .2~.35s, 미세 .1~.18s. **1s 초과 등장·바운스·무한 반복 금지.**
- `@media(prefers-reduced-motion:reduce)` 대응 필수.

## 5. 카피·보이스 (Design.md §7·§10)
- 선언형 평서문("~합니다"), 대구 구조. 영문 eyebrow(대문자·자간 .16em). 숫자·기관명·산출물명으로 증명.
- 최종 CTA는 상담/진단/가이드로 수렴. 금지: 과장 최상급, 판촉 톤, 가격·할인·결제, 이모지, AI 티 상투어.
- **채널 분리**: 전사 인증·수상·고객사 로고는 **홈에서만**. P1~P4 상세는 여정 근거(진단·산출물·멘토링·정부지원)만.

## 6. 설치된 스킬 활용 (`.claude/skills/`)
- **full-page-screenshot** — 각 페이지 완성 직후 롱스크린샷으로 `ref/prototype` 원본과 1:1 시각 대조.
- **playwright-skill** — dev 서버 자동감지 후 동작·폼·반응형·UX 검증(브라우저 구동에 Node/Playwright 전역 설치 필요 시 먼저 확인).
- **root-cause-tracing** — 하이드레이션·빌드·런타임 에러 근본 원인 역추적.
- **git-pushing** — 단계별 conventional commit.
- **using-git-worktrees** — 실험적 변경·B Type 병렬 격리 시.
- 참고: `software-architecture`는 미설치. 구조 판단은 Design.md·BUILD_STRATEGY 기준으로 직접 수행.

## 7. 검수 기준 (Definition of Done)
- `npm run dev` 무오류, 5라우트 정상.
- 확정 원본과 섹션 순서·카피 일치, 필러 일관성 유지, 신규 토큰 0.
- 각 페이지 스크린샷을 `ref/prototype` 원본과 대조해 레이아웃 일치 확인.
- Desktop/Tablet/Mobile 정상, 리빌·hover·모달·탭/아코디언 동작.
- 시맨틱 마크업·키보드 포커스·prefers-reduced-motion 대응.

## 8. 작업 태도
- 원본 우선. 추측으로 채우지 말고, 원본이 없거나 충돌하면 **먼저 질문**.
- 지시 범위만 구현. 범위 밖 임의 변경/삭제 금지. 큰 결정·구조 변경은 짧게 근거 보고 후 확인.
- 각 빌드 단계 끝에서 멈추고 확인받는다.
