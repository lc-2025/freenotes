'use client';

import { FieldValues, RegisterOptions, useFormContext } from 'react-hook-form';
import { FORM } from '@/utils/constants';
import {
  TAutchenticationField,
  TAutchenticationFieldType,
} from '@/types/Authentication';

/**
 * @description Authentication form field component
 * @author Luca Cattide
 * @date 15/08/2025
 * @param {TAutchenticationField} {
 *   formType,
 *   id,
 *   label,
 *   required,
 *   type,
 * }
 * @returns {*}  {React.ReactNode}
 */
const FormAuthenticationField = ({
  formType,
  id,
  label,
  required,
  type,
}: TAutchenticationField): React.ReactNode => {
  const { TYPE, NAME, EMAIL, PASSWORD, PASSWORD_CONFIRM } = FORM.FIELD;
  const { CHECKBOX } = TYPE;
  const {
    formState: { errors },
    register,
  } = useFormContext();

  /**
   * @description Form field autocomplete handler
   * @author Luca Cattide
   * @date 15/08/2025
   * @param {string} field
   * @returns {*}  {string}
   */
  const handleAutocomplete = (field: string): string => {
    const { PASSWORD_NEW } = FORM.AUTOCOMPLETE;

    const attribute = {
      [NAME.id]: NAME.id,
      [EMAIL.id]: EMAIL.id,
      [PASSWORD.id]:
        formType === FORM.TYPE.SIGNUP
          ? PASSWORD_NEW
          : FORM.AUTOCOMPLETE.PASSWORD,
      [PASSWORD_CONFIRM.id]: PASSWORD_NEW,
    };

    return attribute[field];
  };

  /**
   * @description Form validation handler
   * @author Luca Cattide
   * @date 15/08/2025
   * @param {string} field
   * @returns {*}  {(RegisterOptions<FieldValues, TAutchenticationFieldType> | undefined)}
   */
  const handleValidation = (
    field: string,
  ): RegisterOptions<FieldValues, TAutchenticationFieldType> | undefined => {
    const fieldValidation = {
      [NAME.id]: NAME.validation,
      [EMAIL.id]: EMAIL.validation,
      [PASSWORD.id]: PASSWORD.validation,
      [PASSWORD_CONFIRM.id]: PASSWORD_CONFIRM.validation,
    };

    return fieldValidation[field];
  };

  return (
    <div
      className={`fieldset__field max-w-note-mobile md:max-w-note-desktop mb-8 w-full ${type === CHECKBOX ? 'flex flex-wrap items-center' : 'h-field-title-mobile md:h-field-title-desktop'}`}
    >
      <label className="field__label sr-only" htmlFor={id}>
        {label}
      </label>
      <input
        aria-describedby={
          errors[id as keyof typeof errors] ? `field__error--${id}` : undefined
        }
        aria-invalid={errors[id as keyof typeof errors] ? 'true' : 'false'}
        aria-required={required ? 'true' : 'false'}
        autoComplete={handleAutocomplete(id)}
        className={`field__input text-light-text dark:text-dark-text placeholder:text-light-placeholder dark:placeholder:text-dark-placeholder rounded-lg bg-gray-100 font-normal focus-visible:outline focus-visible:outline-blue-600 md:rounded-xl ${
          type === CHECKBOX
            ? `mr-4 cursor-pointer appearance-none p-4 ${
                // TODO: Theme
                true
                  ? 'checked:bg-blue-600 dark:checked:bg-blue-500'
                  : 'checked:bg-gray-300 dark:checked:bg-gray-600'
              }`
            : 'h-full w-full px-2 md:px-4 dark:bg-gray-700'
        }`}
        id={id}
        placeholder={label}
        {...register(id, {
          ...handleValidation(type),
          required: `${label} is required`,
        })}
        type={type}
      />
      {type === CHECKBOX && (
        <label className="field__label cursor-pointer select-none" htmlFor={id}>
          {label}
        </label>
      )}
      {errors[id as keyof typeof errors] && (
        <p
          aria-live="assertive"
          className={`field__error field__error--${id} basis-full text-base text-red-600 dark:text-red-500`}
        >
          {`${errors[id as keyof typeof errors]!.message}`}
        </p>
      )}
    </div>
  );
};

export default FormAuthenticationField;
