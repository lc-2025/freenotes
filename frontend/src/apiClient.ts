import { ROUTE, METHOD, HEADER, CACHE } from './utils/constants';
import {
  TAuthenticationToken,
  TAuthenticationUser,
} from './types/components/Authentication';
import { TApiResponse } from './types/Api';

const apiClient = async (
  endpoint: string,
  body?: Record<string, string | boolean> | TAuthenticationToken | TAuthenticationUser,
  authentication?: TAuthenticationToken,
): Promise<TApiResponse> => {
  const { DELETE, GET, PATCH, POST } = METHOD;
  const { LOGIN, REGISTER } = ROUTE.API;
  const route = {
    [LOGIN]: {
      method: GET,
    },
    [REGISTER]: {
      body: body ? JSON.stringify(body) : undefined,
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
        Authorization: `Bearer ${(body as TAuthenticationToken).access_token}`,
      }
    : HEADER.CONTENT;

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

    return {
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
