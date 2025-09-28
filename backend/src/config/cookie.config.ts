import { registerAs } from '@nestjs/config';
import {
  CONFIGURATION_NAME,
  COOKIE,
  ENVIRONMENTS,
  JWT,
  ROUTE,
  TOKEN,
} from 'src/utilities/constants';
import { TCookieStrict } from 'src/types/cookie.type';

const { DOMAIN, NODE_ENV } = process.env;
const isDevelopment = NODE_ENV === ENVIRONMENTS[0];
const isProduction = NODE_ENV === ENVIRONMENTS[1];

export default registerAs(CONFIGURATION_NAME.COOKIE, () => ({
  refreshToken: {
    name: TOKEN.REFRESH,
    options: {
      domain: DOMAIN,
      httpOnly: true,
      maxAge: JWT.EXPIRATION_REFRESH_INVALIDATION,
      path: isDevelopment ? '/' : ROUTE.AUTH.REFRESH_TOKEN,
      sameSite: COOKIE.STRICT as TCookieStrict,
      secure: isProduction,
    },
  },
}));
