"use client";
import React from "react";
import { useTranslation } from "react-i18next";

const Marquee = () => {
  const { t } = useTranslation();

  const handleClick = () => {
    const targetElement = document.getElementById("real-block");
    if (targetElement) {
      const headerOffset = 50; 
      const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="wrap-line-text">
      <div className="marquee-container">
        <div className="marquee">
          <span onClick={handleClick}>
            {t("* Explore the Hottest New Brands –")} <b>{t("Click Here!")}</b>{" "}
            {t("* Explore the Hottest New Brands –")} <b>{t("Click Here!")}</b>{" "}
            {t("* Explore the Hottest New Brands –")} <b>{t("Click Here!")}</b>{" "}
            {t("* Explore the Hottest New Brands –")} <b>{t("Click Here!")}</b>{" "}
          </span>
          {/* Дублируем контент для непрерывного эффекта прокрутки */}
          <span onClick={handleClick}>
            {t("* Explore the Hottest New Brands –")} <b>{t("Click Here!")}</b>{" "}
            {t("* Explore the Hottest New Brands –")} <b>{t("Click Here!")}</b>{" "}
            {t("* Explore the Hottest New Brands –")} <b>{t("Click Here!")}</b>{" "}
            {t("* Explore the Hottest New Brands –")} <b>{t("Click Here!")}</b>{" "}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Marquee;
