'use client';
import { useCallback, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { THEME_COOKIE } from 'config';
import { HiMoon, HiSun } from "react-icons/hi";
import clsx from "clsx";

type ThemeType = 'dark' | 'light' | 'none';

function ThemeSwithcer({className, ...rest}:React.HTMLAttributes<HTMLDivElement>) {

  const router = useRouter();

  const [theme, setTheme] = useState<ThemeType>('none');


  useEffect(() => {
    setTheme(document!.querySelector("body")!.classList.contains('dark') ? 'dark' : 'light');
  }, []);


  const onToggleDarkMode = useCallback(() => {
    let newTheme: ThemeType = 'none';
    if (theme === 'dark') {
      newTheme = 'light';
    } else if (theme === 'light') {
      newTheme = 'dark';
    }
    if (newTheme != 'none') {
      setTheme(newTheme);
      document.cookie = `${THEME_COOKIE}=${newTheme};path=/`;
    }
    router.refresh();
  }, [theme]);

  return theme === 'none' ?
    <div className={clsx("h-6 w-6 bg-slate-700 rounded-full animate-pulse", className)} /> :
    <button onClick={onToggleDarkMode} className={clsx('text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400', className)}>
      {theme === 'dark' && <HiMoon size={24} />}
      {theme === 'light' && <HiSun size={24} />}
    </button>;
}

export default ThemeSwithcer;