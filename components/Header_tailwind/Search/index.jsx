"use client";
import React, { useState, useEffect, useRef, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import DOMPurify from "dompurify";
import { fetchBrandsClient } from "@/app/utils/api";
import { useGeo } from "@/context/GeoContext";
import { UserContext } from "@/lib/fetchUser";
import { useTranslation } from "react-i18next";

const SearchComponent = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { geo } = useGeo();
  const searchRef = useRef(null); // Используем ref для отслеживания области поиска

  const { userData, click_campaign, click_sending } = useContext(UserContext);
  const [keyword, setKeyword] = useState("");

  const [isMobile, setIsMobile] = useState(false); // Новое состояние для отслеживания ширины экрана
  const [partner_id, setPartner_id] = useState(
    userData ? userData.partner_id : "OU"
  );
  const [db_id, setDb_id] = useState(userData ? userData.db_id : "-");

  useEffect(() => {
    if (userData && userData.keyword) {
      setKeyword(userData.keyword);
      setPartner_id(userData.partner_id);
      setDb_id(userData.db_id);
    }
  }, [userData]);

  const category = "Casinos";

  // Функция получения контента
  const getLanguageContent = (languages, partner_id, geo) => {
    if (!Array.isArray(languages)) {
      return null;
    }

    const partnerLanguages = languages.filter(
      (language) => language.partner_id === partner_id
    );

    for (const partnerLanguage of partnerLanguages) {
      if (partnerLanguage && Array.isArray(partnerLanguage.content)) {
        const geoContent = partnerLanguage.content.find(
          (content) => content.geo === geo
        );
        if (geoContent) {
          return geoContent;
        }
      }
    }
    return null;
  };

  useEffect(() => {
    if (!geo) return;

    const loadBrands = async () => {
      try {
        const data = await fetchBrandsClient(partner_id, geo, category);

        const processedBrands = data
          .map((brand) => {
            let parsedLanguages = [];

            try {
              if (typeof brand.languages === "string") {
                parsedLanguages = brand.languages
                  ? JSON.parse(brand.languages)
                  : [];
              } else if (typeof brand.languages === "object") {
                parsedLanguages = brand.languages;
              } else {
                parsedLanguages = [];
              }
            } catch (e) {
              console.error("Error parsing JSON for brand:", brand, e);
              return null;
            }

            const content = getLanguageContent(
              parsedLanguages,
              partner_id,
              geo
            );

            if (!content) {
              return null;
            }

            return { brand, content };
          })
          .filter((item) => item !== null);

        setBrands(processedBrands);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadBrands();
  }, [geo]);

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (brands && Array.isArray(brands)) {
      const results = brands.filter((item) => {
        const { brand, content } = item;

        if (!brand || !brand.casino_brand || !content || !content.value) {
          return false;
        }

        const sanitizedContent = DOMPurify.sanitize(content.value);

        return (
          brand.casino_brand.toLowerCase().includes(query) ||
          sanitizedContent.toLowerCase().includes(query)
        );
      });

      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  // Обработчик клика вне области поиска
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchQuery("");
        setSearchResults([]);
      }
    };

    // Добавляем обработчик событий для кликов
    document.addEventListener("mousedown", handleClickOutside);

    // Убираем обработчик событий при размонтировании компонента
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchRef]);

  return (
    <div className="search relative" ref={searchRef}>
      <input
        type="search"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder={`${t("Search")}`}
        className="search-input p-2 border rounded"
      />
      <div className="absolute flex justify-center items-center btn-search">
        <svg
          width="52"
          height="50"
          viewBox="0 0 52 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            width="52"
            height="50"
            rx="10"
            fill="url(#paint0_linear_139_912)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_139_912"
              x1="26.5098"
              y1="50"
              x2="26.5098"
              y2="1.85055e-07"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FC6141" />
              <stop offset="1" stopColor="#FE3F3A" />
            </linearGradient>
          </defs>
        </svg>

        <div className="absolute">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      {loading && <></>}
      {error && <p>Error: {error}</p>}

      {searchQuery && searchResults.length > 0 && (
        <div className="search-results absolute top-full left-0 right-0 bg-white shadow-lg z-10">
          <ul>
            {searchResults.map((item, index) => {
              const { brand, content } = item;
              const sanitizedContent =
                content && content.value
                  ? DOMPurify.sanitize(content.value)
                  : "No description available.";

              return (
                <li key={index} className="search-result-item p-2 border-b ">
                  {userData !== null ? (
                    <Link
                      target="_blank"
                      href={`${
                        brand.our_link
                      }?partner_id=${partner_id}&keyword=${keyword}&origin_click=real&click_campaign=${
                        click_campaign != null ? click_campaign : "organic"
                      }&click_sending=${
                        click_sending != null ? click_sending : "organic"
                      }&creative=Search&db_id=${db_id}&casino_brand=${brand.casino_brand.split(" ")[0]}&brand_logo=${brand.brand_logo}&our_link=${brand.our_link}&brand_id=offers/${brand.id}`}
                      className="flex items-center search-link"
                    >
                      <Image
                        src={`/images/${brand.brand_logo}.png`}
                        width={75}
                        height={40}
                        loading="lazy"
                        alt={brand.casino_brand || "Brand logo"}
                        className="mr-2"
                      />
                    </Link>
                  ) : (
                    <div className="flex items-center search-link otp-ver-if cursor-pointer">
                      <Image
                        src={`/images/${brand.brand_logo}.png`}
                        width={75}
                        height={40}
                        loading="lazy"
                        alt={brand.casino_brand || "Brand logo"}
                        className="mr-2"
                      />
                    </div>
                  )}
                  {/* Выводим описание бренда (контент) */}
                  <p dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
                  {userData !== null ? (
                    <Link className="mini-read" href={`/offers/${brand.id}`}>
                      {t("Read More")}
                    </Link>
                  ) : (
                    <div className="mini-read otp-ver-if cursor-pointer">
                      {t("Read More")}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* {searchQuery && searchResults.length === 0 && (
        <p className="p-2 text-gray-500">No results found.</p>
      )} */}
    </div>
  );
};

export default SearchComponent;
