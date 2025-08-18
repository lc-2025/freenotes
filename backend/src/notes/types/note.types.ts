import { UUID } from 'mongodb';
import { Tag } from 'src/tags/schemas/tag.schema';
import { User } from 'src/users/schemas/user.schema';
import { UpdateNoteDto } from '../create-note.dto';

interface INote {
  body: string;
  pinned: boolean;
  tags: Array<Tag>;
  title: string;
  user: User;
}

type TNoteDecorator = {
  id: UUID;
} & UpdateNoteDto;

export type { INote, TNoteDecorator };
