import type { Config } from "tailwindcss";

/**
 * Design.md §3 토큰 1:1 매핑.
 * 색·간격·라운드·그림자·이징은 CSS 변수(var(--*))를 경유하고,
 * 브레이크포인트는 확정 원본이 사용하는 max-width 검증값만 등록한다.
 * 신규 임의 값 추가 금지.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    // 확정 원본의 max-width 미디어쿼리 값만 사용 (Design.md §4)
    screens: {
      "mx-1040": { max: "1040px" },
      "mx-940": { max: "940px" },
      "mx-880": { max: "880px" },
      "mx-820": { max: "820px" },
      "mx-760": { max: "760px" },
      "mx-740": { max: "740px" },
      "mx-720": { max: "720px" },
      "mx-640": { max: "640px" },
      "mx-560": { max: "560px" },
    },
    extend: {
      colors: {
        bg: "var(--bg)",
        ink: "var(--ink)",
        muted: "var(--muted)",
        line: "var(--line)",
        surface: "var(--surface)",
        p1: "var(--p1)",
        p2: "var(--p2)",
        p3: "var(--p3)",
        p4: "var(--p4)",
        gov: "var(--gov)",
      },
      fontFamily: {
        sans: [
          "var(--font-pretendard)",
          "Pretendard Variable",
          "Pretendard",
          "system-ui",
          "sans-serif",
        ],
        serif: ["var(--font-gowun)", "Gowun Batang", "serif"],
      },
      maxWidth: {
        site: "var(--maxw)", // 홈/코퍼레이트 1200
        pillar: "1180px", // 필러 페이지
      },
      spacing: {
        gut: "var(--gut)", // 좌우 거터 24px
      },
      borderRadius: {
        r: "var(--r)", // 카드·surface 20px
        pill: "999px", // 버튼·칩·필
        modal: "22px", // 모달
        menu: "12px", // 소형 메뉴
      },
      boxShadow: {
        "1": "var(--shadow-1)",
        "2": "var(--shadow-2)",
        "3": "var(--shadow-3)",
      },
      transitionTimingFunction: {
        ease: "var(--ease)",
        "ease-strong": "var(--ease-out)",
      },
    },
  },
  plugins: [],
};

export default config;
