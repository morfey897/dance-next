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