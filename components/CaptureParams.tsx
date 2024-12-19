// components/CaptureParams.tsx

'use client';

import { useEffect } from 'react';
import Cookies from 'js-cookie';

const CaptureParams = () => {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const paramsToCapture = ['AID', 'CLICKID'];

    paramsToCapture.forEach((param) => {
      const value = urlParams.get(param);
      if (value) {
        Cookies.set(param, value, { expires: 30 }); // Сохраняем на 30 дней
      }
    });
  }, []);

  return null; // Этот компонент не рендерит ничего на UI
};

export default CaptureParams;
