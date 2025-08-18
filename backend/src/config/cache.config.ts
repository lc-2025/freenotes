import { registerAs } from '@nestjs/config';
import { CONFIGURATION_NAME } from 'src/utilities/constants';

export default registerAs(CONFIGURATION_NAME.CACHE, () => ({
  isGlobal: true,
  ttl: 600,
}));
