import { Metadata } from "next";

import FilteredPayments from "@/components/Brands_payments/FilteredPayments2";

import Payments from "@/components/Brands_payments/Payments";
import Brands_carousel from "@/components/Banners_tailwind/Brands_carousel2/index";

export const metadata: Metadata = {
  title: "Payments | Bonus topbon.us",
  description:
    "Navigate the complexities of casino payment methods with ease, thanks to Bonus topbon.us's comprehensive Payments guide. From credit cards and e-wallets to cryptocurrencies, we cover all the options, detailing the pros and cons to help you make informed decisions. Learn about processing times, fees, and security measures so you can deposit and withdraw funds with confidence. Your seamless gaming experience starts with choosing the right payment method, and we're here to guide you every step of the way!",
};

export default async function Bonuses() {
  const categoryBrands = { key1: "Segment2", key2: "Sandbox" };
  const creative = "Page_Payments";
  const target = "Page_Payments";
  return (
    <div className="page-bonuses otp-ver-if">
      <Payments />
      <Brands_carousel
        target={target}
        categoryBrands={categoryBrands}
        creative={creative}
      />
      {/* <TopBrands /> */}
      <FilteredPayments creative={creative} />
      {/* <GuideSlotsPage /> */}
    </div>
  );
}
