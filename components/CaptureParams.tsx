// components/CaptureParams.tsx

'use client';

import { useEffect } from 'react';
import Cookies from 'js-cookie';

const CaptureParams = () => {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);

    // Вместо ограниченного списка параметров, просто итерируемся по всем параметрам
    urlParams.forEach((value, key) => {
      if (value) {
        // Сохраняем каждый параметр в cookie с таким же именем, что и ключ параметра
        Cookies.set(key, value, { expires: 30 });
      }
    });
  }, []);

  return null; // Компонент не отрисовывает UI
};

export default CaptureParams;
