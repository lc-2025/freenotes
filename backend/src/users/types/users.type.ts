import { UUID } from 'mongodb';

interface IUser {
  acceptance: string;
  email: string;
  name: string;
  noteIds?: Array<UUID>;
  password: string;
}

export type { IUser };
