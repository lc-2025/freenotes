import { ActionDispatch } from 'react';
import { ERROR, THEME } from './constants';
import {
  TStateAuthentication,
  TStateAction,
  TStateUser
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
 * @description Text case handler
 * Capitalizes a word initial
 * @author Luca Cattide
 * @date 15/08/2025
 * @param {string} text
 * @returns {*}  {string}
 */
const setInitial = (text: string): string =>
  `${text.charAt(0).toUpperCase()}${text.slice(1)}`;

export { checkContext, isThemeDark, setInitial };
