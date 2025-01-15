"use client";

import React, { useState, useEffect } from "react";
import { useOtp } from "@/context/OtpContext";
import Image from "next/image";
import logo from "@/public/images/logo.png";
import poster from "@/public/images/poster.png";
import design1 from "@/public/images/design1.png";
import dots_1 from "@/public/images/dots_1.png";
import circle1_1 from "@/public/images/circle1_1.png";
import menu_line from "@/public/images/menu_line.png";
import dots_header from "@/public/images/dots_header.png";

const TopBrands = () => {
  const { openModal } = useOtp();
  const [spinsLeft, setSpinsLeft] = useState<number>(3);
  const [totalWin, setTotalWin] = useState<number>(0);
  const [isSpinning, setIsSpinning] = useState<boolean>(false); // Новое состояние

  const maxSpinsPerDay = 3;
  const winAmountPerSpin = 50;
  const spinDuration = 10000; // Длительность прокрутки в миллисекундах (5 секунд)

  const resetDailyData = () => {
    const today = new Date().toISOString().split("T")[0];
    const lastResetDate = localStorage.getItem("lastResetDate");

    if (lastResetDate !== today) {
      localStorage.setItem("lastResetDate", today);
      localStorage.setItem("spinsLeft", maxSpinsPerDay.toString());
      localStorage.setItem("totalWin", "0");
      setSpinsLeft(maxSpinsPerDay);
      setTotalWin(0);
    } else {
      const savedSpins = parseInt(localStorage.getItem("spinsLeft") || "0", 10);
      const savedWin = parseInt(localStorage.getItem("totalWin") || "0", 10);
      setSpinsLeft(savedSpins);
      setTotalWin(savedWin);

      if (savedSpins === 0) {
        openModal();
      }
    }
  };

  useEffect(() => {
    resetDailyData();
  }, []);

  const handleSpin = () => {
    if (spinsLeft > 0 && !isSpinning) {
      setIsSpinning(true); // Блокируем кнопку

      const video = document.getElementById(
        "slotAnimation"
      ) as HTMLVideoElement;
      const sound = new Audio("/audio/cas2.mp3"); // Убедитесь, что путь к аудио верный

      const newSpinsLeft = spinsLeft - 1;
      setSpinsLeft(newSpinsLeft);
      localStorage.setItem("spinsLeft", newSpinsLeft.toString());

      // Запускаем видео
      if (video) {
        video.currentTime = 0;
        video.play();
      }

      // Воспроизводим звук
      sound.currentTime = 0;
      sound.play();

      // Останавливаем звук через 5 секунд
      setTimeout(() => {
        sound.pause();
      }, spinDuration);

      // Обновляем выигрыш с задержкой
      setTimeout(() => {
        const newTotalWin = totalWin + winAmountPerSpin;
        setTotalWin(newTotalWin);
        localStorage.setItem("totalWin", newTotalWin.toString());

        // Если прокруты закончились, показываем модалку
        if (newSpinsLeft === 0) {
          openModal();
        }

        setIsSpinning(false); // Разблокируем кнопку
      }, spinDuration);
    }
  };

  return (
    <div className="topbr-tw otp-ver-if">
      <header className="header">
        <Image className="header__light" src={circle1_1} alt="Light" />
        <div className="container">
          <div className="header__inner">
            <Image className="header__logo" src={logo} alt="Logo" />
            <nav className="header__nav">
              <a>Do you feel lucky today?</a>
            </nav>
          </div>
          <Image className="header__line" src={menu_line} alt="Menu Line" />
          <Image className="header__dots" src={dots_header} alt="Dots Header" />
        </div>
      </header>

      <div className="block1">
        <Image className="block1__underimg" src={design1} alt="Design" />
        <div className="container">
          <div className="block1__inner">
            <div className="block1__left">
              <video
                poster={poster.src}
                id="slotAnimation"
                width="100%"
                height="100%"
                preload="auto"
                playsInline
              >
                <source src="/video/slots.mp4" type="video/mp4" />
              </video>
              <button
                className="button"
                onClick={handleSpin}
                disabled={isSpinning} // Делаем кнопку неактивной
              >
                <div className="button__div">
                  <p className="button__text">
                    {spinsLeft > 0
                      ? isSpinning
                        ? "Spinning..."
                        : `Spin (${spinsLeft} left)`
                      : "No spins left"}
                  </p>
                </div>
              </button>
            </div>
            <div className="block1__right">
              <Image className="block1__dots" src={dots_1} alt="Dots" />
              <div className="block1__img">
                <p className="spins-left">Spins left: {spinsLeft}</p>
                <p className="total-win">Total Win: ${totalWin}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="footer">
        <div className="container">
          <div className="footer__inner">
            <Image className="footer__logo" src={logo} alt="Footer Logo" />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TopBrands;
