"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import img from "@/public/newimages/facmob.png";
import { useTranslation } from "react-i18next";

export default function Banner_small() {
  const [newUrl, setNewUrl] = useState("");
  const [source, setSource] = useState("");

  const [redirectUrl, setRedirectUrl] = useState("");

  const { t } = useTranslation();

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
              {t("What is your choise")}
              <span>{t("for today?")}</span>
            </h3>
            <div className="mob-none">
              <Image src={img} alt={img} width={400} height={150} />
            </div>
            <div className="flex items-center justify-start btns-ch">
              <div className="h-20 w-20 btn-choose">
                <Link
                  href={`${redirectUrl}/${newUrl}&creative_id=Choice_Of_The_Day_2`}
                  target="_blank"
                >
                  {t("Choose")}
                </Link>
              </div>
              <div className="h-20 w-20 btn-choose">
                <Link
                  href={`${redirectUrl}/${newUrl}&creative_id=Choice_Of_The_Day_2`}
                  target="_blank"
                >
                  {t("Choose")}
                </Link>
              </div>
              <div className="h-20 w-20 btn-choose">
                <Link
                  href={`${redirectUrl}/${newUrl}&creative_id=Choice_Of_The_Day_2`}
                  target="_blank"
                >
                  {t("Choose")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
