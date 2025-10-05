import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { googleSans, googleSansText, productSans } from './fonts';
import './globals.css';
import ReactQueryProvider from '@/providers/ReactQueryProvider';
import { Toaster } from '@/components/ui/sonner';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'Workly Contacts',
    template: '%s | Workly Contacts',
  },
  description:
    'Workly Contacts is a modern contact management app designed to keep your professional and personal connections organized, secure, and easily accessible.',
  keywords: [
    'contact management',
    'address book',
    'CRM',
    'Workly Contacts',
    'organize contacts',
    'secure contacts',
    'import contacts',
    'export contacts',
  ],
  applicationName: 'Workly Contacts',
  authors: [
    { name: 'Workly Contacts Team', url: 'https://contacts.workly.com' },
  ],
  creator: 'Workly Contacts',
  publisher: 'Workly Contacts',
  metadataBase: new URL('https://contacts.workly.com'),

  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'android-chrome',
        url: '/android-chrome-192x192.png',
        sizes: '192x192',
      },
      {
        rel: 'android-chrome',
        url: '/android-chrome-512x512.png',
        sizes: '512x512',
      },
    ],
  },

  manifest: '/site.webmanifest',

  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://contacts.workly.com',
    siteName: 'Workly Contacts',
    title: 'Workly Contacts',
    description:
      'Manage, organize, and secure your contacts with Workly Contacts — your modern address book.',
    images: [
      {
        url: 'https://contacts.workly.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Workly Contacts Preview',
      },
    ],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },

  alternates: {
    canonical: 'https://contacts.workly.com',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Material Symbols */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Sharp"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded"
          rel="stylesheet"
        />
        {/* Material Icons */}
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Icons+Outlined"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Icons+Sharp"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Icons+Round"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${googleSans.variable} ${googleSansText.variable} ${productSans.variable} antialiased`}
      >
        <ReactQueryProvider>{children}</ReactQueryProvider>
        <Toaster closeButton position="top-center" />
      </body>
    </html>
  );
}
