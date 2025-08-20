import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { TAuthentication, TAuthenticationToken } from './types/auth.type';

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
   * @date 20/08/2025
   * @memberof JwtStrategy
   */
  constructor() {
    super({
      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET!,
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
