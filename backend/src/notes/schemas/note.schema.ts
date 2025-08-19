import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from '../../users/schemas/user.schema';
import { Tag } from '../../tags/schemas/tag.schema';
import { SCHEMA, SCHEMA_OPTIONS } from 'src/utilities/constants';
import { INote } from '../types/note.types';

type NoteDocument = HydratedDocument<Note>;

/**
 * @description Note schema
 * @author Luca Cattide
 * @date 17/08/2025
 * @class Note
 */
@Schema({ timestamps: true })
class Note implements INote {
  @Prop(SCHEMA_OPTIONS)
  body: string;

  @Prop({
    default: false,
  })
  pinned: boolean;

  @Prop({ default: [], ref: 'Tag', type: mongoose.Schema.Types.ObjectId })
  tags: Array<Tag>;

  @Prop({ ...SCHEMA_OPTIONS, unique: true })
  title: string;

  @Prop({
    ...SCHEMA_OPTIONS,
    default: [],
    ref: SCHEMA.USER,
    type: mongoose.Schema.Types.ObjectId,
  })
  user: User;
}

const NoteSchema = SchemaFactory.createForClass(Note);

export { Note, NoteSchema };
export type { NoteDocument };
