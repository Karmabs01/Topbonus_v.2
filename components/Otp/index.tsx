// components/Otp/index.tsx
"use client";

import React, { useState } from "react";
import RequestOtpForm from "@/components/RequestOtpForm";
import VerifyOtpForm from "@/components/VerifyOtpForm";

interface OtpModalProps {
  onClose: () => void;
}

const OtpModal: React.FC<OtpModalProps> = ({ onClose }) => {
  const [otpId, setOtpId] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [keyword2, setKeyword2] = useState<string | null>(null);

  const handleOtpRequested = (id: string, email: string) => {
    setOtpId(id);
    setEmail(email);
  };

  const handleOtpVerified = (keyword: string) => {
    setKeyword2(keyword);
    onClose();
  };

  const handleChangeEmail = () => {
    // Сброс состояния OTP и email для возврата к вводу email
    setOtpId(null);
    setEmail("");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative bg-otp">
        <span
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 cursor-pointer"
        >
          &times;
        </span>
        
        {!otpId ? (
          <RequestOtpForm onOtpRequested={handleOtpRequested} />
        ) : (
          <VerifyOtpForm
            otpId={otpId}
            email={email}
            onChangeEmail={handleChangeEmail} // Передача обработчика изменения email
          />
        )}
      </div>
    </div>
  );
  
};

export default OtpModal;
