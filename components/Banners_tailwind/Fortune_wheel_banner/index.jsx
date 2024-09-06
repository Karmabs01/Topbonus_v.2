"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import "./styled.component.css";
import Brands_carousel from "@/components/Banners_tailwind/Brands_carousel";
import { useEffect, useRef } from "react";

export default function Banner_small() {
  const { t } = useTranslation();
  const categoryBrands = { key1: "FirstPriority", key2: "1" };
  const target = "target-fw-brands-main-page";
  const creative = "FW_Brands_Main_Page";

  const elementRef = useRef(null);

  useEffect(() => {
    const hash = window.location.hash;

    if (hash && elementRef.current) {
      const scrollToElement = () => {
        const id = hash.substring(1);
        const element = document.getElementById(id);
        if (element) {
          const elementPosition = element.getBoundingClientRect().top + window.scrollY;
          const scrollAttempt = () => {
            const currentScrollY = window.scrollY;
            window.scrollTo({
              top: elementPosition,
              behavior: "smooth",
            });

            // Проверяем, достигнуто ли нужное положение
            requestAnimationFrame(() => {
              if (Math.abs(currentScrollY - elementPosition) > 1) {
                // Если не достигнуто, повторяем попытку
                scrollAttempt();
              }
            });
          };

          scrollAttempt();
        }
      };

      // Задержка для рендеринга других компонентов
      setTimeout(() => {
        scrollToElement();
      }, 1500); // Увеличьте значение задержки, если требуется больше времени для рендеринга
    }
  }, []);

  return (
    <>
      <div ref={elementRef} id="fortune-wheel" className="mt-16 mtt mmt-mob">
        <div className="main__container bg-main">
          <div className="background overflow-hidden background-roulete rounded-xl h-full">
            <div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col">
              <div className="mx-auto max-w-2xl lg:mx-0 flex flex-row">
                <div>
                  <h2 className="mt-10 uppercase">
                    {t("Fortune wheel")} <span>{t("brands")}</span>
                  </h2>
                  <h5 className="text-lg leading-8 text-gray-300 font-normal">
                    {t("Pick a brand below, make first deposit and")} <span>{t("win real cash")}</span>
                  </h5>
                  <div className="flex mt-4">
                    <Link href={`/fortune/?creative_id=FORTUNE_WHEEL`} target="_blank">
                      <div className="btn btn-new">
                        <p>{t("Spin the Roulette")}</p>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p className="text-center mt-2 p">
            {t("To qualify for withdrawals, ensure your first deposit is at least €25 or the equivalent in other currencies and was made after requesting a withdrawal.")}
          </p>
        </div>
      </div>
      <Brands_carousel creative={creative} target={target} categoryBrands={categoryBrands} />
    </>
  );
}
