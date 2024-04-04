import { Row } from './row.model';

export class StructuredData {
  id: string;
  rows: Row[];

  constructor(id: string = '', rows: Row[] = []) {
    this.id = id;
    this.rows = rows;
  }
}
