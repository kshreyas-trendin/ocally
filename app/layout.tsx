import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ocally.co",
  description: "Growth Agents for Mainstreet Businesses",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Arima:wght@100..700&family=Mulish:ital,wght@0,200..1000;1,200..1000&display=swap" rel="stylesheet" />
        <style dangerouslySetInnerHTML={{
          __html: `
            @import url('https://fonts.googleapis.com/css2?family=Arima:wght@100..700&family=Mulish:ital,wght@0,200..1000;1,200..1000&display=swap');
          `
        }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          dangerouslySetInnerHTML={{
            __html: `
            (function() {
              try {
                var d = document.documentElement;
                var m = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                if (!d.getAttribute('data-theme')) d.setAttribute('data-theme', m);
                d.style.colorScheme = m; // improve native UI colors pre-paint
              } catch (e) {}
            })();
          `}}
        />
        {children}
      </body>
    </html>
  );
}
