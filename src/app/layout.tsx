import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Lead the change | Open doors for other women",
  description:
    "Help ambitious women discover a leadership journey built on judgment, confidence, and real-world readiness—and earn rewards along the way.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Public+Sans:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
      </head>

      {children}
    </html>
  );
}
