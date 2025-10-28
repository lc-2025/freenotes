import { registerAs } from '@nestjs/config';
import { CONFIGURATION_NAME } from 'src/utilities/constants';

const { REDIS_HOST, REDIS_PORT } = process.env;
const PORT = REDIS_PORT ?? 6379;

export default registerAs(CONFIGURATION_NAME.REDIS, () => ({
  host: REDIS_HOST,
  port: PORT,
}));
