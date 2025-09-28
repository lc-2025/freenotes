import { User } from 'src/modules/users/schemas/user.schema';
import { Response } from 'express';

interface ISignIn {
  email: string;
  password: string;
}

type TAuthentication = Omit<TAuthenticationData, 'password'> & {
  userId: string;
};

type TAuthenticationData = ISignIn;

type TAuthenticationToken = TAuthenticationData & {
  sub: string;
};

type TAuthenticationTokenRefresh = {
  attributes: User;
  refreshTokenExpiration: Date;
};

type TJWT = {
  access_token: string;
  refresh_token?: string;
};

type TToken = {
  response: Response;
  token: TJWT | undefined;
};

export type {
  ISignIn,
  TAuthentication,
  TAuthenticationToken,
  TAuthenticationTokenRefresh,
  TJWT,
  TToken,
};
