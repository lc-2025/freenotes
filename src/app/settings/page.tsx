import SettingsOption from '@/components/SettingsOption';

/**
 * @description Settings page
 * @author Luca Cattide
 * @date 14/08/2025
 * @export
 * @returns {*}  {React.ReactNode}
 */
export default function SettingsPage(): React.ReactNode {
  return (
    <section className="settings">
      <h6 className='settings__title hidden'>Settings</h6>
      <div className="settings__container mx-4 md:mx-12 mt-4 md:mt-8">
        <SettingsOption label="Theme" /* TODO: isThemeToggle */ />
        <SettingsOption label="Notifications" />
      </div>
    </section>
  );
}
