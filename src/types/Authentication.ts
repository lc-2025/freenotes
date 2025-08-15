type TAutchenticationFields = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  acceptance: boolean;
};

type TAutchenticationField = {
  formType: string;
  id: TAutchenticationFieldType;
  label: string;
  required?: boolean;
  type: string;
};

type TAutchenticationFieldType =
  | 'name'
  | 'email'
  | 'password'
  | 'passwordConfirm'
  | 'acceptance';

export type {
  TAutchenticationFields,
  TAutchenticationField,
  TAutchenticationFieldType,
};
