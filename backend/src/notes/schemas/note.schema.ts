import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from '../../users/schemas/user.schema';
import { Tag } from '../../tags/schemas/tag.schema';
import { SCHEMA_OPTIONS } from 'src/utilities/constants';

type NoteDocument = HydratedDocument<Note>;

/**
 * @description Note schema
 * @author Luca Cattide
 * @date 17/08/2025
 * @class Note
 */
@Schema()
class Note {
  @Prop(SCHEMA_OPTIONS)
  title: string;

  @Prop(SCHEMA_OPTIONS)
  body: string;

  @Prop()
  pinned: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' })
  tags: Array<Tag>;

  @Prop({
    ...SCHEMA_OPTIONS,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  user: User;
}

const NoteSchema = SchemaFactory.createForClass(Note);

export { Note, NoteSchema };
export type { NoteDocument };
