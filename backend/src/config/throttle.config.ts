import { registerAs } from '@nestjs/config';
import { CONFIGURATION_NAME, RATE_LIMIT } from 'src/utilities/constants';

const { MAX_REQUESTS_LONG, MAX_REQUESTS_SHORT, WINDOW_LONG, WINDOW_SHORT } =
  RATE_LIMIT;

// Rate-Limiting prevents brute-force attacks
export default registerAs(CONFIGURATION_NAME.THROTTLE, () => ({
  // Max 5 attempts every 60s
  long: {
    limit: MAX_REQUESTS_LONG,
    ttl: WINDOW_LONG,
  },
  // Max 2 attempts per second
  short: {
    limit: MAX_REQUESTS_SHORT,
    ttl: WINDOW_SHORT,
  },
}));
