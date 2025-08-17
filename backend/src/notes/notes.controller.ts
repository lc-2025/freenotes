import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  ParseArrayPipe,
  ParseUUIDPipe,
} from '@nestjs/common';
import NotesService from './notes.service';
import CreateNoteDto from './create-note.dto';
import { Note } from './schemas/note.schema';
import { CONTROLLER, ROUTE } from 'src/utilities/constants';

const { NOTES } = CONTROLLER;
const { GET, GET_ALL, PARAM, PARAM_ALL } = ROUTE.NOTES;

/**
 * @description Notes controller
 * The required decorator links metadata to class
 * by binding requests to the correspondent controller.
 * The param defines the route prefix.
 * CRUD actions are defined by decorators as well
 * @author Luca Cattide
 * @date 17/08/2025
 * @class NotesController
 */
@Controller(NOTES)
class NotesController {
  /**
   * Creates an instance of NotesController.
   * Model DB methods are defined by the
   * module related services and passed via
   * dependency injection
   * @author Luca Cattide
   * @date 17/08/2025
   * @param {NotesService} notesService
   * @memberof NotesController
   */
  constructor(private readonly notesService: NotesService) {}

  /**
   * @description Notes retrieve method
   * @author Luca Cattide
   * @date 17/08/2025
   * @param {Array<string>} ids
   * @returns {*}  {Promise<Note[]>}
   * @memberof NotesController
   */
  @Get(GET_ALL)
  async findAll(
    @Param(PARAM_ALL, ParseArrayPipe) ids: Array<string>,
  ): Promise<Note[] | undefined> {
    return await this.notesService.findAll(ids);
  }

  /**
   * @description Note creation method
   * @author Luca Cattide
   * @date 17/08/2025
   * @param {CreateNoteDto} createNoteDto
   * @memberof NotesController
   */
  @Post()
  async create(@Body() createNoteDto: CreateNoteDto) {
    await this.notesService.create(createNoteDto);
  }

  /**
   * @description Note retrieve method
   * @author Luca Cattide
   * @date 17/08/2025
   * @param {string} id
   * @returns {*}  {Promise<Note[] | undefined>}
   * @memberof NotesController
   */
  @Get(GET)
  async find(
    @Param(PARAM, new ParseUUIDPipe()) id: string,
  ): Promise<Note[] | undefined> {
    return await this.notesService.find(id);
  }
}

export default NotesController;
