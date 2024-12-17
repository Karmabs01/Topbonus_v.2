"use client";
import React, { useEffect, useState } from "react";
import UserBrands from "@/components/Brands_home/UserBrands";
import "./styled.component.css";
import { useTranslation } from "react-i18next";
import Brands_carousel from "../Brands_carousel";


export default function Next_event_banner() {


  const categoryBrands = { key1: "Networks", key2: "1" };
  const { t } = useTranslation();
   const creative = "Uncover_latest"

  return (
    <>
      <div id="uncover" className="main__container !mt-24">
        <div className="">
          <div className="flex flex-col items-center justify-center gap-x-6 banner-event px-6 py-2.5 sm:px-3.5">
            <h3 className="text-xl sm:text-xl leading-6 text-white uppercase">
              {t("Explore Exclusive Games")}
            </h3>
            <p className="banner-event-p">{t("Dive into thrilling adventures and claim top rewards!")}</p>
          </div>
        </div>
      </div>
      {/* <UserBrands /> */}
      <Brands_carousel categoryBrands={categoryBrands} creative={creative} />
    </>
  );
}
