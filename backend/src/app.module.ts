import { /* APP_GUARD, */ APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { DevtoolsModule } from '@nestjs/devtools-integration';
import compression from 'compression';
import helmet from 'helmet';
import ExpressMongoSanitize from 'express-mongo-sanitize';
import { Connection } from 'mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import appConfig from './config/app.config';
import cacheConfig from './config/cache.config';
import databaseConfig from './config/database.config';
import NotesController from './notes/notes.controller';
import NotesService from './notes/notes.service';
import NotesModule from './notes/notes.module';
import UsersModule from './users/users.module';
import UsersController from './users/users.controller';
import UsersService from './users/users.service';
import TagsModule from './tags/tags.module';
import TagsController from './tags/tags.controller';
import TagsService from './tags/tags.service';
import SslMiddleware from './middlewares/ssl.middleware';
import JwtAuthGuard from './guards/jwt-auth.guard';
//import AuthGuard from './guards/auth.guard';
import LoggingInterceptor from './interceptors/logging.interceptor';
import TimeoutInterceptor from './interceptors/timeout.interceptor';
import {
  CONFIGURATION_NAME,
  CONNECTION,
  CONTROLLER,
  ENVIRONMENTS,
} from './utilities/constants';
import throttleConfig from './config/throttle.config';

const { CONNECTED, DISCONNECTED, DISCONNECTION, OPEN, RECONNECTED } =
  CONNECTION;
const { NOTES, TAGS, USERS } = CONTROLLER;

/**
 * @description Root module
 * The Module works as a wrapper
 * which encapsulates everithing needed by
 * the abstraction in order to work
 * i.e. Dependencies, Models, services, controllers, etc.
 * @author Luca Cattide
 * @date 17/08/2025
 * @export
 * @class AppModule
 */
@Module({
  // Related controllers registration
  controllers: [
    AppController,
  ],
  imports: [
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get(CONFIGURATION_NAME.CACHE),
    }),
    ConfigModule.forRoot({
      load: [appConfig, cacheConfig, databaseConfig, throttleConfig],
    }),
    DevtoolsModule.register({
      http: process.env.NODE_ENV === ENVIRONMENTS[0],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        onConnectionCreate: (connection: Connection) => {
          connection.on('connected', () => console.log(CONNECTED));
          connection.on('disconnected', () => console.log(DISCONNECTED));
          connection.on('disconnecting', () => console.log(DISCONNECTION));
          connection.on('open', () => console.log(OPEN));
          connection.on('reconnected', () => console.log(RECONNECTED));

          return connection;
        },
        uri: configService.get(CONFIGURATION_NAME.DATABASE).url,
      }),
    }),
    NotesModule,
    TagsModule,
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => [
        {
          ttl: configService.get(CONFIGURATION_NAME.THROTTLE).ttl,
          limit: configService.get(CONFIGURATION_NAME.THROTTLE).limit,
        },
      ],
    }),
    UsersModule,
  ],
  // Related providers registration
  providers: [
    AppService,
    // Global Guards injected as dependencies
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    // Vanilla authentication
    /* {
      provide: APP_GUARD,
      useClass: AuthGuard,
    }, */
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    // Global Interceptors injected as dependencies
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TimeoutInterceptor,
    },
    // Global Auto-Cache (`GET` only)
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  /**
   * @description Middlewares configuration
   * @author Luca Cattide
   * @date 17/08/2025
   * @param {MiddlewareConsumer} consumer
   * @memberof AppModule
   */
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(compression(), ExpressMongoSanitize(), helmet(), SslMiddleware)
      .forRoutes(NOTES, TAGS, USERS);
  }

  /**
   * Creates an instance of AppModule.
   * Exposes config service on `main`
   * @author Luca Cattide
   * @date 17/08/2025
   * @param {ConfigService} configService
   * @memberof AppModule
   */
  constructor(private configService: ConfigService) {}
}
