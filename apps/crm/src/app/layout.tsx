import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getTheme } from '@/headers';
import clsx from 'clsx';
import ThemeProvider from '@/components/Theme/provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: `CRM | ${process.env.NEXT_PUBLIC_TITLE}`,
  robots: {
    follow: false,
    index: false,
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const locale = getLocale();
  const theme = getTheme();

  let messages;
  try {
    messages = (await import(`../i18n/${locale}.json`)).default;
  } catch (error) {
    messages = {};
  }

  return (
    <html lang={locale} className={theme || ''}>
      <ThemeProvider />
      <body className={clsx(inter.className, "bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200")}>
        <NextIntlClientProvider messages={messages} locale={locale}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
