# KEESS A-Type — Full Version 제작 전략서 (BUILD STRATEGY)

문서 성격: A Type(풀버전) 제작 착수 전 확정하는 단계별 업무 전략. 코드 생성의 상위 기준.
기준 문서: `Design.md`(디자인 헌법) · `ref/prototype`의 확정 HTML 5종 · P1 대표과정 지식베이스.
원칙: 새 UX·IA·컬러·컴포넌트 발명 금지. 확정 디자인 언어를 Next.js 코드로 이식.

---

## 1. 목표 / 목적
- 목표: 확정 정적 HTML 프로토타입 5종을 **Design.md 준수 Next.js + TypeScript + Tailwind 고충실도 인터랙티브 프로토타입**으로 재구성
- 목적: 실운영 배포가 아닌 **기획안·화면 방향성 검증**용. 백엔드/DB/로그인/결제 없음
- 산출 형태: `KEESS_A-Type` 폴더에서 독립 구동되는 Next.js 앱(`npm run dev`). B Type은 동일 골격에 필러 B계열만 교체해 별도 구동

## 2. A/B 정의 및 확정 결정 (본부 확정 반영)
- **A Type 구성 = 홈(C) + P1(D) + P2 A_journey + P3 A_integrated + P4 A_solution**
- 홈: `keess_home_C_v18_최종확정` — 본부 투표 **C안 확정**, A/B 공유(공통)
- P1 AX·AI: `keess_P1_AXAI_D_scenario_v7` — 본부 투표 **D안 확정**. **구성(IA·섹션) 변경 금지**, 사이트 일관성 위해 **디자인 표현만 필요 시 조정**
- P2·P3·P4: **A계열**(journey / integrated / solution A)
- 최우선 원칙: **하나의 사이트 = 일관된 디자인**. 페이지별 정체성(필러 틴트)은 유지하되 컴포넌트·모션·타이포·간격은 공통 시스템으로 통일
- B Type(후속): 홈·P1 동일, P2 `B_framework` / P3 `B_platform` / P4 `B`로 교체

## 3. 기술 스택 · 구현/제외 범위
- Frontend: Next.js(App Router) · React · TypeScript
- Styling: Tailwind CSS + CSS Variables 디자인 토큰(Design.md 1:1) · 반응형(Desktop/Tablet/Mobile)
- 구조: Component-based, 재사용 Section/Card/CTA/Modal
- 구현: 정적 데이터 화면, 라우트/앵커 이동, CTA, 문의 모달, 카드 hover, 탭/아코디언, 반응형, 기본 접근성
- 제외: 회원/로그인, 결제, DB 저장, 관리자, API 연동, 운영 배포, 인증·권한

## 4. 폴더 구조 (제안)
```
KEESS_A-Type/
├─ ref/prototype/           # 확정 HTML(읽기 전용 근거)
├─ BUILD_STRATEGY.md        # 본 문서
├─ CLAUDE.md                # 빌드·코딩 규칙(착수 시 생성)
├─ app/                     # App Router
│  ├─ layout.tsx            # Nav+Footer+글로벌
│  ├─ page.tsx              # 홈(/)
│  ├─ ax-ai/page.tsx        # P1 (/ax-ai)
│  ├─ leadership/page.tsx   # P2 (/leadership)
│  ├─ hrd/page.tsx          # P3 (/hrd)
│  ├─ content/page.tsx      # P4 (/content)
│  └─ globals.css           # CSS 변수 토큰 + base
├─ components/
│  ├─ common/               # Nav, Footer, Section, SectionHeader, Button, Chip, Card, MetricStat, Modal, ToTop, Reveal ...
│  └─ sections/             # 페이지별 섹션 컴포넌트
├─ data/                    # 페이지별 정적 데이터(카피 = 확정본)
│  ├─ home.ts, axai.ts, leadership.ts, hrd.ts, content.ts
├─ lib/                     # useReveal 훅, 상수
├─ styles/tokens.css        # (선택) 토큰 분리
├─ tailwind.config.ts       # 토큰 매핑
└─ public/fonts, images
```

## 5. 페이지 · 라우트 맵
| 라우트 | 페이지 | 근거 확정본 | 필러 틴트 |
|---|---|---|---|
| `/` | 홈 | keess_home_C_v18_최종확정 | 중립 베이스(틴트 없음) |
| `/ax-ai` | P1 AX·AI 전환 | P1_AXAI_D_scenario_v7 | P1 보라 틴트 |
| `/leadership` | P2 리더십·조직 | P2_leadership_A_journey | P2 마젠타 틴트 |
| `/hrd` | P3 HRD 통합 솔루션 | P3_hrd_A_integrated | P3 바이올렛 틴트 |
| `/content` | P4 콘텐츠 솔루션 | P4_content_solution_A | P4 웜 틴트 |

## 6. 섹션 인벤토리 (페이지별)
- **홈(/)**: 히어로 캐러셀(5슬라이드·이벤트/신규/정부지원/사례) → 교육체계("조직을 먼저 진단") → 4대 필러 카드(P1~P4, 01·02·03) → 성과 지표 → References(위탁운영·고객사) → Footer
- **P1(/ax-ai)**: 히어로 → 인트로("전환을 설계") → 목표별 경로 → End-to-End 5 Step → AX Framework Lv1~Lv5 → 직무별 포지셔닝 맵 → 무엇이 다른가(비교표) → 성과 증거(전후 GAP) → 과정 라인업 → 도입 사례 → CTA → 상담/가이드 모달
- **P2(/leadership)**: 히어로("역할 전환마다 다른 리더십") → 문제 정의 → 성장 5단계 설계 → 6 리더십 트랙 → 6 Core 역량 → 조직경험진단 Growth-Fit(6 Dimensions, 오프라인) → 성장 체계 → CTA → 도입 문의 모달
- **P3(/hrd)**: 히어로("한 곳에서") → 통합 가치 → 3개 축(연수원 LMS+APP / 운영위탁 7축 / 콘텐츠 스튜디오 3개소) → References → 차세대 시스템 미리보기 → 4단계 프로세스(문의→컨설팅→설계→구축·운영·보고) → CTA → 도입 문의 모달
- **P4(/content)**: 히어로("모든 학습 니즈") → 보유 콘텐츠(8,426개·7체계) → 법정 헌터스(의무교육) → 맞춤 제작 → 파트너 네트워크 → 4개 축 문의 → 도입 문의 모달
- 공통: 상단 고정 Nav(72px), 우측 페이지 도트/ToTop FAB, 다크 Footer, 문의 모달

## 7. 공통 컴포넌트 인벤토리 (Design.md §5 기준)
| 컴포넌트 | 사용 페이지 | 비고 |
|---|---|---|
| `Nav` / `MobileMenu` | 전 페이지 | fixed 72px, 스크롤 배경 전환 |
| `Footer` | 전 페이지 | 다크(--ink), SNS/패밀리 |
| `Section` + `SectionHeader` | 전 페이지 | eyebrow→title→sub 위계 |
| `Button`(ink/glass/line-dark) | 전 페이지 | pill, hover translateY |
| `Chip` / `Badge` | 홈·P1 | pill 태그 |
| `Card`(기본/ref/cert) | 전 페이지 | surface, hover -3px |
| `MetricStat` | 홈·P1·P4 | 카운트업 |
| `PillarCard` | 홈 | 필러 배지+01·02·03 |
| `JourneyStep` / `ProcessSteps` | P1·P2·P3 | 번호+명사구+진행라인 |
| `Framework`(Lv1~5) | P1 | 고민→처방 페어 |
| `Tab` / `Accordion(FAQ)` | P1(·해당 시) | 점진 공개 |
| `Modal`(문의/상담/가이드) | 전 페이지 | radius 22, pvfade |
| `ToTop` / `PageDots` | 전 페이지 | 부유 보조 |
| `Reveal` / `Stagger` | 전 페이지 | IntersectionObserver th .16 |

## 8. 디자인 토큰 이식 방식
- `globals.css :root`에 Design.md 토큰 그대로: `--bg --ink --muted --line --surface --p1~--p4 --gov --ease --ease-out --maxw --gut --serif --r --shadow-1~3`
- 필러 페이지는 wrapper(예 `.pillar-p2`)에서 `--bg/--surface/--ink/--line` 4값만 오버라이드(검증된 틴트값)
- `tailwind.config.ts`: colors/spacing/borderRadius/boxShadow/fontFamily/screens를 CSS 변수·검증 브레이크포인트(1040/940/880/820/760/740/720/640/560)에 매핑
- 하드코딩 hex/px 신규 도입 금지 → 모두 토큰 경유

## 9. 데이터 구조 원칙
- 페이지별 `data/*.ts`에 타입 지정 정적 데이터. **카피 문구는 확정본 그대로**(임의 변경 금지)
- 예시 데이터/미확정 값은 확정본의 "예시" 라벨 관행 유지
- 컴포넌트는 데이터 주입형(props)으로 A/B 재사용 대비

## 10. 단계별 Phase 계획
- **Phase 0 (완료)**: 기준 확정·5종 섹션 인벤토리·본 전략서
- **Phase 1 스캐폴딩**: Next.js(App Router)+TS+Tailwind 초기화, 토큰/폰트/리셋, `CLAUDE.md` 생성 → 산출: 빈 라우트 5개 구동
- **Phase 2 공통 컴포넌트**: §7 컴포넌트 + `useReveal` 훅 + 모션 표준화 → 산출: 컴포넌트 카탈로그
- **Phase 3 페이지 조립**: 홈 → P1 → P2 → P3 → P4 순, `data/*.ts` 분리 → 산출: 5페이지 정적 완성
- **Phase 4 인터랙션·반응형·접근성**: CTA/앵커, 문의 모달, hover, 탭/아코디언, 3-디바이스 대응, prefers-reduced-motion → 산출: 인터랙티브 완성
- **Phase 5 검수·전달**: Design.md 준수 체크·확정본 시각 대조·로컬 구동 확인 → 산출: 전달본 + B Type 이관 가이드

## 11. 검수 기준 (Definition of Done)
- Design.md 토큰/컴포넌트/모션/보이스 준수(신규 값 0)
- 확정본과 섹션 순서·카피 일치, 필러 일관성 유지
- Desktop/Tablet/Mobile 레이아웃 정상, 리빌·hover·모달 동작
- 시맨틱 마크업·키보드 포커스·reduced-motion 대응
- `npm run dev` 무오류 구동

## 12. B Type 재사용 전략
- 공통(Nav/Footer/Section/컴포넌트/토큰/홈/P1) 100% 재사용
- 교체 지점: `/leadership /hrd /content`의 섹션 컴포넌트·데이터만 B계열로 스왑
- 목적: A/B를 각 폴더 독립 앱으로 별도 구동하되 코드 골격은 공유

## 13. 확인 필요 / 리스크
- 폰트 라이선스: Pretendard/Gowun Batang 로컬 임베드 방식(웹폰트 CDN vs self-host) 확정 필요
- 이미지 자산: 히어로/필러 미디어 실제 파일 확보 경로(현재 확정본은 Unsplash/플레이스홀더 다수)
- P1 "디자인 조정 허용" 범위: 일관성 목적의 표현 조정만, 구성 변경은 불가로 고정
- 문의 모달 제출: 프로토타입이므로 실제 전송 없이 성공 상태 UI만

---
다음 단계: 승인 시 Phase 1(스캐폴딩)부터 착수.
