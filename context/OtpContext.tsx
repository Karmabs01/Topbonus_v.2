'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import OtpModal from '@/components/Otp';

type OtpContextType = {
  isAuthorized: boolean;
  openModal: () => void;
  closeModal: () => void;
};

const OtpContext = createContext<OtpContextType | undefined>(undefined);

export const OtpProvider = ({ children }: { children: ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Пример проверки localStorage при монтировании
  useEffect(() => {
    const data = localStorage.getItem('authorized'); 
    if (data) {
      try {
        const { email, otpVerified } = JSON.parse(data);
        setIsAuthorized(Boolean(email && otpVerified));
      } catch {
        setIsAuthorized(false);
      }
    }
  }, []);

  // Глобальное делегирование кликов на ссылки
  useEffect(() => {
    if (!isAuthorized) {
      const handleGlobalLinkClick = (e: MouseEvent) => {
        // Ищем ближайший <a> в цепочке события
        const target = e.target as HTMLElement;
        const linkEl = target.closest('a');

        // Если клик действительно по ссылке (<a>),
        // и пользователь не авторизован
        if (linkEl && linkEl instanceof HTMLAnchorElement) {
          e.preventDefault();
          e.stopPropagation();
          // Открываем твою OTP-модалку
          openModal();
        }
      };

      // Добавляем слушатель кликов (capture=true, чтобы успеть перехватить до перехода)
      document.addEventListener('click', handleGlobalLinkClick, true);

      return () => {
        document.removeEventListener('click', handleGlobalLinkClick, true);
      };
    }
  }, [isAuthorized]);

  return (
    <OtpContext.Provider value={{ isAuthorized, openModal, closeModal }}>
      {children}

      {isModalOpen && (
        <div
          id="otp-modal-root"
          className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50"
        >
          <div className="bg-white p-4 rounded shadow-lg">
            <OtpModal onClose={closeModal} />
          </div>
        </div>
      )}
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
