import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Get,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiFoundResponse,
  ApiInternalServerErrorResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import AuthService from './auth.service';
import LocalAuthGuard from 'src/guards/local-auth.guard';
import JwtAuthGuard from 'src/guards/jwt-auth.guard';
import SignInDto from './sign-in.dto';
import { User } from 'src/users/schemas/user.schema';
import {
  CONTROLLER,
  ERROR,
  MESSAGE,
  ROUTE,
  SCHEMA,
} from 'src/utilities/constants';
import { TJWT } from './types/auth.type';
import CreateUserDto from 'src/users/create-user.dto';

const { AUTH } = CONTROLLER;
const { AUTHENTICATE, BAD_REQUEST, UNAUTHORIZED } = ERROR;
const { AUTHENTICATED, FOUND } = MESSAGE;
const { LOGIN_LOCAL, LOGIN_JWT, LOGOUT, REGISTER, SIGNIN } = ROUTE.AUTH;
const { USER } = SCHEMA;

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
   * @param {*} request
   * @returns {*}  {User}
   * @memberof AuthController
   */
  @UseGuards(JwtAuthGuard)
  @Get(LOGIN_JWT)
  @ApiBadRequestResponse({ description: BAD_REQUEST })
  @ApiInternalServerErrorResponse({ description: `${AUTHENTICATE} the user` })
  login(@Request() request): User {
    return request.user;
  }

  /**
   * @description Authentication login endpoint
   * Used by Local strategy only
   * @author Luca Cattide
   * @date 20/08/2025
   * @param {*} request
   * @returns {*}  {Promise<TJWT | undefined>}
   * @memberof AuthController
   */
  @UseGuards(LocalAuthGuard)
  @Post(LOGIN_LOCAL)
  @ApiBadRequestResponse({ description: BAD_REQUEST })
  @ApiInternalServerErrorResponse({ description: `${AUTHENTICATE} the user` })
  @ApiUnauthorizedResponse({ description: UNAUTHORIZED })
  async loginLocal(@Request() request): Promise<TJWT | undefined> {
    return await this.authService.login(request.user);
  }

  /**
   * @description Authentication logout endpoint
   * Used by Local strategy only
   * @author Luca Cattide
   * @date 25/08/2025
   * @param {*} request
   * @returns {*}
   * @memberof AuthController
   */
  @UseGuards(LocalAuthGuard)
  @Post(LOGOUT)
  @ApiInternalServerErrorResponse({ description: `${AUTHENTICATE} the user` })
  @ApiUnauthorizedResponse({ description: UNAUTHORIZED })
  async logout(@Request() request) {
    return request.logout();
  }

  /**
   * @description Authentication registration endpoint
   * @author Luca Cattide
   * @date 25/08/2025
   * @param {CreateUserDto} createUserDto
   * @memberof AuthController
   */
  @Post(REGISTER)
  @ApiBadRequestResponse({ description: BAD_REQUEST })
  @ApiInternalServerErrorResponse({ description: `${ERROR.REGISTER} the user` })
  async register(@Body() createUserDto: CreateUserDto) {
    await this.authService.register(createUserDto);
  }

  /**
   * @description Authentication login endpoint
   * Used by vanilla authentication only
   * @author Luca Cattide
   * @date 19/08/2025
   * @param {Record<string, any>} signInDto
   * @returns {*}  {Promise<TJWT | undefined>}
   * @memberof AuthController
   */
  @HttpCode(HttpStatus.OK)
  @Post(SIGNIN)
  async signIn(@Body() signInDto: SignInDto): Promise<TJWT | undefined> {
    return await this.authService.signIn(signInDto.email, signInDto.password);
  }
}

export default AuthController;
