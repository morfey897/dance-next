'use client';
import { useTranslation } from "../../hooks/useTranslation";
import dictionary from '@/i18n/currency';

const CurrencyLabel = ({ currency, short }: { currency: string; short?: boolean; }) => {
  const symbol = useTranslation(`${currency}.symbol`, dictionary);
  const transition = useTranslation(currency, dictionary);
  return short ? symbol : transition;
}

export default CurrencyLabel;