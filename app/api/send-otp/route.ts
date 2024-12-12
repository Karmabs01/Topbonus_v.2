// app/api/send-otp/route.ts

import { NextResponse } from 'next/server';
import { sendEmail } from '@/app/utils/mailer';
import { v4 as uuidv4 } from 'uuid';
import prisma from '@/app/utils/db';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    console.log(`Received OTP request for email: ${email}`);

    // Проверка email
    if (!email || typeof email !== 'string') {
      console.error('Invalid format:', email);
      return NextResponse.json(
        { success: false, message: 'Invalid format' },
        { status: 400 }
      );
    }

    // Генерация и сохранение OTP
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString(); // 6 цифр
    const otpId = uuidv4();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 минут

    await prisma.otps.create({
      data: {
        id: otpId,
        email,
        code: otpCode,
        expires_at: expiresAt,
      },
    });

    // Отправка OTP по электронной почте
    await sendEmail(email, 'One-time code for topbon.us', `Your code for topbon.us: ${otpCode}`);

    return NextResponse.json({ success: true, otpId });
  } catch (error) {
    console.error('Error processing send-otp request:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to send OTP' },
      { status: 500 }
    );
  }
}
