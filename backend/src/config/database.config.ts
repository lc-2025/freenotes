import { registerAs } from '@nestjs/config';
import { CONFIGURATION_NAME } from 'src/utilities/constants';

const { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME } = process.env;

export default registerAs(CONFIGURATION_NAME.DATABASE, () => ({
  url: `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}/?retryWrites=true&w=majority&appName=${DB_NAME}`,
}));
