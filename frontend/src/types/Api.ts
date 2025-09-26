import { TAuthenticationToken } from './components/Authentication';
import { TStateUser } from './state/State';

type TApiResponseData = {
  data?: TAuthenticationToken | TStateUser;
};

type TApiResponseError = {
  error?: Error;
};

type TApiResponse = TApiResponseData & TApiResponseError;

export type { TApiResponse };
