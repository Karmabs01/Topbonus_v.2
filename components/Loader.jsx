// Loader.jsx
import React from "react";
import slot from "@/public/newimages/slot.gif";
import Image from "next/image";
import { useTranslation } from "react-i18next";

const Loader = () => {
  const { t } = useTranslation();

  return (
    <div className="loader loaderslot">
      <div className="loader-inner flex flex-col items-center justify-center">
        {/* <div className="loader-line-wrap">
        <div className="loader-line"></div>
      </div>
      <div className="loader-line-wrap">
        <div className="loader-line"></div>
      </div>
      <div className="loader-line-wrap">
        <div className="loader-line"></div>
      </div>
      <div className="loader-line-wrap">
        <div className="loader-line"></div>
      </div>
      <div className="loader-line-wrap">
        <div className="loader-line"></div>
      </div> */}
        <Image src={slot} alt="slot" width={120} height={120} />
        <p className="text-white text-center mt-2 flex">
          {t("Your bonuses are on the way, one moment..")}
        </p>
        {/* <div class="dot-spinner">
          <div class="dot-spinner__dot"></div>
          <div class="dot-spinner__dot"></div>
          <div class="dot-spinner__dot"></div>
          <div class="dot-spinner__dot"></div>
          <div class="dot-spinner__dot"></div>
          <div class="dot-spinner__dot"></div>
          <div class="dot-spinner__dot"></div>
          <div class="dot-spinner__dot"></div>
        </div> */}
      </div>
    </div>
  );
};

export default Loader;
