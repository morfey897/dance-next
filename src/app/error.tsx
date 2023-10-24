'use client' // Error components must be Client Components

import { useEffect } from 'react';
import { useTranslation } from '@/components/hooks/useTranslation';
import Article from '@/components/elements/Article';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import dictionary from '@/i18n/error-copy.json';
import Heading from '@/components/elements/Headline/Heading';

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

  return (<>
    <Header settings={undefined} navigation={undefined} />
    <main className={'overflow-hidden'}>
      <Article effect={{ x: 'left', y: 'center' }} className='!pt-20 h-[80vh]'>
        <Heading as={'h2'} className='uppercase text-3xl md:text-7xl text-center'>{t('headline')}</Heading>
        <button onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        } className="group space-x-2 block w-fit m-auto mt-7 text-sm md:text-lg text-center border-2 border-pnk-200 rounded-3xl py-2 px-4 hover:bg-pnk-200 hover:border-pnk-200 hover:shadow hover:shadow-pnk-200 active:border-pnk-100 active:shadow active:shadow-pnk-100">
          <span className="inline-block">{t('subheadline')}</span>
          <svg className="animate-bounce inline-block fill-pnk-100 group-hover:animate-none" height="24px" width="24px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 512 512" xmlSpace="preserve">
            <g>
              <g>
                <g>
                  <path d="M256,0C114.618,0,0,114.618,0,256s114.618,256,256,256s256-114.618,256-256S397.382,0,256,0z M256,469.333
				c-117.818,0-213.333-95.515-213.333-213.333S138.182,42.667,256,42.667S469.333,138.182,469.333,256S373.818,469.333,256,469.333
				z"/>
                  <path d="M347.582,198.248L256,289.83l-91.582-91.582c-8.331-8.331-21.839-8.331-30.17,0c-8.331,8.331-8.331,21.839,0,30.17
				l106.667,106.667c8.331,8.331,21.839,8.331,30.17,0l106.667-106.667c8.331-8.331,8.331-21.839,0-30.17
				C369.42,189.917,355.913,189.917,347.582,198.248z"/>
                </g>
              </g>
            </g>
          </svg>
        </button>
      </Article>
    </main>
    <Footer settings={undefined} navigation={undefined} />
  </>
  )
}