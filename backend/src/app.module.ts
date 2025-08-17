import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import UsersModule from './users/users.module';
import UsersController from './users/users.controller';
import UsersService from './users/users.service';
import TagsModule from './tags/tags.module';
import TagsController from './tags/tags.controller';
import TagsService from './tags/tags.service';
import { CONFIGURATION_NAME, CONNECTION } from './utilities/constants';

const { CONNECTED, OPEN, DISCONNECTED, RECONNECTED, DISCONNECTION } =
  CONNECTION;

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
  imports: [
    ConfigModule.forRoot({
      load: [appConfig, databaseConfig],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get(CONFIGURATION_NAME.DATABASE).url,
        onConnectionCreate: (connection: Connection) => {
          connection.on('connected', () => console.log(CONNECTED));
          connection.on('open', () => console.log(OPEN));
          connection.on('disconnected', () => console.log(DISCONNECTED));
          connection.on('reconnected', () => console.log(RECONNECTED));
          connection.on('disconnecting', () => console.log(DISCONNECTION));

          return connection;
        },
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    TagsModule,
  ],
  // Related controllers registration
  controllers: [AppController, UsersController, TagsController],
  // Related providers registration
  providers: [AppService, UsersService, TagsService],
})
export class AppModule {
  // Exposes config service on `main`
  constructor(private configService: ConfigService) {}
}
