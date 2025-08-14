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

export { isThemeDark };
