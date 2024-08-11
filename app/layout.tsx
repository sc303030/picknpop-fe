import './globals.css';
import type { ReactNode } from 'react';
import Head from 'next/head';
import Header from './components/Header';
import { PostProvider } from './contexts/PostContext';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <Head>
        <title>Forum</title>
        <meta name="description" content="A simple forum application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <PostProvider>
          <Header />
          <div className="max-w-custom m-auto px-4 py-2 grid grid-cols-1 gap-16 lg:grid-cols-container">
            {children}
          </div>
        </PostProvider>
      </body>
    </html>
  );
}
