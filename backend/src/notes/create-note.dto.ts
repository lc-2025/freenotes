import { ApiProperty } from '@nestjs/swagger';
import { OmitType } from '@nestjs/mapped-types';
import { IsString, IsBoolean } from 'class-validator';
import { UUID } from 'mongodb';
import { Tag } from 'src/tags/schemas/tag.schema';
import { User } from 'src/users/schemas/user.schema';
import { INote } from './types/note.types';

/**
 * @description Note Data Transfer Object class
 * Defines the note request payload on creation
 * @author Luca Cattide
 * @date 17/08/2025
 * @class CreateNoteDto
 * @implements {INote}
 */
class CreateNoteDto implements INote {
  @ApiProperty()
  @IsString()
  body: string;

  @ApiProperty()
  @IsBoolean()
  pinned: boolean;

  @ApiProperty()
  tags: Array<Tag>;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  user: User;
}

/**
 * @description Defines the note request payload on update
 * @author Luca Cattide
 * @date 18/08/2025
 * @class UpdateNoteDto
 * @extends {OmitType(CreateNoteDto, ['user'])}
 */
class UpdateNoteDto extends OmitType(CreateNoteDto, ['user']) {
  id: UUID;
}

export { UpdateNoteDto };
export default CreateNoteDto;
