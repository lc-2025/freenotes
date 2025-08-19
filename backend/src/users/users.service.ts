import { Model, Connection } from 'mongoose';
import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import CreateUserDto from './create-user.dto';
import { setError } from 'src/utilities/utils';
import { ERROR, MESSAGE } from 'src/utilities/constants';

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

    const { name } = createUserDto;
    const messageSuffix = `the new user ${name}`;

    try {
      this.logger.log(`${MESSAGE.CREATE} ${messageSuffix}...`);

      return await new this.userModel(createUserDto).save();
    } catch (error) {
      const message = `${ERROR.CREATE} ${messageSuffix}`;

      this.logger.error(message);
      setError(HttpStatus.INTERNAL_SERVER_ERROR, message, error);
    }
  }

  /**
   * @description User retrieve method
   * @author Luca Cattide
   * @date 17/08/2025
   * @param {string} email
   * @returns {*}  {Promise<User[] | undefined>}
   * @memberof UsersService
   */
  async find(email: string): Promise<User[] | undefined> {
    if (!email) {
      this.logger.error(BAD_REQUEST);
      setError(HttpStatus.BAD_REQUEST, BAD_REQUEST);
    }

    try {
      this.logger.log(`${MESSAGE.READ} the user ${email}...`);

      return await this.userModel.find({ email }).exec();
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
}

export default UsersService;
