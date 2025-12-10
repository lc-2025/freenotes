import { Module, OnModuleInit } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import AuthService from './auth.service';
import AuthController from './auth.controller';
import UsersModule from '../users/users.module';
import StoreModule from '../store/store.module';
import LocalStrategy from './local.strategy';
import { JwtStrategy, JwtStrategyRefresh } from './jwt.strategy';
import { APP, JWT } from 'src/utilities/constants';
import { ModuleRef } from '@nestjs/core';

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
    StoreModule,
    UsersModule,
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, JwtStrategyRefresh],
})
class AuthModule implements OnModuleInit {
  // inject JwtStrategyRefresh to force instantiation
  constructor(
    private moduleRef: ModuleRef,
    private readonly configService: ConfigService,
    private readonly jwtRefreshStrategy: JwtStrategyRefresh, // <-- aggiunto temporaneamente
  ) {}

  onModuleInit() {
    const cookieCfg = this.configService.get('cookie');
    const appCfg = this.configService.get('app');
    console.log('[Startup] cookie config:', cookieCfg);
    console.log('[Startup] cookie name:', cookieCfg?.refreshToken?.name);
    console.log(
      '[Startup] app secretRefresh prefix:',
      String(appCfg?.secretRefresh)?.slice(0, 8),
    );

    try {
      const strat = this.moduleRef.get(JwtStrategyRefresh, { strict: false });
      console.log('[AuthModule] JwtStrategyRefresh resolved:', !!strat);
      console.log(
        '[AuthModule] jwtRefreshStrategy injected:',
        !!this.jwtRefreshStrategy,
      ); // debug
    } catch (err) {
      console.error('[AuthModule] error resolving JwtStrategyRefresh:', err);
    }
  }
}

export default AuthModule;
