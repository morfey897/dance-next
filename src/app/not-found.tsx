import type { Metadata } from 'next';

import { requestContent } from "@/lib/sanity.server";
import { PageType, query as queryPage } from "@/models/page";
import { SettingsType, query as querySettings } from "@/models/settings";
import { getMetadata } from "@/utils/seo";
import Header from "@/components/Header";
import Factory from '@/components/blocks';
import { findImage } from "@/utils/filter";
import Footer from "@/components/Footer";
import clsx from 'clsx';
import { PageParams } from '@/types/params';

const SLUG = '/404';

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

// export async function generateMetadata(context: PageParams): Promise<Metadata> {

//   const { page, settings } = await getPage();
//   return getMetadata(page, settings);
// }

export default async function Page(context: PageParams) {
  const [page, settings] = await Promise.all([getPage(SLUG), getSettings()]);

  return (<>
    <Header logo={findImage(settings?.images, 'head')} navigation={[]} />
    <main className={clsx('overflow-hidden')}>
      <Factory sections={page.sections} settings={settings} />
    </main >
    <Footer navigation={[]} settings={settings} />
  </>
  )
}
