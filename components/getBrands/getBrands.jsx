export const getBrands = async (categoryBrands, lng) => {
  const apiAll = "https://bonusnumber1.com/api/brandsNew/read.php";
  const api1039 = "https://bonusnumber1.com/api/brandsNew2/read.php";
  const api1043 = "https://bonusnumber1.com/api/brandsNew3/read.php";
  const api1044 = "https://bonusnumber1.com/api/brandsNew4/read.php";
  const apiCLD_VIP = "https://bonusnumber1.com/api/brandsNew5/read.php";
  const api1045 = "https://bonusnumber1.com/api/brandsNew6/read.php";

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
    { code: "us", label: "United States", flag: "🇺🇸" },
    { code: "all", label: "World", flag: "🌍" }
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
    { code: "ch", label: "Switzerland", flag: "🇨🇭" },
    { code: "nl", label: "Netherlands", flag: "🇳🇱" },
    { code: "de", label: "Germany", flag: "🇩🇪" },
    { code: "gr", label: "Greece", flag: "🇬🇷" },
    { code: "cz", label: "The Czech Republic", flag: "🇨🇿" },
    { code: "fi", label: "Finland", flag: "🇫🇮" },
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

  const partners = {
    partner1039: { url: api1039, languages: availableLanguages1039 },
    partner1043: { url: api1043, languages: availableLanguages1043 },
    partner1050: { url: api1043, languages: availableLanguages1043 },

    partner1044: { url: api1044, languages: availableLanguages1044 },
    CLD_VIP: { url: apiCLD_VIP, languages: availableLanguagesCLD_VIP },
    partner1045_b1: { url: api1045, languages: availableLanguages1045 },
    partner1046: { url: apiCLD_VIP, languages: availableLanguagesCLD_VIP },
    partner1049: { url: apiCLD_VIP, languages: availableLanguagesCLD_VIP },
    partner1047: { url: apiCLD_VIP, languages: availableLanguagesCLD_VIP },

    default: { url: apiAll, languages: availableLanguages },
  };

  const source = localStorage.getItem("source") || "default";
  const { url, languages } = partners[source];

  // Проверяем, поддерживается ли переданный язык
  let supportedLanguage = languages.find(
    (language) => language.code.toUpperCase() === lng.toUpperCase()
  );

  // Если язык не поддерживается, используем "all"
  if (!supportedLanguage) {
    supportedLanguage = { code: "all" };
  }

  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.error("Failed to fetch data:", res.status);
      return [];
    }

    const responseData = await res.json();
    const filteredData = responseData.brandsNew.filter(
      (rowData) =>
        (rowData.GEO === supportedLanguage.code.toUpperCase() ||
          supportedLanguage.code === "ALL") &&
        rowData["CurrentStatus"] === "Ongoing" &&
        !["Mirax (FS)", "Katsubet (FS)", "7Bit (FS)"].includes(
          rowData["CasinoBrand"]
        ) &&
        rowData[categoryBrands.key1] === categoryBrands.key2
    );

    return filteredData;
  } catch (error) {
    console.error("An error occurred:", error);
    return [];
  }
};
