'use client';

import { useEffect, useState } from 'react';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { BookmarkIcon as BookmarkIconOutline } from '@heroicons/react/24/outline';
import {
  ArrowLeftIcon,
  BookmarkIcon,
  SunIcon,
  MoonIcon,
  Cog6ToothIcon,
} from '@heroicons/react/16/solid';
import { isThemeDark } from '@/utils/utilities';
import { THeader } from '@/types/components/Header';
import { ARIA, ROUTE, STATE, THEME } from '@/utils/constants';
import { useAuthenticationContext } from '@/hooks/State';

/**
 * @description Header component
 * @author Luca Cattide
 * @date 14/08/2025
 * @returns {*}  {React.ReactNode}
 */
const Header = (): React.ReactNode => {
  const { BACK, PIN } = ARIA;
  const { AUTHENTICATION, NOTES, NOTE, NEW, SETTINGS } = ROUTE;
  const pathname = usePathname();
  const { authenticated } = useAuthenticationContext();
  const params = useParams();
  const router = useRouter();
  const [header, setHeader] = useState<THeader>(STATE.DEFAULT.HEADER);
  const { title, showBack, showPin, showToggle, showSettings } = header;

  useEffect(() => {
    if (!authenticated) {
      router.push(AUTHENTICATION.PATH);
    }

    initHeader();
  }, [pathname]);

  /**
   * @description Header content initialization handler
   * @author Luca Cattide
   * @date 14/08/2025
   */
  const initHeader = (): void => {
    const section = {
      [AUTHENTICATION.PATH]: populateHeader(
        AUTHENTICATION.NAME,
        false,
        false,
        false,
        false,
      ),
      [NOTES.PATH]: populateHeader(NOTES.NAME, false, false, false, true),
      [`${NOTE.PATH}/${params.id}`]: populateHeader(
        NOTE.NAME,
        true,
        true,
        false,
        true,
      ),
      [NEW.PATH]: populateHeader(NEW.NAME, true, false, false, true),
      [SETTINGS.PATH]: populateHeader(SETTINGS.NAME, true, false, false, false),
    };

    setHeader(section[pathname as keyof typeof section]);
  };

  /**
   * @description Header content helper
   * @author Luca Cattide
   * @date 14/08/2025
   * @param {string} title
   * @param {boolean} showBack
   * @param {boolean} showPin
   * @param {boolean} showToggle
   * @returns {*}  {THeader}
   */
  const populateHeader = (
    title: string,
    showBack: boolean,
    showPin: boolean,
    showToggle: boolean,
    showSettings: boolean,
  ): THeader => ({
    title,
    showBack,
    showPin,
    showToggle,
    showSettings,
  });

  /**
   * @description Theme toggle helper
   * Switches the current theme with its variant
   * @author Luca Cattide
   * @date 14/08/2025
   */
  const toggleTheme = (): void => {
    // TODO: setTheme(isThemeDark(theme!));
  };

  /**
   * @description Navigation handler
   * @author Luca Cattide
   * @date 14/08/2025
   * @param {string} path
   */
  const handleNavigation = (path: string): void => {
    router.push(path);
  };

  return (
    <header className="header h-header-mobile md:h-header-desktop bg-light-bg dark:bg-dark-bg border-light-border dark:border-dark-border flex w-full items-center justify-between border-b px-4 md:px-8">
      <aside className="header__container header__container--sx flex items-center">
        {showBack && (
          <button
            aria-label={BACK}
            className="container__back mr-4 cursor-pointer pt-8 pb-8 select-none hover:opacity-75 focus-visible:outline focus-visible:outline-blue-600"
            onClick={() => handleNavigation(NOTES.PATH)}
            type="button"
          >
            <ArrowLeftIcon className="back__icon size-8 text-2xl text-blue-600 md:text-3xl dark:text-blue-400" />
          </button>
        )}
        <h1 className="container__title text-light-text dark:text-dark-text text-xl font-bold select-none md:text-2xl">
          {title}
        </h1>
      </aside>
      <aside className="header__container header__container--dx flex justify-end">
        {showPin && (
          <button
            aria-label={PIN}
            className="header__pin cursor-pointer pt-8 pr-4 pb-8 select-none hover:opacity-75 focus-visible:outline focus-visible:outline-blue-600"
            type="button"
          >
            {/* TODO: Pin system - switch icon */}
            <BookmarkIconOutline className="pin__icon size-8 text-2xl text-blue-600 md:text-3xl dark:text-blue-400" />
          </button>
        )}
        {showToggle && (
          <button
            aria-label={`Switch to ${/* TODO: isThemeDark(theme!) */ 'foo'} mode`}
            className="header__theme cursor-pointer pt-8 pr-4 pb-8 pl-4 text-2xl text-blue-600 select-none hover:opacity-75 focus-visible:outline focus-visible:outline-blue-600 md:text-3xl dark:text-blue-400"
            onClick={toggleTheme}
            type="button"
          >
            {/* TODO: {theme === THEME.DARK ? <SunIcon /> : <MoonIcon />} */}
          </button>
        )}
        {showSettings && (
          <button
            aria-label={ARIA.SETTINGS}
            className={`header__settings cursor-pointer pt-8 pb-8 select-none hover:opacity-75 focus-visible:outline focus-visible:outline-blue-600 ${(showPin || showToggle) && 'pl-4'}`}
            onClick={() => handleNavigation(SETTINGS.PATH)}
            type="button"
          >
            <Cog6ToothIcon className="settings__icon size-8 text-2xl text-blue-600 md:text-3xl dark:text-blue-400" />
          </button>
        )}
      </aside>
    </header>
  );
};

export default Header;
