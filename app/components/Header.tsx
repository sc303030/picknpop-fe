'use client'; // 클라이언트 컴포넌트로 설정

import React, { useState, useEffect } from 'react';
import SignupModal from './SignupModal';
import LoginModal from './LoginModal';
import NewPostModal from './NewPostModal';

const Header: React.FC = () => {
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // 컴포넌트가 마운트될 때 로컬 스토리지에서 토큰을 확인합니다.
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
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">픽앤팝</h1>
        <nav className="space-x-4 flex items-center">
          <a href="#" className="text-gray-600 hover:text-gray-800">About</a>
          <a href="#" className="text-gray-600 hover:text-gray-800">Contact</a>
          <span className="mx-2 text-gray-300">|</span>
          {isLoggedIn ? (
            <>
              <button onClick={handleOpenNewPostModal} className="text-orange-500 border border-orange-500 rounded-full px-3 py-2 hover:bg-orange-500 hover:text-white">새 포스트</button>
              <button onClick={handleLogout} className="bg-orange-500 text-white px-3 py-2 rounded-full hover:bg-orange-700">로그아웃</button>
            </>
          ) : (
            <>
              <button onClick={handleOpenLoginModal} className="text-orange-500 hover:text-orange-700">로그인</button>
              <button onClick={handleOpenSignupModal} className="bg-orange-500 text-white px-3 py-2 rounded-full hover:bg-orange-700">회원가입</button>
            </>
          )}
        </nav>
      </div>
      <SignupModal show={showSignupModal} onClose={handleCloseSignupModal} />
      <LoginModal show={showLoginModal} onClose={handleCloseLoginModal} onLoginSuccess={handleLoginSuccess} />
      <NewPostModal show={showNewPostModal} onClose={handleCloseNewPostModal} />
    </header>
  );
};

export default Header;
