import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "코드알파 - 초등학생을 위한 코딩 학습",
  description: "C, Java, JavaScript를 놀이처럼 배우는 초등학생 맞춤 코딩 학습 플랫폼",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        {children}
      </body>
    </html>
  );
}
