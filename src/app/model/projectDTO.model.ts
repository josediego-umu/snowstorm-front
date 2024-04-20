import { User } from './user.model';

export class ProjectDTO {
  id: string;
  name: string;
  description: string;
  visibility: string;
  owner: User | null;
  readers: User[];
  writers: User[];

  constructor(
    id: string = '',
    name: string = '',
    description: string = '',
    visibility: string = 'private',
    owner: User | null = null,
    readers: User[] = [],
    writers: User[] = []
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.visibility = visibility;
    this.owner = owner;
    this.readers = readers;
    this.writers = writers;
  }
}
