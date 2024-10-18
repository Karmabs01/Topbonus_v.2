"use client";
import { useState, useEffect, useMemo, useCallback } from "react";
import Loader from "../../Loader";
import { shuffle } from "lodash";
import Image from "next/image";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
import Card from "../../slider/Card";
import { useLanguage } from "../../switcher/LanguageContext";
import { getBrands } from "../../getBrands/getBrands2";
import { useTranslation } from "react-i18next";
import Slider from "react-slick";
import Pickup from "./pickup";
// import Timestamp from "./timestamp";

import "./styled.component.css";

const TopBrands = () => {
  const [newUrl, setNewUrl] = useState("");
  const [source, setSource] = useState("");
  const [loading, setLoading] = useState(true);
  const [brands, setBrands] = useState([]);
  const { language } = useLanguage();
  const { t } = useTranslation();

  // Настройки слайдера мемоизированы для предотвращения их пересоздания при каждом рендере
  const settings = useMemo(
    () => ({
      infinite: true,
      dots: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      autoplay: true,
      speed: 500,
      autoplaySpeed: 3000,
      cssEase: "linear",
      responsive: [
        {
          breakpoint: 767,
          settings: {
            dots: true,
          },
        },
      ],
    }),
    []
  );

  // Функция для установки URL и source на основе ключевого слова
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
    ];

    const setPartnerSource = (keyword) => {
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
    };

    if (currentKeyword) {
      setPartnerSource(currentKeyword);
    }

    const ad_campaign = localStorage.getItem("ad_campaign_id");

    const savedUrl = localStorage.getItem("savedUrl");
    if (savedUrl) {
      setNewUrl(savedUrl);
    }
  }, [language]);

  // Функция для получения и фильтрации брендов
  const fetchAllBrands = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getBrands(language); // Получение всех брендов
      console.log("Fetched data:", data);

      // Фильтрация брендов на основе полей Networks и High_hybrid
      const filteredBrands = data.filter((brand) => {
        return brand.Networks === "1" || brand.High_hybrid === "1";
      });

      console.log("Filtered brands:", filteredBrands);

      setBrands(filteredBrands);
    } catch (error) {
      console.error("Error fetching brands:", error);
    } finally {
      setLoading(false);
    }
  }, [language]);

  // Выполнение загрузки данных при изменении языка
  useEffect(() => {
    fetchAllBrands();
  }, [fetchAllBrands]);

  // Перемешивание брендов и создание карточек мемоизировано
  const shuffledBrands = useMemo(() => shuffle(brands), [brands]);

  const cards2 = useMemo(
    () =>
      shuffledBrands.slice(0, 6).map((brand) => ({
        key: uuidv4(),
        content: (
          <Card
            imagen={`/brands/${brand.CasinoBrand}.png`}
            link={brand.GoBig}
            bonus={brand.OurOfferContent}
          />
        ),
      })),
    [shuffledBrands]
  );

  // Управление эффектом затухания
  const [currentBrandIndex, setCurrentBrandIndex] = useState(0);
  const [fade, setFade] = useState(true);




  return (
    <div className="topbr-tw">
      <div className="main__container">
        {loading ? (
          <Loader />
        ) : (
          cards2 && (
            <div className="flex justify-between items-start md:flex-row lg:space-y-0 mob1">
              <div className="slider-left w-full md:w-2/3 mb-10 md:mb-2">
                <Slider {...settings}>
                  {brands.map((rowData, index) => (
                    <div
                      key={`${rowData.id_brand}-${index}`} // Используем уникальный идентификатор
                      className={`background-slider overflow-hidden bg-indigo-600 py-5 rounded-xl h-full flex flex-col justify-between ${
                        fade ? "fade-in" : "fade-out"
                      }`} // Применяем классы затухания
                    >
                      <div className="flex flex-col">
                        <div className="flex flex-row">
                          <div className="basis-3/3">
                            <Link
                              href={`${rowData.GoBig}/${newUrl}&creative_id=Top_Brand`}
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
                            <h3>{rowData.CasinoBrand}</h3>
                            <p className="p">{rowData.OurOfferContent}</p>
                            <div className="flex sm:mt-4 allbtn">
                              <Link
                                className="btnscale"
                                href={`${rowData.GoBig}/${newUrl}&creative_id=Top_Brand`}
                                target="_blank"
                              >
                                <div className="btn btn-new">
                                  <p>{t("Play Now")}</p>
                                </div>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
              {/* <Timestamp /> */}
              <Pickup newUrl={newUrl} />
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default TopBrands;
