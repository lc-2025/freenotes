import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty, ApiPropertyOptional, ApiSchema } from '@nestjs/swagger';
import mongoose, { HydratedDocument } from 'mongoose';
import { IsOptional } from 'class-validator';
import { User } from 'src/modules/users/schemas/user.schema';
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
@ApiSchema()
@Schema({ timestamps: true })
class Note implements INote {
  @ApiProperty()
  @Prop(SCHEMA_OPTIONS)
  body: string;

  @ApiProperty()
  @Prop({
    default: false,
  })
  pinned: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @Prop({ default: [], ref: 'Tag', type: mongoose.Schema.Types.ObjectId })
  tags?: Array<Tag>;

  @ApiProperty()
  @Prop({ ...SCHEMA_OPTIONS, unique: true })
  title: string;

  @ApiProperty()
  @Prop({
    ...SCHEMA_OPTIONS,
    default: [],
    ref: SCHEMA.USER,
    type: mongoose.Schema.Types.ObjectId,
  })
  user: User;
}

// TODO: Indexing
const NoteSchema = SchemaFactory.createForClass(Note);

export { Note, NoteSchema };
export type { NoteDocument };
