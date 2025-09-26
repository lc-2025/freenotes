import {
  TAuthenticationToken,
  TAuthenticationUser,
} from '../components/Authentication';

type TUseApi = {
  endpoint: string;
  body?: Record<string, string | boolean> | TAuthenticationUser;
  authentication?: TAuthenticationToken;
  refresh?: boolean;
};

export type { TUseApi };
