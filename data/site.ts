/**
 * 공용 크롬(Nav / Footer) 콘텐츠 — keess_home_C_v18 확정본에서 그대로 이식.
 * 카피·링크·회사정보는 원본 그대로. 임의 변경 금지.
 */

export const BRAND = "KEESS";

/** 상단 내비게이션 메뉴 — 홈은 앵커(#p1..), 필러 페이지는 라우트로 사용 가능하도록 둘 다 보유 */
export type NavItem = { label: string; anchor: string; route: string };

export const NAV_ITEMS: NavItem[] = [
  { label: "AX·AI 전환", anchor: "#p1", route: "/ax-ai" },
  { label: "리더십·조직", anchor: "#p2", route: "/leadership" },
  { label: "HRD 통합 솔루션", anchor: "#p3", route: "/hrd" },
  { label: "콘텐츠 솔루션", anchor: "#p4", route: "/content" },
];

export const NAV_CTA = { label: "교육 상담", target: "#inq" };

/** 패밀리 사이트 */
export type FamilyLink = { label: string; href: string };

export const FAMILY_SITES: FamilyLink[] = [
  { label: "디지털 원격훈련 아카이브", href: "https://arc.kgeduone.co.kr/" },
  { label: "AI 기초 훈련", href: "https://ai.kgeduone.co.kr/main/default.asp" },
  { label: "이코노미스트 Leaders", href: "https://www.economistleaders.co.kr/" },
  { label: "내일배움카드", href: "https://hrd.kgeduone.co.kr/main/" },
  { label: "KG에듀원", href: "https://www.kgeduone.com/" },
];

/** SNS */
export type SnsKind = "instagram" | "facebook" | "blog";
export type SnsLink = { kind: SnsKind; href: string; label: string };

export const SNS_LINKS: SnsLink[] = [
  {
    kind: "instagram",
    href: "https://www.instagram.com/kghrd_official",
    label: "인스타그램",
  },
  {
    kind: "facebook",
    href: "https://www.facebook.com/profile.php?id=61556338525608",
    label: "페이스북",
  },
  { kind: "blog", href: "https://blog.naver.com/kg_hrd", label: "블로그" },
];

/** 푸터 브랜드 문구 */
export const FOOTER_NOTE =
  "KG에듀원 HRD사업본부의 기업·기관 교육 도입 문의 채널입니다. 회사·사업 소개는 kgeduone.com에서 안내합니다.";

/** 회사 정보 */
export type CompanyRow = { dt: string; dd: string };

export const COMPANY_INFO: CompanyRow[] = [
  { dt: "상호명", dd: "(주)케이지에듀원" },
  { dt: "대표자", dd: "김상엽" },
  {
    dt: "주소",
    dd: "서울특별시 동작구 장승배기로 171, 2층 (노량진동, 노량진아이비빌딩) 06928",
  },
  { dt: "사업자번호", dd: "119-81-39002" },
  { dt: "통신판매업", dd: "제 2025-서울동작-0445호" },
  { dt: "개인정보책임", dd: "임근성 · privacy_eduone@kggroup.co.kr" },
  { dt: "문의", dd: "Tel 02-828-2704 · kg11_kg6030@kggroup.co.kr" },
];

export const FOOTER_COPYRIGHT =
  "COPYRIGHT © KG EDUONE. All RIGHTS RESERVED.";
