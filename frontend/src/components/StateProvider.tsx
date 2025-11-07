'use client';

import { useCallback, useMemo, useReducer } from 'react';
import {
  AuthenticationContext,
  DispatchContext,
  UserContext,
  ErrorContext,
} from '@/state/contexts';
import {
  reducerAuthentication,
  reducerError,
  reducerUser,
} from '@/state/reducers';
import { STATE, STATE_ACTION } from '@/utils/constants';
import { TStateAction } from '@/types/state/State';

/**
 * @description Unified context provider component
 * Required to avoid Next.js hydration issues
 * @author Luca Cattide
 * @date 22/10/2025
 * @param {{
 *   children: React.ReactNode;
 * }} {
 *   children,
 * }
 * @returns {*}  {React.ReactNode}
 */
const StateProvider = ({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode => {
  const [stateAuthentication, dispatchAuthentication] = useReducer(
    reducerAuthentication,
    STATE.DEFAULT.AUTHENTICATION,
  );
  const [stateError, dispatchError] = useReducer(
    reducerError,
    STATE.DEFAULT.ERROR,
  );
  const [stateUser, dispatchUser] = useReducer(reducerUser, STATE.DEFAULT.USER);
  const authentication = useMemo(
    () => stateAuthentication,
    [stateAuthentication],
  );
  const error = useMemo(() => stateError, [stateError]);
  const user = useMemo(() => stateUser, [stateUser]);
  const dispatch = useCallback(
    (action: TStateAction) => {
      switch(action.type) {
        case STATE_ACTION.AUTHENTICATION:
          dispatchAuthentication(action);
          break;

        case STATE_ACTION.ERROR:
          dispatchError(action);
          break;

        case STATE_ACTION.USER:
          dispatchUser(action);
          break;

        case STATE_ACTION.RESET:
          dispatchAuthentication(action);
          dispatchError(action);
          dispatchUser(action);
          break;

        default:
      }
    },
    [dispatchAuthentication, dispatchError, dispatchUser],
  );

  return (
    <AuthenticationContext value={authentication}>
      <UserContext value={user}>
        <ErrorContext value={error}>
          <DispatchContext value={dispatch}>{children}</DispatchContext>
        </ErrorContext>
      </UserContext>
    </AuthenticationContext>
  );
};

export { StateProvider };
