import { Model, Connection } from 'mongoose';
import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Note } from './schemas/note.schema';
import CreateNoteDto, { UpdateNoteDto } from './create-note.dto';
import { setFilter, setError, setList } from 'src/utilities/utils';
import { ERROR, MESSAGE } from 'src/utilities/constants';

const { BAD_REQUEST, CREATE, DELETE, FIND, UPDATE } = ERROR;

/**
 * @description Note service
 * The required decorator links metadata to class
 * by notifying Nest that it interacts with the expected controller
 * @author Luca Cattide
 * @date 17/08/2025
 * @class NotesService
 */
@Injectable()
class NotesService {
  private readonly logger = new Logger(NotesService.name);

  /**
   * Creates an instance of NotesService.
   * DB connection and Model DB methods
   * are defined respectively by the
   * DB client and module related services
   * both passed via dependency injection
   * @author Luca Cattide
   * @date 17/08/2025
   * @param {Connection} connection
   * @param {Model<Note>} noteModel
   * @memberof NotesService
   */
  constructor(
    @InjectConnection() private readonly connection: Connection,
    @InjectModel(Note.name) private noteModel: Model<Note>,
  ) {}

  /**
   * @description Note creation method
   * @author Luca Cattide
   * @date 17/08/2025
   * @param {CreateNoteDto} createNoteDto
   * @returns {*}  {Promise<Note | undefined>}
   * @memberof NotesService
   */
  async create(createNoteDto: CreateNoteDto): Promise<Note | undefined> {
    if (!createNoteDto) {
      this.logger.error(BAD_REQUEST);
      setError(HttpStatus.BAD_REQUEST, BAD_REQUEST);
    }

    const messageSuffix = `the new note ${createNoteDto.title}`;

    try {
      this.logger.log(`${MESSAGE.CREATE} ${messageSuffix}...`);

      return await new this.noteModel(createNoteDto).save();
    } catch (error) {
      const message = `${CREATE} ${messageSuffix}`;

      this.logger.error(message);
      setError(HttpStatus.INTERNAL_SERVER_ERROR, message, error);
    }
  }

  /**
   * @description Note deletion method
   * @author Luca Cattide
   * @date 18/08/2025
   * @param {string} id
   * @returns {*}  {(Promise<Note | null | undefined>)}
   * @memberof NotesService
   */
  async delete(id: string): Promise<Note | null | undefined> {
    if (!id) {
      this.logger.error(BAD_REQUEST);
      setError(HttpStatus.BAD_REQUEST, BAD_REQUEST);
    }

    const messageSuffix = `the note ${id}`;

    try {
      this.logger.log(`${MESSAGE.DELETE} ${messageSuffix}...`);

      return await this.noteModel.findByIdAndDelete({ id }).exec();
    } catch (error) {
      const message = `${DELETE} ${messageSuffix}`;

      this.logger.error(message);
      setError(HttpStatus.INTERNAL_SERVER_ERROR, message, error);
    }
  }

  /**
   * @description Note retrieve method
   * @author Luca Cattide
   * @date 17/08/2025
   * @param {string} id
   * @returns {*}  {Promise<Note[] | undefined>}
   * @memberof NotesService
   */
  async find(id: string): Promise<Note[] | undefined> {
    if (!id) {
      this.logger.error(BAD_REQUEST);
      setError(HttpStatus.BAD_REQUEST, BAD_REQUEST);
    }

    try {
      this.logger.log(`${MESSAGE.READ} the note ${id}...`);

      return await this.noteModel.find({ id }).exec();
    } catch (error) {
      const message = `Note ${id} ${FIND}`;

      this.logger.error(message);
      setError(HttpStatus.FOUND, message, error);
    }
  }

  /**
   * @description Notes retrieve method
   * @author Luca Cattide
   * @date 17/08/2025
   * @param {Array<string>} ids
   * @returns {*}  {Promise<Note[] | undefined>}
   * @memberof NotesService
   */
  async findAll(ids: Array<string>): Promise<Note[] | undefined> {
    if (!ids) {
      this.logger.error(BAD_REQUEST);
      setError(HttpStatus.BAD_REQUEST, BAD_REQUEST);
    }

    try {
      this.logger.log(`${MESSAGE.READ} notes: ${setList(ids)}...`);

      return await this.noteModel.find(setFilter(ids)).exec();
    } catch (error) {
      const message = `Notes ${FIND}`;

      this.logger.error(message);
      setError(HttpStatus.FOUND, message);
    }
  }

  /**
   * @description Note update method
   * @author Luca Cattide
   * @date 18/08/2025
   * @param {UpdateNoteDto} updateNoteDto
   * @returns {*}  {(Promise<Note | null | undefined>)}
   * @memberof NotesService
   */
  async update(updateNoteDto: UpdateNoteDto): Promise<Note | null | undefined> {
    if (!updateNoteDto) {
      this.logger.error(BAD_REQUEST);
      setError(HttpStatus.BAD_REQUEST, BAD_REQUEST);
    }

    const { id, title } = updateNoteDto;
    const messageSuffix = `the note ${title}`;

    try {
      this.logger.log(`${MESSAGE.UPDATE} ${messageSuffix}...`);

      return await this.noteModel
        .findOneAndUpdate({ id }, updateNoteDto, {
          new: true,
        })
        .exec();
    } catch (error) {
      const message = `${UPDATE} ${messageSuffix}`;

      this.logger.error(message);
      setError(HttpStatus.INTERNAL_SERVER_ERROR, message, error);
    }
  }

  async startTransaction() {
    const session = await this.connection.startSession();

    session.startTransaction();
    // TODO: Your transaction logic here
  }
}

export default NotesService;
