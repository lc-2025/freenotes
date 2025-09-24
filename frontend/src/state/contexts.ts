import { createContext, ActionDispatch } from 'react';
import { STATE } from '@/utils/constants';
import { TStateAction, TStateAuthentication } from '@/types/state/State';

const AuthenticationContext = createContext<TStateAuthentication>(
  STATE.DEFAULT.AUTHENTICATION,
);
const DispatchContext = createContext<ActionDispatch<
  [action: TStateAction]
> | null>(null);

export { AuthenticationContext, DispatchContext };
