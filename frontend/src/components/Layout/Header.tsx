'use client';

import { useEffect, useState } from 'react';
import { useParams, usePathname, useRouter } from 'next/navigation';
import {
  Popover,
  PopoverButton,
  PopoverPanel,
  CloseButton,
} from '@headlessui/react';
import { BookmarkIcon as BookmarkIconOutline } from '@heroicons/react/24/outline';
import {
  ArrowLeftIcon,
  BookmarkIcon,
  SunIcon,
  MoonIcon,
  Cog6ToothIcon,
  UserIcon,
} from '@heroicons/react/16/solid';
import { isThemeDark } from '@/utils/utilities';
import { THeader } from '@/types/components/Header';
import {
  ARIA,
  ROUTE,
  STATE,
  STATE_ACTION,
  STORAGE,
  THEME,
} from '@/utils/constants';
import {
  useAuthenticationContext,
  useDispatchContext,
  useUserContext,
} from '@/hooks/State';
import useStorage from '@/hooks/Storage';
import useApi from '@/hooks/Api';
import handleState from '@/state/actions';
import apiClient from '@/apiClient';
import { TStateUser } from '@/types/state/State';
import { TError } from '@/types/Error';

/**
 * @description Header component
 * @author Luca Cattide
 * @date 14/08/2025
 * @returns {*}  {React.ReactNode}
 */
const Header = (): React.ReactNode => {
  const { BACK, PIN, ACCOUNT } = ARIA;
  const { AUTHENTICATION, NOTES, NOTE, NEW, SETTINGS } = ROUTE;
  const { TOKEN, EMAIL } = STORAGE;
  const { HEADER, ERROR } = STATE.DEFAULT;
  const pathname = usePathname();
  const params = useParams();
  const router = useRouter();
  const { getStorage, deleteStorages } = useStorage();
  const [header, setHeader] = useState<THeader>(HEADER);
  const [error, setError] = useState<TError>(ERROR);
  const { title, showBack, showPin, showToggle, showSettings } = header;
  const { authenticated } = useAuthenticationContext();
  const { email, name } = useUserContext();
  const dispatch = useDispatchContext();

  useEffect(() => {
    // Route guard
    // TODO: Manage refresh
    /* if (!authenticated) {
      router.push(AUTHENTICATION.PATH);
    } */

    initUser();
    initHeader();
  }, [pathname]);

  /**
   * @description User initialization;
   * @author Luca Cattide
   * @date 26/09/2025
   * @returns {*}  {Promise<void>}
   */
  const initUser = async (): Promise<void> => {
    if (pathname !== AUTHENTICATION.PATH && (!email || !name)) {
      const { data, error } = await apiClient(`${ROUTE.API.USER}`, {
        email: getStorage(STORAGE.EMAIL) ?? '',
      });

      if (error) {
        setError({
          title: '',
          message: '',
        });
        // TODO: Visualize somehow
      }

      if (data) {
        const user = data as TStateUser;

        handleState(
          {
            type: STATE_ACTION.USER,
            element: {
              email: user.email,
              name: user.name,
              notes: user.notes,
            },
          },
          dispatch,
        );
      }
    }
  };

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
   * @description Logout handler
   * @author Luca Cattide
   * @date 26/09/2025
   */
  const handleLogout = (): void => {
    deleteStorages([...Object.values(TOKEN), EMAIL]);
    handleState(
      { type: STATE_ACTION.AUTHENTICATION, element: { authenticated: false } },
      dispatch,
    );
    router.push(AUTHENTICATION.PATH);
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
            className="header__account cursor-pointer pt-8 pr-4 pb-8 pl-4 text-2xl text-blue-600 select-none hover:opacity-75 focus-visible:outline focus-visible:outline-blue-600 md:text-3xl dark:text-blue-400"
            onClick={toggleTheme}
            type="button"
          >
            {/* TODO: {theme === THEME.DARK ? <SunIcon /> : <MoonIcon />} */}
          </button>
        )}
        {authenticated && (
          <Popover className="header__account relative">
            <PopoverButton
              aria-label={ACCOUNT}
              className="account__button cursor-pointer pt-8 pr-4 pb-8 select-none hover:opacity-75"
            >
              <UserIcon className="button__icon size-8 text-2xl text-blue-600 md:text-3xl dark:text-blue-400" />
            </PopoverButton>
            <PopoverPanel
              anchor="bottom"
              className="account__panel flex flex-col items-end bg-white shadow-sm"
            >
              <span className="panel__name px-4 pt-4">{name}</span>
              <span className="panel__email px-4">({email})</span>
              <CloseButton
                className="panel__label cursor-pointer px-4 py-4 font-bold hover:text-blue-600 hover:opacity-75"
                onClick={handleLogout}
              >
                Logout
              </CloseButton>
            </PopoverPanel>
          </Popover>
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
