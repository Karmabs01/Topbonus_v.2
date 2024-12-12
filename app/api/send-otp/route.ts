// app/api/send-otp/route.ts

import { NextResponse } from 'next/server';
import { sendEmail } from '@/app/utils/mailer';
import { v4 as uuidv4 } from 'uuid';
import prisma from '@/app/utils/db';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    console.log(`Received OTP request for email: ${email}`);

    if (!email || typeof email !== 'string') {
      console.error('Invalid format:', email);
      return NextResponse.json(
        { success: false, message: 'Invalid email format.' },
        { status: 400 }
      );
    }

    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const otpId = uuidv4();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    // Удаляем старые OTP для этого email
    await prisma.otps.deleteMany({
      where: { email },
    });

    // Сохраняем новый OTP
    await prisma.otps.create({
      data: {
        id: otpId,
        email,
        code: otpCode,
        expires_at: expiresAt,
      },
    });

    await sendEmail(email, 'One-time code for topbon.us', `Your code: ${otpCode}`);
    console.log(`OTP successfully sent to ${email}`);

    return NextResponse.json({ success: true, otpId });
  } catch (error) {
    console.error('Error processing send-otp request:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to send OTP.' },
      { status: 500 }
    );
  }
}
