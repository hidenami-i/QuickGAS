import { ExNumber } from "./exNumber";
import { ExError } from "./exError";

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