import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getTheme } from '@/headers';
import clsx from 'clsx';

const inter = Inter({ subsets: ['latin'] })

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
    <html lang={locale}>
      <body className={clsx(inter.className, theme)}>
        <NextIntlClientProvider messages={messages} locale={locale}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
