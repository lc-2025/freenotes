import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TAuthentication, TAuthenticationToken } from './types/auth.type';
import { APP } from 'src/utilities/constants';

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
  constructor(private readonly configService: ConfigService) {
    super({
      ignoreExpiration: true,
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
    const { email, sub } = payload;

    return { email, userId: sub };
  }
}

export default JwtStrategy;
