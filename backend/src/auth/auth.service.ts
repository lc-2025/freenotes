import { Injectable, Logger, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import bcrypt from 'bcrypt';
import UsersService from '../users/users.service';
import { User } from 'src/users/schemas/user.schema';
import { setError } from 'src/utilities/utils';
import { ERROR, MESSAGE } from 'src/utilities/constants';
import { TJWT } from './types/auth.type';

const { BAD_REQUEST, UNAUTHORIZED } = ERROR;

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
   * @param {UsersService} usersService
   * @param {JwtService} jwtService
   * @memberof AuthService
   */
  constructor(
    @InjectConnection() private readonly connection: Connection,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  /**
   * @description Authentication login method
   * @author Luca Cattide
   * @date 20/08/2025
   * @param {User} user
   * @returns {*}  {Promise<TJWT>}
   * @memberof AuthService
   */
  async login(user: User): Promise<TJWT> {
    return {
      access_token: this.jwtService.sign({ email: user.email, sub: user._id }),
    };
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
    if (!email || !password) {
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

      const match = await bcrypt.compare(password, user!.password!);

      if (!match) {
        this.logger.error(UNAUTHORIZED);
        setError(HttpStatus.UNAUTHORIZED, UNAUTHORIZED);
      }

      this.logger.log(`${MESSAGE.AUTH}...`);

      return {
        access_token: await this.jwtService.signAsync({
          email: user!.email,
          sub: user!._id,
        }),
      };
    } catch (error) {
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

      this.logger.log(`${MESSAGE.AUTH}...`);

      const { password, ...rest } = user!;

      return rest;
    } catch (error) {
      this.logger.error(message);
      setError(HttpStatus.INTERNAL_SERVER_ERROR, message, error);
    }
  }
}

export default AuthService;
