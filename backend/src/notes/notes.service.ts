import { Model, Connection } from 'mongoose';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Note } from './schemas/note.schema';
import CreateNoteDto from './create-note.dto';
import { setFilter, setError } from 'src/utilities/utils';
import { ERROR } from 'src/utilities/constants';

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

  async startTransaction() {
    const session = await this.connection.startSession();

    session.startTransaction();
    // TODO: Your transaction logic here
  }

  /**
   * @description Note creation method
   * @author Luca Cattide
   * @date 17/08/2025
   * @param {CreateNoteDto} createNoteDto
   * @returns {*}  {Promise<Note | undefined>}
   * @memberof NotesService
   */
  async create(createNoteDto: CreateNoteDto): Promise<Note | undefined> {
    try {
      return await new this.noteModel(createNoteDto).save();
    } catch (error) {
      setError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        `${ERROR.CREATE} the new note ${createNoteDto.title}`,
        error,
      );
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
      setError(HttpStatus.BAD_REQUEST, ERROR.BAD_REQUEST);
    }

    try {
      return await this.noteModel.find({ id }).exec();
    } catch (error) {
      setError(HttpStatus.FOUND, `Note ${id} ${ERROR.FIND}`, error);
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
      setError(HttpStatus.BAD_REQUEST, ERROR.BAD_REQUEST);
    }

    try {
      return await this.noteModel.find(setFilter(ids)).exec();
    } catch (error) {
      setError(HttpStatus.FOUND, `Notes ${ERROR.FIND}`);
    }
  }
}

export default NotesService;
