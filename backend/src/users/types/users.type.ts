import { Note } from 'src/notes/schemas/note.schema';

interface IUser {
  acceptance: string;
  email: string;
  name: string;
  notes?: Array<Note>;
  password: string;
  refreshToken?: string;
}

export type { IUser };
