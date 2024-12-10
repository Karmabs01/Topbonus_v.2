// pages/api/verify-otp.ts (или другой путь вашего API-роута)

import { NextRequest, NextResponse } from 'next/server';
import db from '@/app/utils/db';

export async function POST(request: NextRequest) {
  try {
    const { otpId, otpCode, email } = await request.json();

    console.log('Received data:', { otpId, otpCode, email });

    // Используем транзакцию для обеспечения атомарности операций
    await db.transaction(async (trx) => {
      // Поиск OTP в базе данных
      const otpEntry = await trx('otps').where({ id: otpId, email, code: otpCode }).first();

      if (!otpEntry) {
        throw { status: 400, message: 'Invalid OTP code or email.' };
      }

      // Проверка времени истечения
      const currentTime = new Date();
      const expiresAt = new Date(otpEntry.expires_at);

      if (currentTime > expiresAt) {
        await trx('otps').where({ id: otpId }).del();
        throw { status: 400, message: 'OTP code has expired.' };
      }

      // Удаление использованного OTP
      await trx('otps').where({ id: otpId }).del();

      // Генерация login и id
      const usernamePart = email.split('@')[0].replace(/[^a-zA-Z0-9]/g, '_'); // Убираем специальные символы
      const randomDigits = Math.floor(1000000 + Math.random() * 9000000).toString(); // 7 случайных цифр
      const login = `${usernamePart}_${randomDigits}`;
      const id = `${usernamePart}_${randomDigits}_our`;

      // Проверка уникальности login и id
      const existingUser = await trx('users2').where({ id }).first();
      if (existingUser) {
        throw { status: 500, message: 'User ID collision. Please try again.' };
      }

      // Создание нового пользователя в базе данных
      await trx('users2').insert({
        login,
        id,
        VIP: null,
        balance: 0.00,
        country: 'N/A',
        input: null,
        password: null,
        tickets: '50',
        winbalance: null,
        customer: 'GURU',
        status_payment: null,
        phone_number: null,
        spins_waiting: null,
        geo_approve: null,
        leads: null,
        sales: null,
        qr_code: null,
      });
    });

    // Возвращаем успешный ответ
    return NextResponse.json({ success: true, message: 'OTP verified and user created.' });
  } catch (error) {
    console.error('Error verifying OTP or creating user:', error);

    if (error.status && error.message) {
      return NextResponse.json({ success: false, message: error.message }, { status: error.status });
    }

    return NextResponse.json({ success: false, message: 'Failed to verify OTP or create user.' }, { status: 500 });
  }
}
