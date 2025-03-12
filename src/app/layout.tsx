import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import GithubCorner from "@/components/GithubCorner";
import { ThemeProvider } from 'next-themes';
import { personal } from "@/data/personal";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: `${personal.name} - ${personal.title}`,
  description: `Personal portfolio website of ${personal.name}, a ${personal.title}.`,
  authors: [{ name: personal.name, url: personal.website }],
  creator: personal.name,
  keywords: ["software engineer", "web developer", "developer portfolio", "frontend", "backend", "DevOps", personal.name.split(' ')[0], personal.name.split(' ')[1]],
  openGraph: {
    title: `${personal.name} - ${personal.title}`,
    description: personal.summary,
    url: personal.website,
    siteName: `${personal.name} - Portfolio`,
    locale: 'en_US',
    type: 'website',
  },
  icons: {
    icon: [
      {
        url: '/favicon.svg',
        type: 'image/svg+xml',
      }
    ],
    apple: [
      {
        url: '/favicon.svg',
        type: 'image/svg+xml',
      }
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="mask-icon" href="/favicon.svg" color="#2563eb" />
      </head>
      <body className={`${inter.className} bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem={true}
          storageKey="theme"
          themes={['light', 'dark', 'system']}
          disableTransitionOnChange
        >
          <Navbar />
          <main className="pt-16">
            {children}
          </main>
          <GithubCorner />
        </ThemeProvider>
      </body>
    </html>
  );
}
