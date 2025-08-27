import { Note } from 'src/notes/schemas/note.schema';

interface ITag {
  label: string;
  notes: Array<Note>;
}

export type { ITag };
