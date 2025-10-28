import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import Redis from 'ioredis';
import { CONFIGURATION_NAME, REDIS } from 'src/utilities/constants';
import RedisService from './redis.service';

const { CLIENT, CONNECTION } = REDIS;
const { CONNECTED, ERROR } = CONNECTION;

/**
 * @description Redis feature module
 * Manages the in-memory storage for:
 * - JWT tokens
 * @author Luca Cattide
 * @date 28/10/2025
 * @class RedisModule
 */
@Module({
  exports: [CLIENT, RedisService],
  imports: [ConfigModule],
  providers: [
    {
      inject: [ConfigService],
      provide: CLIENT,
      useFactory: async (configService: ConfigService) => {
        const configuration = configService.get(CONFIGURATION_NAME.REDIS);
        const { host, port } = configuration;
        const redis = new Redis({
          host,
          port,
        });

        redis.on('connect', () => console.log(CONNECTED));
        redis.on('error', (error) => console.error(ERROR, error));

        return redis;
      },
    },
    RedisService,
  ],
})
class RedisModule {}

export default RedisModule;
