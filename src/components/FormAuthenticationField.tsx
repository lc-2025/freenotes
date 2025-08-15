'use client';

import { FieldValues, RegisterOptions, useFormContext } from 'react-hook-form';
import {
  TAutchenticationField,
  TAutchenticationFieldType,
} from '@/types/Authentication';
import { FORM } from '@/utils/constants';

/**
 * @description Authentication form field component
 * @author Luca Cattide
 * @date 15/08/2025
 * @param {TAutchenticationField} {
 *   id,
 *   label,
 *   required,
 *   type,
 * }
 * @returns {*}  {React.ReactNode}
 */
const FormAuthenticationField = ({
  id,
  label,
  required,
  type,
}: TAutchenticationField): React.ReactNode => {
  const { NAME, EMAIL, PASSWORD, PASSWORD_CONFIRM } = FORM.FIELD;
  const {
    formState: { errors },
    register,
    watch,
  } = useFormContext();

  const handlePattern = (
    field: string,
  ): RegisterOptions<FieldValues, TAutchenticationFieldType> | undefined => {
    const regexPassword =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
    const fieldValidation = {
      [NAME.id]: {
        maxLength: 20,
        message: `Invalid ${NAME.id}. Cannot exceed 20 chars.`,
        value: /^[a-zA-Z]+$/i,
      },
      [EMAIL.id]: {
        message: `Invalid ${EMAIL.id} address`,
        value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
      },
      [PASSWORD.id]: {
        message: `Invalid ${PASSWORD.id}. Cannot be less than 8 digits and must contain at least 1 uppercase letter, 1 number, 1 special char`,
        minLength: 8,
        value: regexPassword,
      },
      [PASSWORD_CONFIRM.id]: {
        message: `Invalid ${PASSWORD_CONFIRM.id}. Entered passwords must match`,
        minLength: 8,
        value: regexPassword,
      },
    };

    return fieldValidation[field];
  };

  const handleValidation = (field: string) => {
    const fieldValidation = {
      [NAME.id]: `Invalid ${NAME.id}. Cannot exceed 20 chars.`,
      [EMAIL.id]: `Invalid ${EMAIL.id} address`,
      [PASSWORD.id]: `Invalid ${PASSWORD.id}. Cannot be less than 8 digits and must contain at least 1 uppercase letter, 1 number, 1 special char`,
      [PASSWORD_CONFIRM.id]: `Invalid ${PASSWORD_CONFIRM.id}. Entered passwords must match`,
    };
  };

  return (
    <div
      className={`fieldset__field max-w-note-mobile md:max-w-note-desktop mb-8 w-full ${type === 'checkbox' ? 'flex flex-wrap items-center' : 'h-field-title-mobile md:h-field-title-desktop'}`}
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
        autoComplete={id}
        className={`field__input text-light-text dark:text-dark-text placeholder:text-light-placeholder dark:placeholder:text-dark-placeholder rounded-lg bg-gray-100 font-normal focus-visible:outline focus-visible:outline-blue-600 md:rounded-xl ${
          type === 'checkbox'
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
          pattern: handlePattern(type),
          required: `${label} is required`,
          validate: (value) =>
            value === watch('password') || 'Passwords do not match',
        })}
        type={type}
      />
      {type === 'checkbox' && (
        <label className="field__label cursor-pointer select-none" htmlFor={id}>
          {label}
        </label>
      )}
      {errors[id as keyof typeof errors] && (
        <p
          className={`field__error field__error--${id} basis-full text-base text-red-600 dark:text-red-500`}
        >
          {`${errors[id as keyof typeof errors]!.message}`}
        </p>
      )}
    </div>
  );
};

export default FormAuthenticationField;
