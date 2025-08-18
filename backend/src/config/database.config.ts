import { registerAs } from '@nestjs/config';
import { CONFIGURATION_NAME } from 'src/utilities/constants';

const { DB_NAME, DB_HOST, DB_PASSWORD, DB_USERNAME } = process.env;

export default registerAs(CONFIGURATION_NAME.DATABASE, () => ({
  url: `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}/?retryWrites=true&w=majority&appName=${DB_NAME}`,
}));
