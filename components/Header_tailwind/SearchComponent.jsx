"use client";
import React, { useState, useRef, useEffect } from "react";
import { getBrands } from "@/components/getBrands/getBrands2";
import useSWR from "swr";
import { useLanguage } from "@/components/switcher/LanguageContext";
import Image from "next/image";
import { getUserData } from "@/components/getUser/getUser";

const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { language } = useLanguage();
  // Если вам не нужно отдельно хранить brands — можно сразу задать пустой массив в fallbackData.
  const { data, error } = useSWR(
    ["brands", language],
    () => getBrands(language),
    { fallbackData: [] }
  );
  const [newUrl, setNewUrl] = useState("");
  // Создаем ref для контейнера
  const containerRef = useRef(null);
  // useEffect(() => {
  //   const currentUrl = window.location.href;
  //   const indexOfQuestionMark = currentUrl.indexOf("?");
  //   const newUrl2 =
  //     indexOfQuestionMark !== -1
  //       ? currentUrl.substring(0, indexOfQuestionMark)
  //       : currentUrl;
  //   window.history.replaceState({}, document.title, newUrl2);

  //   const urlObj = new URL(currentUrl);
  //   const searchParams = new URLSearchParams(urlObj.search);
  //   searchParams.delete("brand");
  //   const currentKeyword = searchParams.get("keyword");

  //   const partners = [
  //     "partner1039",
  //     "partner1043",
  //     "partner1044",
  //     "CLD_VIP",
  //     "partner1045_b1",
  //     "partner1046",
  //     "partner1047",
  //   ];

  //   function setPartnerSource(keyword) {
  //     const partner = partners.find((p) => keyword && keyword.includes(p));
  //     if (partner) {
  //       localStorage.setItem("source", partner);
  //       setSource(partner);
  //       searchParams.set("source", partner);
  //     } else {
  //       setSource("0");
  //       const sourceFound = localStorage.getItem("source");
  //       if (!partners.includes(sourceFound)) {
  //         localStorage.setItem("source", "0");
  //         searchParams.set("source", "0");
  //       }
  //     }
  //   }

  //   if (currentKeyword) {
  //     setPartnerSource(currentKeyword);
  //   }

  //   const savedUrl = localStorage.getItem("savedUrl");
  //   if (savedUrl) {
  //     setNewUrl(savedUrl);
  //   }
  // }, [language]);
  // Если данных нет, можно показать лоадер
  if (!data) return <div>Загрузка...</div>;

  // Фильтрация по полям CasinoBrand и OurOfferContent (без учёта регистра)
  const filteredData = data.filter((item) => {
    const lowerSearch = searchTerm.toLowerCase();
    return (
      item.CasinoBrand.toLowerCase().includes(lowerSearch) ||
      item.OurOfferContent.toLowerCase().includes(lowerSearch) ||
      item.categories.toLowerCase().includes(lowerSearch)
    );
  });

  // Обработчик клика вне области компонента
  const handleClickOutside = (event) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setSearchTerm(""); // очищаем инпут, что приводит к скрытию списка
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="p-4 ssearch" ref={containerRef}>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full border border-gray-300 rounded p-2"
      />
      {searchTerm.trim().length > 0 && (
        <ul className="searchUl mt-2 snap-x snap-mandatory">
          {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <li
                key={item.id_brand}
                className="flex items-center gap-4 py-2 border-b border-gray-200 px-2 snap-center"
              >
                {/* Изображение бренда */}
                <a
                  href={`${item.GoBig || "#"}/${newUrl}&creative_id=Search`}
                  target="_blank"
                  className="relative w-16 h-16"
                >
                  <Image
                    src={item.LinkImg}
                    alt={item.CasinoBrand}
                    fill
                    style={{ objectFit: "contain" }}
                  />
                </a>
                <div className="flex flex w-full items-center">
                  <h3 className="font-semibold">{item.CasinoBrand}</h3>
                  {/* Вывод бонуса из поля OurOfferContent */}
                  <p className="text-sm text-gray-600">
                    {item.OurOfferContent}
                  </p>
                  {/* Ссылка на оффер */}
                  <a
                    href={`${
                      item.GoBig || "#"
                    }/${newUrl}&creative_id=Search`}
                    className="btn btn-primary mt-1 text-blue-500 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Play Now
                  </a>
                </div>
              </li>
            ))
          ) : (
            <li className="text-gray-500 px-2 py-2">Not found</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchComponent;
