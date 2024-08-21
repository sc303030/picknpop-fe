'use client';

import React, { useState, useEffect } from 'react';
import SignupModal from './SignupModal';
import LoginModal from './LoginModal';
import NewPostModal from './NewPostModal';
import { usePostContext } from '../contexts/PostContext';
import { Post } from '../types';
import { useRouter } from 'next/navigation';

const Header: React.FC = () => {
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { addPost } = usePostContext();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleOpenSignupModal = () => {
    setShowSignupModal(true);
  };

  const handleCloseSignupModal = () => {
    setShowSignupModal(false);
  };

  const handleOpenLoginModal = () => {
    setShowLoginModal(true);
  };

  const handleCloseLoginModal = () => {
    setShowLoginModal(false);
  };

  const handleOpenNewPostModal = () => {
    setShowNewPostModal(true);
  };

  const handleCloseNewPostModal = () => {
    setShowNewPostModal(false);
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    console.log('삭제')
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  const handleNewPost = (newPost: Post) => {
    addPost(newPost);
    setShowNewPostModal(false);
  };

  const handleLogoClick = () => {
    router.push('/');
  };

  return (
    <div className="transform transition-transform duration-300 ease-out translate-y-0 block shadow-sm sticky top-0 z-100 w-full bg-white/75 border-b-0">
      <div className="mx-auto px-4 w-auto max-w-custom h-[52px] min-h-12 flex items-center justify-between relative">
        <h1
            className="text-2xl font-medium cursor-pointer"
            onClick={handleLogoClick}
        >
          픽앤팝
        </h1>
        <div className="space-x-4 flex items-center">
          <a href="#" className="text-gray-600 hover:text-gray-800">About</a>
          <a href="#" className="text-gray-600 hover:text-gray-800">Contact</a>
          <span className="mx-2 text-gray-300">|</span>
          <div className="flex flex-row">
          {isLoggedIn ? (
              <>
                <button onClick={handleOpenNewPostModal}
                        className="ml-2 p-3 bg-white border border-orange-500 text-sm rounded-full font-normal text-center w-auto cursor-pointer leading-4 text-orange-500 hover:bg-orange-500 hover:text-white">새
                  포스트
                </button>
                <button onClick={handleLogout}
                        className="bg-orange-500 text-white ml-2 p-3 border border-orange-500 text-sm rounded-full font-normal text-center w-auto cursor-pointer leading-4 hover:text-orange-500 hover:bg-white">로그아웃
                </button>
              </>
          ) : (
              < >
                <button onClick={handleOpenLoginModal} className="ml-2 p-3 bg-white border border-orange-500 text-sm rounded-full font-normal text-orange-500 text-center w-auto cursor-pointer leading-4 hover:bg-orange-500 hover:text-white">로그인</button>
                <button onClick={handleOpenSignupModal}
                        className="bg-orange-500 text-white ml-2 p-3 border border-orange-500 text-sm rounded-full font-normal text-center w-auto cursor-pointer leading-4 hover:text-orange-500 hover:bg-white">회원가입
                </button>
              </>
          )}
        </div>
        </div>
      </div>
      <SignupModal show={showSignupModal} onClose={handleCloseSignupModal}/>
      <LoginModal show={showLoginModal} onClose={handleCloseLoginModal} onLoginSuccess={handleLoginSuccess} />
      <NewPostModal show={showNewPostModal} onClose={handleCloseNewPostModal} onNewPost={handleNewPost} />
    </div>
  );
};

export default Header;
