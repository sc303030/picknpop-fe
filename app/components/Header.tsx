'use client'; // 클라이언트 컴포넌트로 설정

import React, { useState } from 'react';
import SignupModal from './SignupModal';

const Header: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">픽앤팝</h1>
        <nav className="space-x-4">
          <a href="#" className="text-gray-600 hover:text-gray-800">About</a>
          <a href="#" className="text-gray-600 hover:text-gray-800">Contact</a>
          <a href="#" className="text-orange-500 hover:text-orange-700">로그인</a>
          <button onClick={handleOpenModal} className="bg-orange-500 text-white px-3 py-2 rounded hover:bg-orange-700">회원가입</button>
        </nav>
      </div>
      <SignupModal show={showModal} onClose={handleCloseModal} />
    </header>
  );
};

export default Header;
