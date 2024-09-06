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
    'Bonus topbonuspicks.com: Your Comprehensive Source for Casino Reviews and Insights',
  description:
    'Welcome to Bonus topbonuspicks.com, your ultimate destination for comprehensive casino reviews and invaluable insights...',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className='light all' lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@500&display=swap"
          rel="stylesheet"
        />

        {/* Google Tag Manager */}
        <Script 
          src="https://www.googletagmanager.com/gtag/js?id=G-BTGRSY2322" 
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-BTGRSY2322');
          `}
        </Script>
      </head>
      
      <body >
        <LanguageProvider>
          <Header_tailwind />
          <MainWrapper>
            {children}
            <Analytics />
          </MainWrapper>
          <Footer_tailwind />
        </LanguageProvider>
        <BackToTopButton />

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

        <Script id="ladesc" strategy="afterInteractive">
          {`
            (function (d, src, c) {
              var t = d.scripts[d.scripts.length - 1],
                s = d.createElement('script');
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
