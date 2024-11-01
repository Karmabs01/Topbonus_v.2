"use client";
import { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import useSWR from "swr";
const LazySlider = dynamic(() => import("react-slick"), {
  ssr: false,
  loading: () => <p>Download...</p>,
});
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import { getBrands } from "@/components/getBrands/getBrands";
import { getBrands } from "@/components/getBrands/getBrands2";

import { useLanguage } from "@/components/switcher/LanguageContext";
import Link from "next/link";
import Image from "next/image";
import Loader from "../Loader";
import { getUserData } from "@/components/getUser/getUser";
import { useTranslation } from "react-i18next";

import Slider from "react-slick";

// export type Brand = {
//   id_brand: string;
//   CasinoBrand: string;
//   GoBig: string;
//   OurOfferContent: string;
//   KeitaroGoBigID: string;
//   KeitaroR2dID: string;
// };

// interface LeadOrSale {
//   campaignId: string;
//   status: string;
//   timestamp: string;
//   paymentMethod: string;
//   paymentSumIn: string;
//   paymentAddress: string;
//   USD: string;
// }

// const BRAND_CATEGORIES = { key1: "CurrentStatus", key2: "Ongoing" };
// const BRAND_CATEGORIES2 = { key1: "FirstPriority", key2: "1" };
const categoryBrands = { key1: "FirstPriority", key2: "1" };
// const categoryBrands0 = { key1: "Networks", key2: "Premium" };

const UserBrands = () => {
  const [brands, setBrands] = useState([]);
  const [otherBrands, setOtherBrands] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(true);


  const { language } = useLanguage();
  const { t } = useTranslation();

  const { data, error } = useSWR(
    ["brands", language],
    () => getBrands(language),
    { initialData: brands }
  );

  let userId = "";
  if (typeof window !== "undefined") {
    userId = localStorage.getItem("user_id") || "";
  }
  useEffect(() => {
    const fetchUserBrands = async () => {
      try {
        // Проверяем наличие данных брендов
        if (!data) {
          console.warn("Данные брендов отсутствуют");
          setLoading(false);
          return;
        }

        // 1. Фильтрация брендов на основе категорий
        const filteredByCategory = data.filter(
          (brand) =>
            brand[categoryBrands.key1] === categoryBrands.key2
        );

        // Если userId отсутствует, устанавливаем отфильтрованные бренды и завершаем
        if (!userId) {
          setBrands(filteredByCategory);
          setLoading(false);
          return;
        }

        // 2. Получаем данные пользователя
        const dataUser = await getUserData(userId);
        console.log("Полные данные пользователя:", dataUser);

        let sales = dataUser.sales;

        // Если sales — строка, пытаемся её распарсить
        if (typeof sales === "string") {
          try {
            sales = JSON.parse(sales);
            console.log("Sales после парсинга строки:", sales);
          } catch (error) {
            console.error("Ошибка при парсинге sales:", error);
            sales = [];
          }
        }

        // Проверяем, что sales — массив
        if (!Array.isArray(sales)) {
          console.warn("Поле sales не является массивом:", sales);
          sales = [];
        }

        // 3. Извлекаем campaignId из sales
        const salesCampaignIds = sales.map((sale) => sale.campaignId);
        console.log("Sales Campaign IDs:", salesCampaignIds);

        // 4. Исключаем бренды, у которых KeitaroGoBigID или KeitaroR2dID совпадают с campaignId
        const finalFilteredBrands = filteredByCategory.filter(
          (brand) =>
            !salesCampaignIds.includes(brand.KeitaroGoBigID) &&
            !salesCampaignIds.includes(brand.KeitaroR2dID)
        );

        console.log("Отфильтрованные бренды:", finalFilteredBrands);

        // 5. Устанавливаем состояние с отфильтрованными брендами
        setBrands(finalFilteredBrands);
        setLoading(false);
      } catch (error) {
        console.error(
          "Ошибка при получении данных пользователя или брендов:",
          error
        );
        setLoading(false);
      }
    };

    fetchUserBrands();
  }, [
    data,
    userId,
    categoryBrands.key1,
    categoryBrands.key2,
  ]);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (!userId) {
    return null;
  }


  const settings = {
    infinite: true,
    dots: false,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: false,
    speed: 1000,
    autoplaySpeed: 2000,
    arrows: true,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          dots: false,
        },
      },
    ],
  };


  return (
    <div className="main__container thisis">
      {brands.length > 0 ? (
        <div className="flex flex-col mt-10 mob-mt10">
          <div className="w-full brand_carousel rounded-md">
            {isLoading && <Loader />}
            {brands.length > 5 && !isMobile ? (
              <Slider {...settings}>
                {brands.map((chunk, index) => (
                  <div
                    key={index}
                    className="overflow-hidden rounded-xl flex flex-col justify-between card-rel"
                  >
                    <div className="mx-auto max-w-7xl flex flex-col ">
                      <div className="mx-auto max-w-2xl lg:mx-0 flex flex-row card-sl">
                        <div>
                          <Link
                            className="mt-3"
                            href={`${chunk.GoBig}/&creative_id=USER_REGISTRATION_2`}
                            target="_blank"
                          >
                            <Image
                              src={`/brands/${chunk.CasinoBrand}.png`}
                              alt={chunk.CasinoBrand}
                              width={300}
                              height={100}
                              loading="lazy"
                            />
                          </Link>
                          <Link
                            className="relative btn-play btn-blick overflow-hidden"
                            href={`${chunk.GoBig}/&creative_id=USER_REGISTRATION_2`}
                            target="_blank"
                          >
                            Play Now
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            ) : (
              <>
                {isMobile && brands.length > 1 ? (
                  <Slider {...settings}>
                    {brands.map((chunk, index) => (
                      <div
                        key={index}
                        className="overflow-hidden rounded-xl flex flex-col justify-between card-rel"
                      >
                        <div className="mx-auto max-w-7xl flex flex-col ">
                          <div className="mx-auto max-w-2xl lg:mx-0 flex flex-row card-sl">
                            <div>
                              <Link
                                className="mt-3"
                                href={`${chunk.GoBig}/&creative_id=USER_REGISTRATION_2`}
                                target="_blank"
                              >
                                <Image
                                  src={`/brands/${chunk.CasinoBrand}.png`}
                                  alt={chunk.CasinoBrand}
                                  width={300}
                                  height={100}
                                  loading="lazy"
                                />
                              </Link>
                              <Link
                                className="relative btn-play btn-blick overflow-hidden"
                                href={`${chunk.GoBig}/&creative_id=USER_REGISTRATION_2`}
                                target="_blank"
                              >
                                Play Now
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </Slider>
                ) : (
                  <div className="flex flex-wrap">
                    {brands.map((brand) => (
                      <div
                        key={brand.CasinoBrand}
                        className="overflow-hidden rounded-xl flex flex-col justify-between card-not-slider"
                      >
                        <div className="mx-auto max-w-7xl flex flex-col ">
                          <div className="mx-auto max-w-2xl lg:mx-0 flex flex-row card-sl">
                            <div>
                              <Link
                                className="mt-3"
                                href={`${brand.GoBig}/&creative_id=USER_REGISTRATION_2`}
                                target="_blank"
                              >
                                <Image
                                  src={`/brands/${brand.CasinoBrand}.png`}
                                  alt={brand.CasinoBrand}
                                  width={300}
                                  height={100}
                                  loading="lazy"
                                />
                              </Link>
                              <Link
                                className="relative btn-play btn-blick overflow-hidden"
                                href={`${brand.GoBig}/&creative_id=REGISTRATION_2`}
                                target="_blank"
                              >
                                Play Now
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default UserBrands;
