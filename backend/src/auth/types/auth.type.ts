interface ISignIn {
  email: string;
  password: string;
}

type TJWT = {
  access_token: string;
}

export type { ISignIn, TJWT };
