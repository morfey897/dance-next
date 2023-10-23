import { PageType } from "@/models/page";
import { SettingsType } from "@/models/settings";
import { Metadata } from "next";
import { urlFor } from "@/lib/sanity";
import { defaultLocale, locales } from "@/i18n.config";
import { getPathname, getLocale } from '@/headers';
import { findImage } from "./filter";
import { replaceLocale } from "./nav";

export const getTitle = (pageTitle: string, rootTitle?: String) => [(pageTitle || "").trim(), (rootTitle || "").trim()].filter(a => !!a).join(" | ");

export const getMetadata = (page: PageType, settings: SettingsType): Metadata => {

  const pathname = getPathname();
  const locale = getLocale();

  const alternatives = locales
    .filter(lang => lang != locale)
    .reduce((inc: Record<string, string>, lang) => {
      inc[lang] = replaceLocale(pathname, lang);
      return inc;
    }, {});

  return {
    title: getTitle(page?.title, settings?.title),
    description: page?.description || "",
    metadataBase: new URL(process.env.NEXT_PUBLIC_DOMAIN || ""),
    openGraph: {
      title: page?.ogTitle || "",
      description: page?.ogDescription || "",
      images: [urlFor(page?.ogImage?.image).url()],
    },
    themeColor: '#161616',
    alternates: {
      canonical: pathname,
      languages: alternatives
    },
    icons: [
      { rel: 'apple-touch-icon', url: '/assets/apple-touch-icon.png', sizes: '180x180' },
      { rel: 'mask-icon', url: '/assets/safari-pinned-tab.svg', color: '#161616' },
      { rel: 'icon', url: '/assets/favicon-32x32.png', sizes: '32x32' },
      { rel: 'icon', url: '/assets/favicon-16x16.png', sizes: '16x16' },
    ],
    manifest: '/site.webmanifest',
  };
}

export const getJSON_LD = (props: SettingsType) => ({
  "@context": "https://schema.org/",
  "@type": "DanceSchool",
  "image": urlFor(findImage(props?.images, '!head')?.image).url(),
  "url": "https://studio-kalipso.com/uk",
  "name": props?.title,
  "description": props?.description,
  "address": {
    "@type": "PostalAddress",
    "streetAddress": [props?.address?.street, props?.address?.building].filter(a => !!a).join(' '),
    "addressLocality": props?.address?.city,
    "addressCountry": props?.address?.country,
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": props?.address?.geo?.lat,
    "longitude": props?.address?.geo?.lng
  },
  "telephone": props?.phones[0]?.code + props?.phones[0]?.number,
  "sameAs": [],
  "openingHoursSpecification": [{
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    "opens": "09:00",
    "closes": "21:00"
  }],
  "paymentAccepted": ["Готівка", "Кредитна карта"]
})