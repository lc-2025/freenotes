import { useContext, ActionDispatch } from 'react';
import { AuthenticationContext, DispatchContext, UserContext } from '@/state/contexts';
import { checkContext } from '@/utils/utilities';
import { TStateAuthentication, TStateAction, TStateUser } from '@/types/state/State';

/**
 * @description Authentication context hook
 * @author Luca Cattide
 * @date 25/09/2025
 * @returns {*}  {TStateAuthentication}
 */
const useAuthenticationContext = (): TStateAuthentication => {
  const context = useContext(AuthenticationContext);

  checkContext(context);

  return context;
};

/**
 * @description User context hook
 * @author Luca Cattide
 * @date 26/09/2025
 * @returns {*}  {TStateUser}
 */
const useUserContext = (): TStateUser => {
  const context = useContext(UserContext);

  checkContext(context);

  return context;
}

/**
 * @description Context dispatcher hook
 * @author Luca Cattide
 * @date 25/09/2025
 * @returns {*}  {ActionDispatch<[action}
 */
const useDispatchContext = (): ActionDispatch<[action: TStateAction]> => {
  const context = useContext(DispatchContext);

  checkContext(context);

  return context as ActionDispatch<[action: TStateAction]>;
};

export { useAuthenticationContext, useUserContext, useDispatchContext };
