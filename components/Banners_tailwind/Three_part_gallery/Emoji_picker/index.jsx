"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import img from "@/public/newimages/mobile_1.png";
import { useLanguage } from "@/components/switcher/LanguageContext";

import { useTranslation } from "react-i18next";

export default function Banner_small() {
  const [newUrl, setNewUrl] = useState("");
  const [source, setSource] = useState("");
  const { language } = useLanguage();
  const timeoutRef = useRef(null);
  const [redirectUrl, setRedirectUrl] = useState("");

  console.log("SOURCE", source);

  const { t } = useTranslation();

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
      "partner1050",
      "partner1047",
      "partner1049",
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
        } else {
          setSource(sourceFound);
        }
      }
    }

    if (currentKeyword) {
      setPartnerSource(currentKeyword);
    } else {
      const savedSource = localStorage.getItem("source");
      if (savedSource) {
        setSource(savedSource);
      }
    }

    const savedUrl = localStorage.getItem("savedUrl");
    if (savedUrl) {
      setNewUrl(savedUrl);
    }
  }, [language]);
  console.log("LNG", language)

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
        url = "https://link.bo-nus.com/rnd_cld";
        break;
      case "partner1046":
        url = "https://link.bo-nus.com/rnd_cld";
        break;
      case "partner1050":
        url = "https://info.topbon.us/rnd1043";
        break;
      case "partner1049":
        url = "https://link.bo-nus.com/rnd_cld";
        break;
      case "partner1047":
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
  }, [source]);

  return (
    <>
      <div className="emojis">
        <div className="main__container">
          <div className="flex justify-between items-center face-mob">
            <h3 className="text-lg leading-6 ">
              {t("Your Winter Fortune")}
              <span> {t("Starts Here")}</span>
            </h3>
            <div className="mob-none">
              <Image src={img} alt={img} width={400} height={150} />
            </div>
            <div className="flex items-center justify-start btns-ch">
              <div className="h-20 w-20 btn-choose">
                <Link
                  href={`${redirectUrl}/${newUrl}&creative_id=Winter_fortune`}
                  target="_blank"
                >
                  {t("Check")}
                </Link>
              </div>
              <div className="h-20 w-20 btn-choose">
                <Link
                  href={`${redirectUrl}/${newUrl}&creative_id=Winter_fortune`}
                  target="_blank"
                >
                  {t("Check")}
                </Link>
              </div>
              <div className="h-20 w-20 btn-choose">
                <Link
                  href={`${redirectUrl}/${newUrl}&creative_id=Winter_fortune`}
                  target="_blank"
                >
                  {t("Check")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
