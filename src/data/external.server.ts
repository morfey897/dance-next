import { requestContent } from "@/lib/sanity.server";
import { PageType, query as queryPage } from "@/models/page";
import { PriceType, query as queryPrices } from "@/models/price";
import { DirectionType, query as queryDirections } from "@/models/direction";
import { SettingsType, query as querySettings } from "@/models/settings";
import { PageParams } from '@/types/params';

export async function getSettings(context: PageParams) {
  return await requestContent<SettingsType>(
    querySettings({}),
    { cache: 'no-cache' }
    // process.env.NODE_ENV === 'development' ? { cache: 'no-cache' } : { cache: 'force-cache', next: { revalidate: 1 * 60 * 60, tags: ['settings'] } }
  );
}

export async function getPage(context: PageParams) {
  const slug = context?.params?.slug || "/";
  return await requestContent<PageType>(
    queryPage({ slug }),
    { cache: 'no-cache' }
    // process.env.NODE_ENV === 'development' ? { cache: 'no-cache' } : { cache: 'force-cache', next: { revalidate: 10 * 60 } }
  );
}

export async function getPrices(ids: Array<string> | undefined) {
  if (!ids || ids.length === 0) return [];
  return await requestContent<Array<PriceType>>(
    queryPrices({
      ids
    }),
    { cache: 'no-cache' }
    // process.env.NODE_ENV === 'development' ? { cache: 'no-cache' } : { cache: 'force-cache', next: { revalidate: 10 * 60 } }
  );
}

export async function getDirections(ids: Array<string> | undefined) {
  if (!ids || ids.length === 0) return [];
  return await requestContent<Array<DirectionType>>(
    queryDirections({
      ids
    }),
    { cache: 'no-cache' }
    // process.env.NODE_ENV === 'development' ? { cache: 'no-cache' } : { cache: 'force-cache', next: { revalidate: 10 * 60 } }
  );
}