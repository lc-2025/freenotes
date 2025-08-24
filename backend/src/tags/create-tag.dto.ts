import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { ITag } from './types/tag.types';
import { Note } from 'src/notes/schemas/note.schema';

/**
 * @description Tag Data Transfer Object class
 * Defines the tag request payload
 * @author Luca Cattide
 * @date 17/08/2025
 * @class CreateTagDto
 * @implements {ITag}
 */
class CreateTagDto implements ITag {
  @ApiProperty()
  @IsString()
  label: string;

  @ApiProperty()
  notes: Array<Note>;
}

export default CreateTagDto;
