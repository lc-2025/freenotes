'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { isThemeDark } from '@/utils/utilities';
import { THeader } from '@/types/Header';
import { ARIA, ROUTE, STATE, THEME } from '@/utils/constants';

/**
 * @description Header component
 * @author Luca Cattide
 * @date 14/08/2025
 * @returns {*}  {React.ReactNode}
 */
const Header = (): React.ReactNode => {
  const { BACK, PIN } = ARIA;
  const { HOME, DETAILS, NEW } = ROUTE;
  const pathname = usePathname();
  const router = useRouter();
  const [header, setHeader] = useState<THeader>(STATE.DEFAULT.HEADER);
  const { title, showBack, showPin, showToggle } = header;

  useEffect(() => {
    initHeader();
  }, [pathname]);

  /**
   * @description Header content initialization handler
   * @author Luca Cattide
   * @date 14/08/2025
   */
  const initHeader = (): void => {
    const section = {
      [HOME.PATH]: populateHeader(HOME.NAME, false, false, true),
      [DETAILS.PATH]: populateHeader(DETAILS.NAME, true, true, false),
      [NEW.PATH]: populateHeader(NEW.NAME, true, false, false),
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
  ): THeader => ({
    title,
    showBack,
    showPin,
    showToggle,
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

  const handleBack = (): void => {
    router.push(HOME.PATH);
  };

  return (
    <header className="header h-header-mobile md:h-header-desktop bg-light-bg dark:bg-dark-bg border-light-border dark:border-dark-border flex w-full items-center justify-between border-b px-4 py-6 md:px-8">
      <div className="header__container flex items-center">
        {showBack && (
          <button
            aria-label={BACK}
            className="container__back mr-4 cursor-pointer text-2xl text-blue-600 transition-opacity hover:opacity-75 focus-visible:outline focus-visible:outline-blue-600 md:text-3xl dark:text-blue-400"
            onClick={handleBack}
            type="button"
          >
            ←
          </button>
        )}
        <h1 className="container__title text-light-text dark:text-dark-text text-xl font-bold md:text-2xl">
          {title}
        </h1>
      </div>
      {showPin && (
        <button
          aria-label={PIN}
          className="header__pin cursor-pointer text-2xl text-blue-600 transition-opacity hover:opacity-75 focus-visible:outline focus-visible:outline-blue-600 md:text-3xl dark:text-blue-400"
          type="button"
        >
          📌
        </button>
      )}
      {showToggle && (
        <button
          aria-label={`Switch to ${/* TODO: isThemeDark(theme!) */ 'foo'} mode`}
          className="header__theme cursor-pointer text-2xl text-blue-600 transition-opacity hover:opacity-75 focus-visible:outline focus-visible:outline-blue-600 md:text-3xl dark:text-blue-400"
          onClick={toggleTheme}
          type="button"
        >
          {/* TODO: {theme === THEME.DARK ? '☀️' : '🌙'} */}foo
        </button>
      )}
    </header>
  );
};

export default Header;
