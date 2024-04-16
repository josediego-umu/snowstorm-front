export class ProjectDTO {
  id: string;
  name: string;
  description: string;
  visibility: string;

  constructor(
    id: string = '',
    name: string = '',
    description: string = '',
    visibility: string = 'private'
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.visibility = visibility;
  }

}
