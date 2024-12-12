// app/api/verify-otp/route.ts

import { NextResponse } from 'next/server';
import prisma from '@/app/utils/db';

// Функция для отправки события в Customer.io
async function sendCustomerIOEvent(customerId: string, email: string) {
  const siteId = process.env.CUSTOMERIO_GURU_SITE_ID;
  const apiKey = process.env.CUSTOMERIO_GURU_API_KEY;

  if (!siteId || !apiKey) {
    console.error('Customer.io credentials are not set in environment variables.');
    return;
  }

  const url = `https://track.customer.io/api/v1/customers/${encodeURIComponent(customerId)}/events`;

  const payload = {
    name: 'ppc_reg',
    data: {
      keyword: customerId,
      email: email,
    },
  };

  const auth = Buffer.from(`${siteId}:${apiKey}`).toString('base64');

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${auth}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Failed to send event to Customer.io: ${response.status} ${errorText}`);
    } else {
      console.log('Event ppc_reg successfully sent to Customer.io.');
    }
  } catch (error) {
    console.error('Error sending event to Customer.io:', error);
  }
}

export async function POST(request: Request) {
  try {
    const { otpId, otpCode, email } = await request.json();

    console.log('Received data:', { otpId, otpCode, email });

    const otpEntry = await prisma.otps.findUnique({
      where: { id: otpId },
    });

    if (!otpEntry || otpEntry.email !== email || otpEntry.code !== otpCode) {
      return NextResponse.json(
        { success: false, message: 'Invalid OTP code or email.' },
        { status: 400 }
      );
    }

    const currentTime = new Date();
    if (currentTime > new Date(otpEntry.expires_at)) {
      await prisma.otps.delete({ where: { id: otpId } });
      return NextResponse.json(
        { success: false, message: 'OTP code has expired.' },
        { status: 400 }
      );
    }

    await prisma.otps.delete({ where: { id: otpId } });

    const usernamePart = email.split('@')[0].replace(/[^a-zA-Z0-9]/g, '_');
    const randomDigits = Math.floor(1000000 + Math.random() * 9000000).toString();
    const login = `${usernamePart}_${randomDigits}`;
    const id = `${usernamePart}_${randomDigits}_ppc1_1224`;

    const existingUser = await prisma.users.findUnique({
      where: { id },
    });

    if (existingUser) {
      return NextResponse.json(
        { success: false, message: 'User ID collision. Please try again.' },
        { status: 500 }
      );
    }

    await prisma.users.create({
      data: {
        login,
        id,
        VIP: "",
        balance: 0.0,
        country: 'N/A',
        input: "",
        password: "",
        tickets: '50',
        winbalance: "",
        customer: 'GURU',
        status_payment: "",
        phone_number: "",
        spins_waiting: "",
        geo_approve: "",
        leads: "",
        sales: "",
        qr_code: "",
      },
    });

    // Отправка события в Customer.io после успешного создания пользователя
    await sendCustomerIOEvent(id, email);

    return NextResponse.json({ success: true, message: 'OTP verified and user created.' });
  } catch (error) {
    console.error('Error verifying OTP or creating user:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to verify OTP or create user.' },
      { status: 500 }
    );
  }
}
