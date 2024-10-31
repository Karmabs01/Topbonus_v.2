"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import useSWR from "swr";
import { shuffle } from "lodash";

import { useLanguage } from "../../../switcher/LanguageContext";
import { getBrands } from "../../../getBrands/getBrands2";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import img from "@/public/bannerhell.png";
import newimg from "@/public/newimages/coins.png";
import Slider from "react-slick";
import refetch from "@/public/refetch.png";

export default function Banner_small() {
  const [newUrl, setNewUrl] = useState("");
  const [brands, setBrands] = useState([]);
  const [source, setSource] = useState("");
  const [redirectUrl, setRedirectUrl] = useState("");
  const [timeLeft, setTimeLeft] = useState(""); // Для таймера

  const { t } = useTranslation();

  // Функция для расчёта оставшегося времени до полуночи (00:00 по СЕТ)
  const calculateTimeLeft = () => {
    const now = new Date();
    const nowInCET = new Date(now.toLocaleString("en-US", { timeZone: "CET" }));
    const midnight = new Date(
      nowInCET.getFullYear(),
      nowInCET.getMonth(),
      nowInCET.getDate() + 1, // Следующий день, 00:00
      0,
      0,
      0
    );
    const difference = midnight.getTime() - nowInCET.getTime();

    if (difference > 0) {
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      return `${hours}h ${minutes}m ${seconds}s`;
    } else {
      return "00h 00m 00s";
    }
  };

  useEffect(() => {
    let url = "";
    switch (source) {
      case "partner1039":
        url = "https://link.bo-nus.com/partner_aurnd";
        break;
      case "partner1043":
        url = "https://info.topbon.us/rnd1043";
        break;
      case "partner1044":
        url = "https://link.gobig.finance/rnd1044";
        break;
      case "CLD_VIP":
        url = "https://link.bo-nus.com/rnd_cld";
        break;
      case "partner1045_b1":
        url = "https://link.gobig.finance/rnd1045";
        break;
      case "partner1046":
        url = "https://link.bo-nus.com/rnd_cld";
        break;
      default:
        url = "https://info.topbon.us/aurnd";
    }
    setRedirectUrl(url);
    const savedUrl = localStorage.getItem("savedUrl");
    if (savedUrl) {
      setNewUrl(savedUrl);
    }

    // Обновляем таймер каждую секунду
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer); // Чистим таймер при размонтировании
  }, [source]);

  ////////////////////////////////////////////

  const [loading, setLoading] = useState(true);

  const [brands2, setBrands2] = useState([]);

  const { language } = useLanguage();

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

  const categoryBrands2 = { key1: "Video", key2: "hell" };

  const { data, error } = useSWR(
    ["brands", language],
    () => getBrands(language),
    { initialData: brands }
  );

  useEffect(() => {
    if (data) {
      const filteredData2 = data.filter(
        (rowData) => rowData[categoryBrands2.key1] === categoryBrands2.key2
      );

      setBrands2(filteredData2);

      setLoading(false);
    }
  }, [data]);

  const refetchBrands = () => {
    const shuffled = shuffle(brands2);
    setBrands2(shuffled); // Перемешиваем и обновляем состояние с брендами
  };

  const shuffledBrands2 = shuffle(brands2);

  return (
    <>
      <div className="emojis">
        <div className="main__container">
          <div className="flex flex-col face-mob">
            <h3 className="text-lg leading-6 ">
              {t("Feel the thrills of fortune")}
              <span> {t("with today’s spooky surprise!")}</span>
            </h3>
            <div className="timer2 text-lg mt-4 flex flex-col">
              <p>{t("Ends In")}:</p> <span>{timeLeft}</span>
            </div>
            <div className="mob-none">
              <Image src={img} alt={img} width={400} height={150} />
            </div>
          </div>
          {/* Добавляем таймер */}
        </div>
      </div>
      <div className="coins mt-1">
        <Image src={newimg} alt={newimg} width={783} height={150} />
      </div>
      <div className="flex justify-between pt-4">
        <h2 className="text-3xl font-bold tracking-tight text-white random-title mmm-none">
          {t("SPECIAL HALLOWEEN")} <span>{t("offers")}</span>
        </h2>
        <button
          className="refetch"
          onClick={refetchBrands} // Обработчик клика
        >
          <Image src={refetch} alt="refetch" width={40} loading="lazy" />
        </button>
      </div>
      <div className="cards-thr mmm-none flex justify-between py-4">
        {brands2.slice(0, 3).map((rowData, index) => (
          <div key={"Popular_offers" + index} className="card-thr !mb-0">
            <div className="relative">
              <div className="relative flex align-center justify-center">
                <Link
                  href={`${rowData.GoBig}/${newUrl}&creative_id=Helloween`}
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
                <p className="mt-1 text-sm text-gray-500 h-10">
                  {rowData.OurOfferContent}
                </p>
              </div>
            </div>
            <div className="btn-crd">
              <Link
                href={`${rowData.GoBig}/${newUrl}&creative_id=Helloween`}
                target="_blank"
                className="relative flex items-center justify-center px-8 py-2 text-lg font-medium rounded-full text-white btn-blick overflow-hidden"
              >
                {t("Play Now")}
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="md:hidden w-full mob-sl">
        <div className="cards-th">
          <h2 className="text-3xl font-bold tracking-tight text-white random-title">
            {t("SPECIAL HALLOWEEN")} <span>{t("offers")}</span>
          </h2>
          <Slider {...settings}>
            {brands2.map((rowData, index) => (
              <div key={index} className="overflow-hidden card-thr !mb-0">
                <div className="pm10">
                  <div className="imgp">
                    <Link
                      target="_blank"
                      href={`${rowData.GoBig}/${newUrl}&creative_id=Helloween`}
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
                    <p className="mt-1 text-sm ">{rowData.OurOfferContent}</p>
                  </div>
                </div>
                <div className="mt-6">
                  <Link
                    href={`${rowData.GoBig}/${newUrl}&creative_id=Helloween`}
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
    </>
  );
}
