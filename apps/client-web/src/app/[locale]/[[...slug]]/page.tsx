import type { Metadata } from 'next';
import { notFound } from 'next/navigation'

import { getMetadata, getJSON_LD } from "@/utils/seo";
import Factory from "@/components/blocks";
import Header from "@/components/Header";
import { CTAType } from "@/models/_default";
import Footer from "@/components/Footer";
import clsx from 'clsx';
import { PageParams } from '@/types/params';
import { getPage, getSettings } from '@/data/external.server';

export async function generateMetadata(context: PageParams): Promise<Metadata> {
  const [page, settings] = await Promise.all([getPage(context), getSettings(context)]);
  return getMetadata(page, settings);
}

export default async function Page(context: PageParams) {
  const [page, settings] = await Promise.all([getPage(context), getSettings(context)]);
  if (!page) {
    notFound();
  }

  const nav: Array<CTAType> = page.sections
    .filter((item) => !!item.anchor?.tag)
    .map((item) => ({
      title: item.menuName || item.headline,
      internalUrl: {
        anchor: {
          tag: item.anchor?.tag || "",
        },
        page: {
          slug: context?.params?.slug || '/'
        }
      }
    }))

  return (<>
    <Header settings={settings} navigation={nav} />
    <main className={clsx('overflow-hidden')}>
      <Factory sections={page.sections} settings={settings} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getJSON_LD(settings)) }} />
    </main>
    <Footer navigation={nav.filter(item => ['schedule', 'prices', 'directions'].includes(item.internalUrl?.anchor?.tag || ""))} settings={settings} />
  </>
  )
}
