import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import UsersService from './users.service';
import CreateUserDto from './create-user.dto';
import { User } from './schemas/user.schema';
import { CONTROLLER, ROUTE } from 'src/utilities/constants';

const { USERS } = CONTROLLER;
const { GET, PARAM } = ROUTE.USERS;

/**
 * @description User controller
 * The required decorator links metadata to class
 * by binding requests to the correspondent controller.
 * The param defines the route prefix.
 * CRUD actions are defined by decorators as well
 * @author Luca Cattide
 * @date 17/08/2025
 * @class UsersController
 */
@Controller(USERS)
class UsersController {
  /**
   * Creates an instance of UsersController.
   * Model DB methods are defined by the
   * module related services and passed via
   * dependency injection
   * @author Luca Cattide
   * @date 17/08/2025
   * @param {UsersService} usersService
   * @memberof UsersController
   */
  constructor(private readonly usersService: UsersService) {}

  /**
   * @description User retrieve endpoint
   * Get decorator defines the route sub-path
   * Param decorator exposes querystring params
   * @author Luca Cattide
   * @date 17/08/2025
   * @param {string} email
   * @returns {*}  {Promise<User[]>}
   * @memberof UsersController
   */
  @Get(GET)
  async find(@Param(PARAM) email: string): Promise<User[]> {
    // TODO: Validation + error handling
    return this.usersService.find(email);
  }

  /**
   * @description User creation endpoint
   * @author Luca Cattide
   * @date 17/08/2025
   * @param {CreateUserDto} createUserDto
   * @memberof UsersController
   */
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    // TODO: Validation + error handling
    await this.usersService.create(createUserDto);
  }
}

export default UsersController;
