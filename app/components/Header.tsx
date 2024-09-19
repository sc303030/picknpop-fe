'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useModalContext } from '@/app/components/ModalProvider';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserLarge } from "@fortawesome/free-solid-svg-icons/faUserLarge";
import { faBell, faPen } from "@fortawesome/free-solid-svg-icons";
import { getCookie, deleteCookie } from "@/app/utils/token";
import {faPenToSquare} from "@fortawesome/free-regular-svg-icons";

const Header: React.FC = () => {
  const router = useRouter();
  const { showSignupModal, showLoginModal, showNewPostModal } = useModalContext();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hideHeader, setHideHeader] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const token = getCookie('token');
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    deleteCookie('token');
    setIsLoggedIn(false);
    window.location.reload();
  };

  const handleLogoClick = () => {
    window.location.href = '/';
  };

  const ProfileClick = () => {
    toggleMenu();
    router.push(`/profile`);
  };

  return (
    <>
      <nav className={`transform transition-transform duration-300 ease-out backdrop-blur-sm ${hideHeader ? '-translate-y-full lg:translate-y-0' : 'translate-y-0'} shadow-sm sticky top-0 z-[1] w-full bg-white/90 border-b-0`}>
        <div className="mx-auto px-4 w-auto max-w-full h-[52px] min-h-12 lg:max-w-custom">
          <div className="relative flex h-full items-center justify-between">
            <div className="flex flex-1 items-center sm:items-stretch">
              <div className="flex flex-shrink-0 items-center pl-1">
                <div className="text-2xl font-medium cursor-pointer" onClick={handleLogoClick}>픽앤팝</div>
              </div>
            </div>
            {isLoggedIn ? (
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

                <button
                  onClick={() => showNewPostModal()}
                  className="hidden sm:flex mr-1.5 p-1 bg-white border border-orange-600 text-sm rounded-full font-normal text-center w-auto cursor-pointer leading-4 text-orange-600 hover:bg-orange-600 hover:text-white"
                >
                  <div className="flex flex-row mr-1">
                    <div className="mr-2 bg-orange-600 rounded-full w-7 h-7 flex">
                      <FontAwesomeIcon icon={faPen} style={{ color: 'white' }} className="m-auto"/>
                    </div>
                    <span className="m-auto">새 포스트</span>
                  </div>
                </button>
                <div className="relative" ref={menuRef}>
                  <div>
                    <button
                      type="button"
                      className="h-8 w-8 relative flex justify-center items-center"
                      id="user-menu-button"
                      aria-expanded={isOpen}
                      aria-haspopup="true"
                      onClick={toggleMenu}
                    >
                      <FontAwesomeIcon icon={faUserLarge} className="h-6 w-6 text-orange-600 focus:text-gray-500 hover:text-gray-500"/>
                    </button>
                  </div>

                  {isOpen && (
                    <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none transition ease-out duration-100 transform opacity-100 scale-100" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex={-1}>
                      <button
                        onClick={() => ProfileClick()}
                        className="block px-4 py-2 text-sm text-gray-700 w-full text-start hover:bg-gray-100"
                      >
                        프로필
                      </button>
                      <button
                        onClick={handleLogout}
                        className="block px-4 py-2 text-sm text-gray-700 w-full text-start hover:bg-gray-100"
                      >
                        로그아웃
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <>
                <button onClick={showLoginModal} className="ml-2 p-3 bg-white border border-orange-600 text-sm rounded-full font-normal text-orange-600 text-center w-auto cursor-pointer leading-4 hover:bg-orange-600 hover:text-white">
                  로그인
                </button>
                <button onClick={showSignupModal} className="bg-orange-600 text-white ml-2 p-3 border border-orange-600 text-sm rounded-full font-normal text-center w-auto cursor-pointer leading-4 hover:text-orange-600 hover:bg-white">
                  회원가입
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      {isLoggedIn && (
        <div className="z-10 fixed bottom-6 right-6 sm:hidden">
          <button
            onClick={() => showNewPostModal()}
            className="cursor-pointer p-3 w-12 h-12 bg-orange-600 text-white rounded-full shadow-lg hover:bg-orange-500 transition ease-in-out duration-300"
          >
            <FontAwesomeIcon icon={faPenToSquare} style={{ color: 'white' }} />
          </button>
        </div>
      )}
    </>
  );
};

export default Header;
