import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import UsersService from 'src/modules/users/users.service';
import { APP, ERROR, STRATEGY } from 'src/utilities/constants';
import {
  TAuthentication,
  TAuthenticationToken,
  TAuthenticationTokenRefresh,
} from './types/auth.type';
import { extractCookieToken } from 'src/utilities/utils';
import StoreService from '../store/store.service';

const { MISSING_TOKEN, MISSING_USER, MISSING_USER_ID } = ERROR;

/**
 * @description Authentication JWT strategy class
 * @author Luca Cattide
 * @date 20/08/2025
 * @class JwtStrategy
 * @extends {PassportStrategy(Strategy)}
 */
@Injectable()
class JwtStrategy extends PassportStrategy(Strategy) {
  /**
   * Creates an instance of JwtStrategy.
   * @author Luca Cattide
   * @date 25/08/2025
   * @memberof JwtStrategy
   */
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UsersService,
  ) {
    super({
      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get(APP.CONFIGURATION).secret,
    });
  }

  /**
   * @description Authentication validation method
   * @author Luca Cattide
   * @date 20/08/2025
   * @param {TAuthenticationToken} payload
   * @returns {*}  {Promise<TAuthentication>}
   * @memberof JwtStrategy
   */
  async validate(payload: TAuthenticationToken): Promise<TAuthentication> {
    const user = await this.userService.find('id', payload.sub);

    if (!user) {
      throw new UnauthorizedException(MISSING_USER);
    }

    const { email, sub } = payload;

    return { email, userId: sub };
  }
}

/**
 * @description Authentication JWT refresh strategy class
 * @author Luca Cattide
 * @date 27/08/2025
 * @class JwtStrategyRefresh
 * @extends {PassportStrategy(
 *   Strategy,
 *   STRATEGY.JWT_REFRESH,
 * )}
 */
@Injectable()
class JwtStrategyRefresh extends PassportStrategy(
  Strategy,
  STRATEGY.JWT_REFRESH,
) {
  /**
   * Creates an instance of JwtStrategyRefresh.
   * @author Luca Cattide
   * @date 27/08/2025
   * @param {ConfigService} configService
   * @param {StoreService} redisService
   * @param {UserService} userService
   * @memberof JwtStrategyRefresh
   */
  constructor(
    private readonly configService: ConfigService,
    private readonly redisService: StoreService,
    private readonly userService: UsersService,
  ) {
    super({
      ignoreExpiration: false,
      // Extract token from cookie instead of request header to improve security
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => extractCookieToken(request),
      ]),
      // Get the raw token
      passReqToCallback: true,
      secretOrKey: configService.get(APP.CONFIGURATION).secretRefresh,
    });
  }

  /**
   * @description Authentication validation method
   * @author Luca Cattide
   * @date 27/08/2025
   * @param {TAuthenticationToken} payload
   * @returns {*}  {Promise<TAuthenticationTokenRefresh>}
   * @memberof JwtStrategyRefresh
   */
  async validate(
    payload: any,
    request: Request,
  ): Promise<TAuthenticationTokenRefresh> {
    const token = extractCookieToken(request);

    if (!token || payload.exp < Date.now()) {
      throw new UnauthorizedException(MISSING_TOKEN);
    }

    const userId = await this.redisService.getUserId(token);

    if (!userId) {
      throw new UnauthorizedException(MISSING_USER_ID);
    }

    const user = await this.userService.find('id', userId);

    if (!user) {
      throw new UnauthorizedException(MISSING_USER);
    }

    return {
      user,
      refreshToken: token,
    };
  }
}

export { JwtStrategy, JwtStrategyRefresh };
