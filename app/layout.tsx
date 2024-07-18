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
          <main className="container mx-auto px-4 py-6 flex bg-custom-gray">
            {children}
          </main>
        </PostProvider>
      </body>
    </html>
  );
}
