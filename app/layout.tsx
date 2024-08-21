import './globals.css';
import type { ReactNode } from 'react';
import Head from 'next/head';
import Header from './components/Header';
import { PostProvider } from './contexts/PostContext';
import localFont from 'next/font/local'
import TeamSidebar from "@/app/components/TeamSidebar";
import Sidebar from "@/app/components/Sidebar";

const pretendard = localFont({
  src: '../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: "45 920",
  variable: "--font-pretendard",
})
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
      <html lang="kr" className={`${pretendard.variable}`}>
      <Head>
          <title>픽앤팝</title>
          <meta name="description" content="A simple forum application"/>
          <link rel="icon" href="/favicon.ico"/>
      </Head>
      <body className={pretendard.className}>
          <PostProvider>
              <Header/>
              <div className="max-w-custom m-auto px-4 py-2 grid grid-cols-1 gap-x-16 z-[-1] relative lg:grid-cols-container lg:row-start-auto">
                  <div className="hidden lg:block lg:w-[190px] 1160:w-full">
                      <TeamSidebar/>
                  </div>
                  <div className="py-4 min-w-0 lg:row-start-auto row-start-2">
                      {children}
                  </div>
                  <div className="lg:w-full lg:row-start-auto row-start-1">
                      <Sidebar/>
                  </div>
              </div>
          </PostProvider>
      </body>
      </html>
  );
}
