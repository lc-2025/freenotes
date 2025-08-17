import { Model, Connection } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Note } from './schemas/note.schema';
import CreateNoteDto from './create-note.dto';
import { setFilter } from 'src/utilities/utils';

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
   * @returns {*}  {Promise<Note>}
   * @memberof NotesService
   */
  async create(createNoteDto: CreateNoteDto): Promise<Note> {
    return new this.noteModel(createNoteDto).save();
  }

  /**
   * @description Note retrieve method
   * @author Luca Cattide
   * @date 17/08/2025
   * @param {string} id
   * @returns {*}  {Promise<Note[]>}
   * @memberof NotesService
   */
  async find(id: string): Promise<Note[]> {
    return this.noteModel.find({ id }).exec();
  }

  /**
   * @description Notes retrieve method
   * @author Luca Cattide
   * @date 17/08/2025
   * @param {Array<string>} ids
   * @returns {*}  {Promise<Note[]>}
   * @memberof NotesService
   */
  async findAll(ids: Array<string>): Promise<Note[]> {
    return this.noteModel.find(setFilter(ids)).exec();
  }
}

export default NotesService;
