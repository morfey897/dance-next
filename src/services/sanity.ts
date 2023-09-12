import { createClient } from '@sanity/client';
import type { FilteredResponseQueryOptions } from '@sanity/client';
import imageUrlBuilder from "@sanity/image-url";
import { ImageUrlBuilder } from '@sanity/image-url/lib/types/builder';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

const API_VERSION = `v${new Date().toISOString().split("T")[0]}`;

export const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  useCdn: process.env.NODE_ENV === 'production', // set to `false` to bypass the edge cache
  apiVersion: API_VERSION, // use current date (YYYY-MM-DD) to target the latest API version
  token: process.env.SANITY_SECRET_TOKEN // Only if you want to update content with the client
});

const builder = imageUrlBuilder({
  projectId: process.env.SANITY_PROJECT_ID || "",
  dataset: process.env.SANITY_DATASET || "",
});

export const urlFor = (source?: SanityImageSource) => builder.image(source || process.env.NO_IMAGE || "");

export async function request<Type>(query: string | Record<string, string>, options?: FilteredResponseQueryOptions): Promise<Type> {
  let response;
  const index = (Math.random() * 100000).toFixed();
  const q = typeof query === 'string' ? query : "{" + Object.entries(query).map(([key, value]) => `"${key}": ${value}`).join(",") + "}";
  if (process.env.NODE_ENV === 'development') {
    console.info(`<Request id="${index}">`);
    console.info(q);
    console.info("<Request/>");
  }
  try {
    response = await client.fetch(q, undefined, options || { filterResponse: true });
  } catch (error) {
    response = {};
  }
  if (process.env.NODE_ENV === 'development') {
    console.info(`<Response id="${index}">`);
    console.info(JSON.stringify(response));
    console.info("<Response/>");
  }
  return response;
}