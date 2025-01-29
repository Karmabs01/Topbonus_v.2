module.exports = {

"[project]/components/Banners_tailwind/Advent/index.jsx [app-ssr] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "default": ()=>Brands_carousel
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$swr$2f$dist$2f$core$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/node_modules/swr/dist/core/index.mjs [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$swr$2f$dist$2f$core$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/node_modules/swr/dist/core/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Loader$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/components/Loader.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/image.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$switcher$2f$LanguageContext$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/components/switcher/LanguageContext.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$getBrands$2f$getBrands2$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/components/getBrands/getBrands2.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/node_modules/react-i18next/dist/es/index.js [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react-i18next/dist/es/useTranslation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$getUser$2f$getUser$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/components/getUser/getUser.jsx [app-ssr] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
"use client";
;
;
;
;
;
;
;
;
;
;
;
function Brands_carousel() {
    const [newUrl, setNewUrl] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [source, setSource] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    // Итоговый массив брендов (после фильтров и сортировок)
    const [brands, setBrands] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    // «Карусель»: какой индекс сейчас показывается (если вообще нужно автопереключение)
    const [currentBrandIndex, setCurrentBrandIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [fade, setFade] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    // Состояния для активации карточек
    const [lastActivationDate, setLastActivationDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [activatedCardIndex, setActivatedCardIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const { language } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$switcher$2f$LanguageContext$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLanguage"])();
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTranslation"])();
    // Загружаем «активированные» данные из localStorage
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const savedActivationDate = localStorage.getItem("lastActivationDate");
        const savedActivatedCard = localStorage.getItem("activatedCardIndex");
        const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
        if (savedActivationDate === today) {
            setLastActivationDate(savedActivationDate);
            setActivatedCardIndex(savedActivatedCard !== null ? parseInt(savedActivatedCard) : null);
        } else {
            // Если дата изменилась, сбрасываем активацию
            localStorage.removeItem("lastActivationDate");
            localStorage.removeItem("activatedCardIndex");
            setLastActivationDate(null);
            setActivatedCardIndex(null);
        }
    }, []);
    // Подчищаем URL, извлекаем партнёров и т. п. (ваш код)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const currentUrl = window.location.href;
        const indexOfQuestionMark = currentUrl.indexOf("?");
        const newUrl2 = indexOfQuestionMark !== -1 ? currentUrl.substring(0, indexOfQuestionMark) : currentUrl;
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
            "partner1047"
        ];
        function setPartnerSource(keyword) {
            const partner = partners.find((p)=>keyword && keyword.includes(p));
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
                }
            }
        }
        if (currentKeyword) {
            setPartnerSource(currentKeyword);
        }
        const savedUrl = localStorage.getItem("savedUrl");
        if (savedUrl) {
            setNewUrl(savedUrl);
        }
    }, [
        language
    ]);
    // Подгружаем бренды через SWR
    const { data, error } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$swr$2f$dist$2f$core$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"])([
        "brands",
        language
    ], ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$getBrands$2f$getBrands2$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getBrands"])(language), {
        initialData: brands
    });
    let userId = "";
    if (typeof window !== "undefined") {
        userId = localStorage.getItem("user_id") || "";
    }
    // Приоритетные бренды
    const priorityBrands = [
        "Blockbets",
        "Spinjo",
        "FairSpin",
        "LuckyChoo",
        "FairPari",
        "Winbay"
    ];
    // Основные категории, как в вашем коде
    const categoryBrands = {
        key1: "Video",
        key2: "Advent"
    };
    const categoryBrands2 = {
        key1: "Segment2",
        key2: "Premium"
    };
    // Когда данные загрузились, фильтруем, сортируем, оставляем до 24 штук
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const fetchUserBrands = async ()=>{
            try {
                if (!data || data.length === 0) {
                    console.warn("Данные брендов отсутствуют");
                    setLoading(false);
                    return;
                }
                // 1) Берём основные бренды (Video: Advent)
                const mainCategoryData = data.filter((rowData)=>rowData[categoryBrands.key1] === categoryBrands.key2);
                // 2) Берём вторую категорию (Segment2: Premium)
                const secondaryCategoryData = data.filter((rowData)=>rowData[categoryBrands2.key1] === categoryBrands2.key2);
                // Объединяем
                let finalFilteredBrands = [
                    ...mainCategoryData,
                    ...secondaryCategoryData
                ];
                // Если есть userId — фильтруем продажи
                let salesCampaignIds = [];
                if (userId) {
                    const dataUser = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$getUser$2f$getUser$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getUserData"])(userId);
                    let sales = dataUser.sales;
                    if (typeof sales === "string") {
                        try {
                            sales = JSON.parse(sales);
                        } catch (error) {
                            console.error("Ошибка при парсинге sales:", error);
                            sales = [];
                        }
                    }
                    if (!Array.isArray(sales)) {
                        sales = [];
                    }
                    salesCampaignIds = sales.map((sale)=>sale.campaignId);
                    finalFilteredBrands = finalFilteredBrands.filter((brand)=>!salesCampaignIds.includes(brand.KeitaroGoBigID) && !salesCampaignIds.includes(brand.KeitaroR2dID));
                }
                // Гарантируем хотя бы 24
                if (finalFilteredBrands.length < 5) {
                    const needed = 5 - finalFilteredBrands.length;
                    const usedBrands = new Set(finalFilteredBrands.map((b)=>b.CasinoBrand));
                    let additional = data.filter((brand)=>!usedBrands.has(brand.CasinoBrand) && !(salesCampaignIds.includes(brand.KeitaroGoBigID) || salesCampaignIds.includes(brand.KeitaroR2dID)));
                    if (additional.length > 0) {
                        finalFilteredBrands = finalFilteredBrands.concat(additional.slice(0, needed));
                    }
                }
                if (finalFilteredBrands.length < 5) {
                    finalFilteredBrands = data.slice(0, 5);
                }
                // Проверяем присутствие приоритетных
                const ensureBrandInList = (brandName)=>{
                    const existsInFinal = finalFilteredBrands.some((b)=>(b.CasinoBrand || "").toLowerCase() === brandName.toLowerCase());
                    if (!existsInFinal) {
                        const fromData = data.find((b)=>(b.CasinoBrand || "").toLowerCase() === brandName.toLowerCase());
                        if (fromData) {
                            finalFilteredBrands.push(fromData);
                        }
                    }
                };
                priorityBrands.forEach((brandName)=>ensureBrandInList(brandName));
                // Перестановка приоритетных
                const moveBrandToIndex = (array, brandName, targetIndex)=>{
                    const index = array.findIndex((b)=>(b.CasinoBrand || "").toLowerCase() === brandName.toLowerCase());
                    if (index > -1 && index !== targetIndex) {
                        const [brandObj] = array.splice(index, 1);
                        if (targetIndex >= array.length) {
                            array.push(brandObj);
                        } else {
                            array.splice(targetIndex, 0, brandObj);
                        }
                    }
                };
                moveBrandToIndex(finalFilteredBrands, "Blockbets", 0);
                moveBrandToIndex(finalFilteredBrands, "Spinjo", 1);
                moveBrandToIndex(finalFilteredBrands, "FairSpin", 2);
                moveBrandToIndex(finalFilteredBrands, "LuckyChoo", 3);
                moveBrandToIndex(finalFilteredBrands, "FairPari", 4);
                moveBrandToIndex(finalFilteredBrands, "Winbay", 5);
                finalFilteredBrands = finalFilteredBrands.slice(0, 5);
                setBrands(finalFilteredBrands);
                setLoading(false);
            } catch (error) {
                console.error("Ошибка при получении данных:", error);
                // fallback (если ошибка)
                let fallbackBrands = data.slice(0, 24);
                priorityBrands.forEach((brandName)=>{
                    const inFallback = fallbackBrands.some((b)=>(b.CasinoBrand || "").toLowerCase() === brandName.toLowerCase());
                    if (!inFallback) {
                        const fromData = data.find((b)=>(b.CasinoBrand || "").toLowerCase() === brandName.toLowerCase());
                        if (fromData) {
                            fallbackBrands.push(fromData);
                        }
                    }
                });
                const moveBrandToIndex = (array, brandName, targetIndex)=>{
                    const index = array.findIndex((b)=>(b.CasinoBrand || "").toLowerCase() === brandName.toLowerCase());
                    if (index > -1 && index !== targetIndex) {
                        const [brandObj] = array.splice(index, 1);
                        if (targetIndex >= array.length) {
                            array.push(brandObj);
                        } else {
                            array.splice(targetIndex, 0, brandObj);
                        }
                    }
                };
                moveBrandToIndex(fallbackBrands, "Blockbets", 0);
                moveBrandToIndex(fallbackBrands, "Spinjo", 1);
                moveBrandToIndex(fallbackBrands, "FairSpin", 2);
                moveBrandToIndex(fallbackBrands, "LuckyChoo", 3);
                moveBrandToIndex(fallbackBrands, "FairPari", 4);
                moveBrandToIndex(fallbackBrands, "Winbay", 5);
                fallbackBrands = fallbackBrands.slice(0, 5);
                setBrands(fallbackBrands);
                setLoading(false);
            }
        };
        fetchUserBrands();
    }, [
        data,
        userId,
        categoryBrands.key1,
        categoryBrands.key2,
        categoryBrands2.key1,
        categoryBrands2.key2
    ]);
    // Пример автопереключения карусели
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const interval = setInterval(()=>{
            setFade(false);
            setTimeout(()=>{
                setCurrentBrandIndex((prevIndex)=>(prevIndex + 24) % brands.length);
                setFade(true);
            }, 500);
        }, 5000000);
        return ()=>clearInterval(interval);
    }, [
        brands.length
    ]);
    // Функция для получения текущей даты в формате YYYY-MM-DD
    const getTodayDateString = ()=>{
        return new Date().toISOString().split("T")[0];
    };
    // Когда пользователь жмёт «Activate»
    const handleActivate = (index)=>{
        const today = getTodayDateString();
        if (lastActivationDate === today) {
            alert(t("You have already activated a card today."));
            return;
        }
        setActivatedCardIndex(index);
        setLastActivationDate(today);
        localStorage.setItem("activatedCardIndex", index);
        localStorage.setItem("lastActivationDate", today);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            id: "advent",
            className: "sm:mt-10 mt-5 mb-5 mob-mt10 advent mb-16",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "main__container advnt",
                children: loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Loader$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                    fileName: "[project]/components/Banners_tailwind/Advent/index.jsx",
                    lineNumber: 351,
                    columnNumber: 13
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-3xl font-bold tracking-tight text-white random-title mb-3 text-center",
                            children: t("Secrets of the Red Envelope: Open and Discover Your Luck!")
                        }, void 0, false, {
                            fileName: "[project]/components/Banners_tailwind/Advent/index.jsx",
                            lineNumber: 354,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mb-3 text-center text-white",
                            children: t("Every day, choose one of the red envelopes to reveal a surprise.Free spins, cashback, or exclusive bonuses are already waiting for you!")
                        }, void 0, false, {
                            fileName: "[project]/components/Banners_tailwind/Advent/index.jsx",
                            lineNumber: 357,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-full brand_carousel rounded-md flex justify-between items-center flex-wrap mt-10",
                            children: [
                                brands.map((rowData, index)=>{
                                    // Определяем, была ли карточка активирована сегодня
                                    const isActivated = activatedCardIndex === index;
                                    const isActivatedToday = lastActivationDate === getTodayDateString();
                                    // Определяем состояние карточки
                                    let cardState;
                                    if (isActivated && isActivatedToday) cardState = "activate";
                                    else cardState = "closed"; // Все остальные карточки закрыты
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `card-advent rounded-xl flex flex-col justify-between basis-[19%] relative mt-16 ${cardState}`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "dated",
                                                children: index + 1
                                            }, void 0, false, {
                                                fileName: "[project]/components/Banners_tailwind/Advent/index.jsx",
                                                lineNumber: 378,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mx-auto max-w-7xl flex flex-col w-full",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mx-auto max-w-2xl lg:mx-0 flex flex-row card-sl",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-full",
                                                        children: isActivated && isActivatedToday ? // Карточка активирована
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex flex-col items-center",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                                    className: "mt-3 mb-2",
                                                                    href: `${rowData.GoBig || "#"}/${newUrl}&creative_id=Everyday_Advent`,
                                                                    target: "_blank",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                                        src: `/brands/${rowData.CasinoBrand || "default"}.png`,
                                                                        alt: rowData.CasinoBrand || "Brand",
                                                                        width: 256,
                                                                        height: 128,
                                                                        loading: "lazy"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/Banners_tailwind/Advent/index.jsx",
                                                                        lineNumber: 390,
                                                                        columnNumber: 35
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/Banners_tailwind/Advent/index.jsx",
                                                                    lineNumber: 385,
                                                                    columnNumber: 33
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "!m-0",
                                                                    children: rowData.OurOfferContent || "Offer details..."
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/Banners_tailwind/Advent/index.jsx",
                                                                    lineNumber: 398,
                                                                    columnNumber: 33
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                                    className: "relative btn-play btn-blick overflow-hidden",
                                                                    href: `${rowData.GoBig || "#"}/${newUrl}&creative_id=Everyday_Advent`,
                                                                    target: "_blank",
                                                                    children: t("Play Now")
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/Banners_tailwind/Advent/index.jsx",
                                                                    lineNumber: 401,
                                                                    columnNumber: 33
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/Banners_tailwind/Advent/index.jsx",
                                                            lineNumber: 384,
                                                            columnNumber: 31
                                                        }, this) : // Карточка не активирована
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex flex-col items-center",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "mt-3 mb-2 nonoact"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/Banners_tailwind/Advent/index.jsx",
                                                                    lineNumber: 412,
                                                                    columnNumber: 33
                                                                }, this),
                                                                lastActivationDate === getTodayDateString() ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "!m-0 text-white",
                                                                    children: t("You have activated a card today")
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/Banners_tailwind/Advent/index.jsx",
                                                                    lineNumber: 414,
                                                                    columnNumber: 35
                                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "!m-0",
                                                                    children: t("Ready to Activate")
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/Banners_tailwind/Advent/index.jsx",
                                                                    lineNumber: 418,
                                                                    columnNumber: 35
                                                                }, this),
                                                                lastActivationDate === getTodayDateString() ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    disabled: true,
                                                                    className: "relative btn-play btn-blick overflow-hidden not-yet",
                                                                    children: t("Not Yet")
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/Banners_tailwind/Advent/index.jsx",
                                                                    lineNumber: 423,
                                                                    columnNumber: 35
                                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    className: "relative btn-play btn-blick overflow-hidden",
                                                                    onClick: ()=>handleActivate(index),
                                                                    children: t("Activate")
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/Banners_tailwind/Advent/index.jsx",
                                                                    lineNumber: 430,
                                                                    columnNumber: 35
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/Banners_tailwind/Advent/index.jsx",
                                                            lineNumber: 411,
                                                            columnNumber: 31
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/Banners_tailwind/Advent/index.jsx",
                                                        lineNumber: 381,
                                                        columnNumber: 27
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/Banners_tailwind/Advent/index.jsx",
                                                    lineNumber: 380,
                                                    columnNumber: 25
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/Banners_tailwind/Advent/index.jsx",
                                                lineNumber: 379,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, index, true, {
                                        fileName: "[project]/components/Banners_tailwind/Advent/index.jsx",
                                        lineNumber: 374,
                                        columnNumber: 21
                                    }, this);
                                }),
                                brands.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-white text-center",
                                    children: t("No Brands Available")
                                }, void 0, false, {
                                    fileName: "[project]/components/Banners_tailwind/Advent/index.jsx",
                                    lineNumber: 447,
                                    columnNumber: 19
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/Banners_tailwind/Advent/index.jsx",
                            lineNumber: 362,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/Banners_tailwind/Advent/index.jsx",
                    lineNumber: 353,
                    columnNumber: 13
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/Banners_tailwind/Advent/index.jsx",
                lineNumber: 349,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/Banners_tailwind/Advent/index.jsx",
            lineNumber: 348,
            columnNumber: 7
        }, this)
    }, void 0, false);
}

})()),
"[project]/app/page.tsx [app-rsc] (ecmascript, Next.js server component, client modules ssr)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname }) => (() => {


})()),

};

//# sourceMappingURL=_295955._.js.map