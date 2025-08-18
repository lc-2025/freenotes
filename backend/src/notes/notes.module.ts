import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Note, NoteSchema } from './schemas/note.schema';
import NotesService from './notes.service';
import NotesController from './notes.controller';

/**
 * @description Notes feature module
 * The Module works as a wrapper
 * which encapsulates everithing needed by
 * the abstraction in order to work
 * i.e. Dependencies, Models, services, controllers, etc.
 * @author Luca Cattide
 * @date 17/08/2025
 * @class NotesModule
 */
@Module({
  controllers: [NotesController],
  imports: [
    MongooseModule.forFeature([
      {
        name: Note.name,
        schema: NoteSchema,
      },
    ]),
  ],
  providers: [NotesService],
})
class NotesModule {}

export default NotesModule;
