'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';
import SignupModal from './SignupModal';
import LoginModal from './LoginModal';
import NewPostModal from './NewPostModal';
import {ModalContextProps} from '../types';



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

  const showSignupModal = () => setSignupModalOpen(true);
  const showLoginModal = () => setLoginModalOpen(true);
  const showNewPostModal = () => setNewPostModalOpen(true);
  const closeModals = () => {
    setSignupModalOpen(false);
    setLoginModalOpen(false);
    setNewPostModalOpen(false);
  };

  return (
    <ModalContext.Provider value={{ showSignupModal, showLoginModal, showNewPostModal, closeModals }}>
      {children}
      <SignupModal show={isSignupModalOpen} onClose={closeModals} />
      <LoginModal show={isLoginModalOpen} onClose={closeModals} onLoginSuccess={closeModals} />
      <NewPostModal show={isNewPostModalOpen} onClose={closeModals} onNewPost={closeModals} />
    </ModalContext.Provider>
  );
};
