import {ExString} from "./exString";

/**
 * Extension class for number type.
 */
export class ExNumber {

    /**
     * Indicates whether the specified number is null or undefined.
     * @param {number} value - The number to test.
     * @returns {boolean} true if the value parameter is null or undefined; otherwise, false.
     */
    public static isNullOrUndefined(value: number): boolean {
        return value === undefined || value == null || ExString.isNullOrEmpty(value.toString());
    }

    /**
     * Indicates whether the specified number is not null or undefined.
     * @param {number} value - The number to test.
     * @returns {boolean} true if the value parameter is not null or not undefined; otherwise, false.
     */
    public static isNotNullOrUndefined(value: number): boolean {
        return !this.isNullOrUndefined(value);
    }

    /**
     * Indicates whether the specified number is negative number.
     * @param {number} value  - The number to test.
     * @returns {boolean} true if the value parameter is negative; otherwise, false.
     */
    public static isNegative(value: number): boolean {
        return value < 0;
    }

    /**
     * Indicates whether the specified number is positive number.
     * @param {number} value - The number to test.
     * @returns {boolean} true if the value parameter is positive; otherwise, false.
     */
    public static isPositive(value: number): boolean {
        return value > 0;
    }

    /**
     * Converts the value to alphabet.
     * @param {number} value - The number to test.
     * @returns {string} emptry string if the value parameter is unsigned number; otherwise, alphabet.
     */
    public static toAlphabet(value: number): string {
        if (value <= 0) {
            return "";
        }

        let n = value % 26;
        n = n == 0 ? 26 : n;
        let s = (n + 64).toString();

        if (value == n) {
            return s;
        }

        return this.toAlphabet(((value - n) / 26)) + s;
    }

    /**
     * Gets the digits size.
     * @param {number} value - The number to test.
     * @returns {number} The digits size.
     */
    public static getDigitsSize(value: number): number {
        if (value == 0) {
            return 1;
        }

        return Math.log10(value) + 1;
    }

}