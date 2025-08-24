import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { HydratedDocument } from 'mongoose';
import { Note } from '../../notes/schemas/note.schema';
import { SCHEMA, SCHEMA_OPTIONS } from 'src/utilities/constants';
import { ITag } from '../types/tag.types';

type TagDocument = HydratedDocument<Tag>;

@Schema()
class Tag implements ITag {
  @ApiProperty()
  @Prop({ ...SCHEMA_OPTIONS, unique: true })
  label: string;

  @ApiProperty()
  @Prop({
    default: [],
    ref: SCHEMA.NOTE,
    type: [{ type: mongoose.Schema.Types.ObjectId }],
  })
  notes: Array<Note>;
}

const TagSchema = SchemaFactory.createForClass(Tag);

export { Tag, TagSchema };
export type { TagDocument };
