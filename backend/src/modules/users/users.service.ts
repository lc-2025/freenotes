import { Model, Connection, Types } from 'mongoose';
import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import bcrypt from 'bcrypt';
import { User } from './schemas/user.schema';
import CreateUserDto from './create-user.dto';
import { setError } from 'src/utilities/utils';
import { ERROR, MESSAGE, ROUTE } from 'src/utilities/constants';
import { Transform } from 'class-transformer';

const { BAD_REQUEST, FIND } = ERROR;

/**
 * @description User service
 * The required decorator links metadata to class
 * by notifying Nest that it interacts with the expected controller
 * @author Luca Cattide
 * @date 17/08/2025
 * @class UsersService
 */
@Injectable()
class UsersService {
  private readonly logger = new Logger(UsersService.name);

  /**
   * Creates an instance of UsersService.
   * DB connection and Model DB methods
   * are defined respectively by the
   * DB client and module related services
   * both passed via dependency injection
   * @author Luca Cattide
   * @date 17/08/2025
   * @param {Connection} connection
   * @param {Model<User>} userModel
   * @memberof UsersService
   */
  constructor(
    @InjectConnection() private readonly connection: Connection,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  /**
   * @description User creation method
   * @author Luca Cattide
   * @date 17/08/2025
   * @param {CreateUserDto} createUserDto
   * @returns {*}  {Promise<User | undefined>}
   * @memberof UsersService
   */
  async create(createUserDto: CreateUserDto): Promise<User | undefined> {
    if (!createUserDto) {
      this.logger.error(BAD_REQUEST);
      setError(HttpStatus.BAD_REQUEST, BAD_REQUEST);
    }

    const { name, password } = createUserDto;
    const messageSuffix = `the new user ${name}`;

    try {
      this.logger.log(`${MESSAGE.CREATE} ${messageSuffix}...`);

      const passwordEncrypted = await bcrypt.hash(password, 10);

      return await new this.userModel({
        ...createUserDto,
        password: passwordEncrypted,
      }).save();
    } catch (error) {
      const message = `${ERROR.CREATE} ${messageSuffix}`;

      this.logger.error(message);
      setError(HttpStatus.INTERNAL_SERVER_ERROR, message, error);
    }
  }

  /**
   * @description User retrieve method
   * Returns a serialized response to avoid
   * password exposure
   * @author Luca Cattide
   * @date 17/08/2025
   * @param {string} type
   * @param {string} element
   * @returns {*}  {Promise<User | null | undefined>}
   * @memberof UsersService
   */
  @Transform(({ value }) => {
    // FIXME: Not working
    const { password, ...rest } = value;

    return rest;
  })
  async find(type: string, element: string): Promise<User | null | undefined> {
    if (!type || !element) {
      this.logger.error(BAD_REQUEST);
      setError(HttpStatus.BAD_REQUEST, BAD_REQUEST);
    }

    try {
      const property = {
        id: { _id: element },
        email: { email: element },
        refreshToken: { refreshToken: element },
      };

      this.logger.log(`${MESSAGE.READ} the user...`);

      return await this.userModel.findOne(property[type]).exec();
    } catch (error) {
      const message = `User ${FIND}`;

      this.logger.error(message);
      setError(HttpStatus.FOUND, message, error);
    }
  }

  /**
   * @description User search method
   * User during authentication to get
   * all the user info
   * @author Luca Cattide
   * @date 19/08/2025
   * @param {string} email
   * @returns {*}  {(Promise<User | null | undefined>)}
   * @memberof UsersService
   */
  async search(email: string): Promise<User | null | undefined> {
    if (!email) {
      this.logger.error(BAD_REQUEST);
      setError(HttpStatus.BAD_REQUEST, BAD_REQUEST);
    }

    try {
      // Return the full User (including password)
      return await this.find(ROUTE.USERS.PARAM, email);
    } catch (error) {
      const message = `User ${email} ${FIND}`;

      this.logger.error(message);
      setError(HttpStatus.FOUND, message, error);
    }
  }

  async startTransaction() {
    const session = await this.connection.startSession();

    session.startTransaction();
    // TODO: Your transaction logic here
  }

  /**
   * @description User update method
   * @author Luca Cattide
   * @date 26/08/2025
   * @param {Types.ObjectId} id
   * @param {string} refreshToken
   * @returns {*}  {Promise<void>}
   * @memberof UsersService
   */
  async update(id: Types.ObjectId, refreshToken: string): Promise<void> {
    try {
      // TODO: Const
      this.logger.log('Updating the user...');

      await this.userModel
        .findOneAndUpdate({ _id: id }, { refreshToken })
        .exec();
    } catch (error) {
      const message = `User ${FIND}`;

      this.logger.error(message);
      setError(HttpStatus.FOUND, message, error);
    }
  }
}

export default UsersService;
