import { ActionDispatch } from 'react';
import cookie from 'cookie';
import { ERROR, THEME } from './constants';
import {
  TStateAuthentication,
  TStateAction,
  TStateUser,
  TStateError,
} from '@/types/state/State';

const { LIGHT, DARK } = THEME;

/**
 * @description Context helper
 * Checks if the context is properly defined
 * @author Luca Cattide
 * @param {(TStateAuthentication | TStateUser | ActionDispatch<[action: TStateAction]>)} context
 * @param {*} TStateAction
 */
const checkContext = (
  context:
    | TStateAuthentication
    | TStateError
    | TStateUser
    | ActionDispatch<[action: TStateAction]>
    | null,
): void => {
  if (context === null) {
    throw new Error(ERROR.CONTEXT);
  }
};

/**
 * @description Theme checker
 * Detects if the current theme is the dark one
 * @author Luca Cattide
 * @date 14/08/2025
 * @param {string} theme
 * @returns {*}  {string}
 */
const isThemeDark = (theme: string): string => (theme === DARK ? LIGHT : DARK);

/**
 * @description Cookie parser
 * @author Luca Cattide
 * @date 28/09/2025
 * @param {(string | undefined)} cookieHeader
 * @returns {*}  {(string | null)}
 */
const parseCookie = (cookieHeader: string | null): string | null => {
  let cookies = null;

  if (cookieHeader) {
    cookies = cookie.parse(cookieHeader);
  }

  return cookies ? cookies.authToken! : cookies;
};

/**
 * @description Text case handler
 * Capitalizes a word initial
 * @author Luca Cattide
 * @date 15/08/2025
 * @param {string} text
 * @returns {*}  {string}
 */
const setInitial = (text: string): string =>
  `${text.charAt(0).toUpperCase()}${text.slice(1)}`;

export { checkContext, isThemeDark, parseCookie, setInitial };
