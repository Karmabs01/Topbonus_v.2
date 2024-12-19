// app/api/verify-otp/route.ts

import { NextResponse } from 'next/server';
import prisma from '@/app/utils/db';
import { cookies } from 'next/headers'; // Для Next.js 13+

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
      console.log('Event ppc_reg успешно отправлен в Customer.io.');
    }
  } catch (error) {
    console.error('Ошибка при отправке события в Customer.io:', error);
  }
}

// Функция для отправки постбека в BidVertiser
async function sendBidVertiserPostback(aid: string, bvClickId: string, revenue: number) {
  const postbackUrl = 'https://secure.bidvertiser.com/performance/pc.dbm'; // Используем HTTPS
  const params = {
    ver: '1.0',
    AID: aid, // Динамический AID из параметров
    CLICKID: bvClickId,
    revenue: revenue.toString(),
  };

  const urlWithParams = `${postbackUrl}?${new URLSearchParams(params).toString()}`;

  try {
    const response = await fetch(urlWithParams, {
      method: 'GET',
      // Примечание: fetch API в Node.js не поддерживает таймаут напрямую. Можно использовать AbortController для этого.
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Failed to send postback to BidVertiser: ${response.status} ${errorText}`);
    } else {
      console.log('Postback успешно отправлен в BidVertiser.');
    }
  } catch (error) {
    console.error('Ошибка при отправке постбека в BidVertiser:', error);
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

    // Извлечение параметров из cookies
    const cookieStore = cookies();
    const aid = cookieStore.get('AID')?.value;
    const bvClickId = cookieStore.get('CLICKID')?.value; // Исправлено на 'CLICKID'
    // Дополнительные параметры, если необходимо:
    // const bvSrcId = cookieStore.get('BV_SRCID')?.value;
    // const bvCampId = cookieStore.get('BV_CAMPID')?.value;
    // const bvGeo = cookieStore.get('BV_GEO')?.value;

    if (aid && bvClickId) { // Отправляем постбек только если AID и CLICKID существуют
      const revenue = 1; // Согласно документации, для тестирования используем revenue=1

      // Отправка постбека в BidVertiser после успешного создания пользователя
      await sendBidVertiserPostback(aid, bvClickId, revenue);
    } else {
      console.warn('AID или CLICKID не найдены в cookies. Постбек в BidVertiser не отправлен.');
    }

    return NextResponse.json({ success: true, message: 'OTP verified and user created.' });
  } catch (error) {
    console.error('Error verifying OTP or creating user:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to verify OTP or create user.' },
      { status: 500 }
    );
  }
}
