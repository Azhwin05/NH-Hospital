import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "NK Hospitals — Advanced Science. Compassionate Care.",
  description:
    "NK Hospitals is India's leading multispeciality hospital group, delivering world-class healthcare across 30+ specialities. Book appointments online.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        {/* Phosphor Icons — loaded early so icons render on first paint */}
        <Script
          src="https://unpkg.com/@phosphor-icons/web"
          strategy="beforeInteractive"
        />
      </head>
      <body className="antialiased text-gray-800 min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
