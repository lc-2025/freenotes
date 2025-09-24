import { STATE, STATE_ACTION } from '@/utils/constants';
import { TStateAction, TStateAuthentication } from '@/types/state/State';

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
      reducerAuthentication = STATE.AUTHENTICATION;
      break;

    default:
      reducerAuthentication = STATE.AUTHENTICATION;
  }

  return reducerAuthentication;
};

export { reducerAuthentication };
