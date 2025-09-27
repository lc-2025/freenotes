import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty, ApiPropertyOptional, ApiSchema } from '@nestjs/swagger';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { IsOptional } from 'class-validator';
import { Note } from 'src/modules/notes/schemas/note.schema';
import { SCHEMA, SCHEMA_OPTIONS } from 'src/utilities/constants';
import { IUser } from '../types/users.type';

type UserDocument = HydratedDocument<User>;

/**
 * @description User schema
 * @author Luca Cattide
 * @date 17/08/2025
 * @class User
 * @implements {IUser}
 */
@ApiSchema()
@Schema()
class User implements IUser {
  _id: Types.ObjectId;

  @ApiProperty()
  @Prop({ ...SCHEMA_OPTIONS, enum: ['true', 'false'] })
  // Declared as string since boolean casting is bugged
  acceptance: string;

  @ApiProperty()
  @Prop(SCHEMA_OPTIONS)
  email: string;

  @ApiProperty()
  @Prop(SCHEMA_OPTIONS)
  name: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Prop({
    default: [],
    ref: SCHEMA.NOTE,
    type: [{ type: mongoose.Schema.Types.ObjectId }],
  })
  notes?: Array<Note>;

  @ApiProperty()
  @Prop(SCHEMA_OPTIONS)
  password: string;

  @ApiProperty()
  @IsOptional()
  refreshToken?: string;
}

const UserSchema = SchemaFactory.createForClass(User);

export { User, UserSchema };
export type { UserDocument };
