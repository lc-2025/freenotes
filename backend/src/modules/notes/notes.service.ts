import mongoose, { Model, Connection, ClientSession } from 'mongoose';
import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Note } from './schemas/note.schema';
import CreateNoteDto, { UpdateNoteDto } from './create-note.dto';
import { setFilter, setError, setList } from 'src/utilities/utils';
import { ERROR, MESSAGE } from 'src/utilities/constants';
import UsersService from '../users/users.service';

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
    private readonly usersService: UsersService,
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
    const session = await this.startTransaction();

    try {
      this.logger.log(`${MESSAGE.CREATE} ${messageSuffix}...`);

      const user = await this.usersService.search(createNoteDto.user.email);
      const note = await new this.noteModel({
        ...createNoteDto,
        id: new mongoose.Types.ObjectId(),
        user: user?.id,
      }).save({ session });

      await session.commitTransaction();

      return note;
    } catch (error) {
      const message = `${CREATE} ${messageSuffix}`;

      await session.abortTransaction();

      this.logger.error(message);
      setError(HttpStatus.INTERNAL_SERVER_ERROR, message, error);
    } finally {
      session.endSession();
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
    const session = await this.startTransaction();

    try {
      this.logger.log(`${MESSAGE.DELETE} ${messageSuffix}...`);

      const note = await this.noteModel
        .findByIdAndDelete({ id })
        .session(session)
        .exec();

      await session.commitTransaction();

      return note;
    } catch (error) {
      const message = `${DELETE} ${messageSuffix}`;

      await session.abortTransaction();

      this.logger.error(message);
      setError(HttpStatus.INTERNAL_SERVER_ERROR, message, error);
    } finally {
      session.endSession();
    }
  }

  /**
   * @description Note retrieve method
   * @author Luca Cattide
   * @date 17/08/2025
   * @param {string} id
   * @returns {*}  {Promise<Note | null | undefined>}
   * @memberof NotesService
   */
  async find(id: string): Promise<Note | null | undefined> {
    if (!id) {
      this.logger.error(BAD_REQUEST);
      setError(HttpStatus.BAD_REQUEST, BAD_REQUEST);
    }

    const session = await this.startTransaction();

    try {
      this.logger.log(`${MESSAGE.READ} the note ${id}...`);

      const note = await this.noteModel.findOne({ id }).session(session).exec();

      await session.commitTransaction();

      return note;
    } catch (error) {
      const message = `Note ${id} ${FIND}`;

      await session.abortTransaction();

      this.logger.error(message);
      setError(HttpStatus.FOUND, message, error);
    } finally {
      session.endSession();
    }
  }

  /**
   * @description Notes retrieve method
   * @author Luca Cattide
   * @date 17/08/2025
   * @param {string} ids
   * @returns {*}  {Promise<Note[] | undefined>}
   * @memberof NotesService
   */
  async findAll(ids: string): Promise<Note[] | undefined> {
    if (!ids) {
      this.logger.error(BAD_REQUEST);
      setError(HttpStatus.BAD_REQUEST, BAD_REQUEST);
    }

    const session = await this.startTransaction();

    try {
      const noteIds = ids.split(',');

      this.logger.log(`${MESSAGE.READ} notes: ${setList(noteIds)}...`);

      const note = await this.noteModel
        .find(setFilter(noteIds))
        .session(session)
        .exec();

      await session.commitTransaction();

      return note;
    } catch (error) {
      const message = `Notes ${FIND}`;

      await session.abortTransaction();

      this.logger.error(message);
      setError(HttpStatus.FOUND, message);
    } finally {
      session.endSession();
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
    const session = await this.startTransaction();

    try {
      this.logger.log(`${MESSAGE.UPDATE} ${messageSuffix}...`);

      const note = await this.noteModel
        .findOneAndUpdate({ id }, updateNoteDto, {
          new: true,
        })
        .session(session)
        .exec();

      await session.commitTransaction();

      return note;
    } catch (error) {
      const message = `${UPDATE} ${messageSuffix}`;

      await session.abortTransaction();

      this.logger.error(message);
      setError(HttpStatus.INTERNAL_SERVER_ERROR, message, error);
    } finally {
      session.endSession();
    }
  }

  /**
   * @description Query transaction starting method
   * @author Luca Cattide
   * @date 28/10/2025
   * @returns {*}  {Promise<ClientSession>}
   * @memberof NotesService
   */
  async startTransaction(): Promise<ClientSession> {
    const session = await this.connection.startSession();

    session.startTransaction();

    return session;
  }
}

export default NotesService;
