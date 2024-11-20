"use client";
import { useState, useEffect } from "react";
import useSWR from "swr";
import { useLanguage } from "../../switcher/LanguageContext";
import { useTranslation } from "react-i18next";
import { shuffle } from "lodash";
import Image from "next/image";
import Link from "next/link";
import { getUserData } from "@/components/getUser/getUser";


export default function Pickup({ newUrl }) {
  const [loading, setLoading] = useState(true);
  const [brands, setBrands] = useState([]);
  const { language } = useLanguage();
  const { t } = useTranslation();

  const categoryBrands = { key1: "PremiumChoice", key2: "1" };
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
    // 1. Фильтрация брендов на основе категорий
    const filteredByCategory = data.filter((brand) =>
      brand[categoryBrands.key1] === categoryBrands.key2
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



  return (
    <>
      <div className="flex items-center justify-end jins w-full">
        <div className="thrdjin">
          <h5 className="h5">{t("Black Friday’s Premium Pic")}</h5>
          {brands.length > 0 &&
            brands.slice(0, 1).map((rowData, index) => (
              // <p className="p">{t("Click below to claim your magical reward!")}</p>
              <div>
                <div className="img-wrap">
                  <Link
                    href={`${rowData.GoBig}/${newUrl}&creative_id=Premium_Choice_2`}
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
                  className="btnscale btn btn-new"
                  href={`${rowData.GoBig}/${newUrl}&creative_id=Premium_Choice_2`}
                  target="_blank"
                >

                  <p>{t("Play Now")}</p>

                </Link>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
