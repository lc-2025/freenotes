type TStateAction = {
  type: string;
  element: any;
};

type TStateAuthentication = {
  authenticated: boolean;
};

type TStateUser = {
  email: string;
  name: string;
  notes: Array<string>;
};

export type { TStateAction, TStateAuthentication, TStateUser };
