import "./globals.css";
import localFont from "next/font/local";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import "katex/dist/katex.min.css";

const abcDiatype = localFont({
  src: [
    {
      path: "../public/fonts/abc-diatype-regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/abc-diatype-bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/abc-diatype-italic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/abc-diatype-bold-italic.otf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../public/fonts/abc-diatype-light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/abc-diatype-light-italic.otf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../public/fonts/abc-diatype-medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/abc-diatype-medium-italic.otf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../public/fonts/abc-diatype-thin.otf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../public/fonts/abc-diatype-thin-italic.otf",
      weight: "100",
      style: "italic",
    },
  ],
  variable: "--font-abc-diatype",
});

export const metadata: Metadata = {
  title: "Zonta Elia",
  description: "Personal website of Zonta Elia",
  icons: {
    // icon: [{ url: "/favicon.ico", sizes: "any" }],
    icon: [{ url: "🌊", sizes: "any" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={abcDiatype.variable}>
      <body
        className={`${abcDiatype.className} bg-black text-white min-h-screen flex flex-col`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
