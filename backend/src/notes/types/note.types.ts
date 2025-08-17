import { Tag } from 'src/tags/schemas/tag.schema';
import { User } from 'src/users/schemas/user.schema';

interface INote {
  title: string;
  body: string;
  pinned: boolean;
  tags: Array<Tag>;
  user: User;
}

export type { INote };
