import type { Metadata } from 'next';

import { request } from "@/lib/sanity.server";
import { PageType, query as queryPage } from "@/models/page";
import { SettingsType, query as querySettings } from "@/models/settings";
import { getMetadata } from "@/utils/seo";
import Header from "@/components/Header";
import Factory from '@/components/blocks';
import { findImage } from "@/utils/filter";
import Footer from "@/components/Footer";
import clsx from 'clsx';

const SLUG = '/404';

async function getPage() {
  return await request<{ page: PageType; settings: SettingsType }>(
    {
      page: queryPage({ slug: SLUG }),
      settings: querySettings({}),
    },
    process.env.NODE_ENV === 'development' ? { cache: 'no-cache' } : { cache: 'force-cache', next: { revalidate: 10 * 60 } }
  );
}

export async function generateMetadata(): Promise<Metadata> {

  const { page, settings } = await getPage();
  return getMetadata(page, settings);
}

export default async function Page() {
  const { page, settings } = await getPage();

  return (<>
    <Header logo={findImage(settings?.images, 'head')} navigation={[]} />
    <main className={clsx('overflow-hidden')}>
      <Factory sections={page.sections} settings={settings} />
    </main >
    <Footer navigation={[]} settings={settings} />
  </>
  )
}
