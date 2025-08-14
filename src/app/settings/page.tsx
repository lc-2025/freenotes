import SettingsOption from '@/components/SettingsOption';
import { SECTION, SETTING } from '@/utils/constants';

/**
 * @description Settings page
 * @author Luca Cattide
 * @date 14/08/2025
 * @export
 * @returns {*}  {React.ReactNode}
 */
export default function SettingsPage(): React.ReactNode {
  const { THEME, NOTIFICATIONS } = SETTING.LABEL;
  return (
    <section className="settings">
      <h6 className="settings__title hidden">{SECTION.SETTINGS}</h6>
      <div className="settings__container mx-4 mt-4 md:mx-12 md:mt-8">
        <SettingsOption label={THEME} /* TODO: isThemeToggle */ />
        <SettingsOption label={NOTIFICATIONS} />
      </div>
    </section>
  );
}
