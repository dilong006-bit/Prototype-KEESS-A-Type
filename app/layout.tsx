import type { Metadata } from "next";
import { pretendard, gowunBatang } from "@/lib/fonts";
import "./globals.css";
import "@/styles/components.css";
import Toast from "@/components/common/Toast";

export const metadata: Metadata = {
  title: "KEESS — KG에듀원 기업·기관 교육",
  description:
    "진단으로 설계하고, 효과로 증명합니다. KG에듀원 HRD사업본부의 기업·기관 교육 전환 파트너.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${pretendard.variable} ${gowunBatang.variable}`}
    >
      <body>
        {children}
        <Toast />
      </body>
    </html>
  );
}
