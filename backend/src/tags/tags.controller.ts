import {
  Controller,
  Get,
  Post,
  Body,
  ParseArrayPipe,
  UseGuards,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiFoundResponse,
  ApiInternalServerErrorResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import TagsService from './tags.service';
import CreateTagDto from './create-tag.dto';
import { Tag } from './schemas/tag.schema';
import {
  CONTROLLER,
  ERROR,
  MESSAGE,
  ROUTE,
  SCHEMA,
} from 'src/utilities/constants';
import JwtAuthGuard from 'src/guards/jwt-auth.guard';

const { TAGS } = CONTROLLER;
const { CREATE, BAD_REQUEST, UNAUTHORIZED } = ERROR;
const { CREATED, FOUND } = MESSAGE;
const { GET, PARAM } = ROUTE.TAGS;
const { TAG } = SCHEMA;

/**
 * @description Tag controller
 * The required decorator links metadata to class
 * by binding requests to the correspondent controller.
 * The param defines the route prefix.
 * CRUD actions are defined by decorators as well
 * @author Luca Cattide
 * @date 17/08/2025
 * @class TagssController
 */
@ApiBearerAuth()
@Controller(TAGS)
class TagsController {
  /**
   * Creates an instance of TagssController.
   * Model DB methods are defined by the
   * module related services and passed via
   * dependency injection
   * @author Luca Cattide
   * @date 17/08/2025
   * @param {TagsService} tagsService
   * @memberof TagsController
   */
  constructor(private readonly tagsService: TagsService) {}

  /**
   * @description Tag creation endpoint
   * @author Luca Cattide
   * @date 17/08/2025
   * @param {CreateTagDto} createTagDto
   * @memberof TagsController
   */
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiBadRequestResponse({ description: BAD_REQUEST })
  @ApiCreatedResponse({ description: `${TAG} ${CREATED}` })
  @ApiInternalServerErrorResponse({ description: `${CREATE} the new tag` })
  @ApiUnauthorizedResponse({ description: UNAUTHORIZED })
  async create(@Body() createTagDto: CreateTagDto) {
    await this.tagsService.create(createTagDto);
  }

  /**
   * @description Tags retrieve endpoint
   * Get decorator defines the route sub-path
   * Param decorator exposes querystring params
   * @author Luca Cattide
   * @date 17/08/2025
   * @param {string[]} ids
   * @returns {*}  {Promise<Tag[] | undefined>}
   * @memberof TagsController
   */
  @UseGuards(JwtAuthGuard)
  @Get(GET)
  @ApiBadRequestResponse({ description: BAD_REQUEST })
    @ApiFoundResponse({ description: `${TAG} ${FOUND}` })
    @ApiInternalServerErrorResponse({ description: `${TAG} ${ERROR.FIND}` })
    @ApiUnauthorizedResponse({ description: UNAUTHORIZED })
  async find(
    @Query(PARAM, ParseArrayPipe) ids: Array<string>,
  ): Promise<Tag[] | undefined> {
    return await this.tagsService.findAll(ids);
  }
}

export default TagsController;
