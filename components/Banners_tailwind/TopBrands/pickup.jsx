"use client";
import { useState, useEffect } from "react";
import useSWR from "swr";
import { useLanguage } from "../../switcher/LanguageContext";
import { useTranslation } from "react-i18next";
import { shuffle } from "lodash";
import Image from "next/image";
import Link from "next/link";

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
  useEffect(() => {
    if (data) {
      const filteredData = data.filter(
        (rowData) => rowData[categoryBrands.key1] === categoryBrands.key2
      );
      console.log("FILTER", filteredData);
      setBrands(filteredData);
      setLoading(false);
    }
  }, [data, categoryBrands.key1, categoryBrands.key2]);
  console.log("==============", brands)
  return (
    <>
      <div className="flex items-center justify-end jins w-full">
        <div className="thrdjin">
          <h5 className="h5">{t("Premium Choice of the Day")}</h5>
          {brands.length > 0 &&
            brands.slice(4, 5).map((rowData, index) => (
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
