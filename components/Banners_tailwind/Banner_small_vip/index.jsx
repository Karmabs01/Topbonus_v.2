"use client";
import banner from "@/public/newimages/minibanner.png";
import Image from "next/image";
import "./styled.component.css";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

import Brands_carousel from "../Brands_carousel";

export default function Banner_small() {
  const categoryBrands = { key1: "Video", key2: "VIP" };
  const { t } = useTranslation();
  const creative = "VIP_program"

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const id = hash.substring(1); // Убираем первый символ "#" из строки
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);

  return (
    <>
     <div>
      <div id="vip" className="main__container">
        <div className="">
          <div className="flex px-2 py-2.5 sm:px-3.5 rounded-md mt-10 flex-col new-brands flex-col items-start b-vip">
            <h2 className="text-3xl font-bold tracking-tight text-white random-title text-start">
            {t("Best VIP Programs")}
            </h2>
            <p className="text-white p-vip">{t("These top casinos offer VIP programs packed with exclusive perks, from personalized bonuses to special rewards and dedicated support.")}</p>
          </div>
        </div>
      </div>
    </div>
      <Brands_carousel categoryBrands={categoryBrands} creative={creative} />
    </>
  );
}