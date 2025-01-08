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

  // Список «активированных» карточек (индексы 0..23)
  const [activatedBrands, setActivatedBrands] = useState([]);

  const { language } = useLanguage();
  const { t } = useTranslation();

  // ====== НАЧАЛО: Логика адвента (даты) ======
  // Адвент стартует 15 декабря 2024 (индекс=0) и длится 24 дня (до 7 января 2025).
  // Если хотите на 2023/2024, смените год на 2023.
  const ADVENT_START = new Date(2024, 11, 15); // 11 = декабрь, день 15

  // Сколько дней прошло с 15 декабря 2024 по «сейчас»
  function getTodayDiff() {
    const now = new Date();
    const diffMs = now - ADVENT_START;
    return Math.floor(diffMs / (1000 * 60 * 60 * 24));
  }

  // Возвращает строку «15 Dec», «16 Dec», «1 Jan» и т. п. для index=0..23
  function formatAdventDate(index) {
    const date = new Date(ADVENT_START);
    date.setDate(date.getDate() + index);
    const day = date.getDate();
    const month = date.getMonth(); // 11 = Dec, 0 = Jan
    let monthStr;
    if (month === 11) monthStr = "Dec";
    else if (month === 0) monthStr = "Jan";
    else monthStr = "???";
    return `${day} ${monthStr}`;
  }

  // Если index > getTodayDiff(), день считается «будущим» (locked)
  function isDayLocked(index) {
    return index > getTodayDiff();
  }
  // ====== КОНЕЦ: Логика адвента ======

  // Загружаем «активированные» карточки из localStorage
  useEffect(() => {
    const savedActivatedBrands = localStorage.getItem("activatedBrands");
    if (savedActivatedBrands) {
      setActivatedBrands(JSON.parse(savedActivatedBrands));
    }
  }, []);

  // Сохраняем «активированные» в localStorage при каждом изменении
  useEffect(() => {
    localStorage.setItem("activatedBrands", JSON.stringify(activatedBrands));
  }, [activatedBrands]);

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
    "Fairspin",
    "Trip2vip",
    "GreenLuck",
    "FairPari",
    "Primebetz",
    "Blockbets",
    "SpinFest",
    "Erabet",
    "MyEmpire",
    "RollingSlots",
    "WinWin.Bet",
    "Casinia",
    "Luckychoo",
    "Goldencrown",
    "Spinsup",
    "Smokace",
    "Legiano",
    "HeroSpin",
    "RocketSpin",
    "Winbay",
    "Trino",
    "Betplays",
    "Spinarium",
    "Bitstake",
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
        if (finalFilteredBrands.length < 24) {
          const needed = 24 - finalFilteredBrands.length;
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
        if (finalFilteredBrands.length < 24) {
          finalFilteredBrands = data.slice(0, 24);
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
        moveBrandToIndex(finalFilteredBrands, "Fairspin", 0);
        moveBrandToIndex(finalFilteredBrands, "Trip2vip", 1);
        moveBrandToIndex(finalFilteredBrands, "GreenLuck", 2);
        moveBrandToIndex(finalFilteredBrands, "FairPari", 3);
        moveBrandToIndex(finalFilteredBrands, "Primebetz", 4);
        moveBrandToIndex(finalFilteredBrands, "Blockbets", 5);
        moveBrandToIndex(finalFilteredBrands, "SpinFest", 6);
        moveBrandToIndex(finalFilteredBrands, "Erabet", 7);
        moveBrandToIndex(finalFilteredBrands, "MyEmpire", 8);
        moveBrandToIndex(finalFilteredBrands, "RollingSlots", 9);
        moveBrandToIndex(finalFilteredBrands, "WinWin.Bet", 10);
        moveBrandToIndex(finalFilteredBrands, "Casinia", 11);
        moveBrandToIndex(finalFilteredBrands, "SpinFest", 12);
        moveBrandToIndex(finalFilteredBrands, "Goldencrown", 13);
        moveBrandToIndex(finalFilteredBrands, "Spinsup", 14);
        moveBrandToIndex(finalFilteredBrands, "Smokace", 15);
        moveBrandToIndex(finalFilteredBrands, "Legiano", 16);
        moveBrandToIndex(finalFilteredBrands, "HeroSpin", 17);
        moveBrandToIndex(finalFilteredBrands, "RocketSpin", 18);
        moveBrandToIndex(finalFilteredBrands, "Winbay", 19);
        moveBrandToIndex(finalFilteredBrands, "Trino", 20);
        moveBrandToIndex(finalFilteredBrands, "Betplays", 21);
        moveBrandToIndex(finalFilteredBrands, "Spinarium", 22);
        moveBrandToIndex(finalFilteredBrands, "Bitstake", 23);

        finalFilteredBrands = finalFilteredBrands.slice(0, 24);

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

        moveBrandToIndex(fallbackBrands, "Fairspin", 0);
        moveBrandToIndex(fallbackBrands, "Trip2vip", 1);
        moveBrandToIndex(fallbackBrands, "GreenLuck", 2);
        moveBrandToIndex(fallbackBrands, "FairPari", 3);
        moveBrandToIndex(fallbackBrands, "Primebetz", 4);
        moveBrandToIndex(fallbackBrands, "Blockbets", 5);
        moveBrandToIndex(fallbackBrands, "SpinFest", 6);
        moveBrandToIndex(fallbackBrands, "Erabet", 7);
        moveBrandToIndex(fallbackBrands, "MyEmpire", 8);
        moveBrandToIndex(fallbackBrands, "Rolling slots", 9);
        moveBrandToIndex(fallbackBrands, "WinWin.Bet", 10);
        moveBrandToIndex(fallbackBrands, "Casinia", 11);
        moveBrandToIndex(fallbackBrands, "SpinFest", 12);
        moveBrandToIndex(fallbackBrands, "Goldencrown", 13);
        moveBrandToIndex(fallbackBrands, "Spinsup", 14);
        moveBrandToIndex(fallbackBrands, "Smokace", 15);

        moveBrandToIndex(fallbackBrands, "Legiano", 16);
        moveBrandToIndex(fallbackBrands, "HeroSpin", 17);
        moveBrandToIndex(fallbackBrands, "RocketSpin", 18);
        moveBrandToIndex(fallbackBrands, "Winbay", 19);
        moveBrandToIndex(fallbackBrands, "Trino", 20);
        moveBrandToIndex(fallbackBrands, "Betplays", 21);
        moveBrandToIndex(fallbackBrands, "Spinarium", 22);
        moveBrandToIndex(fallbackBrands, "Bitstake", 23);



        fallbackBrands = fallbackBrands.slice(0, 24);

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

  // Когда пользователь жмёт «Activate»
  const handleActivate = (index) => {
    if (!isDayLocked(index) && !activatedBrands.includes(index)) {
      setActivatedBrands((prev) => [...prev, index]);
    }
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
                {t("Christmas Calendar")}
              </h2>
              <p className="mb-3 text-center text-white">
                {t(
                  "Join us for 15 days of festive surprises! Unlock exclusive bonuses, free spins, and exciting offers from top online casinos - one new deal every day from December 15st to January 7th!"
                )}
              </p>
              <div className="w-full brand_carousel rounded-md flex justify-between items-center flex-wrap">
                {Array.from({ length: 24 }).map((_, index) => {
                  // locked (в будущем) или нет
                  const locked = isDayLocked(index);
                  // активирован?
                  const isActivated = activatedBrands.includes(index);
                  // строка вида "15 Dec", "16 Dec", "1 Jan"...
                  const dayLabel = formatAdventDate(index);

                  // Берём бренд из массива (если он там есть)
                  // Например, brands[0] будет для index=0 (15 Dec)
                  // brands[1] => 16 Dec и т.д.
                  const rowData = brands[index] || {};

                  // Определяем класс
                  let cardState;
                  if (isActivated) cardState = "activate";
                  else if (locked) cardState = "closed";
                  else cardState = "opened";

                  return (
                    <div
                      key={index}
                      className={`card-advent rounded-xl flex flex-col justify-between basis-[18%] relative mt-16 ${cardState}`}
                    >
                      <div className="dated">{dayLabel}</div>
                      <div className="mx-auto max-w-7xl flex flex-col w-full">
                        <div className="mx-auto max-w-2xl lg:mx-0 flex flex-row card-sl">
                          <div className="w-full">
                            {isActivated ? (
                              // День открыт (активирован)
                              <div className="flex flex-col items-center">
                                <Link
                                  className="mt-3 mb-2"
                                  href={`${rowData.GoBig || "#"}/${newUrl}&creative_id=Advent`}
                                  target="_blank"
                                >
                                  <Image
                                    src={`/brands/${rowData.CasinoBrand || "default"}.png`}
                                    alt={rowData.CasinoBrand || "Brand"}
                                    width={192}
                                    height={96}
                                    loading="lazy"
                                  />
                                </Link>
                                <p className="!m-0">
                                  {rowData.OurOfferContent || "Offer details..."}
                                </p>
                                <Link
                                  className="relative btn-play btn-blick overflow-hidden"
                                  href={`${rowData.GoBig || "#"}/${newUrl}&creative_id=Advent`}
                                  target="_blank"
                                >
                                  {t("Play Now")}
                                </Link>
                              </div>
                            ) : locked ? (
                              // Будущее
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
                            ) : (
                              // День наступил, но не активирован
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
