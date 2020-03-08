import { ExString } from "./exString";

/**
 * Extension class for Array type.
 */
export class ExArray {

    /**
     * Indicates whether the specified Array<any> is null or empty.
     * @param {Array<T>} values - The Array to test.
     * @returns {boolean} true if the values parameter is null or empty; otherwise, false.
     */
    public static isNullOrEmpty<T>(values: Array<T>): boolean {
        return values == undefined || values == null || values.length <= 0;
    }

    /**
     * Indicates whether the specified Array<any> is null or empty.
     * @param {Array<T>} values - The Array to test.
     * @returns {boolean} true if the values parameter is not null or empty; otherwise, false.
     */
    public static isNotNullOrEmpty<T>(values: Array<T>): boolean {
        return !this.isNullOrEmpty(values);
    }

    /**
     * Clear the values.
     * @param {Array<T>} values 
     */
    public static clear<T>(values: Array<T>): void {
        values = new Array<T>();
    }

    /**
     * Gets array length.
     * @param {Array<T>} values 
     * @returns 0 if the values parameter is undefined or null or empty; otherwise, array length.
     */
    public static safeLength<T>(values: Array<T>): number {
        if (this.isNullOrEmpty(values)) {
            return 0;
        }

        return values.length;
    }

    /**
     * Gets the random value in Array<T> values.
     * @param {Array<T>} values 
     * @param {<T>} defaultValue default value of type T.
     * @returns default value if values parameter is null or empty; otherwise, random value.
     */
    public static getRandom<T>(values: Array<T>, defaultValue: T): T {
        if (this.isNullOrEmpty(values)) {
            return defaultValue;
        }

        return values[Math.floor(Math.random() * values.length)];
    }

    /**
     * Shuffle this values.
     * @param {Array<T>} values 
     */
    public static shuffle<T>(values: Array<T>): void {
        if (this.isNullOrEmpty(values)) {
            return;
        }

        for (let index = 0; index < values.length; index++) {
            let temp = values[index];
            let randomIndex = Math.floor(Math.random() * values.length);
            values[index] = values[randomIndex];
            values[randomIndex] = temp;
        }
    }

    /**
     * Converts multiple array to map array.
     * [[id, name], [1, "a"]] → [{id=1, name="a"}]
     * @param {any[]} headers map keys.
     * @param {any[][]} values map values.
     * @returns {Array<any>} any type Array.
     */
    public static convertMultipleToMapArray(headers: any[], values: any[][]): Array<any> {

        if (headers.length != values[0].length) {
            throw new Error(`headers length is not equal values length. header length = ${headers.length}, values length = ${values[0].length}`)
        }

        let result: any[] = [];

        values.forEach((rowValues) => {
            let map: any = {};
            rowValues.forEach((rowData, rowIndex) => {
                let header = headers[rowIndex];
                if (ExString.isNotNullOrEmpty(header)) {
                    if (ExString.isNullOrEmpty(rowData)) {
                        rowData = "";
                    }
                    map[header] = rowData;
                }
            });
            result.push(map);
        });

        return result;
    }
}