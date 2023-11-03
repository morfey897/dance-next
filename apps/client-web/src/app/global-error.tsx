'use client' // Error components must be Client Components

import { useEffect } from 'react';
import { useTranslation } from '@/components/hooks/useTranslation';
import Article from '@/components/elements/Article';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import dictionary from '@/i18n/error-copy.json';
import Heading from '@/components/elements/Headline/Heading';
import { ChevronDown } from '@/components/elements/Icons';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {


  const t = useTranslation(dictionary);

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (<html>
    <body>
      <Header settings={undefined} navigation={undefined} />
      <main>
        <Article effect={{ x: 'left', y: 'center' }} className='!pt-20 h-[80vh]'>
          <Heading as={'h2'} className='uppercase text-3xl md:text-7xl text-center'>{t('headline')}</Heading>
          <button onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          } className="group space-x-2 block w-fit m-auto mt-7 text-sm md:text-lg text-center border-2 border-pnk-200 rounded-3xl py-2 px-4 hover:bg-pnk-200 hover:border-pnk-200 hover:shadow hover:shadow-pnk-200 active:border-pnk-100 active:shadow active:shadow-pnk-100">
            <span className="inline-block">{t('subheadline')}</span>
            <ChevronDown />
          </button>
        </Article>
      </main>
      <Footer settings={undefined} navigation={undefined} />
    </body>
  </html>
  )
}