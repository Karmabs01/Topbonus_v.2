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

// Пул из 9 желаемых брендов
const CUSTOM_BRANDS_POOL = [
  "Syndicate casino",
  "Mr.Bet",
  "XON",
  "SpiNight",
  "Winshark",
  "Viking Luck",
  "Lex",
  "Irwin",
  "Trueluck",
  "Allstarzcasino",
  "Gizbo",
  "Hitme.bet",
  "Novajackpot",
];

export default function Brands_carousel() {
  const [newUrl, setNewUrl] = useState("");
  const [source, setSource] = useState("");
  const [loading, setLoading] = useState(true);

  // Итоговый массив из 3 брендов (после всех фильтров и рандома)
  const [brands, setBrands] = useState([]);

  // Массив индексов активированных карточек за сегодня
  const [activatedCardIndices, setActivatedCardIndices] = useState([]);
  // Дата последней активации (сравним с «сегодня»)
  const [lastActivationDate, setLastActivationDate] = useState(null);
  // Массив названий брендов, которые сегодня активировали (чтобы их не исключать)
  const [activatedBrandsToday, setActivatedBrandsToday] = useState([]);

  const { language } = useLanguage();
  const { t } = useTranslation();

  // =============================================
  // Вспомогательная функция
  // =============================================
  const getTodayDateString = () => new Date().toISOString().split("T")[0];

  // ---------------------------------------------
  // 1) При первом рендере считываем из localStorage:
  //    lastActivationDate, activatedCardIndices, activatedBrandsToday
  // ---------------------------------------------
  useEffect(() => {
    const savedActivationDate = localStorage.getItem("lastActivationDate");
    const savedActivatedCards = localStorage.getItem("activatedCardIndices");
    const savedActivatedBrands = localStorage.getItem("activatedBrandsToday");
    const today = getTodayDateString();

    if (savedActivationDate === today) {
      setLastActivationDate(savedActivationDate);
      setActivatedCardIndices(
        savedActivatedCards ? JSON.parse(savedActivatedCards) : []
      );
      setActivatedBrandsToday(
        savedActivatedBrands ? JSON.parse(savedActivatedBrands) : []
      );
    } else {
      // Новый день — сбрасываем
      localStorage.removeItem("lastActivationDate");
      localStorage.removeItem("activatedCardIndices");
      localStorage.removeItem("activatedBrandsToday");
      setLastActivationDate(null);
      setActivatedCardIndices([]);
      setActivatedBrandsToday([]);
    }
  }, []);

  // ---------------------------------------------
  // 2) Очищаем URL, восстанавливаем newUrl
  // ---------------------------------------------
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

  // ---------------------------------------------
  // 3) SWR: получаем data (массив брендов)
  // ---------------------------------------------
  const { data, error } = useSWR(
    ["brands", language],
    () => getBrands(language),
    { initialData: [] }
  );

  // userId (для фильтрации по sales)
  let userId = "";
  if (typeof window !== "undefined") {
    userId = localStorage.getItem("user_id") || "";
  }

  // ---------------------------------------------
  // 4) Логика фильтрации и формирования финальных 3 брендов
  // ---------------------------------------------
  useEffect(() => {
    (async () => {
      try {
        if (!data || data.length === 0) {
          console.log("Данные брендов отсутствуют или data пустое:", data);
          setLoading(false);
          return;
        }

        console.log("Исходный массив data:", data);

        // --- Логика категорий
        const categoryBrands = { key1: "Video", key2: "Advent" };
        const categoryBrands2 = { key1: "Segment2", key2: "Premium" };

        // 1) Основная категория
        const mainCategoryData = data.filter(
          (rowData) => rowData[categoryBrands.key1] === categoryBrands.key2
        );
        // 2) Вторая категория
        const secondaryCategoryData = data.filter(
          (rowData) => rowData[categoryBrands2.key1] === categoryBrands2.key2
        );

        let finalFilteredBrands = [
          ...mainCategoryData,
          ...secondaryCategoryData,
        ];
        console.log("После категории (Advent + Premium):", finalFilteredBrands);

        // 3) Фильтруем по sales
        let salesCampaignIds = [];
        if (userId) {
          const dataUser = await getUserData(userId);
          let sales = dataUser?.sales;
          console.log("dataUser:", dataUser);

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
        console.log("После фильтра sales:", finalFilteredBrands);

        // 4) Если меньше 3, пытаемся добрать из data
        if (finalFilteredBrands.length < 3) {
          const needed = 3 - finalFilteredBrands.length;
          const usedBrands = new Set(
            finalFilteredBrands.map((b) => b.CasinoBrand)
          );
          let additional = data.filter((brand) => {
            const bName = brand.CasinoBrand || "";
            return (
              !usedBrands.has(bName) &&
              !salesCampaignIds.includes(brand.KeitaroGoBigID) &&
              !salesCampaignIds.includes(brand.KeitaroR2dID)
            );
          });
          if (additional.length > 0) {
            finalFilteredBrands = finalFilteredBrands.concat(
              additional.slice(0, needed)
            );
          }
        }
        console.log("После добора до 3 (если нужно):", finalFilteredBrands);

        // -------------------------------------------
        // Логика про "9 брендов" из CUSTOM_BRANDS_POOL
        // -------------------------------------------
        // A) Считываем excludedBrands
        let excludedArr = [];
        const excludedRaw = localStorage.getItem("excludedBrands");
        if (excludedRaw) {
          try {
            excludedArr = JSON.parse(excludedRaw);
          } catch (e) {
            excludedArr = [];
          }
        }
        console.log("excludedBrands из localStorage:", excludedArr);

        // B) Формируем объекты из 9 нужных названий
        let bigPool = CUSTOM_BRANDS_POOL.map((desiredName) => {
          let brandObj = finalFilteredBrands.find(
            (b) =>
              (b.CasinoBrand || "").toLowerCase() === desiredName.toLowerCase()
          );
          if (!brandObj) {
            brandObj = data.find(
              (b) =>
                (b.CasinoBrand || "").toLowerCase() ===
                desiredName.toLowerCase()
            );
          }
          if (!brandObj) {
            brandObj = {
              CasinoBrand: desiredName,
              GoBig: "#",
              OurOfferContent: "Special Offer",
            };
          }
          return brandObj;
        });
        console.log("Сформированный bigPool из 9:", bigPool);

        // C) Исключаем из bigPool бренды, которые в excludedArr (активировали в прошлом)
        bigPool = bigPool.filter((b) => {
          const bName = (b.CasinoBrand || "").toLowerCase();
          return !excludedArr.includes(bName);
        });
        console.log("bigPool после исключения прошлых:", bigPool);

        // D) Если сегодня уже активировали бренд(ы), принудительно добавляем их
        if (activatedBrandsToday && activatedBrandsToday.length > 0) {
          activatedBrandsToday.forEach((activeBrand) => {
            const lowerActive = activeBrand.toLowerCase();
            const isInPool = bigPool.some(
              (b) => (b.CasinoBrand || "").toLowerCase() === lowerActive
            );
            if (!isInPool) {
              let activeObj =
                data.find(
                  (b) => (b.CasinoBrand || "").toLowerCase() === lowerActive
                ) ||
                finalFilteredBrands.find(
                  (b) => (b.CasinoBrand || "").toLowerCase() === lowerActive
                );
              if (!activeObj) {
                activeObj = {
                  CasinoBrand: activeBrand,
                  GoBig: "#",
                  OurOfferContent: "Special Offer",
                };
              }
              bigPool.push(activeObj);
              console.log("Добавили активированный бренд:", activeObj);
            }
          });
        }
        console.log("bigPool после проверки сегодня-активированных:", bigPool);

        // E) Перемешиваем bigPool
        function shuffleArray(arr) {
          const array = [...arr];
          for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
          }
          return array;
        }
        let shuffled = shuffleArray(bigPool);
        console.log("shuffled bigPool:", shuffled);

        // F) Обрезаем до 9
        shuffled = shuffled.slice(0, 9);

        // G) Из shuffled берём первые 3 для отображения
        const finalThree = shuffled.slice(0, 3);
        console.log("Итоговые 3 бренда для рендера:", finalThree);

        setBrands(finalThree);
        setLoading(false);
      } catch (err) {
        console.error("Ошибка при получении данных:", err);
        setLoading(false);
      }
    })();
  }, [data, userId, activatedBrandsToday]);

  // ---------------------------------------------
  // 5) Обработка клика «Activate»
  // ---------------------------------------------
  const handleActivate = (index) => {
    const today = getTodayDateString();
    const currentActivated =
      lastActivationDate === today ? activatedCardIndices : [];
    if (currentActivated.length >= 3) {
      alert(t("You have already activated 3 cards today."));
      return;
    }
    if (currentActivated.includes(index)) {
      // Если карточка уже активирована, ничего не делаем
      return;
    }
    const newActivatedIndices = [...currentActivated, index];
    const brand = brands[index];
    const brandName = (brand?.CasinoBrand || "").trim();
    const newActivatedBrands =
      lastActivationDate === today
        ? [...activatedBrandsToday, brandName]
        : [brandName];

    setActivatedCardIndices(newActivatedIndices);
    setActivatedBrandsToday(newActivatedBrands);
    setLastActivationDate(today);

    localStorage.setItem(
      "activatedCardIndices",
      JSON.stringify(newActivatedIndices)
    );
    localStorage.setItem(
      "activatedBrandsToday",
      JSON.stringify(newActivatedBrands)
    );
    localStorage.setItem("lastActivationDate", today);

    // Обновляем excludedBrands, чтобы бренд не появился завтра
    let excludedRaw = localStorage.getItem("excludedBrands");
    let excludedArr = [];
    if (excludedRaw) {
      try {
        excludedArr = JSON.parse(excludedRaw);
      } catch {
        excludedArr = [];
      }
    }
    const lowerName = brandName.toLowerCase();
    if (!excludedArr.includes(lowerName)) {
      excludedArr.push(lowerName);
    }
    localStorage.setItem("excludedBrands", JSON.stringify(excludedArr));

    console.log(
      "Активировали бренд:",
      brandName,
      " => activatedIndices:",
      newActivatedIndices,
      " => excludedArr:",
      excludedArr
    );
  };

  // ---------------------------------------------
  // Рендер компонента
  // ---------------------------------------------
  return (
    <>
      <div id="advent" className="sm:mt-10 mt-5 mb-5 mob-mt10 advent mb-16">
        <div className="main__container advnt">
          {loading ? (
            <Loader />
          ) : (
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-white random-title mb-3 text-center">
                {t("triple")}
              </h2>
              <p className="mb-3 text-center text-white">
                {t(
                  "Fortune favors the bold! Open all three lucky windows and let the spirit of St. Patrick's Day bring you incredible rewards."
                )}
              </p>
              <div className="w-full brand_carousel rounded-md flex justify-between items-center flex-wrap mt-16">
                {brands.map((rowData, index) => {
                  const activatedToday =
                    lastActivationDate === getTodayDateString();
                  const isActivated =
                    activatedToday && activatedCardIndices.includes(index);
                  const totalActivated = activatedToday
                    ? activatedCardIndices.length
                    : 0;

                  return (
                    <div
                      key={index}
                      className={`card-advent rounded-xl flex flex-col justify-between basis-[32%] relative mt-16 ${
                        isActivated ? "activate" : "closed"
                      }`}
                    >
                      <div className="dated">{index + 1}</div>
                      <div className="mx-auto max-w-7xl flex flex-col w-full">
                        <div className="mx-auto max-w-2xl lg:mx-0 flex flex-row card-sl">
                          <div className="w-full">
                            {isActivated ? (
                              // Отображение открытой карточки
                              <div className="flex flex-col items-center">
                                <Link
                                  className="mt-3 mb-2"
                                  href={`${
                                    rowData.GoBig || "#"
                                  }/${newUrl}&creative_id=Everyday_Advent`}
                                  target="_blank"
                                >
                                  <Image
                                    src={`/brands/${
                                      rowData.CasinoBrand || "default"
                                    }.png`}
                                    alt={rowData.CasinoBrand || "Brand"}
                                    width={256}
                                    height={128}
                                    loading="lazy"
                                  />
                                </Link>
                                <p className="!m-0">
                                  {rowData.OurOfferContent ||
                                    "Offer details..."}
                                </p>
                                <Link
                                  className="relative btn-play btn-blick overflow-hidden"
                                  href={`${
                                    rowData.GoBig || "#"
                                  }/${newUrl}&creative_id=Everyday_Advent`}
                                  target="_blank"
                                >
                                  {t("Play Now")}
                                </Link>
                              </div>
                            ) : (
                              // Отображение закрытой карточки
                              <div className="flex flex-col items-center">
                                <div className="mt-3 mb-2 nonoact"></div>
                                {totalActivated >= 3 ? (
                                  <p className="!m-0 text-white">
                                    {t("You have activated 3 cards today")}
                                  </p>
                                ) : (
                                  <p className="!m-0">
                                    {t("Ready to Activate")}
                                  </p>
                                )}
                                {totalActivated >= 3 ? (
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
