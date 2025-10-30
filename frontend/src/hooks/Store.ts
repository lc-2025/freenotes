import storeClient from '@/storeClient';
import { STORE } from '@/utils/constants';
import { TUseStore } from '@/types/hooks/Store';

/**
 * @description Store hook
 * @author Luca Cattide
 * @date 30/10/2025
 * @returns {*}  {TUseStore}
 */
const useStore = (): TUseStore => {
  const { PREFIX, EXPIRATION } = STORE;

  /**
   * @description JWT Access Token getter
   * @author Luca Cattide
   * @date 30/10/2025
   * @param {string} email
   * @returns {*}  {(Promise<string | null>)}
   */
  const getAccessToken = async (email: string): Promise<string | null> => {
    return await storeClient.get(`${PREFIX}${email}`);
  };

  /**
   * @description JWT Access Token setter
   * @author Luca Cattide
   * @date 30/10/2025
   * @param {string} email
   * @param {string} token
   * @returns {*}  {Promise<void>}
   */
  const setAccessToken = async (
    email: string,
    token: string,
  ): Promise<void> => {
    await storeClient.set(`${PREFIX}${email}`, token, 'PX', EXPIRATION);
  };

  return { getAccessToken, setAccessToken };
};

export default useStore;
