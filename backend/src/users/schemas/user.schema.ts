import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Note } from 'src/notes/schemas/note.schema';
import { SCHEMA_OPTIONS } from 'src/utilities/constants';
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
  @Prop(SCHEMA_OPTIONS)
  name: string;

  @Prop(SCHEMA_OPTIONS)
  email: string;

  @Prop(SCHEMA_OPTIONS)
  password: string;

  @Prop(SCHEMA_OPTIONS)
  acceptance: boolean;

  @Prop()
  notes: Array<Note>;
}

const UserSchema = SchemaFactory.createForClass(User);

export { User, UserSchema };
export type { UserDocument };
