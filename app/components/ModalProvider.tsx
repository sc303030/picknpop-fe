'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import SignupModal from './SignupModal';
import LoginModal from './LoginModal';
import NewPostModal from './NewPostModal';
import DeletePostModal from './DeletePostModal';
import { ModalContextProps, Post } from '../types';

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModalContext must be used within a ModalProvider');
  }
  return context;
};

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isSignupModalOpen, setSignupModalOpen] = useState(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isNewPostModalOpen, setNewPostModalOpen] = useState(false);
  const [isDeletePostModalOpen, setDeletePostModalOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState<Post | null>(null); // null 허용

  const showSignupModal = () => setSignupModalOpen(true);
  const showLoginModal = () => setLoginModalOpen(true);

  // post를 선택적으로 받도록 수정
  const showNewPostModal = (post?: Post) => {
    setCurrentPost(post || null);
    setNewPostModalOpen(true);
  };

  const showDeletePostModal = (post?: Post) => {
    setCurrentPost(post || null);
    setDeletePostModalOpen(true);
  };

  const closeModals = () => {
    setSignupModalOpen(false);
    setLoginModalOpen(false);
    setNewPostModalOpen(false);
    setDeletePostModalOpen(false);
    setCurrentPost(null);
  };

  return (
    <ModalContext.Provider value={{ showSignupModal, showLoginModal, showNewPostModal, showDeletePostModal, closeModals }}>
      {children}
      <SignupModal show={isSignupModalOpen} onClose={closeModals} />
      <LoginModal show={isLoginModalOpen} onClose={closeModals} onLoginSuccess={closeModals} />
      <NewPostModal
        show={isNewPostModalOpen}
        onClose={closeModals}
        onNewPost={closeModals}
        post={currentPost}
        isEdit={!!currentPost}
      />
      <DeletePostModal show={isDeletePostModalOpen} onClose={closeModals} post={currentPost} />
    </ModalContext.Provider>
  );
};
