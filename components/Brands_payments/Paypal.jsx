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
    <div className="pt-16">
      <div className="main__container flex justify-between items-center inner-top-block h-full relative">
        <div className="flex flex-col lg:basis-[60%] inner-text-block ">
          <h1 className="text-white">{t("Leading Online Casinos Accepting PayPal Payments in 2024")}</h1>
          <p className="text-white mt-5">{t("Check out our comprehensive list of top-rated casinos that accept PayPal—a quick and secure option for both deposits and withdrawals. This payment method is a popular choice among global online players, offering advantages like bypassing traditional banking constraints and geographical limitations. If you don&'t already have a PayPal account, it's simple to set one up and start your journey to big wins!")}</p>
          {/* <Subscribe /> */}
        </div>
        <div >
          <Image src={Img} alt="Chip" width={450} loading="lazy" className="absolute bottom-0 right-0 inner-image -z-10 opacity-30 lg:opacity-100" />
        </div>
      </div>
    </div>
  );
};

export default Payments;
