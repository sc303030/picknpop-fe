import React from 'react';

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
      </div>
    </footer>
  );
};

export default Footer;
