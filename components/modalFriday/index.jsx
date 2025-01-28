"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import useSWR from "swr";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/components/switcher/LanguageContext";

function shuffleArray(array) {
  // Алгоритм Фишера–Йетса
  let currentIndex = array.length,
    randomIndex;

  // Пока остаются элементы для перемешивания...
  while (currentIndex !== 0) {
    // Выбираем случайный индекс
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // И меняем его местами с текущим элементом
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

const BasicModal = () => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const TIMEOUT_DELAY = 5000; // 5 секунд
  const { language } = useLanguage();
  const [newUrl, setNewUrl] = useState("");

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
      "partner1050",
      "partner1049",
      "partner1047",
    ];

    function setPartnerSource(keyword) {
      const partner = partners.find((p) => keyword.includes(p));
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

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0]; // Текущая дата
    const lastShownDate = localStorage.getItem("modalShownDate");

    if (lastShownDate !== today) {
      const timeoutId = setTimeout(() => {
        setOpen(true);
        localStorage.setItem("modalShownDate", today); // Сохранение даты показа
      }, TIMEOUT_DELAY);

      return () => clearTimeout(timeoutId); // Очистка таймера
    }
  }, []);

  const handleClose = () => setOpen(false);

  const [brands, setBrands] = useState([]);
  const categoryBrands = { key1: "Hottest", key2: "50" };

  const { data, error } = useSWR(["brands", language], () => getBrands(language), {
    initialData: brands,
  });

  let userId = "";
  if (typeof window !== "undefined") {
    userId = localStorage.getItem("user_id") || "";
  }

  useEffect(() => {
    const fetchUserBrands = async () => {
      // Проверяем, что вообще есть данные
      if (!data) {
        console.warn("Данные брендов отсутствуют");
        return;
      }

      // 1. Фильтруем бренды по категории (Hottest=50)
      const filteredByCategory = data.filter(
        (brand) => brand[categoryBrands.key1] === categoryBrands.key2
      );

      try {
        if (!userId) {
          // Если userId нет, просто перемешиваем и устанавливаем
          const shuffled = shuffleArray([...filteredByCategory]);
          setBrands(shuffled);
          return;
        }

        // 2. Получаем данные пользователя
        const dataUser = await getUserData(userId);
        console.log("Полные данные пользователя:", dataUser);

        let sales = dataUser.sales;
        // Если sales — строка, парсим JSON
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

        // 4. Исключаем бренды, у которых KeitaroGoBigID / KeitaroR2dID совпадает с campaignId
        const finalFilteredBrands = filteredByCategory.filter(
          (brand) =>
            !salesCampaignIds.includes(brand.KeitaroGoBigID) &&
            !salesCampaignIds.includes(brand.KeitaroR2dID)
        );
        console.log("Отфильтрованные бренды:", finalFilteredBrands);

        // 5. Перемешиваем массив и устанавливаем
        const shuffled = shuffleArray([...finalFilteredBrands]);
        setBrands(shuffled);
      } catch (error) {
        // Если вдруг ошибка при получении данных пользователя, показываем хоть что-то
        const shuffled = shuffleArray([...filteredByCategory]);
        setBrands(shuffled);
        console.error("Ошибка при получении данных пользователя:", error);
      }
    };

    fetchUserBrands();
  }, [data, userId, categoryBrands.key1, categoryBrands.key2]);

  return (
    <>
      {open && brands.length > 0 ? (
        <div className="custom-modal-overlay">
          <div className="custom-modal">
            <button
              className="custom-modal-close"
              onClick={handleClose}
              aria-label="Close modal"
            >
              ×
            </button>
            <div className="custom-modal-content">
              <h2 className="custom-modal-title">
                {t("Unlock Your Exclusive")} <span>{t("Casino Surprise")}</span>
              </h2>
              <p className="custom-modal-description">
                <span>{t("Top brands have been chosen for you!")}</span>
                <br />
                {t("Don’t miss your chance to check it out.")}
              </p>

              <div>
                {brands.length > 0 ? (
                  // Берём только первый бренд из перемешанного массива
                  brands.slice(0, 1).map((rowData, index) => (
                    <Link
                      key={index}
                      className="mt-3 flex items-center card-pop flex-col"
                      href={`${rowData.GoBig}/${newUrl}&creative_id=Popup_BF`}
                      target="_blank"
                    >
                      <Image
                        src={`/brands/${rowData.CasinoBrand}.png`}
                        alt={rowData.CasinoBrand}
                        width={150}
                        height={44}
                        loading="lazy"
                      />
                      <p className="mt-1 text-sm text-gray-500 h-10 mw-163">
                        {rowData.OurOfferContent}
                      </p>
                      <div className="btn-crd btn-crd-pop">
                        <div className="relative flex items-center justify-center px-8 py-2 text-lg font-medium rounded-full text-white btn-blick overflow-hidden">
                          {t("Play Now")}
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <p className="no-brands">{t("No brands available")}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}

      <style jsx>{`
        .custom-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
        .custom-modal {
          border-radius: 8px;
          width: 400px;
          padding: 10px 20px;
          position: relative;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          text-align: center;
          background: url(/newimages/black.png) no-repeat center;
          min-height: 337px;
        }
        .custom-modal-close {
          position: absolute;
          top: -26px;
          right: 27px;
          background: none;
          border: none;
          font-size: 30px;
          cursor: pointer;
          z-index: 9;
          color: #fff !important;
          background: #fee000;
          padding: 3px 5px;
          border-radius: 2px 2px 0 0;
        }
        .custom-modal-content {
          margin-top: 0px;
        }
        .custom-modal-title {
          font-size: 17px;
          line-height: 22px !important;
          padding: 10px 0;
          margin-bottom: 10px;
          font-weight: bold;
          background: rgba(255, 255, 255, 0.1);
          color: #fff;
        }
        .custom-modal-title span {
          color: #fee000;
        }
        .custom-modal-description {
          font-size: 14px;
          color: #fff !important;
          margin-bottom: 5px;
          font-style: italic;
        }
        .custom-modal-description span {
          color: #fee000 !important;
        }
        .no-brands {
          color: #fff !important;
        }
      `}</style>
    </>
  );
};

export default BasicModal;
