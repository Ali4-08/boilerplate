import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import React from "react";


// تنظیم فونت وزیر متن به صورت محلی و لوکال
const vazirmatn = localFont({
  src: [
    {path: "../public/fonts/Vazirmatn-Regular.woff2", weight: "400", style: "normal"},
    {path: "../public/fonts/Vazirmatn-bold.woff2", weight: "700", style: "normal"},
  ],
  display: "swap",
  variable: "--font-vazirmatn",
});

export const metadata: Metadata = {
  title: "بویلر پلیت",
  description: "یک نقطه شروع حرفه‌ای برای پروژه های Next.js فارسی با TypeScript، Tailwind CSS و PostgreSQL",
};

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    
    <html
      // تنظیمات لازم برای پشتیبانی از زبان فارسی
      lang="fa"
      dir="rtl"
      // تنظیم اسکرول نرم برای صفحات برنامه
      data-scroll-behavior="smooth"
      className="h-full antialiased"      
    >
      <body 
      className={`${vazirmatn.variable} min-h-full flex flex-col`}>      
        
        <main>{children}</main>
      </body>
    </html>
  );
}
