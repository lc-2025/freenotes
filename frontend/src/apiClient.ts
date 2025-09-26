import { ROUTE, METHOD, HEADER, CACHE, ERROR } from './utils/constants';
import {
  TAuthenticationToken,
  TAuthenticationUser,
} from './types/components/Authentication';
import { TApiResponse } from './types/Api';

/**
 * @description API client
 * @author Luca Cattide
 * @date 25/09/2025
 * @param {string} endpoint
 * @param {(Record<string, string | boolean> | TAuthenticationUser)} [body]
 * @param {TAuthenticationToken} [authentication]
 * @param {boolean} [refresh]
 * @returns {*}  {Promise<TApiResponse>}
 */
const apiClient = async (
  endpoint: string,
  body?: Record<string, string | boolean> | TAuthenticationUser,
  authentication?: TAuthenticationToken,
  refresh?: boolean,
): Promise<TApiResponse> => {
  const { DELETE, GET, PATCH, POST } = METHOD;
  const { LOGIN, NOTES, REGISTER, USER } = ROUTE.API;
  const { AUTHENTICATION } = ERROR;
  const route = {
    [LOGIN]: {
      method: GET,
    },
    [NOTES]: {
      method: GET,
    },
    [REGISTER]: {
      body: body ? JSON.stringify(body) : undefined,
      method: POST,
    },
    [USER]: {
      method: GET,
    },
  };
  const params =
    route[endpoint].method === GET && body
      ? `?${new URLSearchParams(body as Record<string, string>)}`
      : '';
  const headers = authentication
    ? {
        ...HEADER.CONTENT,
        Authorization: `Bearer ${refresh ? authentication.refresh_token : authentication.access_token}`,
      }
    : HEADER.CONTENT;

  if (authentication && !authentication.access_token) {
    console.error(AUTHENTICATION);

    throw new Error(AUTHENTICATION);
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASEURL}/${endpoint}${params}`,
      {
        ...route[endpoint],
        headers,
        next: {
          revalidate: CACHE,
        },
      },
    );

    return !response.ok
      ? {
          error: {
            name: 'Error',
            message: response.statusText,
          },
        }
      : {
          data: await response.json(),
        };
  } catch (error) {
    console.error(error);

    return {
      error: error as Error,
    };
  }
};

export default apiClient;
