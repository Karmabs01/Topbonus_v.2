"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";

import Image from "next/image";
import img from "@/public/bannerhell.png";
import newimg from "@/public/newimages/coins.png";


export default function Banner_small() {
  const [newUrl, setNewUrl] = useState("");
  const [brands, setBrands] = useState([]);
  const [source, setSource] = useState("");
  const [redirectUrl, setRedirectUrl] = useState("");
  const [timeLeft, setTimeLeft] = useState(""); // Для таймера

  const { t } = useTranslation();

  // Функция для расчёта оставшегося времени до полуночи (00:00 по СЕТ)
  const calculateTimeLeft = () => {
    const now = new Date();
    const nowInCET = new Date(now.toLocaleString("en-US", { timeZone: "CET" }));
    const midnight = new Date(
      nowInCET.getFullYear(),
      nowInCET.getMonth(),
      nowInCET.getDate() + 1, // Следующий день, 00:00
      0,
      0,
      0
    );
    const difference = midnight.getTime() - nowInCET.getTime();

    if (difference > 0) {
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      return `${hours}h ${minutes}m ${seconds}s`;
    } else {
      return "00h 00m 00s";
    }
  };

  useEffect(() => {
    let url = "";
    switch (source) {
      case "partner1039":
        url = "https://link.bo-nus.com/partner_aurnd";
        break;
      case "partner1043":
        url = "https://info.topbon.us/rnd1043";
        break;
      case "partner1044":
        url = "https://link.gobig.finance/rnd1044";
        break;
      case "CLD_VIP":
        url = "https://link.bo-nus.com/rnd_cld";
        break;
      case "partner1045_b1":
        url = "https://link.gobig.finance/rnd1045";
        break;
      case "partner1046":
        url = "https://link.bo-nus.com/rnd_cld";
        break;
      default:
        url = "https://info.topbon.us/aurnd";
    }
    setRedirectUrl(url);
    const savedUrl = localStorage.getItem("savedUrl");
    if (savedUrl) {
      setNewUrl(savedUrl);
    }

    // Обновляем таймер каждую секунду
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer); // Чистим таймер при размонтировании
  }, [source]);

  

  return (
    <>
      <div className="emojis">
        <div className="main__container">
          <div className="flex flex-col face-mob">
            <h3 className="text-lg leading-6 ">
              {t("Unveil today’s fright and")}
              <span> {t("feel the chill of fortune!")}</span>
            </h3>
            <div className="timer2 text-lg mt-4 flex flex-col">
              <p>{t("Ends In")}:</p> <span>{timeLeft}</span>
            </div>
            <div className="mob-none">
              <Image src={img} alt={img} width={400} height={150} />
            </div>
          </div>
          {/* Добавляем таймер */}
        </div>
      </div>
      <div className="coins mt-3">
        <Image src={newimg} alt={newimg} width={783} height={150} />
      </div>
    </>
  );
}
