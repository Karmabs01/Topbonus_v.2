"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { shuffle } from "lodash";
import { useLanguage } from "../../switcher/LanguageContext";
import { getBrands } from "../../getBrands/getBrands2";
import { useTranslation } from "react-i18next";
import useSWR from "swr";
import hearts from "@/public/newimages/hearts_box.png";

import "./styled.component.css";

const GamePage = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [winResult, setWinResult] = useState(null);
  const [newUrl, setNewUrl] = useState("");
  const [source, setSource] = useState("");

  const [brands, setBrands] = useState([]);
  const { language } = useLanguage();
  const { t } = useTranslation();

  const categoryBrands = { key1: "PremiumChoice", key2: "Love" };
  const { data, error } = useSWR(
    ["brands", language],
    () => getBrands(language),
    { fallbackData: brands }
  );
  let userId = "";
  if (typeof window !== "undefined") {
    userId = localStorage.getItem("user_id") || "";
  }
  useEffect(() => {
    // 1. Фильтрация брендов на основе категорий
    const filteredByCategory = data.filter(
      (brand) => brand[categoryBrands.key1] === categoryBrands.key2
    );
    const fetchUserBrands = async () => {
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
        setBrands(filteredByCategory);
        console.error(
          "Ошибка при получении данных пользователя или брендов:",
          error
        );
        setLoading(false);
      }
    };

    fetchUserBrands();
  }, [data, userId, categoryBrands.key1, categoryBrands.key2]);
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
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data && event.data.event === "spinComplete") {
        setWinResult(event.data.prize);
        // Перемешиваем текущий массив брендов
        setBrands((currentBrands) => shuffle(currentBrands));
        setModalVisible(true);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return (
    <div className="main__container flex items-center wheel">
      <div id="wheel_love"  className="left flex flex-col w-1/2">
        <h3 className="mb-5">
          <span>{t("Cupid Spins")}</span> {t("Your Fortune!")}
        </h3>
        <p>
          {t(
            "The Wheel of Love will decide your fate! Give it a spin and discover which casino brand is your true match. Will luck be your Valentine this year?"
          )}
        </p>
        <Image
          src={hearts}
          alt="Hearts"
          width={350}
          height={88}
          loading="lazy"
        />
      </div>
      <div className="iframeb">
        <iframe
          src="/game/index.html"
          width="100%"
          height="100%"
          style={{ border: "none", display: "block" }}
        />
      </div>

      {modalVisible && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
        >
          <div className="custom-modal-overlay">
            <div className="custom-modal">
              <button
                className="custom-modal-close"
                onClick={() => setModalVisible(false)}
                aria-label="Close modal"
              >
                ×
              </button>
              <h3>
                {t("A Special")} <span>{t("Valentine’s Bonus")}</span>
              </h3>
              {brands.length > 0 &&
                brands.slice(0, 1).map((rowData, index) => (
                  // <p className="p">{t("Click below to claim your magical reward!")}</p>
                  <div className="flex flex-col items-center">
                    <div className="img-wrap">
                      <Link
                        href={`${rowData.GoBig}/${newUrl}&creative_id=Popup_SV`}
                        target="_blank"
                      >
                        <Image
                          src={`/brands/${rowData.CasinoBrand}.png`}
                          alt={rowData.CasinoBrand}
                          width={150}
                          height={75}
                          loading="lazy"
                          className="target-top-new-releases"
                        />
                      </Link>
                    </div>
                    <p className="p">{rowData.OurOfferContent}</p>
                    <Link
                      className="btn btn-new"
                      href={`${rowData.GoBig}/${newUrl}&creative_id=Popup_SV`}
                      target="_blank"
                    >
                      <p>{t("Play Now")}</p>
                    </Link>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GamePage;
