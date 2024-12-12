import nodemailer from 'nodemailer';

// Создание транспортера с использованием SMTP
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, // Используем false для STARTTLS
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false, // Если SSL-сертификат самоподписан
  },
});

export const sendEmail = async (to: string, subject: string, text: string) => {
  console.log(`Trying to send email to ${to} with subject "${subject}"`);

  const mailOptions = {
    from: `"Topbonus" <info@bubenbot.com>`, // Отправитель
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
