// src/app/layout.tsx
import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import '../styles/globals.css';  // ← THIS LINE MUST SAY '../styles/globals.css'
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import localFont from 'next/font/local';


const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-montserrat',
  display: 'swap',
});

const welfareFont = localFont({
  src: '../../public/assets/fonts/Welfare-Bold.ttf',
  variable: '--font-welfare',
  weight: '700',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'BelayAb Team Technologies',
  description: 'Transforming Ethiopia\'s Digital Landscape',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} ${welfareFont.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="min-h-screen bg-white font-body">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}