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
 * @description Authentication context provider component
 * @author Luca Cattide
 * @date 24/09/2025
 * @param {{
 *   children: React.ReactNode;
 * }} {
 *   children,
 * }
 * @returns {*}  {React.ReactNode}
 */
const AuthenticationProvider = ({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode => {
  const [state, dispatch] = useReducer(
    reducerAuthentication,
    STATE.DEFAULT.AUTHENTICATION,
  );
  const authentication = useMemo(() => state, [state]);
  const setAuthentication = useCallback(dispatch, []);

  return (
    <AuthenticationContext value={authentication}>
      <DispatchContext value={setAuthentication}>{children}</DispatchContext>
    </AuthenticationContext>
  );
};

/**
 * @description Error context provider component
 * @author Luca Cattide
 * @date 21/10/2025
 * @param {{
 *   children: React.ReactNode;
 * }} {
 *   children,
 * }
 * @returns {*}  {React.ReactNode}
 */
const ErrorProvider = ({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode => {
  const [state, dispatch] = useReducer(reducerError, STATE.DEFAULT.ERROR);
  const error = useMemo(() => state, [state]);
  const setError = useCallback(dispatch, []);

  return (
    <ErrorContext value={error}>
      <DispatchContext value={setError}>{children}</DispatchContext>
    </ErrorContext>
  );
};

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

/**
 * @description User context provider component
 * @author Luca Cattide
 * @date 26/09/2025
 * @param {{
 *   children: React.ReactNode;
 * }} {
 *   children,
 * }
 * @returns {*}  {React.ReactNode}
 */
const UserProvider = ({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode => {
  const [state, dispatch] = useReducer(reducerUser, STATE.DEFAULT.USER);
  const user = useMemo(() => state, [state]);
  const setUser = useCallback(dispatch, []);

  return (
    <UserContext value={user}>
      <DispatchContext value={setUser}>{children}</DispatchContext>
    </UserContext>
  );
};

export { AuthenticationProvider, ErrorProvider, StateProvider, UserProvider };
