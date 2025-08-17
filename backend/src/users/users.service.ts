import { Model, Connection } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import CreateUserDto from './create-user.dto';

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

  async startTransaction() {
    const session = await this.connection.startSession();

    session.startTransaction();
    // TODO: Your transaction logic here
  }

  /**
   * @description User creation method
   * @author Luca Cattide
   * @date 17/08/2025
   * @param {CreateUserDto} createUserDto
   * @returns {*}  {Promise<User>}
   * @memberof UsersService
   */
  async create(createUserDto: CreateUserDto): Promise<User> {
    return new this.userModel(createUserDto).save();
  }

  /**
   * @description User retrieve method
   * @author Luca Cattide
   * @date 17/08/2025
   * @param {string} email
   * @returns {*}  {Promise<User[]>}
   * @memberof UsersService
   */
  async find(email: string): Promise<User[]> {
    return this.userModel.find({ email }).exec();
  }
}

export default UsersService;
