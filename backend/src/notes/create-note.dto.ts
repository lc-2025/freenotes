import { Tag } from 'src/tags/schemas/tag.schema';
import { User } from 'src/users/schemas/user.schema';
import { INote } from './types/note.types';

class CreateNoteDto implements INote {
  title: string;
  body: string;
  pinned: boolean;
  tags: Array<Tag>;
  user: User;
}

export default CreateNoteDto;
