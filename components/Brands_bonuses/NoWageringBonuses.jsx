"use client";
import React from "react";
import { useTranslation } from "react-i18next";
import Image from "next/image";
// import Img from "@/public/nowager.png";
import Img from "@/public/newimages/wheel_inner_pages.png";

import "@/app/filteredComponents.css"


const NoWageringBonuses = () => {
  const { t } = useTranslation();

  return (
    <div className="pt-16">
    <div className="main__container flex justify-between items-center inner-top-block h-full relative">
      <div className="flex flex-col lg:basis-[60%] inner-text-block ">
        <h1 className="text-white">{t("No Wagering Casino Bonuses 2024")}</h1>
          <p className="text-white mt-5">{t("Searching for no wagering bonuses? Explore our exclusive compilation of wager-free bonuses, available only at Casino.")}</p>
          {/* <Subscribe /> */}
        </div>
        <div >
          <Image src={Img} alt="Chip" width={450} loading="lazy" className="absolute bottom-0 right-0 inner-image -z-10 opacity-30 lg:opacity-100" />
        </div>
      </div>
    </div>
  );
};

export default NoWageringBonuses;
