import apiClient from '@/apiClient';
import useStorage from './Storage';
import { STORAGE } from '@/utils/constants';
import { TApiResponse } from '@/types/Api';
import { TUseApi } from '@/types/hooks/Api';

/**
 * @description API hook
 * @author Luca Cattide
 * @date 26/09/2025
 * @param {Omit<TUseApi, 'authentication'>} {
 *   endpoint,
 *   body,
 *   refresh,
 * }
 * @returns {*}  {Promise<TApiResponse>}
 */
const useApi = async ({
  endpoint,
  body,
  refresh,
}: Omit<TUseApi, 'authentication'>): Promise<TApiResponse> => {
  const { ACCESS, REFRESH } = STORAGE.TOKEN;
  const { getStorage } = useStorage();
  const { data, error } = await apiClient(
    endpoint,
    body,
    {
      access_token: getStorage(ACCESS) ?? '',
      refresh_token: getStorage(REFRESH) ?? '',
    },
    refresh,
  );

  return { data, error };
};

export default useApi;
