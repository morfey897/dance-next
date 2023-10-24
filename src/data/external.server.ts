import { requestContent } from "@/lib/sanity.server";
import { PageType, query as queryPage } from "@/models/page";
import { SettingsType, query as querySettings } from "@/models/settings";
import { PageParams } from '@/types/params';

export async function getSettings(context: PageParams) {
  return await requestContent<SettingsType>(
    querySettings({}),
    process.env.NODE_ENV === 'development' ? { cache: 'no-cache' } : { cache: 'force-cache', next: { revalidate: 1 * 60 * 60, tags: ['settings'] } }
  );
}

export async function getPage(context: PageParams) {
  const slug = context?.params?.slug || "/";
  return await requestContent<PageType>(
    queryPage({ slug }),
    process.env.NODE_ENV === 'development' ? { cache: 'no-cache' } : { cache: 'force-cache', next: { revalidate: 10 * 60 } }
  );
}
