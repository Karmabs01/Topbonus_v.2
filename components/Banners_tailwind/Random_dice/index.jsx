"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import dice from "@/public/newimages/dice.png";
import Image from "next/image";
import "./styled.component.css";

export default function Random_block() {
  const [newUrl, setNewUrl] = useState("");
  const [source, setSource] = useState("");
  const [redirectUrl, setRedirectUrl] = useState("");

  const { t } = useTranslation();
  const elementRef = useRef(null);

  useEffect(() => {
    let url = "";
    switch (source) {
      case "partner1039":
        url = "https://link.bo-nus.com/partner_aurnd";
        break;
      case "partner1043":
        url = "https://info.topbon.us/rnd1043";
        break;
        case "partner1050":
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

  useEffect(() => {
    const hash = window.location.hash;

    if (hash && elementRef.current) {
      const scrollToElement = () => {
        const id = hash.substring(1);
        const element = document.getElementById(id);
        if (element) {
          // Позиция элемента
          const elementPosition =
            element.getBoundingClientRect().top + window.scrollY;

          // Плавный скролл
          window.scrollTo({
            top: elementPosition,
            behavior: "smooth",
          });
        }
      };

      // Увеличенная задержка для более плавного рендеринга
      setTimeout(() => {
        scrollToElement();
      }, 500); // Попробуйте разные значения, например 500ms
    }
  }, []);

  return (
    <>
      <div className="dice fixed bottom-50 right-7">
        <Link target="_blank" href={`${redirectUrl}/${newUrl}&creative_id=Try_Your_Luck_Dice`}>
          <Image
            src={dice}
            alt="random"
            width={50}
            height={50}
            loading="lazy"
          />
        </Link>
    
      </div>
    </>
  );
}
