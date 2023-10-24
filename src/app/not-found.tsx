import Header from "@/components/Header";
import Factory from '@/components/blocks';
import Footer from "@/components/Footer";
import clsx from 'clsx';
import { PageParams } from '@/types/params';
import { getPage, getSettings } from '@/data/external.server';

export default async function Page(context: PageParams) {
  context = { ...context, params: { ...context.params, slug: '/404' } };
  const [page, settings] = await Promise.all([getPage(context), getSettings(context)]);

  return (<>
    <Header settings={settings} navigation={[]} />
    <main className={clsx('overflow-hidden')}>
      <Factory sections={page.sections} settings={settings} />
    </main >
    <Footer navigation={[]} settings={settings} />
  </>
  )
}
