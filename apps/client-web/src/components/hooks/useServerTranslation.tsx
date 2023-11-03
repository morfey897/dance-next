import { flatten } from "flat";
import { matchDictionary } from "@/utils/str";

type DictionaryType = Record<string, { [key: string]: string | { [key: string]: string } }>;

export function useTranslation(dictionary: DictionaryType, locale:string) {

  const handler = (token: string, ...props: any) => {
    const list = (dictionary ? flatten<DictionaryType, Record<string, string>>(dictionary) : {});
    return matchDictionary(`${locale}.${token}`, list, props);
  };

  return handler;
}