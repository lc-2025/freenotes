import { THEME } from './constants';

const { LIGHT, DARK } = THEME;

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

export { isThemeDark, setInitial };
