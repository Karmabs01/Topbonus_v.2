"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import useSWR from "swr";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/components/switcher/LanguageContext";

const BasicModal = () => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const TIMEOUT_DELAY = 10000; // 10 секунд
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
      "partner1050",

      "partner1044",
      "CLD_VIP",
      "partner1045_b1",
      "partner1046",
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
  const categoryBrands = { key1: "Video", key2: "friday" };

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
      const filteredByCategory = data.filter(
        (brand) => brand[categoryBrands.key1] === categoryBrands.key2
      );
      try {
        // Проверяем наличие данных брендов
        if (!data) {
          console.warn("Данные брендов отсутствуют");

          return;
        }

        // Если userId отсутствует, устанавливаем отфильтрованные бренды и завершаем
        if (!userId) {
          setBrands(filteredByCategory);
  
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

      } catch (error) {
        setBrands(filteredByCategory);
        console.error(
          "Ошибка при получении данных пользователя или брендов:",
          error
        );
  
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
                {t("Don’t Miss Out on Your")}{" "}
                <span>{t("Black Friday Fortune")}</span>
              </h2>
              <p className="custom-modal-description">
                <span>{t("Time’s running out!")}</span>
                <br />
                {t("Grab your exclusive casino deal before it disappears!")}
              </p>

              <div>
                {brands.length > 0 ? (
                  brands.slice(0, 3).map((rowData, index) => (
                    <Link
                      key={index} // Добавляем уникальный ключ для каждого элемента
                      className="mt-3 flex items-center card-pop"
                      // href={`${rowData.GoBig}/${newUrl}&creative_id=Black_Friday`}
                      href={`${rowData.GoBig}/${newUrl}&creative_id=Popup_BF`}
                      target="_blank"
                    >
                      <Image
                        src={`/brands/${rowData.CasinoBrand}.png`}
                        alt={rowData.CasinoBrand}
                        width={85}
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
        .custom-modal-link {
          display: inline-block;
          margin-top: 10px;
          padding: 10px 20px;
          background: #007bff;
          color: #fff;
          text-decoration: none;
          border-radius: 4px;
        }
        .custom-modal-link:hover {
          background: #0056b3;
        }
     
      `}</style>
    </>
  );
};

export default BasicModal;
