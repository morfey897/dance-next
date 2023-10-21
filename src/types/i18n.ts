import { locales } from '@/i18n.config';
type Lang = (typeof locales)[number];

export type DictionaryType = Record<string, Record<Lang, string>>;