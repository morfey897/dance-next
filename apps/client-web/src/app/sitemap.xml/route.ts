import type { NextRequest } from 'next/server';
import { LOCALES, DEFAULT_LOCALE } from 'config';

type Sitemap = Array<{
  url: string
  lastModified?: string | Date
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  alternates?: {
    languages?: Record<string, string>
  }
}>

function resolveSitemap(data: Sitemap): string {
  const hasAlternates = data.some(
    (item) => Object.keys(item.alternates ?? {}).length > 0
  )

  let content = ''
  content += '<?xml version="1.0" encoding="UTF-8"?>\n'
  content += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"'
  if (hasAlternates) {
    content += ' xmlns:xhtml="http://www.w3.org/1999/xhtml">\n'
  } else {
    content += '>\n'
  }
  for (const item of data) {
    content += '<url>\n'
    content += `<loc>${item.url}</loc>\n`
    if (
      item.alternates?.languages &&
      Object.keys(item.alternates.languages).length
    ) {
      for (const language in item.alternates.languages) {
        content += `<xhtml:link rel="alternate" hreflang="${language}" href="${item.alternates.languages[language]
          }" />\n`
      }
    }
    if (item.lastModified) {
      content += `<lastmod>${item.lastModified instanceof Date
        ? item.lastModified.toISOString()
        : item.lastModified
        }</lastmod>\n`
    }
    content += '</url>\n'
  }
  content += '</urlset>\n'
  return content;
}

export async function GET(request: NextRequest) {

  return new Response(
    resolveSitemap([
      {
        url: `${process.env.NEXT_PUBLIC_DOMAIN}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        alternates: {
          languages: LOCALES.reduce((map: any, lang: string) => {
            map[lang] = `${process.env.NEXT_PUBLIC_DOMAIN}/${DEFAULT_LOCALE === lang ? '' : lang}`;
            return map
          }, {}),
        },
      },
    ]),
    {
      status: 200,
      headers: {
        'content-type': 'application/xml',
      },
    }
  );
}