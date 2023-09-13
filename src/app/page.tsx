import { use } from "react";
import { headers } from 'next/headers';
import type { Metadata } from 'next';


import { getLocale } from '@/headers';

import { request } from "@/lib/sanity.server";
import { PageType, query as queryPage } from "@/models/page";
import { SettingsType, query as querySettings } from "@/models/settings";
import { getMetadata, getJSON_LD } from "@/utils/seo";
import Factory from "@/components/blocks";

export const SLUG = '/';

async function getPage() {
  const locale = getLocale();
  return await request<{ page: PageType; settings: SettingsType }>(
    {
      page: queryPage({ slug: SLUG, locale }),
      settings: querySettings({ locale }),
    });
}

export async function generateMetadata(): Promise<Metadata> {

  const { page, settings } = await getPage();
  return getMetadata(page, settings);
}

export default async function Home() {
  const locale = getLocale();
  const { page, settings } = await getPage();

  return (
    <main>
      <Factory sections={page.sections} settings={settings} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getJSON_LD(settings)) }} />
    </main>
  )
}
