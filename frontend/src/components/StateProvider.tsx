'use client';

import { useCallback, useMemo, useReducer } from 'react';
import {
  AuthenticationContext,
  UserContext,
  DispatchContext,
} from '@/state/contexts';
import { reducerAuthentication, reducerUser } from '@/state/reducers';
import { STATE } from '@/utils/constants';

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
  const setAuthentication = useCallback(dispatch, []);
  const authentication = useMemo(() => state, [state]);

  return (
    <AuthenticationContext value={authentication}>
      <DispatchContext value={setAuthentication}>{children}</DispatchContext>
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
  const setUser = useCallback(dispatch, []);
  const user = useMemo(() => state, [state]);

  return (
    <UserContext value={user}>
      <DispatchContext value={setUser}>{children}</DispatchContext>
    </UserContext>
  );
};

export { AuthenticationProvider, UserProvider };
