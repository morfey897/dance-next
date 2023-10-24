import { PhoneType } from "@/models/settings";

export const formatPhone = ({ code, number }: PhoneType) => {
  if (code === '+380' || code === '380') {
    return `(${number.slice(0, 2)}) ${number.slice(2, 5)} ${number.slice(5, 7)} ${number.slice(7)}`
  }

  return [code, number].filter(a => !!a).join(" ");
}

export function capitalize(str: string | undefined) {
  str = str || "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export const joinPath = (splitter: string, ...list: Array<string | number | undefined | null>) => list.filter(Boolean).join(splitter).replace(new RegExp(`\\${splitter}{2,}`, 'g'), splitter);

export const matchDictionary = (token: string, dictionary?: Record<string, string>, options?: Object) => dictionary && dictionary[token] || token;