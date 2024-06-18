export class StructuredData {
  id: string;
  rows: string[][];
  columnsToValues: Map<string,Set<string>>;
  labels: any;
  

  constructor() {
    this.id = '';
    this.rows = [];
    this.labels = new Map<string, string>();
    this.columnsToValues = new Map<string, Set<string>>();

  }
}
