import { Injectable, Logger, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import bcrypt from 'bcrypt';
import UsersService from '../users/users.service';
import CreateUserDto from 'src/users/create-user.dto';
import SignInDto from './sign-in.dto';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/users/schemas/user.schema';
import { setError } from 'src/utilities/utils';
import {
  APP,
  ERROR,
  JWT,
  MESSAGE,
  ROUTE,
  TOKEN,
} from 'src/utilities/constants';
import { TJWT } from './types/auth.type';

const { ALREADY_EXIST, BAD_REQUEST, CREATE, UNAUTHORIZED } = ERROR;
const { AUTHENTICATE, VERIFY } = MESSAGE;

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
   * @memberof AuthService
   */
  constructor(
    @InjectConnection() private readonly connection: Connection,
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * @description Authentication login method
   * @author Luca Cattide
   * @date 27/09/2025
   * @param {SignInDto} signInDto
   * @returns {*}  {(Promise<TJWT | undefined>)}
   * @memberof AuthService
   */
  async login(signInDto: SignInDto): Promise<TJWT | undefined> {
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

      return await this.setToken(user!);
    } catch (error) {
      this.logger.error(message);
      setError(HttpStatus.INTERNAL_SERVER_ERROR, message, error);
    }
  }

  /**
   * @description Authentication token refresh method
   * @author Luca Cattide
   * @date 27/09/2025
   * @param {string} refreshToken
   * @returns {*}
   * @memberof AuthService
   */
  async refreshAccessToken(refreshToken: string) {
    const message = `${ERROR.FIND} the user`;

    if (!refreshToken) {
      this.logger.error(BAD_REQUEST);
      setError(HttpStatus.BAD_REQUEST, BAD_REQUEST);
    }

    try {
      this.logger.log(`${VERIFY} ${ROUTE.AUTH.REFRESH_TOKEN} token...`);

      const decoded = this.jwtService.verify(refreshToken);

      if (!decoded) {
        this.logger.error(message);
        setError(HttpStatus.FORBIDDEN, UNAUTHORIZED);
      }

      const user = await this.usersService.find(TOKEN.REFRESH, refreshToken);

      if (!user) {
        this.logger.error(message);
        setError(HttpStatus.FOUND, message);
      }

      return await this.setToken(user!);
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
   * @returns {*}  {(Promise<TJWT | undefined>)}
   * @memberof AuthService
   */
  async register(createUserDto: CreateUserDto): Promise<TJWT | undefined> {
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

      return this.login({ email: user!.email, password });
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
      const { _id } = user;

      this.logger.log(`${MESSAGE.AUTH}...`);

      return {
        access_token: await this.jwtService.signAsync({
          email: user.email,
          sub: _id,
        }),
        refresh_token: await this.setTokenRefresh(user),
      };
    } catch (error) {
      const message = `${CREATE} the token`;

      this.logger.error(message);
      setError(HttpStatus.INTERNAL_SERVER_ERROR, message, error);
    }
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

      const { _id } = user;
      const refreshToken = await this.jwtService.signAsync(
        { sub: _id },
        {
          secret: this.configService.get(APP.CONFIGURATION).secretRefresh,
          expiresIn: JWT.EXPIRATION_REFRESH,
        },
      );

      user.refreshToken = refreshToken;

      this.usersService.update(user._id, refreshToken);

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
      const { _id } = user!;

      this.logger.log(`${MESSAGE.AUTH}...`);

      return {
        access_token: await this.jwtService.signAsync({
          email: user!.email,
          sub: _id,
        }),
      };
    } catch (error) {
      const messageSuffix = `the user ${email}`;
      const message = `${ERROR.FIND} ${messageSuffix}`;

      this.logger.error(message);
      setError(HttpStatus.INTERNAL_SERVER_ERROR, message, error);
    }
  }

  async startTransaction() {
    const session = await this.connection.startSession();

    session.startTransaction();
    // TODO: Your transaction logic here
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
