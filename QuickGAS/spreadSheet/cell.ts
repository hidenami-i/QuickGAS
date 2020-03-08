export class Cell {

    value: any;
    row: number;
    column: number;

    constructor(value: any, row: number, column: number) {
        this.value = value;
        this.row = row;
        this.column = column;
    }
}