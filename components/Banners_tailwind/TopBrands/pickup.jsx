"use client";
import { useState, useEffect } from "react";
import useSWR from "swr";
import { useLanguage } from "../../switcher/LanguageContext";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import Link from "next/link";
import { getUserData } from "@/components/getUser/getUser";
import { getBrands } from "../../getBrands/getBrands2"; // Если требуется импорт

export default function Pickup({ newUrl, data: propData = [] }) {
  const [loading, setLoading] = useState(true);
  const [brands, setBrands] = useState([]);
  const { language } = useLanguage();
  const { t } = useTranslation();

  // Категория для фильтрации брендов в данном компоненте
  const categoryBrands = { key1: "Trendsetting", key2: "4" };

  // Переименовываем данные из SWR в swrData, чтобы не затирать prop data
  const { data: swrData, error } = useSWR(
    ["brands", language],
    () => getBrands(language),
    { initialData: brands }
  );

  let userId = "";
  if (typeof window !== "undefined") {
    userId = localStorage.getItem("user_id") || "";
  }

  useEffect(() => {
    // Если данных из SWR ещё нет, выходим
    if (!swrData) {
      console.warn("Данные брендов отсутствуют");
      setLoading(false);
      return;
    }

    // Фильтруем бренды по нужной категории
    const filteredByCategory = swrData.filter(
      (brand) => brand[categoryBrands.key1] === categoryBrands.key2
    );

    const fetchUserBrands = async () => {
      try {
        // Если userId отсутствует, сразу устанавливаем отфильтрованные бренды
        if (!userId) {
          setBrands(filteredByCategory);
          setLoading(false);
          return;
        }

        // Получаем данные пользователя
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

        // Если sales не массив, приводим к массиву
        if (!Array.isArray(sales)) {
          console.warn("Поле sales не является массивом:", sales);
          sales = [];
        }

        // Извлекаем campaignId из sales
        const salesCampaignIds = sales.map((sale) => sale.campaignId);
        console.log("Sales Campaign IDs:", salesCampaignIds);

        // Исключаем бренды, у которых KeitaroGoBigID или KeitaroR2dID совпадают с campaignId
        const finalFilteredBrands = filteredByCategory.filter(
          (brand) =>
            !salesCampaignIds.includes(brand.KeitaroGoBigID) &&
            !salesCampaignIds.includes(brand.KeitaroR2dID)
        );

        console.log("Отфильтрованные бренды:", finalFilteredBrands);
        setBrands(finalFilteredBrands);
        setLoading(false);
      } catch (error) {
        console.error(
          "Ошибка при получении данных пользователя или брендов:",
          error
        );
        setBrands(filteredByCategory);
        setLoading(false);
      }
    };

    fetchUserBrands();
  }, [swrData, userId, categoryBrands.key1, categoryBrands.key2]);

  return (
    <div className="flex items-center justify-end jins w-full">
      <div id="thrdjin" className="thrdjin">
        <h5 className="h5">{t("TOP RATED CRYPTO CASINOS")}</h5>
        {brands.length > 0 &&
          brands.slice(0, 3).map((rowData, index) => (
            <div className="w-full" key={index}>
              <div className="img-wrap flex items-center w-full">
                <Link
                  href={`${rowData.GoBig}/${newUrl}&creative_id=Premium_Choice_2`}
                  target="_blank"
                >
                  <Image
                    src={`/brands/${rowData.CasinoBrand}.png`}
                    alt={rowData.CasinoBrand}
                    width={100}
                    height={50}
                    loading="lazy"
                    className="target-top-new-releases"
                  />
                </Link>
                <p className="p">{rowData.OurOfferContent}</p>
                <Link
                  className="btnscale btn btn-new !absolute right-0"
                  href={`${rowData.GoBig}/${newUrl}&creative_id=Premium_Choice_2`}
                  target="_blank"
                >
                  <p>{t("Play Now")}</p>
                </Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
