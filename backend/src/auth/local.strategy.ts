import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import AuthService from './auth.service';
import { ROUTE } from 'src/utilities/constants';

/**
 * @description Authentication local strategy class
 * @author Luca Cattide
 * @date 20/08/2025
 * @class LocalStrategy
 * @extends {PassportStrategy(Strategy)}
 */
@Injectable()
class LocalStrategy extends PassportStrategy(Strategy) {
  /**
   * Creates an instance of LocalStrategy.
   * @author Luca Cattide
   * @date 20/08/2025
   * @param {AuthService} authService
   * @memberof LocalStrategy
   */
  constructor(private authService: AuthService) {
    super({
      usernameField: ROUTE.USERS.PARAM,
    });
  }

  /**
   * @description Authentication local strategy validation method
   * @author Luca Cattide
   * @date 20/08/2025
   * @param {string} email
   * @param {string} password
   * @returns {*}  {Promise<any>}
   * @memberof LocalStrategy
   */
  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(email, password);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}

export default LocalStrategy;
