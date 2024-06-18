import './globals.css';
import type { ReactNode } from 'react';
import Head from 'next/head';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <Head>
        <title>Forum</title>
        <meta name="description" content="A simple forum application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <header className="bg-white shadow">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold">픽앤팝</h1>
            <nav className="space-x-4">
              <a href="#" className="text-gray-600 hover:text-gray-800">About</a>
              <a href="#" className="text-gray-600 hover:text-gray-800">Contact</a>
              <a href="#" className="text-orange-500 hover:text-orange-700">로그인</a>
              <a href="#" className="bg-orange-500 text-white px-3 py-2 rounded hover:bg-orange-700">회원가입</a>
            </nav>
          </div>
        </header>
        <main className="container mx-auto px-4 py-6 flex">
          {children}
        </main>
      </body>
    </html>
  );
}
