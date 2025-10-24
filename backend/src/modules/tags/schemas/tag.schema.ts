import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { Note } from 'src/modules/notes/schemas/note.schema';
import { SCHEMA, SCHEMA_OPTIONS } from 'src/utilities/constants';
import { ITag } from '../types/tag.types';
import { IsArray, IsString } from 'class-validator';

type TagDocument = HydratedDocument<Tag>;

/**
 * @description Tag schema
 * @author Luca Cattide
 * @date 25/08/2025
 * @class Tag
 * @implements {ITag}
 */
@ApiSchema()
@Schema({ autoIndex: false })
class Tag implements ITag {
  @ApiProperty()
  @Prop({ ...SCHEMA_OPTIONS, unique: true, index: true })
  id: Types.ObjectId;

  @ApiProperty()
  @IsString()
  @Prop({ ...SCHEMA_OPTIONS, unique: true })
  label: string;

  @ApiProperty()
  @IsArray()
  @Prop({
    ref: SCHEMA.NOTE,
    type: [{ type: mongoose.Schema.Types.ObjectId }],
  })
  notes: Array<Note>;
}

const TagSchema = SchemaFactory.createForClass(Tag);

export { Tag, TagSchema };
export type { TagDocument };
