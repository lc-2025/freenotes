import { Model, Connection } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Note } from './schemas/note.schema';

@Injectable()
export class NotesService {
  constructor(
    @InjectConnection() private readonly connection: Connection,
    @InjectModel(Note.name) private noteModel: Model<Note>,
  ) {}

  async startTransaction() {
    const session = await this.connection.startSession();

    session.startTransaction();
    // TODO: Your transaction logic here
  }

  async create(): Promise<Note> {
    return new this.noteModel().save();
  }

  async findAll(): Promise<Note[]> {
    return this.noteModel.find().exec();
  }
}
