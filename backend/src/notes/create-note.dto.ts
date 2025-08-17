import { IsString, IsBoolean } from 'class-validator';
import { Tag } from 'src/tags/schemas/tag.schema';
import { User } from 'src/users/schemas/user.schema';
import { INote } from './types/note.types';

/**
 * @description Note Data Transfer Object class
 * Defines the note request payload
 * @author Luca Cattide
 * @date 17/08/2025
 * @class CreateNoteDto
 * @implements {INote}
 */
class CreateNoteDto implements INote {
  @IsString()
  title: string;
  @IsString()
  body: string;
  @IsBoolean()
  pinned: boolean;
  tags: Array<Tag>;
  user: User;
}

export default CreateNoteDto;
