'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useModalContext } from '@/app/components/ModalProvider';

const Header: React.FC = () => {
  const router = useRouter();
  const { showSignupModal, showLoginModal, showNewPostModal } = useModalContext();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hideHeader, setHideHeader] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    let lastScrollTop = 0;

    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop > 320) {
        setHideHeader(true);
      } else {
        setHideHeader(false);
      }

      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    window.location.reload();
  };

  const handleLogoClick = () => {
    router.push('/');
  };

  return (
    <div
      className={`transform transition-transform duration-300 ease-out backdrop-blur-sm ${
        hideHeader ? '-translate-y-full lg:translate-y-0' : 'translate-y-0'
      } shadow-sm sticky top-0 z-[1] w-full bg-white/90 border-b-0`}
    >
      <div className="mx-auto px-4 w-auto max-w-full h-[52px] min-h-12 flex items-center justify-between relative lg:max-w-[95%]">
        <h1 className="text-2xl font-medium cursor-pointer" onClick={handleLogoClick}>
          픽앤팝
        </h1>
        <div className="space-x-4 flex items-center">
          <a href="#" className="text-gray-600 hover:text-gray-800">About</a>
          <a href="#" className="text-gray-600 hover:text-gray-800">Contact</a>
          <span className="mx-2 text-gray-300">|</span>
          <div className="flex flex-row">
            {isLoggedIn ? (
              <>
                <button onClick={showNewPostModal} className="ml-2 p-3 bg-white border border-orange-500 text-sm rounded-full font-normal text-center w-auto cursor-pointer leading-4 text-orange-500 hover:bg-orange-500 hover:text-white">
                  새 포스트
                </button>
                <button onClick={handleLogout} className="bg-orange-500 text-white ml-2 p-3 border border-orange-500 text-sm rounded-full font-normal text-center w-auto cursor-pointer leading-4 hover:text-orange-500 hover:bg-white">
                  로그아웃
                </button>
              </>
            ) : (
              <>
                <button onClick={showLoginModal} className="ml-2 p-3 bg-white border border-orange-500 text-sm rounded-full font-normal text-orange-500 text-center w-auto cursor-pointer leading-4 hover:bg-orange-500 hover:text-white">
                  로그인
                </button>
                <button onClick={showSignupModal} className="bg-orange-500 text-white ml-2 p-3 border border-orange-500 text-sm rounded-full font-normal text-center w-auto cursor-pointer leading-4 hover:text-orange-500 hover:bg-white">
                  회원가입
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
