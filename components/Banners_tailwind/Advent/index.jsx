"use client";
import { useState, useEffect } from "react";
import useSWR from "swr";
import Loader from "../../Loader";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "../../switcher/LanguageContext";
import { getBrands } from "../../getBrands/getBrands2";
import { useTranslation } from "react-i18next";
import Slider from "react-slick";
import "./styled.component.css";
import { getUserData } from "@/components/getUser/getUser";
import cs from "@/public/newimages/cs.png";
import star2 from "@/public/newimages/star2.png";

export default function Brands_carousel() {
  const [newUrl, setNewUrl] = useState("");
  const [source, setSource] = useState("");
  const [loading, setLoading] = useState(true);
  const [brands, setBrands] = useState([]);
  const [currentBrandIndex, setCurrentBrandIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [activatedBrands, setActivatedBrands] = useState([]);

  const { language } = useLanguage();
  const { t } = useTranslation();
  const categoryBrands = { key1: "Video", key2: "VIP" };
  const creative = "Advent";

  const today = new Date().getDate();

  // Восстанавливаем состояние activate из localStorage
  useEffect(() => {
    const savedActivatedBrands = localStorage.getItem("activatedBrands");
    if (savedActivatedBrands) {
      setActivatedBrands(JSON.parse(savedActivatedBrands));
    }
  }, []);

  // Сохраняем состояние activate в localStorage при каждом изменении
  useEffect(() => {
    if (activatedBrands.length > 0) {
      localStorage.setItem("activatedBrands", JSON.stringify(activatedBrands));
    }
  }, [activatedBrands]);

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

    const ad_campaign = localStorage.getItem("ad_campaign_id");

    const savedUrl = localStorage.getItem("savedUrl");
    if (savedUrl) {
      setNewUrl(savedUrl);
    }
  }, [language]);

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
      const filteredByCategory = data.filter(
        (brand) => brand[categoryBrands.key1] === categoryBrands.key2
      );
      try {
        if (!data) {
          console.warn("Данные брендов отсутствуют");
          setLoading(false);
          return;
        }

        if (!userId) {
          setBrands(filteredByCategory);
          setLoading(false);
          return;
        }

        const dataUser = await getUserData(userId);
        console.log("Полные данные пользователя:", dataUser);

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
          console.warn("Поле sales не является массивом:", sales);
          sales = [];
        }

        const salesCampaignIds = sales.map((sale) => sale.campaignId);

        const finalFilteredBrands = filteredByCategory.filter(
          (brand) =>
            !salesCampaignIds.includes(brand.KeitaroGoBigID) &&
            !salesCampaignIds.includes(brand.KeitaroR2dID)
        );

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

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentBrandIndex((prevIndex) => (prevIndex + 1) % brands.length);
        setFade(true);
      }, 500);
    }, 5000000);

    return () => clearInterval(interval);
  }, [brands.length]);

  const handleActivate = (index) => {
    if (index + 1 <= today && !activatedBrands.includes(index)) {
      setActivatedBrands((prev) => [...prev, index]);
    }
  };

  return (
    <>
      <div className="sm:mt-10 mt-5 mb-5 mob-mt10 advent mb-16">
        <div className="main__container">
          {loading ? (
            <Loader />
          ) : (
            <div>
              <div className="w-full brand_carousel rounded-md flex justify-between items-center flex-wrap">
                {brands.length > 0 &&
                  brands.slice(0, 15).map((rowData, index) => {
                    const isOpened = index + 1 <= today;
                    const isActivated = activatedBrands.includes(index);

                    return (
                      <div
                        key={index}
                        className={`rounded-xl flex flex-col justify-between basis-[18%] relative mt-16 ${
                          isOpened ? "opened" : "closed"
                        } ${isActivated ? "activate" : ""}`}
                      >
                        <div className="dated">{index + 1}</div>
                        <div className="mx-auto max-w-7xl flex flex-col w-full">
                          <div className="mx-auto max-w-2xl lg:mx-0 flex flex-row card-sl">
                            <div className="w-full">
                              {isActivated ? (
                                // Состояние, когда isActivated === true
                                <div className="flex flex-col items-center">
                                  <Link
                                    className="mt-3 mb-2"
                                    href={`${rowData.GoBig}/${newUrl}&creative_id=${creative}`}
                                    target="_blank"
                                  >
                                    <Image
                                      src={`/brands/${rowData.CasinoBrand}.png`}
                                      alt={rowData.CasinoBrand}
                                      width={192}
                                      height={96}
                                      loading="lazy"
                                    />
                                  </Link>
                                  <p className="!m-0">
                                    {rowData.OurOfferContent}
                                  </p>
                                  <Link
                                    className="relative btn-play btn-blick overflow-hidden"
                                    href={`${rowData.GoBig}/${newUrl}&creative_id=${creative}`}
                                    target="_blank"
                                  >
                                    {t("Play Now")}
                                  </Link>
                                </div>
                              ) : isOpened ? (
                                // Состояние, когда isOpened === true, но isActivated === false
                                <div className="flex flex-col items-center">
                                  <div className="mt-3 mb-2 opennow">
                                    <Image
                                      src={star2} // Путь к заглушке или альтернативному изображению
                                      alt="Placeholder"
                                      width={192}
                                      height={96}
                                      loading="lazy"
                                    />
                                  </div>
                                  <p className="!m-0">
                                    {t("Available to Activate")}
                                  </p>
                                  <button
                                    className="relative btn-play btn-blick overflow-hidden"
                                    onClick={() => handleActivate(index)}
                                  >
                                    {t("Activate")}
                                  </button>
                                </div>
                              ) : (
                                // Состояние, когда ни isActivated, ни isOpened не равны true
                                <div className="flex flex-col items-center">
                                  <div className="mt-3 mb-2">
                                    <Image
                                      src={cs} // Путь к заглушке или альтернативному изображению
                                      alt="Placeholder"
                                      width={192}
                                      height={96}
                                      loading="lazy"
                                    />
                                  </div>
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
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
