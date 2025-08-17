import { Note } from 'src/notes/schemas/note.schema';

interface IUser {
  name: string;
  email: string;
  password: string;
  acceptance: boolean;
  notes: Array<Note>;
}

export type { IUser };
