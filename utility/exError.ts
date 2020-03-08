import { ExString } from "./exString";

/**
 * Error extension class.
 */
export class ExError {

    /**
     * Throws Error if the value parameter is undefined;
     * @param {any | null | undefined} value 
     * @param {string} errorMessage - custom error message if the errorMessage parameter is null; otherwise; default error message;
     */
    public static throwIfUndefined(value: any | null | undefined, errorMessage: string = ""): void {
        if (value != undefined) {
            return;
        }

        let message: string = `${value} is undefined.`;
        if (ExString.isNotNullOrEmpty(errorMessage)) {
            message = errorMessage;
        }

        throw new Error(message);
    }

    /**
     * Throws Error if the value parameter is null;
     * @param {any | null | undefined} value 
     * @param {string} errorMessage - custom error message if the errorMessage parameter is null; otherwise; default error message;
     */
    public static throwIfNull(value: any | null | undefined, errorMessage: string = ""): void {
        if (value != null) {
            return;
        }

        let message: string = `${value} is null.`;
        if (ExString.isNotNullOrEmpty(errorMessage)) {
            message = errorMessage;
        }

        throw new Error(message);
    }

    /**
     * Throws Error if the value parameter is null or undefined.
     * @param {any | null | undefined} value 
     * @param {string} errorMessage  - custom error message if the errorMessage parameter is null; otherwise; default error message;
     */
    public static throwIfNullOrUndefined(value: any | null | undefined, errorMessage: string = ""): void {
        this.throwIfUndefined(value);
        this.throwIfNull(value);
    }

    /**
     * Throws not implemented error.
     */
    public static throwNotImplemented() {
        throw new Error("throw not implemented error.");
    }
}