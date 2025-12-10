import { Injectable, ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { APP, DECORATOR, STRATEGY } from 'src/utilities/constants';
import { extractCookieToken } from 'src/utilities/utils';

/**
 * @description Authentication JWT guard
 * @author Luca Cattide
 * @date 20/08/2025
 * @class JwtAuthGuard
 * @extends {AuthGuard('jwt')}
 */
@Injectable()
class JwtAuthGuard extends AuthGuard(STRATEGY.JWT) {
  /**
   * Creates an instance of JwtAuthGuard.
   * @author Luca Cattide
   * @date 26/08/2025
   * @param {Reflector} reflector
   * @memberof JwtAuthGuard
   */
  constructor(private reflector: Reflector) {
    super();
  }

  /**
   * @description Activation checker method
   * @author Luca Cattide
   * @date 20/08/2025
   * @param {ExecutionContext} context
   * @returns {*}  {boolean}
   * @memberof JwtAuthGuard
   */
  canActivate(
    context: ExecutionContext,
  ): Promise<boolean> | boolean | Observable<boolean> {
    // Checks if the endpoint is flagged as public and retrieves related metadata
    const isPublic = this.reflector.getAllAndOverride(DECORATOR.PUBLIC, [
      context.getHandler(),
      context.getClass(),
    ]);

    return isPublic ? true : super.canActivate(context);
  }
}

/**
 * @description Authentication JWT refresh guard
 * @author Luca Cattide
 * @date 21/10/2025
 * @class JwtRefreshAuthGuard
 * @extends {AuthGuard(STRATEGY.JWT_REFRESH)}
 */
@Injectable()
class JwtRefreshAuthGuard extends AuthGuard(STRATEGY.JWT_REFRESH) {
  /**
   * Creates an instance of JwtRefreshAuthGuard.
   * @author Luca Cattide
   * @date 07/11/2025
   * @param {Reflector} reflector
   * @memberof JwtRefreshAuthGuard
   */
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {
    super();
  }

  /**
   * @description Activation checker method
   * @author Luca Cattide
   * @date 07/11/2025
   * @param {ExecutionContext} context
   * @returns {*}  {(Promise<boolean> | boolean | Observable<boolean>)}
   * @memberof JwtRefreshAuthGuard
   */
  canActivate(
    context: ExecutionContext,
  ): Promise<boolean> | boolean | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const token = extractCookieToken(req);

    if (token) {
      const secretRefresh = this.configService.get(
        APP.CONFIGURATION,
      ).secretRefresh;

      try {
        const decoded: any = this.jwtService.verify(token, secretRefresh);

        console.log('[JwtRefreshAuthGuard] jwt.verify OK, exp:', decoded?.exp);
      } catch (err: any) {
        console.error(
          '[JwtRefreshAuthGuard] jwt.verify error:',
          err?.message || err,
        );

        return false;
      }
    }

    return super.canActivate(context);
  }

  /**
   * @description Request handler method
   * @author Luca Cattide
   * @date 10/12/2025
   * @param {*} err
   * @param {*} user
   * @param {*} info
   * @param {ExecutionContext} context
   * @param {*} [status]
   * @returns {*}
   * @memberof JwtRefreshAuthGuard
   */
  handleRequest(
    err: any,
    user: any,
    info: any,
    context: ExecutionContext,
    status?: any,
  ) {
    if (err || !user) {
      return super.handleRequest(err, user, info, context, status);
    }

    return user;
  }
}

export { JwtAuthGuard, JwtRefreshAuthGuard };
