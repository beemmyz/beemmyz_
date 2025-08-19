
import type { Metadata } from "next";
import "./globals.css";

import { Prompt } from 'next/font/google'

import { ThemeProvider } from "@/components/ui/theme-provider";

export const metadata: Metadata = {
  title: "beemmyz",
  description: "beemmyz website",
};
const prompt = Prompt({
  subsets: ['thai',"latin"],
  variable: "--font-prompt",
  weight: ["400"],
  display: 'swap',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${prompt.variable} antialiased`}
      >

        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>

      </body>
    </html>
  );
}
