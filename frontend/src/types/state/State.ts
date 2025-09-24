type TStateAction = {
  type: string;
  element: any;
};

type TStateAuthentication = {
  authenticated: boolean;
};

export type { TStateAction, TStateAuthentication };
