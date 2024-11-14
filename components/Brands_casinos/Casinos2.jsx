"use client";
import React from "react";
import { useTranslation } from "react-i18next";
import Image from "next/image";
// import Img from "@/public/allpaymentsrobot.png";
import Img from "@/public/newimages/wheel_inner_pages.png";

import "@/app/filteredComponents.css"

const Casinos2 = () => {
  const { t } = useTranslation();

  return (
    <div className="pt-16 text-in-mobile">
      <div className="main__container flex justify-between items-center inner-top-block inner-top-block2 h-full relative">
        <div className="flex flex-col lg:basis-[60%] inner-text-block ">
          <h1 className="text-white">{t("Spin Your Way to Top Casino Picks 2024")}</h1>
          <p className="text-white mt-5">{t("Hey there, slot enthusiast! It’s me, your favorite slot machine, here to guide you through the most thrilling casino floors of 2024. I’ll show you a fresh collection of online casinos that have just hit the jackpot in terms of excitement, games, and offers.")}</p>
          {/* <Subscribe /> */}
        </div>

      </div>
    </div>
  );
};

export default Casinos2;
