import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Get,
  Request,
  UseGuards,
  Req,
  Res,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import AuthService from './auth.service';
import LocalAuthGuard from 'src/guards/local-auth.guard';
import SignInDto from './sign-in.dto';
import { TJWT } from './types/auth.type';
import CreateUserDto from 'src/modules/users/create-user.dto';
import Public from 'src/decorators/public.decorator';
import { CONTROLLER, ERROR, ROUTE } from 'src/utilities/constants';
import JwtAuthGuard from 'src/guards/jwt-auth.guard';

const { AUTH } = CONTROLLER;
const { AUTHENTICATE, BAD_REQUEST, TOKEN, UNAUTHORIZED } = ERROR;
const { LOGIN, LOGOUT, REFRESH_TOKEN, REGISTER, SIGNIN } = ROUTE.AUTH;

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
   * @date 28/09/2025
   * @param {*} request
   * @param {*} response
   * @returns {*}  {(Promise<TJWT | undefined>)}
   * @memberof AuthController
   */
  @UseGuards(LocalAuthGuard)
  @Get(LOGIN)
  @ApiBadRequestResponse({ description: BAD_REQUEST })
  @ApiInternalServerErrorResponse({ description: `${AUTHENTICATE} the user` })
  async login(
    @Req() request,
    @Res({ passthrough: true }) response,
  ): Promise<TJWT | undefined> {
    return await this.authService.login(request.user, response);
  }

  /**
   * @description Authentication logout endpoint
   * @author Luca Cattide
   * @date 25/08/2025
   * @param {*} request
   * @param {*} response
   * @returns {*}
   * @memberof AuthController
   */
  @UseGuards(LocalAuthGuard)
  @Post(LOGOUT)
  @ApiInternalServerErrorResponse({ description: `${AUTHENTICATE} the user` })
  @ApiUnauthorizedResponse({ description: UNAUTHORIZED })
  logout(@Req() request, @Res() response) {
    this.authService.logout(response);

    return request.logout();
  }

  /**
   * @description Authentication refresh token endpoint
   * @author Luca Cattide
   * @date 26/08/2025
   * @param {*} request
   * @param {*} response
   * @returns {*}  {(Promise<TJWT | undefined>)}
   * @memberof AuthController
   */
  @UseGuards(JwtAuthGuard)
  @Post(REFRESH_TOKEN)
  @ApiBadRequestResponse({ description: BAD_REQUEST })
  @ApiInternalServerErrorResponse({ description: `${TOKEN} the token` })
  async refreshToken(
    @Req() request,
    @Res({ passthrough: true }) response,
  ): Promise<TJWT | undefined> {
    return await this.authService.refreshAccessToken(
      request.refreshToken,
      response,
    );
  }

  /**
   * @description Authentication registration endpoint
   * @author Luca Cattide
   * @date 25/08/2025
   * @param {CreateUserDto} createUserDto
   * @param {*} response
   * @returns {*}  {Promise<TJWT | undefined>}
   * @memberof AuthController
   */
  @Public()
  @Post(REGISTER)
  @ApiBadRequestResponse({ description: BAD_REQUEST })
  @ApiInternalServerErrorResponse({ description: `${ERROR.REGISTER} the user` })
  async register(
    @Body() createUserDto: CreateUserDto,
    @Res({ passthrough: true }) response,
  ): Promise<TJWT | undefined> {
    return await this.authService.register(createUserDto, response);
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
