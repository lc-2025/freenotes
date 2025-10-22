import handleState from '@/state/actions';
import { ROUTE, STATE_ACTION } from '@/utils/constants';
import { TUseAuthentication } from '@/types/hooks/Authentication';
import { useDispatchContext } from './State';
import { useRouter } from 'next/navigation';

/**
 * @description Authentication hook
 * @author Luca Cattide
 * @date 21/10/2025
 */
const useAuthentication = (): TUseAuthentication => {
  const dispatch = useDispatchContext();
  const router = useRouter();

  /**
   * @description Login redirect helper
   * Redirects to login after refresh token cookie
   * natural expiration
   * @author Luca Cattide
   * @date 21/10/2025
   * @param {Error} error
   */
  const redirectLogin = (error: Error): void => {
    const { message, name } = error;

    // TODO: Visualize somehow
    handleState(
      {
        type: STATE_ACTION.ERROR,
        element: {
          message,
          title: name,
        },
      },
      dispatch,
    );
    router.push(ROUTE.AUTHENTICATION.PATH);
  };

  return {
    redirectLogin,
  };
};

export default useAuthentication;
