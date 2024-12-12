"use client";

import React, { useState } from "react";
import PinInput from "react-pin-input";
// import Loader from "@/components/Loader_component/Loader"; 
import Image from "next/image";
// import otp from "@/public/images_site/otp-ver.png";
import { useTranslation } from "react-i18next";
import { useRouter } from 'next/navigation';

interface Props {
  otpId: string;
  email: string;
  onChangeEmail: () => void;
}

const VerifyOtpForm: React.FC<Props> = ({ otpId, email, onChangeEmail }) => {
  const { t } = useTranslation();
  const router = useRouter();

  const [code, setCode] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [attempts, setAttempts] = useState(0);
  const maxAttempts = 5;

  const handleComplete = (value: string) => {
    setCode(value);
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otpId, otpCode: code, email }),
      });

      const data = await res.json();

      if (data.success) {
        // Сохранение статуса авторизации в localStorage
        localStorage.setItem('authorized', JSON.stringify({ email, otpVerified: true }));
        // Перенаправление пользователя на главную страницу или другую целевую страницу
        // router.push('/'); // Используем useRouter для перенаправления
        // router.refresh(); 
        window.location.href = '/';
      } else {
        setError(data.message || t("Error when verifying OTP."));
        setAttempts((prev) => prev + 1);
      }
    } catch (error) {
      console.error("OTP verification error:", error);
      setError(t("An error occurred during OTP verification."));
      setAttempts((prev) => prev + 1);
    } finally {
      setLoading(false);
    }
  };

  if (attempts >= maxAttempts) {
    return (
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-4">{t("Maximum Attempts Exceeded")}</h2>
        <p className="text-red-500 mb-4">{t("Please request OTP again.")}</p>
      </div>
    );
  }

  return (
    <div className="otp-v flex flex-col items-center">
      {/* <Image src={otp} width={70} height={70} alt="otp verification" loading="lazy" /> */}
      <h2>{t("Please enter the code")}</h2>
      <p className="text-center mb-4">
        {t("You've received it on")} <span className="font-semibold">{email}</span>
      </p>

      <form onSubmit={handleVerifyOtp} className="w-full">
        <div className="flex space-x-2 mb-4 justify-center">
          <PinInput
            length={6}
            initialValue=""
            onChange={(value, index) => {
              // Дополнительная логика при изменении значения, если необходимо
            }}
            onComplete={handleComplete}
            type="numeric"
            inputMode="number"
            style={{ display: "flex", justifyContent: "center" }}
            inputStyle={{
              width: "2.5rem",
              height: "2.5rem",
              border: "1px solid #ccc",
              borderRadius: "0.375rem",
              textAlign: "center",
              fontSize: "1rem",
            }}
            autoSelect={true}
          />
        </div>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors disabled:opacity-50 flex items-center justify-center welldone"
        >
          {loading ? "loading" : t("SUBMIT")}
        </button>
        {attempts > 0 && attempts < maxAttempts && (
          <p className="text-red-500 text-sm mt-4 text-center">
            {t("Attempts:")} {attempts} {t("of")} {maxAttempts}
          </p>
        )}
        {/* Кнопка для изменения email */}
        <p className="mt-4 text-center">
          {t("Incorrect email? Change it and")}{" "}
          <span className="resend text-blue-500 cursor-pointer" onClick={onChangeEmail}>
            {t("resend the code")}
          </span>
          .
        </p>
      </form>
    </div>
  );
};

export default VerifyOtpForm;
