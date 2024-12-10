"use server";

import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/app/utils/mailer";
import { v4 as uuidv4 } from "uuid";
import db from "@/app/utils/db"; // Импортируем db

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    console.log(`Received OTP request for email: ${email}`);

    // Проверка email
    if (!email || typeof email !== "string") {
      console.error("Invalid format:", email);
      return NextResponse.json(
        { success: false, message: "Invalid format" },
        { status: 400 }
      );
    }

    // Генерация и сохранение OTP
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const otpId = uuidv4();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 минут

    await db("otps").insert({
      id: otpId,
      email,
      code: otpCode,
      expires_at: expiresAt,
    });

    // Отправка OTP по электронной почте
    await sendEmail(
      email,
      "One-time code for topbon.us",
      `Your code for topbon.us: ${otpCode}

Best regards,
The topbon.us Team`
    );

    return NextResponse.json({ success: true, otpId });
  } catch (error) {
    console.error("Error processing send-otp request:", error);
    return NextResponse.json(
      { success: false, message: "Failed to send OTP" },
      { status: 500 }
    );
  }
}
