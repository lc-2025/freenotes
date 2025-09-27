import { Note } from 'src/modules/notes/schemas/note.schema';

interface ITag {
  label: string;
  notes: Array<Note>;
}

export type { ITag };
