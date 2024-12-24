"use client";
import { useState, useEffect } from "react";
import Loader from "@/components/Loader";
import { useLanguage } from "./LanguageContext";
import { useTranslation } from "react-i18next";

import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import "../../app/flags.css";

const BrandsSwitcher = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { language, setLanguage } = useLanguage(); // Используй состояние и функцию из контекста

  const ipData = async () => {
    try {
      const response = await fetch("/api/geolocation"); // Используем ваш API route
      const data = await response.json();
      if (data.country) {
        setLanguage(data.country.toLowerCase()); // Используй setLanguage из контекста
        if (typeof window !== "undefined") {
          localStorage.setItem("country_brands", data.country.toLowerCase());
        }
      }
    } catch (error) {
      console.error("Ошибка при запросе к API:", error);
      setLanguage("all");
    }
  };
  useEffect(() => {
    const savedLanguage = localStorage.getItem("country_brands");
    if (!savedLanguage) {
      ipData();
    }
  }, []);

  const changeLanguage = (lng) => {
    setIsLoading(true);
    setLanguage(lng);
    localStorage.setItem("country_brands", lng);
    setIsLoading(false);
    window.location.reload();
  };

  const availableLanguages = [
    { code: "au", label: "Australia", flag: "🇦🇺" },
    { code: "ca", label: "Canada", flag: "🇨🇦" },
    { code: "de", label: "Germany", flag: "🇩🇪" },
    { code: "ie", label: "Ireland", flag: "🇮🇪" },
    { code: "nz", label: "New Zealand", flag: "🇳🇿" },
    { code: "no", label: "Norway", flag: "🇳🇴" },
    { code: "fi", label: "Finland", flag: "🇫🇮" },
    { code: "at", label: "Austria", flag: "🇦🇹" },
    { code: "ch", label: "Switzerland", flag: "🇨🇭" },
    { code: "dk", label: "Denmark", flag: "🇩🇰" },
    { code: "fr", label: "France", flag: "🇫🇷" },
    { code: "it", label: "Italy", flag: "🇮🇹" },
    { code: "pl", label: "Poland", flag: "🇵🇱" },
    { code: "se", label: "Sweden", flag: "🇸🇪" },
    { code: "cz", label: "Czech", flag: "🇨🇿" },
    { code: "sk", label: "Slovakia", flag: "🇸🇰" },
    { code: "be", label: "Belgium", flag: "🇧🇪" },
    { code: "gr", label: "Greece", flag: "🇬🇷" },
    { code: "nl", label: "Netherlands", flag: "🇳🇱" },
    { code: "hu", label: "Hungary", flag: "🇭🇺" },
    { code: "bg", label: "Bulgaria", flag: "🇧🇬" },
    { code: "all", label: "World", flag: "🌍" },
  ];
  const availableLanguages1039 = [
    { code: "au", label: "Australia", flag: "🇦🇺" },
    { code: "at", label: "Austria", flag: "🇦🇹" },
    { code: "be", label: "Belgium", flag: "🇧🇪" },
    { code: "bg", label: "Bulgaria", flag: "🇧🇬" },
    { code: "ca", label: "Canada", flag: "🇨🇦" },
    { code: "cz", label: "Czech", flag: "🇨🇿" },
    { code: "dk", label: "Denmark", flag: "🇩🇰" },
    { code: "fi", label: "Finland", flag: "🇫🇮" },
    { code: "fr", label: "France", flag: "🇫🇷" },
    { code: "de", label: "Germany", flag: "🇩🇪" },
    { code: "gr", label: "Greece", flag: "🇬🇷" },
    { code: "hu", label: "Hungary", flag: "🇭🇺" },
    { code: "ie", label: "Ireland", flag: "🇮🇪" },
    { code: "it", label: "Italy", flag: "🇮🇹" },
    { code: "nl", label: "Netherlands", flag: "🇳🇱" },
    { code: "nz", label: "New Zealand", flag: "🇳🇿" },
    { code: "no", label: "Norway", flag: "🇳🇴" },
    { code: "pl", label: "Poland", flag: "🇵🇱" },
    { code: "pt", label: "Portugal", flag: "🇵🇹" },
    { code: "sk", label: "Slovakia", flag: "🇸🇰" },
    { code: "es", label: "Spain", flag: "🇪🇸" },
    { code: "se", label: "Sweden", flag: "🇸🇪" },
    { code: "ch", label: "Switzerland", flag: "🇨🇭" },
    { code: "tr", label: "Turkey", flag: "🇹🇷" },
    { code: "gb", label: "United Kingdom", flag: "🇬🇧" },
    { code: "us", label: "United States", flag: "🇺🇸" },
    { code: "all", label: "World", flag: "🌍" },
  ];
  const availableLanguages1043 = [
    { code: "ca", label: "Canada", flag: "🇨🇦" },
    { code: "us", label: "United States", flag: "🇺🇸" },
    { code: "all", label: "World", flag: "🌍" },
  ];
  const availableLanguages1044 = [
    { code: "au", label: "Australia", flag: "🇦🇺" },
    { code: "at", label: "Austria", flag: "🇦🇹" },
    { code: "be", label: "Belgium", flag: "🇧🇪" },
    { code: "ca", label: "Canada", flag: "🇨🇦" },
    { code: "cz", label: "The Czech Republic", flag: "🇨🇿" },
    { code: "dk", label: "Denmark", flag: "🇩🇰" },
    { code: "fi", label: "Finland", flag: "🇫🇮" },
    { code: "fr", label: "France", flag: "🇫🇷" },
    { code: "de", label: "Germany", flag: "🇩🇪" },
    { code: "gb", label: "Great Britain", flag: "🇬🇧" },
    { code: "gr", label: "Greece", flag: "🇬🇷" },
    { code: "ie", label: "Ireland", flag: "🇮🇪" },
    { code: "it", label: "Italy", flag: "🇮🇹" },
    { code: "nl", label: "Netherlands", flag: "🇳🇱" },
    { code: "no", label: "Norway", flag: "🇳🇴" },
    { code: "nz", label: "New Zealand", flag: "🇳🇿" },
    { code: "pl", label: "Poland", flag: "🇵🇱" },
    { code: "se", label: "Sweden", flag: "🇸🇪" },
    { code: "za", label: "South Africa", flag: "🇿🇦" },
    { code: "ch", label: "Switzerland", flag: "🇨🇭" },
    { code: "us", label: "USA", flag: "🇺🇸" },
    { code: "all", label: "World", flag: "🌍" },
  ];
  const availableLanguages1045 = [
    { code: "au", label: "Australia", flag: "🇦🇺" },
    { code: "at", label: "Austria", flag: "🇦🇹" },
    { code: "be", label: "Belgium", flag: "🇧🇪" },
    { code: "ca", label: "Canada", flag: "🇨🇦" },
    { code: "ch", label: "Switzerland", flag: "🇨🇭" },
    { code: "cz", label: "The Czech Republic", flag: "🇨🇿" },
    { code: "de", label: "Germany", flag: "🇩🇪" },
    { code: "dk", label: "Denmark", flag: "🇩🇰" },
    { code: "fi", label: "Finland", flag: "🇫🇮" },
    { code: "fr", label: "France", flag: "🇫🇷" },
    { code: "gb", label: "United Kingdom", flag: "🇬🇧" },
    { code: "gr", label: "Greece", flag: "🇬🇷" },
    { code: "hu", label: "Hungary", flag: "🇭🇺" },
    { code: "ie", label: "Ireland", flag: "🇮🇪" },
    { code: "it", label: "Italy", flag: "🇮🇹" },
    { code: "pt", label: "Portugal", flag: "🇵🇹" },
    { code: "es", label: "Spain", flag: "🇪🇸" },
    { code: "no", label: "Norway", flag: "🇳🇴" },
    { code: "nl", label: "Netherlands", flag: "🇳🇱" },
    { code: "nz", label: "New Zealand", flag: "🇳🇿" },
    { code: "pl", label: "Poland", flag: "🇵🇱" },
    { code: "se", label: "Sweden", flag: "🇸🇪" },
    { code: "sk", label: "Slovakia", flag: "🇸🇰" },
    { code: "all", label: "World", flag: "🌍" },
  ];
  const availableLanguagesCLD_VIP = [
    { code: "all", label: "All", flag: "🌍" },
    { code: "at", label: "Austria", flag: "🇦🇹" },
    { code: "au", label: "Australia", flag: "🇦🇺" },
    { code: "be", label: "Belgium", flag: "🇧🇪" },
    { code: "ca", label: "Canada", flag: "🇨🇦" },
    { code: "ch", label: "Switzerland", flag: "🇨🇭" },
    { code: "cz", label: "Czech Republic", flag: "🇨🇿" },
    { code: "de", label: "Germany", flag: "🇩🇪" },
    { code: "dk", label: "Denmark", flag: "🇩🇰" },
    { code: "es", label: "Spain", flag: "🇪🇸" },
    { code: "fi", label: "Finland", flag: "🇫🇮" },
    { code: "fr", label: "France", flag: "🇫🇷" },
    { code: "gb", label: "United Kingdom", flag: "🇬🇧" },
    { code: "gr", label: "Greece", flag: "🇬🇷" },
    { code: "hu", label: "Hungary", flag: "🇭🇺" },
    { code: "ie", label: "Ireland", flag: "🇮🇪" },
    { code: "it", label: "Italy", flag: "🇮🇹" },
    { code: "nl", label: "Netherlands", flag: "🇳🇱" },
    { code: "no", label: "Norway", flag: "🇳🇴" },
    { code: "nz", label: "New Zealand", flag: "🇳🇿" },
    { code: "pl", label: "Poland", flag: "🇵🇱" },
    { code: "pt", label: "Portugal", flag: "🇵🇹" },
    { code: "se", label: "Sweden", flag: "🇸🇪" },
    { code: "sk", label: "Slovakia", flag: "🇸🇰" },
  ];

  let item;
  if (typeof window !== "undefined") {
    item = localStorage.getItem("source");
  }
  let newLng;
  if (item === "partner1039") {
    newLng = availableLanguages1039;
  } else if (item === "partner1043") {
    newLng = availableLanguages1043;
  } else if (item === "partner1050") {
    newLng = availableLanguages1043;
  } else if (item === "partner1044") {
    newLng = availableLanguages1044;
  } else if (item === "CLD_VIP") {
    newLng = availableLanguagesCLD_VIP;
  } else if (item === "partner1045_b1") {
    newLng = availableLanguages1045;
  } else if (item === "partner1046") {
    newLng = availableLanguagesCLD_VIP;
  } else if (item === "partner1049") {
    newLng = availableLanguagesCLD_VIP;
  } else if (item === "partner1047") {
    newLng = availableLanguagesCLD_VIP;
  } else {
    newLng = availableLanguages;
  }

  const [lng, setLng] = useState("all");

  const fetchBrands = (language, newLng) => {
    const matchedLanguage = newLng.find((lng) => lng.code === language);
    setLng(matchedLanguage ? matchedLanguage.code : "all");
  };
  useEffect(() => {
    fetchBrands(language, newLng);
  }, [language, newLng]);

  const selectedLanguage = newLng.find((lang) => lang.code === lng);

  return (
    <div className="flex flex-col m-2">
      <Listbox
        value={lng}
        onChange={(code) => {
          const selected = newLng.find((lang) => lang.code === code);
          if (selected) {
            changeLanguage(selected.code);
          }
        }}
      >
        {({ open }) => (
          <>
            <div className="relative country-flag">
              <ListboxButton className="relative w-full cursor-default rounded-md bg-purple py-1.5 pl-3 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none sm:text-sm sm:leading-6">
                {/* <span className="block truncate">{selectedLanguage?.flag} {selectedLanguage?.label}</span> */}
                <span className="block truncate flex items-center text-white">
                  <span
                    className={`mr-2 flag-icon flag-icon-${selectedLanguage?.code}`}
                  />
                  {selectedLanguage?.label}
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon
                    aria-hidden="true"
                    className="h-5 w-5 text-gray-400"
                  />
                </span>
              </ListboxButton>

              <ListboxOptions className="absolute z-10 mt-1 max-h-40 w-full overflow-auto rounded-md bg-purple py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm ">
                {newLng.map((language) => (
                  <ListboxOption
                    key={language.code}
                    value={language.code}
                    className={() =>
                      `relative cursor-pointer select-none py-2 pl-3 pr-9 bg-purple text-gray-200 hover:bg-indigo-600`
                    }
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate flex items-center ${
                            selected ? "font-bold text-white" : "font-normal"
                          }`}
                        >
                          {/* {language.flag} {language.label} */}
                          <span
                            className={`mr-2 flag-icon flag-icon-${language.code}`}
                          />{" "}
                          {language.label}
                        </span>
                        {selected ? (
                          <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-white">
                            <CheckIcon aria-hidden="true" className="h-5 w-5" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </ListboxOption>
                ))}
              </ListboxOptions>
            </div>
          </>
        )}
      </Listbox>
      {isLoading && <Loader />}
    </div>
  );
};

export default BrandsSwitcher;
