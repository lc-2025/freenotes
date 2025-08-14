'use client';

import { isThemeDark } from '@/utils/utilities';
import { THeader } from '@/types/Header';
import { ARIA, THEME } from '@/utils/constants';

/**
 * @description Header component
 * @author Luca Cattide
 * @date 14/08/2025
 * @param {THeader} {
 *   title,
 *   showBack = false,
 *   showPin = false,
 *   showToggle = false,
 * }
 * @returns {*}  {React.ReactNode}
 */
const Header = ({
  title,
  showBack = false,
  showPin = false,
  showToggle = false,
}: THeader): React.ReactNode => {
  const { BACK, PIN } = ARIA;

  /**
   * @description Theme toggle helper
   * Switches the current theme with its variant
   * @author Luca Cattide
   * @date 14/08/2025
   */
  const toggleTheme = (): void => {
    // TODO: setTheme(isThemeDark(theme!));
  };

  return (
    <header className="header h-header-mobile md:h-header-desktop bg-light-bg dark:bg-dark-bg border-light-border dark:border-dark-border flex w-full items-center justify-between border-b px-4 py-6 md:px-8">
      <div className="header__container flex items-center">
        {showBack && (
          <button
            aria-label={BACK}
            className="container__back mr-4 text-2xl text-blue-600 focus-visible:outline focus-visible:outline-blue-600 md:text-3xl dark:text-blue-400"
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
          className="header__pin text-2xl text-blue-600 focus-visible:outline focus-visible:outline-blue-600 md:text-3xl dark:text-blue-400"
          type="button"
        >
          📌
        </button>
      )}
      {showToggle && (
        <button
          aria-label={`Switch to ${/* TODO: isThemeDark(theme!) */ 'foo'} mode`}
          className="header__theme text-2xl text-blue-600 focus-visible:outline focus-visible:outline-blue-600 md:text-3xl dark:text-blue-400"
          onClick={toggleTheme}
          type="button"
        >
          {/* TODO: {theme === THEME.DARK ? '☀️' : '🌙'} */}
        </button>
      )}
    </header>
  );
};

export default Header;
