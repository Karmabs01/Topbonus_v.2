import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST, // Убедитесь, что здесь нет 'https://'
  port: parseInt(process.env.SMTP_PORT || '465'),
  secure: true, // Устанавливаем secure: true для порта 465
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendEmail = async (to: string, subject: string, text: string) => {
  console.log(`Trying send email to ${to} with theme "${subject}"`);

  const mailOptions = {
    from: '"Topbonus" <admin@topbonus.com>', // Используйте разрешённый адрес
    to,
    subject,
    text,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${to}`);
    console.log('Info for letter:', info);
  } catch (error) {
    console.error(`Error sendding to ${to}:`, error);
    throw error;
  }
};
