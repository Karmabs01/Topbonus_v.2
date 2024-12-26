import { NextResponse } from 'next/server';
import prisma from '@/app/utils/db';
import { cookies } from 'next/headers';

// Функция для отправки события в Customer.io
async function sendCustomerIOEvent(customerId: string, email: string) {
  const siteId = process.env.CUSTOMERIO_GURU_SITE_ID;
  const apiKey = process.env.CUSTOMERIO_GURU_API_KEY;

  if (!siteId || !apiKey) {
    console.error('Customer.io credentials are not set.');
    return;
  }

  const url = `https://track.customer.io/api/v1/customers/${encodeURIComponent(customerId)}/events`;
  const payload = {
    name: 'ppc_reg',
    data: { id: customerId, email: email },
  };
  const auth = Buffer.from(`${siteId}:${apiKey}`).toString('base64');

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Basic ${auth}` },
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
// $CUSTOMERIO_GURU_SITE_ID='b0e62a74234c966830e3'
// $CUSTOMERIO_GURU_API_KEY='8603e3e2dbd3bac74072'
// Функция для отправки постбека в BidVertiser
async function sendBidVertiserPostback(bvClickId: string) {
  // AID фиксирован = 398733285
  // revenue фиксирован = 1
  const aid = '398733285';
  const revenue = '1';

  if (!bvClickId) {
    console.warn('BV_CLICKID не найден. Не можем отправить постбек.');
    return;
  }

  const baseUrl = 'https://secure.bidvertiser.com/performance/pc.dbm';
  const url = new URL(baseUrl);
  url.searchParams.set('ver', '1.0');
  url.searchParams.set('AID', aid);
  url.searchParams.set('CLICKID', bvClickId);
  url.searchParams.set('revenue', revenue);

  console.log('POSTBACK URL:', url.toString());

  try {
    const response = await fetch(url.toString(), { method: 'GET' });

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

    const otpEntry = await prisma.otps.findUnique({ where: { id: otpId } });

    if (!otpEntry || otpEntry.email !== email || otpEntry.code !== otpCode) {
      return NextResponse.json({ success: false, message: 'Invalid OTP code or email.' }, { status: 400 });
    }

    const currentTime = new Date();
    if (currentTime > new Date(otpEntry.expires_at)) {
      await prisma.otps.delete({ where: { id: otpId } });
      return NextResponse.json({ success: false, message: 'OTP code has expired.' }, { status: 400 });
    }

    await prisma.otps.delete({ where: { id: otpId } });

    const usernamePart = email.split('@')[0].replace(/[^a-zA-Z0-9]/g, '_');
    const randomDigits = Math.floor(1000000 + Math.random() * 9000000).toString();
    const newId = `${usernamePart}_${randomDigits}_ppc1_1224`;

    const existingUser = await prisma.users.findUnique({ where: { id: newId } });
    if (existingUser) {
      return NextResponse.json({ success: false, message: 'User ID collision. Please try again.' }, { status: 500 });
    }

    await prisma.users.create({
      data: {
        login: usernamePart + '_' + randomDigits,
        id: newId,
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

    await sendCustomerIOEvent(newId, email);

    // Получаем все cookies
    const cookieStore = cookies();
    const allCookies = cookieStore.getAll();
    const params: Record<string, string> = {};

    for (const c of allCookies) {
      params[c.name] = c.value;
    }

    console.log('Params from cookies:', params);

    // Предполагаем, что BV_CLICKID хранится в cookies под ключом 'BV_CLICKID'
    const bvClickId = params['BV_CLICKID'];
    await sendBidVertiserPostback(bvClickId);

    return NextResponse.json({ success: true, message: 'OTP verified and user created.' });
  } catch (error) {
    console.error('Error verifying OTP or creating user:', error);
    return NextResponse.json({ success: false, message: 'Failed to verify OTP or create user.' }, { status: 500 });
  }
}
