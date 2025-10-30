import { registerAs } from '@nestjs/config';
import { CONFIGURATION_NAME } from 'src/utilities/constants';

const { STORE_HOST, STORE_PORT } = process.env;
const port = STORE_PORT ?? 6379;

export default registerAs(CONFIGURATION_NAME.STORE, () => ({
  host: STORE_HOST,
  port,
}));
