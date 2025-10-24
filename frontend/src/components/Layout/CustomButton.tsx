import { TCustomButton } from '@/types/components/CustomButton';

/**
 * @description Custom button component
 * @author Luca Cattide
 * @date 16/08/2025
 * @param {TCustomButton} {
 *   ariaLabel,
 *   callback,
 *   color,
 *   disabled,
 *   text,
 *   type,
 * }
 * @returns {*}  {React.ReactNode}
 */
const CustomButton = ({
  ariaLabel,
  callback,
  color,
  disabled,
  text,
  type,
}: TCustomButton): React.ReactNode => {
  return (
    <button
      aria-label={ariaLabel}
      className={`custom-button h-12 w-full md:h-16 ${color} h-button-mobile md:h-button-desktop flex cursor-pointer items-center justify-center rounded-lg select-none hover:opacity-75 focus-visible:outline focus-visible:outline-blue-600 md:rounded-xl`}
      disabled={disabled}
      onClick={callback}
      type={type}
    >
      <span className="custom-button__label text-base font-bold text-white md:text-lg">
        {text}
      </span>
    </button>
  );
};

export default CustomButton;
