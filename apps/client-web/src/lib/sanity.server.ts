import { createClient } from '@sanity/client';
import type { FilteredResponseQueryOptions } from '@sanity/client';
import { DEFAULT_LOCALE } from "config";
import { getLocale } from '@/headers';

const API_VERSION = `v${new Date().toISOString().split("T")[0]}`;

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: process.env.NODE_ENV === 'production', // set to `false` to bypass the edge cache
  apiVersion: API_VERSION, // use current date (YYYY-MM-DD) to target the latest API version
  token: process.env.NEXT_PRIVATE_SANITY_SECRET_TOKEN // Only if you want to update content with the client
});

export async function requestContent<Type>(query: string, options?: FilteredResponseQueryOptions): Promise<Type> {
  let response;
  const locale = getLocale();
  const index = (Math.random() * 100000).toFixed();
  // const q = typeof query === 'string' ?  : "{" + Object.entries(query).map(([key, value]) => `"${key}": ${value}`).join(",") + "}";
  if (process.env.NODE_ENV === 'development' && process.env.NEXT_PRIVATE_LOGGING === 'true') {
    console.info(`<Request id="${index}">`);
    console.info(query);
    console.info("<Request/>");
  }
  try {
    response = await client.fetch(query, { defaultLocale: DEFAULT_LOCALE, locale }, { filterResponse: true, ...options } || {});
  } catch (error) {
    response = {};
  }
  if (process.env.NODE_ENV === 'development' && process.env.NEXT_PRIVATE_LOGGING === 'true') {
    console.info(`<Response id="${index}">`);
    console.info(JSON.stringify(response));
    console.info("<Response/>");
  }
  return response;
}