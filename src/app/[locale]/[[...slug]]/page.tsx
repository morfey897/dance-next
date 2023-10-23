import type { Metadata } from 'next';
import { notFound } from 'next/navigation'

import { requestContent } from "@/lib/sanity.server";
import { PageType, query as queryPage } from "@/models/page";
import { SettingsType, query as querySettings } from "@/models/settings";
import { getMetadata, getJSON_LD } from "@/utils/seo";
import Factory from "@/components/blocks";
import Header from "@/components/Header";
import { findImage } from "@/utils/filter";
import { CTAType } from "@/models/_default";
import Footer from "@/components/Footer";
import clsx from 'clsx';
import { PageParams } from '@/types/params';

// const SLUG = '/';

async function getSettings() {
  return await requestContent<SettingsType>(
    querySettings({}),
    process.env.NODE_ENV === 'development' ? { cache: 'no-cache' } : { cache: 'force-cache', next: { revalidate: 1 * 60 * 60, tags: ['settings'] } }
  );
}

async function getPage(slug: string) {
  return await requestContent<PageType>(
    queryPage({ slug }),
    process.env.NODE_ENV === 'development' ? { cache: 'no-cache' } : { cache: 'force-cache', next: { revalidate: 10 * 60 } }
  );
}

export async function generateMetadata(context: PageParams): Promise<Metadata> {
  const slug = context.params.slug || "/";
  const [page, settings] = await Promise.all([getPage(slug), getSettings()]);
  return getMetadata(page, settings);
}

export default async function Page(context: PageParams) {
  const slug = "/";
  const [page, settings] = await Promise.all([getPage(slug), getSettings()]);
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
          slug: context.params.slug
        }
      }
    }))

  return (<>
    <Header logo={findImage(settings?.images, 'head')} navigation={nav} />
    <main className={clsx('overflow-hidden')}>
      <Factory sections={page.sections} settings={settings} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getJSON_LD(settings)) }} />
    </main>
    <Footer navigation={nav.filter(item => ['schedule', 'prices', 'directions'].includes(item.internalUrl?.anchor?.tag || ""))} settings={settings} />
  </>
  )
}
