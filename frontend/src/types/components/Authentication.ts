type TAuthenticationFields = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  acceptance: string;
};

type TAuthenticationField = {
  formType: string;
  id: TAuthenticationFieldType;
  label: string;
  required?: boolean;
  type: string;
};

type TAuthenticationFieldType =
  | 'name'
  | 'email'
  | 'password'
  | 'passwordConfirm'
  | 'acceptance';

type TAuthenticationToken = {
  access_token: string;
  refresh_token: string;
};

type TAuthenticationUser = {
  acceptance: string;
  name: string;
  email: string;
  password: string;
};

export type {
  TAuthenticationFields,
  TAuthenticationField,
  TAuthenticationFieldType,
  TAuthenticationToken,
  TAuthenticationUser,
};
