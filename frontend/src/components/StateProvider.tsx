'use client';

import { useCallback, useMemo, useReducer } from 'react';
import { AuthenticationContext, DispatchContext } from '@/state/contexts';
import { reducerAuthentication } from '@/state/reducers';
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

export { AuthenticationProvider };
