import { UUID } from 'mongodb';

interface ITag {
  label: string;
  noteIds: Array<UUID>;
}

export type { ITag };
