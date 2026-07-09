# Claude Code 전달용 프롬프트 — 우선순위 스킬 5종 설치·설정

> 출처: awesome-claude-skills (https://github.com/ComposioHQ/awesome-claude-skills)
> 사용법: VSCode에서 작업 폴더를 열고 Claude Code에 아래 블록을 그대로 붙여넣으세요.
> 목적: KEESS 빌드→디버깅→UI/UX→리팩토링→푸시 워크플로우에 맞는 5개 스킬을 설치·검증.

---

너는 Claude Code다. 아래 **우선순위 스킬 5종(총 6개 스킬)**을 이 개발 환경에 설치하고 정상 로드되는지 검증한다. 각 스킬은 별도 GitHub 저장소에 SKILL.md 형태로 존재한다.

## 설치 대상 · 워크플로우 매핑 · 원본
| # | 스킬 | 용도(단계) | 원본 |
|---|---|---|---|
| 1 | Playwright Browser Automation | 검증·디버깅(③④) | https://github.com/lackeyjb/playwright-skill |
| 1-alt | Webapp Testing (대안) | 로컬 웹앱 테스트 | https://github.com/ComposioHQ/awesome-claude-skills/tree/master/webapp-testing |
| 2 | Full-Page Screenshot | 확정본 시각 대조(④) | https://github.com/LewisLiu007/full-page-screenshot |
| 3 | root-cause-tracing | 디버깅(③) | https://github.com/obra/superpowers/tree/main/skills/root-cause-tracing |
| 4a | git-pushing | 푸시(⑥) | https://github.com/mhattingpete/claude-skills-marketplace/tree/main/engineering-workflow-plugin/skills/git-pushing |
| 4b | using-git-worktrees | A/B 병렬 격리(⑥) | https://github.com/obra/superpowers/tree/main/skills/using-git-worktrees |
| 5 | software-architecture | 빌드·리팩토링(②⑤) | https://github.com/NeoLabHQ/context-engineering-kit/tree/master/plugins/ddd/skills/software-architecture |

참고: `root-cause-tracing`과 `using-git-worktrees`는 같은 저장소(obra/superpowers)에 있으므로 한 번만 클론하면 된다.

## 설치 위치 (먼저 나에게 확인)
- 기본 권장: **프로젝트 스코프** `.claude/skills/`(이 저장소에서만 작동, A/B 폴더별로 관리) 
- 또는 **개인 스코프**(모든 프로젝트 공용). 네 버전에 맞는 개인 스킬 경로를 사용하라(예: `~/.claude/skills/`, 없으면 `~/.config/claude-code/skills/`).
- 어느 스코프에 설치할지 **먼저 나에게 물어본 뒤** 진행하라.

## 설치 절차 (스킬마다)
1. 저장소를 임시 디렉터리에 얕게 클론한다. 예:
   ```bash
   tmp=$(mktemp -d)
   git clone --depth 1 <repo-url> "$tmp/repo"
   ```
2. 저장소 안에서 **SKILL.md가 있는 스킬 폴더를 찾는다**(위 표의 하위 경로 기준, 실제 구조는 직접 확인). 저장소 루트가 곧 스킬이면 루트를 사용.
3. 그 스킬 폴더 전체(SKILL.md + scripts/templates/resources 등)를 설치 위치로 복사한다:
   ```bash
   cp -r "$tmp/repo/<skill-subpath>" <skills-dir>/<skill-name>
   ```
4. 라이선스/저작자 표기 파일(LICENSE, README)이 있으면 함께 유지한다(서드파티 스킬).
5. frontmatter 로드 확인:
   ```bash
   head -n 15 <skills-dir>/<skill-name>/SKILL.md
   ```
   `name`, `description`가 유효한지 확인. 없거나 깨졌으면 나에게 보고.
6. 임시 디렉터리 삭제(`rm -rf "$tmp"`).

의존성 주의: Playwright 계열 스킬은 Node/Playwright 설치가 필요할 수 있다. 스킬의 README 지시가 있으면 따르되, 시스템 전역 설치가 필요한 경우 실행 전 나에게 확인하라.

## 설치 후 검증·보고
1. 설치된 스킬 목록과 각 `SKILL.md`의 `name`/`description` 한 줄을 표로 보여줘라.
2. 트리거 자가 점검: 아래 예시 작업에 대해 어떤 스킬이 활성화될지 예상해 보고하라.
   - "로컬 dev 서버 띄우고 /leadership 페이지 스크린샷 찍어줘" → (Full-Page Screenshot / Playwright 예상)
   - "이 하이드레이션 에러 원인 추적해줘" → (root-cause-tracing 예상)
   - "A타입 커밋하고 푸시해줘" → (git-pushing 예상)
   - "B타입 작업을 별도 브랜치로 격리해줘" → (using-git-worktrees 예상)
3. 설치 중 실패·구조 불일치가 있으면 임의로 대체하지 말고 해당 스킬만 건너뛰고 사유를 보고하라.

먼저 **설치 스코프(프로젝트 vs 개인)**만 확인한 뒤 순서대로 설치를 시작하라.
