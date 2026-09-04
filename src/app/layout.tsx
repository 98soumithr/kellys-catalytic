import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SITE_DESCRIPTION, SITE_TITLE } from '@/data/site';
import '@/styles/globals.css';

const poppins = localFont({
  src: [
    { path: '../../public/fonts/poppins-400.woff2', weight: '400', style: 'normal' },
    { path: '../../public/fonts/poppins-600.woff2', weight: '600', style: 'normal' },
    { path: '../../public/fonts/poppins-700.woff2', weight: '700', style: 'normal' },
    { path: '../../public/fonts/poppins-800.woff2', weight: '800', style: 'normal' },
  ],
  variable: '--font-poppins',
  display: 'swap',
  fallback: ['sans-serif'],
});

/**
 * A single metadata export, deliberately NOT overridden per route.
 * The reference is a client-rendered SPA that never updates document.title, so
 * every one of its routes serves this exact title/description. Replicating that
 * was an explicit project decision — see docs/DECISIONS.md (D-004).
 */
export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  generator: 'Hostinger Horizons',
  icons: {
    icon: '/icons/favicon.png',
    apple: '/icons/favicon.png',
    shortcut: '/icons/favicon.png',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={poppins.variable}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
