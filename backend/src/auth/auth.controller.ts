import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Get,
  Request,
} from '@nestjs/common';
import AuthService from './auth.service';
import SignInDto from './sign-in.dto';
import { User } from 'src/users/schemas/user.schema';
import { CONTROLLER, ROUTE } from 'src/utilities/constants';

const { AUTH } = CONTROLLER;
const { GET, POST } = ROUTE.AUTH;

/**
 * @description Authentication controller
 * The required decorator links metadata to class
 * by binding requests to the correspondent controller.
 * The param defines the route prefix.
 * CRUD actions are defined by decorators as well
 * @author Luca Cattide
 * @date 19/08/2025
 * @class AuthController
 */
@Controller(AUTH)
class AuthController {
  /**
   * Creates an instance of AuthController.
   * Model DB methods are defined by the
   * module related services and passed via
   * dependency injection
   * @author Luca Cattide
   * @date 19/08/2025
   * @param {AuthService} authService
   * @memberof AuthController
   */
  constructor(private authService: AuthService) {}

  /**
   * @description Authentication login endpoint
   * @author Luca Cattide
   * @date 19/08/2025
   * @param {Record<string, any>} signInDto
   * @returns {*}
   * @memberof AuthController
   */
  // TODO: return status type
  @HttpCode(HttpStatus.OK)
  @Post(POST)
  async signIn(@Body() signInDto: SignInDto): Promise<any> {
    return await this.authService.signIn(signInDto.email, signInDto.password);
  }

  /**
   * @description Authenticated user endpoint
   * @author Luca Cattide
   * @date 19/08/2025
   * @param {*} request
   * @returns {*}  {User}
   * @memberof AuthController
   */
  @Get(GET)
  user(@Request() request): User {
    return request.user;
  }
}

export default AuthController;
