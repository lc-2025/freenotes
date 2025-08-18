import { IsBoolean, IsString } from 'class-validator';
import { Exclude } from 'class-transformer';
import { IUser } from './types/users.type';
import { Note } from 'src/notes/schemas/note.schema';

/**
 * @description User Data Transfer Object class
 * Defines the user request payload
 * @author Luca Cattide
 * @date 17/08/2025
 * @class CreateUserDto
 * @implements {IUser}
 */
class CreateUserDto implements IUser {
  @Exclude()
  @IsBoolean()
  acceptance: boolean;

  @IsString()
  email: string;

  @IsString()
  name: string;

  @Exclude()
  @IsString()
  password: string;

  notes: Array<Note>;
}

export default CreateUserDto;
