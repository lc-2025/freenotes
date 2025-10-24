import {
  ROUTE,
  METHOD,
  HEADER,
  CACHE,
  ERROR,
  REQUEST,
} from './utils/constants';
import {
  TAuthenticationToken,
  TAuthenticationUser,
} from './types/components/Authentication';
import { TApiRequest, TApiResponse } from './types/Api';

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
  body?: Record<string, string | boolean | object> | TAuthenticationUser,
  authentication?: TAuthenticationToken,
): Promise<TApiResponse> => {
  const { DELETE, GET, PATCH, POST } = METHOD;
  const { LOGIN, NOTES, REGISTER, USER, REFRESH } = ROUTE.API;
  const { AUTHENTICATION } = ERROR;
  const defaultOptions = {
    get: {
      method: GET,
    },
    post: {
      method: POST,
    },
  };
  const route = {
    [LOGIN]: defaultOptions.get,
    [NOTES]: body ? defaultOptions.post : defaultOptions.get,
    [REGISTER]: {
      ...defaultOptions.post,
      body: body ? JSON.stringify(body) : undefined,
    },
    [USER]: defaultOptions.get,
    [REFRESH]: defaultOptions.post,
  };
  const params =
    route[endpoint].method === GET && body
      ? `?${new URLSearchParams(body as Record<string, string>).toString()}`
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
      credentials: REQUEST.CREDENTIALS as TApiRequest,
      headers,
      next: {
        revalidate: CACHE,
      },
    };
    let response = await fetch(url, payload);
    let expired = false;

    // JWT rotation
    if (response.status === 401) {
      response = await fetch(`${baseUrl}/${REFRESH}`, {
        ...payload,
        ...route[REFRESH],
        headers: {
          ...payload.headers,
        },
      });

      if (!response.ok) {
        expired = true;
      } else {
        // Data fetching retry
        response = await fetch(url, payload);
      }
    }

    return !response.ok
      ? {
          error: {
            message: expired ? '' : response.statusText,
            name: expired ? ERROR.AUTHENTICATION : 'Error',
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
