import { Model, Connection } from 'mongoose';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Tag } from './schemas/tag.schema';
import CreateTagDto from './create-tag.dto';
import { setError, setFilter } from 'src/utilities/utils';
import { ERROR } from 'src/utilities/constants';

/**
 * @description Tgs service
 * The required decorator links metadata to class
 * by notifying Nest that it interacts with the expected controller
 * @author Luca Cattide
 * @date 17/08/2025
 * @class TagsService
 */
@Injectable()
class TagsService {
  /**
   * Creates an instance of TagsService.
   * DB connection and Model DB methods
   * are defined respectively by the
   * DB client and module related services
   * both passed via dependency injection
   * @author Luca Cattide
   * @date 17/08/2025
   * @param {Connection} connection
   * @param {Model<Tag>} tagModel
   * @memberof TagsService
   */
  constructor(
    @InjectConnection() private readonly connection: Connection,
    @InjectModel(Tag.name) private tagModel: Model<Tag>,
  ) {}

  async startTransaction() {
    const session = await this.connection.startSession();

    session.startTransaction();
    // TODO: Your transaction logic here
  }

  /**
   * @description Tag creation method
   * @author Luca Cattide
   * @date 17/08/2025
   * @param {CreateTagDto} createTagDto
   * @returns {*}  {Promise<Tag>}
   * @memberof TagsService
   */
  async create(createTagDto: CreateTagDto): Promise<Tag | undefined> {
    try {
      return new this.tagModel(createTagDto).save();
    } catch (error) {
      setError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        `${ERROR.CREATE} the new tag ${createTagDto.label}`,
      );
    }
  }

  /**
   * @description Tags retrieve method
   * @author Luca Cattide
   * @date 17/08/2025
   * @param {string[]} ids
   * @returns {*}  {Promise<Tag[] | undefined>}
   * @memberof TagsService
   */
  async findAll(ids: Array<string>): Promise<Tag[] | undefined> {
    if (!ids) {
      setError(HttpStatus.BAD_REQUEST, ERROR.BAD_REQUEST);
    }

    try {
      return this.tagModel.find(setFilter(ids)).exec();
    } catch (error) {
      setError(HttpStatus.FOUND, `Tags ${ERROR.FIND}`);
    }
  }
}

export default TagsService;
