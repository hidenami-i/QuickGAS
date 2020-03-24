/**
 * Extension class for string type.
 */
export class ExString {

    /**
     * Indicates whether the specified string is null or empty.
     * @param {string} str - The string to test.
     * @returns {boolean} true if the value parameter is null or empty; otherwise, false.
     */
    public static isNullOrEmpty(value: string): boolean {
        return value === "" || value == null || value == undefined;
    }

    /**
     * Indicates whether the specified string is not null or empty.
     * @param {string} value - The string to test.
     * @returns {boolean} true if the value parameter is not null or empty; otherwise, false.
     */
    public static isNotNullOrEmpty(value: string): boolean {
        return !this.isNullOrEmpty(value);
    }

    /**
     * Converts the value parameter to boolean type.
     * @param {string} value true, TRUE, false, FALSE
     * @return {boolean} true if the value parameter is "true" or "TRUE"; "false" or "FALSE", false; otherwise error.
     */
    public static toBool(value: string): boolean {
        if (value === "true" || value === "TRUE") {
            return true;
        }

        if (value === "false" || value === "FALSE") {
            return false;
        }

        throw new Error("you must use 'true', 'TRUE', 'false', 'FALSE'");
    }

    /**
     * Converts snake str parameter to upper camel str.
     * @param {string} value
     * @return {string} upper camel string value.
     * @example two_apple → TwoApple
     */
    public static convertSnakeToUpperCamel(value: string): string {
        value = value.charAt(0).toUpperCase() + value.slice(1);
        return value.replace(/[-_](.)/g, function (match, group1) {
            return group1.toUpperCase();
        });
    }

    /**
     * Converts snake str parameter to lower camel str.
     * @param {string} value
     * @return {string} lower camel string value.
     * @example two_apple → twoApple
     */
    public static convertSnakeToLowerCamel(value: string): string {
        value = value.charAt(0).toLowerCase() + value.slice(1);
        return value.replace(/[-_](.)/g, function (match, group1) {
            return group1.toUpperCase();
        });
    }

    /**
     * Converts letter to number.
     * @param {string}  value
     * @returns {number}
     */
    public static convertLetterToNumber(value: string): number {
        let out = 0, len = value.length;
        for (let pos = 0; pos < len; pos++) {
            out += (value.charCodeAt(pos) - 64) * Math.pow(26, len - pos - 1);
        }
        return out;
    }

    /**
     * Trim all white space.
     * @param {string} value
     * @returns {string}
     */
    public static trimSpace(value: string): string {
        if (this.isNullOrEmpty(value)) {
            return "";
        }
        return value.replace(/\s+/g, "");
    }

    /**
     * Trim all new line.
     * @param {string} value
     * @returns {string}
     */
    public static trimNewLine(value: string): string {
        if (this.isNullOrEmpty(value)) {
            return "";
        }
        return value.replace(/\r?\n/g, '');
    }

    /**
     * Trim all new line and all white space.
     * @param {space} value
     * @returns {string}
     */
    public static trimSpaceAndNewLine(value: string): string {
        return this.trimSpace(this.trimNewLine(value));
    }
}