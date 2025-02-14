"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import heart from "@/public/newimages/hearts.gif";
import Link from "next/link";
import "./styled.component.css";
import { useTranslation } from "react-i18next";
import useSWR from "swr";
import { useLanguage } from "@/components/switcher/LanguageContext";
// Импорт функции получения брендов (убедиcь, что путь правильный)
import { getBrands } from "@/components/getBrands/getBrands2";

const Index = () => {
  const [showText, setShowText] = useState(false);
  const timerRef = useRef(null);
  const [newUrl, setNewUrl] = useState("");

  const { t } = useTranslation();
  const [brands, setBrands] = useState([]);
  const { language } = useLanguage();

  // Показываем модалку через 25 секунд (если ещё не показывалась сегодня)
  useEffect(() => {
    const modalShownDate2 = localStorage.getItem("modalShownDate2");
    const today = new Date().toISOString().split("T")[0];
    if (modalShownDate2 !== today) {
      timerRef.current = setTimeout(() => {
        setShowText(true);
        localStorage.setItem("modalShownDate2", today);
      }, 25000);
    }
    return () => clearTimeout(timerRef.current);
  }, []);

  const categoryBrands = { key1: "PremiumChoice", key2: "1" };
  const { data, error } = useSWR(
    ["brands", language],
    () => getBrands(language),
    { initialData: [] }
  );

  // Функция для перемешивания массива (алгоритм Фишера-Йетса)
  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  useEffect(() => {
    if (!data) return;

    // Фильтруем бренды по категории
    const filteredByCategory = data.filter(
      (brand) => brand[categoryBrands.key1] === categoryBrands.key2
    );

    const fetchUserBrands = async () => {
      try {
        // Перемешиваем отфильтрованные бренды и устанавливаем состояние
        const shuffledBrands = shuffleArray(filteredByCategory);
        setBrands(shuffledBrands);
      } catch (error) {
        console.error("Ошибка при обработке брендов:", error);
        setBrands(filteredByCategory);
      }
    };

    fetchUserBrands();
  }, [data, categoryBrands.key1, categoryBrands.key2]);

  const handleClick = (e) => {
    const today = new Date().toISOString().split("T")[0];
    const modalShownDate2 = localStorage.getItem("modalShownDate2");

    if (showText) {
      // Если модалка открыта, скрываем её по клику на блок
      e.preventDefault();
      setShowText(false);
    } else if (modalShownDate2 !== today) {
      // Если модалка ещё не показывалась сегодня – показываем её и отменяем переход
      e.preventDefault();
      setShowText(true);
      localStorage.setItem("modalShownDate2", today);
      clearTimeout(timerRef.current);
    }
    // Если модалка уже была показана/скрыта сегодня, клик проходит как обычный переход
  };

  // Берем только один случайный бренд (первый после перемешивания)
  const randomBrand = brands[0];

  useEffect(() => {
    // Пример обработки сообщения, если необходимо
    const handleMessage = (event) => {
      if (event.data && event.data.event === "spinComplete") {
        // Дополнительная логика
      }
    };

    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  useEffect(() => {
    const currentUrl = window.location.href;
    const indexOfQuestionMark = currentUrl.indexOf("?");
    const newUrl2 =
      indexOfQuestionMark !== -1
        ? currentUrl.substring(0, indexOfQuestionMark)
        : currentUrl;
    window.history.replaceState({}, document.title, newUrl2);

    const urlObj = new URL(currentUrl);
    const searchParams = new URLSearchParams(urlObj.search);
    searchParams.delete("brand");
    const currentKeyword = searchParams.get("keyword");

    const partners = [
      "partner1039",
      "partner1043",
      "partner1044",
      "CLD_VIP",
      "partner1045_b1",
      "partner1046",
      "partner1047",
    ];

    function setPartnerSource(keyword) {
      const partner = partners.find((p) => keyword && keyword.includes(p));
      if (partner) {
        localStorage.setItem("source", partner);
      } else {
        const sourceFound = localStorage.getItem("source");
        if (!partners.includes(sourceFound)) {
          localStorage.setItem("source", "0");
          searchParams.set("source", "0");
        }
      }
    }

    if (currentKeyword) {
      setPartnerSource(currentKeyword);
    }

    const savedUrl = localStorage.getItem("savedUrl");
    if (savedUrl) {
      setNewUrl(savedUrl);
    }
  }, [language]);

  return (
    <div className="animation-container">
      {randomBrand && (
        <Link
          target="_blank"
          href={`${randomBrand.GoBig}/${newUrl}&creative_id=Modal_Heart`}
          onClick={handleClick}
        >
          {showText && (
            <div className="animated-text">
              <p>
                {t("Get")} <span>{t("St.Valentine’s")}</span> {t("Bonus")}
              </p>
              <Link
                target="_blank"
                className="tapme"
                href={`${randomBrand.GoBig}/${newUrl}&creative_id=Modal_Heart`}
                onClick={(e) => e.stopPropagation()} // Останавливаем всплытие, чтобы outer Link не срабатывал
              >
                {t("Tap Me")}
              </Link>
            </div>
          )}
          <div className="heart">
            <Image src={heart} alt="heart" />
          </div>
        </Link>
      )}
    </div>
  );
};

export default Index;
