import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Note } from '../../notes/schemas/note.schema';
import { SCHEMA_OPTIONS } from 'src/utilities/constants';

type TagDocument = HydratedDocument<Tag>;

@Schema()
class Tag {
  @Prop({ SCHEMA_OPTIONS })
  label: string;
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Note' }] })
  notes: Array<Note>;
}

const TagSchema = SchemaFactory.createForClass(Tag);

export { Tag, TagSchema };
export type { TagDocument };
