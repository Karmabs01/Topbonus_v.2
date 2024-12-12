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

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      console.log('Clicked element:', target);

      const otpLink = target.closest('.otp-ver-if');

      if (otpLink) {
        // Проверяем наличие класса 'welldone' у элемента или его предков
        const hasWelldone = otpLink.classList.contains('welldone');

        if (hasWelldone) {
          console.log('Element has welldone class, ignoring OTP logic.');
          return; // Игнорируем элементы с классом 'welldone'
        }

        if (!isAuthorized) {
          console.log('User not authorized, opening modal');
          e.preventDefault(); // Отменяем переход или стандартное действие
          e.stopPropagation(); // Останавливаем дальнейшую обработку события
          openModal(); // Открываем OTP модалку
        } else {
          console.log('User authorized, allowing navigation');
          // Не предотвращаем стандартное поведение, позволяя ссылке перейти
        }
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [isAuthorized, router]); // Обновляем обработчик, если изменится состояние isAuthorized

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
