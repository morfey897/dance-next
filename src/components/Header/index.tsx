"use client";

import clsx from "clsx";
import { useScrollDirection } from "@/components/hooks/useScrollDetect";
import Asset from "@/components/elements/Asset";
import { CTAType } from "@/models/_default";
import { useLocale } from "@/components/hooks/useLocale";
import { defaultLocale } from "../../../i18n.config";
import Image from "next/image";
import staticLogo from "../../../public/assets/logo.png";
import Navigation from "./Navigation";
import Languages from "./Languages";
import { SettingsType } from "@/models/settings";
import { findImage } from "@/utils/filter";

function Header({ settings, navigation }: { settings: SettingsType | undefined; navigation: Array<CTAType> | undefined }) {

  const scrlDetect = useScrollDirection();
  const locale = useLocale();

  const logo = findImage(settings?.images, 'head');

  return <header className={clsx("fixed top-0 z-20 w-full bg-transparent transition-all", {
    'backdrop-blur': scrlDetect.percent > 0.01,
  })}>
    <div className="max-w-screen-xl mx-auto py-2.5 px-4">
      <nav className="flex items-center justify-between">
        <a aria-label={'home page'} href={`/${locale === defaultLocale ? "" : `${locale}/`}`}>
          {!!logo ? <Asset asset={logo} alt="home page" /> : <Image {...staticLogo} alt="" />}
        </a>
        <div className="flex items-center gap-x-1 flex-row-reverse md:flex-row">
          <div className="block md:hidden">
            <button aria-label={'menu'} className="bg-pnk-200 rounded-full h-[30px] w-[30px] text-center group relative">
              <svg className="m-auto" width="20" height="11" viewBox="0 0 20 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line y1="0.5" x2="15" y2="0.5" stroke="white" />
                <line y1="5.5" x2="10" y2="5.5" stroke="white" />
                <line y1="10.5" x2="20" y2="10.5" stroke="white" />
              </svg>
              <Navigation navigation={navigation} mobile />
            </button>
          </div>
          <div className="hidden md:block">
            <Navigation navigation={navigation} />
          </div>
          <Languages />
        </div>
      </nav>
    </div>
  </header>;
}
export default Header;
