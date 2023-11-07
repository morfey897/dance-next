import { PageType } from "@/models/page";
import { SettingsType } from "@/models/settings";
import { Metadata } from "next";
import { urlFor } from "@/lib/sanity";
import { LOCALES } from "config";
import { getPathname, getLocale } from '@/headers';
import { findImage } from "./filter";
import { replaceLocale } from "./nav";

export const getTitle = (pageTitle: string, rootTitle?: String) => [(pageTitle || "").trim(), (rootTitle || "").trim()].filter(a => !!a).join(" | ");

export const getLayoutMetadata = (title?: string, description?: string): Metadata => {

  return {
    title: title,
    description: description,
    applicationName: process.env.NEXT_PUBLIC_TITLE,
    viewport: 'minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover',
    appleWebApp: {
      capable: true,
      title: process.env.NEXT_PUBLIC_TITLE,
      statusBarStyle: 'default',
    },
    formatDetection: {
      telephone: false,
    },

    metadataBase: new URL(process.env.NEXT_PUBLIC_DOMAIN || ""),
    themeColor: '#161616',
    icons: [
      { rel: 'apple-touch-icon', url: '/assets/apple-touch-icon.png', sizes: '180x180' },
      { rel: 'mask-icon', url: '/assets/safari-pinned-tab.svg', color: '#161616' },
      { rel: 'icon', url: '/assets/favicon-32x32.png', sizes: '32x32' },
      { rel: 'icon', url: '/assets/favicon-16x16.png', sizes: '16x16' },
    ],
    manifest: '/manifest.json',
  };
}


export const getMetadata = (page: PageType, settings: SettingsType): Metadata => {

  const pathname = getPathname();
  const locale = getLocale();

  const alternatives = LOCALES
    .filter(lang => lang != locale)
    .reduce((inc: Record<string, string>, lang) => {
      inc[lang] = replaceLocale(pathname, lang);
      return inc;
    }, {});

  return {
    openGraph: {
      title: page?.ogTitle || "",
      description: page?.ogDescription || "",
      images: [urlFor(page?.ogImage?.image).url()],
    },
    alternates: {
      canonical: pathname,
      languages: alternatives
    },
    ...getLayoutMetadata(page?.title || settings?.title, page?.description || ""),
  };
}

export const getJSON_LD = (props: SettingsType) => {

  const pathname = getPathname();
  return {
    "@context": "https://schema.org/",
    "@type": "DanceSchool",
    "image": urlFor(findImage(props?.images, '!head')?.image).url(),
    "url": `${process.env.NEXT_PUBLIC_DOMAIN}${pathname}`,
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
  };
}