import Redis from 'ioredis';
import { STORE } from './utils/constants';
import {
  NEXT_PUBLIC_STORE_HOST,
  NEXT_PUBLIC_STORE_PORT,
} from './utils/environment';

const { CONNECTED, ERROR } = STORE.MESSAGE;
const port = NEXT_PUBLIC_STORE_PORT ?? 6379;
// Store client
const storeClient = new Redis({
  host: NEXT_PUBLIC_STORE_HOST,
  port: Number(port),
});

storeClient.on('connect', () => console.log(CONNECTED));
storeClient.on('error', (error) => console.error(ERROR, error));

export default storeClient;
