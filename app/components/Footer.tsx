import React from 'react';
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="py-4">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} picknpop. All rights reserved.
        </p>
        <p className="text-sm mt-2">
          문의: <a href="mailto:picknpop4@gmail.com" className="underline text-blue-400">picknpop4@gmail.com</a>
        </p>
        <p className="text-sm mt-2">
          <Link href="/terms-of-service" className="cursor-pointer underline mr-1" target="_blank" rel="noopener noreferrer">이용약관 동의</Link> |{' '}
          <Link href="/privacy-policy" className="cursor-pointer underline mr-1" target="_blank" rel="noopener noreferrer">개인정보처리방침</Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
