import { UUID } from 'mongodb';

interface IUser {
  acceptance: boolean;

  email: string;
  name: string;
  noteIds?: Array<UUID>;
  password: string;
}

export type { IUser };
