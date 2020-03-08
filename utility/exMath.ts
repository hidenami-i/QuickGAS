import { ExArray } from "./exArray";

/**
 * Math extension class.
 */
export class ExMath {

    /**
     * Transpose row values and column values.
     * @param {any[][]} values [[1,2,3],["a","b","c"]]
     * @returns {any[][]}
     * @example [[1,2,3],["a","b","c"]] → [[1,"a"],[2,"b"],[3,"c"]]
     */
    public static Transpose(values: any[][]): any[][] {

        if (ExArray.isNullOrEmpty(values)) {
            return [];
        }

        let numberOfRows: number = values.length;
        let numberOfColumns: number = values[0].length;

        let result: any[][] = new Array(numberOfColumns);

        for (let rowIndex = 0; rowIndex < numberOfColumns; rowIndex++) {
            for (let columnIndex = 0; columnIndex < numberOfRows; columnIndex++) {
                if (result[rowIndex] == undefined) {
                    result[rowIndex] = new Array(numberOfRows);
                }
                result[rowIndex][columnIndex] = values[columnIndex][rowIndex];
            }
        }
        return result;
    }
}