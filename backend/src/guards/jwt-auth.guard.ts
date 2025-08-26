import { Injectable, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { DECORATOR, STRATEGY } from 'src/utilities/constants';

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
   * @description
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

export default JwtAuthGuard;
