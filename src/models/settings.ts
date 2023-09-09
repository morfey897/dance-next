import { client } from "@/services/sanity";
import { AssetType, GROQ_ASSET } from "./page";
import { DefaultProps } from "./_default";

export const GROQ_PHONE = 'code, number';
export type PhoneType = {
  code: string;
  number: string;
};

export const GROQ_SOCIAL = 'title, type, link';
export type SocialType = {
  title: string;
  type: 'instagram' | 'fb' | 'ticktok' | 'telegram' | 'viber' | 'whatsapp';
  link: string;
};

export const GROQ_ADDRESS = `place, country, city, district, street, building, geo`;
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

export const GROQ_SETTINGS = `title, description, image->{${GROQ_ASSET}}, phones[]->{${GROQ_PHONE}}, socials[]->{${GROQ_SOCIAL}}, address->{${GROQ_ADDRESS}}`;
export type SettingsType = {
  title: string;
  description: string;
  image: AssetType,
  phones: Array<PhoneType>;
  socials: Array<SocialType>;
  address: AddressType;
}

type SettingsProps = {

} & DefaultProps;

export const query = (props: SettingsProps) => `*[_type == "settings"][0]{${GROQ_SETTINGS}}`;