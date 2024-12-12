import nodemailer from 'nodemailer';

// Создание транспортера с использованием SMTP
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST, // Хост SMTP сервера
  port: parseInt(process.env.SMTP_PORT || '465'), // Порт
  secure: true, // true для порта 465, false для других портов
  auth: {
    user: process.env.SMTP_USER, // Пользователь SMTP
    pass: process.env.SMTP_PASS, // Пароль SMTP
  },
});

export const sendEmail = async (to: string, subject: string, text: string) => {
  console.log(`Trying to send email to ${to} with subject "${subject}"`);

  const mailOptions = {
    from: `"Topbonus" <bounce@bubenbot.com>`, // Отправитель
    to, // Получатель
    subject, // Тема письма
    text, // Текст письма
  };

  try {
    // Отправляем письмо
    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${to}`);
    console.log('Info for letter:', info);
  } catch (error) {
    console.error(`Error sending to ${to}:`, error);
    throw error;
  }
};
