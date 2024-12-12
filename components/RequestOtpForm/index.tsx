// components/RequestOtpForm.tsx
"use client"; // Обязательно для клиентского компонента

import { useState } from "react";
// import Loader from "@/components/Loader_component/Loader";
import Image from "next/image";
// import otp from "@/public/images_site/send-otp.png";
import "./styled.components.css";
import { useTranslation } from "react-i18next";
import Link from "next/link";

interface Props {
  onOtpRequested: (otpId: string, email: string) => void;
}

const RequestOtpForm: React.FC<Props> = ({ onOtpRequested }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const { t } = useTranslation();

  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const siteLanguage =
        typeof window !== "undefined"
          ? localStorage.getItem("siteLanguage") || "en"
          : "en";
      const res = await fetch("/api/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": siteLanguage,
        },

        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (data.success) {
        onOtpRequested(data.otpId, email);
        setSuccess(t("otpSuccess")); // Перевод сообщения об успехе
      } else {
        // Если data.message содержит ключ перевода, используйте его напрямую
        // В противном случае, используйте общий ключ для ошибок
        setError(data.message ? t(data.message) : t("otpFailed"));
      }
    } catch (error) {
      console.error("OTP request error:", error);
      setError(t("otpError")); // Перевод сообщения об ошибке
    } finally {
      setLoading(false);
    }
  };

  
  return (
    <div className="flex flex-col items-center otp-m">
      {/* <Image src={otp} width={70} height={70} alt={t("otpVerificationAlt")} loading="lazy" /> */}
      <h2>{t("Email verification")}</h2>
      <p className="font-semibold mb-4 text-center">{t("Please enter your Email")}</p>
      <form onSubmit={handleRequestOtp}>
        <div className="mb-4">
          <input
            type="email"
            id="email"
            placeholder={t("Email")}
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-md right-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {success && <p className="text-green-500 text-sm mb-4">{success}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50 flex items-center justify-center welldone"
        >
          {loading ? "Loading": t("Verify")}
        </button>
 
      </form>
    </div>
  );
};

export default RequestOtpForm;
