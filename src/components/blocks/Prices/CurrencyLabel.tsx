'use client';
import { useLocale } from "../../hooks/useLocale";
import { currencies } from "../../../../i18n.config";

const CurrencyLabel = ({ currency, short }: { currency: string; short?: boolean; }) => {
  const locale = useLocale();
  const currencyData = (currencies as Record<string, { symbol: string; abr?: Record<string, string>; }>)[currency];
  return (!short && currencyData.abr && currencyData.abr[locale.locale] || currencyData?.symbol || currency);
}

export default CurrencyLabel;