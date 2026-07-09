import localFont from "next/font/local";
import { Gowun_Batang } from "next/font/google";

/**
 * 폰트 2종 (Design.md §3-2) — 확장 금지.
 * - Pretendard Variable: 본문·UI (self-host, next/font/local)
 * - Gowun Batang: 디스플레이/선언(serif) 전용 (next/font/google)
 */
export const pretendard = localFont({
  src: "../public/fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

export const gowunBatang = Gowun_Batang({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-gowun",
});
