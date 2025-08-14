import { TCustomButton } from '@/types/CustomButton';

/**
 * @description Custom button component
 * @author Luca Cattide
 * @date 14/08/2025
 * @param {TCustomButton} { ariaLabel, color, text }
 * @returns {*}  {React.ReactNode}
 */
const CustomButton = ({
  ariaLabel,
  color,
  text,
}: TCustomButton): React.ReactNode => {
  return (
    <button
      aria-label={ariaLabel}
      className={`custom-button h-12 w-full md:h-16 ${color} h-button-mobile md:h-button-desktop flex cursor-pointer items-center justify-center rounded-lg transition-opacity hover:opacity-75 focus-visible:outline focus-visible:outline-blue-600 md:rounded-xl`}
      type="button"
    >
      <span className="custom-button__label text-base font-bold text-white md:text-lg">
        {text}
      </span>
    </button>
  );
};

export default CustomButton;
