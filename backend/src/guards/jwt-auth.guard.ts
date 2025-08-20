import {
  Injectable,
  ExecutionContext,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * @description Authentication JWT guard
 * @author Luca Cattide
 * @date 20/08/2025
 * @class JwtAuthGuard
 * @extends {AuthGuard('jwt')}
 */
@Injectable()
class JwtAuthGuard extends AuthGuard('jwt') {
  /**
   * @description
   * @author Luca Cattide
   * @date 20/08/2025
   * @param {ExecutionContext} context
   * @returns {*}  {boolean}
   * @memberof JwtAuthGuard
   */
  canActivate(context: ExecutionContext) {
    // Add your custom authentication logic here
    // for example, call super.logIn(request) to establish a session.
    return super.canActivate(context);
  }
}

export default JwtAuthGuard;
