import { ExNumber } from "./exNumber";
import { ExError } from "./exError";

/**
 * IO extension class.
 */
export class ExIO {

    /**
     * Indicates whether the specified file name has extension.
     * @param {string} fileName 
     * @returns {boolean} true if the fileName parameter has extension. otherwise false.
     */
    public static hasExtension(fileName: string): boolean {
        ExError.throwIfNullOrUndefined(fileName);
        return ExNumber.isPositive(fileName.lastIndexOf('.'));
    }

    /**
     * Indicates whether the specified file name has extension.
     * @param {string} fileName
     * @returns {boolean} true if the fileName parameter has not extension. otherwise false.
     */
    public static hasNotExtension(fileName: string): boolean {
        return !this.hasExtension(fileName);
    }

    /**
     * Gets file extension.
     * @param {string} fileName 
     * @returns {string} extension.
     */
    public static getExtension(fileName: string): string {
        ExError.throwIfNullOrUndefined(fileName);
        const index = fileName.lastIndexOf('.');
        if (ExNumber.isNegative(index)) {
            return "";
        }

        return fileName.slice(index + 1);
    }
}