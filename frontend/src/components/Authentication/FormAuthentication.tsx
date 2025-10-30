'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FormProvider, useForm, SubmitHandler } from 'react-hook-form';
import apiClient from '@/apiClient';
import FormAuthenticationField from './FormAuthenticationField';
import CustomButton from '../Layout/CustomButton';
import { ArrowPathIcon } from '@heroicons/react/24/solid';
import { useStorage } from '@lc-2025/storage-manager';
import { setInitial } from '@/utils/utilities';
import { FORM, ROUTE, STATE, STATE_ACTION, STORAGE } from '@/utils/constants';
import {
  TAuthenticationFields,
  TAuthenticationFieldType,
  TAuthenticationToken,
} from '@/types/components/Authentication';
import { useDispatchContext } from '@/hooks/State';
import handleState from '@/state/actions';
import useStore from '@/hooks/Store';

/**
 * @description Authentication form component
 * @author Luca Cattide
 * @date 15/08/2025
 * @returns {*}  {React.ReactNode}
 */
const FormAuthentication = (): React.ReactNode => {
  const { LOGIN, SIGNUP } = FORM.TYPE;
  const { LOADING, SUBMIT } = FORM.MESSAGE;
  const { API, NOTES } = ROUTE;
  const { REGISTER } = API;
  const { AUTHENTICATION, USER } = STATE_ACTION;
  const {EMAIL} = STORAGE;
  const router = useRouter();
  const { getStorage, setStorage } = useStorage('session');
  const { getAccessToken, setAccessToken } = useStore();
  const [type, setType] = useState<string>(STATE.DEFAULT.FORM);
  const [message, setMessage] = useState<string>('');
  const dispatch = useDispatchContext();
  const methods = useForm<TAuthenticationFields>();
  const { formState, handleSubmit, reset } = methods;
  let formType = setInitial(type);

  useEffect(() => {
    initType();
    handleSubmitCallback();
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
   * @description Form submission callback handler
   * @author Luca Cattide
   * @date 22/10/2025
   */
  const handleSubmitCallback = (): void => {
    if (formState.isSubmitSuccessful) {
      setMessage('');
      reset();
      router.push(NOTES.PATH);
    }
  };

  /**
   * @description Form initialization helper
   * @author Luca Cattide
   * @date 21/10/2025
   */
  const initType = async (): Promise<void> => {
    setType(
      (await getAccessToken(getStorage(EMAIL) ?? ''))
        ? FORM.TYPE.LOGIN
        : STATE.DEFAULT.FORM,
    );
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
  const onSubmit: SubmitHandler<TAuthenticationFields> = async (
    values,
  ): Promise<void> => {
    setMessage(LOADING);

    return await new Promise(async (resolve, reject) => {
      let payload = null;
      let action = {
        type: AUTHENTICATION,
        element: { authenticated: false },
      };

      const emitError = (error: Error): void => {
        setMessage(error.message);
        handleState(action, dispatch);
        reject();
      };

      if (type === SIGNUP) {
        const { acceptance, email, name, password } = values;

        payload = {
          acceptance: acceptance ? 'true' : 'false',
          email,
          name,
          password,
        };
      } else {
        const { email, password } = values;

        payload = {
          email,
          password,
        };
      }

      try {
        const { data, error } = await apiClient(
          type === SIGNUP ? REGISTER : ROUTE.API.LOGIN,
          payload!,
          type === LOGIN
            ? {
                access_token: (await getAccessToken(payload.email)) ?? '',
              }
            : undefined,
        );

        if (error) {
          emitError(error);
        } else if (data) {
          const { email } = payload;

          setStorage(EMAIL, email);
          // Storing access token only to improve security vs CSRF attacks
          setAccessToken(email, (data as TAuthenticationToken).access_token);
          handleState(
            {
              ...action,
              element: { authenticated: true },
            },
            dispatch,
          );
          handleState(
            {
              type: USER,
              element: {
                email,
              },
            },
            dispatch,
          );
          resolve();
        }
      } catch (error) {
        emitError(error as Error);
      }
    });
  };

  return (
    <FormProvider {...methods}>
      <form
        className="authentication-form mt-4 flex w-full flex-col gap-1 px-4 sm:w-auto md:mx-2 md:mt-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <fieldset className="authentication-form__fieldset">
          <legend className="fieldset__legend text-light-text dark:text-dark-text mb-4 text-center font-bold select-none md:mb-8">
            {formType}
          </legend>
          {Object.values(checkVersion(FORM.FIELD)).map(({ id, ...rest }, i) => (
            <FormAuthenticationField
              formType={type}
              id={id as TAuthenticationFieldType}
              key={crypto.randomUUID() + i}
              {...rest}
            />
          ))}
        </fieldset>
        <CustomButton
          ariaLabel={`Submit ${type}`}
          color="bg-blue-600 dark:bg-blue-500 mb-4"
          disabled={formState.isSubmitting}
          text={formState.isSubmitting ? LOADING : formType}
          type="submit"
        />
        {/* TODO: Refactor with actual Google SSO */}
        {/* <CustomButton
          ariaLabel="Sign in with Google"
          text="Sign in with Google"
          color="bg-gray-100 dark:bg-gray-700"
          type="button"
        /> */}
        {(formState.isSubmitting || formState.isSubmitted || message) && (
          <p
            aria-live="polite"
            className={`form__message text-light-text dark:text-dark-text' flex justify-center ${message && 'text-red-600 dark:text-red-500'} basis-full text-base`}
          >
            {formState.isSubmitted ? SUBMIT : message ? message : ''}
            {formState.isSubmitting && message && (
              <span className="message__icon text-primary ml-4 size-6 animate-spin select-none">
                <ArrowPathIcon />
              </span>
            )}
          </p>
        )}
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
