import { StructuredData } from './structured-Data.model';

export class Project {
  id: string;
  name: string;
  description: string;
  structuredData: StructuredData;
  visibility: string;

  constructor(
    id: string = '',
    name: string = '',
    description: string = '',
    structuredData: StructuredData = new StructuredData(),
    visibility: string = 'private'
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.structuredData = structuredData;
    this.visibility = visibility;
  }
}
