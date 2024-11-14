"use client";
import { useState, useEffect } from "react";
import useSWR from "swr";
import Loader from "../../../Loader";
import { shuffle } from "lodash";
import Image from "next/image";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
import Card from "../../../slider/Card";
import { useLanguage } from "../../../switcher/LanguageContext";
import { getBrands } from "../../../getBrands/getBrands2";
import { useTranslation } from "react-i18next";
import refetch from "@/public/refetch.png";
import { getUserData } from "@/components/getUser/getUser";

import Slider from "react-slick";

// import "./styled.component.css"

export default function Popular_offers() {
  const [newUrl, setNewUrl] = useState("");
  const [source, setSource] = useState("");
  const [loading, setLoading] = useState(true);
  const [brands, setBrands] = useState([]);
  const [currentBrandIndex, setCurrentBrandIndex] = useState(0);
  const [fade, setFade] = useState(true); // State to manage fade effect
  const { language } = useLanguage();
  const { t } = useTranslation();

  const settings = {
    infinite: true,
    speed: 500,
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  useEffect(() => {
    // Обновляем URL, удаляем параметры и устанавливаем source на основе localStorage
    const currentUrl = window.location.href;
    const indexOfQuestionMark = currentUrl.indexOf("?");
    const newUrl2 =
      indexOfQuestionMark !== -1
        ? currentUrl.substring(0, indexOfQuestionMark)
        : currentUrl;
    window.history.replaceState({}, document.title, newUrl2);

    // Работа с URL и localStorage для определения source
    const urlObj = new URL(currentUrl);
    const searchParams = new URLSearchParams(urlObj.search);
    searchParams.delete("brand");
    const currentKeyword = searchParams.get("keyword");

    const partners = [
      "partner1039",
      "partner1043",
      "partner1044",
      "CLD_VIP",
      "partner1045_b1",
      "partner1046",
      "partner1047_b1",
    ];

    function setPartnerSource(keyword) {
      const partner = partners.find((p) => keyword && keyword.includes(p));
      if (partner) {
        localStorage.setItem("source", partner);
        setSource(partner);
        searchParams.set("source", partner);
      } else {
        setSource("0");
        // Получаем текущий источник и проверяем, не является ли он одним из допустимых партнеров
        const sourceFound = localStorage.getItem("source");
        if (!partners.includes(sourceFound)) {
          localStorage.setItem("source", "0");
          searchParams.set("source", "0");
        }
      }
    }

    if (currentKeyword) {
      setPartnerSource(currentKeyword);
    }

    const ad_campaign = localStorage.getItem("ad_campaign_id");

    const savedUrl = localStorage.getItem("savedUrl");
    if (savedUrl) {
      setNewUrl(savedUrl);
    }
  }, [language]);

  const categoryBrands = { key1: "Segment2", key2: "Sandbox" };
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
      // 1. Фильтрация брендов на основе категорий
      const filteredByCategory = data.filter((brand) =>
        brand[categoryBrands.key1] === categoryBrands.key2
      );
      try {
        // Проверяем наличие данных брендов
        if (!data) {
          console.warn("Данные брендов отсутствуют");
          setLoading(false);
          return;
        }


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
        if (typeof sales === 'string') {
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
        const finalFilteredBrands = filteredByCategory.filter((brand) => 
          !salesCampaignIds.includes(brand.KeitaroGoBigID) &&
          !salesCampaignIds.includes(brand.KeitaroR2dID)
        );

        console.log("Отфильтрованные бренды:", finalFilteredBrands);

        // 5. Устанавливаем состояние с отфильтрованными брендами
        setBrands(finalFilteredBrands);
        setLoading(false);
      } catch (error) {
        setBrands(filteredByCategory);

        console.error("Ошибка при получении данных пользователя или брендов:", error);
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


  // Начало изменений
  const specificBrandName = "Erabet"; // Замените на нужный бренд

  let brandsToDisplay = [];

  if (brands.length > 0) {
    // Находим конкретный бренд
    const specificBrand = brands.find(
      (brand) => brand.CasinoBrand === specificBrandName
    );

    // Убираем этот бренд из списка, чтобы избежать дубликатов
    let otherBrands = brands;
    if (specificBrand) {
      otherBrands = brands.filter(
        (brand) => brand.CasinoBrand !== specificBrandName
      );
    }

    // Перемешиваем оставшиеся бренды
    const shuffledOtherBrands = shuffle(otherBrands);

    // Получаем 4 или 5 случайных брендов
    const numberOfRandomBrands = specificBrand ? 4 : 5;
    const randomBrands = shuffledOtherBrands.slice(0, numberOfRandomBrands);

    // Формируем итоговый массив брендов для отображения
    if (specificBrand) {
      brandsToDisplay = [specificBrand, ...randomBrands];
    } else {
      brandsToDisplay = randomBrands;
    }
  }
  // Конец изменений

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // Start fade-out
      setTimeout(() => {
        setCurrentBrandIndex((prevIndex) => (prevIndex + 1) % brands.length);
        setFade(true); // Start fade-in
      }, 500); // Duration of fade-out effect
    }, 5000000); // Change brand every 5 seconds

    return () => clearInterval(interval);
  }, [brands.length]);



  const number = brands.length > 5 ? 5 : brands.length;

  const refetchBrands = () => {
    const shuffled = shuffle(brands);
    setBrands(shuffled); // Перемешиваем и обновляем состояние с брендами
  };



  return (
    <>
      <div className="fivehot">
        <div className="main__container">
          {loading ? (
            <Loader />
          ) : brands.length > 0 ? (
            <div>
              <div className="fivehot-banner">
                <h3>
                  {number} <span className="span-orange">{t("HOTTEST")}</span>{" "}
                  <span>{t("casinos")}</span>
                </h3>
                <p className="!text-xl mt-5">
                  {t(
                    "Discover the hottest casino brands trending right now!"
                  )}
                </p>
              </div>
              <ul
                role="list"
                className="grid grid-cols-1 gap-5 sm:gap-6 ul-list"
              >
                <button
                  className="refetch absolute"
                  onClick={refetchBrands} // Обработчик клика
                >
                  <Image
                    src={refetch}
                    alt="refetch"
                    width={40}
                    loading="lazy"
                  />
                </button>
                {brandsToDisplay.slice(0, 5).map((rowData, index) => (
                  <Link
                    className=""
                    href={`${rowData.GoBig}/${newUrl}&creative_id=Hottest_2`}
                    target="_blank"
                  >
                    <li key={index} className="col-span-1">
                      <div className="li-img">
                        <Image
                          src={`/brands/${rowData.CasinoBrand}.png`}
                          alt={rowData.CasinoBrand}
                          width={58}
                          height={58}
                          loading="lazy"
                        />
                      </div>
                      <div className="flex items-center flex-col w-full">
                        <div className="flex-1 px-4 text-sm h-full w-full">
                          <a
                            href={`${rowData.GoBig}/${newUrl}&creative_id=Hottest_2`}
                            className="font-medium"
                          >
                            {rowData.CasinoBrand}
                          </a>
                          <p className="!m-0"> {rowData.OurOfferContent}</p>
                        </div>
                        <div className="flex-shrink-0 pr-2 flex justify-end w-full">
                          <a
                            type="button"
                            className="inline-flex h-8 items-center justify-center rounded-full bg-transparent lucky-btn text-white px-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          >
                            {t("Play Now")}
                          </a>
                        </div>
                      </div>
                    </li>
                  </Link>
                ))}
              </ul>
            </div>
          ) : (
            <div>
              <div className="fivehot-banner">
                <h3>
                  5 <span className="span-orange">{t("HOTTEST")}</span>{" "}
                  <span>{t("casinos")}</span>
                </h3>
                <p className="!text-xl mt-5">
                  {t("Get ready for the hottest brands, arriving soon!")}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
