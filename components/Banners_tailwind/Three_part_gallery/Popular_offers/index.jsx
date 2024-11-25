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
import Slider from "react-slick";
import refetch from "@/public/refetch.png";
import "./styled.component.css";
import { getUserData } from "@/components/getUser/getUser";

export default function Popular_offers() {
  const [newUrl, setNewUrl] = useState("");
  const [source, setSource] = useState("");
  const [loading, setLoading] = useState(true);
  const [brands, setBrands] = useState([]);
  const [brands2, setBrands2] = useState([]);

  const { language } = useLanguage();
  const { t } = useTranslation();

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    autoplaySpeed: 2000,
    arrows: true,
    slidesToShow: 2,
    slidesToScroll: 2,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          dots: false,
        },
      },
      {
        breakpoint: 420,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: false,
        },
      },
    ],
  };

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


  const categoryBrands0 = { key1: "Networks", key2: "Premium" };

 

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
        brand[categoryBrands0.key1] === categoryBrands0.key2 
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
    categoryBrands0.key1, 
    categoryBrands0.key2
  ]);
  
  
  

  

  const refetchBrands = () => {
    const shuffled = shuffle(brands);
    setBrands(shuffled); // Перемешиваем и обновляем состояние с брендами
  };

  const shuffledBrands = shuffle(brands);


  const cards2 = shuffledBrands.slice(0, 6).map((brand) => ({
    key: uuidv4(),
    content: (
      <Card
        imagen={`/brands/${brand.CasinoBrand}.png`}
        link={brand.GoBig}
        bonus={brand.OurOfferContent}
      />
    ),
  }));

 

  return (
    <>
      <div className="popular-offers">
        <div className="main__container">
          {loading ? (
            <Loader />
          ) : (
            cards2 && (
              <div className="w-full">
             
                <div className="flex justify-between mt-16">
                  <h2 className="text-3xl font-bold tracking-tight text-white random-title mmm-none">
                    {t("POPULAR")} <span>{t("offers")}</span>
                  </h2>
                  <button
                    className="refetch"
                    onClick={refetchBrands} // Обработчик клика
                  >
                    <Image
                      src={refetch}
                      alt="refetch"
                      width={40}
                      loading="lazy"
                    />
                  </button>
                </div>
                <div className="mx-auto max-w-2xl px-4 lg:max-w-7xl lg:px-8 hidden md:inline">
                  <div className="cards-thr">
                    {shuffledBrands.slice(0, 6).map((rowData, index) => (
                      <div key={"Popular_offers" + index} className="card-thr">
                        <div className="relative">
                          <div className="relative flex align-center justify-center">
                            <Link
                              href={`${rowData.GoBig}/${newUrl}&creative_id=Popular_Offers_2`}
                              target="_blank"
                            >
                              <Image
                                src={`/brands/${rowData.CasinoBrand}.png`}
                                alt={rowData.CasinoBrand}
                                width={190}
                                height={130}
                                loading="lazy"
                                className=" w-full object-contain object-center"
                              />
                            </Link>
                          </div>
                          <div className="relative mt-4 text-center">
                            <h3 className="text-lg font-semibold text-gray-900">
                              {rowData.CasinoBrand}
                            </h3>
                            <p className="mt-1 text-sm text-gray-500 h-10">
                              {rowData.OurOfferContent}
                            </p>
                          </div>
                        </div>
                        <div className="btn-crd">
                          <Link
                            href={`${rowData.GoBig}/${newUrl}&creative_id=Popular_Offers_2`}
                            target="_blank"
                            className="relative flex items-center justify-center px-8 py-2 text-lg font-medium rounded-full text-white btn-blick overflow-hidden"
                          >
                            {t("Play Now")}
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="md:hidden w-full mob-sl">
                  <div className="cards-th !mt-0 mmb-1">
                    <h2 className="text-3xl font-bold tracking-tight text-white random-title mt-3 mb-3 ">
                    {t("POPULAR")} <span>{t("offers")}</span>
                  </h2>
                    <Slider {...settings}>
                      {shuffledBrands.map((rowData, index) => (
                        <div key={index} className="overflow-hidden card-thr">
                          <div className="pm10">
                            <div className="imgp">
                              <Link
                                target="_blank"
                                href={`${rowData.GoBig}/${newUrl}&creative_id=Popular_Offers_2`}
                              >
                                <Image
                                  src={`/brands/${rowData.CasinoBrand}.png`}
                                  alt={rowData.CasinoBrand}
                                  width={100}
                                  height={100}
                                  loading="lazy"
                                  className="w-full object-contain object-center"
                                />
                              </Link>
                            </div>
                            <div className="mt-4 text-center">
                              <h3 className="text-lg font-semibold text-gray-900">
                                {rowData.CasinoBrand}
                              </h3>
                              <p className="mt-1 text-sm ">
                                {rowData.OurOfferContent}
                              </p>
                            </div>
                          </div>
                          <div className="mt-6">
                            <Link
                              href={`${rowData.GoBig}/${newUrl}&creative_id=Popular_Offers_2`}
                              target="_blank"
                              className=" flex items-center justify-center text-white btn-crd"
                            >
                              {t("Play Now")}
                            </Link>
                          </div>
                        </div>
                      ))}
                    </Slider>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
}
