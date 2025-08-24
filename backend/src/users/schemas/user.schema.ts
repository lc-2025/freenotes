import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { Note } from 'src/notes/schemas/note.schema';
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
@Schema()
class User implements IUser {
  _id: Types.ObjectId;

  @ApiProperty()
  @Prop(SCHEMA_OPTIONS)
  acceptance: boolean;

  @ApiProperty()
  @Prop(SCHEMA_OPTIONS)
  email: string;

  @ApiProperty()
  @Prop(SCHEMA_OPTIONS)
  name: string;

  @ApiProperty()
  @Prop({
    default: [],
    ref: SCHEMA.NOTE,
    type: [{ type: mongoose.Schema.Types.ObjectId }],
  })
  notes: Array<Note>;

  @ApiProperty()
  @Prop(SCHEMA_OPTIONS)
  password: string;
}

const UserSchema = SchemaFactory.createForClass(User);

export { User, UserSchema };
export type { UserDocument };
