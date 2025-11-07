import mongoose, { Model, Connection, Types, ClientSession } from 'mongoose';
import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import bcrypt from 'bcrypt';
import { Transform } from 'class-transformer';
import { User } from './schemas/user.schema';
import CreateUserDto from './create-user.dto';
import { setError } from 'src/utilities/utils';
import { CONTROLLER, ERROR, MESSAGE, ROUTE } from 'src/utilities/constants';

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
    const session = await this.startTransaction();

    try {
      this.logger.log(`${MESSAGE.CREATE} ${messageSuffix}...`);

      const passwordEncrypted = await bcrypt.hash(password, 10);
      const user = await new this.userModel({
        ...createUserDto,
        id: new mongoose.Types.ObjectId(),
        password: passwordEncrypted,
      }).save({ session });

      await session.commitTransaction();

      return user;
    } catch (error) {
      const message = `${ERROR.CREATE} ${messageSuffix}`;

      await session.abortTransaction();

      this.logger.error(message);
      setError(HttpStatus.INTERNAL_SERVER_ERROR, message, error);
    } finally {
      session.endSession();
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

    const session = await this.startTransaction();

    try {
      const property = {
        id: {
          id:
            type === 'id' && typeof element === 'string'
              ? new Types.ObjectId(`${element}`)
              : element,
        },
        email: { email: element },
      };

      this.logger.log(`${MESSAGE.READ} the user...`);

      const user = await this.userModel
        .findOne(property[type])
        .populate(CONTROLLER.NOTES)
        .session(session)
        .exec();

      await session.commitTransaction();

      return user;
    } catch (error) {
      const message = `User ${FIND}`;

      await session.abortTransaction();

      this.logger.error(message);
      setError(HttpStatus.FOUND, message, error);
    } finally {
      session.endSession();
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

  /**
   * @description Query transaction starting method
   * @author Luca Cattide
   * @date 28/10/2025
   * @returns {*}  {Promise<ClientSession>}
   * @memberof UsersService
   */
  async startTransaction(): Promise<ClientSession> {
    const session = await this.connection.startSession();

    session.startTransaction();

    return session;
  }
}

export default UsersService;
