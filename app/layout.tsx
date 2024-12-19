// app/layout.tsx

import Head from "next/head";
import { Analytics } from "@vercel/analytics/react";
import { TheHeader } from "@/components/TheHeader";
import { Header_tailwind } from "@/components/Header_tailwind";
import { Footer_tailwind } from "@/components/Footer_tailwind";
import Chat from "@/components/Chat_support";
import BackToTopButton from "@/components/BackToTopButton";
import "./globals.css";
import type { Metadata } from "next";
import { TheFooter } from "@/components/TheFooter";
import { LanguageProvider } from "@/components/switcher/LanguageContext";
import RandomWindow from "@/components/random/RandomWindow";
import Marque from "@/components/Marque";
import Script from "next/script";
import MainWrapper from "@/components/MainWrapper"; // Импортируем клиентский компонент
import { OtpProvider } from "@/context/OtpContext";
import CaptureParams from "@/components/CaptureParams"; // Импортируем наш клиентский компонент

export const metadata: Metadata = {
  title:
    "Bonus topbon.us: Your Comprehensive Source for Casino Reviews and Insights",
  description:
    "Welcome to Bonus topbon.us, your ultimate destination for comprehensive casino reviews and invaluable insights...",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@500&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className="">
        {/* Включаем LanguageProvider и OtpProvider */}
        <LanguageProvider>
          <OtpProvider>
            {/* Включаем наш клиентский компонент для захвата параметров */}
            <CaptureParams />
            <Header_tailwind />
            <Chat />
            <MainWrapper>
              {children}
              <Analytics />
            </MainWrapper>
            <Footer_tailwind />
          </OtpProvider>
        </LanguageProvider>
        <BackToTopButton />

        {/* Включаем сторонние скрипты */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-LTL641RYK9"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-LTL641RYK9');
          `}
        </Script>

        <Script id="hotjar" strategy="afterInteractive">
          {`
            (function(h,o,t,j,a,r){
                h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                h._hjSettings={hjid:3873571,hjsv:6};
                a=o.getElementsByTagName('head')[0];
                r=o.createElement('script');r.async=1;
                r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                a.appendChild(r);
            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
          `}
        </Script>
      </body>
    </html>
  );
}
