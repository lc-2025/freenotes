import { STATE, STATE_ACTION } from '@/utils/constants';
import { TStateAction, TStateAuthentication, TStateUser } from '@/types/state/State';

/**
 * Reducers seems a bit redundant in their logic
 * but leaving as is for future scalability
 */

/**
 * @description Authentication state reducer
 * Manages the authentication state updates
 * @author Luca Cattide
 * @param {TStateAuthentication} state
 * @param {TStateAction} action
 * @returns {*}  {TStateAuthentication}
 */
const reducerAuthentication = (
  state: TStateAuthentication,
  action: TStateAction,
): TStateAuthentication => {
  const { AUTHENTICATION, RESET } = STATE_ACTION;
  const { type, element } = action;
  let reducerAuthentication = null;

  switch (type) {
    case AUTHENTICATION:
      reducerAuthentication = element;
      break;

    case RESET:
      reducerAuthentication = STATE.DEFAULT.AUTHENTICATION;
      break;

    default:
      reducerAuthentication = STATE.DEFAULT.AUTHENTICATION;
  }

  return reducerAuthentication;
};

/**
 * @description User state reducer
 * @author Luca Cattide
 * @date 26/09/2025
 * @param {TStateUser} state
 * @param {TStateAction} action
 * @returns {*}  {TStateUser}
 */
const reducerUser = (state: TStateUser, action: TStateAction): TStateUser => {
  const { USER, RESET } = STATE_ACTION;
  const { type, element } = action;
  let reducerUser = null;

  switch (type) {
    case USER:
      reducerUser = {
        ...state,
        ...element
      };
      break;

    case RESET:
      reducerUser = STATE.DEFAULT.USER;
      break;

    default:
      reducerUser = STATE.DEFAULT.USER;
  }

  return reducerUser;
};

export { reducerAuthentication, reducerUser };
