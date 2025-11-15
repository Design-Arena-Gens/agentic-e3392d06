import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "داستان عاشقانه کرمانج",
  description: "انیمیشن روایی از ملاقات دختر و پسر جوان کرمانج در خراسان ایران."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
