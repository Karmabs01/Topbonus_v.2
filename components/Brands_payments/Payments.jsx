"use client";
import React from "react";
import { useTranslation } from "react-i18next";
import Image from "next/image";
// import Img from "@/public/allpaymentsrobot.png";
import Img from "@/public/newimages/wheel_inner_pages.png";

import "@/app/filteredComponents.css"

const Payments = () => {
  const { t } = useTranslation();

  return (
    <div className="pt-16 text-in-mobile">
      <div className="main__container flex justify-between items-center inner-top-block inner-top-block5 h-full relative">
        <div className="flex flex-col lg:basis-[60%] inner-text-block ">
          <h1 className="text-white">{t("Find Your Best Payment Picks for 2024")}</h1>
          <p className="text-white mt-5">{t("Woof! I’m Dogecoin, your trusty guide through the top casino payment methods of 2024. Sniffing out the fastest, most reliable options, from crypto coins to classic cards, I’ve got the scoop on secure payments that work seamlessly. Let’s dig in!")}</p>
          {/* <Subscribe /> */}
        </div>

      </div>
    </div>
  );
};

export default Payments;
