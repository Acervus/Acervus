import React from 'react';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { Language } from './components/languageContext/languageContext';
import { Overlay } from './components/overlayContext/overlayContext';
import Header from './components/Header/header';
import Footer from './components/footer/footer';

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
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${robotoSlab.variable} ${montSerrat.variable}`}>
        <Overlay>
          <Language>
            <Header/>
            <div id='pageContent'>
              {children}
              <Footer/>
            </div>
          </Language>
        </Overlay>
      </body>
    </html>
  );
}
