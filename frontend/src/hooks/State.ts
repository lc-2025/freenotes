import { useContext } from 'react';
import { AuthenticationContext } from '@/state/contexts';
import { checkContext } from '@/utils/utilities';
import { TStateAuthentication } from '@/types/state/State';

const useAuthenticationContext = (): TStateAuthentication => {
  const context = useContext(AuthenticationContext);

  checkContext(context);

  return context;
};

export { useAuthenticationContext };
