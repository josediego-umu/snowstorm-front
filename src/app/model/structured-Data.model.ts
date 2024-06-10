export class StructuredData {
  id: string;
  rows: string[][];
  labels: Map<string, string>;

  constructor() {
    this.id = '';
    this.rows = [];
    this.labels = new Map<string, string>();

  }
}
