# Claude Code 전달용 프롬프트 — KEESS 디자인 강제 스킬 제작

> 사용법: VSCode에서 `KEESS_A-Type` 폴더를 열고 Claude Code에 아래 블록을 그대로 붙여넣으세요.
> 목적: A-Type·B-Type·후속 페이지에서 Claude Code가 **항상 동일한 KEESS 디자인 기준(Design.md)을 자동 적용**하도록 만드는 재사용 스킬을 생성.

---

너는 Claude Code용 **Skill 작성 전문가**다. KEESS 프로젝트의 디자인 일관성을 강제하는 스킬 하나를 만든다.

## 목표
`Design.md`(디자인 헌법)를 스킬로 패키징해서, 앞으로 KEESS의 어떤 페이지·컴포넌트·UI를 만들거나 수정하든 Claude가 **매번 동일한 토큰·컴포넌트·모션·보이스 규칙을 자동으로 적용**하게 한다. "하나의 사이트 = 일관성"이 목적이다.

## 시작 전 읽을 것
- `ref/Design.md` — 규칙의 원천(토큰/컴포넌트/모션/보이스/Do·Don't/코딩 컨벤션).
- `ref/BUILD_STRATEGY.md` — 페이지·컴포넌트 인벤토리, 우선순위 규칙.
- `ref/prototype/*.html` — 본부 확정 원본 5종(시각적 기준).

## 작업 방식
- `skill-creator` 스킬이 설치돼 있으면 그 방법론을 따른다. 없으면 표준 스킬 구조(SKILL.md + frontmatter + 참조 파일)로 직접 작성한다.
- 스킬은 **간결하게**(progressive disclosure): SKILL.md 본문은 핵심 규칙과 체크리스트만, 상세는 참조 파일로 분리.

## 만들 스킬 스펙
- **이름**: `keess-design-guard`
- **설치 위치**: 개인 스코프 `~/.claude/skills/keess-design-guard/` 권장(그래야 KEESS_A-Type·KEESS_B-Type 양쪽 폴더에서 모두 작동). 프로젝트 전용이 필요하면 `.claude/skills/`도 가능 — 어디에 둘지 나에게 먼저 확인.
- **description(트리거 최적화, 3인칭)**: KEESS 사이트의 페이지·섹션·컴포넌트·UI를 만들거나 수정할 때, Next.js/React/Tailwind로 KEESS 화면을 구현·리팩토링할 때, 디자인 토큰·컬러·타이포·간격·모션·카피 보이스를 적용할 때 항상 사용된다는 점이 드러나게 작성. "KEESS, 디자인 토큰, 컴포넌트, Tailwind, 일관성, 필러(P1~P4)" 등 트리거 키워드 포함.

## SKILL.md 본문에 담을 내용 (Design.md에서 추출, 새 값 발명 금지)
1. **When to use / When NOT to use** — KEESS UI 작업 시 사용, KEESS 무관 작업엔 미사용.
2. **절대 원칙** — 새 UX·컬러·컴포넌트·폰트 금지 / 토큰 1:1 / 카피는 확정본 그대로 / P1은 구성 변경 금지(표현만) / 백엔드 없음 / 충돌 시 우선순위(홈>코퍼레이트>P1~P4).
3. **토큰 치트시트** — 컬러(--bg #FAFAFB, --ink #14141A, --muted #54585f, --line #E6E8EC, --surface #F3F5F8 / 필러 --p1 #2E1A6B, --p2 #E91E63, --p3 #8B27A8, --p4 #F58220, --gov #F4B83A), 타이포(Pretendard / Gowun Batang serif), 간격(--maxw 1200/필러1180, --gut 24, 섹션 120·74), 라운드(--r 20, pill 999, modal 22), 그림자(--shadow-1~3), 이징(--ease cubic-bezier(.22,.61,.36,1)).
4. **필러 틴트 규칙** — 필러 페이지는 --bg/--surface/--ink/--line 4값만 틴트 교체, 필러색은 포인트에만.
5. **컴포넌트 목록** — Nav/Footer/Section/SectionHeader/Button(ink·glass·line-dark)/Chip·Badge/Card/MetricStat/JourneyStep/Framework/Tab/Accordion/Modal/ToTop/Reveal.
6. **모션 규칙** — 리빌 `.r`/`.stagger` + IntersectionObserver threshold .16, 등장 .7~.9s, 인터랙션 .2~.35s, hover translateY(-2~3px)+shadow, prefers-reduced-motion 대응.
7. **보이스 규칙** — 선언형 평서문·대구, 증거(숫자·기관·산출물) 기반, 금지 표현(과장·판촉·가격·이모지·AI 상투어).
8. **검증 체크리스트(Definition of Done)** — 신규 토큰 0 / 확정본과 섹션·카피 일치 / 필러 일관성 / 3-디바이스 / 접근성 / `npm run dev` 무오류.

## 번들 참조 파일(스킬 폴더 안에 함께 배치)
- `reference/Design.md` — `ref/Design.md` 복사본(스킬 자기완결화).
- `reference/tokens.md` — 위 3번 치트시트를 표로 정리.
- `reference/confirmed-prototypes.md` — 확정 원본 5종 파일명·라우트·틴트 매핑표.

## 완료 후
1. 생성한 SKILL.md와 참조 파일 트리를 보여줘라.
2. description이 잘 트리거되는지 예시 작업 3개("KEESS 홈 히어로 만들어줘" / "리더십 페이지 카드 수정" / "무관한 파이썬 스크립트")로 트리거 여부를 자가 점검해 보고하라.
3. 새 규칙을 발명하지 않았는지(모든 값이 Design.md 출처인지) 확인 보고하라.

먼저 스킬 설치 위치(개인 vs 프로젝트)만 나에게 확인한 뒤 생성을 시작하라.
