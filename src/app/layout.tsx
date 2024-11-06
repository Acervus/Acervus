import React from 'react';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { Language } from './components/languageContext/languageContext';
import { Overlay } from './components/overlayContext/overlayContext';
import Header from './components/Header/header';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Acervus',
  description: 'Acervo Digital',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Overlay>
          <Language>
            <Header/>
            <div id='pageContent'>
              {children}
            </div>
          </Language>
        </Overlay>
      </body>
    </html>
  );
}
