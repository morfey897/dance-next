'use client';
import { useTranslation } from "@/components/hooks/useTranslation";

const CurrencyLabel = ({ currency, short }: { currency: string; short?: boolean; }) => {
  const t = useTranslation('currency');
  return short ? t(`${currency}.symbol`) : t(`${currency}.abr`);
  return currency;
}

export default CurrencyLabel;