import './globals.css';
import React, { ReactNode } from 'react';
import Head from 'next/head';
import Header from './components/Header';
import { PostProvider } from './contexts/PostContext';
import localFont from 'next/font/local';
import { ModalProvider } from "@/app/components/ModalProvider";
import { LayoutProvider, useLayoutContext } from '@/app/contexts/LayoutContext';
import LayoutContainer from "@/app/components/LayoutContainer";
import {Schoolbell} from "next/font/google";
import {Metadata} from "next";

const pretendard = localFont({
  src: '../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: "45 920",
  variable: "--font-pretendard",
});

const schoolbell = Schoolbell({
  weight: '400',
  subsets: ['latin'],
  variable: "--schoolbell",
});

const cls = (...classnames: string[]) => {
  return classnames.join(" ");
};

export const metadata: Metadata = {
	title: "picknpop",
    description: "농구 전문 소셜 네트워크 픽앤팝",
	icons: {
		icon: "/favicon.ico",
	},
};
export default function RootLayout({ children }: { children: ReactNode }) {

  return (
    <html lang="kr" className={`${pretendard.variable}`}>
      <Head>
        <title>픽앤팝</title>
        <meta name="description" content="picknpop" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </Head>
      <body className={cls(pretendard.className, schoolbell.variable)}>
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