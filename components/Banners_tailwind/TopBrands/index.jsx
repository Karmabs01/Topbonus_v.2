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
import useSWR from "swr";

import "./styled.component.css";

const TopBrands = () => {
  const [newUrl, setNewUrl] = useState("");
  const [source, setSource] = useState("");
  const [loading, setLoading] = useState(true);
  const [brands, setBrands] = useState([]);
  const { language } = useLanguage();
  const { t } = useTranslation();

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

  useEffect(() => {
    console.log("useEffect [language] triggered with language:", language);
    const currentUrl = window.location.href;
    console.log("Current URL:", currentUrl);
    const indexOfQuestionMark = currentUrl.indexOf("?");
    const newUrl2 =
      indexOfQuestionMark !== -1
        ? currentUrl.substring(0, indexOfQuestionMark)
        : currentUrl;
    console.log("New URL after removing query params:", newUrl2);
    window.history.replaceState({}, document.title, newUrl2);

    const urlObj = new URL(currentUrl);
    const searchParams = new URLSearchParams(urlObj.search);
    searchParams.delete("brand");
    const currentKeyword = searchParams.get("keyword");
    console.log("Current keyword:", currentKeyword);

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
        console.log("Partner found:", partner);
        localStorage.setItem("source", partner);
        setSource(partner);
        searchParams.set("source", partner);
      } else {
        console.log("No partner found, setting source to 0");
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
    console.log("Ad campaign ID from localStorage:", ad_campaign);

    const savedUrl = localStorage.getItem("savedUrl");
    console.log("Saved URL from localStorage:", savedUrl);
    if (savedUrl) {
      setNewUrl(savedUrl);
    }
  }, [language]);

  const categoryBrands = { key1: "Trendsetting", key2: "1" };


  const { data, error } = useSWR(
    ["brands", language],
    () => getBrands(language),
    { initialData: brands }
  );
  useEffect(() => {
    if (data) {
      const filteredData = data.filter(
        (rowData) => rowData[categoryBrands.key1] === categoryBrands.key2
      );
      setBrands(filteredData);
      setLoading(false);
    }
  }, [data, categoryBrands.key1, categoryBrands.key2]);



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

  const [fade, setFade] = useState(true);

  console.log("SHHH", brands)

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
                  {shuffledBrands.map((rowData, index) => (
                    <div
                      key={`${rowData.id_brand}-${index}`}
                      className={`background-slider overflow-hidden bg-indigo-600 py-5 rounded-xl h-full flex flex-col justify-between ${
                        fade ? "fade-in" : "fade-out"
                      }`}
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
