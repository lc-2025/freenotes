import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import Store from 'ioredis';
import { CONFIGURATION_NAME, STORE } from 'src/utilities/constants';
import StoreService from './store.service';

const { CLIENT, CONNECTION } = STORE;
const { CONNECTED, ERROR } = CONNECTION;

/**
 * @description Store feature module
 * Manages the in-memory storage for:
 * - JWT tokens
 * @author Luca Cattide
 * @date 28/10/2025
 * @class StoreModule
 */
@Module({
  exports: [CLIENT, StoreService],
  imports: [ConfigModule],
  providers: [
    {
      inject: [ConfigService],
      provide: CLIENT,
      useFactory: async (configService: ConfigService) => {
        const configuration = configService.get(CONFIGURATION_NAME.STORE);
        const { host, port } = configuration;
        const store = new Store({
          host,
          port,
        });

        store.on('connect', () => console.log(CONNECTED));
        store.on('error', (error) => console.error(ERROR, error));

        return store;
      },
    },
    StoreService,
  ],
})
class StoreModule {}

export default StoreModule;
