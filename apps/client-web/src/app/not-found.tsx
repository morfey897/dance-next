import Header from "@/components/Header";
import Factory from '@/components/blocks';
import Footer from "@/components/Footer";
import clsx from 'clsx';
import { useTranslation } from '@/components/hooks/useServerTranslation';
import dictionary from "@/i18n/not-found.json";
import { getLocale } from "@/headers";

export default async function Page() {
  const locale = getLocale();
  const t = useTranslation(dictionary, locale);

  return (<>
    <Header settings={undefined} navigation={[]} />
    <main>
      <Factory sections={[{
        _id: '_not_found_',
        headline: t('headline'),
        wrapper: {
          code: '__undefined__',
        },
        body: t('subheadline'),
        callToAction: {
          title: t("cta"),
          internalUrl: {
            page: {
              slug: "/"
            }
          }
        }
      }]} settings={undefined} />
    </main >
    <Footer navigation={[]} settings={undefined} />
  </>
  )
}
