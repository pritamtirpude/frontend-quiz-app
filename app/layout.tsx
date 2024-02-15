import React from 'react';
import type { Metadata } from 'next';
import { Rubik } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/context/ThemeProvider';
import Theme from '@/components/Theme/Theme';

const rubik = Rubik({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-rubik',
});

export const metadata: Metadata = {
  title:
    'Frontend Quiz App - Boost Your Web Development Skills with Interactive Quizzes',
  description:
    'Supercharge your frontend development expertise with our SEO-optimized Frontend Quiz App! Immerse yourself in a dynamic learning experience that covers HTML, CSS, JavaScript, and popular frameworks like React, Angular, and Vue.js. Track your progress, tackle real-world scenarios, and engage with a vibrant community of learners. Our app	&apos;s responsive design ensures a seamless experience across devices. Stay ahead of the curve with regularly updated content. Elevate your web development journey today!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${rubik.variable}  bg-light-800 bg-mobile-light-pattern bg-cover  bg-center bg-no-repeat px-6 dark:bg-dark-700  dark:bg-mobile-dark-pattern md:bg-tablet-light-pattern md:px-16 md:dark:bg-tablet-dark-pattern lg:bg-desktop-light-pattern lg:px-0 lg:dark:bg-desktop-dark-pattern`}
      >
        <main className="mx-auto mt-6 flex min-h-screen max-w-6xl flex-col md:items-center md:justify-center lg:items-center lg:justify-center">
          <ThemeProvider attribute="class" disableTransitionOnChange>
            <Theme />
            {children}
          </ThemeProvider>
        </main>
      </body>
    </html>
  );
}
