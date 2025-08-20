import { registerAs } from '@nestjs/config';
import { CONFIGURATION_NAME, RATE_LIMIT } from 'src/utilities/constants';

const { MAX_REQUESTS, WINDOW } = RATE_LIMIT;

export default registerAs(CONFIGURATION_NAME.THROTTLE, () => ({
  limit: MAX_REQUESTS,
  ttl: WINDOW,
}));
