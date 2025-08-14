import { TSettingsOption } from '@/types/SettingsOption';

const SettingsOption = ({ label, isThemeToggle }: TSettingsOption) => {
  /* TODO: const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    if (isThemeToggle) {
      setTheme(theme === 'dark' ? 'light' : 'dark');
    }
  }; */

  return (
    <aside className="settings-option border-light-border dark:border-dark-border mt-4 flex h-12 w-full items-center justify-between rounded-lg border px-3 md:h-16 md:rounded-xl md:px-4">
      <h6 className="settings-option__title hidden">Settings Option</h6>
      <span className="settings-option__label text-light-text dark:text-dark-text text-base font-normal md:text-lg">
        {label}
      </span>
      <button
        aria-label={
          isThemeToggle
            ? `Switch to ${/* theme === 'dark' ? 'light' : 'dark' */ 'foo'} mode`
            : `Toggle ${label}`
        }
        /* onClick={toggleTheme} */
        className={`settings-option__button h-6 w-12 rounded md:h-8 md:w-16 ${
          isThemeToggle
            ? 'bg-blue-600 dark:bg-blue-500'
            : 'bg-gray-300 dark:bg-gray-600'
        } focus-visible:outline focus-visible:outline-blue-600`}
        type="button"
      ></button>
    </aside>
  );
};

export default SettingsOption;
