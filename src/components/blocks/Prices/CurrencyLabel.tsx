'use client';
import { useTranslation } from "@/components/hooks/useTranslation";
import dictionary from "@/i18n/currency.json";

const CurrencyLabel = ({ currency, short }: { currency: string; short?: boolean; }) => {
  const t = useTranslation(dictionary);
  return short ? t(`${currency}.symbol`) : t(`${currency}.abr`);
  return currency;
}

export default CurrencyLabel;