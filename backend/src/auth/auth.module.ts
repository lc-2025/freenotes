import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import AuthService from './auth.service';
import AuthController from './auth.controller';
import UsersModule from '../users/users.module';
import { JWT } from 'src/utilities/constants';

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
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: process.env.SECRET,
      signOptions: { expiresIn: JWT.EXPIRATION },
    }),
  ],
  providers: [AuthService],
})
class AuthModule {}

export default AuthModule;
