import { registerAs } from '@nestjs/config';
import {
  CONFIGURATION_NAME,
  ENVIRONMENTS,
  JWT,
  ROUTE,
  TOKEN,
} from 'src/utilities/constants';

export default registerAs(CONFIGURATION_NAME.COOKIE, () => ({
  refreshToken: {
    name: TOKEN.REFRESH,
    options: {
      domain: process.env.DOMAIN,
      httpOnly: true,
      maxAge: JWT.EXPIRATION_REFRESH_INVALIDATION,
      path:
        process.env.NODE_ENV === ENVIRONMENTS[0]
          ? '/'
          : ROUTE.AUTH.REFRESH_TOKEN,
      sameSite: 'strict' as 'strict',
      secure: true,
    },
  },
}));
