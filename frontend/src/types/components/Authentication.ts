type TAuthenticationFields = {
  id: string;
  acceptance: string;
  email: string;
  name: string;
  password: string;
  passwordConfirm: string;
};

type TAuthenticationField = {
  formType: string;
  id: TAuthenticationFieldType;
  label: string;
  required?: boolean;
  type: string;
};

type TAuthenticationFieldType =
  | 'acceptance'
  | 'email'
  | 'name'
  | 'password'
  | 'passwordConfirm';

type TAuthenticationToken = {
  access_token: string;
  refresh_token?: string;
};

type TAuthenticationUser = {
  acceptance: string;
  email: string;
  name: string;
  password: string;
};

export type {
  TAuthenticationField,
  TAuthenticationFields,
  TAuthenticationFieldType,
  TAuthenticationToken,
  TAuthenticationUser,
};
