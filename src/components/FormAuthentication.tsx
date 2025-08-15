'use client';

import { useEffect, useState } from 'react';
import { FormProvider, useForm, SubmitHandler } from 'react-hook-form';
import FormAuthenticationField from './FormAuthenticationField';
import CustomButton from './CustomButton';
import { setInitial } from '@/utils/utilities';
import { FORM, STATE } from '@/utils/constants';
import {
  TAutchenticationFields,
  TAutchenticationFieldType,
} from '@/types/Authentication';

/**
 * @description Authentication form component
 * @author Luca Cattide
 * @date 15/08/2025
 * @returns {*}  {React.ReactNode}
 */
const FormAuthentication = (): React.ReactNode => {
  const { SIGNUP, LOGIN } = FORM.TYPE;
  const [type, setType] = useState<string>(STATE.DEFAULT.FORM);
  const methods = useForm<TAutchenticationFields>();
  const { formState, handleSubmit, reset } = methods;
  let formType = setInitial(type);

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset();
    }
  }, [formState, reset]);

  /**
   * @description Form fields initialization helper
   * @author Luca Cattide
   * @date 15/08/2025
   * @param {{ [x: string]: object }} field
   * @returns {*}  {object}
   */
  const checkVersion = (field: { [x: string]: object }): object => {
    if (type === LOGIN) {
      const { EMAIL, PASSWORD } = field;

      field = {
        EMAIL,
        PASSWORD,
      };
    }

    return field;
  };

  /**
   * @description Form variant setter
   * @author Luca Cattide
   * @date 15/08/2025
   * @returns {*}  {string}
   */
  const setVariant = (): string => (type === SIGNUP ? LOGIN : SIGNUP);

  /**
   * @description Form type switch helper
   * @author Luca Cattide
   * @date 15/08/2025
   */
  const switchForm = (): void => {
    formType = setVariant();

    reset();
    setType(formType);
  };

  /**
   * @description Form submission helper
   * @author Luca Cattide
   * @date 15/08/2025
   */
  const onSubmit: SubmitHandler<TAutchenticationFields> = (): void => {
    // TODO:
    console.log('ok');
  };

  return (
    <FormProvider {...methods}>
      <form
        className="authentication-form mx-1 mt-4 flex flex-col gap-1 md:mx-2 md:mt-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <fieldset className="authentication-form__fieldset">
          <legend className="fieldset__legend text-light-text dark:text-dark-text mb-4 text-center font-bold select-none md:mb-8">
            {formType}
          </legend>
          {Object.values(checkVersion(FORM.FIELD)).map(({ id, ...rest }, i) => (
            <FormAuthenticationField
              formType={type}
              id={id as TAutchenticationFieldType}
              key={crypto.randomUUID() + i}
              {...rest}
            />
          ))}
        </fieldset>
        <CustomButton
          ariaLabel={`Submit ${type}`}
          color="bg-blue-600 dark:bg-blue-500 mb-4"
          text={formType}
          type="submit"
        />
        {/* TODO: Refactor with actual Google SSO */}
        {/* <CustomButton
          ariaLabel="Sign in with Google"
          text="Sign in with Google"
          color="bg-gray-100 dark:bg-gray-700"
          type="button"
        /> */}
        <p className="form__variant mt-4 text-center select-none">
          {type === SIGNUP ? 'Already signed? ' : 'Account needed? '}
          <span
            className="variant__switch cursor-pointer text-base font-bold hover:opacity-75"
            onClick={switchForm}
          >
            {setInitial(setVariant())}
          </span>
        </p>
      </form>
    </FormProvider>
  );
};

export default FormAuthentication;
