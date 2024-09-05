import './globals.css';
import React, { ReactNode } from 'react';
import Head from 'next/head';
import Header from './components/Header';
import { PostProvider } from './contexts/PostContext';
import localFont from 'next/font/local';
import { ModalProvider } from "@/app/components/ModalProvider";
import { LayoutProvider, useLayoutContext } from '@/app/contexts/LayoutContext';
import LayoutContainer from "@/app/components/LayoutContainer";

const pretendard = localFont({
  src: '../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: "45 920",
  variable: "--font-pretendard",
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="kr" className={`${pretendard.variable}`}>
      <Head>
        <title>픽앤팝</title>
        <meta name="description" content="A simple forum application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className={pretendard.className}>
        <PostProvider>
          <LayoutProvider>
            <ModalProvider>
              <Header />
              <LayoutContainer>{children}</LayoutContainer>
            </ModalProvider>
          </LayoutProvider>
        </PostProvider>
      </body>
    </html>
  );
}