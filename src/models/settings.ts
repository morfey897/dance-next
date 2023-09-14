import { DefaultProps, AssetType, GROQ_ASSET } from "./_default";

export const GROQ_PHONE = 'code, number';
export type PhoneType = {
  code: string;
  number: string;
};

export const GROQ_SOCIAL = 'title, type, link';
export type SocialType = {
  title: string;
  type: 'instagram' | 'fb' | 'tiktok' | 'telegram' | 'viber' | 'whatsapp';
  link: string;
};

export const GROQ_ADDRESS = `place, 
  "country": coalesce(country[$locale], country[$defaultLocale]), 
  "city": coalesce(city[$locale], city[$defaultLocale]),
  "district": coalesce(district[$locale], district[$defaultLocale]),
  "street": coalesce(street[$locale], street[$defaultLocale]),
  "building": coalesce(building[$locale], building[$defaultLocale]),
  geo`;
export type AddressType = {
  place: string;
  building: string;
  district: string;
  geo: {
    lat: number;
    lng: number;
  };
  country: string;
  city: string;
  street: string;
};

export const GROQ_SETTINGS = `"title": coalesce(title[$locale], title[$defaultLocale]), 
  "description": coalesce(description[$locale], description[$defaultLocale]),  
  images[]->{${GROQ_ASSET}}, 
  phones[]->{${GROQ_PHONE}}, 
  socials[]->{${GROQ_SOCIAL}}, 
  address->{${GROQ_ADDRESS}}`;
export type SettingsType = {
  title: string;
  description: string;
  images: Array<AssetType>,
  phones: Array<PhoneType>;
  socials: Array<SocialType>;
  address: AddressType;
}

type SettingsProps = {

} & DefaultProps;

export const query = (props: SettingsProps) => `*[_type == "settings"][0]{${GROQ_SETTINGS}}`;