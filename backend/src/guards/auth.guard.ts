import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SCHEMA, TOKEN } from 'src/utilities/constants';

/**
 * @description Authentication guard
 * Used by vanilla authentication only
 * @author Luca Cattide
 * @date 19/08/2025
 * @class AuthGuard
 * @implements {CanActivate}
 */
@Injectable()
class AuthGuard implements CanActivate {
  /**
   * Creates an instance of AuthGuard.
   * @author Luca Cattide
   * @date 19/08/2025
   * @param {JwtService} jwtService
   * @memberof AuthGuard
   */
  constructor(private jwtService: JwtService) {}

  /**
   * @description Authentication checker
   * Verifies the access token
   * to allow authentication
   * @author Luca Cattide
   * @date 19/08/2025
   * @param {ExecutionContext} context
   * @returns {*}  {Promise<boolean>}
   * @memberof AuthGuard
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      // Assigning to the request object in order to access it on route handlers
      request[SCHEMA.USER.toLowerCase()] = await this.jwtService.verifyAsync(
        token,
        {
          secret: process.env.SECRET,
        },
      );
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }

  /**
   * @description Access token helper
   * Extracts the access token from the
   * request header
   * @author Luca Cattide
   * @date 19/08/2025
   * @private
   * @param {Request} request
   * @returns {*}  {(string | undefined)}
   * @memberof AuthGuard
   */
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];

    return type === TOKEN ? token : undefined;
  }
}

export default AuthGuard;
