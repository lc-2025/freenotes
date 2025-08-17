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
  name: string;
  email: string;
  password: string;
  acceptance: boolean;
  notes: Array<Note>;
}

export default CreateUserDto;
