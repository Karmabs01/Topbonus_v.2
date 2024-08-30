'use client';

import { useEffect, useState } from 'react';

export default function MainWrapper({ children }: { children: React.ReactNode }) {
  const [languageClass, setLanguageClass] = useState(() => {
    // Инициализация состояния при первой загрузке
    return typeof window !== 'undefined' ? localStorage.getItem('i18nextLng') || '' : '';
  });

  useEffect(() => {
    // Проверка на наличие изменений в localStorage каждые 500 мс
    const intervalId = setInterval(() => {
      const storedLanguage = localStorage.getItem('i18nextLng');
      if (storedLanguage !== languageClass) {
        setLanguageClass(storedLanguage || '');
      }
    }, 500); // Проверяем каждые полсекунды

    // Очистка интервала при размонтировании компонента
    return () => {
      clearInterval(intervalId);
    };
  }, [languageClass]);

  return <main className={languageClass}>{children}</main>;
}
