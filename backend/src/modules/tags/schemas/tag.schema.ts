import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import mongoose, { HydratedDocument } from 'mongoose';
import { Note } from 'src/modules/notes/schemas/note.schema';
import { SCHEMA, SCHEMA_OPTIONS } from 'src/utilities/constants';
import { ITag } from '../types/tag.types';

type TagDocument = HydratedDocument<Tag>;

/**
 * @description Tag schema
 * @author Luca Cattide
 * @date 25/08/2025
 * @class Tag
 * @implements {ITag}
 */
@ApiSchema()
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
