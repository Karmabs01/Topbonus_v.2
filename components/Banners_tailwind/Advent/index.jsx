"use client";
import { useState, useEffect } from "react";
import useSWR from "swr";
import Loader from "../../Loader";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "../../switcher/LanguageContext";
import { getBrands } from "../../getBrands/getBrands2";
import { useTranslation } from "react-i18next";
import "./styled.component.css";
import { getUserData } from "@/components/getUser/getUser";


export default function Brands_carousel() {
  const [newUrl, setNewUrl] = useState("");
  const [source, setSource] = useState("");
  const [loading, setLoading] = useState(true);
  const [brands, setBrands] = useState([]);
  const [currentBrandIndex, setCurrentBrandIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [activatedBrands, setActivatedBrands] = useState([]);

  const { language } = useLanguage();
  const { t } = useTranslation();

  // Основная категория (важная)
  const categoryBrands = { key1: "Video", key2: "Advent" };
  // Вторая категория для массовки
  const categoryBrands2 = { key1: "Segment2", key2: "Premium" };

  const creative = "Advent";
  const today = new Date().getDate();

  // Приоритетные бренды
  const priorityBrands = ["Fairspin", "Trip2vip", "GreenLuck"];

  useEffect(() => {
    const savedActivatedBrands = localStorage.getItem("activatedBrands");
    if (savedActivatedBrands) {
      setActivatedBrands(JSON.parse(savedActivatedBrands));
    }
  }, []);

  useEffect(() => {
    if (activatedBrands.length > 0) {
      localStorage.setItem("activatedBrands", JSON.stringify(activatedBrands));
    }
  }, [activatedBrands]);

  useEffect(() => {
    const currentUrl = window.location.href;
    const indexOfQuestionMark = currentUrl.indexOf("?");
    const newUrl2 =
      indexOfQuestionMark !== -1
        ? currentUrl.substring(0, indexOfQuestionMark)
        : currentUrl;
    window.history.replaceState({}, document.title, newUrl2);

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
      "partner1047",
    ];

    function setPartnerSource(keyword) {
      const partner = partners.find((p) => keyword && keyword.includes(p));
      if (partner) {
        localStorage.setItem("source", partner);
        setSource(partner);
        searchParams.set("source", partner);
      } else {
        setSource("0");
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

    const savedUrl = localStorage.getItem("savedUrl");
    if (savedUrl) {
      setNewUrl(savedUrl);
    }
  }, [language]);

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
        if (!data || data.length === 0) {
          console.warn("Данные брендов отсутствуют");
          setLoading(false);
          return;
        }

        // 1. Фильтруем основную категорию (Video: Advent)
        const mainCategoryData = data.filter(
          (rowData) => rowData[categoryBrands.key1] === categoryBrands.key2
        );

        // 2. Вторая категория для массовки
        const secondaryCategoryData = data.filter(
          (rowData) => rowData[categoryBrands2.key1] === categoryBrands2.key2
        );

        // Объединяем результаты: сначала главная категория, потом массовка
        let finalFilteredBrands = [...mainCategoryData, ...secondaryCategoryData];

        let salesCampaignIds = [];
        if (userId) {
          // Фильтрация по продажам
          const dataUser = await getUserData(userId);
          let sales = dataUser.sales;
          if (typeof sales === 'string') {
            try {
              sales = JSON.parse(sales);
            } catch (error) {
              console.error("Ошибка при парсинге sales:", error);
              sales = [];
            }
          }
          if (!Array.isArray(sales)) {
            sales = [];
          }
          salesCampaignIds = sales.map((sale) => sale.campaignId);

          finalFilteredBrands = finalFilteredBrands.filter(
            (brand) =>
              !salesCampaignIds.includes(brand.KeitaroGoBigID) &&
              !salesCampaignIds.includes(brand.KeitaroR2dID)
          );
        }

        // Проверяем, сколько брендов получилось
        if (finalFilteredBrands.length < 15) {
          const needed = 15 - finalFilteredBrands.length;
          const usedBrands = new Set(finalFilteredBrands.map(b => b.CasinoBrand));

          // Добираем из всех data бренды, которых нет и которые не в sales
          let additional = data.filter((brand) =>
            !usedBrands.has(brand.CasinoBrand) &&
            !(salesCampaignIds.includes(brand.KeitaroGoBigID) || salesCampaignIds.includes(brand.KeitaroR2dID))
          );
          if (additional.length > 0) {
            finalFilteredBrands = finalFilteredBrands.concat(additional.slice(0, needed));
          }
        }

        // Если всё ещё меньше 15, просто берём первые 15 из data (fallback)
        if (finalFilteredBrands.length < 15) {
          finalFilteredBrands = data.slice(0, 15);
        }

        // Теперь гарантируем, что приоритетные бренды есть в списке, если они есть в data.
        // Иначе берём их напрямую из data без фильтров.
        const ensureBrandInList = (brandName) => {
          const existsInFinal = finalFilteredBrands.some(
            (b) => (b.CasinoBrand || "").toLowerCase() === brandName.toLowerCase()
          );
          if (!existsInFinal) {
            // Пытаемся найти в data
            const fromData = data.find(
              (b) => (b.CasinoBrand || "").toLowerCase() === brandName.toLowerCase()
            );
            if (fromData) {
              // Добавляем бренд в список, если его там не было
              finalFilteredBrands.push(fromData);
            }
          }
        };

        // Гарантируем присутствие приоритетных брендов
        priorityBrands.forEach((brandName) => ensureBrandInList(brandName));

        // Если после добавления приоритетных брендов стало больше 15,
        // обрежем до 15, т.к. главный приоритет — гарантировать их присутствие.
        if (finalFilteredBrands.length > 15) {
          // Но нам важно сохранить приоритетный порядок.
          // Поэтому сначала переставим, потом обрежем.
        }

        // Функция для перемещения бренда на определенный индекс
        const moveBrandToIndex = (array, brandName, targetIndex) => {
          const index = array.findIndex(
            (b) => (b.CasinoBrand || "").toLowerCase() === brandName.toLowerCase()
          );
          if (index > -1 && index !== targetIndex) {
            const [brandObj] = array.splice(index, 1);
            if (targetIndex >= array.length) {
              array.push(brandObj);
            } else {
              array.splice(targetIndex, 0, brandObj);
            }
          }
        };

        // Перемещаем бренды в нужный порядок:
        // Fairspin -> индекс 0
        // Trip2vip -> индекс 1
        // GreenLuck -> индекс 2
        moveBrandToIndex(finalFilteredBrands, "Fairspin", 0);
        moveBrandToIndex(finalFilteredBrands, "Trip2vip", 1);
        moveBrandToIndex(finalFilteredBrands, "GreenLuck", 2);

        // Теперь обрежем до 15 брендов
        finalFilteredBrands = finalFilteredBrands.slice(0, 15);

        setBrands(finalFilteredBrands);
        setLoading(false);
      } catch (error) {
        console.error("Ошибка при получении данных пользователя или брендов:", error);
        // Если ошибка, fallback: просто первые 15 из data
        let fallbackBrands = data.slice(0, 15);

        // Гарантируем приоритетные бренды из data
        priorityBrands.forEach((brandName) => {
          const inFallback = fallbackBrands.some((b) => (b.CasinoBrand||"").toLowerCase()===brandName.toLowerCase());
          if(!inFallback){
            const fromData = data.find((b)=>(b.CasinoBrand||"").toLowerCase()===brandName.toLowerCase());
            if(fromData){
              fallbackBrands.push(fromData);
            }
          }
        });

        // Перемещаем приоритет
        const moveBrandToIndex = (array, brandName, targetIndex) => {
          const index = array.findIndex(
            (b) => (b.CasinoBrand || "").toLowerCase() === brandName.toLowerCase()
          );
          if (index > -1 && index !== targetIndex) {
            const [brandObj] = array.splice(index, 1);
            if (targetIndex >= array.length) {
              array.push(brandObj);
            } else {
              array.splice(targetIndex, 0, brandObj);
            }
          }
        };

        moveBrandToIndex(fallbackBrands, "Fairspin", 0);
        moveBrandToIndex(fallbackBrands, "Trip2vip", 1);
        moveBrandToIndex(fallbackBrands, "GreenLuck", 2);

        fallbackBrands = fallbackBrands.slice(0, 15);

        setBrands(fallbackBrands);
        setLoading(false);
      }
    };

    fetchUserBrands();
  }, [
    data,
    userId,
    categoryBrands.key1,
    categoryBrands.key2,
    categoryBrands2.key1,
    categoryBrands2.key2
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentBrandIndex((prevIndex) => (prevIndex + 15) % brands.length);
        setFade(true);
      }, 500);
    }, 5000000);

    return () => clearInterval(interval);
  }, [brands.length]);

  const handleActivate = (index) => {
    if (index + 15 <= today && !activatedBrands.includes(index)) {
      setActivatedBrands((prev) => [...prev, index]);
    }
  };

  console.log("Final brands order:", brands.map(b => b.CasinoBrand));

  return (
    <>
      <div className="sm:mt-10 mt-5 mb-5 mob-mt10 advent mb-16">
        <div className="main__container advnt">
          {loading ? (
            <Loader />
          ) : (
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-white random-title mb-3 text-center">
                {t("Christmas Calendar")}
              </h2>
              <p className="mb-3 text-center text-white">
                {t("Join us for 15 days of festive surprises! Unlock exclusive bonuses, free spins, and exciting offers from top online casinos - one new deal every day from December 1st to 15th!")}
              </p>
              <div className="w-full brand_carousel rounded-md flex justify-between items-center flex-wrap">
                {brands.length > 0 &&
                  brands.map((rowData, index) => {
                    const isOpened = index + 15 <= today;
                    const isActivated = activatedBrands.includes(index);

                    return (
                      <div
                        key={index}
                        className={`card-advent rounded-xl flex flex-col justify-between basis-[18%] relative mt-16 ${
                          isOpened ? "opened" : "closed"
                        } ${isActivated ? "activate" : ""}`}
                      >
                        <div className="dated">{index + 15}</div>
                        <div className="mx-auto max-w-7xl flex flex-col w-full">
                          <div className="mx-auto max-w-2xl lg:mx-0 flex flex-row card-sl">
                            <div className="w-full">
                              {isActivated ? (
                                <div className="flex flex-col items-center">
                                  <Link
                                    className="mt-3 mb-2"
                                    href={`${rowData.GoBig}/${newUrl}&creative_id=${creative}`}
                                    target="_blank"
                                  >
                                    <Image
                                      src={`/brands/${rowData.CasinoBrand}.png`}
                                      alt={rowData.CasinoBrand}
                                      width={192}
                                      height={96}
                                      loading="lazy"
                                    />
                                  </Link>
                                  <p className="!m-0">
                                    {rowData.OurOfferContent}
                                  </p>
                                  <Link
                                    className="relative btn-play btn-blick overflow-hidden"
                                    href={`${rowData.GoBig}/${newUrl}&creative_id=${creative}`}
                                    target="_blank"
                                  >
                                    {t("Play Now")}
                                  </Link>
                                </div>
                              ) : isOpened ? (
                                <div className="flex flex-col items-center">
                                  <div className="mt-3 mb-2 opennow nonoact"></div>
                                  <p className="!m-0">
                                    {t("Ready to Activate")}
                                  </p>
                                  <button
                                    className="relative btn-play btn-blick overflow-hidden"
                                    onClick={() => handleActivate(index)}
                                  >
                                    {t("Activate")}
                                  </button>
                                </div>
                              ) : (
                                <div className="flex flex-col items-center">
                                  <div className="mt-3 mb-2 nonoact"></div>
                                  <p className="!m-0">
                                    {t("Not Yet Available")}
                                  </p>
                                  <button
                                    disabled
                                    className="relative btn-play btn-blick overflow-hidden not-yet"
                                  >
                                    {t("Not Yet")}
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                {brands.length === 0 && (
                  <div className="text-white text-center">
                    {t("No Brands Available")}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
