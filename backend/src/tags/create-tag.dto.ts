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
  label: string;
  notes: Array<Note>;
}

export default CreateTagDto;
