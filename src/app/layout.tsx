import React from 'react';
import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { Language } from './components/languageContext/languageContext';
import { Overlay } from './components/overlayContext/overlayContext';
import Header from './components/Header/header';
import Footer from './components/footer/footer';
import MobileLanguageButton from './components/mobileLanguageButton/mobileLanguageButton';

const robotoSlab = localFont({
  src: './fonts/RobotoSlab.ttf',
  variable: '--font-roboto-slab',
  weight: '100 900',
});
const montSerrat = localFont({
  src: './fonts/Montserrat.ttf',
  variable: '--font-Montserrat',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Acervus',
  description: 'Acervo Digital',
  applicationName: 'Acervus',
  keywords: ['Acervus', 'Acervo', 'Digital', 'casa de taipa', 'museu', 'história', 'cultura', 'arte', 'acervo digital'],
  robots: 'index, follow',
  icons: '/images/favicon.png',
  archives: 'https://acervus.art.br/#acervo',
  category: 'Culture',
  classification: 'Digital Museum',
  manifest: '/site.webmanifest',
};

export const viewport: Viewport = {
  themeColor: '#4840D3',
  colorScheme: 'only light',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" translate="no">
      <body className={`${robotoSlab.variable} ${montSerrat.variable}`}>
        <Overlay>
          <Language>
            <Header/>
            <div id='pageContent'>
              {children}
              <Footer/>
            </div>
            <MobileLanguageButton/>
          </Language>
        </Overlay>
      </body>
    </html>
  );
}
