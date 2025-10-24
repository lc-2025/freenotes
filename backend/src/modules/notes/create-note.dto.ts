import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { OmitType } from '@nestjs/mapped-types';
import { Types } from 'mongoose';
import { IsString, IsBoolean, IsArray, IsOptional } from 'class-validator';
import { User } from 'src/modules/users/schemas/user.schema';
import { Tag } from 'src/modules/tags/schemas/tag.schema';
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

  @ApiPropertyOptional()
  @IsArray()
  @IsOptional()
  tags?: Array<Tag>;

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
  id: Types.ObjectId;
}

export { UpdateNoteDto };
export default CreateNoteDto;
