import { StructuredData } from './structured-Data.model';
import { User } from './user.model';

export class Project {
  id: string;
  name: string;
  description: string;
  structuredData: StructuredData;
  visibility: string;
  owner: User | null;
  readers: User[];
  writers: User[];

  constructor(
    id: string = '',
    name: string = '',
    description: string = '',
    structuredData: StructuredData = new StructuredData(),
    visibility: string = 'private',
    owner: User | null = null,
    readers: User[] = [],
    writers: User[] = []
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.structuredData = structuredData;
    this.visibility = visibility;
    this.owner = owner;
    this.readers = readers;
    this.writers = writers;
  }

}
