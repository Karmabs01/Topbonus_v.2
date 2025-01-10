"use client";
import { useState, useEffect } from "react";
import useSWR, { mutate } from "swr";
import { useTranslation } from "react-i18next";
import Loader from "@/components/Loader";

import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

import "../../app/flags.css";

const LanguageSwitcher = () => {
  const { t, i18n } = useTranslation();
  const { data: selectedLanguage, error } = useSWR(
    "selectedLanguage",
    () => i18n.language
  );
  const [isLoading, setIsLoading] = useState(false);

  const availableLanguages = [
    { code: "de", label: "German", flag: "🇩🇪" },
    { code: "no", label: "Norwegian", flag: "🇳🇴" },
    { code: "fi", label: "Finnish", flag: "🇫🇮" },
    { code: "dk", label: "Danish", flag: "🇩🇰" },
    { code: "fr", label: "French", flag: "🇫🇷" },
    { code: "it", label: "Italian", flag: "🇮🇹" },
    { code: "pl", label: "Polish", flag: "🇵🇱" },
    { code: "se", label: "Swedish", flag: "🇸🇪" },
    { code: "cz", label: "Czech", flag: "🇨🇿" },
    { code: "pt", label: "Portugal", flag: "🇵🇹" },
    { code: "sk", label: "Slovak", flag: "🇸🇰" },
    { code: "es", label: "Spanish", flag: "🇪🇸" },
    { code: "gr", label: "Greek", flag: "🇬🇷" },
    { code: "nl", label: "Dutch", flag: "🇳🇱" },
    { code: "hu", label: "Hungarian", flag: "🇭🇺" },
    { code: "bg", label: "Bulgarian", flag: "🇧🇬" },
    { code: "all", label: "English", flag: "🌍" },
  ];

  // Define partner-specific language options
  const availableLanguages1039 = availableLanguages;
  const availableLanguages1043 = [
    { code: "all", label: "English", flag: "🌍" },
  ];
  const availableLanguages1044 = [
    { code: "cz", label: "Czech", flag: "🇨🇿" },
    { code: "dk", label: "Danish", flag: "🇩🇰" },
    { code: "fi", label: "Finnish", flag: "🇫🇮" },
    { code: "fr", label: "French", flag: "🇫🇷" },
    { code: "de", label: "German", flag: "🇩🇪" },
    { code: "gr", label: "Greek", flag: "🇬🇷" },
    { code: "it", label: "Italian", flag: "🇮🇹" },
    { code: "nl", label: "Dutch", flag: "🇳🇱" },
    { code: "no", label: "Norwegian", flag: "🇳🇴" },
    { code: "pl", label: "Polish", flag: "🇵🇱" },
    { code: "pt", label: "Portugal", flag: "🇵🇹" },
    { code: "es", label: "Spanish", flag: "🇪🇸" },
    { code: "se", label: "Swedish", flag: "🇸🇪" },
    { code: "all", label: "English", flag: "🌍" },
  ];
  const availableLanguages1045 = [
    { code: "cz", label: "Czech", flag: "🇨🇿" },
    { code: "de", label: "German", flag: "🇩🇪" },
    { code: "dk", label: "Danish", flag: "🇩🇰" },
    { code: "fi", label: "Finnish", flag: "🇫🇮" },
    { code: "fr", label: "French", flag: "🇫🇷" },
    { code: "gr", label: "Greek", flag: "🇬🇷" },
    { code: "hu", label: "Hungarian", flag: "🇭🇺" },
    { code: "it", label: "Italian", flag: "🇮🇹" },
    { code: "nl", label: "Dutch", flag: "🇳🇱" },
    { code: "no", label: "Norwegian", flag: "🇳🇴" },
    { code: "pl", label: "Polish", flag: "🇵🇱" },
    { code: "pt", label: "Portugal", flag: "🇵🇹" },
    { code: "es", label: "Spanish", flag: "🇪🇸" },
    { code: "se", label: "Swedish", flag: "🇸🇪" },
    { code: "sk", label: "Slovak", flag: "🇸🇰" },
    { code: "all", label: "English", flag: "🌍" },
  ];
  const availableLanguagesCLD_VIP = [
    { code: "cz", label: "Czech", flag: "🇨🇿" },
    { code: "de", label: "German", flag: "🇩🇪" },
    { code: "dk", label: "Danish", flag: "🇩🇰" },
    { code: "fi", label: "Finnish", flag: "🇫🇮" },
    { code: "fr", label: "French", flag: "🇫🇷" },
    { code: "gr", label: "Greek", flag: "🇬🇷" },
    { code: "hu", label: "Hungarian", flag: "🇭🇺" },
    { code: "it", label: "Italian", flag: "🇮🇹" },
    { code: "nl", label: "Dutch", flag: "🇳🇱" },
    { code: "no", label: "Norwegian", flag: "🇳🇴" },
    { code: "pl", label: "Polish", flag: "🇵🇱" },
    { code: "pt", label: "Portugal", flag: "🇵🇹" },
    { code: "es", label: "Spanish", flag: "🇪🇸" },
    { code: "se", label: "Swedish", flag: "🇸🇪" },
    { code: "sk", label: "Slovak", flag: "🇸🇰" },
    { code: "all", label: "English", flag: "🌍" },
  ];
  // Select the correct language options based on the source
  let source;
  if (typeof window !== "undefined") {
    source = localStorage.getItem("source");
  }
  let newLng;
  switch (source) {
    case "partner1039":
      newLng = availableLanguages1039;
      break;
    case "partner1043":
      newLng = availableLanguages1043;
      break;
      case "partner1050":
        newLng = availableLanguages1043;
        break;
    case "partner1044":
      newLng = availableLanguages1044;
      break;
    case "CLD_VIP":
      newLng = availableLanguagesCLD_VIP;
      break;
    case "partner1045_b1":
      newLng = availableLanguages1045;
      break;
    case "partner1046":
      newLng = availableLanguagesCLD_VIP;
      break;
      case "partner1049":
        newLng = availableLanguagesCLD_VIP;
        break;
    case "partner1047":
      newLng = availableLanguagesCLD_VIP;
      break;
    default:
      newLng = availableLanguages;
      break;
  }

  if (error) return <div>Failed to load</div>;

  const changeLanguage = async (lng) => {
    setIsLoading(true);
    localStorage.setItem("country", lng);
    try {
      mutate("selectedLanguage", lng, false);
      await i18n.changeLanguage(lng);
    } catch (error) {
      console.error("Ошибка при смене языка:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div>
        <div className="flex flex-col m-2">
          <Listbox
            value={selectedLanguage}
            onChange={(code) => {
              const selected = newLng.find((lang) => lang.code === code);
              if (selected) {
                changeLanguage(selected.code);
              } else {
                changeLanguage("en");
              }
            }}
          >
            {({ open }) => (
              <>
                <div className="relative">
                  <ListboxButton className="relative w-full cursor-default rounded-md py-1.5 pl-3 text-left text-gray-900 shadow-sm ring-1 ring-inset bg-purple ring-gray-300 focus:outline-none sm:text-sm sm:leading-6">
                    <span className="block truncate flex items-center text-white">
                      {/* {newLng.find((lang) => lang.code === selectedLanguage)?.flag}{' '} */}
                      <span
                        className={`mr-2 flag-icon flag-icon-${
                          newLng.find((lang) => lang.code === selectedLanguage)
                            ?.code
                        }`}
                      />
                      {
                        newLng.find((lang) => lang.code === selectedLanguage)
                          ?.label
                      }
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <ChevronUpDownIcon
                        aria-hidden="true"
                        className="h-5 w-5 text-gray-400"
                      />
                    </span>
                  </ListboxButton>

                  <ListboxOptions className="absolute z-10 mt-1 max-h-40 w-full overflow-auto rounded-md py-1 text-base shadow-lg ring-1 ring-black bg-purple ring-opacity-5 focus:outline-none sm:text-sm">
                    {newLng.map((language) => (
                      <ListboxOption
                        key={language.code}
                        value={language.code}
                        className={() =>
                          `relative cursor-pointer select-none py-2 pl-3 pr-9 text-gray-200 bg-purple hover:bg-indigo-600`
                        }
                      >
                        {({ selected }) => (
                          <>
                            <span
                              className={`block truncate flex items-center ${
                                selected
                                  ? "font-bold text-white"
                                  : "font-normal"
                              }`}
                            >
                              {/* {language.flag} {language.label} */}
                              <span
                                className={`mr-2 flag-icon flag-icon-${language.code}`}
                              />{" "}
                              {language.label}
                            </span>
                            {selected && (
                              <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-white">
                                <CheckIcon
                                  aria-hidden="true"
                                  className="h-5 w-5"
                                />
                              </span>
                            )}
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
      </div>
    </div>
  );
};

export default LanguageSwitcher;
