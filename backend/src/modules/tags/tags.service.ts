import mongoose, { Model, Connection, ClientSession } from 'mongoose';
import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Tag } from './schemas/tag.schema';
import CreateTagDto from './create-tag.dto';
import { setError, setFilter, setList } from 'src/utilities/utils';
import { ERROR, MESSAGE } from 'src/utilities/constants';

const { BAD_REQUEST, FIND } = ERROR;

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
  private readonly logger = new Logger(TagsService.name);

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

  /**
   * @description Tag creation method
   * @author Luca Cattide
   * @date 17/08/2025
   * @param {CreateTagDto} createTagDto
   * @returns {*}  {Promise<Tag>}
   * @memberof TagsService
   */
  async create(createTagDto: CreateTagDto): Promise<Tag | undefined> {
    if (!createTagDto) {
      this.logger.error(BAD_REQUEST);
      setError(HttpStatus.BAD_REQUEST, BAD_REQUEST);
    }

    const { label } = createTagDto;
    const messageSuffix = `the new tag ${label}`;
    const session = await this.startTransaction();

    try {
      this.logger.log(`${MESSAGE.CREATE} ${messageSuffix}...`);

      const tag = await new this.tagModel({
        ...createTagDto,
        id: new mongoose.Types.ObjectId(),
      }).save({ session });

      await session.commitTransaction();

      return tag;
    } catch (error) {
      const message = `${ERROR.CREATE} ${messageSuffix}`;

      await session.abortTransaction();

      this.logger.error(message);
      setError(HttpStatus.INTERNAL_SERVER_ERROR, message);
    } finally {
      session.endSession();
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
      this.logger.error(BAD_REQUEST);
      setError(HttpStatus.BAD_REQUEST, BAD_REQUEST);
    }

    const session = await this.startTransaction();

    try {
      this.logger.log(`${MESSAGE.READ} tags: ${setList(ids)}...`);

      const tag = await this.tagModel
        .find(setFilter(ids))
        .session(session)
        .exec();

      await session.commitTransaction();

      return tag;
    } catch (error) {
      const message = `Tags ${FIND}`;

      await session.abortTransaction();

      this.logger.error(message);
      setError(HttpStatus.FOUND, message);
    } finally {
      session.endSession();
    }
  }

  /**
   * @description Query transaction starting method
   * @author Luca Cattide
   * @date 28/10/2025
   * @returns {*}  {Promise<ClientSession>}
   * @memberof TagsService
   */
  async startTransaction(): Promise<ClientSession> {
    const session = await this.connection.startSession();

    session.startTransaction();

    return session;
  }
}

export default TagsService;
