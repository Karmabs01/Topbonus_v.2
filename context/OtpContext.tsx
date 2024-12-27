'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Используем next/navigation вместо next/router
import OtpModal from '@/components/Otp';

type OtpContextType = {
  openModal: () => void;
  closeModal: () => void;
};

const OtpContext = createContext<OtpContextType | undefined>(undefined);

export const OtpProvider = ({ children }: { children: ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const router = useRouter();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Функция для проверки статуса авторизации из localStorage
  const checkAuthorization = () => {
    const authString = localStorage.getItem('authorized');
    console.log('Check Authorization:', authString);
    if (authString) {
      try {
        const auth = JSON.parse(authString);
        // Предположим, что пользователь авторизован, если есть email и otpVerified === true
        const authorized = auth.email && auth.otpVerified === true;
        setIsAuthorized(authorized);
        console.log('Authorization status:', authorized);
      } catch (error) {
        console.error('Error parsing authorized from localStorage:', error);
        setIsAuthorized(false);
      }
    } else {
      setIsAuthorized(false);
      console.log('No authorized data in localStorage.');
    }
  };

  useEffect(() => {
    // Проверяем статус авторизации при монтировании компонента
    checkAuthorization();

    // Слушаем изменения в localStorage
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'authorized') {
        console.log('Storage event detected:', event);
        checkAuthorization();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Новый useEffect для открытия модалки через 7 секунд после загрузки
  useEffect(() => {
    // Устанавливаем таймер на 7 секунд
    const timer = setTimeout(() => {
      if (!isAuthorized) {
        console.log('User not authorized, opening modal after 7 seconds');
        openModal();
      } else {
        console.log('User already authorized, modal will not open');
      }
    }, 7000); // 7000 миллисекунд = 7 секунд

    // Очищаем таймер при размонтировании компонента
    return () => clearTimeout(timer);
  }, [isAuthorized]);

  return (
    <OtpContext.Provider value={{ openModal, closeModal }}>
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
