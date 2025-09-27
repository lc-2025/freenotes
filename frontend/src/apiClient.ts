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
 * @returns {*}  {Promise<TApiResponse>}
 */
const apiClient = async (
  endpoint: string,
  body?: Record<string, string | boolean> | TAuthenticationUser,
  authentication?: TAuthenticationToken,
): Promise<TApiResponse> => {
  const { DELETE, GET, PATCH, POST } = METHOD;
  const { LOGIN, NOTES, REGISTER, USER, REFRESH } = ROUTE.API;
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
    [REFRESH]: {
      method: POST,
    },
  };
  const params =
    route[endpoint].method === GET && body
      ? `?${new URLSearchParams(body as Record<string, string>)}`
      : '';
  const headers = authentication
    ? {
        ...HEADER.CONTENT,
        Authorization: `Bearer ${authentication.access_token}`,
      }
    : HEADER.CONTENT;

  if (authentication && !authentication.access_token) {
    console.error(AUTHENTICATION);

    throw new Error(AUTHENTICATION);
  }

  try {
    const baseUrl = `${process.env.NEXT_PUBLIC_API_BASEURL}`;
    const url = `${baseUrl}/${endpoint}${params}`;
    let payload = {
      ...route[endpoint],
      headers,
      next: {
        revalidate: CACHE,
      },
    };
    let response = await fetch(url, payload);

    // JWT rotation
    if (response.status === 401) {
      response = await fetch(`${baseUrl}/${REFRESH}`, {
        ...payload,
        ...route[REFRESH],
        headers: {
          ...payload.headers,
          Authorization: `Bearer ${authentication?.refresh_token}`
        },
        body: JSON.stringify({
          refreshToken: authentication?.refresh_token,
        }),
      });

      if (response.ok) {
        // Data fetching retry
        response = await fetch(url, payload);
      }
    }

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
