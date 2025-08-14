import { Inter } from 'next/font/google';
import Header from '@/components/Header';
import { ERROR } from '@/utils/constants';
import type { Metadata, Viewport } from 'next';
import '../css/globals.css';

const inter = Inter({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '600', '700'],
});

export const metadata: Metadata = {
  description: '',
  title: 'FreeNotes',
};

export const viewport: Viewport = {
  initialScale: 1,
  minimumScale: 1,
  width: 'device-width',
};

/**
 * @description Default layout
 * @author Luca Cattide
 * @date 14/08/2025
 * @export
 * @param {Readonly<{
 *   children: React.ReactNode;
 * }>} {
 *   children,
 * }
 * @returns {*}  {React.ReactNode}
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactNode {
  return (
    <html className="max-h-dvh min-h-dvh" lang="en">
      <head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <noscript>{ERROR.NOSCRIPT}</noscript>
      </head>
      <body
        className={`${inter.variable} max-h-dvh min-h-dvh overflow-hidden antialiased`}
      >
        <div className="main-container flex max-h-dvh min-h-dvh flex-col">
          <Header />
          <main className="main-container__wrapper bg-light-bg dark:bg-dark-bg flex w-full max-w-full flex-1 flex-col items-center overflow-x-hidden overflow-y-auto">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
