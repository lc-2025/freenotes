import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import AuthService from './auth.service';
import AuthController from './auth.controller';
import UsersModule from '../users/users.module';
import LocalStrategy from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { APP, JWT } from 'src/utilities/constants';

/**
 * @description Authentication feature module
 * The Module works as a wrapper
 * which encapsulates everithing needed by
 * the abstraction in order to work
 * i.e. Dependencies, Models, services, controllers, etc.
 * @author Luca Cattide
 * @date 19/08/2025
 * @class AuthModule
 */
@Module({
  controllers: [AuthController],
  exports: [AuthService, JwtModule],
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get(APP.CONFIGURATION).secret,
        signOptions: { expiresIn: JWT.EXPIRATION },
      }),
    }),
    PassportModule,
    UsersModule,
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
class AuthModule {}

export default AuthModule;
