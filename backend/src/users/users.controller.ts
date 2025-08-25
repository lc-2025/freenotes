import { Controller, Get, Post, Body, UseGuards, Query } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiFoundResponse,
  ApiInternalServerErrorResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import UsersService from './users.service';
import CreateUserDto from './create-user.dto';
import { User } from './schemas/user.schema';
import {
  CONTROLLER,
  ERROR,
  MESSAGE,
  ROUTE,
  SCHEMA,
} from 'src/utilities/constants';
import JwtAuthGuard from 'src/guards/jwt-auth.guard';

const { USERS } = CONTROLLER;
const { CREATE, BAD_REQUEST, UNAUTHORIZED } = ERROR;
const { CREATED, FOUND } = MESSAGE;
const { GET, PARAM } = ROUTE.USERS;
const { USER } = SCHEMA;

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
@ApiBearerAuth()
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
   * @description User creation endpoint
   * @author Luca Cattide
   * @date 17/08/2025
   * @param {CreateUserDto} createUserDto
   * @memberof UsersController
   */
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiBadRequestResponse({ description: BAD_REQUEST })
  @ApiCreatedResponse({ description: `${USER} ${CREATED}` })
  @ApiInternalServerErrorResponse({ description: `${CREATE} the new user` })
  @ApiUnauthorizedResponse({ description: UNAUTHORIZED })
  async create(@Body() createUserDto: CreateUserDto) {
    await this.usersService.create(createUserDto);
  }

  /**
   * @description User retrieve endpoint
   * Get decorator defines the route sub-path
   * Param decorator exposes querystring params
   * @author Luca Cattide
   * @date 17/08/2025
   * @param {string} email
   * @returns {*}  {Promise<User | null | undefined>}
   * @memberof UsersController
   */
  @UseGuards(JwtAuthGuard)
  @Get(GET)
  @ApiBadRequestResponse({ description: BAD_REQUEST })
  @ApiFoundResponse({ description: `${USER} ${FOUND}` })
  @ApiInternalServerErrorResponse({ description: `${USER} ${ERROR.FIND}` })
  @ApiUnauthorizedResponse({ description: UNAUTHORIZED })
  async find(@Query(PARAM) email: string): Promise<User | null | undefined> {
    return await this.usersService.find(email);
  }
}

export default UsersController;
