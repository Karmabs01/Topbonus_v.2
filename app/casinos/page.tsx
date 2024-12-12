import { Metadata } from "next";

import FilteredCasinos from "@/components/Brands_casinos/FilteredCasinos2";
import Casinos2 from "@/components/Brands_casinos/Casinos2";
import Brands_carousel from "@/components/Banners_tailwind/Brands_carousel2/index";



export const metadata: Metadata = {
  title: "Casinos | Bonus topbon.us",
  description:
    "Embark on a thrilling journey through the diverse world of online casinos with our all-inclusive guide at Bonus topbon.us. From the industry giants to hidden gems, our comprehensive guide reviews the most trustworthy and entertaining casinos in the market. Discover what sets each casino apart in terms of game offerings, customer service, bonuses, and security features. Additionally, navigate our curated list of top-rated online casinos to find the perfect match for your gaming preferences. Whether you're a novice player taking your first steps or a seasoned veteran, our guide equips you with everything you need for an enriching gaming experience.",
};

export default async function Casinos() {
  const categoryBrands = { key1: "Segment2", key2: "Sandbox" };
  const creative = "Page_Casinos";
  const target = "Page_Casinos"

  
  return (
    <div className="page-bonuses otp-ver-if">
      {/* <PreviewBonuses /> */}
      <Casinos2 />
      <Brands_carousel target={target} categoryBrands={categoryBrands} creative={creative} />
      <FilteredCasinos creative={creative} />
      {/* <GuideSlotsPage /> */}
    </div>
  );
}
