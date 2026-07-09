# KEESS A-Type — 고충실도 인터랙티브 프로토타입

> **KG에듀원 HRD사업본부 KEESS**(기업·기관 교육 도입 문의 채널, B2B·B2G 인바운드)의 **A-Type 풀버전(5페이지)** 고충실도 인터랙티브 프로토타입입니다.
>
> ⚠️ **실운영 배포가 아닌 기획안·화면 방향성 검증용**입니다. 회원/로그인/결제/DB/관리자/API 등 백엔드는 구현하지 않았으며, 문의 폼은 제출 시 성공 상태 UI만 표시합니다.

---

## 1. 개요

하나의 사이트 안에서 **홈 1페이지 + 4개 필러(전문 영역) 상세 페이지**를 일관된 디자인 시스템으로 구현했습니다. 각 페이지는 확정된 원본 프로토타입(`ref/prototype/*.html`)의 구성·카피·인터랙션을 기준으로, 홈 디자인 시스템 위에서 재현했습니다.

- **디자인 원칙**: 하나의 사이트 = 일관된 디자인. 페이지 정체성은 **필러 틴트**(배경·표면·텍스트·라인 4값 교체)로만 구분하고, 필러 포인트색은 배지·번호·강조·CTA에만 사용.
- **발명 금지**: 확정 원본과 디자인 헌법(`ref/Design.md`)에 있는 것만 코드로 이식. 신규 색토큰·서체·버튼변형 0.
- **카피 = 확정본 그대로**: 문구는 원본 HTML에서 재작성·요약 없이 이식.

## 2. 페이지 · 라우트

| 라우트 | 페이지 | 필러 틴트 | 핵심 인터랙션 |
|---|---|---|---|
| `/` | **홈** | 중립(틴트 없음) | 히어로 캐러셀, 4필러 병렬 소개, 부정훈련 신고/조회 모달(v26 1:1), FAQ 아코디언 |
| `/ax-ai` | **P1 · AX·AI 전환** | 보라 | 시나리오 셀렉터, 직무맵, 프레임워크 계단, 케이스 스터디 |
| `/leadership` | **P2 · 리더십·조직** | 마젠타 | 리더십 휠(SVG), 성장 여정 스테퍼, 트랙 카드, 성장핏 진단 |
| `/hrd` | **P3 · HRD 통합 솔루션** | 바이올렛 | KGESA 데모(위젯 on/off·재정렬 → 라이브 반영), 운영 타임라인, **정부지원 환급 섹션** |
| `/content` | **P4 · 콘텐츠 솔루션** | 웜(오렌지) | 4축 맵, 34개 과정 탐색기(필터·검색·정렬), 과정 상세 모달 |

각 페이지에는 하단 **도입 문의 폼**(성공 상태 UI, 라이브 인라인 검증)이 포함됩니다.

## 3. 기술 스택

- **Next.js 16.2.10** (App Router, Turbopack)
- **React 19.2.4** / **TypeScript 5**
- **Tailwind CSS 3.4.17** + PostCSS / Autoprefixer
- 폰트 2종: 본문·UI = Pretendard Variable, 디스플레이(serif) = Gowun Batang (`next/font` 로컬 로드)

## 4. 디자인 시스템

디자인 토큰은 [`app/globals.css`](app/globals.css) `:root`에 1:1로 정의되어 있습니다.

```css
--bg:#FAFAFB; --ink:#14141A; --muted:#54585f; --line:#E6E8EC; --surface:#F3F5F8;
--p1:#2E1A6B; --p2:#E91E63; --p3:#8B27A8; --p4:#F58220; --gov:#F4B83A;
--ease:cubic-bezier(.22,.61,.36,1); --ease-out:cubic-bezier(.2,0,0,1);
--maxw:1200px; --gut:24px; --serif:"Gowun Batang",serif; --r:20px;
/* --shadow-1/2/3 : 3단계 elevation */
```

- **필러 틴트**: 각 페이지 wrapper의 `.tint-p1 ~ .tint-p4` 클래스가 `--bg/--surface/--ink/--line` 4값만 오버라이드. 공용 별칭 토큰 `--pillar`가 페이지별 포인트색(`--pN`)을 자동 채택합니다.
- **컨테이너**: 홈/코퍼레이트 1200px, 필러 페이지 1180px. 거터 24px, 본문 가독폭 ~54ch.
- **Radius**: 카드/표면 20px, 버튼/칩/필 999px, 모달 22px.
- **모션**: Scroll Reveal(`IntersectionObserver`, threshold .16, 1회), hover translateY, `prefers-reduced-motion` 대응.

## 5. 폴더 구조

```
app/                라우트 (layout, page(/), ax-ai/, leadership/, hrd/, content/), globals.css
components/
  common/           Nav, SubNav, Footer, Section, Button, Card, Chip, Modal, PillarHero,
                    ContactForm, PreventTrainingModal, Toast, ToTop, Reveal ...
  sections/         페이지별 섹션 컴포넌트 (axai/ leadership/ hrd/ content/ home/)
data/               home / axai / leadership / hrd / content / courses / prevent / site
                    (카피 = 확정본 그대로)
styles/             components.css(항상 로드, 공용) + 페이지별 css(고유 스타일만)
lib/                useReveal, useCountUp, toast, fonts
ref/                Design.md(디자인 헌법), BUILD_STRATEGY.md, prototype/(확정 원본 HTML),
                    prd/, representative-process/(대표과정 소개서)
```

- 컴포넌트는 **데이터 주입형(props)** 으로 구현.
- **공용 폼·모달 스타일은 항상 로드되는 `styles/components.css`에만** 두어 CSS 스코핑 회귀를 방지.

## 6. 로컬 실행

```bash
npm install
npm run dev      # → http://localhost:3000  (A안 포트 고정)
```

- **A안은 포트 3000에 고정**되어 있습니다 (`package.json`의 `dev`/`start`에 `-p 3000` 명시). B-Type(B안)과 병렬 구동 시 B안은 3001 등 다른 포트를 사용하세요.
- 프로덕션 미리보기: `npm run build && npm start` (3000).

## 7. 주요 구현 하이라이트

- **v26 부정훈련 신고/조회 모달**: 확정 원본 `ref/prototype/KEESS_home_C_v26.html`을 유일 기준으로 1:1 이식. 필수 5항목, 조건부 항목, 이중 동의, 마스터 비밀번호 조회, 자동 하이픈, 토스트, 라이브 검증.
- **KGESA 데모(P3)**: 위젯 on/off·재정렬이 프런트오피스 화면에 즉시 반영되는 인터랙티브 데모.
- **과정 탐색기(P4)**: 34개 과정 필터·검색(디바운스)·정렬·상세 모달.
- **공용 `PillarHero` + `.pillar-*` 시스템**: P2/P3 히어로·문의 패널을 단일 소스로 통합(리팩토링 완료), `var(--pillar)`로 필러색 자동 적용.
- **접근성**: 시맨틱 마크업, `:focus-visible`, 터치 타깃 ≥44px, `prefers-reduced-motion` 대응.

## 8. 품질 검수 (Definition of Done)

- ✅ `npm run dev` 무오류, 5라우트 정상
- ✅ 전 라우트 콘솔 예외 0 / 콘솔 에러 0 / 하이드레이션 미스매치 0
- ✅ Desktop/Tablet/Mobile 반응형 정상, 가로 오버플로 0 (390/768/1280)
- ✅ 확정 원본과 섹션 순서·카피 일치, 필러 일관성 유지, **신규 디자인 토큰 0**

## 9. 기준 문서 (source of truth)

- [`ref/Design.md`](ref/Design.md) — 디자인 헌법 (토큰·타이포·모션·보이스)
- [`ref/BUILD_STRATEGY.md`](ref/BUILD_STRATEGY.md) — 빌드 전략·섹션 인벤토리
- [`ref/prototype/*.html`](ref/prototype) — 확정 원본 (= source of truth)
- [`CLAUDE.md`](CLAUDE.md) — 빌드·코딩 규칙

## 10. 남은 작업

- [ ] **P4 대표과정 교체**: 직무특화·비즈니스스킬·AXAI전환 각 6개씩 (소개서는 `ref/representative-process/`에 준비됨, `data/courses.ts` 스키마 유지)
- [ ] Vercel 배포

---

_이 프로토타입은 화면 방향성 검증용이며 실제 회원·결제·데이터 기능은 포함하지 않습니다._
