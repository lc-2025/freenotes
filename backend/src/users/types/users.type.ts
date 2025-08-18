import { Note } from 'src/notes/schemas/note.schema';

interface IUser {
  acceptance: boolean;

  email: string;
  name: string;
  notes: Array<Note>;
  password: string;
}

export type { IUser };
