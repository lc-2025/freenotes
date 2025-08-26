import { registerAs } from '@nestjs/config';
import Joi from 'joi';
import { CONFIGURATION_NAME, ENVIRONMENTS } from 'src/utilities/constants';

const { PORT, SECRET } = process.env;
const APP_PORT = PORT ?? 4000;

export default registerAs(CONFIGURATION_NAME.APP, () => ({
  cache: true,
  port: APP_PORT,
  secret: SECRET,
  validationOptions: {
    // Disallow unknown env vars and stop execution
    allowUnknown: false,
    abortEarly: true,
  },
  validationSchema: Joi.object({
    NODE_ENV: Joi.string()
      .valid(...ENVIRONMENTS)
      .default(ENVIRONMENTS[0]),
    PORT: Joi.number().port().default(APP_PORT),
  }),
}));
