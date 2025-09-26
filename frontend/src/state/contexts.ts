import { createContext, ActionDispatch } from 'react';
import { STATE } from '@/utils/constants';
import { TStateAction, TStateAuthentication, TStateUser } from '@/types/state/State';

const AuthenticationContext = createContext<TStateAuthentication>(
  STATE.DEFAULT.AUTHENTICATION,
);
const UserContext = createContext<TStateUser>(
  STATE.DEFAULT.USER
);
const DispatchContext = createContext<ActionDispatch<
  [action: TStateAction]
> | null>(null);

export { AuthenticationContext, UserContext, DispatchContext };
