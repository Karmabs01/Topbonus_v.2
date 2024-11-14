"use client";
import React from "react";
import { useTranslation } from "react-i18next";
import Image from "next/image";
// import Img from "@/public/allpaymentsrobot.png";
import Img from "@/public/newimages/wheel_inner_pages.png";

import "@/app/filteredComponents.css"

const Bonuses2 = () => {
  const { t } = useTranslation();

  return (
    <div className="pt-16 text-in-mobile">
      <div className="main__container flex justify-between items-center inner-top-block inner-top-block3 h-full relative">
        <div className="flex flex-col lg:basis-[60%] inner-text-block ">
          <h1 className="text-white">{t("Unlock the Best Casino Bonuses of 2024!")}</h1>
          <p className="text-white mt-5">{t("Pssst… Guess what? It’s me, the gift box, ready to reveal the best bonuses just for you! Unwrap bonuses, from welcome offers to loyalty rewards, and everything in between.")}</p>
          {/* <Subscribe /> */}
        </div>

      </div>
    </div>
  );
};

export default Bonuses2;
