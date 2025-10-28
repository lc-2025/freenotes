import { Note } from 'src/modules/notes/schemas/note.schema';

interface IUser {
  acceptance: string;
  email: string;
  name: string;
  notes?: Array<Note>;
  password: string;
}

export type { IUser };
