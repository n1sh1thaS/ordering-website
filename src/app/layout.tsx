"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { links } from "@/lib/constants";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex flex-row gap-5 mt-9 ml-9">
          {Object.keys(links).map((link) => (
            <div key={link} className="flex flex-col items-center">
              <Link href={links[link as keyof typeof links]}>
                <h1 className="text-2xl font-semibold m-1 hover:cursor-pointer">
                  {link}
                </h1>
              </Link>
              <div
                className={`p-[0.08rem] w-28 transition-all duration-500 ${
                  pathname === links[link as keyof typeof links]
                    ? "bg-slate-900"
                    : "bg-transparent"
                }`}
              />
            </div>
          ))}
        </div>
        {children}
      </body>
    </html>
  );
}
