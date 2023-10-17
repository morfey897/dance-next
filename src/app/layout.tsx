import './globals.css';
import type { Metadata } from 'next'
import { Comfortaa } from 'next/font/google'
import { getLocale } from "@/headers"

const font = Comfortaa({ subsets: ['latin'], weight: ['300', '400', '500'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  const locale = getLocale();
  return (
    <html lang={locale}>
      <body className={font.className}>{children}</body>
    </html>
  )
}
