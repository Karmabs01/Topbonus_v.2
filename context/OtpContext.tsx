'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import OtpModal from '@/components/Otp';

type OtpContextType = {
  openModal: () => void;
  closeModal: () => void;
  isModalOpen: boolean; // Добавляем доступ к текущему состоянию модального окна
};

const OtpContext = createContext<OtpContextType | undefined>(undefined);

export const OtpProvider = ({ children }: { children: ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const checkAuthorization = () => {
    const authString = localStorage.getItem('authorized');
    if (authString) {
      try {
        const auth = JSON.parse(authString);
        const authorized = auth.email && auth.otpVerified === true;
        setIsAuthorized(authorized);
      } catch (error) {
        console.error('Error parsing authorized from localStorage:', error);
        setIsAuthorized(false);
      }
    } else {
      setIsAuthorized(false);
    }
  };

  useEffect(() => {
    checkAuthorization();

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'authorized') {
        checkAuthorization();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <OtpContext.Provider value={{ openModal, closeModal, isModalOpen }}>
      {children}
      {isModalOpen && <OtpModal onClose={closeModal} />}
    </OtpContext.Provider>
  );
};

export const useOtp = () => {
  const context = useContext(OtpContext);
  if (!context) {
    throw new Error('useOtp must be used within an OtpProvider');
  }
  return context;
};
