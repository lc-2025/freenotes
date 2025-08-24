import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  ParseArrayPipe,
} from '@nestjs/common';
import TagsService from './tags.service';
import CreateTagDto from './create-tag.dto';
import { Tag } from './schemas/tag.schema';
import { CONTROLLER, ROUTE } from 'src/utilities/constants';

const { TAGS } = CONTROLLER;
const { GET, PARAM } = ROUTE.TAGS;

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
  @Post()
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
  @Get(GET)
  async find(
    @Param(PARAM, ParseArrayPipe) ids: Array<string>,
  ): Promise<Tag[] | undefined> {
    return await this.tagsService.findAll(ids);
  }
}

export default TagsController;
