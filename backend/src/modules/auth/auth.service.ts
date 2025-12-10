import { Injectable, Logger, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import bcrypt from 'bcrypt';
import UsersService from '../users/users.service';
import StoreService from '../store/store.service';
import CreateUserDto from 'src/modules/users/create-user.dto';
import SignInDto from './sign-in.dto';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/modules/users/schemas/user.schema';
import { setError } from 'src/utilities/utils';
import {
  APP,
  CONFIGURATION_NAME,
  ERROR,
  JWT,
  MESSAGE,
  ROUTE,
} from 'src/utilities/constants';
import { TJWT, TToken } from './types/auth.type';
import { Response } from 'express';

const { CONFIGURATION } = APP;
const { COOKIE } = CONFIGURATION_NAME;
const { ALREADY_EXIST, BAD_REQUEST, CREATE, UNAUTHORIZED } = ERROR;
const { AUTHENTICATE, LOGOUT, VERIFY } = MESSAGE;

/**
 * @description Authentication service
 * The required decorator links metadata to class
 * by notifying Nest that it interacts with the expected controller
 * @author Luca Cattide
 * @date 19/08/2025
 * @class AuthService
 */
@Injectable()
class AuthService {
  private readonly logger = new Logger(UsersService.name);

  /**
   * Creates an instance of AuthService.
   * DB connection and Model DB methods
   * are defined respectively by the
   * DB client and module related services
   * both passed via dependency injection
   * @author Luca Cattide
   * @date 19/08/2025
   * @param {Connection} connection
   * @param {ConfigService} configService
   * @param {UsersService} usersService
   * @param {JwtService} jwtService
   * @param {StoreService} storeService
   * @memberof AuthService
   */
  constructor(
    @InjectConnection() private readonly connection: Connection,
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly storeService: StoreService,
  ) {}

  /**
   * @description Authentication login method
   * @author Luca Cattide
   * @date 27/09/2025
   * @param {SignInDto} signInDto
   * @param {Response} response
   * @returns {*}  {(Promise<TJWT | undefined>)}
   * @memberof AuthService
   */
  async login(
    signInDto: SignInDto,
    response: Response,
  ): Promise<TJWT | undefined> {
    if (!signInDto) {
      this.logger.error(BAD_REQUEST);
      setError(HttpStatus.BAD_REQUEST, BAD_REQUEST);
    }

    const { email } = signInDto;
    const messageSuffix = `the user ${email}`;
    const message = `${ERROR.FIND} ${messageSuffix}`;

    try {
      const user = await this.usersService.search(email);

      if (!user) {
        this.logger.error(message);
        setError(HttpStatus.FOUND, message);
      }

      const result = await this.setTokenCookie(user!, response);

      response = result.response;

      return result.token;
    } catch (error) {
      this.logger.error(message);
      setError(HttpStatus.INTERNAL_SERVER_ERROR, message, error);
    }
  }

  /**
   * @description Authentication logout method
   * @author Luca Cattide
   * @date 27/09/2025
   * @param {Response} response
   * @memberof AuthService
   */
  logout(token: string, response: Response): void {
    this.logger.log(LOGOUT);
    this.storeService.deleteRefreshToken(token);
    response.clearCookie(this.configService.get(COOKIE).refreshToken.name);
  }

  /**
   * @description Authentication token refresh method
   * @author Luca Cattide
   * @date 27/09/2025
   * @param {string} refreshToken
   * @returns {*}
   * @memberof AuthService
   */
  async refreshAccessToken(
    user: User,
    refreshToken: string,
    response: Response,
  ) {
    const message = `${ERROR.FIND} the user`;

    if (!refreshToken) {
      this.logger.error(BAD_REQUEST);
      setError(HttpStatus.BAD_REQUEST, BAD_REQUEST);
    }

    try {
      this.logger.log(`${VERIFY} ${ROUTE.AUTH.REFRESH_TOKEN} token...`);

      const decoded = this.jwtService.verify(refreshToken, {
        algorithms: ['HS256', 'RS256'],
        audience: this.configService.get(CONFIGURATION).name,
        issuer: MESSAGE.BASE_URL,
      });

      if (!decoded) {
        this.logger.error(message);
        setError(HttpStatus.FORBIDDEN, UNAUTHORIZED);
      }

      await this.storeService.deleteRefreshToken(refreshToken);

      const result = await this.setTokenCookie(user, response);
      const { token } = result;

      await this.storeService.setRefreshToken(
        JWT.EXPIRATION_REFRESH_INVALIDATION,
        token?.refresh_token!,
        user.id.toString(),
      );

      response = result.response;

      return token;
    } catch (error) {
      this.logger.error(message);
      setError(HttpStatus.INTERNAL_SERVER_ERROR, message, error);
    }
  }

  /**
   * @description Authentication registration method
   * @author Luca Cattide
   * @date 26/08/2025
   * @param {CreateUserDto} createUserDto
   * @param {Response} response
   * @returns {*}  {(Promise<TJWT | undefined>)}
   * @memberof AuthService
   */
  async register(
    createUserDto: CreateUserDto,
    response: Response,
  ): Promise<TJWT | undefined> {
    const { password } = createUserDto;
    let message = `${ERROR.CREATE} the user`;
    let user = await this.usersService.search(createUserDto.email);

    if (user) {
      message = `User ${ALREADY_EXIST}`;

      this.logger.error(message);
      setError(HttpStatus.BAD_REQUEST, message);
    }

    try {
      user = await this.usersService.create(createUserDto);

      if (!user) {
        this.logger.error(message);
        setError(HttpStatus.BAD_REQUEST, message);
      }

      this.logger.log(`${AUTHENTICATE} the user...`);

      return this.login({ email: user!.email, password }, response);
    } catch (error) {
      this.logger.error(message);
      setError(HttpStatus.INTERNAL_SERVER_ERROR, message, error);
    }
  }

  /**
   * @description Authentication tokens generation method
   * TODO: May be improved by keeping track of token blacklists
   * See: https://dev.to/zenstok/how-to-implement-refresh-tokens-with-token-rotation-in-nestjs-1deg
   * @author Luca Cattide
   * @date 27/08/2025
   * @param {User} user
   * @returns {*}  {Promise<TJWT | undefined>}
   * @memberof AuthService
   */
  async setToken(user: User): Promise<TJWT | undefined> {
    try {
      const { id } = user;

      this.logger.log(`${MESSAGE.AUTH}...`);

      return {
        access_token: await this.jwtService.signAsync(
          {
            email: user.email,
            sub: id,
          },
          {
            secret: this.configService.get(CONFIGURATION).secret,
            expiresIn: JWT.EXPIRATION,
          },
        ),
        refresh_token: await this.setTokenRefresh(user),
      };
    } catch (error) {
      const message = `${CREATE} the token`;

      this.logger.error(message);
      setError(HttpStatus.INTERNAL_SERVER_ERROR, message, error);
    }
  }

  /**
   * @description Cookie token setter method
   * @author Luca Cattide
   * @date 28/09/2025
   * @param {User} user
   * @param {Response} response
   * @returns {*}  {(Promise<TToken>)}
   * @memberof AuthService
   */
  async setTokenCookie(user: User, response: Response): Promise<TToken> {
    const token = await this.setToken(user!);
    const cookieConfiguration = this.configService.get(COOKIE);
    let result: TJWT | undefined;

    if (token) {
      const { access_token, refresh_token } = token;

      result = {
        access_token,
      };

      /**
       * Leaving apart refresh tokens from access ones inside cookies
       * improves security vs XSS attacks
       */
      this.logger.log(MESSAGE.COOKIE);
      response.cookie(
        cookieConfiguration.refreshToken.name,
        // Storing only the refresh one to secure vs CSRF attacks
        refresh_token,
        cookieConfiguration.refreshToken.options,
      );
    }

    return {
      response,
      token: result ?? undefined,
    };
  }

  /**
   * @description Refresh token setter method
   * @author Luca Cattide
   * @date 26/08/2025
   * @param {User} user
   * @returns {*}  {(Promise<string | undefined>)}
   * @memberof AuthService
   */
  async setTokenRefresh(user: User): Promise<string | undefined> {
    if (!user) {
      this.logger.error(BAD_REQUEST);
      setError(HttpStatus.BAD_REQUEST, BAD_REQUEST);
    }

    try {
      this.logger.log(`${MESSAGE.AUTH_REFRESH}...`);

      const { id } = user;
      const refreshToken = await this.jwtService.signAsync(
        { sub: id },
        {
          secret: this.configService.get(CONFIGURATION).secretRefresh,
          expiresIn: JWT.EXPIRATION_REFRESH,
        },
      );

      this.storeService.setRefreshToken(
        JWT.EXPIRATION_REFRESH_INVALIDATION,
        refreshToken,
        id.toString(),
      );

      return refreshToken;
    } catch (error) {
      const message = `${CREATE} the token`;

      this.logger.error(message);
      setError(HttpStatus.INTERNAL_SERVER_ERROR, message, error);
    }
  }

  /**
   * @description Authentication sign-in method
   * Used by vanilla authentication only
   * @author Luca Cattide
   * @date 19/08/2025
   * @param {string} email
   * @param {string} password
   * @returns {*}  {Promise<TJWT | undefined>}
   * @memberof AuthService
   */
  async signIn(email: string, password: string): Promise<TJWT | undefined> {
    try {
      const user = await this.validateUser(email, password);
      const { id } = user!;

      this.logger.log(`${MESSAGE.AUTH}...`);

      return {
        access_token: await this.jwtService.signAsync({
          email: user!.email,
          sub: id,
        }),
      };
    } catch (error) {
      const messageSuffix = `the user ${email}`;
      const message = `${ERROR.FIND} ${messageSuffix}`;

      this.logger.error(message);
      setError(HttpStatus.INTERNAL_SERVER_ERROR, message, error);
    }
  }

  /**
   * @description Authentication user validation method
   * @author Luca Cattide
   * @date 20/08/2025
   * @param {string} email
   * @param {string} passwordEntered
   * @returns {*}  {Promise<Omit<User, 'password'> | undefined>}
   * @memberof AuthService
   */
  async validateUser(
    email: string,
    passwordEntered: string,
  ): Promise<Omit<User, 'password'> | undefined> {
    if (!email || !passwordEntered) {
      this.logger.error(BAD_REQUEST);
      setError(HttpStatus.BAD_REQUEST, BAD_REQUEST);
    }

    const messageSuffix = `the user ${email}`;
    const message = `${ERROR.FIND} ${messageSuffix}`;

    try {
      this.logger.log(`${MESSAGE.READ} ${messageSuffix}...`);

      const user = await this.usersService.search(email);

      if (!user) {
        this.logger.error(message);
        setError(HttpStatus.FOUND, message);
      }

      const match = await bcrypt.compare(passwordEntered, user!.password!);

      if (!match) {
        this.logger.error(UNAUTHORIZED);
        setError(HttpStatus.UNAUTHORIZED, UNAUTHORIZED);
      }

      const { password, ...rest } = user!;

      return rest;
    } catch (error) {
      this.logger.error(message);
      setError(HttpStatus.INTERNAL_SERVER_ERROR, message, error);
    }
  }
}

export default AuthService;
