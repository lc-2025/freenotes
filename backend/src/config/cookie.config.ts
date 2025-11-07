import { registerAs } from '@nestjs/config';
import {
  CONFIGURATION_NAME,
  COOKIE,
  ENVIRONMENTS,
  JWT,
  ROUTE,
  TOKEN,
} from 'src/utilities/constants';

const { DOMAIN, NODE_ENV } = process.env;
const isDevelopment = NODE_ENV === ENVIRONMENTS[0];
const isProduction = NODE_ENV === ENVIRONMENTS[1];

export default registerAs(CONFIGURATION_NAME.COOKIE, () => ({
  refreshToken: {
    name: TOKEN.REFRESH,
    options: {
      domain: isProduction ? DOMAIN : undefined,
      httpOnly: true,
      maxAge: JWT.EXPIRATION_REFRESH_INVALIDATION,
      path: '/',
      sameSite: isDevelopment ? COOKIE.LAX : COOKIE.NONE,
      secure: isProduction,
    },
  },
}));
