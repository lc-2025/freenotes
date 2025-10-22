import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import UsersService from 'src/modules/users/users.service';
import { APP, JWT, STRATEGY } from 'src/utilities/constants';
import {
  TAuthentication,
  TAuthenticationToken,
  TAuthenticationTokenRefresh,
} from './types/auth.type';
import { extractCookieToken } from 'src/utilities/utils';

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
      throw new UnauthorizedException();
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
   * @param {UsersService} userService
   * @memberof JwtStrategyRefresh
   */
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UsersService,
  ) {
    super({
      ignoreExpiration: false,
      // Extract token from cookie instead of request header to improve security
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => extractCookieToken(request),
      ]),
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
    payload: TAuthenticationToken,
  ): Promise<TAuthenticationTokenRefresh> {
    const user = await this.userService.find('id', payload.sub);

    if (!user) {
      throw new UnauthorizedException();
    }

    return {
      attributes: user,
      refreshTokenExpiration: new Date(JWT.EXPIRATION_REFRESH_INVALIDATION),
    };
  }
}

export { JwtStrategy, JwtStrategyRefresh };
