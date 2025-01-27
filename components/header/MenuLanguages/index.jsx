import * as React from "react";
import { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
// import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useLanguage } from "@/components/switcher/LanguageContext";
import BrandsSwitcher from "@/components/switcher/BrandsSwitcher";
import LanguageSwitcher from "@/components/switcher/LanguageSwitcher";
import i18n from "@/components/i18n";
import { useTranslation } from "react-i18next";

import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Label,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import "../../../app/flags.css";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function MultipleSelectPlaceholder() {
  const theme = useTheme();
  const { t } = useTranslation();
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(typeof value === "string" ? value.split(",") : value);
  };

  const { language } = useLanguage();

  const flags = [
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
  const flags1039 = [
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
    { code: "in", label: "Indian", flag: "🇮🇹" },
    { code: "nl", label: "Netherlands", flag: "🇳🇱" },
    { code: "nz", label: "New Zealand", flag: "🇳🇿" },
    { code: "no", label: "Norway", flag: "🇳🇴" },
    // { code: "pl", label: "Poland", flag: "🇵🇱" },
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
  const flags1043 = [
    { code: "ca", label: "Canada", flag: "🇨🇦" },
    { code: "us", label: "United States", flag: "🇺🇸" },
    { code: "all", label: "World", flag: "🌍" },
  ];
  const flags1044 = [
    { code: "au", label: "Australia", flag: "🇦🇺" },
    { code: "at", label: "Austria", flag: "🇦🇹" },
    { code: "be", label: "Belgium", flag: "🇧🇪" },
    { code: "ca", label: "Canada", flag: "🇨🇦" },
    { code: "gr", label: "Greece", flag: "🇬🇷" },
    { code: "ch", label: "Switzerland", flag: "🇨🇭" },
    { code: "nl", label: "Netherlands", flag: "🇳🇱" },
    { code: "de", label: "Germany", flag: "🇩🇪" },
    { code: "cz", label: "The Czech Republic", flag: "🇨🇿" },
    { code: "dk", label: "Denmark", flag: "🇩🇰" },
    { code: "fi", label: "Finland", flag: "🇫🇮" },
    { code: "fr", label: "France", flag: "🇫🇷" },
    { code: "gb", label: "Great Britain", flag: "🇬🇧" },
    { code: "ie", label: "Ireland", flag: "🇮🇪" },
    { code: "it", label: "Italy", flag: "🇮🇹" },
    { code: "nz", label: "New Zealand", flag: "🇳🇿" },
    { code: "no", label: "Norway", flag: "🇳🇴" },
    { code: "pl", label: "Poland", flag: "🇵🇱" },
    { code: "za", label: "South Africa", flag: "🇿🇦" },
    { code: "se", label: "Sweden", flag: "🇸🇪" },
    { code: "us", label: "USA", flag: "🇺🇸" },
    { code: "all", label: "World", flag: "🌍" },
  ];
  const flags1045 = [
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
    { code: "pl", label: "Poland", flag: "🇵🇱" },
    { code: "se", label: "Sweden", flag: "🇸🇪" },
    { code: "sk", label: "Slovakia", flag: "🇸🇰" },
    { code: "all", label: "World", flag: "🌍" },
  ];
  const flagsCLD_VIP = [
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
    { code: "gr", label: "Greece", flag: "🇬🇷" },
    { code: "hu", label: "Hungary", flag: "🇭🇺" },
    { code: "ie", label: "Ireland", flag: "🇮🇪" },
    { code: "it", label: "Italy", flag: "🇮🇹" },
    { code: "no", label: "Norway", flag: "🇳🇴" },
    { code: "nz", label: "New Zealand", flag: "🇳🇿" },
    { code: "pl", label: "Poland", flag: "🇵🇱" },
    { code: "se", label: "Sweden", flag: "🇸🇪" },
    { code: "sk", label: "Slovakia", flag: "🇸🇰" },
    { code: "all", label: "World", flag: "🌍" },
  ];

  // Ваши флаги определены где-то здесь

  const [lng, setLng] = useState();

  useEffect(() => {
    setLng(i18n.language);
  }, [i18n.language]);

  let source;
  if (typeof window !== "undefined") {
    source = localStorage.getItem("source");
  }

  let newFlag; // Список флагов в зависимости от партнера
  switch (source) {
    case "partner1039":
      newFlag = flags1039;
      break;
    case "partner1043":
      newFlag = flags1043;
      break;
    case "partner1044":
      newFlag = flags1044;
      break;
    case "CLD_VIP":
      newFlag = flagsCLD_VIP;
      break;
    case "partner1045_b1":
      newFlag = flags1045;
      break;
    case "partner1046":
      newFlag = flagsCLD_VIP;
      break;
      case "partner1050":
        newFlag = flags1043;
        break;
      case "partner1049":
        newFlag = flagsCLD_VIP;
        break;
      case "partner1047":
        newFlag = flagsCLD_VIP;
        break;
    default:
      newFlag = flags;
      break;
  }

  const renderValue = (selected) => {
    if (selected.length === 0) {
      const languageFlag =
        newFlag.find((f) => f.code === language)?.code ||
        newFlag.find((f) => f.code === "all").code;
      return (
        <div className="flex items-center country-flag">
          {/* <em className="flagflag ">{languageFlag}</em> */}
          <span className={`flag-icon flag-icon-${languageFlag}`} />
          <em className="flagflag2 ">{lng ? lng.toUpperCase() : ""}</em>
        </div>
      );
    }
    return selected
      .map((code) => {
        const flag = newFlag.find((flag) => flag.code === code);
        return flag ? `${flag.flag}` : code;
      })
      .join(", ");
  };

  return (
    <div className="relative inline-block text-left mobile-switcher">
      <Menu>
        {({ open }) => (
          <>
            <div>
              <MenuButton className="inline-flex w-full justify-center items-center gap-x-1.5 rounded-md text-sm font-semibold shadow-sm p10">
                {renderValue(personName)}
              </MenuButton>
            </div>
            <MenuItems
              className={`absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md focus:outline-none transition-transform transform ${
                open ? "scale-100 opacity-100" : "scale-95 opacity-0"
              }`}
            >
              <div className="lang-menu">
                <MenuItem>
                  {({ active }) => (
                    <div className={`block text-sm text-white `}>
                      <Label className="block text-sm font-medium leading-6 text-white w-full ml-2">
                        {t("Your country of residence")}
                      </Label>
                      <BrandsSwitcher />
                    </div>
                  )}
                </MenuItem>
                <MenuItem>
                  {({ active }) => (
                    <div className={`block text-sm text-white lng-sw`}>
                      <Label className="block text-sm font-medium leading-6 text-white w-full ml-2">
                        {t("Website language")}
                      </Label>
                      <LanguageSwitcher />
                    </div>
                  )}
                </MenuItem>
              </div>
            </MenuItems>
          </>
        )}
      </Menu>
    </div>
  );
}
