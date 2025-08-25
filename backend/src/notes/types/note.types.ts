import { UUID } from 'mongodb';
import { Tag } from 'src/tags/schemas/tag.schema';
import { UpdateNoteDto } from '../create-note.dto';

interface INote {
  body: string;
  pinned: boolean;
  tags?: Array<Tag>;
  title: string;
  userId: UUID;
}

type TNoteDecorator = {
  id: UUID;
} & UpdateNoteDto;

export type { INote, TNoteDecorator };
