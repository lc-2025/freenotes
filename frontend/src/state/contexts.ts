import { createContext, ActionDispatch } from 'react';
import { STATE } from '@/utils/constants';
import {
  TStateAction,
  TStateAuthentication,
  TStateError,
  TStateUser,
} from '@/types/state/State';

const AuthenticationContext = createContext<TStateAuthentication>(
  STATE.DEFAULT.AUTHENTICATION,
);
const DispatchContext = createContext<ActionDispatch<
  [action: TStateAction]
> | null>(null);
const ErrorContext = createContext<TStateError>(STATE.DEFAULT.ERROR);
const UserContext = createContext<TStateUser>(STATE.DEFAULT.USER);

export { AuthenticationContext, DispatchContext, ErrorContext, UserContext };
