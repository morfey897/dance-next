'use client';
import { useTranslations } from 'next-intl';
import { HiUsers, HiCalendar, HiUserCircle, HiHome, HiCog } from "react-icons/hi";
import { HiMiniBuildingStorefront } from "react-icons/hi2"
import React from 'react';
import * as routes from "@/constants/routes";
import NavItem from '../../components/NavItem';
import LocaleSwitcher from './LocaleSwither';

function Aside() {
  const t = useTranslations('header');

  return <div className='flex-shrink-0 h-screen w-14 md:w-32 lg:w-64'>
    <aside className="top-0 bottom-0 z-10 left-0 fixed flex flex-col w-14 md:w-32 lg:w-64 lg:px-4 py-4 lg:py-8  bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700">
      <nav className="flex flex-col flex-1 space-y-2 md:space-y-6 pt-[80px]">

        <NavItem href={routes.ROOT} label={t("root")} Icon={HiHome} />
        <NavItem href={routes.CLIENTS} label={t("clients")} Icon={HiUsers} />
        <NavItem href={routes.SERVICES} label={t("services")} Icon={HiCalendar} />
        <NavItem href={routes.PRODUCTS} label={t("products")} Icon={HiMiniBuildingStorefront} />
        <hr className="my-6 border-gray-200 dark:border-gray-600" />
        <NavItem href={routes.USERS} label={t("users")} Icon={HiUserCircle} />
      </nav>

      <div className="flex flex-col md:flex-row justify-center">
        <NavItem href={routes.SETTINGS} Icon={HiCog} />
        <LocaleSwitcher />
      </div >
    </aside >
  </div>;
}
export default Aside;