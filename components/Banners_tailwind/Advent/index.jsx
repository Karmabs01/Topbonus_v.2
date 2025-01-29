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

  // Итоговый массив брендов (после фильтров и сортировок)
  const [brands, setBrands] = useState([]);

  // «Карусель»: какой индекс сейчас показывается (если вообще нужно автопереключение)
  const [currentBrandIndex, setCurrentBrandIndex] = useState(0);
  const [fade, setFade] = useState(true);

  // Состояния для активации карточек
  const [lastActivationDate, setLastActivationDate] = useState(null);
  const [activatedCardIndex, setActivatedCardIndex] = useState(null);

  const { language } = useLanguage();
  const { t } = useTranslation();

  // Загружаем «активированные» данные из localStorage
  useEffect(() => {
    const savedActivationDate = localStorage.getItem("lastActivationDate");
    const savedActivatedCard = localStorage.getItem("activatedCardIndex");
    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

    if (savedActivationDate === today) {
      setLastActivationDate(savedActivationDate);
      setActivatedCardIndex(savedActivatedCard !== null ? parseInt(savedActivatedCard) : null);
    } else {
      // Если дата изменилась, сбрасываем активацию
      localStorage.removeItem("lastActivationDate");
      localStorage.removeItem("activatedCardIndex");
      setLastActivationDate(null);
      setActivatedCardIndex(null);
    }
  }, []);

  // Подчищаем URL, извлекаем партнёров и т. п. (ваш код)
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

  // Подгружаем бренды через SWR
  const { data, error } = useSWR(
    ["brands", language],
    () => getBrands(language),
    { initialData: brands }
  );

  let userId = "";
  if (typeof window !== "undefined") {
    userId = localStorage.getItem("user_id") || "";
  }

  // Приоритетные бренды
  const priorityBrands = [
    "Blockbets",
    "Spinjo",
    "FairSpin",
    "LuckyChoo",
    "FairPari",
    "Winbay",
    // Другие бренды можно добавить по необходимости
  ];

  // Основные категории, как в вашем коде
  const categoryBrands = { key1: "Video", key2: "Advent" };
  const categoryBrands2 = { key1: "Segment2", key2: "Premium" };

  // Когда данные загрузились, фильтруем, сортируем, оставляем до 24 штук
  useEffect(() => {
    const fetchUserBrands = async () => {
      try {
        if (!data || data.length === 0) {
          console.warn("Данные брендов отсутствуют");
          setLoading(false);
          return;
        }

        // 1) Берём основные бренды (Video: Advent)
        const mainCategoryData = data.filter(
          (rowData) => rowData[categoryBrands.key1] === categoryBrands.key2
        );

        // 2) Берём вторую категорию (Segment2: Premium)
        const secondaryCategoryData = data.filter(
          (rowData) => rowData[categoryBrands2.key1] === categoryBrands2.key2
        );

        // Объединяем
        let finalFilteredBrands = [
          ...mainCategoryData,
          ...secondaryCategoryData,
        ];

        // Если есть userId — фильтруем продажи
        let salesCampaignIds = [];
        if (userId) {
          const dataUser = await getUserData(userId);
          let sales = dataUser.sales;
          if (typeof sales === "string") {
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

        // Гарантируем хотя бы 24
        if (finalFilteredBrands.length < 5) {
          const needed = 5 - finalFilteredBrands.length;
          const usedBrands = new Set(
            finalFilteredBrands.map((b) => b.CasinoBrand)
          );

          let additional = data.filter(
            (brand) =>
              !usedBrands.has(brand.CasinoBrand) &&
              !(
                salesCampaignIds.includes(brand.KeitaroGoBigID) ||
                salesCampaignIds.includes(brand.KeitaroR2dID)
              )
          );
          if (additional.length > 0) {
            finalFilteredBrands = finalFilteredBrands.concat(
              additional.slice(0, needed)
            );
          }
        }
        if (finalFilteredBrands.length < 5) {
          finalFilteredBrands = data.slice(0, 5);
        }

        // Проверяем присутствие приоритетных
        const ensureBrandInList = (brandName) => {
          const existsInFinal = finalFilteredBrands.some(
            (b) =>
              (b.CasinoBrand || "").toLowerCase() ===
              brandName.toLowerCase()
          );
          if (!existsInFinal) {
            const fromData = data.find(
              (b) =>
                (b.CasinoBrand || "").toLowerCase() ===
                brandName.toLowerCase()
            );
            if (fromData) {
              finalFilteredBrands.push(fromData);
            }
          }
        };
        priorityBrands.forEach((brandName) => ensureBrandInList(brandName));

        // Перестановка приоритетных
        const moveBrandToIndex = (array, brandName, targetIndex) => {
          const index = array.findIndex(
            (b) =>
              (b.CasinoBrand || "").toLowerCase() ===
              brandName.toLowerCase()
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
        moveBrandToIndex(finalFilteredBrands, "Blockbets", 0);
        moveBrandToIndex(finalFilteredBrands, "Spinjo", 1);
        moveBrandToIndex(finalFilteredBrands, "FairSpin", 2);
        moveBrandToIndex(finalFilteredBrands, "LuckyChoo", 3);
        moveBrandToIndex(finalFilteredBrands, "FairPari", 4);
        moveBrandToIndex(finalFilteredBrands, "Winbay", 5);

        finalFilteredBrands = finalFilteredBrands.slice(0, 5);

        setBrands(finalFilteredBrands);
        setLoading(false);
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
        // fallback (если ошибка)
        let fallbackBrands = data.slice(0, 24);

        priorityBrands.forEach((brandName) => {
          const inFallback = fallbackBrands.some(
            (b) =>
              (b.CasinoBrand || "").toLowerCase() ===
              brandName.toLowerCase()
          );
          if (!inFallback) {
            const fromData = data.find(
              (b) =>
                (b.CasinoBrand || "").toLowerCase() ===
                brandName.toLowerCase()
            );
            if (fromData) {
              fallbackBrands.push(fromData);
            }
          }
        });

        const moveBrandToIndex = (array, brandName, targetIndex) => {
          const index = array.findIndex(
            (b) =>
              (b.CasinoBrand || "").toLowerCase() ===
              brandName.toLowerCase()
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

        moveBrandToIndex(fallbackBrands, "Blockbets", 0);
        moveBrandToIndex(fallbackBrands, "Spinjo", 1);
        moveBrandToIndex(fallbackBrands, "FairSpin", 2);
        moveBrandToIndex(fallbackBrands, "LuckyChoo", 3);
        moveBrandToIndex(fallbackBrands, "FairPari", 4);
        moveBrandToIndex(fallbackBrands, "Winbay", 5);

        fallbackBrands = fallbackBrands.slice(0, 5);

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
    categoryBrands2.key2,
  ]);

  // Пример автопереключения карусели
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentBrandIndex((prevIndex) => (prevIndex + 24) % brands.length);
        setFade(true);
      }, 500);
    }, 5000000);

    return () => clearInterval(interval);
  }, [brands.length]);

  // Функция для получения текущей даты в формате YYYY-MM-DD
  const getTodayDateString = () => {
    return new Date().toISOString().split("T")[0];
  };

  // Когда пользователь жмёт «Activate»
  const handleActivate = (index) => {
    const today = getTodayDateString();
    if (lastActivationDate === today) {
      alert(t("You have already activated a card today."));
      return;
    }

    setActivatedCardIndex(index);
    setLastActivationDate(today);
    localStorage.setItem("activatedCardIndex", index);
    localStorage.setItem("lastActivationDate", today);
  };

  return (
    <>
      <div id="advent" className="sm:mt-10 mt-5 mb-5 mob-mt10 advent mb-16">
        <div className="main__container advnt">
          {loading ? (
            <Loader />
          ) : (
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-white random-title mb-3 text-center">
              {t("Secrets of the Red Envelope: Open and Discover Your Luck!")}
              </h2>
              <p className="mb-3 text-center text-white">
              {t(
                  "Every day, choose one of the red envelopes to reveal a surprise.Free spins, cashback, or exclusive bonuses are already waiting for you!"
                )}
              </p>

            
              <div className="w-full brand_carousel rounded-md flex justify-between items-center flex-wrap mt-10">
                {brands.map((rowData, index) => {
                  // Определяем, была ли карточка активирована сегодня
                  const isActivated = activatedCardIndex === index;
                  const isActivatedToday = lastActivationDate === getTodayDateString();

                  // Определяем состояние карточки
                  let cardState;
                  if (isActivated && isActivatedToday) cardState = "activate";
                  else cardState = "closed"; // Все остальные карточки закрыты

                  return (
                    <div
                      key={index}
                      className={`card-advent rounded-xl flex flex-col justify-between basis-[19%] relative mt-16 ${cardState}`}
                    >
                      <div className="dated">{index + 1}</div>
                      <div className="mx-auto max-w-7xl flex flex-col w-full">
                        <div className="mx-auto max-w-2xl lg:mx-0 flex flex-row card-sl">
                          <div className="w-full">
                            {isActivated && isActivatedToday ? (
                              // Карточка активирована
                              <div className="flex flex-col items-center">
                                <Link
                                  className="mt-3 mb-2"
                                  href={`${rowData.GoBig || "#"}/${newUrl}&creative_id=Everyday_Advent`}
                                  target="_blank"
                                >
                                  <Image
                                    src={`/brands/${rowData.CasinoBrand || "default"}.png`}
                                    alt={rowData.CasinoBrand || "Brand"}
                                    width={256}
                                    height={128}
                                    loading="lazy"
                                  />
                                </Link>
                                <p className="!m-0">
                                  {rowData.OurOfferContent || "Offer details..."}
                                </p>
                                <Link
                                  className="relative btn-play btn-blick overflow-hidden"
                                  href={`${rowData.GoBig || "#"}/${newUrl}&creative_id=Everyday_Advent`}
                                  target="_blank"
                                >
                                  {t("Play Now")}
                                </Link>
                              </div>
                            ) : (
                              // Карточка не активирована
                              <div className="flex flex-col items-center">
                                <div className="mt-3 mb-2 nonoact"></div>
                                {lastActivationDate === getTodayDateString() ? (
                                  <p className="!m-0 text-white">
                                    {t("You have activated a card today")}
                                  </p>
                                ) : (
                                  <p className="!m-0">
                                    {t("Ready to Activate")}
                                  </p>
                                )}
                                {lastActivationDate === getTodayDateString() ? (
                                  <button
                                    disabled
                                    className="relative btn-play btn-blick overflow-hidden not-yet"
                                  >
                                    {t("Not Yet")}
                                  </button>
                                ) : (
                                  <button
                                    className="relative btn-play btn-blick overflow-hidden"
                                    onClick={() => handleActivate(index)}
                                  >
                                    {t("Activate")}
                                  </button>
                                )}
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
