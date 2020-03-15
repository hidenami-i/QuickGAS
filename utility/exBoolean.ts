/**
 * Boolean extension class.
 */
export class ExBoolean {

    /**
     * Indicates whether the specified value<any> is number.
     * @param {any} value
     * @returns {boolean} true if the value parameter is number type, otherwise, false.
     */
    public static isNumber(value: any): boolean {
        return typeof value === 'number';
    }

    /**
     * Indicates whether the specified value<any> is number.
     * @param {any} value
     * @returns {boolean} true if the value parameter is string type, otherwise, false.
     */
    public static isString(value: any): boolean {
        return typeof value === 'string';
    }

    /**
     * Indicates whether the specified value<any> is number.
     * @param {any} value
     * @returns {boolean} true if the value parameter is boolean type, otherwise, false.
     */
    public static isBoolean(value: any): boolean {
        return typeof value === 'boolean';
    }

    /**
     * Indicates whether the specified value<any> is number.
     * @param {any} value
     * @returns {boolean} true if the value parameter is symbol type, otherwise, false.
     */
    public static isSymbol(value: any): boolean {
        return typeof value === 'symbol';
    }

    /**
     * Indicates whether the specified value<any> is number.
     * @param {any} value
     * @returns {boolean} true if the value parameter is undefined type, otherwise, false.
     */
    public static isUndefined(value: any): boolean {
        return typeof value === 'undefined';
    }

    /**
     * Indicates whether the specified value<any> is number.
     * @param {any} value
     * @returns {boolean} true if the value parameter is object type, otherwise, false.
     */
    public static isObject(value: any): boolean {
        return typeof value === 'object';
    }
}