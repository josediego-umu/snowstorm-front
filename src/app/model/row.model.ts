export class Row {
    valuesRow: string[];
    labeledRow: string[];
  
    constructor(valuesRow: string[] = [], labeledRow: string[] = []) {
        this.valuesRow = valuesRow;
        this.labeledRow = labeledRow;
    }
}