"use client";
import { useState, useEffect } from "react";
import useSWR from "swr";
import Loader from "../../Loader";
import { shuffle } from "lodash";
import Image from "next/image";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
import Card from "../../slider/Card";
import { useLanguage } from "../../switcher/LanguageContext";
import { getBrands } from "../../getBrands/getBrands2";
import { useTranslation } from "react-i18next";
import "./styled.component.css";

export default function Brands_double_carousel() {
  const [newUrl, setNewUrl] = useState("");
  const [source, setSource] = useState("");
  const [loading, setLoading] = useState(true);
  const [brands, setBrands] = useState([]);
  const [currentBrandIndex, setCurrentBrandIndex] = useState(0);
  const [fade, setFade] = useState(true); // State to manage fade effect
  const { language } = useLanguage();
  const { t } = useTranslation();

  useEffect(() => {
    // Обновляем URL, удаляем параметры и устанавливаем source на основе localStorage
    const currentUrl = window.location.href;
    const indexOfQuestionMark = currentUrl.indexOf("?");
    const newUrl2 =
      indexOfQuestionMark !== -1
        ? currentUrl.substring(0, indexOfQuestionMark)
        : currentUrl;
    window.history.replaceState({}, document.title, newUrl2);

    // Работа с URL и localStorage для определения source
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
    ];

    function setPartnerSource(keyword) {
      const partner = partners.find((p) => keyword.includes(p));
      if (partner) {
        localStorage.setItem("source", partner);
        setSource(partner);
        searchParams.set("source", partner);
      } else {
        setSource("0");
        // Получаем текущий источник и проверяем, не является ли он одним из допустимых партнеров
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

  const categoryBrands = { key1: "High_hybrid", key2: "1" };

  const { data, error } = useSWR(
    ["brands", language],
    () => getBrands(language),
    { initialData: brands }
  );

  useEffect(() => {
    if (data) {
      const filteredData1 = data.filter(
        (rowData) => rowData[categoryBrands.key1] === categoryBrands.key2
      );

      // Фильтрация по второму столбцу (добавьте нужные ключи)
      const filteredData2 = data.filter(
        (rowData) => rowData["Networks"] === "1"
      );

      // Объединение данных из двух фильтраций
      const combinedData = [...filteredData1, ...filteredData2];

      setBrands(shuffle(combinedData));
      setLoading(false);
    }
  }, [data, categoryBrands.key1, categoryBrands.key2]);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // Start fade-out
      setTimeout(() => {
        setCurrentBrandIndex((prevIndex) => (prevIndex + 1) % brands.length);
        setFade(true); // Start fade-in
      }, 500); // Duration of fade-out effect
    }, 5000000); // Change brand every 5 seconds

    return () => clearInterval(interval);
  }, [brands.length]);

  const firstCut = brands.length / 2 / 2;
  const secondCut = brands.length / 2;
  const thirdCut = firstCut + secondCut;
  const end = brands.length - 1;

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        brands.length > 0 && (
          <div className="brands_rows pt-10">
            <div className="main__container relative mt-8">
              <div className="background-slider2 absolute">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1250"
                  height="559"
                  viewBox="0 0 1250 559"
                  fill="none"
                >
                  <g filter="url(#filter0_d_96_3790)">
                    <path
                      d="M1225 480C1225 507.614 1202.61 530 1175 530L75 530C47.3857 530 25 507.614 25 480L25 223.395C25 195.781 47.3857 173.395 75 173.395L700.918 173.395C728.533 173.395 750.918 151.009 750.918 123.395L750.918 70.9999C750.918 43.3857 773.304 20.9999 800.918 20.9999L1175 20.9999C1202.61 20.9999 1225 43.3857 1225 70.9999L1225 480Z"
                      fill="url(#paint0_linear_96_3790)"
                    />
                  </g>
                  <defs>
                    <filter
                      id="filter0_d_96_3790"
                      x="0"
                      y="0"
                      width="1250"
                      height="559"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset dy="4" />
                      <feGaussianBlur stdDeviation="12.5" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.13 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_96_3790"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_96_3790"
                        result="shape"
                      />
                    </filter>
                    <linearGradient
                      id="paint0_linear_96_3790"
                      x1="1225"
                      y1="530"
                      x2="1122.82"
                      y2="-154.575"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#088AF6" />
                      <stop offset="1" stop-color="#D992E6" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div className="flex flex-col md:flex-row lg:space-y-0 lg:items-stretch justify-between">
                <div className="w-full md:w-1/2 mr-2">
                  <div className="mx-auto max-w-2xl pb-5 pt-5 sm:pb-5 lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8">
                    <div className="">
                      <h2 className="mt-4">
                        {t("Best Payout")}
                        <span> {t("Casinos")}</span>
                      </h2>
                      <h3>{t("Best payout casinos")}</h3>
                      <p className="mt-4 text-gray-500">
                        {t(
                          "Enjoy high returns, fast withdrawals, and unbeatable odds. Ready to win big? Dive in now!"
                        )}
                      </p>
                    </div>
                  </div>
                </div>
                {brands.length > 10 && (
                  <div className=" md:w-1/2 ml-2">
                    {brands.length > 0 && (
                      <div className="background overflow-hidden rounded-xl h-full flex justify-end items-end mt-5">
                        <div className="wrap">
                          <div className="items-wrap">
                            <div className="items marquee">
                              {brands
                                .slice(0, firstCut)
                                .map((rowData, index) => (
                                  <div className="item">
                                    <Link
                                      className=""
                                      href={`${rowData.GoBig}/${newUrl}&creative_id=Best_Payout`}
                                      target="_blank"
                                    >
                                      <Image
                                        src={`/brands/${rowData.CasinoBrand}.png`}
                                        alt={rowData.CasinoBrand}
                                        width={300}
                                        height={100}
                                        loading="lazy"
                                        className="target-top-new-releases"
                                      />
                                    </Link>
                                  </div>
                                ))}
                            </div>
                            <div aria-hidden="true" class="items marquee">
                              {brands
                                .slice(0, firstCut)
                                .map((rowData, index) => (
                                  <div className="item">
                                    <Link
                                      className=""
                                      href={`${rowData.GoBig}/${newUrl}&creative_id=Best_Payout`}
                                      target="_blank"
                                    >
                                      <Image
                                        src={`/brands/${rowData.CasinoBrand}.png`}
                                        alt={rowData.CasinoBrand}
                                        width={300}
                                        height={100}
                                        loading="lazy"
                                        className="target-top-new-releases"
                                      />
                                    </Link>
                                  </div>
                                ))}
                            </div>
                          </div>
                          <div class="items-wrap">
                            <div class="items marquee reverce">
                              {brands
                                .slice(firstCut, secondCut)
                                .map((rowData, index) => (
                                  <div className="item">
                                    <Link
                                      className=""
                                      href={`${rowData.GoBig}/${newUrl}&creative_id=Best_Payout`}
                                      target="_blank"
                                    >
                                      <Image
                                        src={`/brands/${rowData.CasinoBrand}.png`}
                                        alt={rowData.CasinoBrand}
                                        width={300}
                                        height={100}
                                        loading="lazy"
                                        className="target-top-new-releases"
                                      />
                                    </Link>
                                  </div>
                                ))}
                            </div>
                            <div
                              aria-hidden="true"
                              class="items marquee reverce"
                            >
                              {brands
                                .slice(firstCut, secondCut)
                                .map((rowData, index) => (
                                  <div className="item">
                                    <Link
                                      className=""
                                      href={`${rowData.GoBig}/${newUrl}&creative_id=Best_Payout`}
                                      target="_blank"
                                    >
                                      <Image
                                        src={`/brands/${rowData.CasinoBrand}.png`}
                                        alt={rowData.CasinoBrand}
                                        width={300}
                                        height={100}
                                        loading="lazy"
                                        className="target-top-new-releases"
                                      />
                                    </Link>
                                  </div>
                                ))}
                            </div>
                          </div>
                          <div className="items-wrap">
                            <div className="items marquee">
                              {brands
                                .slice(secondCut, thirdCut)
                                .map((rowData, index) => (
                                  <div className="item">
                                    <Link
                                      className=""
                                      href={`${rowData.GoBig}/${newUrl}&creative_id=Best_Payout`}
                                      target="_blank"
                                    >
                                      <Image
                                        src={`/brands/${rowData.CasinoBrand}.png`}
                                        alt={rowData.CasinoBrand}
                                        width={300}
                                        height={100}
                                        loading="lazy"
                                        className="target-top-new-releases"
                                      />
                                    </Link>
                                  </div>
                                ))}
                            </div>
                            <div aria-hidden="true" class="items marquee">
                              {brands
                                .slice(secondCut, thirdCut)
                                .map((rowData, index) => (
                                  <div className="item">
                                    <Link
                                      className=""
                                      href={`${rowData.GoBig}/${newUrl}&creative_id=Best_Payout`}
                                      target="_blank"
                                    >
                                      <Image
                                        src={`/brands/${rowData.CasinoBrand}.png`}
                                        alt={rowData.CasinoBrand}
                                        width={300}
                                        height={100}
                                        loading="lazy"
                                        className="target-top-new-releases"
                                      />
                                    </Link>
                                  </div>
                                ))}
                            </div>
                          </div>
                          <div class="items-wrap">
                            <div class="items marquee reverce">
                              {brands
                                .slice(thirdCut, end)
                                .map((rowData, index) => (
                                  <div className="item">
                                    <Link
                                      className=""
                                      href={`${rowData.GoBig}/${newUrl}&creative_id=Best_Payout`}
                                      target="_blank"
                                    >
                                      <Image
                                        src={`/brands/${rowData.CasinoBrand}.png`}
                                        alt={rowData.CasinoBrand}
                                        width={300}
                                        height={100}
                                        loading="lazy"
                                        className="target-top-new-releases"
                                      />
                                    </Link>
                                  </div>
                                ))}
                            </div>
                            <div
                              aria-hidden="true"
                              class="items marquee reverce"
                            >
                              {brands
                                .slice(thirdCut, end)
                                .map((rowData, index) => (
                                  <div className="item">
                                    <Link
                                      className=""
                                      href={`${rowData.GoBig}/${newUrl}&creative_id=Best_Payout`}
                                      target="_blank"
                                    >
                                      <Image
                                        src={`/brands/${rowData.CasinoBrand}.png`}
                                        alt={rowData.CasinoBrand}
                                        width={300}
                                        height={100}
                                        loading="lazy"
                                        className="target-top-new-releases"
                                      />
                                    </Link>
                                  </div>
                                ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {brands.length <= 10 && (
                  <div className=" md:w-1/2 ml-2">
                    <div className="background overflow-hidden rounded-xl h-full flex justify-end items-end sm:mt-20">
                      <div className="wrap h-full flex items-end justify-center flex-col">
                        <div className="items-wrap">
                          <div className="grid grid-cols-3 gap-4 z-30 ">
                            {brands.slice(0, 9).map((rowData, index) => (
                              <div className="item2">
                                <Link
                                  className=""
                                  href={`${rowData.GoBig}/${newUrl}&creative_id=Best_Payout`}
                                  target="_blank"
                                >
                                  <Image
                                    src={`/brands/${rowData.CasinoBrand}.png`}
                                    alt={rowData.CasinoBrand}
                                    width={300}
                                    height={100}
                                    loading="lazy"
                                    className="target-top-new-releases"
                                  />
                                </Link>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
}
