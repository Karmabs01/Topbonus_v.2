"use client";
import React, { useState, useRef, useEffect } from "react";
import { getBrands } from "@/components/getBrands/getBrands2";
import useSWR from "swr";
import { useLanguage } from "@/components/switcher/LanguageContext";
import Image from "next/image";

const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { language } = useLanguage();
  // Если вам не нужно отдельно хранить brands — можно сразу задать пустой массив в fallbackData.
  const { data, error } = useSWR(
    ["brands", language],
    () => getBrands(language),
    { fallbackData: [] }
  );

  // Создаем ref для контейнера
  const containerRef = useRef(null);

  // Если данных нет, можно показать лоадер
  if (!data) return <div>Загрузка...</div>;

  // Фильтрация по полям CasinoBrand и OurOfferContent (без учёта регистра)
  const filteredData = data.filter((item) => {
    const lowerSearch = searchTerm.toLowerCase();
    return (
      item.CasinoBrand.toLowerCase().includes(lowerSearch) ||
      item.OurOfferContent.toLowerCase().includes(lowerSearch)
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
                <a href={item.GoBig} className="relative w-16 h-16">
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
                    href={item.GoBig}
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
            <li className="text-gray-500 px-2 py-2">Ничего не найдено</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchComponent;
