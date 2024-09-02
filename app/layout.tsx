import Head from 'next/head';
import { Analytics } from '@vercel/analytics/react';
import { TheHeader } from '@/components/TheHeader';
import { Header_tailwind } from '@/components/Header_tailwind';
import { Footer_tailwind } from '@/components/Footer_tailwind';

import BackToTopButton from '@/components/BackToTopButton';
import './globals.css';
import type { Metadata } from 'next';
import { TheFooter } from '@/components/TheFooter';
import { LanguageProvider } from '@/components/switcher/LanguageContext';
import RandomWindow from '@/components/random/RandomWindow';
import Marque from '@/components/Marque';
import Script from 'next/script';
import MainWrapper from '@/components/MainWrapper'; // Импортируем клиентский компонент

export const metadata: Metadata = {
  title:
    'Bonus best.topbonuspicks.com: Your Comprehensive Source for Casino Reviews and Insights',
  description:
    'Welcome to Bonus best.topbonuspicks.com, your ultimate destination for comprehensive casino reviews and invaluable insights...',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@500&display=swap"
          rel="stylesheet"
        />
        <Script id="tgm">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','G-LTL641RYK9');
          `}
        </Script>
      </head>
      <body>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=G-LTL641RYK9"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>

        <LanguageProvider>
          <Header_tailwind />

          <MainWrapper> {/* Используем клиентский компонент здесь */}
            {children}
            <Analytics />
          </MainWrapper>
          <Footer_tailwind />
        </LanguageProvider>
        <BackToTopButton />

        <Script id="hotjar">
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
        <Script
          src="https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js"
          defer
        ></Script>
            <Script id="ladesc">
          {`
            (function (d, src, c) {
              var t = d.scripts[d.scripts.length - 1],
                s = d.createElement("script");
              s.id = "la_x2s6df8d";
              s.defer = true;
              s.src = src;
              s.onload = s.onreadystatechange = function () {
                var rs = this.readyState;
                if (rs && rs != "complete" && rs != "loaded") {
                  return;
                }
                c(this);
              };
              t.parentElement.insertBefore(s, t.nextSibling);
            })(document, "https://maw.ladesk.com/scripts/track.js", function (e) {
              LiveAgent.createButton("32wx1d8n", e);
            });
          `}
        </Script>
      </body>
    </html>
  );
}
