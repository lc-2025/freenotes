'use client';

import { useState } from 'react';
import { Switch } from '@headlessui/react';
import { TSettingsOption } from '@/types/components/SettingsOption';
import { SECTION, STATE } from '@/utils/constants';

/**
 * @description Settings option component
 * @author Luca Cattide
 * @date 14/08/2025
 * @param {TSettingsOption} {
 *   label,
 *   isThemeToggle,
 * }
 * @returns {*}  {React.ReactNode}
 */
const SettingsOption = ({ label }: TSettingsOption): React.ReactNode => {
  /* TODO: const { theme, setTheme } = useTheme();


  const toggleTheme = () => {
    if (isThemeToggle) {
      setTheme(theme === 'dark' ? 'light' : 'dark');
    }
  }; */
  const [enabled, setEnabled] = useState<boolean>(
    STATE.DEFAULT.SETTINGS_OPTION,
  );

  return (
    <aside className="settings-option border-light-border dark:border-dark-border mt-4 flex h-12 w-full items-center justify-between rounded-lg border px-3 md:h-16 md:rounded-xl md:px-4">
      <h6 className="settings-option__title hidden">
        {SECTION.SETTINGS} Option
      </h6>
      <span className="settings-option__label text-light-text dark:text-dark-text text-base font-normal md:text-lg">
        {label}
      </span>
      <Switch
        aria-label={
          true
            ? `Switch to ${/* theme === 'dark' ? 'light' : 'dark' */ 'foo'} mode`
            : `Toggle ${label}`
        }
        checked={enabled}
        className={`group inline-flex h-6 w-11 cursor-pointer items-center rounded-full bg-gray-200 transition focus-visible:outline focus-visible:outline-blue-600 ${
          true
            ? 'data-checked:bg-blue-600 dark:data-checked:bg-blue-500'
            : 'data-checked:bg-gray-300 dark:data-checked:bg-gray-600'
        } }`}
        onChange={setEnabled}
      >
        <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-checked:translate-x-6" />
      </Switch>
    </aside>
  );
};

export default SettingsOption;
