import Header from "@/components/Header";
import Factory from '@/components/blocks';
import Footer from "@/components/Footer";
import clsx from 'clsx';
import { useTranslation } from '@/components/hooks/useServerTranslation';
import dictionary from "@/i18n/offline.json";
import { getLocale } from "@/headers";

export default async function Page() {
  const locale = getLocale();
  const t = useTranslation(dictionary, locale);

  return (<>
    <Header settings={undefined} navigation={[]} />
    <main className={clsx('overflow-hidden')}>
      <Factory sections={[{
        _id: '_not_found_',
        headline: t('headline'),
        wrapper: {
          code: '__undefined__',
        },
        body: t('subheadline'),
        callToAction: {
          title: t("cta") + " " + "(63) 863 59 92",
          externalUrl: `tel:+380(63) 863 59 92`
        }
      }]} settings={undefined} />
    </main >
    <Footer navigation={[]} settings={undefined} />
  </>
  )
}
