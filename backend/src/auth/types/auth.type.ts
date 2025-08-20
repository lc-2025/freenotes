interface ISignIn {
  email: string;
  password: string;
}

type TAuthentication = TAuthenticationData & {
  userId: string;
};

type TAuthenticationData = {
  email: string;
};

type TAuthenticationToken = TAuthenticationData & {
  sub: string;
};

type TJWT = {
  access_token: string;
};

export type { ISignIn, TAuthentication, TAuthenticationToken, TJWT };
